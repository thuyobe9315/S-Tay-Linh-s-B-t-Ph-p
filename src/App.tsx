import React, { useState, useEffect, useCallback } from 'react';
import { 
  fetchAllSheetData, 
  getSavedGasUrl, 
  saveTraCuuRecordToGas, 
  addBaiVietToGas 
} from './services/gasApi';
import { SheetFullData, TuTruong, TraCuuRecord } from './types';
import { INITIAL_DATA } from './data/defaultData';
import { Header } from './components/Header';
import { Navigation, NavTab } from './components/Navigation';
import { HomeDashboard } from './components/HomeDashboard';
import { DictionaryModule } from './components/DictionaryModule';
import { TransformationModule } from './components/TransformationModule';
import { NumberLookupModule } from './components/NumberLookupModule';
import { KnowledgeModule } from './components/KnowledgeModule';
import { VideoLessonsModule } from './components/VideoLessonsModule';
import { LectureSlidesModule } from './components/LectureSlidesModule';
import { EditTeacherPhotoModal } from './components/EditTeacherPhotoModal';
import { TeacherImageProvider } from './context/TeacherImageContext';
import { TestCasesModal } from './components/TestCasesModal';
import { LoadingSpinner } from './components/LoadingSpinner';
import { ErrorMessage } from './components/ErrorMessage';
import { HuyenDaoBrandLogo } from './components/HuyenDaoBrandLogo';
import { Sparkles, CheckCircle2 } from 'lucide-react';

