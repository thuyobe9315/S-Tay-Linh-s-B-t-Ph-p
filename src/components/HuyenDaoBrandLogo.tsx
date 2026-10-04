import React from 'react';

interface HuyenDaoBrandLogoProps {
  size?: number | string;
  className?: string;
  showText?: boolean;
  variant?: 'emblem-only' | 'full-horizontal' | 'full-stacked';
}

export const HuyenDaoBrandLogo: React.FC<HuyenDaoBrandLogoProps> = ({
  size = 48,
  className = '',
  showText = false,
  variant = 'emblem-only',
}) => {
  // SVG Biểu Tượng Thái Cực Thủy Mặc - Chùa Trên Núi - Hoa Sen - Con Dấu Huyền Đạo (Được chuẩn hóa theo bản vẽ gốc)
  const EmblemSvg = (
    <svg
      viewBox="0 0 200 200"
      className="w-full h-full select-none"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        {/* Nền giấy xuyến chỉ / giấy điệp cổ */}
        <radialGradient id="parchmentBase" cx="50%" cy="45%" r="55%">
          <stop offset="0%" stopColor="#F7EEDC" />
          <stop offset="70%" stopColor="#EAD7B8" />
          <stop offset="100%" stopColor="#D9C29E" />
        </radialGradient>

        {/* Ánh kim hoàng gia */}
        <linearGradient id="goldBrushGradient" x1="0%" y1="100%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#8A5A12" />
          <stop offset="25%" stopColor="#D8A535" />
          <stop offset="50%" stopColor="#F9DF88" />
          <stop offset="75%" stopColor="#D8A535" />
          <stop offset="100%" stopColor="#8A5A12" />
        </linearGradient>

        {/* Nét mực tàu đen tuyền */}
        <linearGradient id="blackInkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#121110" />
          <stop offset="70%" stopColor="#221F1B" />
          <stop offset="100%" stopColor="#3A342D" />
        </linearGradient>

        {/* Dốc sương mây núi */}
        <linearGradient id="mistGradient" x1="50%" y1="0%" x2="50%" y2="100%">
          <stop offset="0%" stopColor="#1E1C1A" stopOpacity="0.95" />
          <stop offset="60%" stopColor="#4A4237" stopOpacity="0.7" />
          <stop offset="100%" stopColor="#EAD7B8" stopOpacity="0.1" />
        </linearGradient>

        {/* Con dấu son đỏ */}
        <linearGradient id="sealRedGradient" x1="0%" y1="0%" x2="100%" y2="100%">
          <stop offset="0%" stopColor="#9E1B1B" />
          <stop offset="100%" stopColor="#6E0E0E" />
        </linearGradient>

        {/* Bóng đổ nhẹ cho con dấu */}
        <filter id="sealShadow" x="-10%" y="-10%" width="130%" height="130%">
          <feDropShadow dx="1" dy="1.5" stdDeviation="1.5" floodColor="#000000" floodOpacity="0.35" />
        </filter>
      </defs>

      {/* Vòng nền tròn cổ phong */}
      <circle cx="100" cy="100" r="96" fill="url(#parchmentBase)" stroke="#BFA37C" strokeWidth="1.5" />
      <circle cx="100" cy="100" r="92" fill="none" stroke="#D8A535" strokeWidth="0.75" strokeDasharray="3 2" opacity="0.6" />

      {/* 1. NÉT CỌ THÁI CỰC THỦY MẶC (Yin-Yang Ink Swirl) */}
      {/* Vòng cọ đen bên trái và dưới */}
      <path
        d="M 100 16 
           C 48 16, 12 55, 12 102 
           C 12 148, 52 186, 102 186 
           C 134 186, 155 174, 168 156
           C 152 165, 128 170, 102 170 
           C 60 170, 26 136, 26 100 
           C 26 62, 58 28, 100 28 
           C 118 28, 134 34, 146 44 
           C 134 26, 118 16, 100 16 Z"
        fill="url(#blackInkGradient)"
      />

      {/* Vết xước cọ mực phụ tạo cảm giác vẽ tay tự nhiên */}
      <path
        d="M 18 85 C 15 110, 24 135, 42 155 C 32 140, 26 120, 26 95 Z"
        fill="#121110"
        opacity="0.8"
      />
      <circle cx="28" cy="65" r="2.5" fill="#1A1816" opacity="0.7" />
      <circle cx="36" cy="46" r="1.8" fill="#1A1816" opacity="0.6" />
      <circle cx="152" cy="170" r="2.2" fill="#8A5A12" opacity="0.7" />

      {/* Nét cọ vàng kim uốn lượn bên phải và bên trên (Dương khí / Kim khí) */}
      <path
        d="M 100 18 
           C 146 18, 184 56, 184 102 
           C 184 136, 166 164, 140 178
           C 160 158, 170 134, 170 102 
           C 170 66, 142 34, 106 32
           C 126 42, 140 62, 140 85 
           C 140 108, 124 126, 102 126
           C 114 126, 126 114, 126 96 
           C 126 68, 108 42, 88 32
           C 92 24, 96 18, 100 18 Z"
        fill="url(#goldBrushGradient)"
        opacity="0.95"
      />

      {/* Trăng khuyết và thiên thể trong vòng kim */}
      <path
        d="M 148 42 C 142 48, 142 56, 148 62 C 145 58, 145 46, 148 42 Z"
        fill="#1A1816"
        opacity="0.9"
      />
      <circle cx="156" cy="46" r="3.5" fill="#1A1816" />

      {/* 2. DÃY NÚI MỜ SƯƠNG BÊN TRONG THÁI CỰC */}
      <g id="misty-mountains">
        {/* Lớp núi xa mờ nhạt */}
        <path
          d="M 45 140 L 75 92 L 105 140 Z"
          fill="url(#mistGradient)"
          opacity="0.35"
        />
        <path
          d="M 90 140 L 125 86 L 155 140 Z"
          fill="url(#mistGradient)"
          opacity="0.3"
        />

        {/* Lớp núi chính ở trung tâm nâng đỡ bảo tháp */}
        <path
          d="M 52 142 
             L 78 108 
             L 88 116 
             L 100 78 
             L 112 114 
             L 124 104 
             L 146 142 Z"
          fill="url(#blackInkGradient)"
        />

        {/* Gân núi và dải sương hoàng kim */}
        <path
          d="M 100 82 L 94 115 L 82 142"
          stroke="#D8A535"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
        <path
          d="M 100 82 L 108 112 L 118 142"
          stroke="#D8A535"
          strokeWidth="1.2"
          strokeLinecap="round"
          opacity="0.6"
        />
      </g>

      {/* 3. BẢO THÁP / CHÙA CỔ TRÊN ĐỈNH NÚI (The Ancient Pagoda Pavilion) */}
      <g id="pagoda-temple" transform="translate(100, 75)">
        {/* Đỉnh tháp / Trượng kim */}
        <line x1="0" y1="-28" x2="0" y2="-17" stroke="#1A1816" strokeWidth="1.5" strokeLinecap="round" />
        <circle cx="0" cy="-28" r="1.5" fill="#D8A535" />

        {/* Mái tầng 3 (trên cùng) cong vút */}
        <path
          d="M -11 -17 C -5 -19, 5 -19, 11 -17 C 8 -21, -8 -21, -11 -17 Z"
          fill="#1A1816"
        />
        {/* Thân tầng 3 */}
        <rect x="-4" y="-17" width="8" height="4" fill="#EAD7B8" stroke="#1A1816" strokeWidth="0.8" />

        {/* Mái tầng 2 */}
        <path
          d="M -16 -13 C -8 -15, 8 -15, 16 -13 C 12 -17, -12 -17, -16 -13 Z"
          fill="#1A1816"
        />
        {/* Thân tầng 2 có cột son */}
        <rect x="-6" y="-13" width="12" height="5" fill="#EAD7B8" stroke="#1A1816" strokeWidth="0.8" />
        <line x1="-2" y1="-13" x2="-2" y2="-8" stroke="#9E1B1B" strokeWidth="1" />
        <line x1="2" y1="-13" x2="2" y2="-8" stroke="#9E1B1B" strokeWidth="1" />

        {/* Mái tầng 1 (mái đình chính xòe rộng thanh tao) */}
        <path
          d="M -22 -8 C -11 -11, 11 -11, 22 -8 C 17 -13, -17 -13, -22 -8 Z"
          fill="#1A1816"
        />
        {/* Đầu đao mái uốn cong lên */}
        <path d="M -22 -8 Q -24 -11 -22 -13" stroke="#1A1816" strokeWidth="1.2" fill="none" />
        <path d="M 22 -8 Q 24 -11 22 -13" stroke="#1A1816" strokeWidth="1.2" fill="none" />

        {/* Khung chân tháp trên đỉnh núi */}
        <rect x="-8" y="-8" width="16" height="6" fill="#221F1B" />
        <line x1="-8" y1="-2" x2="8" y2="-2" stroke="#D8A535" strokeWidth="1.2" />
      </g>

      {/* 4. ĐÀI SEN NỞ RỘ Ở CHÂN NÚI (The Sacred Blooming Lotus) */}
      <g id="lotus-flower" transform="translate(100, 142)">
        {/* Cánh sen trung tâm */}
        <path
          d="M 0 -18 C -7 -10, -7 -2, 0 8 C 7 -2, 7 -10, 0 -18 Z"
          fill="#1A1816"
        />
        <path
          d="M 0 -16 C -3 -10, -3 -2, 0 6 C 3 -2, 3 -10, 0 -16 Z"
          fill="#D8A535"
          opacity="0.85"
        />

        {/* Cánh sen lớp trong trái & phải */}
        <path
          d="M 0 8 C -10 2, -18 -8, -14 -14 C -8 -8, -4 -1, 0 8 Z"
          fill="#1A1816"
        />
        <path
          d="M 0 8 C 10 2, 18 -8, 14 -14 C 8 -8, 4 -1, 0 8 Z"
          fill="#1A1816"
        />

        {/* Cánh sen lớp ngoài xòe rộng thanh thoát */}
        <path
          d="M 0 8 C -18 3, -28 -5, -24 -10 C -16 -4, -8 2, 0 8 Z"
          fill="#221F1B"
        />
        <path
          d="M 0 8 C 18 3, 28 -5, 24 -10 C 16 -4, 8 2, 0 8 Z"
          fill="#221F1B"
        />

        {/* Viền kim tuyến cánh sen */}
        <path
          d="M -24 -10 C -16 -4, 0 8, 16 -4 M 24 -10"
          stroke="#D8A535"
          strokeWidth="1"
          strokeLinecap="round"
          opacity="0.7"
        />
      </g>

      {/* 5. CON DẤU ẤN TRIỆN ĐỎ "玄道" (Vermilion Seal Stamp) */}
      <g id="red-seal" transform="translate(156, 92)" filter="url(#sealShadow)">
        {/* Thân triện đỏ bo góc mềm kiểu khắc đá cổ */}
        <rect
          x="0"
          y="0"
          width="26"
          height="38"
          rx="3.5"
          fill="url(#sealRedGradient)"
          stroke="#550808"
          strokeWidth="1"
        />
        {/* Viền trong chạm khắc thủ công */}
        <rect
          x="2.5"
          y="2.5"
          width="21"
          height="33"
          rx="2"
          fill="none"
          stroke="#F8EBD6"
          strokeWidth="0.8"
          opacity="0.85"
          strokeDasharray="9 1 15 1"
        />
        {/* Chữ Hán thư pháp '玄' (Huyền) */}
        <text
          x="13"
          y="15"
          fill="#F8EBD6"
          fontSize="11"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="'Noto Serif', serif"
        >
          玄
        </text>
        {/* Chữ Hán thư pháp '道' (Đạo) */}
        <text
          x="13"
          y="30"
          fill="#F8EBD6"
          fontSize="11"
          fontWeight="900"
          textAnchor="middle"
          fontFamily="'Noto Serif', serif"
        >
          道
        </text>
      </g>
    </svg>
  );

  if (variant === 'emblem-only') {
    return (
      <div
        className={`inline-flex items-center justify-center shrink-0 rounded-2xl overflow-hidden shadow-md ring-1 ring-amber-500/40 ${className}`}
        style={{ width: size, height: size }}
        title="Logo Huyền Đạo Đỗ Gia 4311"
      >
        {EmblemSvg}
      </div>
    );
  }

  if (variant === 'full-horizontal') {
    return (
      <div className={`inline-flex items-center gap-3 ${className}`}>
        <div
          className="shrink-0 rounded-2xl overflow-hidden shadow-md ring-1 ring-amber-500/40"
          style={{ width: size, height: size }}
        >
          {EmblemSvg}
        </div>
        <div>
          <div className="flex items-center gap-2">
            <h2 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 font-serif">
              <span>Huyền Đạo Đỗ Gia</span>
              <span className="text-amber-400 font-sans text-lg font-bold">4311</span>
            </h2>
            <div className="inline-flex items-center px-1.5 py-0.5 rounded bg-red-800 text-amber-100 text-[10px] font-bold border border-red-700 shadow-xs">
              玄道
            </div>
          </div>
          <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
            Sổ Tay Linh Số Bát Pháp • Thuận Đạo – Thuận Khí – Thuận Đời
          </p>
        </div>
      </div>
    );
  }

  // Full stacked variant
  return (
    <div className={`flex flex-col items-center text-center ${className}`}>
      <div
        className="shrink-0 rounded-3xl overflow-hidden shadow-lg ring-2 ring-amber-500/50 mb-3"
        style={{ width: size, height: size }}
      >
        {EmblemSvg}
      </div>
      <h2 className="text-2xl sm:text-3xl font-black text-amber-950 font-serif tracking-tight">
        Huyền Đạo Đỗ Gia <span className="text-amber-600 font-sans">4311</span>
      </h2>
      <p className="text-xs sm:text-sm text-amber-900/80 font-bold uppercase tracking-wider mt-1">
        Thuận Đạo – Thuận Khí – Thuận Đời
      </p>
    </div>
  );
};
