import React, { useState, useEffect, useRef } from 'react';
import { 
  Play, 
  Pause, 
  RotateCcw, 
  Volume2, 
  VolumeX, 
  Sparkles, 
  ArrowRight, 
  ShieldCheck, 
  ShieldAlert, 
  CheckCircle2, 
  Clock, 
  Hash, 
  BookOpen, 
  Film, 
  Upload,
  Radio,
  Tv,
  ListFilter,
  Check,
  Headphones,
  ExternalLink
} from 'lucide-react';
import { VIDEO_LESSONS, VideoLesson, VideoSegment } from '../data/videoLessons';
import { CornerOrnament, RedSealStamp } from './OrientalArtwork';

interface VideoLessonsModuleProps {
  onQuickLookup: (numberSequence: string) => void;
  onNavigateToTab?: (tab: any) => void;
  initialVideoId?: string;
}

// Dữ liệu 4 Trụ Cột của 8 Từ Trường cho Video 4
const TU_TRUONG_4_TRU_COT = [
  {
    name: 'Thiên Y',
    type: 'Cát Tinh (Tài Lộc)',
    numbers: '13/31, 68/86, 49/94, 27/72',
    themeColor: 'bg-amber-500/10 border-amber-300 text-amber-900',
    badgeColor: 'bg-amber-600 text-white',
    tinhCach: 'Lương thiện, thuần hậu, thông tuệ, từ bi, dễ động lòng trắc ẩn; nhược điểm là quá dễ tin người.',
    taiVan: 'Đại tài lộc, chủ về dòng tiền chính đạo, tiền hết lại có, đắc lộc trời ban, giữ các dòng tiền lớn.',
    giaDao: 'Tình cảm thủy chung, vợ chồng hòa thuận, hôn nhân viên mãn, con cái thảo hiền.',
    sucKhoe: 'Huyết áp cao, tim mạch, các chứng đau đầu, tuần hoàn máu não, bệnh mắt.',
  },
  {
    name: 'Sinh Khí',
    type: 'Cát Tinh (Quý Nhân)',
    numbers: '14/41, 67/76, 39/93, 28/82',
    themeColor: 'bg-emerald-500/10 border-emerald-300 text-emerald-900',
    badgeColor: 'bg-emerald-600 text-white',
    tinhCach: 'Lạc quan, phóng khoáng, tùy duyên, tính tình vui vẻ, ít so đo; nhược điểm là dễ an phận.',
    taiVan: 'Quý nhân tương trợ mang lại thời cơ, tiền tài hanh thông, nhưng tiêu xài phóng khoáng khó giữ.',
    giaDao: 'Gia hòa vạn sự hưng, nhiều bạn bè, gia đình đầm ấm, đi đâu cũng được yêu mến.',
    sucKhoe: 'Tỳ vị đường ruột, dạ dày, các chứng bệnh về tiêu hóa do tiệc tùng ăn uống nhiều.',
  },
  {
    name: 'Diên Niên',
    type: 'Cát Tinh (Lãnh Đạo)',
    numbers: '19/91, 78/87, 34/43, 26/62',
    themeColor: 'bg-blue-500/10 border-blue-300 text-blue-900',
    badgeColor: 'bg-blue-700 text-white',
    tinhCach: 'Ý chí kiên cường, phong thái lãnh đạo, tinh thần trách nhiệm cực cao, cầu toàn; nhược điểm là độc đoán, gia trưởng.',
    taiVan: 'Kiếm tiền bằng chuyên môn thực lực; quản lý chi tiêu kỷ luật thép, giữ tiền vô địch.',
    giaDao: 'Trụ cột gánh vác cả gia đình; tuy nhiên tính nghiêm nghị dễ gây ngột ngạt cho người nhà.',
    sucKhoe: 'Đau mỏi vai gáy, đốt sống cổ, cột sống thắt lưng, mất ngủ kéo dài do làm việc quá sức.',
  },
  {
    name: 'Phục Vị',
    type: 'Cát Tinh (Bình An)',
    numbers: '11/22, 88/99, 66/77, 33/44',
    themeColor: 'bg-slate-500/10 border-slate-300 text-slate-900',
    badgeColor: 'bg-slate-700 text-white',
    tinhCach: 'Cẩn trọng, nhẫn nại, thích an toàn, suy nghĩ chu toàn; nhược điểm là do dự, sợ rủi ro.',
    taiVan: 'Tích lũy từ tốn chậm mà chắc, thu nhập cố định; khó bứt phá tài chính nếu không có đòn bẩy.',
    giaDao: 'Tình cảm thụ động, ít bộc lộ nhưng chung thủy bền lâu, gia đạo bình yên.',
    sucKhoe: 'Bệnh mãn tính dai dẳng, suy giảm hệ miễn dịch, suy nhược tinh thần.',
  },
  {
    name: 'Tuyệt Mệnh',
    type: 'Hung Tinh (Phá Quân)',
    numbers: '12/21, 69/96, 48/84, 37/73',
    themeColor: 'bg-rose-500/10 border-rose-300 text-rose-900',
    badgeColor: 'bg-rose-600 text-white',
    tinhCach: 'Dám nghĩ dám làm, nghĩa khí, trực tính, nhạy bén chớp thời cơ; nhược điểm là cực đoan, nóng nảy.',
    taiVan: 'Kiếm tiền nhanh và lớn, thích mạo hiểm; tiêu tiền bạo, dễ đại tài nhưng cũng dễ phá sản.',
    giaDao: 'Thiếu kiên nhẫn, hay nổi nóng, dễ xung đột tranh cãi; hôn nhân nhiều sóng gió.',
    sucKhoe: 'Thận, hệ tiết niệu, gan và các chấn thương ngoại khoa do tai nạn bất ngờ.',
  },
  {
    name: 'Ngũ Quỷ',
    type: 'Hung Tinh (Biến Đổi)',
    numbers: '18/81, 79/97, 36/63, 24/42',
    themeColor: 'bg-purple-500/10 border-purple-300 text-purple-900',
    badgeColor: 'bg-purple-700 text-white',
    tinhCach: 'Thông minh xuất chúng, sáng tạo mưu lược, giác quan nhạy bén; nhược điểm là đa nghi, tâm trạng thất thường.',
    taiVan: 'Hoạnh tài, tiền bạc bất ngờ từ các ngành biến ảo; nhưng tiền bất định, hao tài vì bị phản bội.',
    giaDao: 'Bất an, hoài nghi bạn đời, dễ có đào hoa ngầm và các mối quan hệ bí mật ngoài hôn nhân.',
    sucKhoe: 'Tim mạch, huyết áp, tai biến, đột quỵ, hệ thần kinh và mất ngủ kinh niên.',
  },
  {
    name: 'Lục Sát',
    type: 'Hung Tinh (Đào Hoa Sát)',
    numbers: '16/61, 47/74, 38/83, 29/92',
    themeColor: 'bg-pink-500/10 border-pink-300 text-pink-900',
    badgeColor: 'bg-pink-600 text-white',
    tinhCach: 'Duyên dáng, thẩm mỹ cao, giao tiếp khéo léo; nhược điểm là đa sầu đa cảm, bi lụy, sầu muộn.',
    taiVan: 'Kiếm tiền từ quan hệ đối ngoại, dịch vụ, nghệ thuật, phụ nữ; hao tài vì tình cảm và cảm xúc.',
    giaDao: 'Đào hoa thị phi, tình cảm rối ren, hay sầu muộn, hôn nhân trắc trở nếu không tu tâm.',
    sucKhoe: 'Da liễu, đường hô hấp, tỳ vị, suy nhược tinh thần, trầm cảm.',
  },
  {
    name: 'Họa Hại',
    type: 'Hung Tinh (Khẩu Thiệt)',
    numbers: '17/71, 89/98, 46/64, 23/32',
    themeColor: 'bg-orange-500/10 border-orange-300 text-orange-900',
    badgeColor: 'bg-orange-600 text-white',
    tinhCach: 'Khẩu tài hùng biện xuất sắc, thích thuyết phục; nhược điểm là háo thắng, thích tranh luận hơn thua.',
    taiVan: 'Kiếm tiền nhờ ăn nói ngoại giao; nhưng dễ hao hụt vì thị phi đền bù hoặc sĩ diện.',
    giaDao: 'Khắc khẩu với người nhà, hay cằn nhằn chỉ trích vụn vặt làm tổn thương bạn đời.',
    sucKhoe: 'Hầu họng, thanh quản, khí quản, phổi và bệnh liên quan đến hệ hô hấp.',
  },
];

