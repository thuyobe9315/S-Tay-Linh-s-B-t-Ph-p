import React, { useState, useEffect, useRef } from 'react';
import { 
  PhoneCall, 
  Sparkles, 
  ExternalLink, 
  Search, 
  Camera, 
  UploadCloud, 
  RotateCcw, 
  CheckCircle2, 
  Image as ImageIcon, 
  Link2, 
  X, 
  HelpCircle, 
  FolderOpen,
  Maximize2,
  AlertCircle
} from 'lucide-react';

interface HuyenDaoMasterPosterProps {
  onQuickLookup?: (phone: string) => void;
  onNavigateToTab?: (tab: any) => void;
}

export const HuyenDaoMasterPoster: React.FC<HuyenDaoMasterPosterProps> = ({
  onQuickLookup,
  onNavigateToTab,
}) => {
  const [phoneNumber, setPhoneNumber] = useState('');
  const [customCover, setCustomCover] = useState<string | null>(null);
  const [coverFit, setCoverFit] = useState<'contain' | 'cover'>('contain');
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [imageUrlInput, setImageUrlInput] = useState('');
  const [uploadError, setUploadError] = useState('');
  const [uploadSuccess, setUploadSuccess] = useState('');
  const fileInputRef = useRef<HTMLInputElement>(null);

  // Khởi tạo: đọc ảnh đã lưu trong localStorage hoặc file cover.jpg trong thư mục public
  useEffect(() => {
    try {
      const savedCover = localStorage.getItem('huyen_dao_custom_cover');
      const savedFit = localStorage.getItem('huyen_dao_cover_fit') as 'contain' | 'cover';
      if (savedFit) {
        setCoverFit(savedFit);
      }
      if (savedCover) {
        setCustomCover(savedCover);
      } else {
        // Kiểm tra xem có file /cover.jpg hoặc /cover.png trong public không
        const testImg = new Image();
        testImg.onload = () => {
          setCustomCover('/cover.jpg');
        };
        testImg.src = '/cover.jpg';
      }
    } catch {
      // LocalStorage fallback
    }
  }, []);

  const handleLookupSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (phoneNumber.trim() && onQuickLookup) {
      onQuickLookup(phoneNumber.trim());
      if (onNavigateToTab) onNavigateToTab('lookup');
    }
  };

  // Xử lý nén nhẹ và lưu ảnh tùy chỉnh từ file máy tính / điện thoại
  const handleFileUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      setUploadError('Vui lòng chọn tệp hình ảnh (.jpg, .jpeg, .png, .webp)');
      return;
    }

    setUploadError('');
    const reader = new FileReader();
    reader.onload = (event) => {
      const rawData = event.target?.result as string;
      const img = new Image();
      img.onload = () => {
        // Nén ảnh nếu kích thước quá lớn để vừa vặn bộ nhớ trình duyệt
        const maxDim = 2400;
        let width = img.width;
        let height = img.height;

        if (width > maxDim || height > maxDim) {
          if (width > height) {
            height = Math.round((height * maxDim) / width);
            width = maxDim;
          } else {
            width = Math.round((width * maxDim) / height);
            height = maxDim;
          }
        }

        const canvas = document.createElement('canvas');
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext('2d');
        if (ctx) {
          ctx.drawImage(img, 0, 0, width, height);
          const finalData = canvas.toDataURL(file.type === 'image/png' ? 'image/png' : 'image/jpeg', 0.95);
          setCustomCover(finalData);
          try {
            localStorage.setItem('huyen_dao_custom_cover', finalData);
          } catch {
            console.warn('LocalStorage đầy, giữ ảnh trong phiên làm việc');
          }
        } else {
          setCustomCover(rawData);
          try {
            localStorage.setItem('huyen_dao_custom_cover', rawData);
          } catch {
            console.warn('LocalStorage đầy');
          }
        }
        setUploadSuccess('Đã cập nhật ảnh bìa của bạn thành công!');
        setTimeout(() => {
          setUploadSuccess('');
          setIsModalOpen(false);
        }, 1200);
      };
      img.src = rawData;
    };
    reader.readAsDataURL(file);
  };

  // Xử lý nạp ảnh từ đường link URL
  const handleApplyUrl = (e: React.FormEvent) => {
    e.preventDefault();
    if (!imageUrlInput.trim()) return;

    const url = imageUrlInput.trim();
    const testImg = new Image();
    testImg.onload = () => {
      setCustomCover(url);
      try {
        localStorage.setItem('huyen_dao_custom_cover', url);
      } catch {}
      setUploadSuccess('Đã tải và áp dụng ảnh bìa từ link thành công!');
      setImageUrlInput('');
      setUploadError('');
      setTimeout(() => {
        setUploadSuccess('');
        setIsModalOpen(false);
      }, 1200);
    };
    testImg.onerror = () => {
      setUploadError('Không thể tải ảnh từ đường dẫn này. Vui lòng kiểm tra lại link ảnh hoặc tải ảnh trực tiếp từ máy.');
    };
    testImg.src = url;
  };

  // Khôi phục về ảnh bìa ban đầu
  const handleResetCover = () => {
    setCustomCover(null);
    try {
      localStorage.removeItem('huyen_dao_custom_cover');
    } catch {}
    setUploadSuccess('Đã khôi phục ảnh bìa mặc định.');
    setTimeout(() => setUploadSuccess(''), 1500);
  };

  // Thay đổi cách căn chỉnh ảnh
  const toggleCoverFit = (fit: 'contain' | 'cover') => {
    setCoverFit(fit);
    try {
      localStorage.setItem('huyen_dao_cover_fit', fit);
    } catch {}
  };

  return (
    <div className="w-full space-y-3">
      {/* THANH ĐIỀU KHIỂN & NÚT THAY HÌNH NỀN BÌA DÀNH CHO BẠN */}
      <div className="flex flex-wrap items-center justify-between gap-3 px-2 py-1">
        <div className="flex items-center gap-2">
          {customCover ? (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-semibold bg-emerald-950/90 text-emerald-300 border border-emerald-500/50 shadow-sm">
              <CheckCircle2 className="w-3.5 h-3.5 text-emerald-400" />
              Đang hiển thị hình nền tùy chọn của bạn
            </span>
          ) : (
            <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-medium text-amber-300/90 bg-amber-950/60 border border-amber-800/50 shadow-sm">
              <Sparkles className="w-3.5 h-3.5 text-amber-400" />
              Trang bìa phong thủy: Huyền Đạo Đỗ Gia 4311
            </span>
          )}
        </div>

        <div className="flex items-center gap-2">
          {/* Nút mở hộp thoại tự thay ảnh bìa */}
          <button
            type="button"
            onClick={() => setIsModalOpen(true)}
            className="inline-flex items-center gap-2 px-4 py-2 rounded-xl bg-gradient-to-r from-amber-500 via-amber-600 to-amber-700 hover:from-amber-400 hover:to-amber-600 text-slate-950 font-black text-xs sm:text-sm shadow-lg hover:shadow-amber-500/20 transition-all cursor-pointer border border-amber-400/50"
            title="Nhấn để tự tải ảnh của bạn làm hình nền trang bìa"
          >
            <Camera className="w-4 h-4 text-slate-950" />
            <span>📸 Tự Thay Hình Nền Bìa</span>
          </button>

          {/* Nút đặt lại mặc định nếu đã đổi ảnh */}
          {customCover && (
            <button
              type="button"
              onClick={handleResetCover}
              className="inline-flex items-center gap-1.5 px-3 py-2 rounded-xl bg-slate-800/90 hover:bg-slate-700 text-slate-300 hover:text-white text-xs font-medium border border-slate-700 transition-all cursor-pointer shadow-sm"
              title="Khôi phục lại hình vẽ mặc định"
            >
              <RotateCcw className="w-3.5 h-3.5" />
              <span>Đặt lại gốc</span>
            </button>
          )}
        </div>
      </div>

      {/* KHUNG BỨC HỌA POSTER TRANG BÌA */}
      <div className="relative w-full rounded-3xl overflow-hidden shadow-2xl border-2 sm:border-4 border-amber-900/70 bg-[#15100c] select-none group">
        
        {/* TỈ LỆ CHUẨN 16:9 */}
        <div className="relative w-full aspect-[16/9] overflow-hidden bg-[#15100c] flex items-center justify-center">
          
          {/* NẾU NGƯỜI DÙNG ĐÃ TẢI ẢNH RIÊNG: HIỂN THỊ CHÍNH XÁC ẢNH GỐC ĐÓ */}
          {customCover ? (
            <div className="relative w-full h-full flex items-center justify-center bg-[#15100c] overflow-hidden">
              <img
                src={customCover}
                alt="Hình nền trang bìa Huyền Đạo Đỗ Gia"
                className={`w-full h-full transition-all duration-300 ${
                  coverFit === 'contain' ? 'object-contain' : 'object-cover'
                }`}
              />

              {/* Nút chuyển chế độ căn chỉnh và đổi ảnh nhanh đè nhẹ trên góc */}
              <div className="absolute top-3 right-3 flex items-center gap-2 opacity-90 hover:opacity-100 transition-opacity">
                <button
                  type="button"
                  onClick={() => toggleCoverFit(coverFit === 'contain' ? 'cover' : 'contain')}
                  className="px-3 py-1.5 rounded-xl bg-slate-950/85 hover:bg-slate-900 text-amber-200 text-xs font-semibold backdrop-blur-md border border-amber-500/40 flex items-center gap-1.5 shadow-lg cursor-pointer"
                  title="Chuyển chế độ hiển thị ảnh"
                >
                  <Maximize2 className="w-3.5 h-3.5 text-amber-400" />
                  <span>{coverFit === 'contain' ? 'Xem Tràn Khung' : 'Xem Đầy Đủ Tỷ Lệ'}</span>
                </button>
                <button
                  type="button"
                  onClick={() => setIsModalOpen(true)}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/90 hover:bg-amber-400 text-slate-950 text-xs font-black backdrop-blur-md shadow-lg flex items-center gap-1.5 cursor-pointer"
                >
                  <Camera className="w-3.5 h-3.5" />
                  <span>Đổi Ảnh Khác</span>
                </button>
              </div>
            </div>
          ) : (
            <svg
              viewBox="0 0 1920 1080"
              className="w-full h-full block"
              preserveAspectRatio="xMidYMid meet"
            >
            <defs>
              {/* BỘ LỌC CHẤT LIỆU GIẤY XUYẾN CHỈ CỔ ĐIỂN (ANTIQUE RICE PAPER TEXTURE) */}
              <filter id="paperTexture" x="0%" y="0%" width="100%" height="100%">
                <feTurbulence type="fractalNoise" baseFrequency="0.04" numOctaves="4" result="noise" />
                <feDiffuseLighting in="noise" lightingColor="#fff" surfaceScale="1.2" result="light">
                  <feDistantLight azimuth="45" elevation="60" />
                </feDiffuseLighting>
                <feBlend mode="multiply" in="SourceGraphic" in2="light" />
              </filter>

              {/* NỀN GIẤY THỦY MẶC XUÂN CỔ */}
              <radialGradient id="masterParchment" cx="50%" cy="45%" r="75%">
                <stop offset="0%" stopColor="#DFCEBA" />
                <stop offset="35%" stopColor="#D2BF9E" />
                <stop offset="65%" stopColor="#B3997A" />
                <stop offset="88%" stopColor="#6E5034" />
                <stop offset="100%" stopColor="#3A2413" />
              </radialGradient>

              {/* GRADIENT VÀNG KIM CỔ TRUYỀN (ANCIENT GOLD LEAF) */}
              <linearGradient id="goldFoil" x1="0%" y1="0%" x2="100%" y2="100%">
                <stop offset="0%" stopColor="#FFF2B2" />
                <stop offset="25%" stopColor="#F5D77F" />
                <stop offset="50%" stopColor="#D4AF37" />
                <stop offset="75%" stopColor="#B8860B" />
                <stop offset="100%" stopColor="#7A5608" />
              </linearGradient>

              {/* MỰC TÀU ĐẬM ĐẶC (DEEP SUMI INK) */}
              <linearGradient id="sumiBlack" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#2A221A" />
                <stop offset="40%" stopColor="#18130E" />
                <stop offset="100%" stopColor="#0B0907" />
              </linearGradient>

              {/* MẶT TRỜI HOÀNG HÔN MỜ ẢO */}
              <radialGradient id="sunsetOrb" cx="50%" cy="50%" r="50%">
                <stop offset="0%" stopColor="#F5B041" stopOpacity="0.95" />
                <stop offset="30%" stopColor="#EB984E" stopOpacity="0.75" />
                <stop offset="65%" stopColor="#DC7633" stopOpacity="0.3" />
                <stop offset="100%" stopColor="#BA4A00" stopOpacity="0" />
              </radialGradient>

              {/* SƯƠNG KHÓI BỒNG BỀNH (MIST GRADIENT) */}
              <linearGradient id="valleyMist" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#DFCEBA" stopOpacity="0" />
                <stop offset="50%" stopColor="#EADBCE" stopOpacity="0.75" />
                <stop offset="100%" stopColor="#DFCEBA" stopOpacity="0" />
              </linearGradient>

              {/* BÓNG ĐỔ CHỮ THƯ PHÁP */}
              <filter id="inkGlow" x="-10%" y="-10%" width="120%" height="120%">
                <feDropShadow dx="2" dy="4" stdDeviation="4" floodColor="#000" floodOpacity="0.45" />
              </filter>
            </defs>

            {/* 1. NỀN GIẤY CỔ HOÀNG KIM TRẦM ẤM */}
            <rect width="1920" height="1080" fill="url(#masterParchment)" />

            {/* Quầng sáng sương mờ giữa không gian */}
            <ellipse cx="960" cy="400" rx="680" ry="320" fill="#FFF7ED" opacity="0.32" />
            <ellipse cx="400" cy="500" rx="350" ry="240" fill="#E8D1B5" opacity="0.25" />
            <ellipse cx="1520" cy="430" rx="380" ry="260" fill="#F7DC6F" opacity="0.18" />

            {/* 2. KHUNG VIỀN ĐÔI CHỈ VÀNG KIM CỔ TRUYỀN */}
            <rect x="36" y="36" width="1848" height="1008" fill="none" stroke="url(#goldFoil)" strokeWidth="3" opacity="0.88" />
            <rect x="48" y="48" width="1824" height="984" fill="none" stroke="url(#goldFoil)" strokeWidth="1.2" opacity="0.5" />

            {/* 4 HOA VĂN GÓC CỔ ĐIỂN CHÍNH XÁC */}
            {/* Góc trên bên trái */}
            <g transform="translate(48, 48)" stroke="url(#goldFoil)" strokeWidth="2.5" fill="none" opacity="0.95">
              <path d="M 0,0 H 90 V 18 H -72 V 90 H -18 Z" />
              <path d="M 28,28 H 72 V 12 H -44 V 72 H -12 Z" />
              <circle cx="14" cy="14" r="5" fill="#D4AF37" />
              <path d="M 0 38 H 38 V 0" strokeWidth="1.5" />
            </g>
            {/* Góc trên bên phải */}
            <g transform="translate(1872, 48) scale(-1, 1)" stroke="url(#goldFoil)" strokeWidth="2.5" fill="none" opacity="0.95">
              <path d="M 0,0 H 90 V 18 H -72 V 90 H -18 Z" />
              <path d="M 28,28 H 72 V 12 H -44 V 72 H -12 Z" />
              <circle cx="14" cy="14" r="5" fill="#D4AF37" />
              <path d="M 0 38 H 38 V 0" strokeWidth="1.5" />
            </g>
            {/* Góc dưới bên trái */}
            <g transform="translate(48, 1032) scale(1, -1)" stroke="url(#goldFoil)" strokeWidth="2.5" fill="none" opacity="0.95">
              <path d="M 0,0 H 90 V 18 H -72 V 90 H -18 Z" />
              <path d="M 28,28 H 72 V 12 H -44 V 72 H -12 Z" />
              <circle cx="14" cy="14" r="5" fill="#D4AF37" />
              <path d="M 0 38 H 38 V 0" strokeWidth="1.5" />
            </g>
            {/* Góc dưới bên phải */}
            <g transform="translate(1872, 1032) scale(-1, -1)" stroke="url(#goldFoil)" strokeWidth="2.5" fill="none" opacity="0.95">
              <path d="M 0,0 H 90 V 18 H -72 V 90 H -18 Z" />
              <path d="M 28,28 H 72 V 12 H -44 V 72 H -12 Z" />
              <circle cx="14" cy="14" r="5" fill="#D4AF37" />
              <path d="M 0 38 H 38 V 0" strokeWidth="1.5" />
            </g>

            {/* 3. DÃY NÚI XA MỜ ẢO PHÍA SAU (DISTANT MISTY PEAKS) */}
            <g opacity="0.4">
              {/* Núi xa trái */}
              <path d="M 60 650 Q 220 380 380 440 T 700 680 Z" fill="#5A4734" />
              <path d="M 280 680 Q 420 420 580 500 T 820 700 Z" fill="#4B3929" />
              {/* Núi xa phải */}
              <path d="M 1150 720 Q 1380 440 1520 480 T 1880 720 Z" fill="#5A4734" />
              <path d="M 1320 680 Q 1500 420 1660 480 T 1920 700 Z" fill="#4B3929" />
            </g>

            {/* 4. MẶT TRỜI LẶN VÀNG CAM BÊN PHẢI (GOLDEN DUSK SUN) */}
            <circle cx="1530" cy="400" r="100" fill="url(#sunsetOrb)" />
            <circle cx="1530" cy="400" r="56" fill="#E67E22" opacity="0.8" />

            {/* ĐÀN CHIM ÉN BAY LƯỢN TRÊN TRỜI (SWALLOW BIRDS) */}
            <g fill="#18130E" opacity="0.75">
              <path d="M 450 310 Q 465 300 480 310 Q 495 300 510 310 Q 495 315 480 312 Q 465 315 450 310 Z" />
              <path d="M 500 280 Q 512 272 524 280 Q 536 272 548 280 Q 536 284 524 282 Q 512 284 500 280 Z" />
              <path d="M 540 320 Q 550 313 560 320 Q 570 313 580 320 Q 570 324 560 322 Q 550 324 540 320 Z" />
              {/* Cạnh mặt trời */}
              <path d="M 1580 250 Q 1590 243 1600 250 Q 1610 243 1620 250 Q 1610 254 1600 252 Q 1590 254 1580 250 Z" />
              <path d="M 1625 220 Q 1633 214 1641 220 Q 1649 214 1657 220 Q 1649 223 1641 221 Q 1633 223 1625 220 Z" />
            </g>

            {/* 5. VÁCH NÚI ĐỨNG, LẦU VỌNG CẢNH & CÀNH TÙNG CỔ BÊN PHẢI */}
            <g>
              {/* Thân vách đá dựng đứng sừng sững */}
              <path
                d="M 1560 1080 L 1580 640 L 1620 530 L 1700 500 L 1760 520 L 1820 620 L 1920 700 L 1920 1080 Z"
                fill="url(#sumiBlack)"
              />
              {/* Vân nứt núi đá thủy mặc */}
              <path d="M 1600 640 L 1670 780 L 1640 920" stroke="#0B0907" strokeWidth="8" fill="none" opacity="0.8" />
              <path d="M 1700 560 L 1740 700 L 1820 860" stroke="#0B0907" strokeWidth="6" fill="none" opacity="0.8" />

              {/* MẠ VÀNG KINTSUGI TRÊN NÚI ĐÁ PHẢI */}
              <path
                d="M 1620 660 Q 1660 750 1640 840 T 1720 1040"
                stroke="url(#goldFoil)"
                strokeWidth="4.5"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 1700 590 Q 1740 680 1780 780 T 1880 960"
                stroke="url(#goldFoil)"
                strokeWidth="3.5"
                fill="none"
                opacity="0.85"
              />

              {/* NGÔI CHÙA / LẦU VỌNG CẢNH (PAGODA PAVILION) TRÊN ĐỈNH NÚI ĐÁ */}
              <g transform="translate(1620, 310) scale(1.18)">
                {/* Mái tầng thượng */}
                <polygon points="60,25 20,40 100,40" fill="#140F0A" />
                <path d="M 12 40 Q 60 32 108 40" stroke="url(#goldFoil)" strokeWidth="3" fill="none" />
                {/* Đỉnh hồ lô vàng */}
                <polygon points="60,14 42,25 78,25" fill="#140F0A" />
                <line x1="60" y1="14" x2="60" y2="4" stroke="url(#goldFoil)" strokeWidth="2.5" />
                <circle cx="60" cy="4" r="2.5" fill="#D4AF37" />
                {/* Trụ cột lầu */}
                <rect x="34" y="40" width="6" height="35" fill="#140F0A" />
                <rect x="50" y="40" width="5" height="35" fill="#140F0A" />
                <rect x="65" y="40" width="5" height="35" fill="#140F0A" />
                <rect x="80" y="40" width="6" height="35" fill="#140F0A" />
                {/* Mái tầng 2 */}
                <polygon points="60,65 5,85 115,85" fill="#140F0A" />
                <path d="M -2 85 Q 60 74 122 85" stroke="url(#goldFoil)" strokeWidth="3.5" fill="none" />
                {/* Lan can đài vọng cảnh */}
                <rect x="15" y="85" width="90" height="24" fill="#2A1E14" opacity="0.9" />
                <line x1="15" y1="96" x2="105" y2="96" stroke="url(#goldFoil)" strokeWidth="1.8" />
                {/* Đài đá móng chùa */}
                <rect x="22" y="109" width="76" height="22" fill="#140F0A" />
              </g>

              {/* CÀNH TÙNG CỔ THỤ (GNARLED PINE TREE) MỌC NGANG TỪ VÁCH NÚI */}
              <path d="M 1630 480 Q 1560 490 1520 510 Q 1480 525 1440 515" stroke="#140F0A" strokeWidth="9" fill="none" strokeLinecap="round" />
              <path d="M 1520 510 Q 1500 545 1450 555" stroke="#140F0A" strokeWidth="6" fill="none" strokeLinecap="round" />
              {/* Tán lá kim tùng xanh thẫm mực tàu */}
              <ellipse cx="1440" cy="510" rx="38" ry="14" fill="#1E1912" />
              <ellipse cx="1490" cy="500" rx="30" ry="11" fill="#1E1912" />
              <ellipse cx="1450" cy="555" rx="34" ry="12" fill="#1E1912" />
              <ellipse cx="1540" cy="490" rx="24" ry="9" fill="#1E1912" />
            </g>

            {/* 6. DÃY NÚI TIỀN CẢNH TRÙNG ĐIỆP VÀ VÂN VÀNG KIM DƯỚI ĐÁY */}
            <g>
              {/* Núi đỉnh nhọn bên trái */}
              <polygon points="100,850 320,310 540,800" fill="#140F0A" />
              <path d="M 320 310 L 330 600 L 250 880" stroke="#000" strokeWidth="7" opacity="0.8" fill="none" />
              <path d="M 320 310 L 230 550 L 100 820" stroke="#000" strokeWidth="6" opacity="0.7" fill="none" />

              {/* NÉT NỨT HOÀNG KIM (KINTSUGI GOLDEN VEIN) TRÊN NÚI TRÁI */}
              <path
                d="M 320 370 Q 270 480 290 590 T 170 790 T 40 1020"
                stroke="url(#goldFoil)"
                strokeWidth="5.5"
                fill="none"
                opacity="0.95"
              />
              <path
                d="M 290 590 Q 350 700 320 840 T 410 1060"
                stroke="url(#goldFoil)"
                strokeWidth="4"
                fill="none"
                opacity="0.9"
              />

              {/* Dải núi tiền cảnh trải dài từ trái qua phải */}
              <path
                d="M 0 1080 L 0 660 L 140 550 L 320 480 L 480 620 L 720 790 L 960 750 L 1200 810 L 1420 690 L 1650 890 L 1920 790 L 1920 1080 Z"
                fill="url(#sumiBlack)"
              />

              {/* Mạng lưới vân vàng kim chạy dưới chân các ngọn núi */}
              <path
                d="M 680 890 Q 820 950 960 910 T 1160 980 T 1400 930"
                stroke="url(#goldFoil)"
                strokeWidth="4.5"
                fill="none"
                opacity="0.88"
              />
              <path
                d="M 960 910 Q 980 990 960 1060"
                stroke="url(#goldFoil)"
                strokeWidth="4"
                fill="none"
                opacity="0.9"
              />
              <path
                d="M 460 760 Q 560 840 680 890"
                stroke="url(#goldFoil)"
                strokeWidth="3.5"
                fill="none"
                opacity="0.8"
              />
            </g>

            {/* 7. KHÓM TRE THỦY MẶC BÊN TRÁI (BAMBOO GROVE) */}
            <g transform="translate(10, 0)">
              {/* Thân tre to cao 1 */}
              <g stroke="#140F0A" fill="#140F0A">
                <line x1="60" y1="1080" x2="60" y2="700" strokeWidth="20" strokeLinecap="round" />
                <ellipse cx="60" cy="700" rx="15" ry="4.5" fill="url(#goldFoil)" />
                <line x1="60" y1="695" x2="62" y2="440" strokeWidth="17" strokeLinecap="round" />
                <ellipse cx="62" cy="440" rx="13" ry="4" fill="url(#goldFoil)" />
                <line x1="62" y1="435" x2="65" y2="220" strokeWidth="15" strokeLinecap="round" />
                <ellipse cx="65" cy="220" rx="11" ry="3.5" fill="url(#goldFoil)" />
                <line x1="65" y1="215" x2="68" y2="20" strokeWidth="12" strokeLinecap="round" />

                {/* Thân tre 2 */}
                <line x1="125" y1="1080" x2="120" y2="600" strokeWidth="15" strokeLinecap="round" opacity="0.9" />
                <ellipse cx="120" cy="600" rx="12" ry="4" fill="url(#goldFoil)" opacity="0.9" />
                <line x1="120" y1="595" x2="114" y2="350" strokeWidth="13" strokeLinecap="round" opacity="0.9" />
                <ellipse cx="114" cy="350" rx="10" ry="3.5" fill="url(#goldFoil)" opacity="0.9" />
                <line x1="114" y1="345" x2="108" y2="80" strokeWidth="10" strokeLinecap="round" opacity="0.9" />

                {/* Thân tre 3 mờ phía sau */}
                <line x1="28" y1="850" x2="22" y2="300" strokeWidth="9" strokeLinecap="round" opacity="0.75" />
                <ellipse cx="22" cy="300" rx="7" ry="2.5" fill="url(#goldFoil)" opacity="0.75" />
                <line x1="22" y1="295" x2="18" y2="40" strokeWidth="7" strokeLinecap="round" opacity="0.75" />
              </g>

              {/* LÁ TRE THƯ PHÁP CỌ MỰC (BAMBOO LEAVES) */}
              <g fill="#140F0A">
                {/* Tầng cao */}
                <path d="M 68 220 Q 20 180 -5 200 Q 28 200 68 220 Z" />
                <path d="M 68 220 Q 25 240 2 265 Q 35 240 68 220 Z" />
                <path d="M 68 220 Q 115 180 155 190 Q 118 208 68 220 Z" />
                <path d="M 68 220 Q 125 230 165 255 Q 120 242 68 220 Z" />

                {/* Tầng giữa */}
                <path d="M 62 440 Q 12 390 -15 410 Q 25 415 62 440 Z" />
                <path d="M 62 440 Q 18 460 -2 490 Q 30 465 62 440 Z" />
                <path d="M 114 350 Q 165 300 215 320 Q 165 330 114 350 Z" />
                <path d="M 114 350 Q 175 360 225 380 Q 170 375 114 350 Z" />
                <path d="M 114 350 Q 155 390 195 425 Q 150 395 114 350 Z" />

                {/* Tầng dưới */}
                <path d="M 120 600 Q 185 560 245 580 Q 185 590 120 600 Z" />
                <path d="M 120 600 Q 195 620 255 650 Q 190 630 120 600 Z" />
                <path d="M 60 700 Q 125 670 185 690 Q 130 700 60 700 Z" />
              </g>
            </g>

            {/* 8. VÒNG TRÒN THÁI CỰC THỦY MẶC TRUNG TÂM (TAIJI YIN-YANG SWIRL) */}
            <g transform="translate(960, 240)">
              {/* Vầng hào quang vàng kim rực rỡ */}
              <circle cx="0" cy="0" r="175" fill="url(#sunsetOrb)" opacity="0.65" />

              {/* Nửa vòng cọ mực đen bao quanh */}
              <path
                d="M 0 -135 
                   A 135 135 0 1 1 -95 95
                   C -125 62, -140 10, -135 -42
                   C -130 -95, -72 -140, 0 -135 Z"
                fill="none"
                stroke="#140F0A"
                strokeWidth="30"
                strokeLinecap="round"
                strokeDasharray="45 12 160 16 85"
              />

              {/* Nửa vòng cọ vàng kim đối xứng */}
              <path
                d="M 0 135 
                   A 135 135 0 0 1 95 -95
                   C 125 -62, 140 -10, 135 42
                   C 130 95, 72 140, 0 135 Z"
                fill="none"
                stroke="url(#goldFoil)"
                strokeWidth="26"
                strokeLinecap="round"
                opacity="0.95"
              />

              {/* Núi thiêng và Chùa lầu bên trong Thái Cực */}
              <g transform="translate(0, 10)">
                <polygon points="0,-42 -52,50 52,50" fill="#140F0A" />
                <polygon points="12,-22 -30,50 52,50" fill="#2A1E14" opacity="0.85" />
                {/* Bảo tháp nhỏ */}
                <rect x="-8" y="-58" width="16" height="16" fill="#140F0A" />
                <polygon points="0,-72 -16,-58 16,-58" fill="url(#goldFoil)" />
                <line x1="0" y1="-72" x2="0" y2="-80" stroke="url(#goldFoil)" strokeWidth="3" />
              </g>

              {/* Hai mắt Âm Dương (Yin-Yang dots) */}
              <circle cx="30" cy="-62" r="15" fill="#140F0A" />
              <circle cx="-30" cy="62" r="15" fill="url(#goldFoil)" />

              {/* ĐÓA SEN ĐEN MẠ VÀNG NẰM DƯỚI ĐÁY VÒNG THÁI CỰC */}
              <g transform="translate(0, 155) scale(1.15)">
                <path d="M 0 -36 C -11 -16 -11 6 0 22 C 11 6 11 -16 0 -36 Z" fill="#140F0A" />
                <path d="M 0 22 C -24 6 -32 -16 -26 -26 C -13 -13 -5 5 0 22 Z" fill="#140F0A" />
                <path d="M 0 22 C 24 6 32 -16 26 -26 C 13 -13 5 5 0 22 Z" fill="#140F0A" />
                <path d="M 0 22 C -40 13 -58 -6 -50 -20 C -34 -9 -20 8 0 22 Z" fill="#140F0A" />
                <path d="M 0 22 C 40 13 58 -6 50 -20 C 34 -9 20 8 0 22 Z" fill="#140F0A" />
                {/* Viền chỉ vàng */}
                <path d="M 0 -36 C -11 -16 -11 6 0 22 C 11 6 11 -16 0 -36 Z" stroke="url(#goldFoil)" strokeWidth="2.2" fill="none" />
                <path d="M -26 -26 C -13 -13 -5 5 0 22 C 5 5 13 -13 26 -26" stroke="url(#goldFoil)" strokeWidth="2.2" fill="none" />
              </g>

              {/* CON DẤU TRIỆN SON ĐỎ DỌC: "玄道" (HUYỀN ĐẠO) */}
              <g transform="translate(260, 42)">
                <rect x="0" y="0" width="58" height="114" rx="8" fill="#8B1E1E" stroke="#5E1212" strokeWidth="4" />
                <text x="29" y="50" fill="#FAD982" fontSize="34" fontWeight="900" textAnchor="middle" fontFamily="'Noto Serif', serif">玄</text>
                <text x="29" y="98" fill="#FAD982" fontSize="34" fontWeight="900" textAnchor="middle" fontFamily="'Noto Serif', serif">道</text>
              </g>
            </g>

            {/* 9. CHỮ THƯ PHÁP CHÍNH: "Huyền Đạo Đỗ Gia 4311" */}
            <g transform="translate(960, 560)">
              {/* Chữ "Huyền Đạo Đỗ Gia" với phong cách thư pháp uyển chuyển */}
              <text
                x="-80"
                y="0"
                fill="#100C08"
                fontSize="124"
                fontWeight="900"
                textAnchor="middle"
                fontFamily="'Dancing Script', 'Playfair Display', serif"
                fontStyle="italic"
                letterSpacing="-1"
                style={{ filter: 'drop-shadow(3px 4px 6px rgba(0,0,0,0.4))' }}
              >
                Huyền Đạo Đỗ Gia
              </text>

              {/* Chữ số "4311" */}
              <text
                x="430"
                y="-12"
                fill="#100C08"
                fontSize="96"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                style={{ filter: 'drop-shadow(2px 3px 5px rgba(0,0,0,0.35))' }}
              >
                4311
              </text>
              {/* Nét gạch thư pháp uốn lượn dưới số 4311 */}
              <path
                d="M 345 16 Q 430 42 515 8"
                stroke="#100C08"
                strokeWidth="7"
                strokeLinecap="round"
                fill="none"
              />
            </g>

            {/* 10. DÒNG KHẨU HIỆU: "THUẬN ĐẠO – THUẬN KHÍ – THUẬN ĐỜI" & TRIỆN VUÔNG */}
            <g transform="translate(960, 626)">
              <text
                x="-40"
                y="0"
                fill="#1A1510"
                fontSize="32"
                fontWeight="800"
                textAnchor="middle"
                fontFamily="'Plus Jakarta Sans', sans-serif"
                letterSpacing="4"
              >
                THUẬN ĐẠO – THUẬN KHÍ – THUẬN ĐỜI
              </text>

              {/* Con dấu triện son đỏ vuông [Đỗ Gia] */}
              <g transform="translate(330, -32)">
                <rect x="0" y="0" width="70" height="70" rx="6" fill="#8B1E1E" stroke="#5E1212" strokeWidth="3.5" />
                <rect x="10" y="10" width="50" height="50" fill="none" stroke="#FAD982" strokeWidth="2" />
                <path d="M 23 20 L 23 50 M 35 20 L 35 50 M 47 20 L 47 50" stroke="#FAD982" strokeWidth="2.5" />
                <path d="M 17 35 L 53 35" stroke="#FAD982" strokeWidth="2.5" />
              </g>
            </g>

            {/* 11. CÂU CHÂM NGÔN HOÀNG KIM: “Thuận theo đạo trời, An trong vận đời.” */}
            <g transform="translate(960, 755)">
              {/* Dấu ngoặc kép mở */}
              <text
                x="-360"
                y="-30"
                fill="#D4AF37"
                fontSize="115"
                fontWeight="900"
                fontFamily="'Playfair Display', serif"
                opacity="0.95"
              >
                “
              </text>

              {/* Dòng 1: Thuận theo đạo trời, */}
              <text
                x="0"
                y="-32"
                fill="url(#goldFoil)"
                fontSize="54"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="'Playfair Display', 'Dancing Script', serif"
                fontStyle="italic"
                letterSpacing="1.5"
                style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.75))' }}
              >
                Thuận theo đạo trời,
              </text>

              {/* Dòng 2: An trong vận đời. */}
              <text
                x="0"
                y="36"
                fill="url(#goldFoil)"
                fontSize="54"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="'Playfair Display', 'Dancing Script', serif"
                fontStyle="italic"
                letterSpacing="1.5"
                style={{ filter: 'drop-shadow(0 3px 6px rgba(0,0,0,0.75))' }}
              >
                An trong vận đời.
              </text>

              {/* Dấu ngoặc kép đóng */}
              <text
                x="295"
                y="60"
                fill="#D4AF37"
                fontSize="115"
                fontWeight="900"
                fontFamily="'Playfair Display', serif"
                opacity="0.95"
              >
                ”
              </text>
            </g>

            {/* 12. BIỂU TƯỢNG ĐÓA SEN VÀNG NHỎ CHÍNH GIỮA */}
            <g transform="translate(960, 875) scale(0.95)">
              <g stroke="url(#goldFoil)" strokeWidth="3" fill="none" opacity="0.95">
                <path d="M 0 -26 C -9 -10 -9 6 0 16 C 9 6 9 -10 0 -26 Z" fill="#D4AF37" fillOpacity="0.45" />
                <path d="M 0 16 C -19 6 -26 -10 -21 -19 C -11 -9 -4 4 0 16 Z" />
                <path d="M 0 16 C 19 6 26 -10 21 -19 C 11 -9 4 4 0 16 Z" />
                <path d="M 0 16 C -32 11 -48 -5 -40 -16 C -27 -5 -16 6 0 16 Z" />
                <path d="M 0 16 C 32 11 48 -5 40 -16 C 27 -5 16 6 0 16 Z" />
              </g>
            </g>

            {/* 13. DÒNG HOTLINE HOÀNG KIM: • Hotline : 0768431286 • */}
            <g transform="translate(960, 938)">
              {/* Điểm hạt cườm vàng kim hai bên */}
              <circle cx="-330" cy="-10" r="7" fill="url(#goldFoil)" />
              <line x1="-310" y1="-10" x2="-225" y2="-10" stroke="url(#goldFoil)" strokeWidth="3" />

              <text
                x="0"
                y="0"
                fill="url(#goldFoil)"
                fontSize="52"
                fontWeight="700"
                textAnchor="middle"
                fontFamily="'Playfair Display', serif"
                fontStyle="italic"
                letterSpacing="2.5"
                style={{ filter: 'drop-shadow(0 3px 7px rgba(0,0,0,0.85))' }}
              >
                Hotline : 0768431286
              </text>

              <line x1="225" y1="-10" x2="310" y2="-10" stroke="url(#goldFoil)" strokeWidth="3" />
              <circle cx="330" cy="-10" r="7" fill="url(#goldFoil)" />
            </g>

          </svg>
          )}
        </div>

      </div>

      {/* THANH TRA CỨU & TIỆN ÍCH DÀNH CHO NGƯỜI DÙNG (NẰM BÊN DƯỚI BỨC POSTER, KHÔNG ĐÈ LÊN TRANH) */}
      <div className="bg-slate-900 rounded-2xl p-4 sm:p-5 border border-amber-900/50 shadow-lg flex flex-col md:flex-row items-center justify-between gap-4">
        
        {/* Hotline Trực Tiếp */}
        <div className="flex items-center gap-3">
          <a
            href="tel:0768431286"
            className="inline-flex items-center gap-2.5 px-4 py-2.5 rounded-xl bg-gradient-to-r from-amber-600 via-amber-700 to-amber-800 hover:from-amber-500 hover:to-amber-700 text-white font-bold text-base transition-all shadow-md"
            title="Nhấn để gọi hotline 0768431286"
          >
            <PhoneCall className="w-5 h-5 text-amber-200 animate-pulse" />
            <span>Hotline: <strong className="font-mono text-white text-lg tracking-wider">0768431286</strong></span>
          </a>
          <span className="text-xs text-amber-300/80 font-medium hidden sm:inline">
            Huyền Đạo Đỗ Gia 4311
          </span>
        </div>

        {/* Ô Tra Cứu Nhanh Dãy Số */}
        <form onSubmit={handleLookupSubmit} className="flex items-center gap-2 w-full md:w-auto">
          <div className="relative flex-1 md:w-72">
            <input
              type="text"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
              placeholder="Nhập số điện thoại tra cứu..."
              className="w-full bg-slate-950 border border-amber-600/40 text-white placeholder-slate-400 font-mono text-base rounded-xl px-4 py-2.5 outline-none focus:border-amber-400 focus:ring-1 focus:ring-amber-400 transition-all"
            />
          </div>
          <button
            type="submit"
            className="px-5 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-black text-base rounded-xl transition-all shadow-md flex items-center justify-center gap-1.5 cursor-pointer shrink-0 min-h-[44px]"
          >
            <Search className="w-4 h-4" />
            <span>Phân Tích</span>
          </button>
        </form>

        {/* Nút Liên Kết Bản Phân Tích Nâng Cao */}
        <a
          href="https://claude.ai/artifact/Lq9Uj7LgY3cEauv2reFFUm"
          target="_blank"
          rel="noopener noreferrer"
          className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-blue-950 hover:bg-blue-900 text-amber-200 hover:text-white border border-amber-500/30 text-sm font-bold transition-all shadow-md shrink-0"
        >
          <ExternalLink className="w-4 h-4 text-amber-400" />
          <span>Bản Phân Tích Nâng Cao</span>
        </a>

      </div>

      {/* MODAL HỘP THOẠI HƯỚNG DẪN & TỰ THAY HÌNH NỀN BÌA */}
      {isModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/80 backdrop-blur-sm animate-in fade-in duration-200">
          <div className="relative w-full max-w-2xl bg-slate-900 border-2 border-amber-500/40 rounded-3xl p-6 sm:p-7 shadow-2xl text-white space-y-6 max-h-[90vh] overflow-y-auto">
            
            {/* Tiêu đề Modal */}
            <div className="flex items-center justify-between pb-4 border-b border-amber-500/20">
              <div className="flex items-center gap-3">
                <div className="w-10 h-10 rounded-2xl bg-amber-500/20 border border-amber-500/30 flex items-center justify-center text-amber-400">
                  <ImageIcon className="w-5 h-5" />
                </div>
                <div>
                  <h3 className="text-xl font-bold text-amber-300">Tự Thay Hình Nền Trang Bìa</h3>
                  <p className="text-xs text-slate-400">Tải ảnh gốc chính xác của bạn hoặc cấu hình vĩnh viễn</p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="w-9 h-9 rounded-xl bg-slate-800 hover:bg-slate-700 text-slate-300 hover:text-white flex items-center justify-center transition-colors cursor-pointer"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Thông báo lỗi hoặc thành công */}
            {uploadError && (
              <div className="p-3.5 rounded-xl bg-rose-950/80 border border-rose-500/40 text-rose-200 text-sm flex items-center gap-2.5">
                <AlertCircle className="w-4 h-4 text-rose-400 shrink-0" />
                <span>{uploadError}</span>
              </div>
            )}
            {uploadSuccess && (
              <div className="p-3.5 rounded-xl bg-emerald-950/80 border border-emerald-500/40 text-emerald-200 text-sm flex items-center gap-2.5">
                <CheckCircle2 className="w-4 h-4 text-emerald-400 shrink-0" />
                <span>{uploadSuccess}</span>
              </div>
            )}

            {/* CÁCH 1: TẢI TRỰC TIẾP FILE ẢNH TỪ MÁY */}
            <div className="space-y-3 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <div className="flex items-center justify-between">
                <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                  <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">1</span>
                  Tải ảnh từ máy tính hoặc điện thoại (Xem ngay 100% chuẩn nét)
                </h4>
              </div>
              <p className="text-xs text-slate-300 leading-relaxed">
                Chọn bức ảnh gốc (.jpg, .png, .webp) bạn muốn làm trang bìa. Ảnh sẽ lập tức được hiển thị đúng 100% từng pixel và tự động ghi nhớ trên thiết bị của bạn.
              </p>

              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                className="hidden"
              />

              <div 
                onClick={() => fileInputRef.current?.click()}
                className="border-2 border-dashed border-amber-600/50 hover:border-amber-400 bg-amber-950/20 hover:bg-amber-950/40 rounded-2xl p-6 flex flex-col items-center justify-center gap-3 cursor-pointer transition-all text-center"
              >
                <div className="w-12 h-12 rounded-full bg-amber-500/20 text-amber-300 flex items-center justify-center">
                  <UploadCloud className="w-6 h-6 animate-bounce" />
                </div>
                <div>
                  <span className="text-sm font-bold text-amber-200 hover:underline">
                    Nhấn vào đây để chọn ảnh từ máy của bạn
                  </span>
                  <p className="text-xs text-slate-400 mt-1">Hỗ trợ JPG, PNG, WebP (Tỉ lệ 16:9 ngang là đẹp nhất)</p>
                </div>
              </div>
            </div>

            {/* CÁCH 2: DÁN LIÊN KẾT ẢNH TRỰC TUYẾN (URL) */}
            <div className="space-y-3 bg-slate-950/60 p-4 sm:p-5 rounded-2xl border border-slate-800">
              <h4 className="text-sm font-bold text-amber-400 flex items-center gap-2">
                <span className="w-6 h-6 rounded-full bg-amber-500 text-slate-950 font-black text-xs flex items-center justify-center">2</span>
                Hoặc dán đường dẫn ảnh trực tuyến (Link URL)
              </h4>
              <form onSubmit={handleApplyUrl} className="flex gap-2">
                <div className="relative flex-1">
                  <Link2 className="w-4 h-4 text-slate-400 absolute left-3.5 top-3.5" />
                  <input
                    type="url"
                    value={imageUrlInput}
                    onChange={(e) => setImageUrlInput(e.target.value)}
                    placeholder="https://example.com/anh-phong-thuy.jpg"
                    className="w-full bg-slate-900 border border-slate-700 text-white placeholder-slate-500 text-xs sm:text-sm rounded-xl pl-10 pr-4 py-2.5 outline-none focus:border-amber-400"
                  />
                </div>
                <button
                  type="submit"
                  className="px-4 py-2.5 bg-amber-500 hover:bg-amber-400 text-slate-950 font-bold text-xs sm:text-sm rounded-xl transition-all cursor-pointer shrink-0"
                >
                  Áp Dụng
                </button>
              </form>
            </div>

            {/* CÀI ĐẶT CĂN CHỈNH */}
            <div className="flex flex-wrap items-center justify-between gap-3 bg-slate-950/40 p-4 rounded-2xl border border-slate-800">
              <span className="text-xs font-semibold text-slate-300">Chế độ hiển thị khung hình:</span>
              <div className="flex items-center gap-2">
                <button
                  type="button"
                  onClick={() => toggleCoverFit('contain')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    coverFit === 'contain'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Giữ nguyên tỷ lệ (Không cắt góc)
                </button>
                <button
                  type="button"
                  onClick={() => toggleCoverFit('cover')}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    coverFit === 'cover'
                      ? 'bg-amber-500 text-slate-950 shadow-md'
                      : 'bg-slate-800 text-slate-400 hover:text-white'
                  }`}
                >
                  Tràn toàn bộ khung (Cover)
                </button>
              </div>
            </div>

            {/* HƯỚNG DẪN CỐ ĐỊNH VĨNH VIỄN VÀO DỰ ÁN */}
            <div className="space-y-2.5 bg-amber-950/30 p-4 sm:p-5 rounded-2xl border border-amber-600/30">
              <h4 className="text-sm font-bold text-amber-300 flex items-center gap-2">
                <FolderOpen className="w-4 h-4 text-amber-400" />
                Hướng dẫn đặt ảnh cố định vĩnh viễn trong mã nguồn:
              </h4>
              <p className="text-xs text-slate-300 leading-relaxed">
                Nếu bạn quản lý mã nguồn dự án và muốn bức ảnh xuất hiện cố định cho tất cả mọi khách truy cập mà không cần tải lên thủ công:
              </p>
              <ol className="text-xs text-amber-200/90 space-y-1.5 list-decimal list-inside bg-slate-950/60 p-3.5 rounded-xl border border-amber-500/20 font-mono">
                <li>Đổi tên file ảnh của bạn thành: <strong className="text-amber-400">cover.jpg</strong> (hoặc <strong className="text-amber-400">cover.png</strong>)</li>
                <li>Sao chép file ảnh này vào thư mục: <strong className="text-amber-400">/public/cover.jpg</strong></li>
                <li>Hệ thống sẽ tự động ưu tiên lấy file này hiển thị vĩnh viễn trên trang chủ!</li>
              </ol>
            </div>

            {/* Nút Đóng & Đặt lại */}
            <div className="flex items-center justify-between pt-2">
              {customCover ? (
                <button
                  type="button"
                  onClick={handleResetCover}
                  className="inline-flex items-center gap-1.5 px-4 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-rose-300 text-xs font-bold transition-colors cursor-pointer border border-rose-500/30"
                >
                  <RotateCcw className="w-3.5 h-3.5" />
                  <span>Xóa ảnh & Khôi phục gốc</span>
                </button>
              ) : <div />}

              <button
                type="button"
                onClick={() => setIsModalOpen(false)}
                className="px-6 py-2 rounded-xl bg-slate-800 hover:bg-slate-700 text-white text-xs sm:text-sm font-bold transition-colors cursor-pointer"
              >
                Đóng
              </button>
            </div>

          </div>
        </div>
      )}

    </div>
  );
};
