export interface LectureSlide {
  id: number;
  slideNumber: number;
  title: string;
  subtitle: string;
  tagline?: string;
  category: 'intro' | 'nature' | 'tu-cat' | 'tu-hung' | 'quantum-vars' | 'method' | 'coordinate' | 'conclusion';
  categoryLabel: string;
  keyPoints: Array<{
    title: string;
    description: string;
    subPoints?: string[];
    badge?: string;
    badgeColor?: 'gold' | 'ruby' | 'slate' | 'amber';
  }>;
  highlightQuote?: string;
  graphicType: 
    | 'quantum-atom' 
    | 'nature-dual' 
    | 'tu-cat-matrix' 
    | 'compare-thien-y-sinh-khi' 
    | 'compare-dien-nien-phuc-vi' 
    | 'tu-hung-matrix' 
    | 'compare-luc-sat-hoa-hai' 
    | 'compare-tuyet-menh-ngu-quy' 
    | 'quantum-0-5' 
    | 'vung-tu-dia' 
    | 'four-steps' 
    | 'ten-years-cycle' 
    | 'coordinate-system' 
    | 'quantum-knot';
}

export const LECTURE_SLIDES: LectureSlide[] = [
  {
    id: 1,
    slideNumber: 1,
    title: 'LINH SỐ BÁT PHÁP',
    subtitle: 'Hệ Tọa Độ Lượng Tử & Từ Trường Các Con Số',
    tagline: 'Giải mã năng lượng, thấu hiểu bản thể và làm chủ vận trình.',
    category: 'intro',
    categoryLabel: 'Giới Thiệu Tổng Quan',
    keyPoints: [
      {
        title: 'Bản thể năng lượng',
        description: 'Mỗi con số không đơn thuần là ký tự số học khô khan, mà là một thực thể sóng năng lượng lượng tử rung động liên tục.',
        badge: 'Khái Niệm Cốt Lõi',
        badgeColor: 'gold'
      },
      {
        title: 'Hệ tọa độ cuộc đời',
        description: 'Thiết lập bản đồ định vị tần số rung động cá nhân qua chuỗi số điện thoại và ngày tháng năm sinh.',
        badge: 'Hệ Quy Chiếu',
        badgeColor: 'amber'
      }
    ],
    highlightQuote: 'Giải mã năng lượng, thấu hiểu bản thể và làm chủ vận trình.',
    graphicType: 'quantum-atom',
  },
  {
    id: 2,
    slideNumber: 2,
    title: 'Bản Chất 8 Dòng Từ Trường Lượng Tử',
    subtitle: 'Mỗi con số mang một tần số rung động riêng biệt, định hình tính cách và vận mệnh.',
    category: 'nature',
    categoryLabel: 'Bản Chất Năng Lượng',
    keyPoints: [
      {
        title: 'TỨ CÁT (Năng Lượng Tạo Đà)',
        description: 'Từ trường mang lại may mắn, sinh khí và sự ổn định dài hạn.',
        subPoints: [
          'Thiên Y: Năng lượng Tài lộc & Phước đức',
          'Sinh Khí: Năng lượng Quý nhân & Khởi sắc',
          'Diên Niên: Năng lượng Bản lĩnh & Lãnh đạo',
          'Phục Vị: Năng lượng Bền bỉ & Kiên nhẫn'
        ],
        badge: 'Cát Tinh • Vòng Kim',
        badgeColor: 'gold'
      },
      {
        title: 'TỨ HUNG (Năng Lượng Thử Thách)',
        description: 'Từ trường mang tính biến động, rủi ro và mài giũa ý chí.',
        subPoints: [
          'Lục Sát: Thử thách Cảm xúc & Nhan sắc',
          'Họa Hại: Thử thách Ngôn từ & Thị phi',
          'Tuyệt Mệnh: Thử thách Đột phá & Mạo hiểm',
          'Ngũ Quỷ: Thử thách Tài hoa & Bất định'
        ],
        badge: 'Hung Tinh • Vòng Ruby',
        badgeColor: 'ruby'
      }
    ],
    highlightQuote: 'Không có số xấu hoàn toàn, chỉ có tần số chưa được thuần hóa đúng cách.',
    graphicType: 'nature-dual',
  },
  {
    id: 3,
    slideNumber: 3,
    title: 'Ma Trận Tứ Cát: Bốn Nguồn Năng Lượng Tích Cực',
    subtitle: 'Tổng hợp 4 dòng từ trường kiến tạo tài vận, bản lĩnh, nhân duyên và nội lực.',
    category: 'tu-cat',
    categoryLabel: 'Ma Trận Tứ Cát',
    keyPoints: [
      {
        title: 'THIÊN Y (13, 31, 68, 86, 49, 94, 27, 72)',
        description: 'Kim đồng tài vận. Năng lượng của phước báu, tiền tài lớn và duyên dáng.',
        badge: 'Tài Vận Đỉnh Cao',
        badgeColor: 'gold'
      },
      {
        title: 'SINH KHÍ (14, 41, 67, 76, 39, 93, 28, 82)',
        description: 'Cát nhân thiên tướng. Năng lượng của quý nhân, sự an vui và danh tiếng.',
        badge: 'Quý Nhân Phù Trợ',
        badgeColor: 'gold'
      },
      {
        title: 'DIÊN NIÊN (19, 91, 78, 87, 34, 43, 26, 62)',
        description: 'Vận trù kế hoạch. Năng lượng của sự lãnh đạo, trách nhiệm và tính toán.',
        badge: 'Quyền Lực & Kế Sách',
        badgeColor: 'gold'
      },
      {
        title: 'PHỤC VỊ (11, 22, 88, 99, 77, 66, 33, 44)',
        description: 'Phá kén mà ra. Năng lượng của sự nhẫn nại, bình ổn và cảm giác an toàn.',
        badge: 'Nội Lực Bền Vững',
        badgeColor: 'amber'
      }
    ],
    highlightQuote: 'Tứ Cát hội tụ tạo nên gốc rễ vững bền cho tài lộc và gia đạo.',
    graphicType: 'tu-cat-matrix',
  },
  {
    id: 4,
    slideNumber: 4,
    title: 'Thiên Y (Tiền Tài) vs Sinh Khí (Nhân Mạch)',
    subtitle: 'So sánh cơ chế vận hành giữa Trí Tuệ Tài Chính và Trí Tuệ Cảm Xúc.',
    category: 'tu-cat',
    categoryLabel: 'So Sánh Chuyên Sâu',
    keyPoints: [
      {
        title: 'THIÊN Y: Trí Tuệ Tài Chính',
        description: 'Trục năng lượng quản trị dòng tiền và vật chất.',
        subPoints: [
          'Cát hóa: Hào sảng, kiếm tiền 4 phương 8 hướng. Dễ làm chủ, hôn nhân hạnh phúc.',
          'Hung hóa: Khổ vì tiền, làm nô lệ dòng tiền. Đam mê mạo hiểm tốc độ.',
          'Bệnh lý cảnh báo: Huyết áp, mỡ máu, tai mắt mũi.'
        ],
        badge: 'Trục Tiền Tài',
        badgeColor: 'gold'
      },
      {
        title: 'SINH KHÍ: Trí Tuệ Cảm Xúc',
        description: 'Trục năng lượng kết nối nhân tâm và vận hội quý nhân.',
        subPoints: [
          'Cát hóa: Lạc quan, không sân hận. Tiền bạc đến từ quý nhân và sự phủ sóng uy tín.',
          'Hung hóa: Không có chí tiến thủ, vất vả vì người khác. Phóng khoáng dẫn đến phá tài.',
          'Bệnh lý cảnh báo: Dạ dày, tim mạch, lười đi viện khám bệnh.'
        ],
        badge: 'Trục Nhân Mạch',
        badgeColor: 'gold'
      }
    ],
    highlightQuote: 'Thiên Y cho tiền bạc vật chất, Sinh Khí cho cơ hội và quý nhân tương trợ.',
    graphicType: 'compare-thien-y-sinh-khi',
  },
  {
    id: 5,
    slideNumber: 5,
    title: 'Diên Niên (Lãnh Đạo) vs Phục Vị (Kiên Trì)',
    subtitle: 'Nghệ thuật điều phối giữa Kiến Tạo Kế Hoạch và Chờ Đợi Thời Cơ.',
    category: 'tu-cat',
    categoryLabel: 'So Sánh Chuyên Sâu',
    keyPoints: [
      {
        title: 'DIÊN NIÊN: Kiến Tạo Kế Hoạch',
        description: 'Năng lực làm chủ, tổ chức và gìn giữ thành quả.',
        subPoints: [
          'Cát hóa: Lập trường vững vàng, quang minh chính đại. Giữ tiền và quản trị rất giỏi.',
          'Hung hóa: Cầu toàn, bảo thủ, ôm đồm trách nhiệm dẫn đến áp lực, cô lập.',
          'Bệnh lý cảnh báo: Cổ vai gáy, đốt sống, xương khớp.'
        ],
        badge: 'Trụ Cột Lãnh Đạo',
        badgeColor: 'gold'
      },
      {
        title: 'PHỤC VỊ: Chờ Đợi Thời Cơ',
        description: 'Khả năng tích lũy năng lượng, kiên gan và ẩn nhẫn.',
        subPoints: [
          'Cát hóa: Sức chịu đựng kinh người. Nhẫn nại chờ thời cơ đột phá. Tiền tài bình ổn.',
          'Hung hóa: Quá bị động, lười biếng, do dự, cố chấp không chịu thay đổi.',
          'Bệnh lý cảnh báo: Tim và não bộ (do suy nghĩ ngầm triền miên).'
        ],
        badge: 'Khí Chất Nhẫn Nại',
        badgeColor: 'amber'
      }
    ],
    highlightQuote: 'Diên Niên mở đường lập nghiệp, Phục Vị bồi dưỡng nội công chờ thời cơ.',
    graphicType: 'compare-dien-nien-phuc-vi',
  },
  {
    id: 6,
    slideNumber: 6,
    title: 'Ma Trận Tứ Hung: Bốn Năng Lượng Thử Thách',
    subtitle: 'Giải mã 4 từ trường biến động cao: Lục Sát, Họa Hại, Tuyệt Mệnh và Ngũ Quỷ.',
    category: 'tu-hung',
    categoryLabel: 'Ma Trận Tứ Hung',
    keyPoints: [
      {
        title: 'LỤC SÁT (16, 61, 47, 74, 38, 83, 29, 92)',
        description: 'Thỏ khôn có 3 hang. Từ trường của nhan sắc, mị lực, nhưng mong manh cảm xúc.',
        badge: 'Cảm Xúc Mỏng Manh',
        badgeColor: 'ruby'
      },
      {
        title: 'HỌA HẠI (17, 71, 89, 98, 64, 46, 23, 32)',
        description: 'Điểm thạch thành kim. Từ trường của ngôn từ, hùng biện, dễ sinh thị phi.',
        badge: 'Khẩu Xà Thị Phi',
        badgeColor: 'ruby'
      },
      {
        title: 'TUYỆT MỆNH (12, 21, 69, 96, 48, 84, 37, 73)',
        description: 'Tâm linh cảm ứng. Từ trường của mạo hiểm, đột phá, quyết liệt cực đoan.',
        badge: 'Mạo Hiểm Quả Cảm',
        badgeColor: 'ruby'
      },
      {
        title: 'NGŨ QUỶ (18, 81, 79, 97, 36, 63, 24, 42)',
        description: 'Ma xui quỷ khiến. Từ trường của tài hoa bẩm sinh, cải cách và bất định.',
        badge: 'Tài Hoa Đột Biến',
        badgeColor: 'ruby'
      }
    ],
    highlightQuote: 'Hiểu rõ Tứ Hung là chìa khóa để "Lấy Cát Chế Hung" cải vận cuộc đời.',
    graphicType: 'tu-hung-matrix',
  },
  {
    id: 7,
    slideNumber: 7,
    title: 'Lục Sát (Cảm Xúc) vs Họa Hại (Ngôn Từ)',
    subtitle: 'Thấu hiểu Sức Hấp Dẫn Mềm Yếu và Uy Lực Của Lời Nói.',
    category: 'tu-hung',
    categoryLabel: 'So Sánh Hung Tinh',
    keyPoints: [
      {
        title: 'LỤC SÁT: Sức Hấp Dẫn Mềm Yếu',
        description: 'Trục năng lượng liên quan đến thẩm mỹ, tình ái và tâm lý nội tâm.',
        subPoints: [
          'Cát hóa: Giao tiếp khéo léo, tinh tế, thẩm mỹ cao. Kiếm tiền nhờ nhan sắc và nhân mạch.',
          'Hung hóa: Tâm lý yếu, phụ thuộc cảm xúc người khác. Dễ phá tài vì tình duyên.',
          'Đặc điểm nổi bật: Hay u buồn, "bạch nguyệt quang" trong mắt người khác.'
        ],
        badge: 'Tình Ái & Nhan Sắc',
        badgeColor: 'ruby'
      },
      {
        title: 'HỌA HẠI: Uy Lực Của Lời Nói',
        description: 'Trục năng lượng về khẩu tài, tranh biện và giao tiếp bên ngoài.',
        subPoints: [
          'Cát hóa: Hùng biện xuất sắc, mở miệng là có tiền. Phù hợp nghề diễn giả, MC, luật sư.',
          'Hung hóa: Sĩ diện, háo thắng, dễ gặp tiểu nhân và thị phi khẩu thiệt.',
          'Bệnh lý cảnh báo: Hô hấp, thanh quản, yết hầu, dễ va chạm tai nạn.'
        ],
        badge: 'Khẩu Tài & Thị Phi',
        badgeColor: 'ruby'
      }
    ],
    highlightQuote: 'Lục Sát đau đớn vì tình, Họa Hại vạ gió vì lời ăn tiếng nói.',
    graphicType: 'compare-luc-sat-hoa-hai',
  },
  {
    id: 8,
    slideNumber: 8,
    title: 'Tuyệt Mệnh (Mạo Hiểm) vs Ngũ Quỷ (Tài Hoa)',
    subtitle: 'Năng Lực Hành Động Cực Đoan đối kháng với Trí Tuệ Đột Phá Bất Định.',
    category: 'tu-hung',
    categoryLabel: 'So Sánh Hung Tinh',
    keyPoints: [
      {
        title: 'TUYỆT MỆNH: Hành Động Cực Đoan',
        description: 'Tập trung vào tính quyết đoán, dũng cảm và tốc độ ra đòn.',
        subPoints: [
          'Cát hóa: Quyết đoán, dám liều, thẳng tính. Rất phù hợp đầu tư tài chính, tự lập nghiệp.',
          'Hung hóa: Quản lý cảm xúc kém, xuất tiền quá nhanh, dễ phá tài và dính kiện cáo tranh chấp.',
          'Đặc điểm: Yêu hận rõ ràng, túc trí đa mưu, dám chơi dám chịu.'
        ],
        badge: 'Chiến Binh Quyết Liệt',
        badgeColor: 'ruby'
      },
      {
        title: 'NGŨ QUỶ: Trí Tuệ Đột Phá',
        description: 'Tập trung vào sự biến hóa, trực giác nhạy bén và ý tưởng dị biệt.',
        subPoints: [
          'Cát hóa: Tài hoa bẩm sinh. Ý tưởng sáng tạo nghịch thế, thu hoạch bất ngờ.',
          'Hung hóa: Đa nghi, nhiều ý đồ ngầm, khó lường. Tiền tài đến nhanh đi nhanh như cơn lốc.',
          'Đặc điểm: Thích làm việc độc lập, hành tung bất định, cú đêm.'
        ],
        badge: 'Trí Não Đột Phá',
        badgeColor: 'ruby'
      }
    ],
    highlightQuote: 'Tuyệt Mệnh liều mạng bằng hành động, Ngũ Quỷ xoay vần bằng mưu lược.',
    graphicType: 'compare-tuyet-menh-ngu-quy',
  },
  {
    id: 9,
    slideNumber: 9,
    title: 'Biến Số Lượng Tử: Quyền Năng Của Số 0 & Số 5',
    subtitle: 'Hai con số đặc biệt làm thay đổi hoàn toàn tính chất của các tổ hợp từ trường.',
    category: 'quantum-vars',
    categoryLabel: 'Biến Số Lượng Tử',
    keyPoints: [
      {
        title: 'SỐ 0 (Hố Đen / Tàng Ẩn)',
        description: 'Bản chất Âm, ẩn tính, làm tiêu biến hoặc ẩn giấu năng lượng của từ trường kề cận.',
        subPoints: [
          'Quy luật: Nằm giữa 1 tổ số trở thành Phục Vị bị động của từ trường đó (VD: 907 là Phục vị của Ngũ Quỷ).',
          'Tác động: Khiến sự nghiệp trì trệ, tình cảm ẩn khuất giấu kín, dòng tiền tiêu hao âm thầm.',
          'Ý nghĩa: Đưa năng lượng hiển lộ về trạng thái đóng băng hoặc vô hình.'
        ],
        badge: 'Âm Tính • Hố Đen Năng Lượng',
        badgeColor: 'slate'
      },
      {
        title: 'SỐ 5 (Ánh Sáng / Khuếch Đại)',
        description: 'Bản chất Dương, hiển lộ, chủ động, tăng cường năng lượng cực đại.',
        subPoints: [
          'Quy luật: Nằm giữa 1 tổ số trở thành cầu nối khuếch đại (VD: 358 = cặp số 38 được cường hóa mạnh mẽ).',
          'Tác động: Làm năng lượng bản nguyên sáng tỏ, bộc lộ ra ngoài và bùng nổ mạnh mẽ hơn.',
          'Ý nghĩa: Phóng đại cả điều cát lẫn điều hung lên gấp bội phần.'
        ],
        badge: 'Dương Tính • Lăng Kính Ánh Sáng',
        badgeColor: 'gold'
      }
    ],
    highlightQuote: 'Số 0 giấu kín chìm sâu, Số 5 phơi bày bùng nổ.',
    graphicType: 'quantum-0-5',
  },
  {
    id: 10,
    slideNumber: 10,
    title: 'Vùng Tử Địa: Cảnh Báo Khi Số 0 Kích Hoạt Hung Hóa',
    subtitle: 'Số 0 xuất hiện trong dãy số 99% mang ý nghĩa tiêu cực (Trừ phản vi kỳ cách).',
    category: 'quantum-vars',
    categoryLabel: 'Cảnh Báo Vùng Nguy Hiểm',
    keyPoints: [
      {
        title: 'TUYỆT MỆNH + 0: Vô Sản & Trắng Tay',
        description: 'Tạo thành "Không Kết Quả": Tiền tài về 0, sự nghiệp về 0, hôn nhân về 0.',
        subPoints: [
          'Hiện tượng: Năng lượng đạt đỉnh cao danh vọng rồi bất ngờ rơi tự do xuống đáy vô sản.',
          'Nguy cơ: Phá sản âm thầm, đứng tên vay nợ giúp người khác rồi gánh chịu một mình.'
        ],
        badge: 'Nguy Hiểm Cấp 1',
        badgeColor: 'ruby'
      },
      {
        title: 'NGŨ QUỶ + 0: Nợ Nần & Bệnh Tật (108, 801, 709, 907, 306, 603, 204, 402)',
        description: 'Dấu hiệu: Mắc nợ từng đống, mất ngủ kinh niên, dễ bị lừa đảo tài chính, nguy cơ phải phẫu thuật mổ xẻ.',
        badge: 'Hao Tiền Hại Thân',
        badgeColor: 'ruby'
      },
      {
        title: 'THIÊN Y / LỤC SÁT + 0: Tàng Ẩn Ly Hôn & Phá Tài',
        description: 'Tàng ẩn ly hôn: 103, 301, 608, 806 (xuất hiện người thứ 3 bí mật không ai hay biết).',
        subPoints: [
          'Phá tài & Thất bại đầu tư: 1029, 6092, 102, 1052, 609...',
          'Bản chất: Tiền tài kiếm được bao nhiêu cũng bị hố đen số 0 hút sạch.'
        ],
        badge: 'Rạn Nứt Gia Đạo',
        badgeColor: 'ruby'
      }
    ],
    highlightQuote: 'Tránh xa số 0 ở các vị trí nhạy cảm để giữ trọn phước lộc gia môn.',
    graphicType: 'vung-tu-dia',
  },
  {
    id: 11,
    slideNumber: 11,
    title: 'Giải Mã Từ Trường: Sơ Đồ 4 Bước Tự Luận Số',
    subtitle: 'Quy trình thực chiến chuẩn xác để giải phẫu bất kỳ số điện thoại nào.',
    category: 'method',
    categoryLabel: 'Quy Trình 4 Bước',
    keyPoints: [
      {
        title: 'Bước 1: Thu thập dữ liệu gốc',
        description: 'Hỏi rõ số điện thoại đang dùng, số năm đã gắn bó thực tế, và xác định nguồn gốc mua/được tặng.',
        badge: 'Bước 1',
        badgeColor: 'gold'
      },
      {
        title: 'Bước 2: Xác định Hung / Cát sơ bộ',
        description: 'Đuôi số là hung tinh hay cát tinh? Có chứa số 0 không? Có hai hung tinh liên thủ không? Nếu có -> Dãy số hung cục.',
        badge: 'Bước 2',
        badgeColor: 'amber'
      },
      {
        title: 'Bước 3: Tách Từ Trường Chi Tiết (Ví dụ: 0903804968)',
        description: 'Tách tuần tự: 09 (Phục vị) → 903 (Sinh khí kẹp 0) → 38 (Lục sát) → 804 (Tuyệt mệnh kẹp 0) → 49 (Thiên y).',
        badge: 'Bước 3',
        badgeColor: 'gold'
      },
      {
        title: 'Bước 4: Luận Đoán Chi Tiết & Bắt Bệnh',
        description: 'Số lượng từ trường nào chiếm ưu thế nhất định hình tính cách người dùng. Tìm vị trí các số 0 và đuôi hung tinh để bắt bệnh.',
        badge: 'Bước 4',
        badgeColor: 'amber'
      }
    ],
    highlightQuote: '4 bước bài bản giúp bất kỳ ai cũng có thể tự bắt mạch vận mệnh cho chính mình.',
    graphicType: 'four-steps',
  },
  {
    id: 12,
    slideNumber: 12,
    title: 'Ứng Kỳ 10 Năm: Chu Kỳ Kích Hoạt Năng Lượng',
    subtitle: 'Mỗi vòng vận mệnh kéo dài 10 năm. Năng lượng các cặp số tuần tự kích hoạt theo thời gian thực.',
    category: 'method',
    categoryLabel: 'Dự Báo Vận Hạn 10 Năm',
    keyPoints: [
      {
        title: 'Ví dụ chu kỳ dãy số thực tế: 09 — 90 — 03 — 38 — 80 — 04 — 49',
        description: 'Mỗi cặp số đại diện cho một chặng đường năng lượng nối tiếp nhau:',
        subPoints: [
          'Năm 1-2: 09 (Phục Vị) - Khởi đầu chậm rãi, chờ đợi tích lũy.',
          'Năm 2-3: 90 (Chuyển giao) - Giao thời chuyển biến năng lượng.',
          'Năm 3-4: 03 (Sinh Khí kẹp 0) - Quý nhân ẩn giấu, chú ý hao tổn hao tài.',
          'Năm 4-5: 38 (Lục Sát) - Xuất hiện vấn đề tình cảm, cảm xúc lung lay.',
          'Năm 5-6: 80 (Chuyển tiếp) - Khúc quanh năng lượng nội tâm.',
          'Năm 6-7: 04 (Tuyệt Mệnh kẹp 0) - Nguy cơ nợ nần, đầu tư hụt hơi.',
          'Năm 7-8: 49 (Thiên Y) - Tài lộc đến, gặt hái sau chuỗi thử thách.'
        ],
        badge: 'Trục Thời Gian Lượng Tử',
        badgeColor: 'gold'
      }
    ],
    highlightQuote: 'Biết trước ứng kỳ để chủ động tiến thoái: lúc hung thì ẩn nhẫn, lúc cát thì xông pha.',
    graphicType: 'ten-years-cycle',
  },
  {
    id: 13,
    slideNumber: 13,
    title: 'Hệ Tọa Độ Bát Pháp: Bức Tranh Toàn Cảnh',
    subtitle: 'Bản đồ 2 chiều trực quan định vị toàn bộ 8 Từ Trường qua Cảm Xúc vs Lý Trí, Bình Ổn vs Đột Phá.',
    category: 'coordinate',
    categoryLabel: 'Hệ Tọa Độ Bát Pháp',
    keyPoints: [
      {
        title: 'Trục Tung (Y): CẢM XÚC (trên) ◄► LÝ TRÍ (dưới)',
        description: 'Đo lường biên độ quyết định dựa trên cảm tính con tim hay logic lý trí.',
        badge: 'Trục Y • Tâm Tính',
        badgeColor: 'amber'
      },
      {
        title: 'Trục Hoành (X): BÌNH ỔN (trái) ◄► ĐỘT PHÁ (phải)',
        description: 'Đo lường xu hướng hành động hướng đến sự an toàn hay sẵn sàng mạo hiểm đột phá.',
        badge: 'Trục X • Hành Động',
        badgeColor: 'amber'
      },
      {
        title: '4 Góc Phần Tư Năng Lượng:',
        description: 'Phân bổ chính xác 8 từ trường vào 4 miền:',
        subPoints: [
          'Góc Trái - Trên (Cảm Xúc + Bình Ổn): Lục Sát (Nhạy cảm, mị lực) & Sinh Khí (An vui, quý nhân).',
          'Góc Phải - Trên (Cảm Xúc + Đột Phá): Ngũ Quỷ (Tâm linh, sáng tạo) & Họa Hại (Thị phi, ngôn từ).',
          'Góc Trái - Dưới (Lý Trí + Bình Ổn): Thiên Y (Tích lũy, phước báu) & Phục Vị (Nhẫn nại, tàng ẩn).',
          'Góc Phải - Dưới (Lý Trí + Đột Phá): Tuyệt Mệnh (Mạo hiểm, quyết đoán) & Diên Niên (Quy củ, lãnh đạo).'
        ],
        badge: 'Định Vị 4 Miền Không Gian',
        badgeColor: 'gold'
      }
    ],
    highlightQuote: 'Nhìn vào hệ tọa độ để biết mình đang đứng ở đâu trên hành trình số mệnh.',
    graphicType: 'coordinate-system',
  },
  {
    id: 14,
    slideNumber: 14,
    title: 'Làm Chủ Từ Trường - Làm Chủ Vận Mệnh',
    subtitle: 'Hãy dùng số, đừng để số dùng bạn.',
    tagline: 'Chân lý cải vận chân truyền của Bát Cực Linh Số Lượng Tử.',
    category: 'conclusion',
    categoryLabel: 'Thông Điệp Cốt Lõi',
    keyPoints: [
      {
        title: 'Con số là tấm gương phản chiếu',
        description: 'Các con số không sinh ra để trói buộc hay áp đặt định mệnh, mà để phản chiếu chính xác tần số rung động của chính bạn.',
        badge: 'Nhận Thức Tỉnh Thức',
        badgeColor: 'gold'
      },
      {
        title: 'Thiết lập lại hệ tọa độ cuộc đời',
        description: 'Thấu hiểu Linh Số Bát Pháp là quá trình bắt mạch năng lượng, nhận diện điểm mù và chủ động tái tạo tần số may mắn.',
        badge: 'Chuyển Hung Hóa Cát',
        badgeColor: 'gold'
      }
    ],
    highlightQuote: 'Hãy dùng số, đừng để số dùng bạn.',
    graphicType: 'quantum-knot',
  },
];

