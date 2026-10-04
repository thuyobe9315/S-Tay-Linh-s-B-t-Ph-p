import React, { useState } from 'react';
import { 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  Search, 
  BookOpen, 
  Compass, 
  ArrowLeftRight,
  TrendingUp,
  ExternalLink,
  GraduationCap,
  Layers,
  PhoneCall,
  FileCheck2,
  Camera
} from 'lucide-react';
import { TuTruong, ChuyenHoa } from '../types';
import { NavTab } from './Navigation';
import { HuyenDaoMasterPoster } from './HuyenDaoMasterPoster';
import { TeacherPortraitIllustration } from './TeacherPortraitIllustration';
import { useTeacherImage } from '../context/TeacherImageContext';

interface HomeDashboardProps {
  tuTruongList: TuTruong[];
  chuyenHoaList: ChuyenHoa[];
  onNavigate: (tab: NavTab) => void;
  onSelectTuTruong: (item: TuTruong) => void;
  onQuickLookupPhone: (phone: string) => void;
  isConnectedGas: boolean;
}

export const HomeDashboard: React.FC<HomeDashboardProps> = ({
  tuTruongList,
  chuyenHoaList,
  onNavigate,
  onSelectTuTruong,
  onQuickLookupPhone,
  isConnectedGas,
}) => {
  const { openEditModal } = useTeacherImage();
  const catTinhList = tuTruongList.filter((item) => item.NhomNangLuong === 'Cát Tinh');
  const hungTinhList = tuTruongList.filter((item) => item.NhomNangLuong === 'Hung Tinh');

  const handleBannerLookup = (phoneNumber: string) => {
    onQuickLookupPhone(phoneNumber);
    onNavigate('lookup');
  };

  return (
    <div className="space-y-8 pb-12">
      {/* BANNER THỦY MẶC PHONG THỦY: HUYỀN ĐẠO ĐỖ GIA 4311 */}
      <section>
        <HuyenDaoMasterPoster 
          onQuickLookup={handleBannerLookup} 
          onNavigateToTab={onNavigate} 
        />
      </section>

      {/* MỤC MỚI: BÀI GIẢNG 14 SLIDE LƯỢNG TỬ & CHÂN DUNG CÔ GIÁO ĐỖ GIA */}
      <section className="bg-gradient-to-br from-amber-50 via-orange-50/30 to-amber-100/50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-center">
          {/* Cột Trái: Tranh Chân Dung Cô Giáo */}
          <div className="lg:col-span-4 flex flex-col items-center">
            <div className="relative group cursor-pointer" onClick={() => onNavigate('lectures')}>
              <TeacherPortraitIllustration variant="study-desk" size={320} className="hover:scale-[1.02] transition-transform duration-300 shadow-xl" />
              <div className="absolute inset-0 bg-slate-900/10 opacity-0 group-hover:opacity-100 rounded-3xl transition-opacity flex items-center justify-center">
                <span className="px-4 py-2 rounded-xl bg-amber-600 text-white font-bold text-xs shadow-lg flex items-center gap-1.5">
                  <GraduationCap className="w-4 h-4" />
                  <span>Xem Chi Tiết Giảng Viên</span>
                </span>
              </div>
            </div>
            <p className="mt-2 text-xs font-bold text-amber-900 text-center font-serif">
              Cô Giáo Đỗ Gia • Thấu Hiểu Bản Thân - Kiến Tạo Vận Mệnh
            </p>
            <button
              type="button"
              onClick={openEditModal}
              className="mt-3 px-3.5 py-1.5 rounded-xl bg-white hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-all hover:scale-105 cursor-pointer"
              title="Nhấn để đổi ảnh giáo viên"
            >
              <Camera className="w-3.5 h-3.5 text-amber-700" />
              <span>Sửa Ảnh Giáo Viên</span>
            </button>
          </div>

          {/* Cột Phải: Nội Dung Giới Thiệu 14 Slide Lượng Tử */}
          <div className="lg:col-span-8 space-y-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3 py-1 rounded-full bg-amber-600 text-white font-bold text-xs uppercase tracking-wider shadow-xs">
                Giáo Trình Trực Quan Mới
              </span>
              <span className="text-xs font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
                14 Slide Lượng Tử Hóa Chuẩn Đồ Họa
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-black text-slate-900 font-serif tracking-tight">
              Hệ Tọa Độ Lượng Tử &amp; Từ Trường Các Con Số
            </h3>

            <p className="text-sm sm:text-base text-slate-700 leading-relaxed font-medium">
              Bộ bài giảng 14 slide độc quyền của <strong>Cô Giáo Đỗ Gia</strong> mang đến phương pháp tiếp cận khoa học, trực quan và hiện đại: giải mã Tứ Cát, Tứ Hung, quyền năng số 0 &amp; 5, vùng tử địa, quy trình 4 bước tự luận số và ma trận 2D Cảm Xúc – Lý Trí.
            </p>

            {/* 4 Tôn chỉ nhanh */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5 pt-2">
              {[
                { title: 'Khai Mở Tiềm Năng', icon: '✨' },
                { title: 'Cân Bằng Năng Lượng', icon: '⚖️' },
                { title: 'Hài Hòa Cuộc Sống', icon: '🌸' },
                { title: 'Hướng Đến May Mắn', icon: '🧭' },
              ].map((item, idx) => (
                <div key={idx} className="p-2.5 rounded-xl bg-white border border-amber-200 shadow-2xs text-center">
                  <span className="text-base block mb-0.5">{item.icon}</span>
                  <span className="text-xs font-bold text-amber-950 block">{item.title}</span>
                </div>
              ))}
            </div>

            {/* Call to action buttons */}
            <div className="pt-3 flex flex-wrap items-center gap-3">
              <button
                type="button"
                onClick={() => onNavigate('lectures')}
                className="py-3 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 shadow-sm cursor-pointer"
              >
                <Layers className="w-4 h-4" />
                <span>Khám Phá 14 Slide Lượng Tử</span>
                <ArrowRight className="w-4 h-4" />
              </button>

              <button
                type="button"
                onClick={() => onNavigate('exam')}
                className="py-3 px-5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm uppercase tracking-wider transition-all flex items-center gap-2 shadow-sm border border-amber-300/40 cursor-pointer"
                title="Làm BÀI KIỂM TRA Bát Cực Linh Số"
              >
                <FileCheck2 className="w-4 h-4 text-amber-200" />
                <span>BÀI KIỂM TRA</span>
                <ArrowRight className="w-4 h-4 text-amber-200" />
              </button>

              <a
                href="tel:0768431286"
                className="py-3 px-5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-sm border border-slate-300 transition-all flex items-center gap-2 shadow-2xs"
                title="Gọi Hotline Cô Giáo Đỗ Gia"
              >
                <PhoneCall className="w-4 h-4 text-amber-600" />
                <span>Hotline: 0768431286</span>
              </a>

              <button
                type="button"
                onClick={openEditModal}
                className="py-3 px-4 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 font-bold text-sm border border-amber-300 transition-all flex items-center gap-1.5 shadow-2xs cursor-pointer"
                title="Tự thay hoặc chỉnh sửa ảnh giáo viên"
              >
                <Camera className="w-4 h-4 text-amber-800" />
                <span>Sửa Ảnh Giáo Viên</span>
              </button>
            </div>
          </div>
        </div>
      </section>

      {/* 2 Khối Tứ Đại Cát Tinh & Tứ Đại Hung Tinh */}
      <section className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        
        {/* TỨ ĐẠI CÁT TINH */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-emerald-100 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-emerald-100 text-emerald-800 flex items-center justify-center font-bold">
                <ShieldCheck className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Tứ Đại Cát Tinh</h3>
                <p className="text-sm text-slate-500">4 Nguồn năng lượng may mắn, tài lộc và sinh vượng</p>
              </div>
            </div>
            <span className="text-xs font-bold text-emerald-700 bg-emerald-50 px-3 py-1 rounded-full">
              4 Từ Trường
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {catTinhList.map((item) => (
              <div
                key={item.TenTuTruong}
                onClick={() => {
                  onSelectTuTruong(item);
                  onNavigate('dictionary');
                }}
                className="group p-4 rounded-xl border border-slate-200 hover:border-emerald-400 hover:bg-emerald-50/40 transition-all cursor-pointer bg-slate-50/50"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-bold text-slate-900 group-hover:text-emerald-800">
                    {item.TenTuTruong}
                  </span>
                  <span className="text-xs font-semibold text-emerald-700">
                    {item.NguHanh}
                  </span>
                </div>
                <div className="text-xs font-mono text-blue-700 font-semibold mb-2 bg-blue-50 py-1 px-2 rounded-md">
                  {item.MaSo}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {item.YNghia}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 text-right">
            <button
              type="button"
              onClick={() => onNavigate('dictionary')}
              className="text-base font-bold text-blue-700 hover:text-blue-900 inline-flex items-center gap-1.5"
            >
              <span>Xem toàn bộ Từ Điển Từ Trường</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* TỨ ĐẠI HUNG TINH */}
        <div className="bg-white rounded-2xl p-6 sm:p-7 border border-rose-100 shadow-sm">
          <div className="flex items-center justify-between pb-4 border-b border-slate-100 mb-5">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-rose-100 text-rose-800 flex items-center justify-center font-bold">
                <ShieldAlert className="w-6 h-6" />
              </div>
              <div>
                <h3 className="text-xl font-bold text-slate-900">Tứ Đại Hung Tinh</h3>
                <p className="text-sm text-slate-500">4 Năng lượng thử thách, cần phương pháp chế hóa</p>
              </div>
            </div>
            <span className="text-xs font-bold text-rose-700 bg-rose-50 px-3 py-1 rounded-full">
              4 Từ Trường
            </span>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            {hungTinhList.map((item) => (
              <div
                key={item.TenTuTruong}
                onClick={() => {
                  onSelectTuTruong(item);
                  onNavigate('dictionary');
                }}
                className="group p-4 rounded-xl border border-slate-200 hover:border-rose-300 hover:bg-rose-50/40 transition-all cursor-pointer bg-slate-50/50"
              >
                <div className="flex items-center justify-between mb-1.5">
                  <span className="text-lg font-bold text-slate-900 group-hover:text-rose-800">
                    {item.TenTuTruong}
                  </span>
                  <span className="text-xs font-semibold text-rose-700">
                    {item.NguHanh}
                  </span>
                </div>
                <div className="text-xs font-mono text-rose-700 font-semibold mb-2 bg-rose-50 py-1 px-2 rounded-md">
                  {item.MaSo}
                </div>
                <p className="text-sm text-slate-600 line-clamp-2 leading-relaxed">
                  {item.YNghia}
                </p>
              </div>
            ))}
          </div>

          <div className="mt-5 pt-3 text-right">
            <button
              type="button"
              onClick={() => onNavigate('transformation')}
              className="text-base font-bold text-rose-700 hover:text-rose-900 inline-flex items-center gap-1.5"
            >
              <span>Xem Cách Chuyển Hóa &amp; Hóa Giải</span>
              <ArrowRight className="w-4 h-4" />
            </button>
          </div>
        </div>

      </section>

      {/* KHU VỰC 4 VIDEO BÀI GIẢNG THỰC CHIẾN NỔI BẬT */}
      <section className="bg-gradient-to-br from-slate-900 via-blue-950 to-slate-900 text-white rounded-3xl p-6 sm:p-8 shadow-lg border border-amber-900/50">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 mb-6">
          <div>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 text-xs font-bold mb-2 border border-amber-500/30">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Bài Giảng Trực Quan &amp; Podcast Mới Cập Nhật</span>
            </div>
            <h3 className="text-2xl sm:text-3xl font-black font-serif text-white">
              4 Video Giải Mã Thực Chiến &amp; Podcast 10:48
            </h3>
            <p className="text-sm sm:text-base text-slate-300 mt-1">
              Phân tích chuyên sâu về sim điện thoại, cung Tài Bạch, nguyên lý Thiên Hung – Địa Cát và đại luận 4 trụ cột của 8 Từ Trường.
            </p>
          </div>

          <button
            type="button"
            onClick={() => onNavigate('videos')}
            className="px-5 py-3 rounded-xl bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-base transition-colors flex items-center gap-2 shrink-0 self-start sm:self-auto min-h-[48px] cursor-pointer"
          >
            <span>Mở Trình Chiếu 4 Video</span>
            <ArrowRight className="w-5 h-5" />
          </button>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
          <div
            onClick={() => onNavigate('videos')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
                <span>Video 1 • 00:51</span>
                <span className="bg-red-600/80 text-white px-2 py-0.5 rounded-full text-[10px]">Thực chiến</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-serif line-clamp-2 mb-2">
                Bản Đồ Mật Mã Vận Mệnh: Đọc Số Theo Linh Số
              </h4>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                Tại sao sim toàn số "đại cát" (19/91) dễ gây kiệt sức? Giá trị của Tứ Hung và biến số hố đen số 0.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>Xem bài giảng 1</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('videos')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
                <span>Video 2 • 00:55</span>
                <span className="bg-emerald-600/80 text-white px-2 py-0.5 rounded-full text-[10px]">Cải vận</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-serif line-clamp-2 mb-2">
                Nguyên Lý Thiên Hung – Địa Cát Trong Cải Vận
              </h4>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                Khi hung tinh chiếu cung Tài Bạch: Cách nương tựa tầng Địa đại vận 10 năm để biến việc lớn hóa nhỏ.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>Xem bài giảng 2</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('videos')}
            className="p-4 rounded-2xl bg-white/10 hover:bg-white/15 border border-white/10 transition-all cursor-pointer group flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
                <span>Video 3 • 00:58</span>
                <span className="bg-amber-600/80 text-white px-2 py-0.5 rounded-full text-[10px]">Số Sim</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-white group-hover:text-amber-300 transition-colors font-serif line-clamp-2 mb-2">
                3 Kiểu Năng Lượng Điển Hình Trong Điện Thoại
              </h4>
              <p className="text-xs text-slate-300 line-clamp-3 leading-relaxed">
                Nam châm hút tiền Thiên Y (13, 31, 68, 86), dao hai lưỡi Họa Hại và lực cản vô hình của con số 0.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-white/10 text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>Xem bài giảng 3</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>

          <div
            onClick={() => onNavigate('videos')}
            className="p-4 rounded-2xl bg-gradient-to-b from-amber-500/20 to-red-500/20 hover:from-amber-500/30 hover:to-red-500/30 border-2 border-amber-400/60 transition-all cursor-pointer group flex flex-col justify-between relative shadow-lg"
          >
            <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
              Mới Bổ Sung
            </span>
            <div>
              <div className="flex items-center justify-between text-xs text-amber-300 font-semibold mb-2">
                <span>Podcast 4 • 10:48</span>
                <span className="bg-red-600 text-white px-2 py-0.5 rounded-full text-[10px]">Chuyên Sâu</span>
              </div>
              <h4 className="text-base sm:text-lg font-bold text-amber-200 group-hover:text-white transition-colors font-serif line-clamp-2 mb-2">
                Đại Luận 8 Từ Trường: 4 Trụ Cột Cuộc Đời
              </h4>
              <p className="text-xs text-slate-200 line-clamp-3 leading-relaxed">
                Tính cách – Tài vận – Gia đạo – Sức khỏe của trọn vẹn 8 Từ Trường Bát Cực Linh Số trong podcast 10 phút 48 giây.
              </p>
            </div>
            <div className="mt-4 pt-3 border-t border-amber-400/30 text-xs font-bold text-amber-300 flex items-center gap-1">
              <span>Nghe Podcast 10:48</span>
              <ArrowRight className="w-3.5 h-3.5" />
            </div>
          </div>
        </div>
      </section>

      {/* 3 Trụ Cột Ứng Dụng Nổi Bật */}
      <section className="bg-blue-50/70 border border-blue-100 rounded-3xl p-6 sm:p-8">
        <div className="text-center max-w-2xl mx-auto mb-8">
          <h3 className="text-2xl font-bold text-slate-900">
            Học Thuyết Bát Cực Linh Số &amp; Cải Vận Đời Sống
          </h3>
          <p className="text-base text-slate-600 mt-2">
            Hệ thống hỗ trợ tra cứu chuẩn xác, ứng dụng vào chọn sim phong thủy, số tài khoản, biển số xe và cân bằng năng lượng bản thân.
          </p>
        </div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          
          <div 
            onClick={() => onNavigate('dictionary')}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-800 flex items-center justify-center mb-4">
              <BookOpen className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">1. Từ Điển 64 Quẻ Số</h4>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Tra cứu nhanh mọi cặp số từ 00 đến 99, giải mã tính cách, sự nghiệp, tiền tài và sức khỏe.
            </p>
            <span className="text-sm font-bold text-blue-700 inline-flex items-center gap-1">
              Khám phá từ điển <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('transformation')}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-indigo-100 text-indigo-800 flex items-center justify-center mb-4">
              <ArrowLeftRight className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">2. Thuật Lấy Cát Chế Hung</h4>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Thiên Y chế Tuyệt Mệnh, Diên Niên áp Lục Sát, Sinh Khí giáng Họa Hại. Đổi nguy thành an.
            </p>
            <span className="text-sm font-bold text-blue-700 inline-flex items-center gap-1">
              Xem quy tắc chuyển hóa <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('lookup')}
            className="bg-white p-6 rounded-2xl border border-slate-200 hover:border-blue-500 hover:shadow-md transition-all cursor-pointer"
          >
            <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-800 flex items-center justify-center mb-4">
              <Compass className="w-6 h-6" />
            </div>
            <h4 className="text-lg font-bold text-slate-900 mb-2">3. Máy Phân Tích Dãy Số</h4>
            <p className="text-base text-slate-600 leading-relaxed mb-4">
              Tách từng cặp số, kiểm tra hiệu ứng con số 0 và 5, chấm điểm năng lượng và phân tích cải vận chuyên sâu.
            </p>
            <span className="text-sm font-bold text-blue-700 inline-flex items-center gap-1">
              Bắt đầu tra số <ArrowRight className="w-4 h-4" />
            </span>
          </div>

          <div 
            onClick={() => onNavigate('exam')}
            className="bg-gradient-to-br from-red-50 via-white to-amber-50/60 p-6 rounded-2xl border-2 border-red-300 hover:border-red-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="w-12 h-12 rounded-xl bg-red-100 text-red-800 flex items-center justify-center mb-4 ring-2 ring-red-400/40">
                <FileCheck2 className="w-6 h-6" />
              </div>
              <h4 className="text-lg font-black text-red-950 mb-2 font-serif flex items-center gap-1.5">
                <span>4. BÀI KIỂM TRA</span>
                <span className="text-[10px] font-sans px-1.5 py-0.5 rounded bg-red-600 text-white font-bold uppercase">15 Câu</span>
              </h4>
              <p className="text-base text-slate-600 leading-relaxed mb-4">
                Bộ câu hỏi trắc nghiệm &amp; câu trả lời chuẩn xác đánh giá năng lực thấu hiểu 8 dòng từ trường Bát Cực Linh Số.
              </p>
            </div>
            <span className="text-sm font-black text-red-700 inline-flex items-center gap-1 uppercase tracking-wider">
              Làm bài kiểm tra <ArrowRight className="w-4 h-4" />
            </span>
          </div>

        </div>
      </section>

    </div>
  );
};
