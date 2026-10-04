import React from 'react';
import { AlertCircle, RefreshCw, ExternalLink } from 'lucide-react';

interface ErrorMessageProps {
  title?: string;
  message: string;
  onRetry?: () => void;
  onOpenSettings?: () => void;
}

export const ErrorMessage: React.FC<ErrorMessageProps> = ({
  title = 'Không thể kết nối đến Google Sheets',
  message,
  onRetry,
  onOpenSettings,
}) => {
  return (
    <div className="bg-amber-50 border-2 border-amber-200 rounded-xl p-6 my-6 text-slate-800 shadow-sm">
      <div className="flex items-start gap-4">
        <div className="p-2 bg-amber-100 rounded-lg text-amber-800 shrink-0">
          <AlertCircle className="w-6 h-6" />
        </div>
        <div className="flex-1">
          <h3 className="text-lg font-bold text-amber-900 mb-1">{title}</h3>
          <p className="text-base text-slate-700 leading-relaxed mb-4">{message}</p>

          <div className="flex flex-wrap items-center gap-3">
            {onRetry && (
              <button
                type="button"
                onClick={onRetry}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-blue-700 hover:bg-blue-800 text-white font-medium rounded-lg text-base transition-colors shadow-sm cursor-pointer min-h-[44px]"
              >
                <RefreshCw className="w-4 h-4" />
                <span>Thử kết nối lại</span>
              </button>
            )}

            {onOpenSettings && (
              <button
                type="button"
                onClick={onOpenSettings}
                className="inline-flex items-center gap-2 px-5 py-2.5 bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-medium rounded-lg text-base transition-colors min-h-[44px] cursor-pointer"
              >
                <ExternalLink className="w-4 h-4 text-blue-700" />
                <span>Cài đặt kết nối Google Sheets</span>
              </button>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};
