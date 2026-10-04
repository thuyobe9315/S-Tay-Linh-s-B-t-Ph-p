import React from 'react';
import { LectureSlide } from '../data/lectureSlidesData';
import { Sparkles, Shield, AlertTriangle, ArrowRight, Zap, Target, Star, Flame, Heart, Compass, CheckCircle2 } from 'lucide-react';

interface LectureSlideRendererProps {
  slide: LectureSlide;
  isFullscreen?: boolean;
}

export const LectureSlideRenderer: React.FC<LectureSlideRendererProps> = ({
  slide,
  isFullscreen = false,
}) => {
  return (
    <div className={`w-full bg-slate-950 text-white rounded-3xl overflow-hidden border border-amber-900/40 shadow-2xl relative flex flex-col justify-between ${
      isFullscreen ? 'min-h-[85vh] p-8 sm:p-12' : 'min-h-[640px] p-6 sm:p-10'
    }`}>
      {/* Background Matrix Grid Pattern & Quantum Glow */}
      <div className="absolute inset-0 opacity-15 pointer-events-none bg-[radial-gradient(#d97706_1px,transparent_1px)] [background-size:24px_24px]" />
      
      {/* Dynamic Ambient Glow depending on category */}
      <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-amber-500/10 blur-3xl pointer-events-none" />
      <div className="absolute -bottom-32 -left-32 w-96 h-96 rounded-full bg-red-600/10 blur-3xl pointer-events-none" />

      {/* TOP BAR: Slide Number & Category Tag */}
      <div className="relative z-10 flex items-center justify-between gap-4 border-b border-slate-800 pb-4 mb-6">
        <div className="flex items-center gap-3">
          <span className="px-3.5 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-mono font-bold text-xs sm:text-sm border border-amber-500/40">
            SLIDE {slide.slideNumber.toString().padStart(2, '0')} / 14
          </span>
          <span className="text-xs sm:text-sm font-semibold text-slate-400 uppercase tracking-wider">
            {slide.categoryLabel}
          </span>
        </div>
        <div className="text-right hidden sm:block">
          <span className="text-xs font-serif text-amber-200/80 tracking-wide">
            Huyền Đạo Đỗ Gia 4311 • Bát Cực Linh Số Lượng Tử
          </span>
        </div>
      </div>

      {/* HEADER: Title & Subtitle */}
      <div className="relative z-10 text-center max-w-4xl mx-auto mb-8">
        <h2 className="text-2xl sm:text-4xl lg:text-5xl font-black text-white font-serif tracking-tight mb-3 text-balance">
          {slide.title}
        </h2>
        <p className="text-sm sm:text-lg text-slate-300 leading-relaxed font-medium">
          {slide.subtitle}
        </p>
      </div>

      {/* CENTER: Slide-Specific Graphic & Content Layout */}
      <div className="relative z-10 flex-1 flex flex-col justify-center my-auto">
        {/* SLIDE 1: LINH SỐ BÁT PHÁP - ATOM QUANTUM */}
        {slide.graphicType === 'quantum-atom' && (
          <div className="flex flex-col items-center justify-center py-6">
            <div className="relative w-64 h-64 sm:w-80 sm:h-80 flex items-center justify-center">
              {/* Golden Orbit Rings */}
              <div className="absolute inset-0 rounded-full border-2 border-amber-400/40 animate-[spin_20s_linear_infinite]" />
              <div className="absolute inset-4 rounded-full border border-amber-300/30 rotate-45 animate-[spin_25s_linear_infinite_reverse]" />
              <div className="absolute inset-8 rounded-full border border-red-500/40 -rotate-45" />

              {/* Glowing Spheres */}
              <div className="absolute top-6 left-16 w-8 h-8 rounded-full bg-gradient-to-br from-amber-200 via-amber-400 to-amber-600 shadow-[0_0_20px_rgba(245,158,11,0.8)]" />
              <div className="absolute top-12 right-12 w-12 h-12 rounded-full bg-gradient-to-br from-red-400 via-red-600 to-red-900 shadow-[0_0_25px_rgba(220,38,38,0.7)]" />
              <div className="absolute bottom-8 left-12 w-14 h-14 rounded-full bg-gradient-to-br from-amber-300 via-amber-500 to-yellow-700 shadow-[0_0_30px_rgba(245,158,11,0.9)]" />
              <div className="absolute bottom-12 right-16 w-9 h-9 rounded-full bg-gradient-to-br from-rose-500 to-red-800 shadow-[0_0_18px_rgba(225,29,72,0.8)]" />

              {/* Central Nucleus */}
              <div className="w-20 h-20 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 flex items-center justify-center text-slate-950 font-black font-serif text-2xl shadow-[0_0_40px_rgba(251,191,36,0.9)] ring-4 ring-amber-300/50">
                8
              </div>
            </div>
            <p className="mt-6 text-center text-amber-300 font-serif italic text-lg sm:text-xl">
              "Giải mã năng lượng, thấu hiểu bản thể và làm chủ vận trình."
            </p>
          </div>
        )}

        {/* SLIDE 2: BẢN CHẤT 8 DÒNG TỪ TRƯỜNG - TỨ CÁT VS TỨ HUNG */}
        {slide.graphicType === 'nature-dual' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {/* Tứ Cát Box */}
            <div className="bg-gradient-to-br from-amber-950/40 via-slate-900/80 to-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300">
                  <Sparkles className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-300">TỨ CÁT (Năng Lượng Tạo Đà)</h3>
                  <p className="text-xs text-slate-300">Từ trường mang lại may mắn, sinh khí và sự ổn định.</p>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { name: 'Thiên Y', role: 'Tài lộc & Phước đức đỉnh cao', code: '13/31, 68/86, 49/94, 27/72' },
                  { name: 'Sinh Khí', role: 'Quý nhân tương trợ & Danh tiếng', code: '14/41, 67/76, 39/93, 28/82' },
                  { name: 'Diên Niên', role: 'Bản lĩnh, Lãnh đạo & Trách nhiệm', code: '19/91, 78/87, 34/43, 26/62' },
                  { name: 'Phục Vị', role: 'Bền bỉ, Nhẫn nại & Bình ổn nội lực', code: '11/22, 88/99, 77/66, 33/44' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-amber-500/20">
                    <span className="font-bold text-amber-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-amber-400 shadow-[0_0_8px_#f59e0b]" />
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-300 text-right">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>

            {/* Tứ Hung Box */}
            <div className="bg-gradient-to-br from-red-950/40 via-slate-900/80 to-slate-900 rounded-3xl p-6 sm:p-8 border border-red-500/40 shadow-xl relative overflow-hidden">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-400/50 flex items-center justify-center text-red-300">
                  <Shield className="w-6 h-6" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-rose-300">TỨ HUNG (Năng Lượng Thử Thách)</h3>
                  <p className="text-xs text-slate-300">Từ trường mang tính biến động, rủi ro và mài giũa.</p>
                </div>
              </div>
              <div className="space-y-3 mt-4">
                {[
                  { name: 'Lục Sát', role: 'Cảm xúc mong manh & Nhan sắc', code: '16/61, 47/74, 38/83, 29/92' },
                  { name: 'Họa Hại', role: 'Ngôn từ, Hùng biện & Dễ thị phi', code: '17/71, 89/98, 64/46, 23/32' },
                  { name: 'Tuyệt Mệnh', role: 'Mạo hiểm, Đột phá & Cực đoan', code: '12/21, 69/96, 48/84, 37/73' },
                  { name: 'Ngũ Quỷ', role: 'Tài hoa bẩm sinh, Biến hóa khó lường', code: '18/81, 79/97, 36/63, 24/42' },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-center justify-between p-3 rounded-xl bg-slate-950/60 border border-red-500/20">
                    <span className="font-bold text-rose-200 flex items-center gap-2">
                      <span className="w-2.5 h-2.5 rounded-full bg-red-400 shadow-[0_0_8px_#ef4444]" />
                      {item.name}
                    </span>
                    <span className="text-xs text-slate-300 text-right">{item.role}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 3: MA TRẬN TỨ CÁT (4 Ô KÍNH) */}
        {slide.graphicType === 'tu-cat-matrix' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/80 rounded-2xl p-5 border border-amber-500/30 flex items-start gap-4 hover:border-amber-400 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-amber-500/20 border border-amber-400/40 flex items-center justify-center shrink-0 shadow-md">
                  {idx === 0 && <span className="text-2xl font-serif text-amber-300">🪙</span>}
                  {idx === 1 && <Star className="w-7 h-7 text-amber-300 fill-amber-300/30" />}
                  {idx === 2 && <span className="text-2xl font-serif text-amber-300">🏛️</span>}
                  {idx === 3 && <span className="text-2xl font-serif text-amber-300">🌱</span>}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-amber-300">{pt.title}</h4>
                  <p className="text-sm text-slate-300 mt-1">{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 4: THIÊN Y VS SINH KHÍ */}
        {slide.graphicType === 'compare-thien-y-sinh-khi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl">
                    {idx === 0 ? '🪙' : '⭐'}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-amber-300">{pt.title}</h3>
                    <span className="text-xs text-amber-200/80">{pt.badge}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {pt.subPoints?.map((sub, sIdx) => (
                    <div key={sIdx} className="text-sm text-slate-300 flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        sIdx === 0 ? 'bg-emerald-400' : sIdx === 1 ? 'bg-amber-400' : 'bg-rose-400'
                      }`} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 5: DIÊN NIÊN VS PHỤC VỊ */}
        {slide.graphicType === 'compare-dien-nien-phuc-vi' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-amber-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-amber-500/20 border border-amber-400/50 flex items-center justify-center text-amber-300 text-2xl">
                    {idx === 0 ? '🏛️' : '🌱'}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-amber-300">{pt.title}</h3>
                    <span className="text-xs text-amber-200/80">{pt.badge}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {pt.subPoints?.map((sub, sIdx) => (
                    <div key={sIdx} className="text-sm text-slate-300 flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        sIdx === 0 ? 'bg-emerald-400' : sIdx === 1 ? 'bg-amber-400' : 'bg-rose-400'
                      }`} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 6: MA TRẬN TỨ HUNG (4 Ô KÍNH ĐỎ) */}
        {slide.graphicType === 'tu-hung-matrix' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-5 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/80 rounded-2xl p-5 border border-red-500/30 flex items-start gap-4 hover:border-red-400 transition-colors">
                <div className="w-14 h-14 rounded-2xl bg-red-500/20 border border-red-400/40 flex items-center justify-center shrink-0 shadow-md">
                  {idx === 0 && <Heart className="w-7 h-7 text-rose-400 fill-rose-400/20" />}
                  {idx === 1 && <Flame className="w-7 h-7 text-amber-400" />}
                  {idx === 2 && <span className="text-2xl font-serif text-rose-300">⚔️</span>}
                  {idx === 3 && <span className="text-2xl font-serif text-rose-300">🎲</span>}
                </div>
                <div>
                  <h4 className="text-base sm:text-lg font-bold text-rose-300">{pt.title}</h4>
                  <p className="text-sm text-slate-300 mt-1">{pt.description}</p>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 7: LỤC SÁT VS HỌA HẠI */}
        {slide.graphicType === 'compare-luc-sat-hoa-hai' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-red-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-400/50 flex items-center justify-center text-rose-300 text-2xl">
                    {idx === 0 ? '💔' : '🔥'}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-rose-300">{pt.title}</h3>
                    <span className="text-xs text-rose-200/80">{pt.badge}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {pt.subPoints?.map((sub, sIdx) => (
                    <div key={sIdx} className="text-sm text-slate-300 flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        sIdx === 0 ? 'bg-emerald-400' : sIdx === 1 ? 'bg-amber-400' : 'bg-rose-400'
                      }`} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 8: TUYỆT MỆNH VS NGŨ QUỶ */}
        {slide.graphicType === 'compare-tuyet-menh-ngu-quy' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-3xl p-6 sm:p-7 border border-red-500/40 shadow-xl">
                <div className="flex items-center gap-3 mb-4 pb-3 border-b border-slate-800">
                  <div className="w-12 h-12 rounded-2xl bg-red-500/20 border border-red-400/50 flex items-center justify-center text-rose-300 text-2xl">
                    {idx === 0 ? '⚔️' : '🎲'}
                  </div>
                  <div>
                    <h3 className="text-lg sm:text-xl font-black text-rose-300">{pt.title}</h3>
                    <span className="text-xs text-rose-200/80">{pt.badge}</span>
                  </div>
                </div>
                <div className="space-y-3">
                  {pt.subPoints?.map((sub, sIdx) => (
                    <div key={sIdx} className="text-sm text-slate-300 flex items-start gap-2.5">
                      <span className={`w-2 h-2 rounded-full mt-1.5 shrink-0 ${
                        sIdx === 0 ? 'bg-emerald-400' : sIdx === 1 ? 'bg-amber-400' : 'bg-rose-400'
                      }`} />
                      <span>{sub}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 9: BIẾN SỐ LƯỢNG TỬ SỐ 0 VÀ SỐ 5 */}
        {slide.graphicType === 'quantum-0-5' && (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 max-w-5xl mx-auto w-full">
            {/* Số 0 Hố Đen */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-slate-700 relative overflow-hidden flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-full bg-black border-4 border-amber-700/60 shadow-[0_0_40px_rgba(180,83,9,0.5)] flex items-center justify-center mb-6 relative">
                <span className="text-5xl font-mono font-black text-amber-500">0</span>
                <div className="absolute inset-0 rounded-full border border-amber-400/30 animate-ping opacity-20" />
              </div>
              <h3 className="text-xl font-bold text-amber-400 mb-2">Số 0 (Hố Đen / Tàng Ẩn)</h3>
              <p className="text-xs text-slate-400 mb-4">Âm tính • Làm tiêu biến hoặc ẩn giấu năng lượng</p>
              <div className="text-left text-xs sm:text-sm text-slate-300 space-y-2 w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <p>• <strong>Quy luật:</strong> Đứng giữa tổ số trở thành Phục Vị bị động (Ví dụ: 907 là Phục vị Ngũ Quỷ).</p>
                <p>• <strong>Tác động:</strong> Trì trệ sự nghiệp, tình cảm ẩn khuất, hao tán tài sản âm thầm.</p>
              </div>
            </div>

            {/* Số 5 Ánh Sáng */}
            <div className="bg-slate-900 rounded-3xl p-6 sm:p-8 border border-amber-500/50 relative overflow-hidden flex flex-col items-center text-center">
              <div className="w-32 h-32 rounded-2xl bg-gradient-to-tr from-amber-600 via-amber-400 to-yellow-200 shadow-[0_0_50px_rgba(245,158,11,0.8)] flex items-center justify-center mb-6 rotate-45">
                <span className="text-5xl font-mono font-black text-slate-950 -rotate-45">5</span>
              </div>
              <h3 className="text-xl font-bold text-yellow-300 mb-2">Số 5 (Ánh Sáng / Khuếch Đại)</h3>
              <p className="text-xs text-slate-400 mb-4">Dương tính • Hiển lộ, chủ động, tăng cường cực đại</p>
              <div className="text-left text-xs sm:text-sm text-slate-300 space-y-2 w-full bg-slate-950/70 p-4 rounded-xl border border-slate-800">
                <p>• <strong>Quy luật:</strong> Trở thành cầu nối khuếch đại cực đại (Ví dụ: 358 = 38 được cường hóa).</p>
                <p>• <strong>Tác động:</strong> Đẩy năng lượng bản nguyên bộc phát mạnh mẽ ra bề mặt.</p>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 10: VÙNG TỬ ĐỊA SỐ 0 */}
        {slide.graphicType === 'vung-tu-dia' && (
          <div className="max-w-4xl mx-auto w-full space-y-4">
            <div className="p-5 rounded-2xl bg-red-950/50 border-2 border-red-600/70 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-red-600 text-white font-black text-sm">Tuyệt Mệnh + 0</span>
                <span className="text-sm sm:text-base font-bold text-red-200">Không Kết Quả (Tiền tài 0, Sự nghiệp 0, Hôn nhân 0)</span>
              </div>
              <span className="text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-red-500/30">Năng lượng rơi xuống đáy vô sản</span>
            </div>

            <div className="p-5 rounded-2xl bg-red-950/40 border-2 border-red-500/60 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-rose-700 text-white font-black text-sm">Ngũ Quỷ + 0</span>
                <span className="text-sm sm:text-base font-bold text-rose-200">108, 801, 709, 907, 306, 603, 204, 402</span>
              </div>
              <span className="text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-red-500/30">Mắc nợ từng đống, mất ngủ, lừa đảo</span>
            </div>

            <div className="p-5 rounded-2xl bg-red-950/30 border-2 border-red-400/50 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3">
                <span className="px-3.5 py-1.5 rounded-xl bg-amber-700 text-white font-black text-sm">Thiên Y / Lục Sát + 0</span>
                <span className="text-sm sm:text-base font-bold text-amber-200">103, 301, 608, 806 (Tàng ẩn ly hôn, người thứ 3)</span>
              </div>
              <span className="text-xs text-slate-400 bg-black/40 px-3 py-1.5 rounded-lg border border-amber-500/30">Phá tài: 1029, 6092, 102...</span>
            </div>
          </div>
        )}

        {/* SLIDE 11: SƠ ĐỒ 4 BƯỚC TỰ LUẬN SỐ */}
        {slide.graphicType === 'four-steps' && (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 max-w-5xl mx-auto w-full">
            {slide.keyPoints.map((pt, idx) => (
              <div key={idx} className="bg-slate-900/90 rounded-2xl p-5 border border-amber-500/40 flex flex-col justify-between relative group hover:border-amber-400 transition-colors">
                <div>
                  <span className="text-xs font-mono font-bold text-amber-400 px-2.5 py-1 rounded bg-amber-950/80 border border-amber-600/40 inline-block mb-3">
                    {pt.badge}
                  </span>
                  <h4 className="text-base font-bold text-white mb-2">{pt.title}</h4>
                  <p className="text-xs sm:text-sm text-slate-300 leading-relaxed">{pt.description}</p>
                </div>
                {idx < 3 && (
                  <div className="hidden lg:block absolute -right-3 top-1/2 -translate-y-1/2 z-20 w-6 h-6 rounded-full bg-amber-600 text-white flex items-center justify-center text-xs shadow-md">
                    →
                  </div>
                )}
              </div>
            ))}
          </div>
        )}

        {/* SLIDE 12: ỨNG KỲ 10 NĂM */}
        {slide.graphicType === 'ten-years-cycle' && (
          <div className="max-w-5xl mx-auto w-full py-4">
            <div className="flex items-center justify-center gap-2 sm:gap-4 flex-wrap mb-8">
              {['09', '90', '03', '38', '80', '04', '49'].map((num, idx) => (
                <React.Fragment key={idx}>
                  <div className="px-4 py-2 sm:px-6 sm:py-3 rounded-2xl bg-amber-950/80 border border-amber-400/60 text-amber-300 font-mono font-black text-xl sm:text-2xl shadow-lg">
                    {num}
                  </div>
                  {idx < 6 && <span className="text-amber-500 font-bold">—</span>}
                </React.Fragment>
              ))}
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-4 lg:grid-cols-7 gap-2.5">
              {[
                { time: 'Năm 1-2', code: '09', desc: 'Phục Vị', color: 'border-amber-500/40' },
                { time: 'Năm 2-3', code: '90', desc: 'Chuyển giao', color: 'border-slate-600' },
                { time: 'Năm 3-4', code: '03', desc: 'Sinh Khí 0 (Hao)', color: 'border-amber-600/50' },
                { time: 'Năm 4-5', code: '38', desc: 'Lục Sát (Tình ái)', color: 'border-rose-500/50' },
                { time: 'Năm 5-6', code: '80', desc: 'Chuyển tiếp', color: 'border-slate-600' },
                { time: 'Năm 6-7', code: '04', desc: 'Tuyệt Mệnh 0 (Nợ)', color: 'border-red-600/60' },
                { time: 'Năm 7-8', code: '49', desc: 'Thiên Y (Tài lộc)', color: 'border-emerald-500/60' },
              ].map((item, idx) => (
                <div key={idx} className={`p-3 rounded-xl bg-slate-900 border ${item.color} text-center`}>
                  <span className="text-[11px] font-bold text-amber-400 block">{item.time}</span>
                  <span className="font-mono font-bold text-white text-base block my-0.5">{item.code}</span>
                  <span className="text-[10px] text-slate-300 block">{item.desc}</span>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* SLIDE 13: HỆ TỌA ĐỘ BÁT PHÁP 2D */}
        {slide.graphicType === 'coordinate-system' && (
          <div className="max-w-3xl mx-auto w-full py-4">
            <div className="relative w-full aspect-square max-w-[480px] mx-auto bg-slate-900 rounded-3xl border border-slate-800 p-6 flex items-center justify-center shadow-2xl">
              {/* Trục X và Trục Y */}
              <div className="absolute left-6 right-6 top-1/2 h-0.5 bg-slate-600" />
              <div className="absolute top-6 bottom-6 left-1/2 w-0.5 bg-slate-600" />
              
              {/* Nhãn trục */}
              <span className="absolute top-2 left-1/2 -translate-x-1/2 text-xs font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-600/40">
                CẢM XÚC (Y+)
              </span>
              <span className="absolute bottom-2 left-1/2 -translate-x-1/2 text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
                LÝ TRÍ (Y-)
              </span>
              <span className="absolute left-2 top-1/2 -translate-y-1/2 text-xs font-bold text-slate-400 bg-slate-950 px-2 py-0.5 rounded border border-slate-700">
                BÌNH ỔN (X-)
              </span>
              <span className="absolute right-2 top-1/2 -translate-y-1/2 text-xs font-bold text-amber-400 bg-slate-950 px-2 py-0.5 rounded border border-amber-600/40">
                ĐỘT PHÁ (X+)
              </span>

              {/* 4 Góc phần tư */}
              {/* Góc 2: Cảm xúc + Bình ổn */}
              <div className="absolute top-12 left-12 text-center">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 mx-auto mb-1">
                  Lục Sát
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-300 mx-auto">
                  Sinh Khí
                </div>
              </div>

              {/* Góc 1: Cảm xúc + Đột phá */}
              <div className="absolute top-12 right-12 text-center">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 mx-auto mb-1">
                  Ngũ Quỷ
                </div>
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 mx-auto">
                  Họa Hại
                </div>
              </div>

              {/* Góc 3: Lý trí + Bình ổn */}
              <div className="absolute bottom-12 left-12 text-center">
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-300 mx-auto mb-1">
                  Thiên Y
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-300 mx-auto">
                  Phục Vị
                </div>
              </div>

              {/* Góc 4: Lý trí + Đột phá */}
              <div className="absolute bottom-12 right-12 text-center">
                <div className="w-10 h-10 rounded-full bg-rose-500/20 border border-rose-400 flex items-center justify-center text-xs font-bold text-rose-300 mx-auto mb-1">
                  Tuyệt Mệnh
                </div>
                <div className="w-10 h-10 rounded-full bg-amber-500/20 border border-amber-400 flex items-center justify-center text-xs font-bold text-amber-300 mx-auto">
                  Diên Niên
                </div>
              </div>
            </div>
          </div>
        )}

        {/* SLIDE 14: KẾT LUẬN - LÀM CHỦ TỪ TRƯỜNG */}
        {slide.graphicType === 'quantum-knot' && (
          <div className="flex flex-col items-center justify-center text-center py-8 max-w-3xl mx-auto">
            <div className="w-28 h-28 rounded-full bg-gradient-to-tr from-amber-600 via-amber-400 to-rose-600 shadow-[0_0_60px_rgba(245,158,11,0.8)] flex items-center justify-center mb-8 ring-8 ring-amber-400/30">
              <Compass className="w-14 h-14 text-slate-950 animate-spin-slow" />
            </div>
            <h3 className="text-3xl sm:text-4xl font-serif font-black text-amber-300 mb-4">
              "Hãy dùng số, đừng để số dùng bạn."
            </h3>
            <p className="text-base sm:text-lg text-slate-300 leading-relaxed font-medium">
              Các con số không sinh ra để trói buộc hay phán xét, mà để phản chiếu tần số rung động của chính bạn. Thấu hiểu Linh Số Bát Pháp là hành trình nhận diện điểm mù và chủ động thiết lập lại vận trình an khang, thịnh vượng!
            </p>
          </div>
        )}
      </div>

      {/* FOOTER: Quote & Navigation Hint */}
      {slide.highlightQuote && (
        <div className="relative z-10 pt-4 mt-6 border-t border-slate-800/80 text-center">
          <p className="text-xs sm:text-sm font-serif italic text-amber-300/90">
            ★ {slide.highlightQuote}
          </p>
        </div>
      )}
    </div>
  );
};