export default function App() {
  const [activeTab, setActiveTab] = useState<NavTab>('dashboard');
  const [data, setData] = useState<SheetFullData>(INITIAL_DATA);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [quickSearch, setQuickSearch] = useState<string>('');
  const [selectedTuTruong, setSelectedTuTruong] = useState<TuTruong | null>(null);
  const [targetPhoneForLookup, setTargetPhoneForLookup] = useState<string>('');
  const [gasUrl, setGasUrl] = useState<string>('');
  const [isConnectedGas, setIsConnectedGas] = useState<boolean>(false);
  const [lastSyncTime, setLastSyncTime] = useState<string | null>(null);
  const [selectedVideoId, setSelectedVideoId] = useState<string | undefined>('video-4');

  // Tải dữ liệu ban đầu
  const loadData = useCallback(async (customUrl?: string) => {
    setIsLoading(true);
    setErrorMessage(null);

    const activeUrl = customUrl !== undefined ? customUrl : getSavedGasUrl();
    setGasUrl(activeUrl);

    try {
      const result = await fetchAllSheetData(activeUrl);
      setData(result.data);
      setIsConnectedGas(result.source === 'google-sheets');
      setLastSyncTime(new Date().toLocaleTimeString('vi-VN'));

      if (result.source === 'local-cache' && activeUrl) {
        setErrorMessage(result.message);
      }
    } catch (err: unknown) {
      const e = err as Error;
      setErrorMessage(`Không thể kết nối đến Google Sheets: ${e.message}`);
      setIsConnectedGas(false);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData();
  }, [loadData]);

  // Chuyển nhanh sang từ điển khi tra cứu
  const handleNavigateToDictionary = () => {
    setActiveTab('dictionary');
  };

  // Tra nhanh số điện thoại từ trang chủ
  const handleQuickLookupPhone = (phone: string) => {
    setTargetPhoneForLookup(phone);
    setActiveTab('lookup');
  };

  // Lưu bản ghi tra cứu vào Google Sheets
  const handleSaveTraCuu = async (record: TraCuuRecord) => {
    const res = await saveTraCuuRecordToGas(record, gasUrl);
    if (res.success) {
      // Cập nhật state nội bộ
      setData((prev) => ({
        ...prev,
        TraCuuSo: [record, ...prev.TraCuuSo.filter((r) => r.SoDienThoaiHoacDaySo !== record.SoDienThoaiHoacDaySo)],
      }));
    }
    return res;
  };

  // Thêm bài viết mới vào Google Sheets
  const handleAddBaiViet = async (post: { TieuDe: string; ChuyenMuc: string; NoiDung: string }) => {
    const res = await addBaiVietToGas(post, gasUrl);
    if (res.success) {
      // Cập nhật state
      const newPost = {
        ID: Date.now(),
        TieuDe: post.TieuDe,
        ChuyenMuc: post.ChuyenMuc,
        NoiDung: post.NoiDung,
        NgayDang: new Date().toISOString().split('T')[0],
      };
      setData((prev) => ({
        ...prev,
        BaiVietCaiVan: [newPost, ...prev.BaiVietCaiVan],
      }));
    }
    return res;
  };

  return (
    <TeacherImageProvider>
      <div className="min-h-screen flex flex-col bg-transparent text-slate-800">
      {/* Header */}
      <Header
        quickSearch={quickSearch}
        onQuickSearchChange={(val) => {
          setQuickSearch(val);
          if (val.trim() && activeTab !== 'dictionary') {
            setActiveTab('dictionary');
          }
        }}
        onNavigateToDictionary={handleNavigateToDictionary}
      />

      {/* Navigation Bar */}
      <Navigation
        activeTab={activeTab}
        onTabChange={setActiveTab}
        savedLookupCount={data.TraCuuSo.length}
        articleCount={data.BaiVietCaiVan.length}
      />

      {/* Main Content */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6">
        
        {/* Thông báo lỗi nếu có */}
        {errorMessage && (
          <ErrorMessage
            message={errorMessage}
            onRetry={() => loadData(gasUrl)}
          />
        )}

        {/* Trạng thái Loading */}
        {isLoading ? (
          <div className="bg-white rounded-3xl p-12 border border-slate-200 shadow-xs my-8">
            <LoadingSpinner message="Đang kết nối và đồng bộ dữ liệu Bát Cực Linh Số..." size="lg" />
          </div>
        ) : (
          <>
            {/* MODULE 1: TRANG CHỦ / DASHBOARD */}
            {activeTab === 'dashboard' && (
              <HomeDashboard
                tuTruongList={data.TuTruong}
                chuyenHoaList={data.ChuyenHoa}
                onNavigate={setActiveTab}
                onSelectTuTruong={(item) => {
                  setSelectedTuTruong(item);
                  setActiveTab('dictionary');
                }}
                onQuickLookupPhone={handleQuickLookupPhone}
                isConnectedGas={isConnectedGas}
              />
            )}

            {/* MODULE BÀI GIẢNG 14 SLIDE & CHÂN DUNG CÔ GIÁO */}
            {activeTab === 'lectures' && (
              <LectureSlidesModule onNavigateToTab={setActiveTab} />
            )}

            {/* MODULE VIDEO: 4 VIDEO BÀI GIẢNG THỰC CHIẾN & PODCAST 10:48 */}
            {activeTab === 'videos' && (
              <VideoLessonsModule
                onQuickLookup={handleQuickLookupPhone}
                onNavigateToTab={setActiveTab}
                initialVideoId={selectedVideoId}
              />
            )}

            {/* MODULE 2: TỪ ĐIỂN TỪ TRƯỜNG */}
            {activeTab === 'dictionary' && (
              <DictionaryModule
                tuTruongList={data.TuTruong}
                searchQuery={quickSearch}
                onSearchQueryChange={setQuickSearch}
                selectedTuTruong={selectedTuTruong}
                onSelectTuTruong={setSelectedTuTruong}
                onNavigateToTab={(tab, videoId) => {
                  setActiveTab(tab);
                  if (videoId) setSelectedVideoId(videoId);
                }}
              />
            )}

            {/* MODULE 3: SỰ CHUYỂN HÓA CẢI VẬN */}
            {activeTab === 'transformation' && (
              <TransformationModule chuyenHoaList={data.ChuyenHoa} />
            )}

            {/* MODULE 4: TRA CỨU DÃY SỐ */}
            {activeTab === 'lookup' && (
              <NumberLookupModule
                initialPhoneNumber={targetPhoneForLookup}
                savedLookups={data.TraCuuSo}
                onSaveToGas={handleSaveTraCuu}
                isConnectedGas={isConnectedGas}
              />
            )}

            {/* MODULE 5: CẨM NANG KIẾN THỨC CẢI VẬN */}
            {activeTab === 'knowledge' && (
              <KnowledgeModule
                baiVietList={data.BaiVietCaiVan}
                onAddBaiViet={handleAddBaiViet}
                isConnectedGas={isConnectedGas}
                onNavigateToTab={(tab, videoId) => {
                  setActiveTab(tab);
                  if (videoId) setSelectedVideoId(videoId);
                }}
              />
            )}

            {/* MODULE 7: KIỂM THỬ HỆ THỐNG (8 TEST CASES) */}
            {activeTab === 'testcases' && (
              <TestCasesModal
                tuTruongList={data.TuTruong}
                isConnectedGas={isConnectedGas}
                onNavigateToTab={setActiveTab}
                onSetQuickSearch={(q) => {
                  setQuickSearch(q);
                  setActiveTab('dictionary');
                }}
              />
            )}
          </>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-slate-900 text-slate-400 border-t border-amber-900/40 py-8 px-4 sm:px-6 lg:px-8 mt-auto">
        <div className="max-w-7xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-center sm:text-left">
          <div className="flex items-center gap-3">
            <HuyenDaoBrandLogo size={36} className="w-9 h-9 rounded-xl ring-1 ring-amber-400/40 shadow-sm shrink-0" />
            <div>
              <div className="flex items-center justify-center sm:justify-start gap-2 text-white font-bold text-base mb-0.5">
                <span className="font-serif">Huyền Đạo Đỗ Gia <strong className="text-amber-400 font-sans">4311</strong></span>
              </div>
              <p className="text-xs sm:text-sm text-slate-400">
                Thuận Đạo – Thuận Khí – Thuận Đời • Hotline: <a href="tel:0768431286" className="text-amber-300 font-bold underline">0768431286</a>
              </p>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs sm:text-sm">
            <button
              type="button"
              onClick={() => setActiveTab('dashboard')}
              className="hover:text-amber-300 transition-colors"
            >
              Trang Chủ
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('lectures')}
              className="hover:text-amber-300 transition-colors font-bold text-amber-200"
            >
              Bài Giảng &amp; Giáo Viên
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('videos')}
              className="hover:text-amber-300 transition-colors"
            >
              Video Bài Giảng
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('dictionary')}
              className="hover:text-amber-300 transition-colors"
            >
              Từ Điển 8 Từ Trường
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('transformation')}
              className="hover:text-amber-300 transition-colors"
            >
              Sự Chuyển Hóa
            </button>
            <span>•</span>
            <button
              type="button"
              onClick={() => setActiveTab('lookup')}
              className="hover:text-amber-300 transition-colors"
            >
              Tra Cứu Dãy Số
            </button>
            <span>•</span>
            <a
              href="https://notebook.google.com/notebook/b1948e36-4c69-46f3-98ae-f9d50a97865f"
              target="_blank"
              rel="noopener noreferrer"
              className="text-amber-300 font-bold hover:text-white transition-colors inline-flex items-center gap-1"
            >
              <span>BÀI KIỂM TRA</span>
              <span className="text-[10px] px-1 py-0.2 rounded bg-red-600 text-white font-mono">NEW</span>
            </a>
          </div>
        </div>
      </footer>

      {/* Modal chỉnh sửa ảnh giáo viên */}
      <EditTeacherPhotoModal />
    </div>
  </TeacherImageProvider>
);
}
