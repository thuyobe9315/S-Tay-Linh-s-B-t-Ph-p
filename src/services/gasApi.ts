import { SheetFullData, TuTruong, ChuyenHoa, TraCuuRecord, BaiVietCaiVan, GasApiResponse } from '../types';
import { INITIAL_DATA } from '../data/defaultData';

const GAS_URL_STORAGE_KEY = 'so_tay_linh_so_gas_url';
const LOCAL_CACHE_KEY = 'so_tay_linh_so_cached_data';

export interface GasConnectionStatus {
  isConnected: boolean;
  isCustomUrl: boolean;
  url: string;
  lastSyncTime: string | null;
  errorMessage: string | null;
}

/**
 * Lấy Web App URL đã lưu trong trình duyệt hoặc chuỗi rỗng
 */
export function getSavedGasUrl(): string {
  if (typeof window === 'undefined') return '';
  return localStorage.getItem(GAS_URL_STORAGE_KEY)?.trim() || '';
}

/**
 * Lưu Web App URL vào LocalStorage
 */
export function saveGasUrl(url: string): void {
  if (typeof window === 'undefined') return;
  localStorage.setItem(GAS_URL_STORAGE_KEY, url.trim());
}

/**
 * Xóa cấu hình GAS URL (trở về dữ liệu mặc định)
 */
export function clearGasUrl(): void {
  if (typeof window === 'undefined') return;
  localStorage.removeItem(GAS_URL_STORAGE_KEY);
}

/**
 * Lưu cache dữ liệu vào LocalStorage để phòng khi mất mạng
 */
function cacheLocalData(data: SheetFullData): void {
  try {
    localStorage.setItem(LOCAL_CACHE_KEY, JSON.stringify(data));
  } catch (e) {
    console.warn('Không thể lưu cache cục bộ:', e);
  }
}

/**
 * Lấy cache dữ liệu từ LocalStorage
 */
export function getLocalCachedData(): SheetFullData {
  try {
    const raw = localStorage.getItem(LOCAL_CACHE_KEY);
    if (raw) {
      const parsed = JSON.parse(raw);
      if (parsed.TuTruong && parsed.TuTruong.length > 0) {
        return parsed;
      }
    }
  } catch (e) {
    console.warn('Lỗi đọc cache cục bộ:', e);
  }
  return INITIAL_DATA;
}

/**
 * Kiểm tra kết nối thử tới URL Google Apps Script (Ping)
 */
