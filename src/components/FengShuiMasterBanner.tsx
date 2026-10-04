import React, { useState } from 'react';
import { 
  Sparkles, 
  Search, 
  ArrowRight, 
  PhoneCall, 
  Compass, 
  Share2, 
  Check, 
  Layers,
  ShieldCheck,
  ExternalLink
} from 'lucide-react';
import { 
  CornerOrnament, 
  TaijiYinYangArt, 
  LotusFlowerArt, 
  RedSealStamp, 
  BambooSilhouette 
} from './OrientalArtwork';

interface FengShuiMasterBannerProps {
  onQuickLookup: (phoneNumber: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const FengShuiMasterBanner: React.FC<FengShuiMasterBannerProps> = ({
  onQuickLookup,
  onNavigateToTab,
}) => {
  const [phoneInput, setPhoneInput] = useState('');
  const [copiedHotline, setCopiedHotline] = useState(false);

  const hotline = '0768431286';

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneInput.trim()) {
      onQuickLookup(phoneInput.trim());
    }
  };

  const handleCopyHotline = () => {
    navigator.clipboard.writeText(hotline);
    setCopiedHotline(true);
    setTimeout(() => setCopiedHotline(false), 2500);
  };

  return (
    <div className="relative rounded-3xl overflow-hidden shadow-xl border-2 border-amber-700/40 bg-[#EFE8DC] text-slate-900 my-2">
      {/* 4 Khung hoa văn góc cổ điển */}
      <CornerOrnament position="top-left" className="absolute top-2 left-2 text-amber-700/80 z-20" />
      <CornerOrnament position="top-right" className="absolute top-2 right-2 text-amber-700/80 z-20" />
      <CornerOrnament position="bottom-left" className="absolute bottom-2 left-2 text-amber-700/80 z-20" />
      <CornerOrnament position="bottom-right" className="absolute bottom-2 right-2 text-amber-700/80 z-20" />

      {/* Lớp nền vân giấy cổ truyền & Thủy mặc núi non */}
      <div 
        className="absolute inset-0 pointer-events-none opacity-90"
        style={{
          backgroundImage: `
            radial-gradient(ellipse at 50% 30%, rgba(255,255,255,0.7) 0%, rgba(239,232,220,0.85) 60%, rgba(216,203,184,0.95) 100%),
            radial-gradient(circle at 15% 50%, rgba(198,146,42,0.1) 0%, transparent 40%),
            radial-gradient(circle at 85% 60%, rgba(140,92,15,0.12) 0%, transparent 50%)
          `,
        }}
      />

      {/* Rặng tre thư pháp mờ bên trái */}
      <div className="absolute left-0 bottom-0 top-0 opacity-20 pointer-events-none flex items-end">
        <BambooSilhouette className="w-40 sm:w-56 h-full text-slate-900" />
      </div>

      {/* Núi mờ ảo và sương khói bên phải */}
      <div 
        className="absolute right-0 bottom-0 top-0 w-1/3 opacity-25 pointer-events-none"
        style={{
          backgroundImage: `radial-gradient(circle at 75% 40%, rgba(223,178,81,0.3) 0%, transparent 60%)`,
        }}
      >
        <svg viewBox="0 0 200 200" className="w-full h-full text-slate-900 fill-current opacity-40">
          {/* Đỉnh núi & Bảo tháp */}
          <path d="M 80 200 L 140 90 L 200 200 Z" />
          <path d="M 120 200 L 170 120 L 220 200 Z" opacity="0.6" />
          <circle cx="170" cy="80" r="14" fill="#DFB251" opacity="0.7" />
        </svg>
      </div>

      {/* Khung viền chỉ vàng đôi chạy quanh mép (Double Gold Filigree Border) */}
      <div className="absolute inset-2 sm:inset-3 border border-amber-800/25 rounded-2xl pointer-events-none" />
      <div className="absolute inset-3 sm:inset-4 border border-amber-700/15 rounded-xl pointer-events-none" />

      {/* NỘI DUNG CHÍNH CỦA BANNER HUYỀN ĐẠO ĐỖ GIA */}
      <div className="relative z-10 p-6 sm:p-10 lg:p-12 flex flex-col items-center text-center max-w-4xl mx-auto">
        
        {/* Biểu tượng Thái Cực Thủy Mặc & Hoa Sen */}
        <div className="flex flex-col items-center mb-3">
          <TaijiYinYangArt className="w-28 h-28 sm:w-36 sm:h-36 mb-1" />
          <LotusFlowerArt className="w-12 h-6 text-amber-700" color="#9A6B1A" />
        </div>

        {/* Tên Thương Hiệu Thư Pháp "Huyền Đạo Đỗ Gia 4311" */}
        <div className="flex flex-wrap items-center justify-center gap-3 mb-2">
          <h1 
            className="text-3xl sm:text-5xl lg:text-6xl font-black text-slate-950 tracking-tight"
            style={{ 
              fontFamily: "'Noto Serif', serif",
              textShadow: '0 1px 2px rgba(255,255,255,0.8), 0 2px 8px rgba(180,140,80,0.2)' 
            }}
          >
            Huyền Đạo Đỗ Gia <span className="text-amber-800 font-sans text-2xl sm:text-4xl">4311</span>
          </h1>

          {/* Triện son đỏ Huyền Đạo */}
          <div className="flex items-center gap-1.5">
            <RedSealStamp text="玄道" subtext="Huyền Đạo" />
            <RedSealStamp text=" linh " subtext="Bát Pháp" />
          </div>
        </div>

        {/* Khẩu Hiệu Ba Trụ Cột: THUẬN ĐẠO – THUẬN KHÍ – THUẬN ĐỜI */}
        <div className="flex items-center justify-center gap-2 sm:gap-3 text-amber-950 font-bold uppercase tracking-widest text-xs sm:text-base border-y border-amber-800/30 py-1.5 px-4 sm:px-8 my-2 bg-amber-900/5 rounded-full">
          <span>THUẬN ĐẠO</span>
          <span className="text-amber-700">•</span>
          <span>THUẬN KHÍ</span>
          <span className="text-amber-700">•</span>
          <span>THUẬN ĐỜI</span>
        </div>

        {/* Câu Châm Ngôn Nổi Tiếng Trong Dấu Ngoặc Kép Hoàng Kim */}
        <div className="my-3 sm:my-4 max-w-2xl">
          <div className="relative inline-block px-8 py-2">
            <span className="text-4xl sm:text-5xl text-amber-700 font-serif absolute -top-3 left-0 select-none opacity-80">
              “
            </span>
            <p 
              className="text-lg sm:text-2xl text-slate-900 font-bold italic tracking-wide"
              style={{ fontFamily: "'Noto Serif', serif" }}
            >
              Thuận theo đạo trời, An trong vận đời.
            </p>
            <span className="text-4xl sm:text-5xl text-amber-700 font-serif absolute -bottom-5 right-0 select-none opacity-80">
              ”
            </span>
          </div>
        </div>

        {/* Thanh Hotline Uy Tín */}
        <div className="flex flex-wrap items-center justify-center gap-3 my-3">
          <div className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full bg-slate-900 text-amber-300 font-bold text-base sm:text-lg shadow-md border border-amber-600/50">
            <PhoneCall className="w-5 h-5 text-amber-400 animate-pulse" />
            <span>Hotline:</span>
            <a 
              href={`tel:${hotline}`}
              className="text-amber-200 hover:text-white font-mono font-black text-xl tracking-wider transition-colors underline decoration-amber-500/50"
              title="Nhấp để gọi ngay"
            >
              {hotline}
            </a>
          </div>

          <button
            type="button"
            onClick={handleCopyHotline}
            className="px-3.5 py-2 rounded-full bg-white/80 hover:bg-white text-slate-800 text-xs sm:text-sm font-semibold border border-amber-700/30 transition-all shadow-xs flex items-center gap-1.5 cursor-pointer"
          >
            {copiedHotline ? <Check className="w-4 h-4 text-emerald-600" /> : <Share2 className="w-4 h-4 text-amber-700" />}
            <span>{copiedHotline ? 'Đã sao chép!' : 'Sao chép Hotline'}</span>
          </button>
        </div>

        {/* Ô Tra Nhanh Năng Lượng Dãy Số Trực Tiếp Trên Banner */}
        <form onSubmit={handleSubmit} className="w-full max-w-xl mt-4 sm:mt-6">
          <div className="flex flex-col sm:flex-row gap-2.5 p-1.5 bg-white/90 backdrop-blur-xs rounded-2xl border-2 border-amber-700/40 shadow-lg">
            <div className="relative flex-1">
              <input
                type="text"
                value={phoneInput}
                onChange={(e) => setPhoneInput(e.target.value)}
                placeholder="Nhập số điện thoại cần luận giải (ví dụ: 0768431286)..."
                className="w-full bg-transparent text-slate-950 placeholder-slate-500 text-base sm:text-lg font-bold pl-11 pr-3 py-3 rounded-xl outline-none"
                aria-label="Nhập số điện thoại tra cứu năng lượng số"
              />
              <Search className="w-5 h-5 text-amber-800 absolute left-3.5 top-3.5 pointer-events-none" />
            </div>

            <button
              type="submit"
              className="px-6 py-3 bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-700 hover:to-amber-900 text-white font-bold text-base sm:text-lg rounded-xl transition-all shadow-md flex items-center justify-center gap-2 min-h-[48px] cursor-pointer shrink-0"
            >
              <span>Phân Tích Ngay</span>
              <ArrowRight className="w-5 h-5" />
            </button>
          </div>

          <div className="mt-2.5 text-xs sm:text-sm text-slate-800 font-medium flex items-center justify-center gap-2 sm:gap-3 flex-wrap">
            <span className="flex items-center gap-1.5 font-semibold text-slate-700">
              <Sparkles className="w-3.5 h-3.5 text-amber-700" />
              <span>Phân tích Tứ Cát Tinh • Tứ Hung Tinh • Chuyển Hóa Cải Vận</span>
            </span>
            <span className="hidden sm:inline text-amber-800 font-bold">•</span>
            <a
              href="https://claude.ai/artifact/Lq9Uj7LgY3cEauv2reFFUm"
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-lg bg-amber-500/20 hover:bg-amber-500/30 text-amber-950 font-bold underline transition-colors border border-amber-600/30"
              title="Mở liên kết bản phân tích nâng cao"
            >
              <ExternalLink className="w-3.5 h-3.5 text-amber-800" />
              <span>Bản Phân Tích Nâng Cao</span>
            </a>
          </div>
        </form>

      </div>
    </div>
  );
};
