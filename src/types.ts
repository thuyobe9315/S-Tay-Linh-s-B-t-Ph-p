export type NhomNangLuong = 'Cát Tinh' | 'Hung Tinh' | 'Trung Tính';

export interface TuTruong {
  MaSo: string; // e.g. "14/41, 67/76, 39/93, 28/82"
  TenTuTruong: string; // e.g. "Sinh Khí"
  NhomNangLuong: NhomNangLuong;
  NguHanh?: string; // Mộc, Thổ, Kim, Thủy, Hỏa
  YNghia: string; // Tóm tắt ý nghĩa ngắn
  MoTaChiTiet: string; // Mô tả chi tiết tính cách, tài vận, sức khỏe, tình cảm
  UngDungCaiVan: string; // Cách kết hợp, ứng dụng thực tế để cải thiện vận thế
  CapDoNangLuong?: {
    cap1: string;
    cap2: string;
    cap3: string;
    cap4: string;
  };
}

export interface ChuyenHoa {
  ID: string | number;
  TuTruongGoc: string; // e.g. "Tuyệt Mệnh"
  TuTruongChuyenDoi: string; // e.g. "Thiên Y"
  YNghiaChuyenHoa: string; // Khắc chế năng lượng xấu, chuyển hóa hung thành cát
  LoiKhuyen: string; // Lời khuyên cụ thể khi chọn dãy số hoặc sắp xếp số
  PhuongPhap?: string; // "Thiên Y chế Tuyệt Mệnh"
}

export interface TraCuuRecord {
  ID?: string | number;
  SoDienThoaiHoacDaySo: string;
  PhanTichChiTiet: string;
  DiemSo: number;
  DanhGia: string;
  NgayTraCuu?: string;
  ChiTietCapSo?: Array<{
    capSo: string;
    tuTruong: string;
    nhom: NhomNangLuong;
    yNghia: string;
    mucDo: string;
  }>;
}

export interface BaiVietCaiVan {
  ID: string | number;
  TieuDe: string;
  ChuyenMuc: string;
  NoiDung: string;
  NgayDang: string;
  TacGia?: string;
}

export interface GasApiResponse<T = unknown> {
  status: 'success' | 'error';
  message?: string;
  data?: T;
  timestamp?: string;
}

export interface SheetFullData {
  TuTruong: TuTruong[];
  ChuyenHoa: ChuyenHoa[];
  TraCuuSo: TraCuuRecord[];
  BaiVietCaiVan: BaiVietCaiVan[];
}
