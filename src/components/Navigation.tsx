import React from 'react';
import { 
  Home, 
  GraduationCap,
  BookOpen, 
  ArrowLeftRight, 
  Hash, 
  Sparkles, 
  Film,
  CheckCircle,
  FileCheck2,
  ExternalLink
} from 'lucide-react';

export type NavTab = 'dashboard' | 'lectures' | 'exam' | 'videos' | 'dictionary' | 'transformation' | 'lookup' | 'knowledge' | 'settings' | 'testcases';

interface NavigationProps {
  activeTab: NavTab;
  onTabChange: (tab: NavTab) => void;
  savedLookupCount?: number;
  articleCount?: number;
}

export const Navigation: React.FC<NavigationProps> = ({
  activeTab,
  onTabChange,
  savedLookupCount = 0,
  articleCount = 0,
}) => {
  const navItems: Array<{
    id: NavTab;
    label: string;
    sublabel: string;
    icon: React.ReactNode;
    count?: number;
    highlight?: boolean;
  }> = [
    {
      id: 'dashboard',
      label: 'Trang Chủ',
      sublabel: 'Tổng quan & Lời khuyên',
      icon: <Home className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'lectures',
      label: 'Bài Giảng & Giáo Viên',
      sublabel: '14 Slide Lượng Tử & Cô Giáo',
      icon: <GraduationCap className="w-5 h-5 shrink-0" />,
      count: 14,
    },
    {
      id: 'exam',
      label: 'BÀI KIỂM TRA',
      sublabel: '15 Câu Hỏi & Đáp Án',
      icon: <FileCheck2 className="w-5 h-5 shrink-0" />,
      count: 15,
      highlight: true,
    },
    {
      id: 'videos',
      label: 'Video Bài Giảng',
      sublabel: '4 Video thực chiến',
      icon: <Film className="w-5 h-5 shrink-0" />,
      count: 4,
    },
    {
      id: 'dictionary',
      label: 'Từ Điển Từ Trường',
      sublabel: '8 Cụm năng lượng',
      icon: <BookOpen className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'transformation',
      label: 'Sự Chuyển Hóa',
      sublabel: 'Lấy Cát Chế Hung',
      icon: <ArrowLeftRight className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'lookup',
      label: 'Tra Cứu Dãy Số',
      sublabel: 'Phân tích số & Điểm',
      icon: <Hash className="w-5 h-5 shrink-0" />,
    },
    {
      id: 'knowledge',
      label: 'Cẩm Nang Cải Vận',
      sublabel: 'Bí quyết ứng dụng',
      icon: <Sparkles className="w-5 h-5 shrink-0" />,
      count: articleCount > 0 ? articleCount : undefined,
    },
    {
      id: 'testcases',
      label: 'Kiểm Thử (8 Test)',
      sublabel: 'Nghiệm thu chuẩn',
      icon: <CheckCircle className="w-5 h-5 shrink-0" />,
    },
  ];

  return (
    <nav className="bg-white border-b border-slate-200 shadow-xs sticky top-[73px] z-20">
      <div className="max-w-7xl mx-auto px-2 sm:px-6 lg:px-8">
        <div className="flex items-center space-x-1 sm:space-x-2 overflow-x-auto py-2.5 scrollbar-none no-scrollbar">
          {navItems.map((item) => {
            const isActive = activeTab === item.id;
            
            // Special treatment for highlighted BÀI KIỂM TRA
            if (item.highlight) {
              return (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onTabChange(item.id)}
                  className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-bold text-sm sm:text-base transition-all whitespace-nowrap min-h-[48px] shrink-0 border cursor-pointer ${
                    isActive
                      ? 'bg-gradient-to-r from-red-600 via-rose-600 to-amber-600 text-white shadow-md border-amber-300 ring-2 ring-red-400/40'
                      : 'bg-red-50 hover:bg-red-100/80 text-red-900 border-red-200'
                  }`}
                  aria-current={isActive ? 'page' : undefined}
                >
                  <span className={isActive ? 'text-amber-200' : 'text-red-700'}>
                    {item.icon}
                  </span>
                  <div className="text-left flex flex-col leading-tight">
                    <span className="font-black tracking-wide">{item.label}</span>
                    <span className={`text-[11px] font-normal hidden lg:inline ${isActive ? 'text-amber-100' : 'text-red-700/80'}`}>
                      {item.sublabel}
                    </span>
                  </div>
                  {item.count !== undefined && (
                    <span
                      className={`ml-1 text-xs px-2 py-0.5 rounded-full font-bold ${
                        isActive ? 'bg-white/20 text-white' : 'bg-red-200 text-red-900'
                      }`}
                    >
                      {item.count}
                    </span>
                  )}
                </button>
              );
            }

            return (
              <button
                key={item.id}
                type="button"
                onClick={() => onTabChange(item.id)}
                className={`flex items-center gap-2.5 px-4 py-3 rounded-xl font-semibold text-base transition-all whitespace-nowrap min-h-[48px] shrink-0 ${
                  isActive
                    ? 'bg-blue-700 text-white shadow-sm ring-1 ring-blue-700'
                    : 'text-slate-700 hover:text-blue-900 hover:bg-blue-50/80 bg-transparent'
                }`}
                aria-current={isActive ? 'page' : undefined}
              >
                <span className={isActive ? 'text-white' : 'text-blue-700'}>
                  {item.icon}
                </span>
                <div className="text-left flex flex-col leading-tight">
                  <span className="font-bold text-sm sm:text-base">{item.label}</span>
                  <span className={`text-[11px] font-normal hidden lg:inline ${isActive ? 'text-blue-100' : 'text-slate-500'}`}>
                    {item.sublabel}
                  </span>
                </div>
                {item.count !== undefined && (
                  <span
                    className={`ml-1 text-xs px-2 py-0.5 rounded-full font-bold ${
                      isActive ? 'bg-white/20 text-white' : 'bg-slate-100 text-slate-700'
                    }`}
                  >
                    {item.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>
      </div>
    </nav>
  );
};
