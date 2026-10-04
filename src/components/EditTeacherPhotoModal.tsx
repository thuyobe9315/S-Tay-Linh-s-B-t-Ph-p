import React, { useState, useRef } from 'react';
import { useTeacherImage } from '../context/TeacherImageContext';
import { 
  Upload, 
  Link as LinkIcon, 
  RotateCcw, 
  Check, 
  X, 
  Image as ImageIcon, 
  Sparkles,
  Camera,
  AlertCircle
} from 'lucide-react';

export const EditTeacherPhotoModal: React.FC = () => {
  const { 
    customImageUrl, 
    imageFit, 
    setCustomImage, 
    resetCustomImage, 
    isEditModalOpen, 
    closeEditModal 
  } = useTeacherImage();

  const [inputUrl, setInputUrl] = useState('');
  const [previewUrl, setPreviewUrl] = useState<string | null>(customImageUrl);
  const [selectedFit, setSelectedFit] = useState<'cover' | 'contain'>(imageFit);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isDragging, setIsDragging] = useState(false);
  const fileInputRef = useRef<HTMLInputElement>(null);

  if (!isEditModalOpen) return null;

  const handleFileUpload = (file: File) => {
    setErrorMessage(null);
    if (!file.type.startsWith('image/')) {
      setErrorMessage('Vui lòng chọn một tệp hình ảnh hợp lệ (JPG, PNG, WebP...).');
      return;
    }

    // Limit to ~8MB to ensure smooth localStorage
    if (file.size > 8 * 1024 * 1024) {
      setErrorMessage('Kích thước ảnh quá lớn. Vui lòng chọn ảnh dưới 8MB.');
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      const result = e.target?.result as string;
      if (result) {
        setPreviewUrl(result);
      }
    };
    reader.onerror = () => {
      setErrorMessage('Không thể đọc tệp ảnh. Vui lòng thử lại.');
    };
    reader.readAsDataURL(file);
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    const file = e.dataTransfer.files?.[0];
    if (file) {
      handleFileUpload(file);
    }
  };

  const handleApplyUrl = () => {
    if (!inputUrl.trim()) return;
    setPreviewUrl(inputUrl.trim());
    setErrorMessage(null);
  };

  const handleSave = () => {
    if (previewUrl) {
      setCustomImage(previewUrl, selectedFit);
    } else {
      resetCustomImage();
    }
    closeEditModal();
  };

  const handleResetToDefault = () => {
    resetCustomImage();
    setPreviewUrl(null);
    setInputUrl('');
    closeEditModal();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-950/80 backdrop-blur-xs">
      <div 
        className="w-full max-w-2xl bg-white rounded-3xl shadow-2xl border-2 border-amber-300 overflow-hidden flex flex-col max-h-[92vh] animate-in fade-in zoom-in-95 duration-200"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Header */}
        <div className="bg-gradient-to-r from-amber-900 via-amber-800 to-amber-950 px-6 py-4.5 flex items-center justify-between text-white border-b border-amber-700/50 shrink-0">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 rounded-xl bg-amber-600/40 border border-amber-400/50 flex items-center justify-center text-amber-200 shadow-xs">
              <Camera className="w-5 h-5" />
            </div>
            <div>
              <h3 className="text-lg font-black font-serif text-white tracking-wide">
                Sửa Ảnh Giáo Viên
              </h3>
              <p className="text-xs text-amber-200/90 font-medium">
                Tự tải ảnh từ máy tính / điện thoại hoặc dán link ảnh trực tuyến
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={closeEditModal}
            className="p-2 rounded-xl text-amber-200 hover:text-white hover:bg-white/10 transition-colors"
            title="Đóng"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Content Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1">
          {errorMessage && (
            <div className="p-3.5 rounded-xl bg-red-50 border border-red-200 text-red-700 text-xs sm:text-sm flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0 text-red-500" />
              <span>{errorMessage}</span>
            </div>
          )}

          {/* Area 1: Upload or URL Input */}
          <div className="space-y-4">
            <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
              Cách 1: Tải ảnh từ thiết bị của bạn
            </label>

            {/* Drag & Drop File Zone */}
            <div
              onDragOver={(e) => { e.preventDefault(); setIsDragging(true); }}
              onDragLeave={() => setIsDragging(false)}
              onDrop={handleDrop}
              onClick={() => fileInputRef.current?.click()}
              className={`border-2 border-dashed rounded-2xl p-6 text-center cursor-pointer transition-all ${
                isDragging
                  ? 'border-amber-500 bg-amber-50/70 scale-[0.99]'
                  : 'border-slate-300 hover:border-amber-400 hover:bg-slate-50'
              }`}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileChange}
                className="hidden"
              />
              <div className="w-12 h-12 mx-auto rounded-full bg-amber-100 text-amber-700 flex items-center justify-center mb-3">
                <Upload className="w-6 h-6" />
              </div>
              <p className="text-sm font-bold text-slate-800">
                Nhấn để chọn ảnh từ máy hoặc kéo thả ảnh vào đây
              </p>
              <p className="text-xs text-slate-500 mt-1">
                Hỗ trợ định dạng JPG, PNG, WEBP, GIF (Khuyến nghị ảnh tỷ lệ 3:4 hoặc 4:5)
              </p>
            </div>

            {/* URL Input */}
            <div className="pt-2">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700 mb-2">
                Cách 2: Hoặc dán đường dẫn ảnh (URL)
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
                  <input
                    type="url"
                    value={inputUrl}
                    onChange={(e) => setInputUrl(e.target.value)}
                    placeholder="https://example.com/anh-giao-vien.jpg"
                    className="w-full pl-9 pr-3 py-2.5 rounded-xl border border-slate-300 text-sm focus:outline-none focus:border-amber-500 focus:ring-2 focus:ring-amber-200"
                  />
                  <LinkIcon className="w-4 h-4 text-slate-400 absolute left-3 top-3" />
                </div>
                <button
                  type="button"
                  onClick={handleApplyUrl}
                  className="px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider transition-colors shrink-0"
                >
                  Xem Thử
                </button>
              </div>
            </div>
          </div>

          {/* Area 2: Preview & Fit Mode */}
          <div className="pt-2 border-t border-slate-200">
            <div className="flex items-center justify-between mb-3">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-700">
                Xem trước ảnh hiển thị
              </label>

              {/* Fit Mode Switcher */}
              <div className="flex items-center gap-1 bg-slate-100 p-1 rounded-xl border border-slate-200 text-xs">
                <button
                  type="button"
                  onClick={() => setSelectedFit('cover')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedFit === 'cover'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Cắt đầy khung (Cover)
                </button>
                <button
                  type="button"
                  onClick={() => setSelectedFit('contain')}
                  className={`px-3 py-1 rounded-lg font-bold transition-all ${
                    selectedFit === 'contain'
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'text-slate-600 hover:text-slate-900'
                  }`}
                >
                  Vừa vặn (Contain)
                </button>
              </div>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 items-center">
              {/* Box Xem trước ảnh lớn */}
              <div className="h-64 rounded-2xl bg-stone-900 border-2 border-amber-400/60 overflow-hidden relative flex items-center justify-center p-2 shadow-inner">
                {previewUrl ? (
                  <img
                    src={previewUrl}
                    alt="Xem trước ảnh giáo viên"
                    className={`w-full h-full rounded-xl transition-all ${
                      selectedFit === 'cover' ? 'object-cover' : 'object-contain'
                    }`}
                  />
                ) : (
                  <div className="text-center p-4 text-slate-400">
                    <ImageIcon className="w-12 h-12 mx-auto mb-2 opacity-50" />
                    <p className="text-xs">Đang dùng tranh minh họa nguyên bản</p>
                  </div>
                )}
                <span className="absolute bottom-3 left-3 px-2 py-0.5 rounded bg-black/60 text-amber-200 text-[10px] font-mono border border-amber-500/30">
                  Xem trước: Khung Chân Dung Lớn
                </span>
              </div>

              {/* Box Xem trước Avatar tròn nhỏ */}
              <div className="flex flex-col items-center justify-center p-4 rounded-2xl bg-amber-50/50 border border-amber-200">
                <div className="w-24 h-24 rounded-full overflow-hidden ring-4 ring-amber-400 shadow-md bg-stone-900 mb-3 flex items-center justify-center">
                  {previewUrl ? (
                    <img
                      src={previewUrl}
                      alt="Xem trước avatar"
                      className={`w-full h-full ${
                        selectedFit === 'cover' ? 'object-cover' : 'object-contain'
                      }`}
                    />
                  ) : (
                    <Sparkles className="w-8 h-8 text-amber-400" />
                  )}
                </div>
                <span className="text-xs font-bold text-slate-700">Xem trước: Ảnh Đại Diện Nhỏ</span>
                <p className="text-[11px] text-slate-500 text-center mt-1">
                  Sẽ xuất hiện ở banner bài giảng và thanh tiêu đề
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="bg-slate-50 px-6 py-4 border-t border-slate-200 flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0">
          <button
            type="button"
            onClick={handleResetToDefault}
            className="w-full sm:w-auto px-4 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors flex items-center justify-center gap-1.5 cursor-pointer"
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>Khôi Phục Tranh Gốc</span>
          </button>

          <div className="flex items-center gap-2 w-full sm:w-auto">
            <button
              type="button"
              onClick={closeEditModal}
              className="flex-1 sm:flex-initial px-5 py-2.5 rounded-xl border border-slate-300 hover:bg-slate-100 text-slate-700 font-bold text-xs uppercase tracking-wider transition-colors cursor-pointer"
            >
              Hủy
            </button>
            <button
              type="button"
              onClick={handleSave}
              className="flex-1 sm:flex-initial px-6 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-all flex items-center justify-center gap-1.5 shadow-sm cursor-pointer"
            >
              <Check className="w-4 h-4" />
              <span>Lưu Ảnh Này</span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
