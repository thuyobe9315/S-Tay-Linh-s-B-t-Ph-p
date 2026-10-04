import React, { useState } from 'react';
import { 
  Database, 
  ExternalLink, 
  Copy, 
  Check, 
  RefreshCw, 
  CheckCircle2, 
  AlertCircle, 
  Code2, 
  Terminal, 
  Layers, 
  HelpCircle,
  Sparkles
} from 'lucide-react';
import { GOOGLE_APPS_SCRIPT_CODE } from '../data/googleAppsScriptCode';
import { testGasConnection, saveGasUrl, clearGasUrl } from '../services/gasApi';

interface GasSetupModalProps {
  currentGasUrl: string;
  isConnected: boolean;
  onRefreshData: (newUrl?: string) => Promise<void>;
  lastSyncTime: string | null;
}

export const GasSetupModal: React.FC<GasSetupModalProps> = ({
  currentGasUrl,
  isConnected,
  onRefreshData,
  lastSyncTime,
}) => {
  const [gasUrlInput, setGasUrlInput] = useState(currentGasUrl);
  const [isTesting, setIsTesting] = useState(false);
  const [testResult, setTestResult] = useState<{ success: boolean; message: string } | null>(null);
  const [copiedCode, setCopiedCode] = useState(false);
  const [activeTab, setActiveTab] = useState<'settings' | 'code' | 'guide'>('settings');

  const handleCopyCode = async () => {
    try {
      await navigator.clipboard.writeText(GOOGLE_APPS_SCRIPT_CODE);
      setCopiedCode(true);
      setTimeout(() => setCopiedCode(false), 3000);
    } catch (e) {
      console.error('Không thể sao chép:', e);
    }
  };

  const handleSaveAndTest = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    const clean = gasUrlInput.trim();
    if (!clean) {
      setTestResult({ success: false, message: 'Vui lòng dán đường dẫn Web App URL vào ô bên dưới.' });
      return;
    }

    setIsTesting(true);
    setTestResult(null);

    const test = await testGasConnection(clean);
    setIsTesting(false);
    setTestResult(test);

    if (test.success) {
      saveGasUrl(clean);
      await onRefreshData(clean);
    }
  };

  const handleDisconnect = async () => {
    clearGasUrl();
    setGasUrlInput('');
    setTestResult({ success: true, message: 'Đã hủy liên kết URL. Hệ thống chuyển về sử dụng dữ liệu mặc định chuẩn.' });
    await onRefreshData('');
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Tiêu đề */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-bold mb-3">
              <Database className="w-4 h-4 text-blue-700" />
              <span>Trung Tâm Dữ Liệu Google Sheets</span>
            </div>
            <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
              Kết Nối &amp; Quản Lý Google Sheets Database
            </h2>
            <p className="text-base sm:text-lg text-slate-600">
              Kiến trúc chuẩn RESTful API với Google Apps Script Web App kết nối trực tiếp 4 bảng tính.
            </p>
          </div>

          <div className="flex items-center gap-2 shrink-0">
            <span className={`inline-flex items-center gap-2 px-4 py-2.5 rounded-xl text-base font-bold border ${
              isConnected 
                ? 'bg-emerald-50 text-emerald-800 border-emerald-300' 
                : 'bg-amber-50 text-amber-800 border-amber-300'
            }`}>
              {isConnected ? (
                <>
                  <CheckCircle2 className="w-5 h-5 text-emerald-600" />
                  <span>Đã Kết Nối Trực Tiếp</span>
                </>
              ) : (
                <>
                  <AlertCircle className="w-5 h-5 text-amber-600" />
                  <span>Dùng Sổ Tay Nội Bộ</span>
                </>
              )}
            </span>
          </div>
        </div>

        {/* Tab chuyển đổi cài đặt / xem code / hướng dẫn */}
        <div className="mt-6 flex flex-wrap gap-2 border-b border-slate-200 pb-3">
          <button
            type="button"
            onClick={() => setActiveTab('settings')}
            className={`px-4 py-2.5 rounded-xl font-bold text-base transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'settings'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            1. Cấu Hình URL &amp; Đồng Bộ
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('code')}
            className={`px-4 py-2.5 rounded-xl font-bold text-base transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'code'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            2. Xem Mã Nguồn Code.gs
          </button>
          <button
            type="button"
            onClick={() => setActiveTab('guide')}
            className={`px-4 py-2.5 rounded-xl font-bold text-base transition-all min-h-[44px] cursor-pointer ${
              activeTab === 'guide'
                ? 'bg-blue-700 text-white shadow-sm'
                : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
            }`}
          >
            3. Hướng Dẫn 3 Phút (Từng Bước)
          </button>
        </div>
      </div>

      {/* TAB 1: CẤU HÌNH & TEST URL */}
      {activeTab === 'settings' && (
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          {/* Cột chính: Ô nhập link & Test */}
          <div className="lg:col-span-2 space-y-6">
            <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <h3 className="text-xl font-bold text-slate-900 mb-2">
                Đường Dẫn Google Apps Script Web App URL
              </h3>
              <p className="text-base text-slate-600 mb-4">
                Dán đường dẫn Web App được Google cấp sau khi Deploy (bắt đầu bằng <code className="text-xs bg-slate-100 px-2 py-0.5 rounded text-blue-800 font-mono">https://script.google.com/macros/s/...</code>):
              </p>

              <form onSubmit={handleSaveAndTest} className="space-y-4">
                <div>
                  <input
                    type="url"
                    value={gasUrlInput}
                    onChange={(e) => setGasUrlInput(e.target.value)}
                    placeholder="https://script.google.com/macros/s/AKfycbx.../exec"
                    className="w-full bg-slate-50 border-2 border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 font-mono text-sm sm:text-base px-4 py-3.5 rounded-xl outline-none transition-all min-h-[50px]"
                  />
                </div>

                {/* Kết quả kiểm tra */}
                {testResult && (
                  <div className={`p-4 rounded-xl text-base font-semibold flex items-start gap-3 ${
                    testResult.success 
                      ? 'bg-emerald-50 text-emerald-900 border border-emerald-200' 
                      : 'bg-amber-50 text-amber-900 border border-amber-200'
                  }`}>
                    {testResult.success ? (
                      <CheckCircle2 className="w-6 h-6 text-emerald-600 shrink-0 mt-0.5" />
                    ) : (
                      <AlertCircle className="w-6 h-6 text-amber-600 shrink-0 mt-0.5" />
                    )}
                    <div>
                      <p className="font-bold">{testResult.success ? 'Thành công!' : 'Thông báo kiểm tra:'}</p>
                      <p className="text-sm sm:text-base font-medium mt-0.5">{testResult.message}</p>
                    </div>
                  </div>
                )}

                <div className="flex flex-wrap items-center gap-3 pt-2">
                  <button
                    type="submit"
                    disabled={isTesting}
                    className="px-6 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-xl transition-all shadow-sm flex items-center gap-2 min-h-[48px] cursor-pointer disabled:opacity-50"
                  >
                    <RefreshCw className={`w-5 h-5 ${isTesting ? 'animate-spin' : ''}`} />
                    <span>{isTesting ? 'Đang kiểm tra kết nối...' : 'Kiểm Tra Kết Nối & Đồng Bộ Dữ Liệu'}</span>
                  </button>

                  {gasUrlInput && (
                    <button
                      type="button"
                      onClick={handleDisconnect}
                      className="px-4 py-3.5 bg-slate-100 hover:bg-slate-200 text-slate-700 font-semibold text-base rounded-xl transition-colors min-h-[48px] cursor-pointer"
                    >
                      Hủy Liên Kết URL
                    </button>
                  )}
                </div>
              </form>

              {lastSyncTime && (
                <div className="mt-4 pt-3 border-t border-slate-100 text-xs text-slate-500">
                  Lần đồng bộ gần nhất: <strong>{lastSyncTime}</strong>
                </div>
              )}
            </div>

            {/* Thông tin 4 Bảng tính tự động tạo */}
            <div className="bg-slate-50 border border-slate-200 rounded-2xl p-6">
              <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Layers className="w-5 h-5 text-blue-700" />
                <span>Cấu Trúc 4 Sheet Tự Động Trong Google Sheets</span>
              </h4>
              <p className="text-sm text-slate-600 mb-4">
                Google Apps Script sẽ tự động tạo và định dạng 4 trang tính này nếu chúng chưa tồn tại:
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-sm">
                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 mb-1">1. Sheet: "TuTrường"</div>
                  <div className="text-xs text-slate-500 font-mono">
                    MaSo, TenTuTruong, NhomNangLuong, YNghia, MoTaChiTiet, UngDungCaiVan
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 mb-1">2. Sheet: "ChuyenHoa"</div>
                  <div className="text-xs text-slate-500 font-mono">
                    ID, TuTruongGoc, TuTruongChuyenDoi, YNghiaChuyenHoa, LoiKhuyen
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 mb-1">3. Sheet: "TraCuuSo"</div>
                  <div className="text-xs text-slate-500 font-mono">
                    SoDienThoaiHoacDaySo, PhanTichChiTiet, DiemSo, DanhGia, NgayTraCuu
                  </div>
                </div>

                <div className="bg-white p-3.5 rounded-xl border border-slate-200">
                  <div className="font-bold text-blue-900 mb-1">4. Sheet: "BaiVietCaiVan"</div>
                  <div className="text-xs text-slate-500 font-mono">
                    ID, TieuDe, ChuyenMuc, NoiDung, NgayDang
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Cột phụ: Tóm tắt lợi ích & nút chép code */}
          <div className="space-y-6">
            <div className="bg-blue-900 text-white rounded-2xl p-6 sm:p-7 shadow-sm">
              <h4 className="text-lg font-bold text-white mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-300" />
                <span>Quyền Sở Hữu Dữ Liệu</span>
              </h4>
              <p className="text-sm sm:text-base text-blue-100 leading-relaxed mb-6 font-medium">
                Toàn bộ dữ liệu nằm trên tài khoản Google Drive của chính bạn. Không phụ thuộc vào bất kỳ máy chủ bên thứ ba nào, không sợ mất dữ liệu khi đổi thiết bị.
              </p>

              <button
                type="button"
                onClick={handleCopyCode}
                className="w-full py-3.5 px-4 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px] cursor-pointer"
              >
                {copiedCode ? <Check className="w-5 h-5 text-emerald-800" /> : <Copy className="w-5 h-5" />}
                <span>{copiedCode ? 'Đã Sao Chép Code.gs!' : 'Sao Chép Mã Code.gs'}</span>
              </button>
            </div>

            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <HelpCircle className="w-5 h-5 text-slate-500" />
                <span>Lưu Ý Khi Deploy (Triển Khai):</span>
              </h4>
              <ul className="text-sm text-slate-600 space-y-2 list-disc list-inside">
                <li>Chọn loại: <strong>Web app</strong> (Ứng dụng web)</li>
                <li>Execute as: <strong>Me</strong> (Tôi)</li>
                <li>Who has access: <strong>Anyone</strong> (Bất kỳ ai) — Bắt buộc để Web App đọc/ghi dữ liệu được.</li>
              </ul>
            </div>
          </div>
        </div>
      )}

      {/* TAB 2: XEM MÃ NGUỒN CODE.GS */}
      {activeTab === 'code' && (
        <div className="bg-slate-900 text-slate-100 rounded-2xl p-6 border border-slate-800 shadow-md space-y-4">
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-4 border-b border-slate-800">
            <div>
              <h3 className="text-xl font-bold text-white flex items-center gap-2">
                <Code2 className="w-6 h-6 text-blue-400" />
                <span>File: Code.gs (Google Apps Script)</span>
              </h3>
              <p className="text-xs sm:text-sm text-slate-400 mt-1">
                Sao chép mã nguồn này và dán vào trình soạn thảo Google Apps Script trong Google Sheet của bạn.
              </p>
            </div>

            <button
              type="button"
              onClick={handleCopyCode}
              className="inline-flex items-center gap-2 px-5 py-2.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-base transition-all min-h-[44px] cursor-pointer shadow-sm self-start sm:self-auto"
            >
              {copiedCode ? <Check className="w-5 h-5 text-emerald-300" /> : <Copy className="w-5 h-5" />}
              <span>{copiedCode ? 'Đã Sao Chép Toàn Bộ Mã!' : 'Sao Chép Mã Code.gs'}</span>
            </button>
          </div>

          <div className="relative overflow-x-auto max-h-[500px] rounded-xl bg-slate-950 p-4 font-mono text-xs sm:text-sm text-slate-300 leading-relaxed border border-slate-800">
            <pre className="whitespace-pre">{GOOGLE_APPS_SCRIPT_CODE}</pre>
          </div>
        </div>
      )}

      {/* TAB 3: HƯỚNG DẪN 3 BƯỚC CÀI ĐẶT */}
      {activeTab === 'guide' && (
        <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs space-y-6">
          <h3 className="text-2xl font-black text-slate-900">
            Hướng Dẫn Thiết Lập Google Sheets Backend (3 Bước Trong 3 Phút)
          </h3>

          <div className="space-y-4">
            <div className="p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-black flex items-center justify-center text-lg shrink-0">
                1
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-950 mb-1">
                  Bước 1: Tạo Google Sheet Mới &amp; Mở Apps Script
                </h4>
                <p className="text-base text-slate-700 leading-relaxed">
                  Truy cập <a href="https://sheets.new" target="_blank" rel="noopener noreferrer" className="text-blue-700 font-bold underline inline-flex items-center gap-1">sheets.new <ExternalLink className="w-3.5 h-3.5" /></a> để tạo bảng tính mới. Đặt tên bảng tính là <strong>"SỔ TAY LINH SỐ BÁT PHÁP"</strong>. Trên thanh menu, nhấp vào <strong>Tiện ích mở rộng (Extensions)</strong> &gt; chọn <strong>Apps Script</strong>.
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-blue-100 bg-blue-50/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-blue-700 text-white font-black flex items-center justify-center text-lg shrink-0">
                2
              </div>
              <div>
                <h4 className="text-lg font-bold text-blue-950 mb-1">
                  Bước 2: Dán Mã Code.gs &amp; Lưu Lại
                </h4>
                <p className="text-base text-slate-700 leading-relaxed mb-3">
                  Xóa toàn bộ mã mặc định trong file <code className="bg-white px-2 py-0.5 rounded text-blue-800 font-mono font-bold">Code.gs</code>. Nhấp nút <strong>"Sao Chép Mã Code.gs"</strong> ở tab 2 bên trên rồi dán toàn bộ vào. Nhấn biểu tượng Đĩa mềm <strong>Save (Lưu)</strong> (hoặc Ctrl + S / Cmd + S).
                </p>
              </div>
            </div>

            <div className="p-5 rounded-2xl border-2 border-emerald-100 bg-emerald-50/40 flex items-start gap-4">
              <div className="w-10 h-10 rounded-xl bg-emerald-700 text-white font-black flex items-center justify-center text-lg shrink-0">
                3
              </div>
              <div>
                <h4 className="text-lg font-bold text-emerald-950 mb-1">
                  Bước 3: Triển Khai (Deploy) Dưới Dạng Web App
                </h4>
                <p className="text-base text-slate-700 leading-relaxed">
                  Ở góc trên bên phải màn hình Apps Script, nhấp nút xanh <strong>Triển khai (Deploy)</strong> &gt; <strong>Tùy chọn triển khai mới (New deployment)</strong>:
                </p>
                <ul className="list-disc list-inside text-base text-slate-800 font-medium my-2 space-y-1">
                  <li>Chọn loại: Nhấp biểu tượng bánh răng &gt; chọn <strong>Ứng dụng web (Web app)</strong>.</li>
                  <li>Thực thi dưới dạng (Execute as): Chọn <strong>Tôi (Me - your_email@gmail.com)</strong>.</li>
                  <li>Ai có quyền truy cập (Who has access): Chọn <strong>Bất kỳ ai (Anyone)</strong>.</li>
                </ul>
                <p className="text-base text-slate-700 leading-relaxed">
                  Nhấp <strong>Triển khai (Deploy)</strong>, cấp quyền nếu được hỏi, sau đó sao chép <strong>URL ứng dụng web (Web app URL)</strong> và dán vào tab Cấu hình của ứng dụng này!
                </p>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
