import React, { useState, useMemo } from 'react';
import { 
  Search, 
  Filter, 
  ShieldCheck, 
  ShieldAlert, 
  Sparkles, 
  Layers, 
  Info, 
  X, 
  Compass, 
  HeartHandshake, 
  Briefcase, 
  Coins, 
  Activity,
  ArrowRight
} from 'lucide-react';
import { TuTruong, NhomNangLuong } from '../types';

interface DictionaryModuleProps {
  tuTruongList: TuTruong[];
  searchQuery: string;
  onSearchQueryChange: (q: string) => void;
  selectedTuTruong: TuTruong | null;
  onSelectTuTruong: (item: TuTruong | null) => void;
  onNavigateToTab?: (tab: any, videoId?: string) => void;
}

export const DictionaryModule: React.FC<DictionaryModuleProps> = ({
  tuTruongList,
  searchQuery,
  onSearchQueryChange,
  selectedTuTruong,
  onSelectTuTruong,
  onNavigateToTab,
}) => {
  const [filterGroup, setFilterGroup] = useState<'All' | 'Cát Tinh' | 'Hung Tinh'>('All');

  // Lọc và tìm kiếm từ trường
  const filteredList = useMemo(() => {
    return tuTruongList.filter((item) => {
      // Lọc theo nhóm
      if (filterGroup !== 'All' && item.NhomNangLuong !== filterGroup) {
        return false;
      }
      // Lọc theo từ khóa tìm kiếm (số hoặc tên)
      if (searchQuery.trim()) {
        const query = searchQuery.toLowerCase().trim();
        const matchName = item.TenTuTruong.toLowerCase().includes(query);
        const matchCode = item.MaSo.toLowerCase().includes(query);
        const matchMeaning = item.YNghia.toLowerCase().includes(query);
        return matchName || matchCode || matchMeaning;
      }
      return true;
    });
  }, [tuTruongList, filterGroup, searchQuery]);

  return (
    <div className="space-y-6 pb-12">
      {/* Tiêu đề & Giới thiệu */}
      <div className="bg-white rounded-2xl p-6 border border-slate-200 shadow-xs">
        <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
          Từ Điển Năng Lượng Bát Cực Linh Số
        </h2>
        <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
          Tra cứu 8 từ trường số đại diện cho 64 quẻ Dịch. Nhập số bất kỳ (ví dụ: <strong className="text-blue-700">14</strong>, <strong className="text-blue-700">68</strong>, <strong className="text-blue-700">19</strong>) hoặc tên từ trường để xem chi tiết ý nghĩa và cách cải vận.
        </p>

        {/* Banner liên kết nhanh đến Podcast 10:48 của 8 Từ Trường */}
        <div className="mt-4 p-3.5 rounded-2xl bg-amber-500/10 border border-amber-300 flex items-center justify-between flex-wrap gap-3">
          <div className="flex items-center gap-2.5">
            <Sparkles className="w-5 h-5 text-amber-700 shrink-0" />
            <span className="text-sm font-semibold text-amber-950">
              Mới cập nhật: <strong>Podcast 10:48</strong> luận giải chuyên sâu 4 trụ cột (Tính Cách • Tài Vận • Gia Đạo • Sức Khỏe) của trọn vẹn 8 Từ Trường!
            </span>
          </div>
          {onNavigateToTab && (
            <button
              type="button"
              onClick={() => onNavigateToTab('videos', 'video-4')}
              className="px-3.5 py-1.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
            >
              <span>Nghe Podcast 10:48</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </button>
          )}
        </div>

        {/* Thanh Tìm Kiếm & Bộ Lọc Nâng Cao */}
        <div className="mt-6 flex flex-col sm:flex-row gap-3">
          {/* Ô Tìm Kiếm To Bản */}
          <div className="relative flex-1">
            <input
              type="text"
              value={searchQuery}
              onChange={(e) => onSearchQueryChange(e.target.value)}
              placeholder="Nhập số (14, 41, 13, 19, 12...) hoặc tên (Sinh Khí, Thiên Y...)"
              className="w-full bg-slate-50 border-2 border-slate-200 focus:border-blue-600 focus:bg-white text-slate-900 font-medium text-base sm:text-lg pl-12 pr-10 py-3.5 rounded-xl outline-none transition-all min-h-[50px]"
              aria-label="Tìm kiếm từ trường số"
            />
            <Search className="w-6 h-6 text-slate-400 absolute left-3.5 top-3.5 pointer-events-none" />
            {searchQuery && (
              <button
                type="button"
                onClick={() => onSearchQueryChange('')}
                className="absolute right-3.5 top-3.5 p-1 rounded-md text-slate-400 hover:text-slate-600"
                aria-label="Xóa tìm kiếm"
              >
                <X className="w-5 h-5" />
              </button>
            )}
          </div>

          {/* Nút Bộ Lọc Nhóm Cát / Hung */}
          <div className="flex items-center gap-1.5 p-1 bg-slate-100 rounded-xl border border-slate-200 shrink-0">
            <button
              type="button"
              onClick={() => setFilterGroup('All')}
              className={`px-4 py-2.5 rounded-lg text-base font-bold transition-all min-h-[44px] cursor-pointer ${
                filterGroup === 'All'
                  ? 'bg-blue-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-slate-900 hover:bg-slate-200/60'
              }`}
            >
              Tất Cả (8)
            </button>
            <button
              type="button"
              onClick={() => setFilterGroup('Cát Tinh')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-bold transition-all min-h-[44px] cursor-pointer ${
                filterGroup === 'Cát Tinh'
                  ? 'bg-emerald-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-emerald-800 hover:bg-emerald-50'
              }`}
            >
              <ShieldCheck className="w-5 h-5" />
              <span>Tứ Cát Tinh</span>
            </button>
            <button
              type="button"
              onClick={() => setFilterGroup('Hung Tinh')}
              className={`inline-flex items-center gap-1.5 px-4 py-2.5 rounded-lg text-base font-bold transition-all min-h-[44px] cursor-pointer ${
                filterGroup === 'Hung Tinh'
                  ? 'bg-rose-700 text-white shadow-sm'
                  : 'text-slate-700 hover:text-rose-800 hover:bg-rose-50'
              }`}
            >
              <ShieldAlert className="w-5 h-5" />
              <span>Tứ Hung Tinh</span>
            </button>
          </div>
        </div>
      </div>

      {/* Kết Quả Danh Sách */}
      {filteredList.length === 0 ? (
        <div className="bg-white rounded-2xl p-12 text-center border border-slate-200 shadow-xs">
          <p className="text-xl font-bold text-slate-800 mb-2">Không tìm thấy từ trường nào</p>
          <p className="text-base text-slate-600 mb-4">
            Không có kết quả phù hợp với từ khóa "{searchQuery}". Vui lòng thử lại với các số ví dụ: 14, 13, 19, 11, 12, 18, 16, 17.
          </p>
          <button
            type="button"
            onClick={() => {
              onSearchQueryChange('');
              setFilterGroup('All');
            }}
            className="px-6 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-xl text-base transition-colors"
          >
            Xem lại tất cả 8 từ trường
          </button>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {filteredList.map((item) => {
            const isCat = item.NhomNangLuong === 'Cát Tinh';
            return (
              <article
                key={item.TenTuTruong}
                onClick={() => onSelectTuTruong(item)}
                className={`bg-white rounded-2xl p-6 border-2 transition-all cursor-pointer shadow-xs hover:shadow-md ${
                  isCat
                    ? 'border-emerald-200 hover:border-emerald-500'
                    : 'border-rose-200 hover:border-rose-500'
                }`}
              >
                {/* Header Card */}
                <div className="flex items-start justify-between gap-3 mb-3">
                  <div>
                    <div className="flex items-center gap-2 mb-1">
                      <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                        isCat ? 'bg-emerald-100 text-emerald-800' : 'bg-rose-100 text-rose-800'
                      }`}>
                        {item.NhomNangLuong}
                      </span>
                      {item.NguHanh && (
                        <span className="text-xs font-medium text-slate-500">
                          Ngũ hành: {item.NguHanh}
                        </span>
                      )}
                    </div>
                    <h3 className="text-2xl font-black text-slate-900">
                      {item.TenTuTruong}
                    </h3>
                  </div>

                  <div className={`p-2.5 rounded-xl shrink-0 ${isCat ? 'bg-emerald-50 text-emerald-700' : 'bg-rose-50 text-rose-700'}`}>
                    {isCat ? <ShieldCheck className="w-6 h-6" /> : <ShieldAlert className="w-6 h-6" />}
                  </div>
                </div>

                {/* Dãy Số Thuộc Từ Trường */}
                <div className="bg-slate-50 border border-slate-200 rounded-xl p-3 mb-4">
                  <div className="text-xs text-slate-500 font-semibold mb-1">CÁC CẶP SỐ ĐẠI DIỆN:</div>
                  <div className="text-lg font-mono font-bold text-blue-900 tracking-wide">
                    {item.MaSo}
                  </div>
                </div>

                {/* Tóm tắt ý nghĩa */}
                <p className="text-base text-slate-700 font-medium leading-relaxed mb-4">
                  {item.YNghia}
                </p>

                {/* Ứng dụng cải vận thu gọn */}
                <div className="border-t border-slate-100 pt-3">
                  <div className="text-xs font-bold text-amber-800 uppercase mb-1 flex items-center gap-1">
                    <Sparkles className="w-3.5 h-3.5" />
                    <span>Ứng dụng cải vận:</span>
                  </div>
                  <p className="text-sm text-slate-600 line-clamp-2">
                    {item.UngDungCaiVan}
                  </p>
                </div>

                {/* Nút Xem Chi Tiết To Bản */}
                <div className="mt-5">
                  <button
                    type="button"
                    className={`w-full py-3 px-4 rounded-xl font-bold text-base transition-colors min-h-[48px] flex items-center justify-center gap-2 ${
                      isCat 
                        ? 'bg-emerald-50 text-emerald-800 hover:bg-emerald-100 border border-emerald-200' 
                        : 'bg-rose-50 text-rose-800 hover:bg-rose-100 border border-rose-200'
                    }`}
                  >
                    <span>Xem Phân Tích Chi Tiết 4 Cấp Độ</span>
                  </button>
                </div>
              </article>
            );
          })}
        </div>
      )}

      {/* POPUP / MODAL CHI TIẾT TỪ TRƯỜNG */}
      {selectedTuTruong && (
        <div 
          className="fixed inset-0 z-50 bg-slate-900/70 backdrop-blur-xs flex items-center justify-center p-3 sm:p-6 overflow-y-auto"
          onClick={() => onSelectTuTruong(null)}
        >
          <div 
            className="bg-white w-full max-w-3xl rounded-3xl shadow-2xl border border-slate-200 overflow-hidden my-auto max-h-[90vh] flex flex-col"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Header Modal */}
            <div className={`p-6 border-b text-white flex items-center justify-between ${
              selectedTuTruong.NhomNangLuong === 'Cát Tinh' 
                ? 'bg-gradient-to-r from-emerald-800 to-teal-800' 
                : 'bg-gradient-to-r from-rose-800 to-red-800'
            }`}>
              <div>
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-xs font-bold uppercase tracking-wider bg-white/20 px-2.5 py-0.5 rounded-full">
                    {selectedTuTruong.NhomNangLuong}
                  </span>
                  {selectedTuTruong.NguHanh && (
                    <span className="text-xs text-white/80">
                      Ngũ hành: {selectedTuTruong.NguHanh}
                    </span>
                  )}
                </div>
                <h3 className="text-2xl sm:text-3xl font-black">
                  Từ Trường: {selectedTuTruong.TenTuTruong}
                </h3>
                <p className="text-sm font-mono text-white/90 mt-1 font-semibold">
                  Mã số: {selectedTuTruong.MaSo}
                </p>
              </div>

              <button
                type="button"
                onClick={() => onSelectTuTruong(null)}
                className="w-12 h-12 rounded-xl bg-white/20 hover:bg-white/30 text-white flex items-center justify-center transition-colors min-h-[48px] shrink-0 cursor-pointer"
                aria-label="Đóng chi tiết"
              >
                <X className="w-6 h-6" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 sm:p-8 space-y-6 overflow-y-auto flex-1">
              
              {/* Ý nghĩa tổng quát */}
              <div className="bg-blue-50/70 border border-blue-200 rounded-2xl p-5">
                <h4 className="text-lg font-bold text-blue-900 mb-2 flex items-center gap-2">
                  <Info className="w-5 h-5 text-blue-700" />
                  <span>Ý Nghĩa Cốt Lõi</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                  {selectedTuTruong.YNghia}
                </p>
              </div>

              {/* 4 Cấp Độ Năng Lượng */}
              {selectedTuTruong.CapDoNangLuong && (
                <div>
                  <h4 className="text-lg font-bold text-slate-900 mb-3 flex items-center gap-2">
                    <Layers className="w-5 h-5 text-blue-700" />
                    <span>4 Cấp Độ Năng Lượng Của Từ Trường</span>
                  </h4>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md inline-block mb-1">
                        Cấp Độ 1 (Cực Thịnh)
                      </span>
                      <p className="text-sm sm:text-base text-slate-700 font-semibold">
                        {selectedTuTruong.CapDoNangLuong.cap1}
                      </p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-xs font-bold text-blue-800 bg-blue-100 px-2 py-0.5 rounded-md inline-block mb-1">
                        Cấp Độ 2 (Mạnh)
                      </span>
                      <p className="text-sm sm:text-base text-slate-700 font-semibold">
                        {selectedTuTruong.CapDoNangLuong.cap2}
                      </p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md inline-block mb-1">
                        Cấp Độ 3 (Trung Bình)
                      </span>
                      <p className="text-sm sm:text-base text-slate-700 font-semibold">
                        {selectedTuTruong.CapDoNangLuong.cap3}
                      </p>
                    </div>
                    <div className="p-3.5 bg-slate-50 border border-slate-200 rounded-xl">
                      <span className="text-xs font-bold text-slate-700 bg-slate-200 px-2 py-0.5 rounded-md inline-block mb-1">
                        Cấp Độ 4 (Nhẹ)
                      </span>
                      <p className="text-sm sm:text-base text-slate-700 font-semibold">
                        {selectedTuTruong.CapDoNangLuong.cap4}
                      </p>
                    </div>
                  </div>
                </div>
              )}

              {/* Mô tả chi tiết tính cách & vận trình */}
              <div>
                <h4 className="text-lg font-bold text-slate-900 mb-2 flex items-center gap-2">
                  <Compass className="w-5 h-5 text-indigo-700" />
                  <span>Mô Tả Chi Tiết Vận Trình &amp; Tính Cách</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-700 leading-relaxed bg-slate-50 p-5 rounded-2xl border border-slate-200">
                  {selectedTuTruong.MoTaChiTiet}
                </p>
              </div>

              {/* Ứng dụng cải vận */}
              <div className="bg-amber-50 border border-amber-200 rounded-2xl p-5">
                <h4 className="text-lg font-bold text-amber-900 mb-2 flex items-center gap-2">
                  <Sparkles className="w-5 h-5 text-amber-600" />
                  <span>Ứng Dụng Thực Tiễn &amp; Phương Pháp Cải Vận</span>
                </h4>
                <p className="text-base sm:text-lg text-slate-800 leading-relaxed font-medium">
                  {selectedTuTruong.UngDungCaiVan}
                </p>
              </div>

            </div>

            {/* Modal Footer */}
            <div className="p-4 bg-slate-100 border-t border-slate-200 flex justify-end">
              <button
                type="button"
                onClick={() => onSelectTuTruong(null)}
                className="px-6 py-3 bg-slate-800 hover:bg-slate-900 text-white font-bold rounded-xl text-base min-h-[48px] cursor-pointer"
              >
                Đóng Cửa Sổ
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
