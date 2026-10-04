import React from 'react';

/**
 * Các họa tiết hoa văn phong thủy cổ điển:
 * - Hoa văn góc cổ (Corner Filigree)
 * - Biểu tượng Thái Cực (Taiji Yin-Yang) thủy mặc
 * - Hoa sen vàng (Golden Lotus)
 * - Con dấu triện đỏ (Red Seal Chop)
 */

export const CornerOrnament: React.FC<{
  position: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right';
  className?: string;
}> = ({ position, className = 'text-amber-600/70' }) => {
  const rotation =
    position === 'top-left'
      ? ''
      : position === 'top-right'
      ? 'rotate-90'
      : position === 'bottom-right'
      ? 'rotate-180'
      : '-rotate-90';

  return (
    <div className={`w-12 h-12 pointer-events-none select-none ${rotation} ${className}`}>
      <svg viewBox="0 0 100 100" fill="currentColor" className="w-full h-full opacity-85">
        {/* Khung góc cổ điển truyền thống */}
        <path d="M4 4 h36 v8 h-28 v28 h-8 z" />
        <path d="M16 16 h20 v6 h-14 v14 h-6 z" />
        <circle cx="8" cy="8" r="3" />
        <path d="M44 4 h6 v12 h-6 z" />
        <path d="M4 44 h12 v6 h-12 z" />
        <path d="M26 4 h4 v4 h-4 z" />
        <path d="M4 26 h4 v4 h-4 z" />
        <path d="M20 20 l12 12 m-12 0 l12 -12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
      </svg>
    </div>
  );
};

export const TaijiYinYangArt: React.FC<{ className?: string }> = ({ className = 'w-48 h-48' }) => {
  return (
    <div className={`relative flex items-center justify-center select-none ${className}`}>
      {/* Vòng hào quang vàng tinh tế */}
      <div className="absolute inset-0 rounded-full bg-radial from-amber-400/25 via-amber-600/10 to-transparent blur-xl scale-125 pointer-events-none animate-pulse" />
      
      <svg viewBox="0 0 200 200" className="w-full h-full drop-shadow-md">
        <defs>
          <linearGradient id="goldGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#DFB251" />
            <stop offset="50%" stopColor="#C6922A" />
            <stop offset="100%" stopColor="#8C5C0F" />
          </linearGradient>
          <linearGradient id="inkGradient" x1="0%" y1="0%" x2="100%" y2="100%">
            <stop offset="0%" stopColor="#1A1815" />
            <stop offset="100%" stopColor="#2E2822" />
          </linearGradient>
        </defs>

        {/* Nét cọ Thủy mặc vòng cung Âm Dương */}
        <g transform="translate(100, 100)">
          {/* Vòng ngoài với nét cọ thư pháp */}
          <circle cx="0" cy="0" r="92" fill="none" stroke="url(#goldGradient)" strokeWidth="2.5" opacity="0.8" strokeDasharray="6 3 12 3" />
          
          {/* Thái Cực đồ dạng cọ mực */}
          {/* Nửa đen mực */}
          <path
            d="M 0 -85 
               A 85 85 0 0 1 0 85 
               A 42.5 42.5 0 0 1 0 0 
               A 42.5 42.5 0 0 0 0 -85 Z"
            fill="url(#inkGradient)"
          />
          {/* Nửa vàng kim */}
          <path
            d="M 0 85 
               A 85 85 0 0 1 0 -85 
               A 42.5 42.5 0 0 1 0 0 
               A 42.5 42.5 0 0 0 0 85 Z"
            fill="url(#goldGradient)"
            opacity="0.9"
          />

          {/* Mắt Âm (đen trong vàng) */}
          <circle cx="0" cy="42.5" r="11" fill="#1A1815" />
          <circle cx="0" cy="42.5" r="4" fill="#F4EFE6" opacity="0.8" />

          {/* Mắt Dương (vàng trong đen) */}
          <circle cx="0" cy="-42.5" r="11" fill="url(#goldGradient)" />
          <circle cx="0" cy="-42.5" r="4" fill="#1A1815" />

          {/* Núi & Bảo Tháp nhỏ ở giữa tâm linh */}
          <g transform="translate(-16, -18) scale(0.32)" opacity="0.95">
            {/* Núi */}
            <path d="M 0 80 L 50 10 L 100 80 Z" fill="#1A1815" opacity="0.8" />
            <path d="M 35 80 L 70 25 L 115 80 Z" fill="#1A1815" opacity="0.6" />
            {/* Chùa / Bảo Tháp trên đỉnh */}
            <rect x="42" y="10" width="16" height="12" fill="#DFB251" />
            <polygon points="35,10 65,10 50,0" fill="#DFB251" />
            <rect x="46" y="-6" width="8" height="6" fill="#DFB251" />
            <polygon points="40,-6 60,-6 50,-14" fill="#DFB251" />
            <line x1="50" y1="-14" x2="50" y2="-20" stroke="#DFB251" strokeWidth="2" />
          </g>
        </g>
      </svg>
    </div>
  );
};

