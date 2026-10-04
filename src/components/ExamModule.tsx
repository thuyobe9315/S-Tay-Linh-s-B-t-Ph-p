import React, { useState } from 'react';
import { 
  FileCheck2, 
  CheckCircle2, 
  XCircle, 
  RotateCcw, 
  Award, 
  BookOpen, 
  HelpCircle, 
  Check, 
  ChevronRight, 
  ChevronLeft, 
  Filter, 
  Sparkles, 
  Layers, 
  ArrowRight,
  Eye,
  GraduationCap
} from 'lucide-react';
import { EXAM_QUESTIONS, ExamQuestion } from '../data/examQuestionsData';
import { NavTab } from './Navigation';

interface ExamModuleProps {
  onNavigateToTab?: (tab: NavTab) => void;
}

export const ExamModule: React.FC<ExamModuleProps> = ({ onNavigateToTab }) => {
  // Mode: 'quiz' (Làm bài thi trắc nghiệm tương tác) | 'study' (Bộ câu hỏi & Câu trả lời hoàn chỉnh)
  const [activeMode, setActiveMode] = useState<'quiz' | 'study'>('quiz');
  const [selectedCategory, setSelectedCategory] = useState<string>('all');

  // Quiz state
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [userAnswers, setUserAnswers] = useState<Record<number, 'A' | 'B' | 'C' | 'D'>>({});
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);
  const [showReviewOnly, setShowReviewOnly] = useState<boolean>(false);

  // Filtered questions for study mode
  const filteredQuestions = selectedCategory === 'all'
    ? EXAM_QUESTIONS
    : EXAM_QUESTIONS.filter(q => q.category === selectedCategory);

  const totalQuestions = EXAM_QUESTIONS.length;
  const currentQ = EXAM_QUESTIONS[currentQuestionIndex];

  // Calculate score
  const score = Object.entries(userAnswers).reduce((acc, [qId, answer]) => {
    const q = EXAM_QUESTIONS.find(item => item.id === Number(qId));
    if (q && q.correctAnswer === answer) {
      return acc + 1;
    }
    return acc;
  }, 0);

  const percentage = Math.round((score / totalQuestions) * 100);

  const handleSelectOption = (questionId: number, optionKey: 'A' | 'B' | 'C' | 'D') => {
    if (isSubmitted) return;
    setUserAnswers(prev => ({
      ...prev,
      [questionId]: optionKey
    }));
  };

  const handleRestartQuiz = () => {
    setUserAnswers({});
    setIsSubmitted(false);
    setCurrentQuestionIndex(0);
    setShowReviewOnly(false);
  };

  const answeredCount = Object.keys(userAnswers).length;

  return (
    <div className="space-y-8 animate-in fade-in duration-300">
      {/* Top Banner / Hero */}
      <div className="relative rounded-3xl overflow-hidden bg-gradient-to-r from-red-950 via-slate-900 to-amber-950 border-2 border-red-500/50 shadow-2xl p-6 sm:p-10 text-white">
        <div className="relative z-10 flex flex-col lg:flex-row lg:items-center justify-between gap-6">
          <div className="space-y-3 max-w-2xl">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="px-3.5 py-1 rounded-full bg-gradient-to-r from-red-600 to-amber-600 text-white text-xs font-black uppercase tracking-wider shadow-sm flex items-center gap-1.5">
                <FileCheck2 className="w-4 h-4 text-amber-200" />
                <span>BÀI KIỂM TRA NĂNG LỰC</span>
              </span>
              <span className="px-3 py-1 rounded-full bg-amber-400/20 text-amber-200 text-xs font-bold border border-amber-400/30">
                15 Câu Hỏi &amp; Đáp Án Chuẩn Bát Cực Linh Số
              </span>
            </div>

            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight text-white">
              BÀI KIỂM TRA BÁT CỰC LINH SỐ
            </h1>

            <p className="text-sm sm:text-base text-slate-300 leading-relaxed font-normal">
              Đánh giá mức độ thấu hiểu của bạn về <strong>Tứ Đại Cát Tinh, Tứ Đại Hung Tinh</strong>, năng lượng lượng tử của <strong>Số 0 &amp; Số 5</strong>, cảnh báo <strong>Vùng Tử Địa</strong> và kỹ năng tự luận đoán sim điện thoại.
            </p>
          </div>

          {/* Mode Switcher Tabs */}
          <div className="flex flex-col sm:flex-row items-center gap-2.5 bg-slate-950/80 p-2 rounded-2xl border border-amber-500/40 shrink-0">
            <button
              type="button"
              onClick={() => setActiveMode('quiz')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeMode === 'quiz'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <FileCheck2 className="w-4 h-4" />
              <span>Làm Bài Trắc Nghiệm</span>
            </button>

            <button
              type="button"
              onClick={() => setActiveMode('study')}
              className={`w-full sm:w-auto flex items-center justify-center gap-2 px-5 py-3 rounded-xl font-bold text-sm transition-all cursor-pointer ${
                activeMode === 'study'
                  ? 'bg-gradient-to-r from-red-600 to-amber-600 text-white shadow-md'
                  : 'text-amber-200 hover:text-white'
              }`}
            >
              <BookOpen className="w-4 h-4" />
              <span>Bộ Câu Hỏi &amp; Đáp Án</span>
            </button>
          </div>
        </div>
      </div>

      {/* MODE 1: LÀM BÀI TRẮC NGHIỆM TƯƠNG TÁC (QUIZ MODE) */}
      {activeMode === 'quiz' && (
        <div className="space-y-6">
          {/* Header trạng thái làm bài */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <span className="w-10 h-10 rounded-xl bg-amber-100 text-amber-900 font-bold flex items-center justify-center text-sm">
                {currentQuestionIndex + 1}/{totalQuestions}
              </span>
              <div>
                <p className="text-xs text-slate-500 font-medium">Tiến độ hoàn thành</p>
                <p className="text-sm font-bold text-slate-800">
                  Đã trả lời {answeredCount}/{totalQuestions} câu
                </p>
              </div>
            </div>

            {/* Quick Question Picker Dots */}
            <div className="flex items-center gap-1.5 flex-wrap">
              {EXAM_QUESTIONS.map((q, idx) => {
                const isAnswered = !!userAnswers[q.id];
                const isCurrent = idx === currentQuestionIndex;
                const isCorrect = isSubmitted && userAnswers[q.id] === q.correctAnswer;
                const isWrong = isSubmitted && userAnswers[q.id] && userAnswers[q.id] !== q.correctAnswer;

                let dotClass = 'bg-slate-100 text-slate-600 border-slate-300';
                if (isCurrent) dotClass = 'ring-2 ring-red-500 font-black';
                if (isSubmitted) {
                  if (isCorrect) dotClass = 'bg-emerald-600 text-white border-emerald-600';
                  else if (isWrong) dotClass = 'bg-rose-600 text-white border-rose-600';
                  else dotClass = 'bg-slate-200 text-slate-500 border-slate-300';
                } else if (isAnswered) {
                  dotClass = 'bg-amber-600 text-white border-amber-600';
                }

                return (
                  <button
                    key={q.id}
                    type="button"
                    onClick={() => setCurrentQuestionIndex(idx)}
                    className={`w-7 h-7 rounded-lg text-xs font-bold border flex items-center justify-center transition-all cursor-pointer ${dotClass}`}
                    title={`Câu ${idx + 1}`}
                  >
                    {idx + 1}
                  </button>
                );
              })}
            </div>

            {/* Nút hành động */}
            <div className="flex items-center gap-2">
              <button
                type="button"
                onClick={handleRestartQuiz}
                className="px-3.5 py-2 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs flex items-center gap-1.5 transition-colors cursor-pointer"
                title="Làm lại từ đầu"
              >
                <RotateCcw className="w-3.5 h-3.5" />
                <span>Làm lại</span>
              </button>

              {!isSubmitted ? (
                <button
                  type="button"
                  onClick={() => setIsSubmitted(true)}
                  className="px-4 py-2 rounded-xl bg-gradient-to-r from-red-600 to-amber-600 hover:from-red-700 hover:to-amber-700 text-white font-bold text-xs uppercase tracking-wider shadow-sm flex items-center gap-1.5 transition-all cursor-pointer"
                >
                  <Check className="w-4 h-4" />
                  <span>Nộp Bài Chấm Điểm</span>
                </button>
              ) : (
                <span className="px-3 py-1.5 rounded-xl bg-emerald-100 text-emerald-800 font-bold text-xs flex items-center gap-1 border border-emerald-300">
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Đã chấm điểm: {score}/{totalQuestions} ({percentage}%)</span>
                </span>
              )}
            </div>
          </div>

          {/* KẾT QUẢ NẾU ĐÃ NỘP BÀI */}
          {isSubmitted && (
            <div className="bg-gradient-to-br from-amber-50 via-white to-orange-50 rounded-3xl p-6 sm:p-8 border-2 border-amber-300 shadow-md">
              <div className="flex flex-col sm:flex-row items-center justify-between gap-6">
                <div className="flex items-center gap-5">
                  <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-amber-600 to-red-600 text-white flex items-center justify-center shadow-lg ring-4 ring-amber-300/50 shrink-0">
                    <Award className="w-10 h-10 text-amber-100" />
                  </div>
                  <div>
                    <span className="text-xs font-black uppercase tracking-wider px-2.5 py-0.5 rounded bg-amber-200 text-amber-900">
                      KẾT QUẢ BÀI KIỂM TRA
                    </span>
                    <h3 className="text-2xl font-black text-slate-900 mt-1 font-serif">
                      Điểm Số: {score}/{totalQuestions} ({percentage}%)
                    </h3>
                    <p className="text-sm text-slate-700 mt-0.5">
                      {percentage >= 80 ? (
                        <span className="text-emerald-700 font-bold">
                          🎉 Xuất sắc! Bạn đã nắm rất vững kiến thức 14 Slide Lượng Tử &amp; Bát Cực Linh Số của Cô Giáo Đỗ Gia.
                        </span>
                      ) : percentage >= 50 ? (
                        <span className="text-amber-800 font-bold">
                          👍 Khá tốt! Bạn đã nắm được nền tảng cốt lõi, hãy xem lại phần giải thích để tránh các Vùng Tử Địa.
                        </span>
                      ) : (
                        <span className="text-rose-700 font-bold">
                          📖 Cần ôn luyện thêm! Hãy xem lại 14 Slide Bài Giảng để thấu hiểu sâu hơn năng lượng các con số.
                        </span>
                      )}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-2.5 flex-wrap">
                  <button
                    type="button"
                    onClick={() => setActiveMode('study')}
                    className="px-4 py-2.5 rounded-xl bg-white hover:bg-slate-50 text-slate-800 font-bold text-xs uppercase tracking-wider border border-slate-300 transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                  >
                    <Eye className="w-4 h-4 text-amber-600" />
                    <span>Xem Toàn Bộ Đáp Án</span>
                  </button>
                  {onNavigateToTab && (
                    <button
                      type="button"
                      onClick={() => onNavigateToTab('lectures')}
                      className="px-4 py-2.5 rounded-xl bg-amber-600 hover:bg-amber-700 text-white font-bold text-xs uppercase tracking-wider transition-colors flex items-center gap-1.5 cursor-pointer shadow-2xs"
                    >
                      <Layers className="w-4 h-4" />
                      <span>Ôn 14 Slide Lượng Tử</span>
                    </button>
                  )}
                </div>
              </div>
            </div>
          )}

          {/* HỘP CÂU HỎI HIỆN TẠI */}
          <div className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-md space-y-6">
            <div className="flex items-center justify-between gap-4 flex-wrap pb-4 border-b border-slate-100">
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-full bg-red-100 text-red-800 font-bold text-xs">
                  Câu hỏi {currentQuestionIndex + 1}
                </span>
                <span className="px-3 py-1 rounded-full bg-slate-100 text-slate-700 font-medium text-xs">
                  {currentQ.categoryLabel}
                </span>
                <span className="px-2.5 py-0.5 rounded text-[11px] font-semibold bg-amber-50 text-amber-800 border border-amber-200">
                  {currentQ.difficulty}
                </span>
              </div>

              {currentQ.slideRef && (
                <span className="text-xs font-bold text-amber-800 bg-amber-100/60 px-3 py-1 rounded-lg border border-amber-300/40">
                  Dẫn chứng: Slide {currentQ.slideRef}
                </span>
              )}
            </div>

            {/* Nội dung câu hỏi */}
            <h2 className="text-lg sm:text-xl font-bold text-slate-900 leading-snug font-serif">
              {currentQ.question}
            </h2>

            {/* Các lựa chọn A, B, C, D */}
            <div className="space-y-3 pt-2">
              {currentQ.options.map((opt) => {
                const isSelected = userAnswers[currentQ.id] === opt.key;
                const isThisCorrect = currentQ.correctAnswer === opt.key;
                
                let optContainerClass = 'border-slate-200 hover:border-amber-400 hover:bg-amber-50/30';
                let badgeClass = 'bg-slate-100 text-slate-700 border-slate-300';

                if (isSubmitted) {
                  if (isThisCorrect) {
                    optContainerClass = 'border-emerald-500 bg-emerald-50/70 text-emerald-950 font-bold';
                    badgeClass = 'bg-emerald-600 text-white border-emerald-600';
                  } else if (isSelected && !isThisCorrect) {
                    optContainerClass = 'border-rose-400 bg-rose-50 text-rose-950';
                    badgeClass = 'bg-rose-600 text-white border-rose-600';
                  }
                } else if (isSelected) {
                  optContainerClass = 'border-amber-600 bg-amber-50/60 text-slate-900 ring-2 ring-amber-400/40 font-medium';
                  badgeClass = 'bg-amber-600 text-white border-amber-600';
                }

                return (
                  <div
                    key={opt.key}
                    onClick={() => handleSelectOption(currentQ.id, opt.key)}
                    className={`flex items-start gap-3.5 p-4 rounded-2xl border-2 transition-all cursor-pointer ${optContainerClass}`}
                  >
                    <span className={`w-8 h-8 rounded-xl font-bold text-sm flex items-center justify-center shrink-0 border shadow-2xs ${badgeClass}`}>
                      {opt.key}
                    </span>
                    <span className="text-sm sm:text-base leading-relaxed pt-1">
                      {opt.text}
                    </span>
                    {isSubmitted && isThisCorrect && (
                      <CheckCircle2 className="w-5 h-5 text-emerald-600 shrink-0 ml-auto mt-1" />
                    )}
                    {isSubmitted && isSelected && !isThisCorrect && (
                      <XCircle className="w-5 h-5 text-rose-600 shrink-0 ml-auto mt-1" />
                    )}
                  </div>
                );
              })}
            </div>

            {/* Lời giải thích khi đã nộp bài */}
            {isSubmitted && (
              <div className="mt-6 p-5 rounded-2xl bg-amber-50 border-2 border-amber-300 text-slate-800 space-y-2">
                <div className="flex items-center gap-2 text-amber-900 font-bold text-sm">
                  <Sparkles className="w-4 h-4 text-amber-700" />
                  <span>Đáp Án Đúng: Đáp Án {currentQ.correctAnswer}</span>
                </div>
                <p className="text-xs sm:text-sm text-slate-700 leading-relaxed font-medium">
                  <strong>Lời giải thích chi tiết: </strong>{currentQ.explanation}
                </p>
                {currentQ.slideRef && onNavigateToTab && (
                  <button
                    type="button"
                    onClick={() => onNavigateToTab('lectures')}
                    className="inline-flex items-center gap-1.5 text-xs font-bold text-amber-800 hover:text-amber-950 underline mt-2"
                  >
                    <span>Xem lại Slide {currentQ.slideRef} trong bộ bài giảng</span>
                    <ArrowRight className="w-3.5 h-3.5" />
                  </button>
                )}
              </div>
            )}

            {/* Điều hướng chuyển câu hỏi */}
            <div className="flex items-center justify-between pt-4 border-t border-slate-100">
              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => Math.max(0, prev - 1))}
                disabled={currentQuestionIndex === 0}
                className="px-4 py-2.5 rounded-xl border border-slate-300 text-slate-700 hover:bg-slate-100 font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <ChevronLeft className="w-4 h-4" />
                <span>Câu Trước</span>
              </button>

              <span className="text-xs font-bold text-slate-500">
                Câu {currentQuestionIndex + 1} / {totalQuestions}
              </span>

              <button
                type="button"
                onClick={() => setCurrentQuestionIndex(prev => Math.min(totalQuestions - 1, prev + 1))}
                disabled={currentQuestionIndex === totalQuestions - 1}
                className="px-5 py-2.5 rounded-xl bg-slate-900 hover:bg-slate-800 text-white font-bold text-xs uppercase tracking-wider flex items-center gap-1.5 disabled:opacity-40 disabled:cursor-not-allowed cursor-pointer transition-colors"
              >
                <span>Câu Tiếp Theo</span>
                <ChevronRight className="w-4 h-4" />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* MODE 2: BỘ CÂU HỎI & CÂU TRẢ LỜI TOÀN TẬP (STUDY / REVIEW MODE) */}
      {activeMode === 'study' && (
        <div className="space-y-6">
          {/* Lọc chuyên đề */}
          <div className="bg-white rounded-2xl p-4 sm:p-5 border border-slate-200 shadow-xs flex flex-wrap items-center justify-between gap-4">
            <div className="flex items-center gap-2 flex-wrap">
              <span className="text-xs font-bold text-slate-500 uppercase tracking-wider flex items-center gap-1 mr-2">
                <Filter className="w-3.5 h-3.5" />
                <span>Chuyên Đề:</span>
              </span>
              {[
                { key: 'all', label: 'Tất Cả (15)' },
                { key: 'tu-cat', label: 'Tứ Đại Cát Tinh' },
                { key: 'tu-hung', label: 'Tứ Đại Hung Tinh' },
                { key: 'bien-so-0-5', label: 'Biến Số 0 & 5' },
                { key: 'quy-trinh', label: 'Quy Trình Luận Số' },
                { key: 'ung-dung', label: 'Ứng Dụng Thực Chiến' },
              ].map(cat => (
                <button
                  key={cat.key}
                  type="button"
                  onClick={() => setSelectedCategory(cat.key)}
                  className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                    selectedCategory === cat.key
                      ? 'bg-amber-600 text-white shadow-2xs'
                      : 'bg-slate-100 hover:bg-slate-200 text-slate-700'
                  }`}
                >
                  {cat.label}
                </button>
              ))}
            </div>

            <span className="text-xs font-bold text-slate-500">
              Hiển thị {filteredQuestions.length} câu hỏi &amp; câu trả lời
            </span>
          </div>

          {/* Danh sách toàn bộ câu hỏi và câu trả lời */}
          <div className="space-y-6">
            {filteredQuestions.map((q) => (
              <div 
                key={q.id}
                className="bg-white rounded-3xl p-6 sm:p-8 border border-slate-200 shadow-sm space-y-4"
              >
                <div className="flex items-center justify-between gap-2 flex-wrap pb-3 border-b border-slate-100">
                  <div className="flex items-center gap-2">
                    <span className="w-7 h-7 rounded-lg bg-red-100 text-red-900 font-bold text-xs flex items-center justify-center">
                      #{q.id}
                    </span>
                    <span className="px-2.5 py-0.5 rounded-full bg-slate-100 text-slate-700 text-xs font-medium">
                      {q.categoryLabel}
                    </span>
                  </div>
                  {q.slideRef && (
                    <span className="text-xs font-bold text-amber-800 bg-amber-100/70 px-2.5 py-0.5 rounded-md border border-amber-300/40">
                      Slide {q.slideRef} Lượng Tử
                    </span>
                  )}
                </div>

                <h3 className="text-base sm:text-lg font-bold text-slate-900 font-serif leading-snug">
                  {q.question}
                </h3>

                {/* 4 phương án */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5 pt-1">
                  {q.options.map(opt => {
                    const isCorrect = opt.key === q.correctAnswer;
                    return (
                      <div
                        key={opt.key}
                        className={`p-3 rounded-xl border flex items-start gap-2.5 text-xs sm:text-sm ${
                          isCorrect
                            ? 'bg-emerald-50 border-emerald-400 text-emerald-950 font-bold'
                            : 'bg-slate-50/60 border-slate-200 text-slate-700'
                        }`}
                      >
                        <span className={`w-5 h-5 rounded-md font-bold text-xs flex items-center justify-center shrink-0 ${
                          isCorrect ? 'bg-emerald-600 text-white' : 'bg-slate-200 text-slate-700'
                        }`}>
                          {opt.key}
                        </span>
                        <span className="pt-0.5">{opt.text}</span>
                        {isCorrect && (
                          <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 ml-auto mt-0.5" />
                        )}
                      </div>
                    );
                  })}
                </div>

                {/* Phần Câu Trả Lời & Giải Thích Chi Tiết */}
                <div className="p-4 rounded-2xl bg-amber-50/80 border border-amber-200 text-xs sm:text-sm space-y-1">
                  <div className="flex items-center gap-1.5 font-bold text-amber-900">
                    <Check className="w-4 h-4 text-emerald-700" />
                    <span>ĐÁP ÁN ĐÚNG: <strong className="text-emerald-800 uppercase font-mono text-base ml-1">{q.correctAnswer}</strong></span>
                  </div>
                  <p className="text-slate-700 font-medium leading-relaxed">
                    <strong>Giải thích chi tiết: </strong>{q.explanation}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};
