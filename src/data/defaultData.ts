import { TuTruong, ChuyenHoa, TraCuuRecord, BaiVietCaiVan, SheetFullData } from '../types';

export const DEFAULT_TU_TRUONG: TuTruong[] = [
  {
    MaSo: '14/41, 67/76, 39/93, 28/82',
    TenTuTruong: 'Sinh Khí',
    NhomNangLuong: 'Cát Tinh',
    NguHanh: 'Dương Mộc (Tham Lang)',
    YNghia: 'Quý nhân phù trợ, may mắn hanh thông, tinh thần lạc quan, sức sống dồi dào, thu hút nhiều bạn bè tốt và cơ hội mới.',
    MoTaChiTiet: 'Người mang từ trường Sinh Khí tính tình vui vẻ, bao dung, hào sảng, không câu nệ tiểu tiết. Trong công việc dễ gặp quý nhân nâng đỡ, biến nguy thành an. Về tiền tài thường có lộc bất ngờ, nguồn tiền đến tự nhiên không áp lực. Tình cảm thuận hòa, dễ kết giao. Tuy nhiên, nếu năng lượng quá mạnh mà thiếu sự kiên định thì dễ sinh lười biếng, cả thèm chóng chán.',
    UngDungCaiVan: 'Dùng Sinh Khí để hóa giải năng lượng của Họa Hại (khẩu thiệt thị phi) và kích hoạt quý nhân. Phù hợp cho người làm kinh doanh, bán hàng, ngoại giao, người đang bế tắc cần sự giúp đỡ. Nên phối hợp cùng Diên Niên để có tính kỷ luật và biến cơ hội thành kết quả cụ thể.',
    CapDoNangLuong: {
      cap1: '14 - 41 (Năng lượng cực mạnh, quý nhân lớn nhất, tài lộc hanh thông)',
      cap2: '67 - 76 (Năng lượng mạnh, bạn bè trợ lực, tâm thế an nhiên)',
      cap3: '39 - 93 (Năng lượng vừa, hòa nhã, cuộc sống bình an)',
      cap4: '28 - 82 (Năng lượng nhẹ, hòa hợp các mối quan hệ)',
    },
  },
  {
    MaSo: '13/31, 68/86, 49/94, 27/72',
    TenTuTruong: 'Thiên Y',
    NhomNangLuong: 'Cát Tinh',
    NguHanh: 'Dương Thổ (Cự Môn)',
    YNghia: 'Đại cát tinh chủ về Tài lộc chính đạo, hôn nhân viên mãn, sức khỏe dồi dào, trí tuệ thông suốt, vượng khí sinh tài.',
    MoTaChiTiet: 'Thiên Y là từ trường đại diện cho của cải chân chính, tích lũy tài sản vững bền. Người có Thiên Y thường nhân hậu, thông minh, làm việc gì cũng dễ gặt hái thành tựu. Trong hôn nhân, Thiên Y đem lại tình cảm chân thành, thấu hiểu và hạnh phúc. Về sức khỏe ít ốm đau bệnh tật nặng, tinh thần luôn tích cực.',
    UngDungCaiVan: 'Thiên Y là thần dược hóa giải hung tinh Tuyệt Mệnh ("Thiên Y chế Tuyệt Mệnh"). Đặt Thiên Y ngay sau các hung số để chuyển hóa hao tài thành đắc tài. Phù hợp đặt ở phần đuôi số điện thoại (3-4 số cuối) để khóa chặt tài lộc và hạnh phúc gia đạo.',
    CapDoNangLuong: {
      cap1: '13 - 31 (Năng lượng tài lộc và sức khỏe mạnh nhất, đại phú đại quý)',
      cap2: '68 - 86 (Tài vận dồi dào, kinh doanh thuận buồm xuôi gió)',
      cap3: '49 - 94 (Thu nhập ổn định, gia đạo ấm êm)',
      cap4: '27 - 72 (Lộc nhỏ đều đặn, tâm tính vui vẻ)',
    },
  },
  {
    MaSo: '19/91, 78/87, 34/43, 26/62',
    TenTuTruong: 'Diên Niên',
    NhomNangLuong: 'Cát Tinh',
    NguHanh: 'Dương Kim (Vũ Khúc)',
    YNghia: 'Năng lực lãnh đạo, tinh thần trách nhiệm cao, uy tín, kiên định, khả năng quản lý tài chính và sự nghiệp vững như bàn thạch.',
    MoTaChiTiet: 'Người có từ trường Diên Niên rất có tài chỉ huy, quyết đoán, nguyên tắc và có tinh thần phụng sự. Họ có năng lực chuyên môn xuất sắc, biết giữ tiền của, tiêu dùng chừng mực. Điểm yếu là đôi khi quá bảo thủ, áp đặt, ôm đồm nhiều việc dẫn đến căng thẳng, áp lực thần kinh và khó tính trong mắt người khác.',
    UngDungCaiVan: 'Dùng Diên Niên để kiểm soát và hóa giải Lục Sát ("Diên Niên áp Lục Sát"), giúp chế ngự đào hoa xấu và tâm tính bi lụy. Rất tốt cho chủ doanh nghiệp, nhà quản lý, người trụ cột gia đình. Nữ giới nên chọn cấp độ vừa phải (34/43, 26/62) để tránh quá mạnh mẽ lấn át bạn đời.',
    CapDoNangLuong: {
      cap1: '19 - 91 (Năng lực lãnh đạo đỉnh cao, gánh vác trách nhiệm lớn)',
      cap2: '78 - 87 (Quản lý giỏi, kiên trì, uy quyền vững chắc)',
      cap3: '34 - 43 (Cần cù, trách nhiệm vừa phải, hài hòa công việc và gia đình)',
      cap4: '26 - 62 (Khả năng thích nghi tốt, tỉ mỉ, mềm mỏng)',
    },
  },
  {
    MaSo: '11/22, 88/99, 66/77, 33/44',
    TenTuTruong: 'Phục Vị',
    NhomNangLuong: 'Cát Tinh',
    NguHanh: 'Âm Mộc (Tả Phụ)',
    YNghia: 'Bền bỉ, kiên nhẫn, ổn định, cẩn trọng, tích lũy nội lực, chờ thời cơ chín muồi để bứt phá bền vững.',
    MoTaChiTiet: 'Từ trường Phục Vị mang năng lượng kéo dài, bình ổn. Người sở hữu Phục Vị làm việc cẩn mật, chắc chắn, kiên trì, không thích mạo hiểm. Họ có khả năng nghiên cứu chuyên sâu, bền lòng với mục tiêu. Tuy nhiên, nhược điểm là hay do dự, thiếu quyết đoán, sợ thất bại nên đôi khi bỏ lỡ cơ hội tốt.',
    UngDungCaiVan: 'Phục Vị dùng làm bước đệm ổn định giữa các cặp số mạnh. Giúp làm dịu sự bộc phát của Ngũ Quỷ hoặc củng cố năng lượng tích lũy của Thiên Y. Rất thích hợp cho người làm nghiên cứu, giáo dục, tài chính thận trọng.',
    CapDoNangLuong: {
      cap1: '11 - 22 (Kiên nhẫn tột bực, nội lực tích lũy thâm sâu)',
      cap2: '88 - 99 (Ổn định, chắc chắn, cẩn trọng trong quyết định)',
      cap3: '66 - 77 (Bình hòa, đều đặn, không xáo trộn)',
      cap4: '33 - 44 (Chờ thời, bảo thủ nhẹ, thích an toàn)',
    },
  },
  {
    MaSo: '12/21, 69/96, 48/84, 37/73',
    TenTuTruong: 'Tuyệt Mệnh',
    NhomNangLuong: 'Hung Tinh',
    NguHanh: 'Dương Kim (Phá Quân)',
    YNghia: 'Dám nghĩ dám làm, liều lĩnh, cảm xúc cực đoan, tài lộc biến động mạnh (vào nhanh ra nhanh), dễ tranh chấp và hao tổn.',
    MoTaChiTiet: 'Người mang từ trường Tuyệt Mệnh có trực giác nhạy bén, dũng cảm, thích mạo hiểm và đầu tư lớn. Họ có thể kiếm tiền rất nhanh nhưng giữ tiền rất khó, dễ rơi vào cảnh tán tài, phá sản hoặc tranh chấp kiện tụng. Tính khí nóng nảy, cảm tính, dễ yêu nhanh ghét vội. Về sức khỏe chú ý thận, gan mật và hệ tiết niệu.',
    UngDungCaiVan: 'Bắt buộc dùng Thiên Y đứng sau để hóa giải ("Thiên Y chế Tuyệt Mệnh"). Ví dụ: cặp 21 (Tuyệt Mệnh) đi liền 13 (Thiên Y) -> biến lòng dũng cảm thành thành quả tài chính lớn. Tuyệt đối không dùng số đuôi Tuyệt Mệnh vì chủ về cuối đời trắng tay.',
    CapDoNangLuong: {
      cap1: '12 - 21 (Liều lĩnh bậc nhất, vào nhanh ra nhanh, dễ tai ương)',
      cap2: '69 - 96 (Cực đoan, đầu tư mạo hiểm, thăng trầm lớn)',
      cap3: '48 - 84 (Nóng tính, khó giữ tiền, dễ bất hòa)',
      cap4: '37 - 73 (Cảm tính, dễ xúc động, chi tiêu bốc đồng)',
    },
  },
  {
    MaSo: '18/81, 79/97, 36/63, 24/42',
    TenTuTruong: 'Ngũ Quỷ',
    NhomNangLuong: 'Hung Tinh',
    NguHanh: 'Âm Hỏa (Liêm Trinh)',
    YNghia: 'Thông minh kiệt xuất, biến ảo khôn lường, tài hoa sáng tạo nhưng đa nghi, tâm trạng bất an, dễ gặp biến cố bất ngờ.',
    MoTaChiTiet: 'Từ trường Ngũ Quỷ chủ về trí tuệ phi phàm, khả năng tư duy đột phá, thích những điều huyền bí, tôn giáo, tâm linh hoặc công nghệ mới. Nhược điểm chí mạng là tâm tính thay đổi như chong chóng, hay ngờ vực, khó tin tưởng ai, dễ bị tai nạn bất ngờ hoặc vướng họa huyết quang. Đêm hay mất ngủ, suy nghĩ quá độ dẫn đến bệnh tim mạch.',
    UngDungCaiVan: 'Dùng Sinh Khí + Diên Niên hoặc Phục Vị để ổn định tâm tính và biến óc sáng tạo thành thành tựu ("Sinh Khí + Diên Niên hóa Ngũ Quỷ"). Không nên để Ngũ Quỷ ở đuôi số vì tương lai nhiều biến động bất trắc.',
    CapDoNangLuong: {
      cap1: '18 - 81 (Trí tuệ siêu việt nhưng biến động cực lớn, tai ương rình rập)',
      cap2: '79 - 97 (Nhiều ý tưởng, tính toán tinh vi, dễ mất ngủ)',
      cap3: '36 - 63 (Mau thay đổi, sáng tạo nghệ thuật, tâm trạng thất thường)',
      cap4: '24 - 42 (Lanh lợi, khéo nói nhưng thiếu sự kiên định)',
    },
  },
  {
    MaSo: '16/61, 47/74, 38/83, 29/92',
    TenTuTruong: 'Lục Sát',
    NhomNangLuong: 'Hung Tinh',
    NguHanh: 'Âm Thủy (Văn Khúc)',
    YNghia: 'Duyên dáng, giao tiếp khéo léo, thẩm mỹ cao nhưng đa sầu đa cảm, đào hoa thị phi, hao tài vì tình, tâm trạng buồn bã.',
    MoTaChiTiet: 'Người có từ trường Lục Sát rất tinh tế, thích cái đẹp, giao tiếp quyến rũ và dễ thu hút người khác phái. Tuy nhiên họ quá nhạy cảm, dễ suy diễn, tâm trạng bất an, hay bi lụy vì tình cảm. Tiền bạc thường tiêu hao vào việc làm đẹp, mua sắm hoặc hao tài vì người yêu/bạn đời. Dễ mắc bệnh về da dẻ, dạ dày và chứng trầm uất.',
    UngDungCaiVan: 'Pháp trị duy nhất là "Diên Niên áp Lục Sát": Dùng sự vững chãi, lý trí và nguyên tắc của Diên Niên để làm chủ cảm xúc. Phù hợp cho ngành làm đẹp, thời trang nếu biết cách phối hợp số kiềm chế.',
    CapDoNangLuong: {
      cap1: '16 - 61 (Đào hoa nặng nhất, cực kỳ nhạy cảm, hao tài vì tình)',
      cap2: '47 - 74 (Tinh tế, yêu cái đẹp nhưng hay muộn phiền)',
      cap3: '38 - 83 (Duyên ngầm, dễ lung lay cảm xúc, tiêu hoang)',
      cap4: '29 - 92 (Nhẹ nhàng, giao tiếp tốt, cảm xúc thay đổi nhanh)',
    },
  },
  {
    MaSo: '17/71, 89/98, 46/64, 23/32',
    TenTuTruong: 'Họa Hại',
    NhomNangLuong: 'Hung Tinh',
    NguHanh: 'Âm Thổ (Lộc Tồn)',
    YNghia: 'Khẩu tài xuất sắc, tài ăn nói hùng biện nhưng dễ gặp khẩu thiệt thị phi, hiếu thắng, cứng đầu, sức khỏe hô hấp yếu.',
    MoTaChiTiet: 'Người mang từ trường Họa Hại nói năng lưu loát, có tài thuyết phục, thích tranh luận và không chịu thua ai bằng lời nói. Mặt trái là dễ "họa từ miệng mà ra", nói nhiều dễ lỡ lời, gây thù chuốc oán, tiểu nhân ghen ghét. Tiền bạc kiếm được từ mồm miệng nhưng cũng vì sĩ diện mà mất tiền. Thường gặp vấn đề về cổ họng, phế quản, phổi và dễ tai nạn giao thông nhẹ.',
    UngDungCaiVan: 'Dùng Sinh Khí để hóa giải ("Sinh Khí giáng Họa Hại"). Lấy tâm tính rộng rãi, nhân ái của Sinh Khí để biến tài ăn nói thành sức mạnh chiêu quý nhân, biến kẻ thù thành bạn. Rất hữu ích cho MC, giáo viên, diễn giả khi phối hợp chuẩn.',
    CapDoNangLuong: {
      cap1: '17 - 71 (Khẩu tài cực đỉnh, tính hiếu thắng cao, thị phi nhiều nhất)',
      cap2: '89 - 98 (Thích tranh luận, cái tôi lớn, dễ hao tài vì sĩ diện)',
      cap3: '46 - 64 (Nói nhiều, dễ làm phật lòng người khác)',
      cap4: '23 - 32 (Khéo miệng, thích buôn chuyện, sức đề kháng hô hấp kém)',
    },
  },
];

