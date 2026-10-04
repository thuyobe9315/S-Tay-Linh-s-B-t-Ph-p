import React, { useState } from 'react';
import { Search, PhoneCall, FileCheck2, ExternalLink } from 'lucide-react';
import { RedSealStamp } from './OrientalArtwork';
import { HuyenDaoBrandLogo } from './HuyenDaoBrandLogo';

interface HeaderProps {
  quickSearch: string;
  onQuickSearchChange: (val: string) => void;
  onNavigateToDictionary: () => void;
  onNavigateToTab?: (tab: any) => void;
}

export const Header: React.FC<HeaderProps> = ({
  quickSearch,
  onQuickSearchChange,
  onNavigateToDictionary,
  onNavigateToTab,
}) => {
  const [isSearchFocused, setIsSearchFocused] = useState(false);

  const handleSearchSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (quickSearch.trim()) {
      onNavigateToDictionary();
    }
  };

  const handleOpenExam = () => {
    if (onNavigateToTab) {
      onNavigateToTab('exam');
    }
  };

  return (
    <header className="bg-slate-900 text-white shadow-md sticky top-0 z-30 border-b border-amber-900/40">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-3">
        <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-3">
          
          {/* Brand & Title */}
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-3">
              <HuyenDaoBrandLogo size={48} className="w-12 h-12 rounded-xl ring-2 ring-amber-400/50 shadow-md cursor-pointer hover:scale-105 transition-transform" />
              <div>
                <div className="flex items-center gap-2">
                  <h1 className="text-xl sm:text-2xl font-black tracking-tight text-white flex items-center gap-1.5 font-serif">
                    <span>Huyền Đạo Đỗ Gia</span>
                    <span className="text-amber-400 font-sans text-lg font-bold">4311</span>
                  </h1>
                  <RedSealStamp text="玄道" className="hidden sm:inline-flex w-7 h-7 text-[9px]" />
                </div>
                <p className="text-xs sm:text-sm text-amber-200/90 font-medium">
                  Sổ Tay Linh Số Bát Pháp • Thuận Đạo – Thuận Khí – Thuận Đời
                </p>
              </div>
            </div>

            {/* Mobile Actions: BÀI KIỂM TRA & Hotline */}
            <div className="flex items-center gap-2 md:hidden">
              <button
                type="button"
                onClick={handleOpenExam}
                className="px-2.5 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 text-white flex items-center gap-1 text-xs font-black uppercase tracking-wider shadow-sm border border-amber-300/40 cursor-pointer"
                title="Mở BÀI KIỂM TRA"
              >
                <FileCheck2 className="w-3.5 h-3.5" />
                <span>KIỂM TRA</span>
              </button>
              <a
                href="tel:0768431286"
                className="p-2 rounded-xl bg-amber-600 hover:bg-amber-700 text-white flex items-center justify-center text-xs font-bold shadow-sm"
                title="Gọi Hotline 0768431286"
              >
                <PhoneCall className="w-4 h-4" />
              </a>
            </div>
          </div>

          {/* Quick Search & Controls */}
          <div className="flex items-center gap-2 sm:gap-3 flex-wrap sm:flex-nowrap">
            {/* Quick Search Input */}
            <form onSubmit={handleSearchSubmit} className="relative flex-1 sm:w-60 md:w-64">
              <div className="relative">
                <input
                  type="text"
                  value={quickSearch}
                  onChange={(e) => onQuickSearchChange(e.target.value)}
                  onFocus={() => setIsSearchFocused(true)}
                  onBlur={() => setIsSearchFocused(false)}
                  placeholder="Tra nhanh số (14, 68...)..."
                  className={`w-full bg-blue-950/80 border text-white placeholder-blue-300/70 text-sm rounded-xl pl-9 pr-3 py-2.5 outline-none transition-all ${
                    isSearchFocused ? 'border-blue-400 ring-2 ring-blue-400/30' : 'border-blue-800 hover:border-blue-700'
                  }`}
                  aria-label="Tìm kiếm nhanh năng lượng số"
                />
                <Search className="w-4 h-4 text-blue-300 absolute left-3 top-3 pointer-events-none" />
              </div>
            </form>

            {/* BÀI KIỂM TRA Button (Desktop) */}
            <button
              type="button"
              onClick={handleOpenExam}
              className="hidden sm:inline-flex items-center gap-1.5 px-3.5 py-2.5 rounded-xl bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 hover:from-red-500 hover:to-amber-500 text-white font-black text-xs uppercase tracking-wider shadow-md hover:shadow-lg transition-all border border-amber-300/50 shrink-0 cursor-pointer"
              title="Làm BÀI KIỂM TRA Bát Cực Linh Số"
            >
              <FileCheck2 className="w-4 h-4 text-amber-200" />
              <span>BÀI KIỂM TRA</span>
            </button>

            {/* Hotline Desktop */}
            <a
              href="tel:0768431286"
              className="hidden sm:inline-flex items-center gap-2 px-3.5 py-2.5 rounded-xl bg-amber-500/20 hover:bg-amber-500/30 text-amber-200 border border-amber-500/40 text-xs sm:text-sm font-bold transition-all shadow-xs shrink-0"
              title="Gọi Hotline Huyền Đạo Đỗ Gia"
            >
              <PhoneCall className="w-4 h-4 text-amber-400 animate-pulse" />
              <span>Hotline: <strong className="text-white font-mono text-sm">0768431286</strong></span>
            </a>
          </div>

        </div>
      </div>
    </header>
  );
};
