import React from 'react';
import { Loader2 } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'sm' | 'md' | 'lg';
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  message = 'Đang tải dữ liệu từ Google Sheets...',
  size = 'md',
}) => {
  const iconSize = size === 'sm' ? 'w-5 h-5' : size === 'lg' ? 'w-10 h-10' : 'w-7 h-7';

  return (
    <div className="flex flex-col items-center justify-center py-12 px-4 text-center">
      <div className="relative">
        <Loader2 className={`${iconSize} animate-spin text-blue-700`} />
      </div>
      {message && (
        <p className="mt-4 text-base md:text-lg font-medium text-slate-700 max-w-md animate-pulse">
          {message}
        </p>
      )}
      <span className="text-xs text-slate-500 mt-1">Đang đồng bộ hóa dữ liệu</span>
    </div>
  );
};
