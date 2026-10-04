import { NhomNangLuong, TraCuuRecord } from '../types';

export interface CapSoDetail {
  capSo: string;
  tuTruong: string;
  nhom: NhomNangLuong;
  capDo: string;
  yNghia: string;
  moTaNgan: string;
  nguHanh: string;
}

export interface AnalysisResult {
  daySoGoc: string;
  daySoChuanHoa: string;
  cacCapSo: CapSoDetail[];
  tongSoCap: number;
  soLuongCat: number;
  soLuongHung: number;
  soLuongTrung: number;
  tiLeCat: number;
  diemSo: number;
  danhGia: string;
  nhanDinhTongQuan: string;
  loiKhuyenCaiVan: string;
  tuTruongDuoi: CapSoDetail | null;
  coHoaGiai: boolean;
  chiTietHoaGiai: string[];
}

// Bảng tra cứu các cặp số theo 8 từ trường
const MAP_CAP_SO: Record<string, { tuTruong: string; nhom: NhomNangLuong; capDo: string; yNghia: string; nguHanh: string }> = {
  // 1. SINH KHÍ (Dương Mộc - Cát)
  '14': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Đại quý nhân, cơ hội lớn, vận may hanh thông', nguHanh: 'Mộc' },
  '41': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Đại quý nhân, cơ hội lớn, vận may hanh thông', nguHanh: 'Mộc' },
  '67': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Bạn bè quý nhân trợ lực, lạc quan an nhiên', nguHanh: 'Mộc' },
  '76': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Bạn bè quý nhân trợ lực, lạc quan an nhiên', nguHanh: 'Mộc' },
  '39': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Hòa nhã, cuộc sống bình an, may mắn nhỏ', nguHanh: 'Mộc' },
  '93': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Hòa nhã, cuộc sống bình an, may mắn nhỏ', nguHanh: 'Mộc' },
  '28': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Hòa hợp các mối quan hệ xã giao', nguHanh: 'Mộc' },
  '82': { tuTruong: 'Sinh Khí', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Hòa hợp các mối quan hệ xã giao', nguHanh: 'Mộc' },

  // 2. THIÊN Y (Dương Thổ - Cát)
  '13': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Đại phú đại quý, tài lộc dồi dào, sức khỏe viên mãn', nguHanh: 'Thổ' },
  '31': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Đại phú đại quý, tài lộc dồi dào, sức khỏe viên mãn', nguHanh: 'Thổ' },
  '68': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Kinh doanh phát đạt, tiền của sinh sôi', nguHanh: 'Thổ' },
  '86': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Kinh doanh phát đạt, tiền của sinh sôi', nguHanh: 'Thổ' },
  '49': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Thu nhập ổn định, hôn nhân hòa hợp', nguHanh: 'Thổ' },
  '94': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Thu nhập ổn định, hôn nhân hòa hợp', nguHanh: 'Thổ' },
  '27': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Lộc nhỏ đều đặn, gia đạo ấm êm', nguHanh: 'Thổ' },
  '72': { tuTruong: 'Thiên Y', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Lộc nhỏ đều đặn, gia đạo ấm êm', nguHanh: 'Thổ' },

  // 3. DIÊN NIÊN (Dương Kim - Cát)
  '19': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Lãnh đạo uy quyền, gánh vác việc lớn, tài chính vững chắc', nguHanh: 'Kim' },
  '91': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Lãnh đạo uy quyền, gánh vác việc lớn, tài chính vững chắc', nguHanh: 'Kim' },
  '78': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Quản lý giỏi, kiên trì, chuyên môn cao', nguHanh: 'Kim' },
  '87': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Quản lý giỏi, kiên trì, chuyên môn cao', nguHanh: 'Kim' },
  '34': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Cần cù, trách nhiệm vừa phải, công việc bền vững', nguHanh: 'Kim' },
  '43': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Cần cù, trách nhiệm vừa phải, công việc bền vững', nguHanh: 'Kim' },
  '26': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Mềm mỏng, thích nghi tốt, tỉ mỉ', nguHanh: 'Kim' },
  '62': { tuTruong: 'Diên Niên', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Mềm mỏng, thích nghi tốt, tỉ mỉ', nguHanh: 'Kim' },

  // 4. PHỤC VỊ (Âm Mộc - Cát/Bình)
  '11': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Bền bỉ tột bực, nội lực thâm hậu, chờ thời bứt phá', nguHanh: 'Mộc' },
  '22': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 1 (Mạnh nhất)', yNghia: 'Bền bỉ tột bực, nội lực thâm hậu, chờ thời bứt phá', nguHanh: 'Mộc' },
  '88': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Chắc chắn, cẩn trọng, tích lũy nền tảng an toàn', nguHanh: 'Mộc' },
  '99': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 2', yNghia: 'Chắc chắn, cẩn trọng, tích lũy nền tảng an toàn', nguHanh: 'Mộc' },
  '66': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Bình hòa, ổn định, tránh biến động xáo trộn', nguHanh: 'Mộc' },
  '77': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 3', yNghia: 'Bình hòa, ổn định, tránh biến động xáo trộn', nguHanh: 'Mộc' },
  '33': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Thích an toàn, kiên nhẫn làm việc chuyên môn', nguHanh: 'Mộc' },
  '44': { tuTruong: 'Phục Vị', nhom: 'Cát Tinh', capDo: 'Cấp 4', yNghia: 'Thích an toàn, kiên nhẫn làm việc chuyên môn', nguHanh: 'Mộc' },

  // 5. TUYỆT MỆNH (Dương Kim - Hung)
  '12': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Dám nghĩ dám liều, vào nhanh ra nhanh, dễ hao tài và kiện tụng', nguHanh: 'Kim' },
  '21': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Dám nghĩ dám liều, vào nhanh ra nhanh, dễ hao tài và kiện tụng', nguHanh: 'Kim' },
  '69': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Cực đoan, đầu tư mạo hiểm, thăng trầm tài chính', nguHanh: 'Kim' },
  '96': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Cực đoan, đầu tư mạo hiểm, thăng trầm tài chính', nguHanh: 'Kim' },
  '48': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Nóng nảy, dễ chi tiêu bốc đồng, bất hòa tiền bạc', nguHanh: 'Kim' },
  '84': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Nóng nảy, dễ chi tiêu bốc đồng, bất hòa tiền bạc', nguHanh: 'Kim' },
  '37': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Cảm tính, dễ xúc động, tiền tài hao hụt dần', nguHanh: 'Kim' },
  '73': { tuTruong: 'Tuyệt Mệnh', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Cảm tính, dễ xúc động, tiền tài hao hụt dần', nguHanh: 'Kim' },

  // 6. NGŨ QUỶ (Âm Hỏa - Hung)
  '18': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Tài trí kiệt xuất nhưng biến động khôn lường, dễ họa bất ngờ', nguHanh: 'Hỏa' },
  '81': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Tài trí kiệt xuất nhưng biến động khôn lường, dễ họa bất ngờ', nguHanh: 'Hỏa' },
  '79': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Nhiều toan tính, đa nghi, dễ mất ngủ và hao tổn tinh thần', nguHanh: 'Hỏa' },
  '97': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Nhiều toan tính, đa nghi, dễ mất ngủ và hao tổn tinh thần', nguHanh: 'Hỏa' },
  '36': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Sáng tạo nhanh nhưng thất thường, tâm trạng bất an', nguHanh: 'Hỏa' },
  '63': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Sáng tạo nhanh nhưng thất thường, tâm trạng bất an', nguHanh: 'Hỏa' },
  '24': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Lanh lợi nhưng thiếu kiên nhẫn, dễ đổi ý', nguHanh: 'Hỏa' },
  '42': { tuTruong: 'Ngũ Quỷ', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Lanh lợi nhưng thiếu kiên nhẫn, dễ đổi ý', nguHanh: 'Hỏa' },

  // 7. LỤC SÁT (Âm Thủy - Hung)
  '16': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Đào hoa nặng, đa sầu đa cảm, thị phi tình ái, hao tài vì tình', nguHanh: 'Thủy' },
  '61': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Đào hoa nặng, đa sầu đa cảm, thị phi tình ái, hao tài vì tình', nguHanh: 'Thủy' },
  '47': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Yêu cái đẹp, tinh tế nhưng hay muộn phiền, suy diễn', nguHanh: 'Thủy' },
  '74': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Yêu cái đẹp, tinh tế nhưng hay muộn phiền, suy diễn', nguHanh: 'Thủy' },
  '38': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Duyên ngầm, dễ lung lay cảm xúc, tiêu xài mua sắm nhiều', nguHanh: 'Thủy' },
  '83': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Duyên ngầm, dễ lung lay cảm xúc, tiêu xài mua sắm nhiều', nguHanh: 'Thủy' },
  '29': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Giao tiếp nhẹ nhàng nhưng nội tâm hay ưu tư', nguHanh: 'Thủy' },
  '92': { tuTruong: 'Lục Sát', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Giao tiếp nhẹ nhàng nhưng nội tâm hay ưu tư', nguHanh: 'Thủy' },

  // 8. HỌA HẠI (Âm Thổ - Hung)
  '17': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Khẩu tài hùng biện nhưng dễ sinh thị phi, hiếu thắng, bệnh hô hấp', nguHanh: 'Thổ' },
  '71': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 1 (Cực hung)', yNghia: 'Khẩu tài hùng biện nhưng dễ sinh thị phi, hiếu thắng, bệnh hô hấp', nguHanh: 'Thổ' },
  '89': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Thích tranh cãi, cái tôi lớn, dễ hao tài vì sĩ diện', nguHanh: 'Thổ' },
  '98': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 2', yNghia: 'Thích tranh cãi, cái tôi lớn, dễ hao tài vì sĩ diện', nguHanh: 'Thổ' },
  '46': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Nói nhiều dễ lỡ lời, gây phật lòng người xung quanh', nguHanh: 'Thổ' },
  '64': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 3', yNghia: 'Nói nhiều dễ lỡ lời, gây phật lòng người xung quanh', nguHanh: 'Thổ' },
  '23': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Khéo miệng, thích buôn chuyện, sức đề kháng hô hấp kém', nguHanh: 'Thổ' },
  '32': { tuTruong: 'Họa Hại', nhom: 'Hung Tinh', capDo: 'Cấp 4', yNghia: 'Khéo miệng, thích buôn chuyện, sức đề kháng hô hấp kém', nguHanh: 'Thổ' },
};

/**
 * Xử lý số 0 và 5:
 * Khi gặp 0 giữa 2 số (ví dụ 104, 608): tương đương 14, 68 nhưng năng lượng bị ẩn tàng/giảm đi.
 * Khi gặp 5 giữa 2 số (ví dụ 154, 658): năng lượng bộc lộ và gia tăng.
 */
export function lookupPair(pair: string): CapSoDetail {
  const cleanPair = pair.replace(/\D/g, '');

  if (MAP_CAP_SO[cleanPair]) {
    const item = MAP_CAP_SO[cleanPair];
    return {
      capSo: cleanPair,
      tuTruong: item.tuTruong,
      nhom: item.nhom,
      capDo: item.capDo,
      yNghia: item.yNghia,
      moTaNgan: `${item.tuTruong} (${item.capDo})`,
      nguHanh: item.nguHanh,
    };
  }

  // Trường hợp có 0 hoặc 5 (cầu nối năng lượng)
  if (cleanPair.includes('0') || cleanPair.includes('5')) {
    const withoutZeroFive = cleanPair.replace(/[05]/g, '');
    if (withoutZeroFive.length === 2 && MAP_CAP_SO[withoutZeroFive]) {
      const base = MAP_CAP_SO[withoutZeroFive];
      const hasZero = cleanPair.includes('0');
      const hasFive = cleanPair.includes('5');
      
      let note = '';
      if (hasZero && hasFive) {
        note = 'Vừa có số 0 (ẩn tàng) vừa có số 5 (bộc lộ), năng lượng biến chuyển thất thường.';
      } else if (hasZero) {
        note = `Có số 0: Năng lượng ${base.tuTruong} bị ẩn tàng, suy giảm phúc khí hoặc ủ bệnh/nguy cơ ngầm.`;
      } else {
        note = `Có số 5: Năng lượng ${base.tuTruong} bộc lộ mạnh mẽ, tính chất được nhân đôi.`;
      }

      return {
        capSo: cleanPair,
        tuTruong: `${base.tuTruong} (${hasZero ? 'Ẩn' : 'Hiện'})`,
        nhom: base.nhom,
        capDo: base.capDo,
        yNghia: `${base.yNghia}. ${note}`,
        moTaNgan: `${base.tuTruong} ${hasZero ? 'gặp 0' : 'gặp 5'}`,
        nguHanh: base.nguHanh,
      };
    }
  }

  // Cặp số chưa phân loại rõ ràng (ví dụ chứa 00, 55 đơn độc hoặc đầu số 09)
  return {
    capSo: cleanPair,
    tuTruong: 'Phục Vị Biến Thể',
    nhom: 'Trung Tính',
    capDo: 'Giao thoa',
    yNghia: 'Cặp số chuyển tiếp, mang tính tích lũy hoặc đệm năng lượng',
    moTaNgan: 'Giao hòa / Trung tính',
    nguHanh: 'Thổ',
  };
}

/**
 * Phân tích trọn vẹn một dãy số (Số điện thoại, biển số, CCCD, v.v.)
 */
export function analyzeNumberSequence(input: string): AnalysisResult {
  const daySoGoc = input.trim();
  const digitsOnly = daySoGoc.replace(/\D/g, '');

  if (digitsOnly.length < 2) {
    return {
      daySoGoc,
      daySoChuanHoa: digitsOnly,
      cacCapSo: [],
      tongSoCap: 0,
      soLuongCat: 0,
      soLuongHung: 0,
      soLuongTrung: 0,
      tiLeCat: 0,
      diemSo: 0,
      danhGia: 'Chưa đủ ký tự để phân tích',
      nhanDinhTongQuan: 'Vui lòng nhập dãy số từ 2 chữ số trở lên để hệ thống phân giải các trường năng lượng.',
      loiKhuyenCaiVan: 'Hãy nhập dãy số hoàn chỉnh (ví dụ: 0988686831).',
      tuTruongDuoi: null,
      coHoaGiai: false,
      chiTietHoaGiai: [],
    };
  }

  // Tách các cặp số 2 chữ số liên tiếp
  const cacCapSo: CapSoDetail[] = [];
  for (let i = 0; i < digitsOnly.length - 1; i++) {
    const pair = digitsOnly.substring(i, i + 2);
    // Nếu có 0 hoặc 5 ở giữa, xem xét cụm 3 số nếu hợp lệ
    cacCapSo.push(lookupPair(pair));
  }

  // Thống kê Cát / Hung
  let soLuongCat = 0;
  let soLuongHung = 0;
  let soLuongTrung = 0;

  cacCapSo.forEach((cap) => {
    if (cap.nhom === 'Cát Tinh') soLuongCat++;
    else if (cap.nhom === 'Hung Tinh') soLuongHung++;
    else soLuongTrung++;
  });

  const tongSoCap = cacCapSo.length;
  const tiLeCat = tongSoCap > 0 ? Math.round((soLuongCat / tongSoCap) * 100) : 0;

  // Kiểm tra đuôi số (cặp cuối cùng - quyết định hậu vận)
  const tuTruongDuoi = cacCapSo.length > 0 ? cacCapSo[cacCapSo.length - 1] : null;

  // Kiểm tra các phép hóa giải tương hỗ trong dãy số
  const chiTietHoaGiai: string[] = [];
  let diemCongHoaGiai = 0;

  for (let i = 0; i < cacCapSo.length - 1; i++) {
    const truoc = cacCapSo[i];
    const sau = cacCapSo[i + 1];

    // Tuyệt Mệnh + Thiên Y
    if (truoc.tuTruong.includes('Tuyệt Mệnh') && sau.tuTruong.includes('Thiên Y')) {
      chiTietHoaGiai.push(`Phép "Thiên Y chế Tuyệt Mệnh": Cặp ${truoc.capSo} được hóa giải hoàn hảo bởi ${sau.capSo}, biến liều lĩnh thành tài lộc.`);
      diemCongHoaGiai += 8;
    }
    // Họa Hại + Sinh Khí
    if (truoc.tuTruong.includes('Họa Hại') && sau.tuTruong.includes('Sinh Khí')) {
      chiTietHoaGiai.push(`Phép "Sinh Khí giáng Họa Hại": Cặp ${truoc.capSo} được ${sau.capSo} hóa giải khẩu thiệt thị phi, kích phát quý nhân.`);
      diemCongHoaGiai += 8;
    }
    // Lục Sát + Diên Niên
    if (truoc.tuTruong.includes('Lục Sát') && sau.tuTruong.includes('Diên Niên')) {
      chiTietHoaGiai.push(`Phép "Diên Niên áp Lục Sát": Cặp ${truoc.capSo} được ${sau.capSo} chế ngự đào hoa xấu, tăng cường lý trí và ý chí.`);
      diemCongHoaGiai += 8;
    }
    // Ngũ Quỷ + Sinh Khí / Diên Niên
    if (truoc.tuTruong.includes('Ngũ Quỷ') && (sau.tuTruong.includes('Sinh Khí') || sau.tuTruong.includes('Diên Niên'))) {
      chiTietHoaGiai.push(`Phép "Hóa giải Ngũ Quỷ": Cặp ${truoc.capSo} được ${sau.capSo} bình ổn tâm tính, biến tài trí thành thành quả vững chắc.`);
      diemCongHoaGiai += 8;
    }
  }

  // Tính điểm số tổng thể từ 0 - 100
  let diemSo = Math.round(50 + (soLuongCat * 7) - (soLuongHung * 6) + diemCongHoaGiai);

  // Đuôi số quyết định rất quan trọng
  if (tuTruongDuoi) {
    if (tuTruongDuoi.nhom === 'Cát Tinh') {
      diemSo += 10;
      if (tuTruongDuoi.tuTruong.includes('Thiên Y') || tuTruongDuoi.tuTruong.includes('Sinh Khí')) {
        diemSo += 5; // Cát tinh tài lộc chốt hậu vận
      }
    } else if (tuTruongDuoi.nhom === 'Hung Tinh') {
      diemSo -= 15; // Hung tinh ở đuôi rất xấu
    }
  }

  // Số 0 ở cuối cùng
  if (digitsOnly.endsWith('0')) {
    diemSo -= 10;
    chiTietHoaGiai.push('Cảnh báo: Dãy số kết thúc bằng số 0, chủ về hậu vận tiêu tán, hư vô, làm nhiều hưởng ít.');
  }

  // Giới hạn điểm từ 15 đến 98
  diemSo = Math.max(15, Math.min(98, diemSo));

  // Đánh giá danh hiệu
  let danhGia = '';
  if (diemSo >= 90) danhGia = 'Đại Cát - Vượng Tài Tiến Bảo';
  else if (diemSo >= 78) danhGia = 'Cát Hanh - Quý Nhân Trợ Lực';
  else if (diemSo >= 65) danhGia = 'Trung Cát - Hài Hòa Ổn Định';
  else if (diemSo >= 50) danhGia = 'Bình Hòa - Cát Hung Tương Bán';
  else if (diemSo >= 35) danhGia = 'Hung Đa Cát Thiểu - Cần Hóa Giải';
  else danhGia = 'Đại Hung - Hao Tài Tổn Khí';

  // Nhận định tổng quan
  let nhanDinhTongQuan = '';
  if (soLuongCat > soLuongHung * 2) {
    nhanDinhTongQuan = `Dãy số có trường năng lượng tích cực chiếm ưu thế vượt trội (${soLuongCat} cặp Cát / ${soLuongHung} cặp Hung). Người sử dụng tâm tính hào sảng, công việc và các mối quan hệ xã hội phát triển thuận lợi.`;
  } else if (soLuongHung > soLuongCat) {
    nhanDinhTongQuan = `Dãy số mang nhiều từ trường biến động (${soLuongHung} cặp Hung tinh so với ${soLuongCat} cặp Cát tinh). Người sở hữu dễ gặp áp lực trong công việc, tiền tài vào nhanh ra nhanh hoặc tâm trạng nhiều lúc bất an.`;
  } else {
    nhanDinhTongQuan = `Dãy số có sự pha trộn giữa Cát và Hung khá đồng đều (${soLuongCat} Cát, ${soLuongHung} Hung, ${soLuongTrung} Trung tính). Vận thế có thăng có trầm, nếu biết kết hợp hóa giải sẽ xoay chuyển cục diện tích cực.`;
  }

  // Lời khuyên cải vận
  let loiKhuyenCaiVan = '';
  if (tuTruongDuoi && tuTruongDuoi.nhom === 'Hung Tinh') {
    loiKhuyenCaiVan = `Hậu vận dãy số rơi vào ${tuTruongDuoi.tuTruong} (${tuTruongDuoi.capSo}) là điềm báo cuối cùng bất lợi. Lời khuyên: Nếu dùng làm số liên lạc kinh doanh lâu dài, nên chọn thêm dãy số phụ có đuôi Thiên Y (13, 68) hoặc Sinh Khí (14, 67) để cân bằng lại vận trình tài chính.`;
  } else if (chiTietHoaGiai.length > 0) {
    loiKhuyenCaiVan = `Dãy số đã có thế chuyển hóa cát tường: ${chiTietHoaGiai[0]} Hãy duy trì tâm thế lương thiện, không ngừng học hỏi và giữ gìn chữ tín để phát huy tối đa phúc khí.`;
  } else if (diemSo >= 80) {
    loiKhuyenCaiVan = `Dãy số sở hữu trường năng lượng rất sáng. Nên kết hợp thêm lối sống tích cực, phóng khoáng, chia sẻ bớt tài lộc cho cộng đồng để duy trì mạch năng lượng bền vững.`;
  } else {
    loiKhuyenCaiVan = `Nên bổ sung các cặp số Thiên Y (13, 68) hoặc Diên Niên (19, 78) trong mật khẩu, tài khoản ngân hàng hoặc số phụ để tăng cường năng lượng bảo hộ cho bản thân.`;
  }

  return {
    daySoGoc,
    daySoChuanHoa: digitsOnly,
    cacCapSo,
    tongSoCap,
    soLuongCat,
    soLuongHung,
    soLuongTrung,
    tiLeCat,
    diemSo,
    danhGia,
    nhanDinhTongQuan,
    loiKhuyenCaiVan,
    tuTruongDuoi,
    coHoaGiai: chiTietHoaGiai.length > 0,
    chiTietHoaGiai,
  };
}

/**
 * Chuyển AnalysisResult sang định dạng bản ghi TraCuuRecord để đồng bộ Google Sheets
 */
export function formatAnalysisToRecord(result: AnalysisResult): TraCuuRecord {
  const dateStr = new Date().toISOString().split('T')[0];
  const tomTatPhanTich = `${result.danhGia} (${result.diemSo}/100đ). Cát: ${result.soLuongCat} cặp, Hung: ${result.soLuongHung} cặp. ${result.nhanDinhTongQuan}`;

  return {
    SoDienThoaiHoacDaySo: result.daySoGoc,
    PhanTichChiTiet: tomTatPhanTich,
    DiemSo: result.diemSo,
    DanhGia: result.danhGia,
    NgayTraCuu: dateStr,
    ChiTietCapSo: result.cacCapSo.map((c) => ({
      capSo: c.capSo,
      tuTruong: c.tuTruong,
      nhom: c.nhom,
      yNghia: c.yNghia,
      mucDo: c.capDo,
    })),
  };
}
