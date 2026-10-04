import React, { useState } from 'react';
import { 
  ArrowLeftRight, 
  Sparkles, 
  ShieldCheck, 
  ShieldAlert, 
  Lightbulb, 
  CheckCircle2, 
  HelpCircle,
  Zap,
  ArrowRight
} from 'lucide-react';
import { ChuyenHoa } from '../types';

interface TransformationModuleProps {
  chuyenHoaList: ChuyenHoa[];
}

export const TransformationModule: React.FC<TransformationModuleProps> = ({
  chuyenHoaList,
}) => {
  // Danh sách các từ trường gốc phổ biến để chọn
  const baseFields = [
    { id: 'all', name: 'Tất Cả Phép Chuyển Hóa' },
    { id: 'Tuyệt Mệnh', name: 'Tuyệt Mệnh (Kim Hung)' },
    { id: 'Họa Hại', name: 'Họa Hại (Thổ Hung)' },
    { id: 'Lục Sát', name: 'Lục Sát (Thủy Hung)' },
    { id: 'Ngũ Quỷ', name: 'Ngũ Quỷ (Hỏa Hung)' },
    { id: 'Sinh Khí', name: 'Sinh Khí (Mộc Cát)' },
    { id: 'Thiên Y', name: 'Thiên Y (Thổ Cát)' },
  ];

  const [selectedBase, setSelectedBase] = useState('all');

  const filteredChuyenHoa = chuyenHoaList.filter((item) => {
    if (selectedBase === 'all') return true;
    return item.TuTruongGoc.includes(selectedBase);
  });

  return (
    <div className="space-y-6 pb-12">
      {/* Tiêu đề & Nguyên lý Chuyển Hóa */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs">
        <div className="max-w-3xl">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-bold mb-3">
            <Zap className="w-4 h-4 text-amber-600" />
            <span>Thuật Chuyển Hóa Năng Lượng Đỉnh Cao</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-3">
            Sự Chuyển Hóa &amp; Hóa Giải Từ Trường Số
          </h2>
          <p className="text-base sm:text-lg text-slate-700 leading-relaxed">
            Trong Bát Cực Linh Số, bí quyết không nằm ở việc chọn toàn số đẹp (vì thuần Cát dễ sinh biếng trễ), mà nằm ở nguyên tắc <strong>"Lấy Cát Chế Hung"</strong>. Sắp xếp các cặp số tương ứng liền kề để thuần hóa năng lượng hung tinh, biến áp lực thành động lực và mở ra tài lộc dồi dào.
          </p>
        </div>

        {/* Thanh chọn Từ trường gốc tương tác */}
        <div className="mt-8 pt-6 border-t border-slate-200">
          <label className="block text-base font-bold text-slate-900 mb-3">
            Bước 1: Chọn Từ Trường Cần Xem Cách Chuyển Hóa &amp; Hóa Giải:
          </label>
          <div className="flex flex-wrap gap-2.5">
            {baseFields.map((f) => {
              const isSelected = selectedBase === f.id;
              return (
                <button
                  key={f.id}
                  type="button"
                  onClick={() => setSelectedBase(f.id)}
                  className={`px-4 py-3 rounded-xl font-bold text-base transition-all min-h-[48px] cursor-pointer ${
                    isSelected
                      ? 'bg-blue-700 text-white shadow-md ring-2 ring-blue-500'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-800'
                  }`}
                >
                  {f.name}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* 3 Khẩu Quyết Vàng */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div className="bg-emerald-50 border-2 border-emerald-200 rounded-2xl p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-emerald-800 mb-1">
            Khẩu quyết 1:
          </div>
          <h4 className="text-lg font-black text-emerald-950 mb-2">
            Thiên Y chế Tuyệt Mệnh
          </h4>
          <p className="text-sm sm:text-base text-slate-700">
            Dùng trí tuệ và phúc lộc chân chính của Thiên Y để thuần hóa tính liều lĩnh, hao tài của Tuyệt Mệnh.
          </p>
        </div>

        <div className="bg-blue-50 border-2 border-blue-200 rounded-2xl p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-blue-800 mb-1">
            Khẩu quyết 2:
          </div>
          <h4 className="text-lg font-black text-blue-950 mb-2">
            Sinh Khí giáng Họa Hại
          </h4>
          <p className="text-sm sm:text-base text-slate-700">
            Dùng tâm thế rộng lượng và quý nhân của Sinh Khí để tiêu trừ khẩu thiệt thị phi và tranh cãi của Họa Hại.
          </p>
        </div>

        <div className="bg-indigo-50 border-2 border-indigo-200 rounded-2xl p-5">
          <div className="text-xs font-bold uppercase tracking-wider text-indigo-800 mb-1">
            Khẩu quyết 3:
          </div>
          <h4 className="text-lg font-black text-indigo-950 mb-2">
            Diên Niên áp Lục Sát
          </h4>
          <p className="text-sm sm:text-base text-slate-700">
            Dùng ý chí kỷ luật và bản lĩnh kiên cường của Diên Niên để làm chủ cảm xúc đa sầu và đào hoa sát của Lục Sát.
          </p>
        </div>
      </div>

      {/* Danh sách các phép chuyển hóa chi tiết */}
      <div className="space-y-5">
        <h3 className="text-xl font-bold text-slate-900 flex items-center gap-2">
          <ArrowLeftRight className="w-6 h-6 text-blue-700" />
          <span>Chi Tiết Các Phép Chuyển Hóa Năng Lượng ({filteredChuyenHoa.length})</span>
        </h3>

        {filteredChuyenHoa.length === 0 ? (
          <div className="bg-white rounded-2xl p-8 text-center border border-slate-200">
            <p className="text-base text-slate-600">Không có phép chuyển hóa nào phù hợp với bộ lọc hiện tại.</p>
          </div>
        ) : (
          filteredChuyenHoa.map((item, idx) => (
            <div
              key={item.ID || idx}
              className="bg-white rounded-2xl p-6 sm:p-7 border border-slate-200 shadow-xs hover:border-blue-300 transition-all"
            >
              {/* Tên Phép Chuyển Hóa */}
              <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-3 pb-4 border-b border-slate-100">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center font-bold text-lg">
                    {idx + 1}
                  </div>
                  <div>
                    <h4 className="text-xl sm:text-2xl font-black text-blue-900">
                      {item.PhuongPhap || `Chuyển hóa ${item.TuTruongGoc.split(' ')[0]}`}
                    </h4>
                    <span className="text-xs text-slate-500 font-medium">Bát Cực Linh Số Chân Truyền</span>
                  </div>
                </div>

                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full bg-slate-100 text-slate-700 text-xs font-semibold self-start sm:self-auto">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                  <span>Quy tắc chuẩn hóa</span>
                </div>
              </div>

              {/* Sơ Đồ Chuyển Đổi Trực Quan */}
              <div className="my-5 p-4 rounded-xl bg-slate-50 border border-slate-200 flex flex-col md:flex-row items-center justify-between gap-4">
                {/* Vế Gốc */}
                <div className="flex-1 w-full p-3 bg-white rounded-xl border border-rose-200 text-center">
                  <span className="text-xs font-bold text-rose-700 uppercase block mb-1">
                    TỪ TRƯỜNG GỐC (CẦN HÓA GIẢI / KẾT HỢP)
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.TuTruongGoc}
                  </span>
                </div>

                {/* Mũi tên chuyển hóa */}
                <div className="shrink-0 flex items-center justify-center p-3 rounded-full bg-blue-600 text-white shadow-sm">
                  <ArrowRight className="w-6 h-6 rotate-90 md:rotate-0" />
                </div>

                {/* Vế Chuyển Đổi */}
                <div className="flex-1 w-full p-3 bg-white rounded-xl border border-emerald-200 text-center">
                  <span className="text-xs font-bold text-emerald-700 uppercase block mb-1">
                    TỪ TRƯỜNG KẾ THỪA / HÓA GIẢI
                  </span>
                  <span className="text-lg sm:text-xl font-bold text-slate-900">
                    {item.TuTruongChuyenDoi}
                  </span>
                </div>
              </div>

              {/* Ý nghĩa chuyển hóa */}
              <div className="space-y-3">
                <div className="flex items-start gap-3">
                  <Sparkles className="w-5 h-5 text-amber-600 shrink-0 mt-1" />
                  <div>
                    <strong className="text-base font-bold text-slate-900">Cơ chế tác động: </strong>
                    <span className="text-base text-slate-700 leading-relaxed font-medium">
                      {item.YNghiaChuyenHoa}
                    </span>
                  </div>
                </div>

                {/* Lời khuyên cụ thể */}
                <div className="flex items-start gap-3 bg-amber-50/70 p-4 rounded-xl border border-amber-200">
                  <Lightbulb className="w-5 h-5 text-amber-700 shrink-0 mt-1" />
                  <div>
                    <strong className="text-base font-bold text-amber-950">Lời khuyên phối số: </strong>
                    <p className="text-base text-slate-800 leading-relaxed mt-1 font-medium">
                      {item.LoiKhuyen}
                    </p>
                  </div>
                </div>
              </div>
            </div>
          ))
        )}
      </div>
    </div>
  );
};