export const DEFAULT_CHUYEN_HOA: ChuyenHoa[] = [
  {
    ID: 1,
    TuTruongGoc: 'Tuyệt Mệnh (12/21, 69/96, 48/84, 37/73)',
    TuTruongChuyenDoi: 'Thiên Y (13/31, 68/86, 49/94, 27/72)',
    PhuongPhap: 'Thiên Y chế Tuyệt Mệnh',
    YNghiaChuyenHoa: 'Chuyển hóa tính liều lĩnh, cảm tính và nguy cơ phá sản thành dòng tiền tích lũy chân chính và sự bình an.',
    LoiKhuyen: 'Khi dãy số có cặp Tuyệt Mệnh, hãy đặt ngay một cặp Thiên Y tương xứng liền kề phía sau (ví dụ: 213, 968, 849). Năng lượng thiện lành, đắc tài của Thiên Y sẽ thuần hóa tính hung hãn của Phá Quân, biến sự dũng cảm thành lợi nhuận thực tế.',
  },
  {
    ID: 2,
    TuTruongGoc: 'Họa Hại (17/71, 89/98, 46/64, 23/32)',
    TuTruongChuyenDoi: 'Sinh Khí (14/41, 67/76, 39/93, 28/82)',
    PhuongPhap: 'Sinh Khí giáng Họa Hại',
    YNghiaChuyenHoa: 'Tiêu trừ khẩu thiệt thị phi, giải tỏa chứng bệnh vặt về đường hô hấp, chuyển tài ăn nói thành duyên kết nối quý nhân.',
    LoiKhuyen: 'Bố trí Sinh Khí ngay sau Họa Hại (ví dụ: 714, 893, 641). Sinh Khí Dương Mộc sẽ khắc chế bớt Âm Thổ hung hãn của Họa Hại, đem tâm từ ái xoa dịu cái tôi thích tranh cãi, giúp người sở hữu nói ra những lời khiến quý nhân yêu mến.',
  },
  {
    ID: 3,
    TuTruongGoc: 'Lục Sát (16/61, 47/74, 38/83, 29/92)',
    TuTruongChuyenDoi: 'Diên Niên (19/91, 78/87, 34/43, 26/62)',
    PhuongPhap: 'Diên Niên áp Lục Sát',
    YNghiaChuyenHoa: 'Chế ngự đào hoa sát, giảm bớt tâm lý đa sầu đa cảm, xây dựng ý chí kiên định và năng lực làm chủ cuộc đời.',
    LoiKhuyen: 'Ghép cặp Diên Niên ngay sau Lục Sát (ví dụ: 619, 743, 834, 926). Kim của Diên Niên vững chãi sẽ làm chủ nguồn Thủy tràn lan của Lục Sát, biến sự nhạy cảm thành sự tinh tế trong quản lý và gìn giữ hôn nhân viên mãn.',
  },
  {
    ID: 4,
    TuTruongGoc: 'Ngũ Quỷ (18/81, 79/97, 36/63, 24/42)',
    TuTruongChuyenDoi: 'Sinh Khí + Diên Niên / Phục Vị',
    PhuongPhap: 'Sinh Khí diệt Ngũ Quỷ / Diên Niên áp chế',
    YNghiaChuyenHoa: 'Làm lắng dịu sự bất an, triệt tiêu nguy cơ tai nạn huyết quang hoặc bị lừa gạt, biến óc mưu lược thành phát minh thực tiễn.',
    LoiKhuyen: 'Để hóa giải năng lượng biến động khôn lường của Ngũ Quỷ, nên dùng tổ hợp: Ngũ Quỷ + Sinh Khí + Diên Niên (ví dụ: 8143, 9762). Quý nhân Sinh Khí kéo người đó ra khỏi nghi kỵ, và Diên Niên định hướng kế hoạch cụ thể, ổn định giấc ngủ và tim mạch.',
  },
  {
    ID: 5,
    TuTruongGoc: 'Sinh Khí (14/41, 67/76, 39/93, 28/82)',
    TuTruongChuyenDoi: 'Diên Niên (19/91, 78/87, 34/43, 26/62)',
    PhuongPhap: 'Sinh Khí trợ Diên Niên',
    YNghiaChuyenHoa: 'Biến cơ hội quý nhân thành thành tựu sự nghiệp cụ thể, tăng cường tính kỷ luật để không rơi vào lười biếng.',
    LoiKhuyen: 'Tổ hợp vàng cho người lãnh đạo: 419, 762, 934. Quý nhân mang cơ hội đến và năng lực quản lý của Diên Niên nắm bắt cơ hội trọn vẹn, công danh hiển đạt.',
  },
  {
    ID: 6,
    TuTruongGoc: 'Thiên Y (13/31, 68/86, 49/94, 27/72)',
    TuTruongChuyenDoi: 'Phục Vị (11/22, 88/99, 66/77, 33/44)',
    PhuongPhap: 'Thiên Y tụ Phục Vị',
    YNghiaChuyenHoa: 'Kéo dài dòng chảy tài lộc, tích lũy tài sản bền vững không bị hao tán theo thời gian.',
    LoiKhuyen: 'Tổ hợp chiêu tài giữ kho: 131, 688, 311. Tiền tài sinh sôi liên tục, đem lại cảm giác an tâm và cuộc sống sung túc dài lâu.',
  },
];