export const LotusFlowerArt: React.FC<{ className?: string; color?: string }> = ({
  className = 'w-10 h-10',
  color = '#C6922A',
}) => {
  return (
    <svg viewBox="0 0 100 60" fill="none" className={className}>
      {/* Đài sen và các cánh sen thanh thoát */}
      <g stroke={color} strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" fill={color} fillOpacity="0.15">
        {/* Cánh trung tâm */}
        <path d="M 50 8 C 44 24, 44 38, 50 50 C 56 38, 56 24, 50 8 Z" fillOpacity="0.4" />
        {/* Cánh trái trong */}
        <path d="M 50 50 C 36 38, 30 22, 34 14 C 42 24, 46 36, 50 50 Z" />
        {/* Cánh phải trong */}
        <path d="M 50 50 C 64 38, 70 22, 66 14 C 58 24, 54 36, 50 50 Z" />
        {/* Cánh trái ngoài */}
        <path d="M 50 50 C 26 44, 14 30, 20 22 C 30 28, 38 40, 50 50 Z" />
        {/* Cánh phải ngoài */}
        <path d="M 50 50 C 74 44, 86 30, 80 22 C 70 28, 62 40, 50 50 Z" />
        {/* Đế sen */}
        <path d="M 38 52 C 45 55, 55 55, 62 52" strokeWidth="3" />
      </g>
    </svg>
  );
};

export const RedSealStamp: React.FC<{ text: string; subtext?: string; className?: string }> = ({
  text,
  subtext,
  className = 'w-10 h-10',
}) => {
  return (
    <div
      className={`inline-flex flex-col items-center justify-center bg-red-800 text-amber-100 font-bold border-2 border-red-900 rounded-sm shadow-sm select-none p-1 shrink-0 ${className}`}
      style={{
        boxShadow: 'inset 0 0 6px rgba(0,0,0,0.4)',
        letterSpacing: '0.05em',
      }}
    >
      <span className="text-[11px] leading-tight font-black">{text}</span>
      {subtext && <span className="text-[9px] leading-tight font-serif opacity-90">{subtext}</span>}
    </div>
  );
};

export const BambooSilhouette: React.FC<{ className?: string }> = ({ className = 'w-32 h-64' }) => {
  return (
    <svg viewBox="0 0 120 260" fill="currentColor" className={`select-none pointer-events-none ${className}`}>
      {/* Thân tre 1 */}
      <path d="M 30 260 L 32 195 L 34 195 L 32 260 Z" />
      <ellipse cx="33" cy="195" rx="3.5" ry="1.5" />
      <path d="M 32 193 L 34 125 L 36 125 L 34 193 Z" />
      <ellipse cx="35" cy="125" rx="3.5" ry="1.5" />
      <path d="M 34 123 L 35 60 L 37 60 L 36 123 Z" />
      <ellipse cx="36" cy="60" rx="3" ry="1.5" />
      <path d="M 35 58 L 36 0 L 37.5 0 L 36.5 58 Z" />

      {/* Thân tre 2 */}
      <path d="M 60 260 L 61 170 L 63 170 L 62 260 Z" opacity="0.8" />
      <ellipse cx="62" cy="170" rx="3" ry="1.2" opacity="0.8" />
      <path d="M 61 168 L 62 90 L 63.5 90 L 62.5 168 Z" opacity="0.8" />
      <ellipse cx="62.5" cy="90" rx="2.5" ry="1.2" opacity="0.8" />
      <path d="M 62 88 L 63 20 L 64.5 20 L 63.5 88 Z" opacity="0.8" />

      {/* Lá tre thư pháp mềm mại */}
      <path d="M 35 125 Q 15 110, 5 122 Q 22 120, 35 125 Z" />
      <path d="M 35 125 Q 18 135, 2 145 Q 20 135, 35 125 Z" />
      <path d="M 35 125 Q 28 148, 18 165 Q 30 148, 35 125 Z" />
      
      <path d="M 36 60 Q 15 45, 0 52 Q 20 52, 36 60 Z" />
      <path d="M 36 60 Q 20 72, 8 85 Q 22 75, 36 60 Z" />
      <path d="M 36 60 Q 52 45, 68 50 Q 52 55, 36 60 Z" />

      <path d="M 62 170 Q 78 155, 95 160 Q 80 165, 62 170 Z" opacity="0.8" />
      <path d="M 62 170 Q 82 178, 102 188 Q 82 180, 62 170 Z" opacity="0.8" />

      <path d="M 63 90 Q 80 75, 100 80 Q 82 85, 63 90 Z" opacity="0.8" />
      <path d="M 63 90 Q 85 98, 108 108 Q 85 100, 63 90 Z" opacity="0.8" />
      <path d="M 63 90 Q 75 110, 88 128 Q 74 112, 63 90 Z" opacity="0.8" />
    </svg>
  );
};
