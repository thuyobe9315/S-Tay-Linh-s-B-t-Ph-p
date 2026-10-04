import React, { useState, useEffect } from 'react';
import { LECTURE_SLIDES, TEACHER_PROFILE } from '../data/lectureSlidesData';
import { LectureSlideRenderer } from './LectureSlideRenderer';
import { TeacherPortraitIllustration } from './TeacherPortraitIllustration';
import { 
  ChevronLeft, 
  ChevronRight, 
  Grid, 
  Play, 
  Pause, 
  Maximize2, 
  Minimize2, 
  GraduationCap, 
  Sparkles, 
  BookOpen, 
  PhoneCall, 
  Compass, 
  Heart, 
  Scale, 
  CheckCircle2, 
  Layers,
  FileCheck2,
  ExternalLink,
  Camera
} from 'lucide-react';
import { useTeacherImage } from '../context/TeacherImageContext';

interface LectureSlidesModuleProps {
  onNavigateToTab?: (tab: any) => void;
}

export const LectureSlidesModule: React.FC<LectureSlidesModuleProps> = ({
  onNavigateToTab,
}) => {
  const { openEditModal } = useTeacherImage();
  const [activeSubTab, setActiveSubTab] = useState<'slides' | 'teacher'>('slides');
  const [currentSlideIndex, setCurrentSlideIndex] = useState<number>(0);
  const [viewMode, setViewMode] = useState<'presenter' | 'grid'>('presenter');
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [isFullscreen, setIsFullscreen] = useState<boolean>(false);

  const currentSlide = LECTURE_SLIDES[currentSlideIndex];

  // Auto-play presentation timer
  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (isPlaying) {
      timer = setInterval(() => {
        setCurrentSlideIndex((prev) => (prev + 1) % LECTURE_SLIDES.length);
      }, 7000);
    }
    return () => clearInterval(timer);
  }, [isPlaying]);

  // Keyboard navigation
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (activeSubTab !== 'slides' || viewMode !== 'presenter') return;
      if (e.key === 'ArrowRight' || e.key === 'Space') {
        setCurrentSlideIndex((prev) => Math.min(prev + 1, LECTURE_SLIDES.length - 1));
      } else if (e.key === 'ArrowLeft') {
        setCurrentSlideIndex((prev) => Math.max(prev - 1, 0));
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [activeSubTab, viewMode]);

  return (
    <div className="space-y-6">
      {/* Top Header Banner */}
      <div className="bg-gradient-to-r from-slate-900 via-amber-950/80 to-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-900/50 shadow-xl text-white relative overflow-hidden">
        <div className="absolute -right-10 -bottom-10 w-64 h-64 bg-amber-500/10 rounded-full blur-3xl pointer-events-none" />
        
        <div className="flex flex-col lg:flex-row items-center justify-between gap-6 relative z-10">
          <div className="flex items-center gap-4 text-center lg:text-left">
            <TeacherPortraitIllustration variant="avatar-badge" size={72} className="shrink-0" />
            <div>
              <div className="flex items-center justify-center lg:justify-start gap-2 flex-wrap mb-1">
                <span className="px-3 py-1 rounded-full bg-amber-500/20 text-amber-300 font-bold text-xs uppercase tracking-wider border border-amber-500/40">
                  Giáo Trình Độc Quyền
                </span>
                <span className="text-xs text-amber-200/80 font-medium">14 Slide Lượng Tử • Huyền Đạo Đỗ Gia</span>
              </div>
              <h1 className="text-2xl sm:text-3xl lg:text-4xl font-black font-serif tracking-tight text-white">
                Bài Giảng &amp; Chân Dung Giảng Viên
              </h1>
              <p className="text-sm sm:text-base text-amber-100/90 mt-1 max-w-2xl font-medium">
                Khám phá trọn vẹn 14 slide bài giảng lượng tử hóa Bát Cực Linh Số cùng triết lý cải vận của Cô Giáo Đỗ Gia.
              </p>
            </div>
          </div>

          {/* Module Mode Switcher Tabs */}
          <div className="flex items-center gap-2 bg-slate-950/80 p-1.5 rounded-2xl border border-amber-500/40 shrink-0 flex-wrap">
            <button
              type="button"
              onClick={() => setActiveSubTab('slides')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeSubTab === 'slides'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <Layers className="w-4 h-4" />
              <span>14 Slide Lượng Tử</span>
            </button>
            <button
              type="button"
              onClick={() => setActiveSubTab('teacher')}
              className={`flex items-center gap-2 px-4 sm:px-5 py-2.5 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeSubTab === 'teacher'
                  ? 'bg-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <GraduationCap className="w-4 h-4" />
              <span>Chân Dung Giảng Viên</span>
            </button>
            <button
              type="button"
              onClick={() => onNavigateToTab?.('exam')}
              className="flex items-center gap-1.5 px-4 py-2.5 rounded-xl font-black text-xs uppercase tracking-wider text-white bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-500 hover:to-amber-500 shadow-md transition-all border border-amber-300/40 cursor-pointer"
              title="Làm BÀI KIỂM TRA Bát Cực Linh Số"
            >
              <FileCheck2 className="w-4 h-4 text-amber-200" />
              <span>BÀI KIỂM TRA</span>
            </button>
          </div>
        </div>
      </div>

      {/* SUB-TAB 1: 14 SLIDE BÀI GIẢNG LƯỢNG TỬ */}
      {activeSubTab === 'slides' && (
        <div className="space-y-6">
          {/* Controls Bar */}
          <div className="flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-2xl p-4 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-3">
              <span className="text-sm font-bold text-slate-800 font-serif">
                Trình chiếu: <span className="text-amber-600 font-sans">{currentSlideIndex + 1}</span> / {LECTURE_SLIDES.length}
              </span>
              <span className="text-xs text-slate-400">|</span>
              <span className="text-xs font-semibold text-slate-600 bg-slate-100 px-2.5 py-1 rounded-lg">
                {currentSlide.categoryLabel}
              </span>
            </div>

            {/* Play/Pause, View Mode, Fullscreen */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={() => setIsPlaying(!isPlaying)}
                className={`flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold transition-all border ${
                  isPlaying 
                    ? 'bg-amber-100 text-amber-900 border-amber-300' 
                    : 'bg-slate-100 hover:bg-slate-200 text-slate-700 border-slate-300'
                }`}
                title={isPlaying ? 'Tạm dừng tự động chạy' : 'Bật tự động trình chiếu (7 giây/slide)'}
              >
                {isPlaying ? <Pause className="w-3.5 h-3.5" /> : <Play className="w-3.5 h-3.5 fill-current" />}
                <span>{isPlaying ? 'Tạm Dừng' : 'Tự Động Chạy'}</span>
              </button>

              <button
                type="button"
                onClick={() => setViewMode(viewMode === 'presenter' ? 'grid' : 'presenter')}
                className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl text-xs font-bold bg-slate-100 hover:bg-slate-200 text-slate-700 border border-slate-300 transition-colors"
                title="Đổi chế độ xem Lưới 14 Slide"
              >
                <Grid className="w-3.5 h-3.5" />
                <span>{viewMode === 'presenter' ? 'Xem Lưới (14 Slide)' : 'Chế Độ Thuyết Trình'}</span>
              </button>

              <button
                type="button"
                onClick={() => setIsFullscreen(!isFullscreen)}
                className="p-2 rounded-xl text-slate-700 bg-slate-100 hover:bg-slate-200 border border-slate-300 transition-colors"
                title="Bật/Tắt chế độ toàn màn hình"
              >
                {isFullscreen ? <Minimize2 className="w-4 h-4" /> : <Maximize2 className="w-4 h-4" />}
              </button>
            </div>
          </div>

          {/* PRESENTER VIEW MODE */}
          {viewMode === 'presenter' ? (
            <div className="space-y-6">
              {/* Main Slide Screen */}
              <div className="relative">
                <LectureSlideRenderer slide={currentSlide} isFullscreen={isFullscreen} />

                {/* Floating Navigation Arrows */}
                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex((prev) => Math.max(prev - 1, 0))}
                  disabled={currentSlideIndex === 0}
                  className="absolute left-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-600 text-white flex items-center justify-center border border-amber-500/40 shadow-xl transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Slide trước (Phím mũi tên Trái)"
                >
                  <ChevronLeft className="w-6 h-6" />
                </button>

                <button
                  type="button"
                  onClick={() => setCurrentSlideIndex((prev) => Math.min(prev + 1, LECTURE_SLIDES.length - 1))}
                  disabled={currentSlideIndex === LECTURE_SLIDES.length - 1}
                  className="absolute right-3 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full bg-slate-900/80 hover:bg-amber-600 text-white flex items-center justify-center border border-amber-500/40 shadow-xl transition-all disabled:opacity-30 disabled:pointer-events-none cursor-pointer"
                  title="Slide tiếp theo (Phím mũi tên Phải / Phím Cách)"
                >
                  <ChevronRight className="w-6 h-6" />
                </button>
              </div>

              {/* Slide Thumbnails Stepper */}
              <div className="bg-white rounded-3xl p-4 border border-slate-200 shadow-xs">
                <div className="text-xs font-bold text-slate-500 uppercase tracking-wider mb-3 px-2">
                  Danh Mục 14 Slide Lượng Tử (Bấm để chọn trực tiếp):
                </div>
                <div className="grid grid-cols-2 sm:grid-cols-4 md:grid-cols-7 gap-2.5">
                  {LECTURE_SLIDES.map((s, idx) => {
                    const isCurrent = idx === currentSlideIndex;
                    return (
                      <button
                        key={s.id}
                        type="button"
                        onClick={() => setCurrentSlideIndex(idx)}
                        className={`p-2.5 rounded-2xl text-left transition-all border cursor-pointer ${
                          isCurrent
                            ? 'bg-amber-50 border-amber-500 ring-2 ring-amber-400/40 shadow-sm'
                            : 'bg-slate-50 hover:bg-slate-100 border-slate-200 text-slate-700'
                        }`}
                      >
                        <div className="flex items-center justify-between mb-1">
                          <span className={`text-[11px] font-mono font-bold ${isCurrent ? 'text-amber-700' : 'text-slate-500'}`}>
                            #{s.slideNumber.toString().padStart(2, '0')}
                          </span>
                          {isCurrent && <span className="w-2 h-2 rounded-full bg-amber-500 animate-pulse" />}
                        </div>
                        <p className={`text-xs font-bold line-clamp-1 ${isCurrent ? 'text-amber-900' : 'text-slate-800'}`}>
                          {s.title}
                        </p>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          ) : (
            /* GRID VIEW MODE */
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              {LECTURE_SLIDES.map((s, idx) => (
                <div
                  key={s.id}
                  onClick={() => {
                    setCurrentSlideIndex(idx);
                    setViewMode('presenter');
                  }}
                  className="cursor-pointer group hover:scale-[1.01] transition-transform"
                >
                  <LectureSlideRenderer slide={s} isFullscreen={false} />
                </div>
              ))}
            </div>
          )}

          {/* BANNER BÀI KIỂM TRA TRỰC TUYẾN */}
          <div className="bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 p-6 sm:p-8 rounded-3xl border-2 border-red-500/50 shadow-xl flex flex-col md:flex-row items-center justify-between gap-6 text-white relative overflow-hidden">
            <div className="flex items-center gap-4 text-center md:text-left">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-red-600 to-amber-600 text-white flex items-center justify-center shrink-0 shadow-lg ring-2 ring-amber-400/40">
                <FileCheck2 className="w-8 h-8 text-amber-100" />
              </div>
              <div>
                <div className="flex items-center justify-center md:justify-start gap-2 mb-1">
                  <span className="px-2.5 py-0.5 rounded-full bg-red-600 text-white font-black text-[11px] uppercase tracking-wider">
                    ĐÁNH GIÁ NĂNG LỰC
                  </span>
                  <span className="text-xs text-amber-300 font-bold">Khảo Sát &amp; Trắc Nghiệm</span>
                </div>
                <h3 className="text-xl sm:text-2xl font-black font-serif text-white tracking-tight">
                  BÀI KIỂM TRA BÁT CỰC LINH SỐ
                </h3>
                <p className="text-xs sm:text-sm text-slate-300 max-w-xl mt-1">
                  Thực hiện bài kiểm tra tương tác để tổng ôn 14 slide kiến thức: Tứ Cát, Tứ Hung, quyền năng số 0 &amp; 5, vùng tử địa và kỹ năng luận đoán dãy số.
                </p>
              </div>
            </div>

            <button
              type="button"
              onClick={() => onNavigateToTab?.('exam')}
              className="py-3.5 px-6 rounded-2xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-sm uppercase tracking-wider shadow-xl flex items-center gap-2 shrink-0 border border-amber-300/60 transition-transform hover:scale-105 cursor-pointer"
              title="Mở BÀI KIỂM TRA Bát Cực Linh Số"
            >
              <FileCheck2 className="w-4 h-4 text-amber-200" />
              <span>LÀM BÀI KIỂM TRA NGAY</span>
            </button>
          </div>
        </div>
      )}

      {/* SUB-TAB 2: CHÂN DUNG & TÂM NGUYỆN GIẢNG VIÊN */}
      {activeSubTab === 'teacher' && (
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          {/* Cột Trái: Tranh Chân Dung Toàn Cảnh Cô Giáo */}
          <div className="lg:col-span-6 flex flex-col items-center">
            <TeacherPortraitIllustration variant="study-desk" className="w-full shadow-2xl" />
            
            {/* Lời Tựa Trực Tiếp Từ Tranh */}
            <div className="w-full mt-4 p-5 rounded-2xl bg-amber-50 border border-amber-200 text-center">
              <p className="text-amber-950 font-serif font-black text-lg">
                "Thấu hiểu bản thân • Kiến tạo vận mệnh"
              </p>
              <p className="text-xs sm:text-sm text-amber-900/80 mt-1 font-medium">
                Thuận theo đạo trời, An trong vận đời — Huyền Đạo Đỗ Gia 4311
              </p>
            </div>

            {/* Nút Sửa Ảnh Giáo Viên Trực Tiếp */}
            <button
              type="button"
              onClick={openEditModal}
              className="w-full mt-3 py-3 px-4 rounded-2xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer hover:scale-[1.02]"
              title="Nhấn để tự tải ảnh hoặc đổi ảnh giáo viên"
            >
              <Camera className="w-4 h-4 text-amber-200" />
              <span>Sửa Ảnh / Tải Ảnh Mới Giáo Viên</span>
            </button>
          </div>

          {/* Cột Phải: Thông Tin Sư Phạm, 4 Tôn Chỉ & Lời Ngỏ */}
          <div className="lg:col-span-6 space-y-6">
            {/* Card Giới Thiệu Chuyên Môn */}
            <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm">
              <div className="flex items-center justify-between gap-3 mb-4">
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-800 flex items-center justify-center shrink-0">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <div>
                    <h2 className="text-xl sm:text-2xl font-black text-slate-900 font-serif">
                      {TEACHER_PROFILE.name}
                    </h2>
                    <p className="text-xs sm:text-sm font-bold text-amber-700">
                      {TEACHER_PROFILE.title}
                    </p>
                  </div>
                </div>
                <button
                  type="button"
                  onClick={openEditModal}
                  className="px-3.5 py-2 rounded-xl bg-amber-50 hover:bg-amber-100 text-amber-900 border border-amber-300 font-bold text-xs flex items-center gap-1.5 shadow-2xs transition-colors cursor-pointer shrink-0"
                  title="Nhấn để đổi ảnh giáo viên"
                >
                  <Camera className="w-3.5 h-3.5 text-amber-700" />
                  <span>Sửa Ảnh</span>
                </button>
              </div>

              {/* Lời Ngỏ Hữu Duyên */}
              <div className="bg-stone-50 rounded-2xl p-5 border border-stone-200 text-slate-700 text-sm sm:text-base leading-relaxed italic font-medium whitespace-pre-line mb-6">
                "{TEACHER_PROFILE.welcomeMessage}"
              </div>

              {/* 4 Tôn Chỉ Cốt Lõi Của Cô Giáo */}
              <h3 className="text-base font-bold text-slate-900 mb-4 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>4 Tôn Chỉ Bát Cực Linh Số &amp; Phong Thủy:</span>
              </h3>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-6">
                {TEACHER_PROFILE.fourPrinciples.map((prin, pIdx) => (
                  <div key={pIdx} className="p-4 rounded-2xl bg-amber-50/60 border border-amber-200/80 flex items-start gap-3">
                    <div className="w-8 h-8 rounded-xl bg-amber-600 text-white flex items-center justify-center shrink-0 text-xs shadow-xs">
                      {pIdx === 0 && <Sparkles className="w-4 h-4" />}
                      {pIdx === 1 && <Scale className="w-4 h-4" />}
                      {pIdx === 2 && <Heart className="w-4 h-4" />}
                      {pIdx === 3 && <Compass className="w-4 h-4" />}
                    </div>
                    <div>
                      <h4 className="font-bold text-amber-950 text-sm">{prin.title}</h4>
                      <p className="text-xs text-slate-600 mt-0.5 leading-relaxed">{prin.description}</p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Các Bộ Môn Giảng Dạy & Nghiên Cứu */}
              <h3 className="text-base font-bold text-slate-900 mb-3 flex items-center gap-2">
                <BookOpen className="w-5 h-5 text-blue-700" />
                <span>Các Lĩnh Vực Chuyên Môn Đúc Kết:</span>
              </h3>
              <div className="space-y-2 mb-6">
                {TEACHER_PROFILE.expertiseFields.map((field, fIdx) => (
                  <div key={fIdx} className="flex items-center gap-2 text-sm text-slate-700 font-medium">
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                    <span>{field}</span>
                  </div>
                ))}
              </div>

              {/* Nút Gọi Hotline Tư Vấn Khóa Học */}
              <div className="pt-4 border-t border-slate-200 flex flex-col sm:flex-row items-center gap-3">
                <a
                  href={`tel:${TEACHER_PROFILE.hotline}`}
                  className="w-full sm:w-auto flex-1 py-3.5 px-6 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-base transition-all flex items-center justify-center gap-2 shadow-sm"
                  title="Liên hệ cố vấn cùng Cô Giáo Đỗ Gia"
                >
                  <PhoneCall className="w-5 h-5" />
                  <span>Hotline Cố Vấn: {TEACHER_PROFILE.hotline}</span>
                </a>

                <button
                  type="button"
                  onClick={() => {
                    setActiveSubTab('slides');
                    setCurrentSlideIndex(0);
                  }}
                  className="w-full sm:w-auto py-3.5 px-6 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-sm transition-all flex items-center justify-center gap-2 cursor-pointer shadow-sm"
                >
                  <BookOpen className="w-4 h-4 text-amber-400" />
                  <span>Xem Trọn Bộ 14 Slide</span>
                </button>

                <button
                  type="button"
                  onClick={openEditModal}
                  className="w-full sm:w-auto py-3.5 px-5 rounded-xl bg-amber-100 hover:bg-amber-200 text-amber-900 border border-amber-300 font-bold text-sm transition-all flex items-center justify-center gap-1.5 cursor-pointer shadow-2xs"
                  title="Nhấn để tự tải ảnh hoặc đổi ảnh giáo viên"
                >
                  <Camera className="w-4 h-4 text-amber-700" />
                  <span>Sửa Ảnh Giáo Viên</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
