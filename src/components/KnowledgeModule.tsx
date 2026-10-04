import React, { useState } from 'react';
import { 
  Sparkles, 
  BookOpen, 
  Calendar, 
  User, 
  ArrowLeft, 
  PlusCircle, 
  Save, 
  CheckCircle2, 
  AlertTriangle,
  FolderOpen,
  ArrowRight,
  Film,
  Play,
  ExternalLink
} from 'lucide-react';
import { BaiVietCaiVan } from '../types';

interface KnowledgeModuleProps {
  baiVietList: BaiVietCaiVan[];
  onAddBaiViet: (post: { TieuDe: string; ChuyenMuc: string; NoiDung: string }) => Promise<{ success: boolean; message: string }>;
  isConnectedGas: boolean;
  onNavigateToTab?: (tab: any, videoId?: string) => void;
}

export const KnowledgeModule: React.FC<KnowledgeModuleProps> = ({
  baiVietList,
  onAddBaiViet,
  isConnectedGas,
  onNavigateToTab,
}) => {
  const [selectedArticle, setSelectedArticle] = useState<BaiVietCaiVan | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [showAddForm, setShowAddForm] = useState(false);

  // Form State
  const [tieuDe, setTieuDe] = useState('');
  const [chuyenMuc, setChuyenMuc] = useState('Kiến Thức');
  const [noiDung, setNoiDung] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitMessage, setSubmitMessage] = useState<{ type: 'success' | 'error'; text: string } | null>(null);

  // Danh mục bài viết
  const categories = ['All', 'Kiến Thức Căn Bản', 'Nghệ Thuật Cải Vận', 'Ứng Dụng Chuyên Sâu', 'Kiến Thức', 'Cải Vận'];

  const filteredArticles = baiVietList.filter((item) => {
    if (selectedCategory === 'All') return true;
    return item.ChuyenMuc.toLowerCase().includes(selectedCategory.toLowerCase()) || selectedCategory.toLowerCase().includes(item.ChuyenMuc.toLowerCase());
  });

  const handleSubmitNewArticle = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!tieuDe.trim() || !noiDung.trim()) return;

    setIsSubmitting(true);
    setSubmitMessage(null);

    const res = await onAddBaiViet({
      TieuDe: tieuDe.trim(),
      ChuyenMuc: chuyenMuc,
      NoiDung: noiDung.trim(),
    });

    setIsSubmitting(false);
    if (res.success) {
      setSubmitMessage({ type: 'success', text: res.message });
      setTieuDe('');
      setNoiDung('');
      setTimeout(() => {
        setShowAddForm(false);
        setSubmitMessage(null);
      }, 2000);
    } else {
      setSubmitMessage({ type: 'error', text: res.message });
    }
  };

  // NẾU ĐANG XEM CHI TIẾT BÀI VIẾT
  if (selectedArticle) {
    return (
      <div className="space-y-6 pb-12 max-w-4xl mx-auto">
        <button
          type="button"
          onClick={() => setSelectedArticle(null)}
          className="inline-flex items-center gap-2 px-5 py-3 rounded-xl bg-white border border-slate-300 hover:bg-slate-50 text-slate-800 font-bold text-base transition-colors min-h-[48px] shadow-xs cursor-pointer"
        >
          <ArrowLeft className="w-5 h-5 text-blue-700" />
          <span>Quay lại danh sách bài viết</span>
        </button>

        <article className="bg-white rounded-3xl p-6 sm:p-10 border border-slate-200 shadow-sm">
          <div className="flex flex-wrap items-center gap-3 text-sm text-slate-500 mb-4 pb-4 border-b border-slate-100">
            <span className="font-bold text-blue-700 bg-blue-50 px-3 py-1 rounded-full">
              {selectedArticle.ChuyenMuc}
            </span>
            <span className="flex items-center gap-1.5">
              <Calendar className="w-4 h-4 text-slate-400" />
              <span>{selectedArticle.NgayDang || '2026'}</span>
            </span>
            {selectedArticle.TacGia && (
              <span className="flex items-center gap-1.5">
                <User className="w-4 h-4 text-slate-400" />
                <span>{selectedArticle.TacGia}</span>
              </span>
            )}
          </div>

          <h2 className="text-2xl sm:text-3xl lg:text-4xl font-extrabold text-slate-900 leading-tight mb-6">
            {selectedArticle.TieuDe}
          </h2>

          {/* Banner Video nếu là bài giảng Video */}
          {(selectedArticle.ChuyenMuc === 'Video Bài Giảng' || selectedArticle.TieuDe.includes('Video') || selectedArticle.TieuDe.includes('Podcast')) && (
            <div className="mb-8 p-5 sm:p-6 rounded-2xl bg-gradient-to-r from-amber-500/15 via-rose-500/10 to-slate-900 text-slate-900 border-2 border-amber-400/80 shadow-md">
              <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                <div>
                  <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-amber-600 text-white text-xs font-bold mb-2">
                    <Film className="w-3.5 h-3.5" />
                    <span>Bài Giảng Có Video / Podcast Trình Chiếu</span>
                  </div>
                  <h4 className="text-lg sm:text-xl font-bold font-serif text-slate-900">
                    Trải Nghiệm Xem Trực Quan &amp; Nghe Giọng Thuyết Minh
                  </h4>
                  <p className="text-sm text-slate-700 mt-1 max-w-xl">
                    Đoạn video này (kèm file <code>postcat.mp4</code>) đã được số hóa từng phân cảnh thời gian, thẻ hình ảnh minh họa, bảng 4 trụ cột và giọng đọc thuyết minh.
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    if (onNavigateToTab) {
                      const vidId = selectedArticle.TieuDe.includes('Video 4') ? 'video-4' :
                                    selectedArticle.TieuDe.includes('Video 1') ? 'video-1' :
                                    selectedArticle.TieuDe.includes('Video 2') ? 'video-2' :
                                    selectedArticle.TieuDe.includes('Video 3') ? 'video-3' : 'video-4';
                      onNavigateToTab('videos', vidId);
                    }
                  }}
                  className="px-5 py-3 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-sm sm:text-base transition-all flex items-center gap-2 shrink-0 shadow-sm cursor-pointer self-start sm:self-auto"
                >
                  <Play className="w-4 h-4 fill-current" />
                  <span>Mở Trình Chiếu Video Này</span>
                  <ArrowRight className="w-4 h-4" />
                </button>
              </div>
            </div>
          )}

          <div className="prose prose-blue max-w-none text-base sm:text-lg text-slate-700 leading-relaxed font-medium space-y-4 whitespace-pre-line">
            {selectedArticle.NoiDung}
          </div>
        </article>
      </div>
    );
  }

  return (
    <div className="space-y-6 pb-12">
      {/* Tiêu đề & Nút Thêm Bài Mới */}
      <div className="bg-white rounded-2xl p-6 sm:p-8 border border-slate-200 shadow-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        <div>
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-blue-100 text-blue-900 text-sm font-bold mb-3">
            <BookOpen className="w-4 h-4 text-blue-700" />
            <span>Kho Tàng Tri Thức Cải Vận</span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-extrabold text-slate-900 tracking-tight mb-2">
            Cẩm Nang &amp; Góc Chia Sẻ Cải Vận
          </h2>
          <p className="text-base sm:text-lg text-slate-600 leading-relaxed">
            Các bài viết đúc kết từ cổ thư Dịch học và thực tế nghiên cứu Bát Cực Linh Số. Lưu trữ tại Sheet: <strong>BaiVietCaiVan</strong>.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddForm(!showAddForm)}
          className="inline-flex items-center gap-2 px-5 py-3.5 bg-blue-700 hover:bg-blue-800 text-white font-bold text-base rounded-xl transition-all shadow-sm shrink-0 min-h-[48px] cursor-pointer"
        >
          <PlusCircle className="w-5 h-5" />
          <span>{showAddForm ? 'Đóng Form' : 'Đăng Bài Viết Mới'}</span>
        </button>
      </div>

      {/* FORM THÊM BÀI VIẾT MỚI VÀO GOOGLE SHEETS */}
      {showAddForm && (
        <form onSubmit={handleSubmitNewArticle} className="bg-blue-50/70 border-2 border-blue-200 rounded-3xl p-6 sm:p-8 space-y-4 shadow-sm">
          <h3 className="text-xl font-bold text-blue-950 flex items-center gap-2">
            <PlusCircle className="w-5 h-5 text-blue-700" />
            <span>Thêm Bài Viết Mới Vào Google Sheets (Sheet "BaiVietCaiVan")</span>
          </h3>

          <div>
            <label className="block text-base font-bold text-slate-800 mb-1">
              Tiêu đề bài viết:
            </label>
            <input
              type="text"
              value={tieuDe}
              onChange={(e) => setTieuDe(e.target.value)}
              placeholder="Nhập tiêu đề bài viết cẩm nang..."
              required
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-base font-medium focus:border-blue-600 outline-none min-h-[48px]"
            />
          </div>

          <div>
            <label className="block text-base font-bold text-slate-800 mb-1">
              Chuyên mục:
            </label>
            <select
              value={chuyenMuc}
              onChange={(e) => setChuyenMuc(e.target.value)}
              className="w-full bg-white border border-slate-300 rounded-xl px-4 py-3 text-base font-medium focus:border-blue-600 outline-none min-h-[48px]"
            >
              <option value="Kiến Thức Căn Bản">Kiến Thức Căn Bản</option>
              <option value="Nghệ Thuật Cải Vận">Nghệ Thuật Cải Vận</option>
              <option value="Ứng Dụng Chuyên Sâu">Ứng Dụng Chuyên Sâu</option>
              <option value="Kinh Nghiệm Phối Số">Kinh Nghiệm Phối Số</option>
            </select>
          </div>

          <div>
            <label className="block text-base font-bold text-slate-800 mb-1">
              Nội dung bài viết:
            </label>
            <textarea
              value={noiDung}
              onChange={(e) => setNoiDung(e.target.value)}
              rows={6}
              placeholder="Nhập nội dung chia sẻ kiến thức phong thủy năng lượng số..."
              required
              className="w-full bg-white border border-slate-300 rounded-xl p-4 text-base font-medium focus:border-blue-600 outline-none"
            />
          </div>

          {submitMessage && (
            <div className={`p-4 rounded-xl text-base font-bold flex items-center gap-2 ${
              submitMessage.type === 'success' ? 'bg-emerald-100 text-emerald-900 border border-emerald-300' : 'bg-rose-100 text-rose-900 border border-rose-300'
            }`}>
              {submitMessage.type === 'success' ? <CheckCircle2 className="w-5 h-5" /> : <AlertTriangle className="w-5 h-5" />}
              <span>{submitMessage.text}</span>
            </div>
          )}

          <div className="flex justify-end gap-3 pt-2">
            <button
              type="button"
              onClick={() => setShowAddForm(false)}
              className="px-5 py-3 rounded-xl bg-slate-200 hover:bg-slate-300 text-slate-800 font-bold text-base min-h-[48px]"
            >
              Hủy
            </button>
            <button
              type="submit"
              disabled={isSubmitting}
              className="px-6 py-3 rounded-xl bg-blue-700 hover:bg-blue-800 text-white font-bold text-base min-h-[48px] shadow-sm flex items-center gap-2 cursor-pointer disabled:opacity-50"
            >
              <Save className="w-5 h-5" />
              <span>{isSubmitting ? 'Đang gửi lên Google Sheets...' : 'Lưu & Đăng Bài Viết'}</span>
            </button>
          </div>
        </form>
      )}

      {/* DANH SÁCH BÀI VIẾT */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredArticles.map((article) => (
          <article
            key={article.ID}
            onClick={() => setSelectedArticle(article)}
            className="bg-white rounded-2xl p-6 border border-slate-200 hover:border-blue-400 hover:shadow-md transition-all cursor-pointer flex flex-col justify-between"
          >
            <div>
              <div className="flex items-center justify-between text-xs font-semibold text-slate-500 mb-3">
                <span className="text-blue-700 bg-blue-50 px-2.5 py-1 rounded-md font-bold">
                  {article.ChuyenMuc}
                </span>
                <span>{article.NgayDang || '2026'}</span>
              </div>

              <h3 className="text-xl font-bold text-slate-900 mb-3 line-clamp-2 leading-snug hover:text-blue-700 transition-colors">
                {article.TieuDe}
              </h3>

              <p className="text-sm sm:text-base text-slate-600 line-clamp-4 leading-relaxed mb-4">
                {article.NoiDung}
              </p>
            </div>

            <div className="pt-4 border-t border-slate-100 flex items-center justify-between">
              <span className="text-sm font-bold text-blue-700 inline-flex items-center gap-1">
                Đọc toàn bộ bài <ArrowRight className="w-4 h-4" />
              </span>
              <span className="text-xs text-slate-400">Sheet: BaiVietCaiVan</span>
            </div>
          </article>
        ))}
      </div>
    </div>
  );
};