export async function testGasConnection(url: string): Promise<{ success: boolean; message: string }> {
  const cleanUrl = url.trim();
  if (!cleanUrl) {
    return { success: false, message: 'Vui lòng nhập đường dẫn Google Apps Script Web App URL.' };
  }

  if (!cleanUrl.startsWith('https://script.google.com/macros/s/')) {
    return {
      success: false,
      message: 'Đường dẫn không đúng định dạng của Google Apps Script (phải bắt đầu bằng: https://script.google.com/macros/s/...).',
    };
  }

  try {
    const pingUrl = `${cleanUrl}${cleanUrl.includes('?') ? '&' : '?'}action=ping&_t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 12000); // 12s timeout

    const res = await fetch(pingUrl, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      return { success: false, message: `Máy chủ Google Sheets phản hồi mã lỗi HTTP: ${res.status}` };
    }

    const json = await res.json() as GasApiResponse;
    if (json.status === 'success') {
      return { success: true, message: json.message || 'Kết nối Google Sheets thành công!' };
    } else {
      return { success: false, message: json.message || 'Phản hồi từ Google Sheets không xác định.' };
    }
  } catch (err: unknown) {
    const error = err as Error;
    if (error.name === 'AbortError') {
      return { success: false, message: 'Kết nối quá thời gian chờ (Timeout). Vui lòng kiểm tra quyền truy cập Web App (cần chọn "Anyone").' };
    }
    return {
      success: false,
      message: `Không thể kết nối đến Google Apps Script. Chi tiết lỗi: ${error.message || 'Lỗi mạng hoặc CORS'}. Hãy kiểm tra cấu hình Deploy: "Execute as: Me" và "Who has access: Anyone".`,
    };
  }
}

/**
 * Tải toàn bộ dữ liệu từ Google Sheets qua GAS API
 * Nếu chưa cấu hình hoặc mất mạng, tự động dùng dữ liệu mặc định chuẩn
 */
export async function fetchAllSheetData(gasUrl?: string): Promise<{
  data: SheetFullData;
  source: 'google-sheets' | 'local-cache' | 'default';
  message: string;
}> {
  const url = (gasUrl || getSavedGasUrl()).trim();

  // Chưa cấu hình URL -> Sử dụng dữ liệu Bát Cực Linh Số mặc định
  if (!url) {
    const cached = getLocalCachedData();
    return {
      data: cached,
      source: 'default',
      message: 'Đang hiển thị cơ sở dữ liệu mẫu Bát Cực Linh Số. Hãy liên kết với Google Sheets của bạn để đồng bộ trực tiếp.',
    };
  }

  try {
    const requestUrl = `${url}${url.includes('?') ? '&' : '?'}action=getAll&_t=${Date.now()}`;
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 15000);

    const res = await fetch(requestUrl, {
      method: 'GET',
      mode: 'cors',
      signal: controller.signal,
    });
    clearTimeout(timeoutId);

    if (!res.ok) {
      throw new Error(`Google Sheets HTTP Error ${res.status}`);
    }

    const responseJson = await res.json() as GasApiResponse<SheetFullData>;

    if (responseJson.status === 'success' && responseJson.data) {
      const liveData = responseJson.data;

      // Đảm bảo các mảng dữ liệu không bị undefined
      const sanitizedData: SheetFullData = {
        TuTruong: (liveData.TuTruong && liveData.TuTruong.length > 0) ? liveData.TuTruong : INITIAL_DATA.TuTruong,
        ChuyenHoa: (liveData.ChuyenHoa && liveData.ChuyenHoa.length > 0) ? liveData.ChuyenHoa : INITIAL_DATA.ChuyenHoa,
        TraCuuSo: (liveData.TraCuuSo && liveData.TraCuuSo.length > 0) ? liveData.TraCuuSo : INITIAL_DATA.TraCuuSo,
        BaiVietCaiVan: (liveData.BaiVietCaiVan && liveData.BaiVietCaiVan.length > 0) ? liveData.BaiVietCaiVan : INITIAL_DATA.BaiVietCaiVan,
      };

      cacheLocalData(sanitizedData);

      return {
        data: sanitizedData,
        source: 'google-sheets',
        message: 'Đã đồng bộ dữ liệu thời gian thực từ Google Sheets thành công!',
      };
    } else {
      throw new Error(responseJson.message || 'Phản hồi không chứa dữ liệu hợp lệ.');
    }
  } catch (error: unknown) {
    const err = error as Error;
    console.error('Lỗi khi tải từ Google Sheets:', err);
    const cached = getLocalCachedData();

    return {
      data: cached,
      source: 'local-cache',
      message: `Tạm thời không kết nối được Google Sheets (${err.message}). Đang hiển thị bản lưu đệm gần nhất.`,
    };
  }
}

/**
 * Lưu kết quả tra cứu số vào Sheet TraCuuSo qua POST
 */
export async function saveTraCuuRecordToGas(record: TraCuuRecord, gasUrl?: string): Promise<{ success: boolean; message: string }> {
  const url = (gasUrl || getSavedGasUrl()).trim();

  // Cập nhật vào cache cục bộ trước
  const current = getLocalCachedData();
  const updatedRecords = [record, ...current.TraCuuSo.filter((r) => r.SoDienThoaiHoacDaySo !== record.SoDienThoaiHoacDaySo)];
  current.TraCuuSo = updatedRecords;
  cacheLocalData(current);

  if (!url) {
    return {
      success: true,
      message: 'Đã lưu kết quả tra cứu vào bộ nhớ thiết bị. (Kết nối Google Sheets để lưu trực tiếp lên Cloud).',
    };
  }

  try {
    const payload = {
      action: 'saveTraCuu',
      SoDienThoaiHoacDaySo: record.SoDienThoaiHoacDaySo,
      PhanTichChiTiet: record.PhanTichChiTiet,
      DiemSo: record.DiemSo,
      DanhGia: record.DanhGia,
    };

    // Google Apps Script hỗ trợ POST payload qua text plain để tránh preflight CORS issues
    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: {
        'Content-Type': 'text/plain;charset=utf-8',
      },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { success: true, message: 'Đã lưu bản ghi phân tích vào Google Sheets thành công!' };
    } else {
      return { success: false, message: `Máy chủ Google Sheets phản hồi mã ${res.status}` };
    }
  } catch (err: unknown) {
    const e = err as Error;
    console.warn('Lỗi ghi POST lên GAS:', e);
    return {
      success: false,
      message: `Đã lưu tạm trên máy, nhưng chưa thể đẩy lên Google Sheets: ${e.message}`,
    };
  }
}

/**
 * Thêm bài viết mới vào Sheet BaiVietCaiVan
 */
export async function addBaiVietToGas(
  baiViet: { TieuDe: string; ChuyenMuc: string; NoiDung: string },
  gasUrl?: string
): Promise<{ success: boolean; message: string }> {
  const url = (gasUrl || getSavedGasUrl()).trim();

  const newPost: BaiVietCaiVan = {
    ID: Date.now(),
    TieuDe: baiViet.TieuDe,
    ChuyenMuc: baiViet.ChuyenMuc,
    NoiDung: baiViet.NoiDung,
    NgayDang: new Date().toISOString().split('T')[0],
  };

  // Cập nhật bộ nhớ cục bộ
  const current = getLocalCachedData();
  current.BaiVietCaiVan = [newPost, ...current.BaiVietCaiVan];
  cacheLocalData(current);

  if (!url) {
    return {
      success: true,
      message: 'Đã lưu bài viết vào bộ nhớ thiết bị. Kết nối Google Sheets để xuất bản lên Cloud!',
    };
  }

  try {
    const payload = {
      action: 'addBaiViet',
      ...baiViet,
    };

    const res = await fetch(url, {
      method: 'POST',
      mode: 'cors',
      headers: { 'Content-Type': 'text/plain;charset=utf-8' },
      body: JSON.stringify(payload),
    });

    if (res.ok) {
      return { success: true, message: 'Đã xuất bản bài viết lên Google Sheets thành công!' };
    } else {
      return { success: false, message: `Lỗi máy chủ Google Sheets: ${res.status}` };
    }
  } catch (err: unknown) {
    const e = err as Error;
    return {
      success: false,
      message: `Đã lưu tạm trên máy, lỗi gửi lên Google Sheets: ${e.message}`,
    };
  }
}