export const VideoLessonsModule: React.FC<VideoLessonsModuleProps> = ({
  onQuickLookup,
  onNavigateToTab,
  initialVideoId,
}) => {
  const defaultVideo = initialVideoId 
    ? VIDEO_LESSONS.find(v => v.id === initialVideoId) || VIDEO_LESSONS[3] || VIDEO_LESSONS[0]
    : VIDEO_LESSONS[3] || VIDEO_LESSONS[0]; // Mặc định mở Video 4 Podcast 10:48 vừa được bổ sung!

  const [selectedVideo, setSelectedVideo] = useState<VideoLesson>(defaultVideo);
  const [isPlaying, setIsPlaying] = useState<boolean>(false);
  const [currentSeconds, setCurrentSeconds] = useState<number>(0);
  const [isMuted, setIsMuted] = useState<boolean>(false);
  const [playbackSpeed, setPlaybackSpeed] = useState<number>(1);
  const [speechSupported, setSpeechSupported] = useState<boolean>(false);
  
  // Real video file support (e.g. postcat.mp4)
  const [videoFileUrl, setVideoFileUrl] = useState<string | null>(null);
  const [videoLoaded, setVideoLoaded] = useState<boolean>(false);
  const [activeTopicFilter, setActiveTopicFilter] = useState<string>('all');
  const [active4TruCotTab, setActive4TruCotTab] = useState<string>('Thiên Y');

  const timerRef = useRef<NodeJS.Timeout | null>(null);
  const synthRef = useRef<SpeechSynthesis | null>(null);
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Parse max duration in seconds
  const getMaxSeconds = (durationStr: string) => {
    const parts = durationStr.split(':');
    return parseInt(parts[0], 10) * 60 + parseInt(parts[1], 10);
  };

  const totalSeconds = getMaxSeconds(selectedVideo.duration);

  // Initialize Speech Synthesis
  useEffect(() => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      setSpeechSupported(true);
      synthRef.current = window.speechSynthesis;
    }
  }, []);

  // Check if initialVideoId changes
  useEffect(() => {
    if (initialVideoId) {
      const match = VIDEO_LESSONS.find(v => v.id === initialVideoId);
      if (match) {
        handleSelectVideo(match);
      }
    }
  }, [initialVideoId]);

  // Find active segment based on current seconds
  const activeSegmentIndex = selectedVideo.segments.reduce((acc, seg, idx) => {
    if (currentSeconds >= seg.seconds) return idx;
    return acc;
  }, 0);

  const activeSegment = selectedVideo.segments[activeSegmentIndex] || selectedVideo.segments[0];

  // Speak current text if not muted AND not playing native video with audio
  const speakText = (text: string) => {
    if (!synthRef.current || isMuted || videoLoaded) return;
    try {
      synthRef.current.cancel();
      const utterance = new SpeechSynthesisUtterance(text);
      utterance.lang = 'vi-VN';
      utterance.rate = playbackSpeed * 0.95;
      utterance.pitch = 1.0;
      synthRef.current.speak(utterance);
    } catch (e) {
      console.warn('Speech synthesis error:', e);
    }
  };

  // Timer loop for simulated playback (only if native video is not active)
  useEffect(() => {
    if (isPlaying && !videoLoaded) {
      timerRef.current = setInterval(() => {
        setCurrentSeconds((prev) => {
          if (prev >= totalSeconds) {
            setIsPlaying(false);
            if (synthRef.current) synthRef.current.cancel();
            return totalSeconds;
          }
          return prev + 1;
        });
      }, 1000 / playbackSpeed);
    } else {
      if (timerRef.current) clearInterval(timerRef.current);
      if (synthRef.current) synthRef.current.cancel();
    }

    return () => {
      if (timerRef.current) clearInterval(timerRef.current);
    };
  }, [isPlaying, totalSeconds, playbackSpeed, videoLoaded]);

  // Read segment text when segment changes during playback (simulation mode only)
  useEffect(() => {
    if (isPlaying && activeSegment && !videoLoaded) {
      speakText(activeSegment.text);
    }
  }, [activeSegmentIndex, isPlaying, videoLoaded]);

  const handleSelectVideo = (video: VideoLesson) => {
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(false);
    setSelectedVideo(video);
    setCurrentSeconds(0);
    setActiveTopicFilter('all');
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      videoRef.current.pause();
    }
  };

  const handleTogglePlay = () => {
    if (currentSeconds >= totalSeconds) {
      setCurrentSeconds(0);
      if (videoRef.current) videoRef.current.currentTime = 0;
    }
    
    if (videoRef.current && videoLoaded) {
      if (isPlaying) {
        videoRef.current.pause();
        setIsPlaying(false);
      } else {
        videoRef.current.play().then(() => setIsPlaying(true)).catch(() => setIsPlaying(false));
      }
    } else {
      setIsPlaying(!isPlaying);
    }
  };

  const handleRestart = () => {
    if (synthRef.current) synthRef.current.cancel();
    setCurrentSeconds(0);
    if (videoRef.current) {
      videoRef.current.currentTime = 0;
      if (videoLoaded) videoRef.current.play();
    }
    setIsPlaying(true);
  };

  const handleSeek = (e: React.ChangeEvent<HTMLInputElement>) => {
    const sec = parseInt(e.target.value, 10);
    setCurrentSeconds(sec);
    if (videoRef.current && videoLoaded) {
      videoRef.current.currentTime = sec;
    }
    if (synthRef.current) synthRef.current.cancel();
  };

  const handleJumpToSegment = (seconds: number) => {
    setCurrentSeconds(seconds);
    if (videoRef.current && videoLoaded) {
      videoRef.current.currentTime = seconds;
    }
    if (synthRef.current) synthRef.current.cancel();
    setIsPlaying(true);
    if (videoRef.current && videoLoaded) {
      videoRef.current.play();
    }
  };

  const handleLocalVideoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const url = URL.createObjectURL(file);
      setVideoFileUrl(url);
      setVideoLoaded(true);
      if (synthRef.current) synthRef.current.cancel();
      // Select video-4 automatically if upload
      const vid4 = VIDEO_LESSONS.find(v => v.id === 'video-4');
      if (vid4) setSelectedVideo(vid4);
      setTimeout(() => {
        if (videoRef.current) {
          videoRef.current.currentTime = 0;
          videoRef.current.play().then(() => setIsPlaying(true)).catch(() => {});
        }
      }, 200);
    }
  };

  const formatTime = (secs: number) => {
    const m = Math.floor(secs / 60).toString().padStart(2, '0');
    const s = (secs % 60).toString().padStart(2, '0');
    return `${m}:${s}`;
  };

  // Distinct topics for Video 4
  const topics = ['all', 'Tổng Quan', 'Thiên Y', 'Sinh Khí', 'Diên Niên', 'Phục Vị', 'Tuyệt Mệnh', 'Ngũ Quỷ', 'Lục Sát', 'Họa Hại', 'Tổng Kết'];

  const filteredSegments = selectedVideo.segments.filter(seg => {
    if (activeTopicFilter === 'all' || !seg.topic) return true;
    return seg.topic.toLowerCase() === activeTopicFilter.toLowerCase();
  });

  return (
    <div className="space-y-8 pb-12">
      {/* Tiêu đề Module Video */}
      <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-xs relative overflow-hidden">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-amber-100 text-amber-900 text-sm font-bold mb-3 border border-amber-300">
              <Film className="w-4 h-4 text-amber-700" />
              <span>Kho Video Bài Giảng Cốt Lõi (4 Video Giải Mã &amp; Podcast Thực Chiến)</span>
            </div>
            <h2 className="text-2xl sm:text-3xl lg:text-4xl font-black text-slate-900 tracking-tight font-serif mb-2">
              Video Giảng Giải Bát Cực Linh Số &amp; Cải Vận
            </h2>
            <p className="text-base sm:text-lg text-slate-600 leading-relaxed font-medium">
              Tuyển tập 4 bài giảng video trực quan chuyên sâu về mật mã số sim điện thoại, nguyên lý Thiên Hung – Địa Cát và trọn bộ podcast 10:48 phân tích 8 Từ Trường qua 4 trụ cột cuộc đời.
            </p>
          </div>

          <div className="flex flex-col sm:flex-row items-start sm:items-center gap-3 shrink-0">
            {/* Nút tải video postcat.mp4 từ máy */}
            <input 
              type="file" 
              ref={fileInputRef} 
              accept="video/mp4,video/*" 
              className="hidden" 
              onChange={handleLocalVideoUpload} 
            />
            <button
              type="button"
              onClick={() => fileInputRef.current?.click()}
              className="inline-flex items-center gap-2 px-4 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-amber-300 text-xs sm:text-sm font-bold transition-all shadow-xs cursor-pointer border border-amber-500/40"
              title="Nhấn để tải hoặc chọn file video postcat.mp4 từ máy tính của bạn"
            >
              <Upload className="w-4 h-4 text-amber-400" />
              <span>{videoLoaded ? 'Đã Tải File Video Gốc' : 'Chọn File Video (postcat.mp4)'}</span>
            </button>

            <div className="flex items-center gap-2">
              <RedSealStamp text="玄道" subtext="Video" className="w-10 h-10" />
              <span className="text-xs font-bold text-slate-500 uppercase tracking-widest hidden md:inline">
                Huyền Đạo Đỗ Gia 4311
              </span>
            </div>
          </div>
        </div>

        {/* Thông báo cập nhật Video 4 */}
        <div className="mt-4 p-3.5 rounded-2xl bg-gradient-to-r from-amber-500/15 via-red-500/10 to-amber-500/15 border border-amber-300 flex items-center justify-between flex-wrap gap-2 text-xs sm:text-sm font-semibold text-amber-950">
          <div className="flex items-center gap-2">
            <Sparkles className="w-4 h-4 text-amber-700 shrink-0" />
            <span>Mới bổ sung: <strong>Video 4 (Podcast 10:48)</strong> phân tích toàn diện Tính Cách – Tài Vận – Gia Đạo – Sức Khỏe của 8 Từ Trường!</span>
          </div>
          {videoLoaded ? (
            <span className="inline-flex items-center gap-1 text-emerald-700 bg-emerald-100 px-2.5 py-0.5 rounded-full font-bold text-xs">
              <Check className="w-3.5 h-3.5" /> Đang phát file MP4 gốc
            </span>
          ) : (
            <span className="text-slate-600 text-xs">
              Hỗ trợ xem mô phỏng phân đoạn âm thanh hoặc chọn phát trực tiếp file <code>postcat.mp4</code>.
            </span>
          )}
        </div>

        {/* Thanh chọn 4 Video Bài Giảng */}
        <div className="mt-6 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3.5 border-t border-slate-100 pt-6">
          {VIDEO_LESSONS.map((video, idx) => {
            const isSelected = selectedVideo.id === video.id;
            return (
              <button
                key={video.id}
                type="button"
                onClick={() => handleSelectVideo(video)}
                className={`p-4 rounded-2xl border-2 text-left transition-all cursor-pointer flex flex-col justify-between relative ${
                  isSelected
                    ? 'border-amber-600 bg-amber-50/70 shadow-md ring-2 ring-amber-400/20'
                    : 'border-slate-200 bg-slate-50 hover:bg-white hover:border-slate-300'
                }`}
              >
                {video.id === 'video-4' && (
                  <span className="absolute -top-2.5 right-3 bg-red-600 text-white text-[10px] font-black uppercase px-2 py-0.5 rounded-full tracking-wider shadow-xs">
                    Mới Bổ Sung
                  </span>
                )}
                <div>
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      isSelected ? 'bg-amber-600 text-white' : 'bg-slate-200 text-slate-700'
                    }`}>
                      {video.badge}
                    </span>
                    <span className="text-xs font-mono font-bold text-slate-500 flex items-center gap-1">
                      <Clock className="w-3.5 h-3.5" />
                      {video.duration}
                    </span>
                  </div>
                  <h3 className="text-base font-bold text-slate-900 line-clamp-2 leading-snug font-serif">
                    {video.title}
                  </h3>
                </div>
                <div className="mt-3 pt-2 border-t border-slate-200/60 text-xs font-semibold text-amber-800 flex items-center justify-between">
                  <span>{video.id === 'video-4' ? 'Xem Podcast 10:48' : `Xem bài giảng ${idx + 1}`}</span>
                  <ArrowRight className="w-3.5 h-3.5" />
                </div>
              </button>
            );
          })}
        </div>
      </div>

      {/* KHUNG TRÌNH CHIẾU VIDEO CHÍNH (PLAYER & NỘI DUNG TƯƠNG TÁC) */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
        
        {/* Cột Trái: Trình Video Player */}
        <div className="lg:col-span-6 xl:col-span-5 flex flex-col items-center">
          <div className="w-full max-w-md bg-slate-950 rounded-3xl p-3 sm:p-4 shadow-2xl border-4 border-amber-900/60 relative">
            
            {/* 4 Hoa văn góc cổ điển */}
            <CornerOrnament position="top-left" className="absolute top-2 left-2 text-amber-500/70 z-30" />
            <CornerOrnament position="top-right" className="absolute top-2 right-2 text-amber-500/70 z-30" />

            {/* Màn hình Video Screen */}
            <div className="relative aspect-[9/16] w-full rounded-2xl overflow-hidden bg-gradient-to-b from-slate-900 via-slate-950 to-black text-white flex flex-col justify-between p-5 select-none shadow-inner border border-slate-800">
              
              {/* Header Trên Màn Hình Video */}
              <div className="relative z-20 flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full bg-red-500 animate-pulse" />
                  <span className="text-xs font-bold uppercase tracking-wider text-amber-300 font-mono">
                    {selectedVideo.id === 'video-4' ? 'PODCAST 8 TỪ TRƯỜNG' : 'LINH SỐ BÁT PHÁP'}
                  </span>
                </div>
                <span className="text-xs bg-black/60 backdrop-blur-xs px-2.5 py-1 rounded-full text-slate-300 font-mono">
                  {formatTime(currentSeconds)} / {selectedVideo.duration}
                </span>
              </div>

              {/* NẾU ĐÃ LOAD FILE MP4 GỐC */}
              {videoLoaded && videoFileUrl ? (
                <div className="absolute inset-0 z-10 bg-black flex items-center justify-center">
                  <video
                    ref={videoRef}
                    src={videoFileUrl}
                    className="w-full h-full object-contain"
                    playsInline
                    onTimeUpdate={() => {
                      if (videoRef.current) {
                        setCurrentSeconds(Math.floor(videoRef.current.currentTime));
                      }
                    }}
                    onEnded={() => setIsPlaying(false)}
                    onClick={handleTogglePlay}
                  />
                </div>
              ) : (
                /* NỘI DUNG ĐỒ HỌA TRỰC QUAN CỦA PHÂN ĐOẠN HIỆN TẠI (CHẾ ĐỘ MÔ PHỎNG) */
                <div className="relative z-10 flex-1 flex flex-col items-center justify-center text-center my-4 px-2">
                  
                  {/* Topic badge nếu có */}
                  {activeSegment.topic && (
                    <span className="px-3 py-1 rounded-full bg-amber-500 text-slate-950 font-black text-xs uppercase tracking-wider mb-2 shadow-md">
                      Trọng Điểm: {activeSegment.topic}
                    </span>
                  )}

                  {/* Visual Note Card */}
                  <div className="p-4 rounded-2xl bg-white/10 backdrop-blur-md border border-white/15 w-full shadow-lg mb-4">
                    <span className="text-[11px] font-bold uppercase tracking-widest text-amber-400 block mb-1">
                      Cảnh Minh Họa • {activeSegment.time}
                    </span>
                    <p className="text-sm sm:text-base text-white font-medium leading-snug">
                      {activeSegment.visualNote}
                    </p>
                  </div>

                  {/* Hiển thị số đặc biệt trong cảnh nếu có */}
                  {activeSegment.highlightNumbers && (
                    <div className="flex flex-wrap items-center justify-center gap-2 my-2 animate-bounce">
                      {activeSegment.highlightNumbers.map((num, i) => (
                        <span
                          key={i}
                          className="px-3.5 py-1.5 rounded-xl bg-amber-400 text-slate-950 font-black text-lg sm:text-xl font-mono shadow-md"
                        >
                          {num}
                        </span>
                      ))}
                    </div>
                  )}

                  {/* Subtitle Chạy Chữ To Rõ */}
                  <div className="mt-3 p-3.5 rounded-2xl bg-black/75 border border-amber-500/30 max-w-sm">
                    <p className="text-base sm:text-lg font-bold text-amber-200 leading-snug font-serif">
                      "{activeSegment.text}"
                    </p>
                  </div>
                </div>
              )}

              {/* Nút Play/Pause Lớn Khi Dừng */}
              {!isPlaying && (
                <div 
                  onClick={handleTogglePlay}
                  className="absolute inset-0 z-30 bg-black/40 backdrop-blur-2xs flex items-center justify-center cursor-pointer group"
                >
                  <div className="w-20 h-20 rounded-full bg-amber-500/90 group-hover:bg-amber-400 text-slate-950 flex items-center justify-center shadow-2xl transform group-hover:scale-110 transition-all">
                    <Play className="w-10 h-10 fill-current ml-1" />
                  </div>
                </div>
              )}

              {/* Thanh Điều Khiển Dưới Màn Hình Video */}
              <div className="relative z-20 space-y-2 pt-2 bg-gradient-to-t from-black/80 to-transparent">
                {/* Thanh Tua Scrub Slider */}
                <input
                  type="range"
                  min="0"
                  max={totalSeconds}
                  value={currentSeconds}
                  onChange={handleSeek}
                  className="w-full accent-amber-400 h-2 bg-slate-700 rounded-lg cursor-pointer"
                />

                <div className="flex items-center justify-between text-xs text-slate-300 pt-1">
                  <div className="flex items-center gap-3">
                    <button
                      type="button"
                      onClick={handleTogglePlay}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                      title={isPlaying ? 'Tạm dừng' : 'Phát tiếp'}
                    >
                      {isPlaying ? <Pause className="w-4 h-4" /> : <Play className="w-4 h-4 fill-current" />}
                    </button>
                    <button
                      type="button"
                      onClick={handleRestart}
                      className="p-2 rounded-lg bg-white/20 hover:bg-white/30 text-white cursor-pointer"
                      title="Xem lại từ đầu"
                    >
                      <RotateCcw className="w-4 h-4" />
                    </button>
                    {!videoLoaded && speechSupported && (
                      <button
                        type="button"
                        onClick={() => {
                          setIsMuted(!isMuted);
                          if (!isMuted && synthRef.current) synthRef.current.cancel();
                        }}
                        className={`p-2 rounded-lg cursor-pointer transition-colors ${
                          isMuted ? 'bg-rose-500/30 text-rose-300' : 'bg-emerald-500/30 text-emerald-300'
                        }`}
                        title={isMuted ? 'Bật đọc thuyết minh tiếng Việt' : 'Tắt đọc thuyết minh'}
                      >
                        {isMuted ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
                      </button>
                    )}
                  </div>

                  {/* Tốc độ đọc/chạy video */}
                  <div className="flex items-center gap-1 bg-white/10 px-2 py-1 rounded-md">
                    <button
                      type="button"
                      onClick={() => {
                        const newSpeed = playbackSpeed === 1 ? 1.25 : playbackSpeed === 1.25 ? 1.5 : 1;
                        setPlaybackSpeed(newSpeed);
                        if (videoRef.current) videoRef.current.playbackRate = newSpeed;
                      }}
                      className="text-xs font-bold text-amber-300 cursor-pointer"
                    >
                      {playbackSpeed}x
                    </button>
                  </div>
                </div>
              </div>

            </div>

            <div className="mt-3 flex items-center justify-between text-xs text-amber-200/80 font-medium px-1">
              <span>
                {videoLoaded 
                  ? 'Đang phát video thực tế (postcat.mp4)'
                  : speechSupported 
                    ? 'Trình mô phỏng hỗ trợ giọng thuyết minh tự động'
                    : 'Bấm Play để xem phụ đề & diễn biến'}
              </span>
              <button 
                type="button"
                onClick={() => fileInputRef.current?.click()}
                className="text-amber-400 hover:text-amber-300 underline cursor-pointer"
              >
                {videoLoaded ? 'Đổi video' : 'Nạp file mp4'}
              </button>
            </div>
          </div>
        </div>

        {/* Cột Phải: Phân Tích Chuyên Sâu, Khẩu Quyết & Bộ Số */}
        <div className="lg:col-span-6 xl:col-span-7 space-y-6">
          
          {/* Thông Tin Chi Tiết Bài Giảng */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-900">
                {selectedVideo.category}
              </span>
              <span className="text-xs font-medium text-slate-500">
                Thời lượng: {selectedVideo.duration}
              </span>
            </div>

            <h3 className="text-2xl sm:text-3xl font-extrabold text-slate-900 font-serif leading-tight mb-3">
              {selectedVideo.title}
            </h3>

            <p className="text-base sm:text-lg text-slate-700 leading-relaxed font-medium mb-5 bg-amber-50/50 p-4 rounded-2xl border border-amber-200">
              {selectedVideo.summary}
            </p>

            {/* ĐIỂM MẤU CHỐT CỦA BÀI GIẢNG */}
            <div className="space-y-3">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Sparkles className="w-5 h-5 text-amber-600" />
                <span>Những Điểm Mấu Chốt Bắt Buộc Nhớ:</span>
              </h4>
              <ul className="space-y-2.5">
                {selectedVideo.keyTakeaways.map((point, index) => (
                  <li key={index} className="flex items-start gap-3 p-3 rounded-xl bg-slate-50 border border-slate-200">
                    <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 mt-0.5" />
                    <span className="text-sm sm:text-base text-slate-800 font-medium leading-relaxed">
                      {point}
                    </span>
                  </li>
                ))}
              </ul>
            </div>
          </div>

          {/* NẾU LÀ VIDEO 4: BẢNG TRA CỨU 4 TRỤ CỘT CỦA 8 TỪ TRƯỜNG */}
          {selectedVideo.id === 'video-4' && (
            <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
              <div className="flex items-center justify-between mb-4 flex-wrap gap-2">
                <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                  <Headphones className="w-5 h-5 text-amber-600" />
                  <span>Tra Cứu Nhanh 4 Trụ Cột 8 Từ Trường Trong Podcast</span>
                </h4>
                <span className="text-xs bg-amber-100 text-amber-900 px-2.5 py-1 rounded-full font-bold">
                  8 Từ Trường Chân Truyền
                </span>
              </div>

              {/* Tabs chọn 8 từ trường */}
              <div className="flex flex-wrap gap-1.5 mb-5 pb-3 border-b border-slate-100">
                {TU_TRUONG_4_TRU_COT.map((item) => (
                  <button
                    key={item.name}
                    type="button"
                    onClick={() => setActive4TruCotTab(item.name)}
                    className={`px-3 py-1.5 rounded-xl font-bold text-xs sm:text-sm transition-all cursor-pointer ${
                      active4TruCotTab === item.name
                        ? 'bg-amber-600 text-white shadow-xs'
                        : 'bg-slate-100 text-slate-700 hover:bg-slate-200'
                    }`}
                  >
                    {item.name}
                  </button>
                ))}
              </div>

              {/* Chi tiết từ trường được chọn */}
              {(() => {
                const cur = TU_TRUONG_4_TRU_COT.find(t => t.name === active4TruCotTab) || TU_TRUONG_4_TRU_COT[0];
                return (
                  <div className={`p-5 rounded-2xl border ${cur.themeColor} space-y-4`}>
                    <div className="flex items-center justify-between flex-wrap gap-2">
                      <div className="flex items-center gap-2">
                        <span className={`px-3 py-1 rounded-full text-xs font-bold ${cur.badgeColor}`}>
                          {cur.type}
                        </span>
                        <h5 className="text-xl font-black font-serif text-slate-900">
                          Từ Trường {cur.name}
                        </h5>
                      </div>
                      <span className="font-mono font-bold text-xs bg-white/80 px-2.5 py-1 rounded-md text-slate-800">
                        Các Cặp: {cur.numbers}
                      </span>
                    </div>

                    <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5 pt-2">
                      <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="text-xs font-black uppercase tracking-wider text-blue-700 block mb-1">
                          1. Về Tính Cách
                        </span>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {cur.tinhCach}
                        </p>
                      </div>

                      <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="text-xs font-black uppercase tracking-wider text-amber-700 block mb-1">
                          2. Về Tài Vận
                        </span>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {cur.taiVan}
                        </p>
                      </div>

                      <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="text-xs font-black uppercase tracking-wider text-emerald-700 block mb-1">
                          3. Về Gia Đạo
                        </span>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {cur.giaDao}
                        </p>
                      </div>

                      <div className="bg-white/90 p-3.5 rounded-xl border border-slate-200/80 shadow-2xs">
                        <span className="text-xs font-black uppercase tracking-wider text-rose-700 block mb-1">
                          4. Về Sức Khỏe
                        </span>
                        <p className="text-sm text-slate-800 font-medium leading-relaxed">
                          {cur.sucKhoe}
                        </p>
                      </div>
                    </div>
                  </div>
                );
              })()}
            </div>
          )}

          {/* Các Bộ Số Nhắc Đến Trong Video & Nút Tra Cứu Thực Hành */}
          <div className="bg-white rounded-3xl p-6 sm:p-7 border border-slate-200 shadow-xs">
            <h4 className="text-lg font-bold text-slate-900 mb-4 flex items-center gap-2">
              <Hash className="w-5 h-5 text-blue-700" />
              <span>Thực Hành Tra Cứu Các Bộ Số Trong Video Này</span>
            </h4>

            {/* Cặp Số Đề Xuất Nên Dùng */}
            <div className="mb-4">
              <span className="text-xs font-bold text-emerald-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldCheck className="w-4 h-4 text-emerald-600" />
                <span>Cát Tinh &amp; Cặp Số Đột Phá:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.recommendedNumbers.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      onQuickLookup(num);
                      if (onNavigateToTab) onNavigateToTab('lookup');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-emerald-50 hover:bg-emerald-100 text-emerald-900 border border-emerald-300 font-mono font-bold text-base transition-colors flex items-center gap-1.5 cursor-pointer"
                    title={`Nhấp để phân tích cặp ${num}`}
                  >
                    <span>{num}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-emerald-700" />
                  </button>
                ))}
              </div>
            </div>

            {/* Cặp Số Cần Lưu Ý Hóa Giải */}
            <div>
              <span className="text-xs font-bold text-rose-800 uppercase tracking-wider block mb-2 flex items-center gap-1.5">
                <ShieldAlert className="w-4 h-4 text-rose-600" />
                <span>Hung Số &amp; Biến Số Cần Tránh / Cần Hóa Giải:</span>
              </span>
              <div className="flex flex-wrap gap-2">
                {selectedVideo.warningNumbers.map((num) => (
                  <button
                    key={num}
                    type="button"
                    onClick={() => {
                      onQuickLookup(num);
                      if (onNavigateToTab) onNavigateToTab('lookup');
                    }}
                    className="px-3.5 py-2 rounded-xl bg-rose-50 hover:bg-rose-100 text-rose-900 border border-rose-300 font-mono font-bold text-base transition-colors flex items-center gap-1.5 cursor-pointer"
                    title={`Nhấp để phân tích hung số ${num}`}
                  >
                    <span>{num}</span>
                    <ArrowRight className="w-3.5 h-3.5 text-rose-700" />
                  </button>
                ))}
              </div>
            </div>
          </div>

          {/* Dòng Thời Gian Phân Cảnh Toàn Bộ Video (Transcript Timeline) */}
          <div className="bg-slate-50 rounded-3xl p-6 border border-slate-200">
            <div className="flex items-center justify-between mb-3 flex-wrap gap-2">
              <h4 className="text-lg font-bold text-slate-900 flex items-center gap-2">
                <Clock className="w-5 h-5 text-slate-600" />
                <span>Dòng Thời Gian Phân Cảnh ({filteredSegments.length} Phân Cảnh)</span>
              </h4>
              <span className="text-xs text-slate-500 font-medium">
                Bấm vào phân cảnh để phát ngay mốc đó
              </span>
            </div>

            {/* Bộ lọc chủ đề cho Video 4 */}
            {selectedVideo.id === 'video-4' && (
              <div className="flex items-center gap-1.5 overflow-x-auto pb-2 mb-3 scrollbar-none">
                {topics.map((t) => (
                  <button
                    key={t}
                    type="button"
                    onClick={() => setActiveTopicFilter(t)}
                    className={`px-2.5 py-1 rounded-lg text-xs font-bold whitespace-nowrap cursor-pointer transition-colors ${
                      activeTopicFilter === t
                        ? 'bg-amber-600 text-white'
                        : 'bg-white border border-slate-200 text-slate-600 hover:bg-slate-100'
                    }`}
                  >
                    {t === 'all' ? 'Tất Cả' : t}
                  </button>
                ))}
              </div>
            )}

            <div className="space-y-2 max-h-72 overflow-y-auto pr-1">
              {filteredSegments.map((seg, idx) => {
                const isActive = activeSegmentIndex === idx;
                return (
                  <div
                    key={idx}
                    onClick={() => handleJumpToSegment(seg.seconds)}
                    className={`p-3 rounded-xl border text-sm transition-all cursor-pointer flex items-start gap-3 ${
                      isActive
                        ? 'bg-amber-100/90 border-amber-400 font-bold text-amber-950 shadow-xs'
                        : 'bg-white border-slate-200 text-slate-700 hover:bg-slate-100'
                    }`}
                  >
                    <span className="font-mono text-xs font-bold px-2 py-0.5 rounded bg-slate-200 text-slate-800 shrink-0">
                      {seg.time}
                    </span>
                    <div className="flex-1 min-w-0">
                      {seg.topic && (
                        <span className="text-[11px] font-black uppercase text-amber-700 block mb-0.5">
                          • {seg.topic}
                        </span>
                      )}
                      <p className="line-clamp-2 leading-relaxed">
                        {seg.text}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>

        </div>

      </div>
    </div>
  );
};