export const DEFAULT_BAI_VIET: BaiVietCaiVan[] = [
  {
    ID: 1,
    TieuDe: 'Nhập Môn Bát Cực Linh Số: Giải Mã Năng Lượng Đằng Sau Những Con Số',
    ChuyenMuc: 'Kiến Thức Căn Bản',
    NgayDang: '2026-03-15',
    TacGia: 'Chuyên Gia Phong Thủy Số',
    NoiDung: `Mỗi con số xuất hiện xung quanh chúng ta từ số điện thoại, biển số xe, số tài khoản ngân hàng đến căn cước công dân đều mang một tần số rung động điện từ trường nhất định. Trong học thuyết Bát Cực Linh Số (Bát Cực Năng Lượng Số), 64 quẻ Dịch được đúc kết thành 8 cụm từ trường chính:

1. TỨ ĐẠI CÁT TINH:
- Sinh Khí: Năng lượng quý nhân, hi vọng, sinh sôi, quan hệ tốt đẹp.
- Thiên Y: Năng lượng tài lộc chân chính, lương duyên, trí tuệ, sức khỏe.
- Diên Niên: Năng lượng lãnh đạo, trách nhiệm, uy tín, tài chính vững bền.
- Phục Vị: Năng lượng tích lũy, cẩn trọng, ổn định và bền bỉ.

2. TỨ ĐẠI HUNG TINH:
- Tuyệt Mệnh: Cực đoan, dám liều, hao tài nhanh, dễ tranh chấp.
- Ngũ Quỷ: Sáng tạo biến ảo nhưng đa nghi, tâm trạng bất an, tai ương bất ngờ.
- Lục Sát: Duyên dáng, đào hoa nhưng muộn phiền, bi lụy, hao tài vì tình.
- Họa Hại: Khẩu tài hùng biện nhưng dễ sinh khẩu thiệt thị phi, bệnh hô hấp.

Quy luật cốt lõi của môn học không phải là xua đuổi hoàn toàn các hung tinh, mà là thấu hiểu để "lấy Cát hóa Hung", sắp xếp theo trật tự tương sinh tương khắc nhằm đạt được sự cân bằng âm dương và cải biến vận mệnh gia chủ.`,
  },
  {
    ID: 2,
    TieuDe: 'Quy Tắc Vàng: Lấy Cát Chế Hung Trong Linh Số Bát Pháp',
    ChuyenMuc: 'Nghệ Thuật Cải Vận',
    NgayDang: '2026-03-20',
    TacGia: 'Viện Nghiên Cứu Linh Số',
    NoiDung: `Trong dân gian, nhiều người lầm tưởng một dãy số phong thủy tốt là phải toàn số may mắn như 68, 86, 39, 79. Tuy nhiên, theo Linh Số Bát Pháp chân truyền, một dãy số thuần Cát tinh chưa chắc đã tốt, mà thậm chí gây ra trạng thái "cực thịnh tất suy":
- Quá nhiều Sinh Khí khiến con người trở nên lười biếng, thiếu động lực phấn đấu vì việc gì cũng có người lo.
- Quá nhiều Diên Niên khiến bản thân kiệt sức vì gánh vác quá mức, gia trưởng, áp lực thần kinh.
- Quá nhiều Thiên Y dễ bị người khác lợi dụng lòng tốt, chi tiêu hào phóng mất kiểm soát.

Do đó, đỉnh cao của thuật cải vận là "CHẾ HÓA":
1. THIÊN Y CHẾ TUYỆT MỆNH: Đặt Thiên Y liền kề sau Tuyệt Mệnh. Năng lượng chân chính và phúc báo của Thiên Y biến lòng can đảm dám liều của Tuyệt Mệnh thành những thương vụ đầu tư thành công vang dội.
2. SINH KHÍ GIÁNG HỌA HẠI: Sinh Khí biến năng lượng tranh cãi thành năng lượng truyền cảm hứng, thu phục lòng người.
3. DIÊN NIÊN ÁP LỤC SÁT: Diên Niên rèn luyện kỷ luật thép, chuyển hóa sự đào hoa lộn xộn thành sự duyên dáng chuyên nghiệp trong kinh doanh.`,
  },
  {
    ID: 3,
    TieuDe: 'Bí Mật Con Số 0 và Con Số 5 Trong Dãy Số Năng Lượng',
    ChuyenMuc: 'Ứng Dụng Chuyên Sâu',
    NgayDang: '2026-03-25',
    TacGia: 'Thầy Linh Số',
    NoiDung: `Khi phân tích số điện thoại hay biển số xe, hai con số 0 và 5 đóng vai trò đặc biệt như những chiếc "kính lúp" hoặc "hố đen" làm thay đổi bản chất từ trường:

1. CON SỐ 0 (CHỦ VỀ ẨN TÀNG, TIÊU HAO, HỐ ĐEN NĂNG LƯỢNG):
- Con số 0 mang tính chất Thái Cực hư vô. Khi đứng kẹp giữa hoặc cuối cặp số, nó làm ẩn đi năng lượng đó.
- Cát tinh gặp 0 -> Giảm phúc: Thiên Y gặp 0 (ví dụ 103, 608) biểu thị tiền tài bị chôn vốn, tiền kiếm được nhưng không thấy đâu, sức khỏe có bệnh ẩn ngầm khó phát hiện. Sinh Khí gặp 0 (104, 607) biểu thị quý nhân ẩn tàng, muốn giúp mà lực bất tòng tâm.
- Hung tinh gặp 0 -> Tăng nguy hiểm ngầm: Tuyệt Mệnh gặp 0 (102, 609) biểu thị nguy cơ phá sản âm thầm, cảm xúc bị kìm nén dễ bộc phát tiêu cực.

2. CON SỐ 5 (CHỦ VỀ BỘC LỘ, GIA TĂNG, KHUYẾCH ĐẠI):
- Số 5 tượng trưng cho Trung Cung Ngũ Hoàng, mang tính chất khuếch đại cực mạnh.
- Cát tinh gặp 5 -> Phúc lộc nhân đôi: 153, 658 biểu thị tài vận lộ rõ, danh tiếng vang xa, tiền bạc đắc tài công khai.
- Hung tinh gặp 5 -> Tăng tính hung bạo: 152 biểu thị sự liều lĩnh tăng vọt, nguy cơ xung đột rõ rệt.

Lời khuyên: Tránh để số 0 xuất hiện ở phần đuôi số điện thoại (đặc biệt là 4 số cuối), vì đuôi số đại diện cho hậu vận và kết quả cuối cùng.`,
  },
  {
    ID: 4,
    TieuDe: '[Video 1] Bản Đồ Mật Mã Vận Mệnh: Đọc Số Điện Thoại Theo Linh Số Bát Pháp',
    ChuyenMuc: 'Video Bài Giảng',
    NgayDang: '2026-03-27',
    TacGia: 'Huyền Đạo Đỗ Gia 4311',
    NoiDung: `NỘI DUNG BÀI GIẢNG VIDEO 1:
Số điện thoại không chỉ là công cụ liên lạc khô khan. Theo Linh Số Bát Pháp, nó là một bản đồ mật mã định hình chính vận mệnh của bạn.

1. SAI LẦM SĂN SIM TOÀN SỐ ĐẠI CÁT (19/91):
Ai cũng thích săn sim toàn số "đại cát" như 19 hay 91 (Diên Niên). Nhưng cát quá hóa hung! Việc ôm đồm trách nhiệm cực đoan dễ khiến bạn kiệt sức và mắc bệnh cột sống.

2. GIÁ TRỊ CỦA NHÓM TỨ HUNG (12/21, 17/71):
Trái lại, nhóm "tứ hung" (12/21 Tuyệt Mệnh, 17/71 Họa Hại) tuy mang rủi ro phá sản, thị phi... nhưng lại tôi luyện ra những kỳ tài mang tư duy đột phá, liều lĩnh.

3. HỐ ĐEN SỐ 0:
Biến số đáng sợ nhất là số 0. Khi lọt vào giữa (ví dụ 103), nó hóa thành hố đen tàng hình, biến tài lộc thành nợ nần giấu kín hoặc sinh ra bí mật tình cảm.

4. QUY TẮC GIẢI MÃ CHÂN TRUYỀN:
Để tự giải mã, đừng bao giờ đọc gộp cả dãy. Hãy tách thành các cặp số gối đầu nhau để tìm ra nhóm năng lượng chủ đạo. Suy cho cùng, sức mạnh không nằm ở con số vô tri... mà ở khoảnh khắc bạn quyết định rũ bỏ thói quen cũ để tự thiết kế lại cuộc đời.`,
  },
  {
    ID: 5,
    TieuDe: '[Video 2] Nguyên Lý Thiên Hung – Địa Cát Trong Cải Biến Vận Mệnh',
    ChuyenMuc: 'Video Bài Giảng',
    NgayDang: '2026-03-27',
    TacGia: 'Huyền Đạo Đỗ Gia 4311',
    NoiDung: `NỘI DUNG BÀI GIẢNG VIDEO 2:
Mở lá số thấy hung tinh chiếu vào cung Tài Bạch... nhiều người liền hoảng sợ nghĩ năm nay cầm chắc cái nghèo. Nhưng tử vi chính tông không bao giờ phán đoán chỉ qua một vì sao rời rạc!

1. THIÊN HUNG LÀ GÌ?
Giả sử năm nay bạn dính bẫy lừa đảo, mất sạch tiền đầu tư. Sự cố này gọi là Thiên Hung — một mầm họa nằm sẵn trong gốc mệnh, nay đến lúc nảy mầm thành sự thật.

2. TẦNG ĐỊA NÂNG ĐỠ (ĐẠI VẬN 10 NĂM):
Tiền đã mất, nhưng bạn sẽ phá sản hay gượng dậy được? Câu trả lời phụ thuộc hoàn toàn vào tầng Địa (môi trường của đại vận 10 năm mà bạn đang sống). Nếu đại vận đang là "Địa Cát", nó sẽ lập tức tạo ra lực nâng đỡ. Lúc kiệt quệ nhất, quý nhân sẽ xuất hiện cho vay, hoặc gia đình bảo lãnh nợ nần.

3. CÔNG THỨC: THIÊN HUNG + ĐỊA CÁT = VIỆC LỚN HÓA NHỎ
Hạn xấu vẫn xảy ra, nhưng môi trường tốt đã làm suy yếu hung khí, giúp việc lớn hóa nhỏ, thiệt hại dừng ở mức chịu đựng được. Nhờ mảnh đất vững chãi này cưu mang cú ngã, bạn chỉ phải thắt lưng buộc bụng một thời gian ngắn, rồi hoàn toàn có thể gây dựng lại cơ đồ từ đống tro tàn.`,
  },
  {
    ID: 6,
    TieuDe: '[Video 3] Giải Mã 3 Kiểu Năng Lượng Điển Hình Trong Số Điện Thoại',
    ChuyenMuc: 'Video Bài Giảng',
    NgayDang: '2026-03-27',
    TacGia: 'Huyền Đạo Đỗ Gia 4311',
    NoiDung: `NỘI DUNG BÀI GIẢNG VIDEO 3:
Nhìn số điện thoại của bạn xem. Nó không chỉ dùng để gọi, mà là một mã số bí mật... đang âm thầm điều khiển tài vận của bạn. Hãy cùng giải mã 3 kiểu năng lượng điển hình nhất:

1. NAM CHÂM HÚT TIỀN THIÊN Y (13, 31, 68, 86):
Tính theo cặp, nếu số của bạn có 13, 31, 68 hoặc 86... Chúc mừng! Bạn sinh ra để cầm những dòng tiền lớn, cơ hội kinh doanh mở rộng, tiền hết lại có.

2. CON DAO HAI LƯỠI MANG TÊN HỌA HẠI (17, 71, 89, 98):
Bạn có tài thuyết phục cực đỉnh, hễ mở miệng là ra tiền. Nhưng bù lại, bạn rất hút thị phi, suốt ngày vướng vào cãi vã, drama và những rắc rối từ trên trời rơi xuống.

3. CẨN THẬN VỚI HỐ ĐEN SỐ 0:
Nó chễm chệ giữa dãy số và tạo ra một lực cản vô hình... âm thầm bào rút tài chính, làm công việc chững lại và gây ra những ức chế ngầm không lối thoát.

Điện thoại trên tay chính là bản đồ năng lượng của bạn. Mở máy lên và xem thử bạn đang mang số mệnh gì!`,
  },
  {
    ID: 7,
    TieuDe: '[Video 4 - Podcast 10:48] Đại Luận 8 Từ Trường: Tính Cách – Tài Vận – Gia Đạo – Sức Khỏe',
    ChuyenMuc: 'Video Bài Giảng',
    NgayDang: '2026-03-27',
    TacGia: 'Huyền Đạo Đỗ Gia 4311',
    NoiDung: `NỘI DUNG PODCAST BÀI GIẢNG VIDEO 4 (THỜI LƯỢNG 10:48):
Chuyên đề đại luận chuyên sâu về 4 trụ cột cuộc đời: TÍNH CÁCH – TÀI VẬN – GIA ĐẠO – SỨC KHỎE qua lăng kính 8 Từ Trường Bát Cực Linh Số.

═════════════════════════════════════════
I. TỨ ĐẠI CÁT TINH (CÁT TRƯỜNG)
═════════════════════════════════════════

1. TỪ TRƯỜNG THIÊN Y (13/31, 68/86, 49/94, 27/72) - ĐẠI CÁT TÀI LỘC:
• Tính cách: Lương thiện, thông tuệ, từ bi, hay giúp đỡ người khác, tâm hồn cởi mở; nhược điểm là quá dễ tin người nên dễ bị lợi dụng lòng tốt.
• Tài vận: Đại tài lộc, chủ về dòng tiền chính đạo, tiền hết lại có, đắc lộc trời ban, kinh doanh hồng phát, người sinh ra để nắm giữ nguồn tiền lớn.
• Gia đạo: Tình duyên như ý, vợ chồng hòa thuận thủy chung, hôn nhân viên mãn, gia đạo ngập tràn hạnh phúc và sự thấu hiểu.
• Sức khỏe: Thuộc Thổ sinh Kim/Thủy tuần hoàn, cần đặc biệt lưu tâm đến huyết áp cao, tim mạch, các chứng đau đầu, tuần hoàn máu não và bệnh mắt.

2. TỪ TRƯỜNG SINH KHÍ (14/41, 67/76, 39/93, 28/82) - ĐẠI CÁT QUÝ NHÂN:
• Tính cách: Lạc quan, phóng khoáng, tùy duyên, tính tình vui vẻ hòa nhã, ít so đo tính toán; nhược điểm là dễ an phận thủ thường, thiếu tính đấu tranh quyết liệt.
• Tài vận: Tiền bạc đến nhờ quý nhân tương trợ, bạn bè kết nối mối làm ăn, cơ hội tài chính liên tục mở rộng; tuy nhiên tiền vào dễ nhưng ra cũng nhanh vì chi tiêu thoáng tay.
• Gia đạo: Gia hòa vạn sự hưng, con cái thảo hiền, quan hệ gia đình đầm ấm, đi đâu cũng được mọi người yêu quý chở che.
• Sức khỏe: Thuộc Mộc, cần chú ý tỳ vị đường ruột, dạ dày, các chứng bệnh về tiêu hóa và hệ thần kinh do ăn uống tiệc tùng giao tế nhiều.

3. TỪ TRƯỜNG DIÊN NIÊN (19/91, 78/87, 34/43, 26/62) - ĐẠI CÁT LÃNH ĐẠO:
• Tính cách: Khí chất minh chủ, ý chí kiên định, tinh thần trách nhiệm cực cao, làm việc có nguyên tắc kỷ luật, cầu toàn; nhược điểm là độc đoán, gia trưởng, áp đặt suy nghĩ lên người khác.
• Tài vận: Kiếm tiền bằng năng lực chuyên môn và uy tín thực lực; giữ tiền vô địch, quản lý tài chính chặt chẽ, tiền bạc tích lũy vững như bàn thạch.
• Gia đạo: Là trụ cột vững chắc của gia đình, gánh vác mọi trọng trách; tuy nhiên tính tình nghiêm nghị dễ tạo áp lực ngột ngạt cho bạn đời và con cái.
• Sức khỏe: Thuộc Kim, thường xuyên làm việc quá tải dẫn đến thoái hóa đốt sống cổ, đau mỏi cột sống, thắt lưng, mất ngủ kéo dài và suy nhược thần kinh.

4. TỪ TRƯỜNG PHỤC VỊ (11/22, 88/99, 66/77, 33/44) - CÁT TINH BÌNH AN:
• Tính cách: Điềm đạm, cẩn trọng, kiên nhẫn, thích sự an toàn, suy nghĩ chu toàn; nhược điểm là do dự, sợ mạo hiểm, thiếu quyết đoán trong thời khắc then chốt.
• Tài vận: Tích lũy chậm mà chắc, thu nhập cố định đều đặn, tích tiểu thành đại; khó tạo ra bước nhảy vọt tài chính nếu không có yếu tố đột phá kích hoạt.
• Gia đạo: Tình cảm thụ động, ít bộc lộ cảm xúc, tình duyên êm ả nhưng dễ thiếu sự lãng mạn; hôn nhân chung thủy, bền lâu.
• Sức khỏe: Thuộc Mộc/Thổ âm, cần phòng ngừa các chứng bệnh mãn tính tái phát dai dẳng, suy giảm hệ miễn dịch, tim mạch và chứng âu lo suy nghĩ nhiều.

═════════════════════════════════════════
II. TỨ ĐẠI HUNG TINH (HUNG TRƯỜNG)
═════════════════════════════════════════

5. TỪ TRƯỜNG TUYỆT MỆNH (12/21, 69/96, 48/84, 37/73) - PHÁ QUÂN LIỀU LĨNH:
• Tính cách: Dám nghĩ dám làm, nghĩa khí bộc trực, không sợ gian khó, nhạy bén chớp thời cơ; nhược điểm là cực đoan, nóng nảy, cố chấp, hành động theo cảm tính.
• Tài vận: Kiếm tiền nhanh và lớn, thích đầu tư mạo hiểm; nhưng tiêu tiền bạo tay, tiền đến nhanh đi nhanh, dễ lâm vào tình trạng hao tài tán của hoặc phá sản nếu không biết điểm dừng.
• Gia đạo: Thiếu kiên nhẫn với người nhà, tính khí bộc phát dễ gây xung đột, cãi vã; hôn nhân nhiều sóng gió, trắc trở.
• Sức khỏe: Thuộc Kim hung, cần đặc biệt lưu ý các bệnh về thận, hệ tiết niệu, gan và các chấn thương ngoại khoa do tai nạn bất ngờ.

6. TỪ TRƯỜNG NGŨ QUỶ (18/81, 79/97, 36/63, 24/42) - THIÊN TÀI BIẾN HÓA:
• Tính cách: Trí tuệ phi phàm, khả năng sáng tạo đột phá, mưu lược sâu sắc, giác quan thứ 6 cực nhạy; nhược điểm là đa nghi, tâm trạng thất thường khó đoán, thiếu cảm giác an toàn.
• Tài vận: Hoạnh tài, đắc tiền của từ những cách khác người hoặc các ngành nghề biến ảo (chứng khoán, sáng tạo, công nghệ, bất động sản); nhưng tiền bạc bất định, hao tài vì bị phản bội hoặc rủi ro pháp lý.
• Gia đạo: Bất an, hay hoài nghi người phối ngẫu, dễ nảy sinh đào hoa ngầm và các mối quan hệ bí mật ngoài hôn nhân; gia đạo khó yên.
• Sức khỏe: Thuộc Hỏa hung, chú ý bệnh tim mạch, huyết áp, tai biến, đột quỵ, hệ thần kinh và chứng mất ngủ triền miên.

7. TỪ TRƯỜNG LỤC SÁT (16/61, 47/74, 38/83, 29/92) - ĐÀO HOA BI LỤY:
• Tính cách: Duyên dáng, thẩm mỹ cao, khéo léo trong giao tiếp ứng xử, tinh tế; nhược điểm là tâm lý yếu đuối, dễ bi lụy sầu muộn, hay để bụng, hướng nội thái quá.
• Tài vận: Kiếm tiền nhờ các mối quan hệ xã hội, ngành dịch vụ, nghệ thuật, kinh doanh với phụ nữ; nhưng hao tiền vì chuyện tình cảm, mua sắm hưởng thụ và chi tiêu cảm tính.
• Gia đạo: Đào hoa nở rộ nhưng dễ vướng "đào hoa sát", tình cảm rối ren, hay rơi vào trạng thái đứng núi này trông núi nọ; hôn nhân khó bền chặt nếu không biết tu tâm.
• Sức khỏe: Thuộc Thủy hung, dễ mắc các bệnh về da liễu, đường hô hấp, tỳ vị, suy nhược tinh thần và hội chứng trầm cảm do u uất lâu ngày.

8. TỪ TRƯỜNG HỌA HẠI (17/71, 89/98, 46/64, 23/32) - KHẨU TÀI THỊ PHI:
• Tính cách: Khẩu tài xuất chúng, tài hùng biện sắc sảo, thích thuyết phục người khác; nhược điểm là háo thắng, thích tranh cãi hơn thua, nói năng không giữ mồm miệng, "khẩu xà tâm phật".
• Tài vận: Kiếm tiền bằng mồm mép (bán hàng, tư vấn, ngoại giao, đào tạo); nhưng tiền kiếm được bao nhiêu lại hao hụt bấy nhiêu do thị phi, đền bù hợp đồng hoặc chi tiền mua danh diện.
• Gia đạo: Khắc khẩu với bạn đời, hay cằn nhằn chỉ trích vụn vặt, lời nói vô tình như nhát dao cứa vào tình cảm gia đình; quan hệ người thân rạn nứt.
• Sức khỏe: Thuộc Thổ hung, dễ mắc bệnh vùng hầu họng, thanh quản, khí quản, phổi và các bệnh mãn tính liên quan đến đường hô hấp.

═════════════════════════════════════════
III. KIM CHỈ NAM CẢI VẬN CỐT LÕI
═════════════════════════════════════════
• Không có từ trường nào hoàn toàn tốt hay hoàn toàn xấu. 
• Nghệ thuật cải vận chân truyền là "Lấy Cát Chế Hung": dùng Thiên Y chế Tuyệt Mệnh, dùng Sinh Khí giáng Họa Hại, dùng Diên Niên áp Lục Sát, và dùng Sinh Khí + Diên Niên thuần hóa Ngũ Quỷ.
• Quý vị có thể xem lại toàn bộ trình chiếu video trực quan 10:48 tại mục "Video Bài Giảng" trên hệ thống!`,
  },
];

export const DEFAULT_TRA_CUU: TraCuuRecord[] = [];

export const INITIAL_DATA: SheetFullData = {
  TuTruong: DEFAULT_TU_TRUONG,
  ChuyenHoa: DEFAULT_CHUYEN_HOA,
  TraCuuSo: DEFAULT_TRA_CUU,
  BaiVietCaiVan: DEFAULT_BAI_VIET,
};
