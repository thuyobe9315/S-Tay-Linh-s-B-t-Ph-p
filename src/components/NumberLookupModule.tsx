import React, { useState } from 'react';
import { 
  Hash, 
  Search, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Award, 
  Save, 
  Lightbulb, 
  CheckCircle2, 
  AlertTriangle,
  RotateCcw,
  ExternalLink
} from 'lucide-react';
import { TraCuuRecord } from '../types';
import { analyzeNumberSequence, AnalysisResult, formatAnalysisToRecord } from '../utils/numerologyEngine';

interface NumberLookupModuleProps {
  initialPhoneNumber?: string;
  savedLookups?: TraCuuRecord[];
  onSaveToGas: (record: TraCuuRecord) => Promise<{ success: boolean; message: string }>;
  isConnectedGas: boolean;
  onOpenSettings?: () => void;
}

export const NumberLookupModule: React.FC<NumberLookupModuleProps> = ({
  initialPhoneNumber = '',
  savedLookups,
  onSaveToGas,
  isConnectedGas,
  onOpenSettings,
}) => {
  const [phoneNumber, setPhoneNumber] = useState(initialPhoneNumber);
  const [currentResult, setCurrentResult] = useState<AnalysisResult | null>(() => {
    if (initialPhoneNumber.trim()) {
      return analyzeNumberSequence(initialPhoneNumber.trim());
    }
    return null;
  });
  const [isSaving, setIsSaving] = useState(false);
  const [saveMessage, setSaveMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  const sampleNumbers = [
    { label: 'Sim Đại Cát Lộc', phone: '0988686831' },
    { label: 'Sim Vượt Gian Khó', phone: '0912211941' },
    { label: 'Sim Cần Hóa Giải', phone: '0918791269' },
    { label: 'Biển Số May Mắn', phone: '6879' },
  ];

  const handleAnalyze = (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    setSaveMessage(null);
    if (!phoneNumber.trim()) return;

    const res = analyzeNumberSequence(phoneNumber.trim());
    setCurrentResult(res);
  };

  const handleSelectSample = (sample: string) => {
    setPhoneNumber(sample);
    setSaveMessage(null);
    const res = analyzeNumberSequence(sample);
    setCurrentResult(res);
  };

  const handleSaveToSheet = async () => {
    if (!currentResult) return;
    setIsSaving(true);
    setSaveMessage(null);

    const record = formatAnalysisToRecord(currentResult);
    const result = await onSaveToGas(record);

    setIsSaving(false);
    setSaveMessage({
      type: result.success ? 'success' : 'error',
      text: result.message,
    });
  };

  return (
    <div className="space-y-6 pb-12">
      {/* Tiêu đề & Ô Nhập Liệu */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-bold mb-3">
            <Hash className="w-4 h-4 text-blue-700" />
            <span>Công Cụ Phân Tích Linh Số Bát Pháp</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Tra Cứu &amp; Luận Giải Năng Lượng Dãy Số
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Nhập số điện thoại, biển số xe, số tài khoản hoặc căn cước. Hệ thống tự động bóc tách từng cặp số, kiểm tra tác động âm dương ngũ hành và đưa ra lời khuyên cải vận chuẩn xác.
          </p>
        </div>

        {/* Form nhập số */}
        <form onSubmit={handleAnalyze} className="mt-6">
          <div className="flex flex-col sm:flex-row gap-3">
            <div className="relative flex-1">
              <input
                type="text"
                value={phoneNumber}
                onChange={(e) => setPhoneNumber(e.target.value)}
                placeholder="Nhập số điện thoại (ví dụ: 0988686831)..."
                className="w-full bg-slate-50 border-2 border-slate-300 focus:border-blue-600 focus:bg-white text-slate-900 font-bold text-lg sm:text-xl pl-12 pr-4 py-3.5 rounded-xl outline-none transition-all min-h-[52px]"
                aria-label="Số điện thoại hoặc dãy số cần tra cứu"
              />
              <Hash className="w-6 h-6 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>

            <button
              type="submit"
              className="px-7 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[52px] cursor-pointer"
            >
              <Search className="w-5 h-5" />
              <span>Phân Tích Ngay</span>
            </button>

            <a
              href="https://claude.ai/artifact/Lq9Uj7LgY3cEauv2reFFUm"
              target="_blank"
              rel="noopener noreferrer"
              className="px-5 py-3.5 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-base sm:text-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[52px] cursor-pointer shrink-0"
              title="Mở công cụ bản phân tích nâng cao"
            >
              <ExternalLink className="w-5 h-5" />
              <span>Bản Phân Tích Nâng Cao</span>
            </a>
          </div>

          {/* Dãy số mẫu để thử nhanh & link phân tích */}
          <div className="mt-4 flex flex-wrap items-center justify-between gap-3 pt-2 border-t border-slate-100">
            <div className="flex flex-wrap items-center gap-2">
              <span className="text-sm font-semibold text-slate-500">Thử nhanh mẫu:</span>
              {sampleNumbers.map((s) => (
                <button
                  key={s.phone}
                  type="button"
                  onClick={() => handleSelectSample(s.phone)}
                  className="px-3 py-1.5 rounded-lg bg-slate-100 hover:bg-blue-100 hover:text-blue-900 text-slate-700 text-sm font-medium transition-colors cursor-pointer border border-slate-200"
                >
                  {s.label}: <strong className="font-mono">{s.phone}</strong>
                </button>
              ))}
            </div>

            <a
              href="https://claude.ai/artifact/Lq9Uj7LgY3cEauv2reFFUm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 text-amber-800 hover:text-amber-950 font-bold text-sm bg-amber-50 hover:bg-amber-100/80 px-3 py-1.5 rounded-lg border border-amber-200/80 transition-colors"
            >
              <ExternalLink className="w-4 h-4 text-amber-600" />
              <span>Liên kết Bản Phân Tích Nâng Cao</span>
            </a>
          </div>
        </form>
      </div>

      {/* KẾT QUẢ PHÂN TÍCH */}
      {currentResult && currentResult.cacCapSo.length > 0 && (
        <div className="space-y-6">
          {/* Thẻ Tổng Điểm & Đánh Giá */}
          <div className="bg-gradient-to-br from-slate-900 via-blue-950 to-indigo-950 text-white rounded-3xl p-6 sm:p-8 shadow-md border border-blue-900">
            <div className="flex flex-col md:flex-row items-center justify-between gap-6">
              
              {/* Điểm số & Danh hiệu */}
              <div className="flex items-center gap-5 text-center sm:text-left">
                <div className={`w-24 h-24 rounded-2xl flex flex-col items-center justify-center shrink-0 border-4 shadow-lg ${
                  currentResult.diemSo >= 80 
                    ? 'border-emerald-400 bg-emerald-950/70 text-emerald-300' 
                    : currentResult.diemSo >= 60 
                    ? 'border-blue-400 bg-blue-950/70 text-blue-300' 
                    : 'border-rose-400 bg-rose-950/70 text-rose-300'
                }`}>
                  <span className="text-3xl font-black">{currentResult.diemSo}</span>
                  <span className="text-[11px] font-bold uppercase tracking-wider text-slate-300">Điểm</span>
                </div>

                <div>
                  <div className="text-xs uppercase tracking-widest text-blue-300 font-bold mb-1">
                    KẾT QUẢ ĐÁNH GIÁ PHONG THỦY SỐ:
                  </div>
                  <h3 className="text-2xl sm:text-3xl font-black text-white">
                    {currentResult.danhGia}
                  </h3>
                  <p className="text-sm sm:text-base text-blue-200 mt-1 font-mono font-medium">
                    Dãy số phân tích: <strong className="text-white text-lg">{currentResult.daySoGoc}</strong>
                  </p>
                </div>
              </div>

              {/* Tỷ lệ Cát - Hung */}
              <div className="w-full md:w-auto bg-white/10 backdrop-blur-xs p-4 rounded-2xl border border-white/10 flex items-center justify-around gap-6">
                <div className="text-center">
                  <div className="text-2xl font-black text-emerald-400">
                    {currentResult.soLuongCat}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">Cặp Cát Tinh</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-black text-rose-400">
                    {currentResult.soLuongHung}
                  </div>
                  <div className="text-xs font-semibold text-slate-300">Cặp Hung Tinh</div>
                </div>
                <div className="h-8 w-px bg-white/20" />
                <div className="text-center">
                  <div className="text-2xl font-black text-amber-300">
                    {currentResult.tiLeCat}%
                  </div>
                  <div className="text-xs font-semibold text-slate-300">Tỷ Lệ Vượng</div>
                </div>
              </div>

            </div>
          </div>

          {/* BÓC TÁCH TỪNG CẶP SỐ LIÊN TIẾP */}
          <div className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <h4 className="text-xl font-bold text-slate-900 mb-2">
              Bóc Tách {currentResult.cacCapSo.length} Cặp Năng Lượng Liên Tiếp
            </h4>
            <p className="text-sm sm:text-base text-slate-600 mb-6">
              Mỗi 2 chữ số đi liền nhau tạo thành một từ trường điện từ trường tương ứng trong Dịch học:
            </p>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5">
              {currentResult.cacCapSo.map((cap, idx) => {
                const isCat = cap.nhom === 'Cát Tinh';
                const isHung = cap.nhom === 'Hung Tinh';
                const isTail = idx === currentResult.cacCapSo.length - 1;

                return (
                  <div
                    key={`${cap.capSo}-${idx}`}
                    className={`p-4 rounded-xl border-2 transition-all relative ${
                      isCat
                        ? 'border-emerald-200 bg-emerald-50/30'
                        : isHung
                        ? 'border-rose-200 bg-rose-50/30'
                        : 'border-slate-200 bg-slate-50'
                    }`}
                  >
                    {isTail && (
                      <span className="absolute -top-2.5 right-3 text-[11px] font-bold px-2 py-0.5 rounded-full bg-blue-700 text-white shadow-xs">
                        Đuôi Hậu Vận
                      </span>
                    )}

                    <div className="flex items-center justify-between mb-2">
                      <span className="font-mono text-2xl font-black text-slate-900">
                        {cap.capSo}
                      </span>
                      <span className={`text-xs font-bold px-2 py-0.5 rounded-md ${
                        isCat 
                          ? 'bg-emerald-100 text-emerald-800' 
                          : isHung 
                          ? 'bg-rose-100 text-rose-800' 
                          : 'bg-slate-200 text-slate-800'
                      }`}>
                        {cap.tuTruong}
                      </span>
                    </div>

                    <div className="text-xs font-semibold text-slate-500 mb-1">
                      {cap.capDo} • Ngũ hành: {cap.nguHanh}
                    </div>

                    <p className="text-sm text-slate-700 font-medium line-clamp-2">
                      {cap.yNghia}
                    </p>
                  </div>
                );
              })}
            </div>
          </div>

          {/* NHẬN ĐỊNH & LỜI KHUYÊN CẢI VẬN */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            
            <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
              <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-blue-700" />
                <span>Nhận Định Tổng Quan Vận Trình</span>
              </h4>
              <p className="text-base text-slate-700 leading-relaxed font-medium bg-slate-50 p-4 rounded-xl border border-slate-200">
                {currentResult.nhanDinhTongQuan}
              </p>

              {currentResult.coHoaGiai && (
                <div className="mt-4 p-4 rounded-xl bg-emerald-50 border border-emerald-200">
                  <div className="text-xs font-bold text-emerald-800 uppercase mb-1 flex items-center gap-1.5">
                    <CheckCircle2 className="w-4 h-4 text-emerald-700" />
                    <span>Phát hiện thế chuyển hóa hóa giải:</span>
                  </div>
                  <ul className="list-disc list-inside text-sm text-emerald-900 font-medium space-y-1">
                    {currentResult.chiTietHoaGiai.map((hg, i) => (
                      <li key={i}>{hg}</li>
                    ))}
                  </ul>
                </div>
              )}
            </div>

            <div className="bg-amber-50/70 rounded-2xl p-6 border border-amber-200 shadow-xs flex flex-col justify-between">
              <div>
                <h4 className="text-lg font-bold text-amber-950 mb-3 flex items-center gap-2">
                  <Lightbulb className="w-5 h-5 text-amber-600" />
                  <span>Lời Khuyên Cải Vận Từ Chuyên Gia</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                  {currentResult.loiKhuyenCaiVan}
                </p>
              </div>

              {/* Nút Lưu Vào Google Sheets */}
              <div className="mt-6 pt-4 border-t border-amber-200/80">
                {saveMessage && (
                  <div className={`p-3 rounded-xl mb-3 text-sm font-semibold flex items-center gap-2 ${
                    saveMessage.type === 'success' 
                      ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' 
                      : 'bg-rose-100 text-rose-900 border border-rose-300'
                  }`}>
                    {saveMessage.type === 'success' ? <CheckCircle2 className="w-4 h-4 shrink-0" /> : <AlertTriangle className="w-4 h-4 shrink-0" />}
                    <span>{saveMessage.text}</span>
                  </div>
                )}

                <button
                  type="button"
                  onClick={handleSaveToSheet}
                  disabled={isSaving}
                  className="w-full py-3.5 px-6 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base transition-all flex items-center justify-center gap-2 min-h-[48px] shadow-sm cursor-pointer disabled:opacity-50"
                >
                  <Save className="w-5 h-5" />
                  <span>{isSaving ? 'Đang lưu vào Google Sheets...' : 'Lưu Bản Ghi Này Vào Google Sheets (Sheet "TraCuuSo")'}</span>
                </button>

                <a
                  href="https://claude.ai/artifact/Lq9Uj7LgY3cEauv2reFFUm"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="w-full mt-2.5 py-3 px-6 rounded-xl bg-amber-100/90 hover:bg-amber-200 text-amber-950 font-bold text-sm sm:text-base transition-all flex items-center justify-center gap-2 border border-amber-300 shadow-xs"
                  title="Mở bản phân tích nâng cao chi tiết"
                >
                  <ExternalLink className="w-4 h-4 text-amber-800" />
                  <span>Bản Phân Tích Nâng Cao</span>
                </a>
              </div>

            </div>

          </div>
        </div>
      )}
    </div>
  );
};
