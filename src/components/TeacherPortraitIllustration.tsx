import React from 'react';
import { useTeacherImage } from '../context/TeacherImageContext';
import { Camera, Edit3, Sparkles } from 'lucide-react';

interface TeacherPortraitProps {
  variant?: 'standing' | 'study-desk' | 'avatar-badge';
  size?: number | string;
  className?: string;
  allowEdit?: boolean;
}

export const TeacherPortraitIllustration: React.FC<TeacherPortraitProps> = ({
  variant = 'study-desk',
  size = 400,
  className = '',
  allowEdit = true,
}) => {
  const { customImageUrl, imageFit, openEditModal } = useTeacherImage();

  if (variant === 'avatar-badge') {
    return (
      <div 
        className={`relative inline-flex items-center justify-center shrink-0 rounded-full overflow-hidden shadow-lg ring-4 ring-amber-400/60 bg-gradient-to-br from-amber-100 via-amber-50 to-orange-100 group ${className}`}
        style={{ width: size, height: size }}
        title="Cô Giáo Huyền Đạo Đỗ Gia (Bấm để sửa ảnh)"
      >
        {customImageUrl ? (
          <img 
            src={customImageUrl} 
            alt="Chân dung cô giáo Đỗ Gia" 
            className={`w-full h-full ${imageFit === 'cover' ? 'object-cover' : 'object-contain'}`}
          />
        ) : (
          <svg viewBox="0 0 200 200" className="w-full h-full" fill="none">
            <defs>
              <radialGradient id="avatarGlow" cx="50%" cy="40%" r="60%">
                <stop offset="0%" stopColor="#FFF7ED" />
                <stop offset="70%" stopColor="#FED7AA" />
                <stop offset="100%" stopColor="#FB923C" />
              </radialGradient>
              <linearGradient id="blazerWhite" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFFFFF" />
                <stop offset="100%" stopColor="#E2E8F0" />
              </linearGradient>
              <linearGradient id="aoDaiOrange" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#F97316" />
                <stop offset="100%" stopColor="#C2410C" />
              </linearGradient>
            </defs>

            {/* Vòng nền phát sáng */}
            <circle cx="100" cy="100" r="98" fill="url(#avatarGlow)" />
            <circle cx="100" cy="100" r="94" stroke="#F59E0B" strokeWidth="2" strokeDasharray="4 2" opacity="0.6" />

            {/* Khăn đóng / Mấn nhung đỏ rực rỡ */}
            <ellipse cx="100" cy="62" rx="42" ry="24" fill="#DC2626" stroke="#991B1B" strokeWidth="2" />
            <ellipse cx="100" cy="58" rx="38" ry="18" fill="#EF4444" />

            {/* Tóc đen mượt mà ngang vai */}
            <path d="M 62 76 C 58 110, 64 140, 75 160 C 82 140, 80 100, 78 80 Z" fill="#18181B" />
            <path d="M 138 76 C 142 110, 136 140, 125 160 C 118 140, 120 100, 122 80 Z" fill="#18181B" />

            {/* Cổ và gương mặt thanh tú */}
            <path d="M 88 110 L 88 135 L 112 135 L 112 110 Z" fill="#FDE047" opacity="0.3" />
            <path d="M 88 112 L 88 132 L 112 132 L 112 112 Z" fill="#FFEDD5" />
            <ellipse cx="100" cy="92" rx="28" ry="32" fill="#FFEDD5" stroke="#FDBA74" strokeWidth="0.5" />

            {/* Tóc mái thanh lịch */}
            <path d="M 72 78 Q 100 86 128 78 Q 115 68 100 68 Q 85 68 72 78 Z" fill="#18181B" />
            <path d="M 76 80 Q 90 92 105 84 Q 95 78 85 76 Z" fill="#18181B" />

            {/* Đôi mắt đen sáng ngời */}
            <ellipse cx="88" cy="94" rx="4" ry="3" fill="#18181B" />
            <circle cx="89" cy="93" r="1.2" fill="#FFFFFF" />
            <ellipse cx="112" cy="94" rx="4" ry="3" fill="#18181B" />
            <circle cx="113" cy="93" r="1.2" fill="#FFFFFF" />
            
            {/* Lông mày lá liễu */}
            <path d="M 82 88 Q 88 85 94 87" stroke="#3F3F46" strokeWidth="1.2" strokeLinecap="round" fill="none" />
            <path d="M 106 87 Q 112 85 118 88" stroke="#3F3F46" strokeWidth="1.2" strokeLinecap="round" fill="none" />

            {/* Nụ cười tươi tắn dịu hiền */}
            <path d="M 94 108 Q 100 114 106 108" stroke="#E11D48" strokeWidth="1.8" strokeLinecap="round" fill="none" />
            {/* Má hồng phấn */}
            <circle cx="82" cy="102" r="5" fill="#FDA4AF" opacity="0.5" />
            <circle cx="118" cy="102" r="5" fill="#FDA4AF" opacity="0.5" />

            {/* Vòng cổ ngọc đen */}
            <path d="M 90 128 Q 100 138 110 128" stroke="#18181B" strokeWidth="2.5" strokeDasharray="3 2" fill="none" />
            <ellipse cx="100" cy="139" rx="3.5" ry="7" fill="#09090B" />

            {/* Áo dài màu cam hoàng thổ */}
            <path d="M 84 134 L 100 136 L 116 134 L 126 195 L 74 195 Z" fill="url(#aoDaiOrange)" />

            {/* Áo Blazer trắng khoác ngoài trang nhã */}
            <path d="M 68 140 C 62 165, 60 190, 60 200 L 86 200 L 88 146 L 76 138 Z" fill="url(#blazerWhite)" stroke="#CBD5E1" strokeWidth="1" />
            <path d="M 132 140 C 138 165, 140 190, 140 200 L 114 200 L 112 146 L 124 138 Z" fill="url(#blazerWhite)" stroke="#CBD5E1" strokeWidth="1" />

            {/* Cúc áo blazer vàng kim */}
            <circle cx="84" cy="168" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
            <circle cx="85" cy="184" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
            <circle cx="116" cy="168" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
            <circle cx="115" cy="184" r="2.5" fill="#F59E0B" stroke="#B45309" strokeWidth="0.5" />
          </svg>
        )}

        {/* Nút sửa nhanh khi hover vào avatar */}
        {allowEdit && (
          <button
            type="button"
            onClick={(e) => {
              e.stopPropagation();
              openEditModal();
            }}
            className="absolute inset-0 bg-slate-950/60 opacity-0 group-hover:opacity-100 flex flex-col items-center justify-center text-white transition-opacity cursor-pointer p-1"
            title="Nhấn để đổi ảnh giáo viên"
          >
            <Camera className="w-5 h-5 text-amber-300" />
            <span className="text-[9px] font-bold mt-0.5 leading-none">Đổi ảnh</span>
          </button>
        )}
      </div>
    );
  }

  // Study Desk / Full Variant
  return (
    <div 
      className={`relative rounded-3xl overflow-hidden shadow-2xl border-2 border-amber-300/80 bg-gradient-to-b from-amber-50 via-orange-50/40 to-stone-100 group ${className}`}
      style={{ width: '100%', maxWidth: typeof size === 'number' ? `${size}px` : size }}
    >
      {/* NÚT SỬA ẢNH GIÁO VIÊN NỔI BẬT GÓC TRÊN */}
      {allowEdit && (
        <button
          type="button"
          onClick={(e) => {
            e.stopPropagation();
            openEditModal();
          }}
          className="absolute top-4 right-4 z-30 px-3.5 py-2 rounded-xl bg-amber-600/90 hover:bg-amber-600 text-white font-bold text-xs shadow-lg backdrop-blur-xs border border-amber-300 flex items-center gap-1.5 transition-all hover:scale-105 cursor-pointer"
          title="Tải ảnh mới hoặc sửa ảnh giáo viên"
        >
          <Camera className="w-4 h-4 text-amber-200" />
          <span>Sửa Ảnh Giáo Viên</span>
        </button>
      )}

      {/* NẾU ĐÃ CÓ ẢNH DO NGƯỜI DÙNG TỰ THAY */}
      {customImageUrl ? (
        <div className="relative aspect-[4/5] w-full bg-stone-900 flex flex-col justify-between overflow-hidden">
          <img 
            src={customImageUrl} 
            alt="Chân dung cô giáo Đỗ Gia"
            className={`w-full h-full transition-transform duration-500 group-hover:scale-105 ${
              imageFit === 'cover' ? 'object-cover' : 'object-contain'
            }`}
          />
          {/* Lớp gradient bóng đổ thẩm mỹ */}
          <div className="absolute inset-0 bg-gradient-to-t from-stone-950/80 via-transparent to-stone-950/30 pointer-events-none" />

          {/* Viền hoa văn hoàng gia chạm khắc cổ phong */}
          <div className="absolute inset-2 border-2 border-amber-400/60 rounded-2xl pointer-events-none" />
          <div className="absolute inset-3 border border-amber-300/40 rounded-xl border-dashed pointer-events-none" />

          {/* BẢNG TÊN DƯỚI CÙNG */}
          <div className="absolute bottom-5 inset-x-6 z-20 flex justify-center pointer-events-none">
            <div className="px-6 py-2.5 rounded-full bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 border border-amber-400/80 shadow-xl text-center">
              <span className="text-amber-200 font-serif font-black text-sm sm:text-base tracking-wider block">
                CÔ GIÁO ĐỖ GIA • HUYỀN ĐẠO 4311
              </span>
            </div>
          </div>
        </div>
      ) : (
        /* TRANH MINH HỌA GỐC THƯ PHÒNG PHONG THỦY */
        <svg viewBox="0 0 800 1000" className="w-full h-auto select-none" fill="none">
        <defs>
          {/* Nền thư phòng hoàng kim tao nhã */}
          <linearGradient id="studyBg" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#FFFBEB" />
            <stop offset="40%" stopColor="#FEF3C7" />
            <stop offset="80%" stopColor="#FDE68A" />
            <stop offset="100%" stopColor="#F59E0B" stopOpacity="0.25" />
          </linearGradient>

          {/* Ánh sáng kim sa lấp lánh */}
          <radialGradient id="sunGlow" cx="60%" cy="30%" r="50%">
            <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.9" />
            <stop offset="50%" stopColor="#FDE68A" stopOpacity="0.4" />
            <stop offset="100%" stopColor="#FEF3C7" stopOpacity="0" />
          </radialGradient>

          {/* Vải áo dài cam hoàng thổ thượng hạng */}
          <linearGradient id="silkOrange" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EA580C" />
            <stop offset="40%" stopColor="#F97316" />
            <stop offset="80%" stopColor="#C2410C" />
            <stop offset="100%" stopColor="#9A3412" />
          </linearGradient>

          {/* Mấn nhung đỏ hoàng gia */}
          <linearGradient id="velvetRed" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#EF4444" />
            <stop offset="50%" stopColor="#DC2626" />
            <stop offset="100%" stopColor="#991B1B" />
          </linearGradient>

          {/* Sách bìa da cổ */}
          <linearGradient id="leatherBook" x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#451A03" />
            <stop offset="30%" stopColor="#78350F" />
            <stop offset="70%" stopColor="#92400E" />
            <stop offset="100%" stopColor="#451A03" />
          </linearGradient>

          {/* Gỗ mun bàn trà / bàn tính */}
          <linearGradient id="darkWood" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#292524" />
            <stop offset="100%" stopColor="#1C1917" />
          </linearGradient>
        </defs>

        {/* 1. NỀN THƯ PHÒNG */}
        <rect width="800" height="1000" fill="url(#studyBg)" />
        <rect width="800" height="1000" fill="url(#sunGlow)" />

        {/* Cành mai / Cành hoa vàng điểm xuyết góc trên */}
        <path d="M 680 0 Q 720 120 780 180" stroke="#78350F" strokeWidth="4" strokeLinecap="round" fill="none" />
        <circle cx="710" cy="80" r="10" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <circle cx="750" cy="110" r="12" fill="#FBBF24" stroke="#D97706" strokeWidth="1" />
        <circle cx="730" cy="150" r="14" fill="#FCD34D" stroke="#D97706" strokeWidth="1" />

        {/* 2. TRANH TREO TƯỜNG: NĂNG LƯỢNG SỐ HỌC & PHONG THỦY */}
        <g id="wall-scroll" transform="translate(40, 50)">
          {/* Khung tranh gỗ thếp vàng */}
          <rect x="0" y="0" width="310" height="340" rx="8" fill="#FFFBEB" stroke="#B45309" strokeWidth="4" />
          <rect x="8" y="8" width="294" height="324" rx="4" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="5 3" />
          
          {/* Tiêu đề tranh */}
          <text x="155" y="45" fill="#78350F" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
            NĂNG LƯỢNG
          </text>
          <text x="155" y="70" fill="#78350F" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
            SỐ HỌC &amp; PHONG THỦY
          </text>
          <line x1="50" y1="85" x2="260" y2="85" stroke="#B45309" strokeWidth="1.5" />

          {/* 4 Tôn chỉ cốt lõi */}
          {/* Tôn chỉ 1: Khai mở tiềm năng (Thái cực) */}
          <g transform="translate(30, 110)">
            <circle cx="12" cy="12" r="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <path d="M 12 0 C 6 0, 0 6, 0 12 C 0 18, 6 24, 12 24 C 6 24, 6 12, 12 12 C 18 12, 18 0, 12 0 Z" fill="#78350F" />
            <text x="35" y="17" fill="#451A03" fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
              • Khai mở tiềm năng
            </text>
          </g>

          {/* Tôn chỉ 2: Cân bằng năng lượng (Bát quái) */}
          <g transform="translate(30, 160)">
            <circle cx="12" cy="12" r="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <polygon points="12,2 20,6 22,14 17,21 7,21 2,14 4,6" fill="none" stroke="#B45309" strokeWidth="1.5" />
            <text x="35" y="17" fill="#451A03" fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
              • Cân bằng năng lượng
            </text>
          </g>

          {/* Tôn chỉ 3: Hài hòa cuộc sống (Hoa văn sen) */}
          <g transform="translate(30, 210)">
            <circle cx="12" cy="12" r="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <path d="M 12 4 Q 8 12 12 18 Q 16 12 12 4 Z" fill="#DC2626" />
            <text x="35" y="17" fill="#451A03" fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
              • Hài hòa cuộc sống
            </text>
          </g>

          {/* Tôn chỉ 4: Hướng đến may mắn (Ngôi sao 8 cánh) */}
          <g transform="translate(30, 260)">
            <circle cx="12" cy="12" r="12" fill="#FEF3C7" stroke="#D97706" strokeWidth="1" />
            <path d="M 12 3 L 14 10 L 21 12 L 14 14 L 12 21 L 10 14 L 3 12 L 10 10 Z" fill="#D97706" />
            <text x="35" y="17" fill="#451A03" fontSize="14" fontWeight="700" fontFamily="'Plus Jakarta Sans', sans-serif">
              • Hướng đến may mắn
            </text>
          </g>
        </g>

        {/* Khánh treo phong thủy Thái Cực góc phải trên */}
        <g id="hanging-charm" transform="translate(710, 140)">
          <line x1="0" y1="-80" x2="0" y2="0" stroke="#DC2626" strokeWidth="2.5" />
          <circle cx="0" cy="20" r="28" fill="#FDE68A" stroke="#B45309" strokeWidth="3" />
          <circle cx="0" cy="20" r="24" fill="#FFFFFF" />
          {/* Thái cực */}
          <path d="M 0 -4 C -13 -4, -24 7, -24 20 C -24 33, -13 44, 0 44 C -13 44, -13 20, 0 20 C 13 20, 13 -4, 0 -4 Z" fill="#18181B" />
          <circle cx="0" cy="8" r="3.5" fill="#FFFFFF" />
          <circle cx="0" cy="32" r="3.5" fill="#18181B" />
          {/* Tua rua đỏ may mắn */}
          <line x1="0" y1="48" x2="0" y2="90" stroke="#DC2626" strokeWidth="4" strokeLinecap="round" />
        </g>

        {/* 3. TỦ SÁCH CHUYÊN KHẢO BÊN PHẢI */}
        <g id="bookshelf" transform="translate(680, 500)">
          {/* Kệ sách */}
          <rect x="-30" y="0" width="150" height="280" fill="#78350F" opacity="0.4" />
          
          {/* Tập 1: KINH DỊCH */}
          <g transform="translate(0, 10)">
            <rect x="0" y="0" width="110" height="42" rx="4" fill="#1E293B" stroke="#0F172A" strokeWidth="2" />
            <line x1="6" y1="0" x2="6" y2="42" stroke="#F59E0B" strokeWidth="1" />
            <text x="55" y="26" fill="#F8FAFC" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              KINH DỊCH
            </text>
          </g>

          {/* Tập 2: BÁT TỰ */}
          <g transform="translate(0, 58)">
            <rect x="0" y="0" width="110" height="42" rx="4" fill="#047857" stroke="#065F46" strokeWidth="2" />
            <line x1="6" y1="0" x2="6" y2="42" stroke="#F59E0B" strokeWidth="1" />
            <text x="55" y="26" fill="#F8FAFC" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              BÁT TỰ
            </text>
          </g>

          {/* Tập 3: PHONG THỦY */}
          <g transform="translate(0, 106)">
            <rect x="0" y="0" width="110" height="42" rx="4" fill="#991B1B" stroke="#7F1D1D" strokeWidth="2" />
            <line x1="6" y1="0" x2="6" y2="42" stroke="#F59E0B" strokeWidth="1" />
            <text x="55" y="26" fill="#F8FAFC" fontSize="13" fontWeight="800" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              PHONG THỦY
            </text>
          </g>

          {/* Tập 4: THẦN SỐ HỌC */}
          <g transform="translate(0, 154)">
            <rect x="0" y="0" width="110" height="42" rx="4" fill="#6B21A8" stroke="#581C87" strokeWidth="2" />
            <line x1="6" y1="0" x2="6" y2="42" stroke="#F59E0B" strokeWidth="1" />
            <text x="55" y="26" fill="#F8FAFC" fontSize="12" fontWeight="800" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              THẦN SỐ HỌC
            </text>
          </g>

          {/* Cuốn sách lớn bên dưới có Thái Cực */}
          <rect x="-10" y="206" width="130" height="110" rx="6" fill="#451A03" stroke="#292524" strokeWidth="2" />
          <circle cx="55" cy="260" r="22" fill="#E2E8F0" />
          <path d="M 55 238 C 43 238, 33 248, 33 260 C 33 272, 43 282, 55 282 C 43 282, 43 260, 55 260 C 67 260, 67 238, 55 238 Z" fill="#18181B" />
        </g>

        {/* 4. CHÂN DUNG CÔ GIÁO ĐỖ GIA NGỒI TRANG NGHIÊM */}
        <g id="teacher-figure">
          {/* Mấn nhung đỏ rực rỡ */}
          <ellipse cx="530" cy="180" rx="90" ry="60" fill="url(#velvetRed)" stroke="#7F1D1D" strokeWidth="3" />
          <ellipse cx="530" cy="170" rx="80" ry="46" fill="#DC2626" />

          {/* Mái tóc đen chấm vai uốn nhẹ */}
          <path d="M 450 210 C 430 270, 440 330, 465 370 C 480 340, 475 260, 475 220 Z" fill="#18181B" />
          <path d="M 610 210 C 630 270, 620 330, 595 370 C 580 340, 585 260, 585 220 Z" fill="#18181B" />

          {/* Cổ cao thanh mảnh */}
          <path d="M 505 280 L 505 340 L 555 340 L 555 280 Z" fill="#FED7AA" />

          {/* Gương mặt trái xoan phúc hậu */}
          <ellipse cx="530" cy="245" rx="58" ry="68" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />

          {/* Mái tóc bồng bềnh */}
          <path d="M 472 210 Q 530 230 588 210 Q 560 190 530 190 Q 500 190 472 210 Z" fill="#18181B" />

          {/* Đôi mắt đen sáng ngời, thông tuệ */}
          <ellipse cx="505" cy="245" rx="7.5" ry="6" fill="#18181B" />
          <circle cx="507" cy="243" r="2.5" fill="#FFFFFF" />
          <ellipse cx="555" cy="245" rx="7.5" ry="6" fill="#18181B" />
          <circle cx="557" cy="243" r="2.5" fill="#FFFFFF" />
          
          {/* Lông mày thanh tú */}
          <path d="M 492 232 Q 506 226 518 230" stroke="#3F3F46" strokeWidth="2.2" strokeLinecap="round" fill="none" />
          <path d="M 542 230 Q 554 226 568 232" stroke="#3F3F46" strokeWidth="2.2" strokeLinecap="round" fill="none" />

          {/* Sống mũi thanh thoát & Nụ cười đôn hậu */}
          <path d="M 530 248 L 528 266 L 534 266" stroke="#FB923C" strokeWidth="1.5" strokeLinecap="round" fill="none" />
          <path d="M 518 280 Q 530 292 542 280" stroke="#E11D48" strokeWidth="2.8" strokeLinecap="round" fill="none" />
          {/* Đôi má ửng hồng duyên dáng */}
          <circle cx="490" cy="265" r="9" fill="#FDA4AF" opacity="0.45" />
          <circle cx="570" cy="265" r="9" fill="#FDA4AF" opacity="0.45" />

          {/* Chuỗi hạt đen phong thủy đeo cổ */}
          <path d="M 505 330 Q 530 435 555 330" stroke="#18181B" strokeWidth="4.5" strokeDasharray="6 4" fill="none" />
          {/* Viên ngọc bích đen thuôn dài */}
          <rect x="526" y="420" width="8" height="24" rx="4" fill="#09090B" stroke="#27272A" strokeWidth="1" />

          {/* Tà Áo Dài Màu Cam Hoàng Thổ Quý Phái */}
          <path
            d="M 470 340 
               L 590 340 
               L 630 620 
               L 610 880 
               L 410 880 
               L 390 620 Z"
            fill="url(#silkOrange)"
          />
          {/* Tà áo buông mềm mại xuống ghế */}
          <path
            d="M 410 880 
               Q 510 940 610 880 
               L 630 1000 
               L 390 1000 Z"
            fill="#C2410C"
          />

          {/* Áo Blazer Trắng Khoác Ngoài Trang Trọng */}
          {/* Thân vạt trái blazer */}
          <path
            d="M 465 340 
               C 425 410, 410 500, 400 680 
               L 475 680 
               L 490 400 
               L 465 340 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Thân vạt phải blazer */}
          <path
            d="M 595 340 
               C 635 410, 650 500, 660 680 
               L 585 680 
               L 570 400 
               L 595 340 Z"
            fill="#FFFFFF"
            stroke="#CBD5E1"
            strokeWidth="1.5"
          />
          {/* Cổ áo bẻ blazer thanh lịch */}
          <polygon points="465,340 505,420 480,420 460,360" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />
          <polygon points="595,340 555,420 580,420 600,360" fill="#F8FAFC" stroke="#94A3B8" strokeWidth="1" />

          {/* Cánh tay áo blazer trắng đặt nhẹ lên đùi */}
          <path d="M 405 400 C 375 490, 395 590, 480 630 L 490 590 C 430 560, 420 480, 440 400 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />
          <path d="M 655 400 C 685 490, 665 590, 580 630 L 570 590 C 630 560, 640 480, 620 400 Z" fill="#FFFFFF" stroke="#CBD5E1" strokeWidth="1.5" />

          {/* Đôi bàn tay ngọc thon thả đan nhẹ, đeo nhẫn và vòng chuỗi hạt */}
          <ellipse cx="505" cy="625" rx="16" ry="10" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
          <ellipse cx="545" cy="625" rx="16" ry="10" fill="#FFF7ED" stroke="#FDBA74" strokeWidth="1" />
          {/* Nhẫn ngọc đen */}
          <circle cx="508" cy="624" r="3.5" fill="#09090B" />
          {/* Chuỗi hạt vòng tay */}
          <path d="M 570 610 Q 585 625 570 640" stroke="#78350F" strokeWidth="3.5" strokeDasharray="4 2" fill="none" />
        </g>

        {/* 5. BÀN TRÀ PHONG THỦY BÊN TRÁI & PHÁP BẢO */}
        <g id="feng-shui-desk" transform="translate(0, 460)">
          {/* Mặt bàn gỗ tròn trải khăn gấm thêu */}
          <ellipse cx="180" cy="300" rx="180" ry="90" fill="#FBBF24" stroke="#D97706" strokeWidth="2" opacity="0.3" />
          <ellipse cx="180" cy="290" rx="170" ry="80" fill="#FFFBEB" stroke="#B45309" strokeWidth="2" />

          {/* BIỂN ĐỒNG: "THẤU HIỂU BẢN THÂN - KIẾN TẠO VẬN MỆNH" */}
          <g id="motto-plaque" transform="translate(80, 20)">
            {/* Chân đế gỗ */}
            <rect x="0" y="0" width="160" height="180" rx="10" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <rect x="8" y="8" width="144" height="164" rx="6" fill="#991B1B" stroke="#B45309" strokeWidth="1.5" />
            
            <text x="80" y="45" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              THẤU HIỂU
            </text>
            <text x="80" y="70" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              BẢN THÂN
            </text>
            <line x1="30" y1="88" x2="130" y2="88" stroke="#FDE68A" strokeWidth="1" />
            <text x="80" y="115" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              KIẾN TẠO
            </text>
            <text x="80" y="140" fill="#FDE68A" fontSize="13" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
              VẬN MỆNH
            </text>
            {/* Nơ đỏ phong thủy chúc phúc */}
            <circle cx="80" cy="180" r="5" fill="#DC2626" />
            <line x1="80" y1="180" x2="80" y2="205" stroke="#DC2626" strokeWidth="3" />
          </g>

          {/* LA BÀN BÁT QUÁI (LA KINH) TRÊN BÀN */}
          <g id="la-kinh" transform="translate(80, 240)">
            <ellipse cx="60" cy="30" rx="65" ry="35" fill="#78350F" stroke="#451A03" strokeWidth="3" />
            <ellipse cx="60" cy="30" rx="55" ry="28" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" />
            <ellipse cx="60" cy="30" rx="42" ry="20" fill="#1C1917" />
            <ellipse cx="60" cy="30" rx="14" ry="7" fill="#FFFFFF" />
            {/* Kim chỉ nam */}
            <line x1="60" y1="18" x2="60" y2="42" stroke="#DC2626" strokeWidth="2" />
          </g>

          {/* BÀN TÍNH GỖ GẢY */}
          <g id="abacus" transform="translate(190, 200)">
            <rect x="0" y="0" width="120" height="70" rx="4" fill="#451A03" stroke="#292524" strokeWidth="2" />
            <rect x="5" y="5" width="110" height="60" fill="#78350F" />
            <line x1="5" y1="24" x2="115" y2="24" stroke="#D97706" strokeWidth="2" />
            {/* Các hạt bàn tính vàng son */}
            {[18, 32, 46, 60, 74, 88, 102].map((x, i) => (
              <g key={i}>
                <line x1={x} y1="5" x2={x} y2="65" stroke="#D97706" strokeWidth="1" />
                <circle cx={x} cy="15" r="3.5" fill="#FDE68A" />
                <circle cx={x} cy="35" r="3.5" fill="#FDE68A" />
                <circle cx={x} cy="45" r="3.5" fill="#FDE68A" />
                <circle cx={x} cy="55" r="3.5" fill="#FDE68A" />
              </g>
            ))}
          </g>

          {/* ĐÀI HOA SEN HỒNG THANH KHIẾT GÓC TRÁI BÀN */}
          <g id="lotus-vase" transform="translate(0, 100)">
            {/* Bình hoa gốm đen bóng */}
            <path d="M 20 180 C 10 140, 20 90, 45 70 C 60 70, 70 85, 75 110 C 80 140, 90 180, 80 200 Z" fill="#18181B" stroke="#3F3F46" strokeWidth="1" />
            {/* Đóa sen hồng rực rỡ */}
            <path d="M 45 50 C 30 20, 40 -10, 55 -30 C 70 -10, 80 20, 65 50 Z" fill="#F43F5E" />
            <path d="M 55 -25 C 48 -10, 50 15, 55 35 C 60 15, 62 -10, 55 -25 Z" fill="#FDA4AF" />
            <path d="M 35 30 C 15 10, 15 -10, 30 -20 C 45 -5, 45 15, 35 30 Z" fill="#FB7185" />
            <path d="M 75 30 C 95 10, 95 -10, 80 -20 C 65 -5, 65 15, 75 30 Z" fill="#FB7185" />
          </g>

          {/* ĐÓA SEN HỒNG NỞ DƯỚI CHÂN CÔ GIÁO BÊN PHẢI */}
          <g id="bottom-lotus" transform="translate(680, 400)">
            <path d="M 0 50 C -25 20, -15 -10, 0 -30 C 15 -10, 25 20, 0 50 Z" fill="#F43F5E" />
            <path d="M 0 -25 C -7 -10, -5 15, 0 35 C 5 15, 7 -10, 0 -25 Z" fill="#FDA4AF" />
            <path d="M -20 30 C -40 10, -40 -10, -25 -20 C -10 -5, -10 15, -20 30 Z" fill="#FB7185" />
            <path d="M 20 30 C 40 10, 40 -10, 25 -20 C 10 -5, 10 15, 20 30 Z" fill="#FB7185" />
          </g>
        </g>

        {/* THÁP SỐ HỌC LƯỢNG TỬ GÓC DƯỚI TRÁI */}
        <g id="numerology-pyramid" transform="translate(40, 850)">
          <polygon points="60,0 120,120 0,120" fill="#FDE68A" stroke="#B45309" strokeWidth="1.5" opacity="0.3" />
          <text x="60" y="25" fill="#78350F" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">3 1 6</text>
          <text x="60" y="60" fill="#78350F" fontSize="15" fontWeight="900" textAnchor="middle" fontFamily="monospace">3 3 5 7 3</text>
          <text x="60" y="95" fill="#78350F" fontSize="16" fontWeight="900" textAnchor="middle" fontFamily="monospace">4 6 2</text>
        </g>

        {/* VIỀN TRANH HOÀNG GIA CHẠM KHẮC CỔ PHONG */}
        <rect x="8" y="8" width="784" height="984" rx="16" fill="none" stroke="#B45309" strokeWidth="3" />
        <rect x="16" y="16" width="768" height="968" rx="12" fill="none" stroke="#D97706" strokeWidth="1" strokeDasharray="6 3" />
        
        {/* Bốn góc hoa văn mây cổ */}
        <path d="M 24 48 L 48 48 L 48 24" stroke="#B45309" strokeWidth="3" fill="none" />
        <path d="M 776 48 L 752 48 L 752 24" stroke="#B45309" strokeWidth="3" fill="none" />
        <path d="M 24 952 L 48 952 L 48 976" stroke="#B45309" strokeWidth="3" fill="none" />
        <path d="M 776 952 L 752 952 L 752 976" stroke="#B45309" strokeWidth="3" fill="none" />

        {/* BẢNG TÊN DƯỚI CÙNG */}
        <g transform="translate(400, 940)">
          <rect x="-180" y="-22" width="360" height="44" rx="22" fill="#78350F" stroke="#D97706" strokeWidth="2" />
          <text x="0" y="6" fill="#FDE68A" fontSize="18" fontWeight="900" textAnchor="middle" fontFamily="'Playfair Display', serif" letterSpacing="1">
            CÔ GIÁO ĐỖ GIA • HUYỀN ĐẠO 4311
          </text>
        </g>
      </svg>
      )}
    </div>
  );
};