export interface TeacherProfile {
  name: string;
  title: string;
  brand: string;
  hotline: string;
  coreMotto: string;
  subMotto: string;
  fourPrinciples: Array<{
    title: string;
    description: string;
    icon: string;
  }>;
  expertiseFields: string[];
  deskItems: Array<{
    name: string;
    meaning: string;
  }>;
  welcomeMessage: string;
}

export const TEACHER_PROFILE: TeacherProfile = {
  name: 'Cô Giáo Đỗ Gia',
  title: 'Chuyên Gia Giảng Huấn Bát Cực Linh Số & Phong Thủy Ứng Dụng',
  brand: 'Huyền Đạo Đỗ Gia 4311',
  hotline: '0768431286',
  coreMotto: 'Thấu hiểu bản thân - Kiến tạo vận mệnh',
  subMotto: 'Thuận theo đạo trời, An trong vận đời',
  fourPrinciples: [
    {
      title: 'Khai Mở Tiềm Năng',
      description: 'Nhận diện nội lực bẩm sinh, giải mã trường năng lượng ẩn sâu qua từng con số.',
      icon: 'sparkles',
    },
    {
      title: 'Cân Bằng Năng Lượng',
      description: 'Hóa giải xung khắc ngũ hành, lấy Cát tinh thuần hóa Hung tinh bền vững.',
      icon: 'scale',
    },
    {
      title: 'Hài Hòa Cuộc Sống',
      description: 'Dung hòa tình cảm, gia đạo, sự nghiệp và sức khỏe trong bình an.',
      icon: 'heart',
    },
    {
      title: 'Hướng Đến May Mắn',
      description: 'Kích hoạt quý nhân tương trợ, mở lối tài lộc hưng vượng lâu dài.',
      icon: 'compass',
    },
  ],
  expertiseFields: [
    'Bát Cực Linh Số Lượng Tử (Hệ Tọa Độ 8 Từ Trường)',
    'Kinh Dịch Ứng Dụng & Luận Quẻ Thực Chiến',
    'Bát Tự Mệnh Lý & Cân Bằng Dụng Thần',
    'Phong Thủy Nhà Ở & Văn Phòng (Loan Đầu & Lý Khí)',
    'Năng Lượng Số Học Hiện Đại (Sim Điện Thoại & Căn Cước)',
  ],
  deskItems: [
    {
      name: 'Sách Năng Lượng Số Học & Phong Thủy',
      meaning: 'Bộ giáo trình chuẩn hóa bí truyền Bát Cực Linh Số.',
    },
    {
      name: 'La Bàn La Kinh Bát Quái',
      meaning: 'Đo lường phương hướng từ trường đất trời.',
    },
    {
      name: 'Đài Sen Hồng Thanh Tịnh',
      meaning: 'Biểu tượng của sự thanh khiết, phá kén vươn lên đón ánh sáng.',
    },
    {
      name: 'Biển Gỗ Khắc Châm Ngôn',
      meaning: '"Thấu hiểu bản thân - Kiến tạo vận mệnh" dẫn dắt mọi bài giảng.',
    },
  ],
  welcomeMessage: `Kính chào quý vị hữu duyên! 
Chào mừng quý vị đến với Sổ Tay Linh Số Bát Pháp của Huyền Đạo Đỗ Gia. Bộ bài giảng 14 Slide Lượng Tử này được tôi đúc kết tỉ mỉ từ nhiều năm nghiên cứu dịch lý và phong thủy thực chiến, nhằm mang lại cho quý vị một góc nhìn khoa học, trực quan và sâu sắc nhất về tần số các con số quanh mình. Chúc quý vị tìm được kim chỉ nam để chuyển hung thành cát, vạn sự hanh thông!`,
};
