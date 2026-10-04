/**
 * Mã nguồn Google Apps Script (Code.gs) chuẩn cho hệ thống "SỔ TAY LINH SỐ BÁT PHÁP".
 * Hỗ trợ tạo cấu trúc 4 Sheet tự động và cung cấp API RESTful (doGet, doPost).
 */
export const GOOGLE_APPS_SCRIPT_CODE = `/**
 * =========================================================================
 * SỔ TAY LINH SỐ BÁT PHÁP - GOOGLE APPS SCRIPT WEB APP BACKEND (Code.gs)
 * =========================================================================
 * 
 * HƯỚNG DẪN CÀI ĐẶT NHANH (3 BƯỚC):
 * 1. Mở Google Sheets mới -> Nhấp "Tiện ích mở rộng" (Extensions) -> "Apps Script".
 * 2. Xóa hết code cũ, dán toàn bộ đoạn code này vào file Code.gs.
 * 3. Bấm "Triển khai" (Deploy) -> "Tùy chọn triển khai mới" (New deployment):
 *    - Chọn loại: Ứng dụng web (Web app)
 *    - Thực thi dưới dạng (Execute as): "Tôi" (Me)
 *    - Ai có quyền truy cập (Who has access): "Bất kỳ ai" (Anyone)
 *    - Nhấp "Triển khai" (Deploy) và sao chép Web App URL dán vào ứng dụng web!
 */

// Tên các bảng tính chuẩn trong Database
var SHEET_TU_TRUONG = "TuTrường";
var SHEET_CHUYEN_HOA = "ChuyenHoa";
var SHEET_TRA_CUU_SO = "TraCuuSo";
var SHEET_BAI_VIET = "BaiVietCaiVan";

/**
 * Xử lý yêu cầu HTTP GET
 * Endpoint: ?action=getAll | getTuTruong | getChuyenHoa | getTraCuu | getBaiViet | ping | init
 */
function doGet(e) {
  var action = (e && e.parameter && e.parameter.action) ? e.parameter.action : "getAll";
  
  try {
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    
    // Nếu chưa khởi tạo cấu trúc các sheet, tự động khởi tạo ngay
    ensureSheetsInitialized(ss);
    
    var responseData = {};
    
    if (action === "ping") {
      return jsonResponse({
        status: "success",
        message: "Kết nối Google Apps Script thành công!",
        timestamp: new Date().toISOString()
      });
    }
    
    if (action === "init") {
      initSampleData(ss);
      return jsonResponse({
        status: "success",
        message: "Đã khởi tạo dữ liệu mẫu thành công cho cả 4 sheet!",
        timestamp: new Date().toISOString()
      });
    }
    
    if (action === "getAll") {
      responseData = {
        TuTruong: readSheetData(ss.getSheetByName(SHEET_TU_TRUONG)),
        ChuyenHoa: readSheetData(ss.getSheetByName(SHEET_CHUYEN_HOA)),
        TraCuuSo: readSheetData(ss.getSheetByName(SHEET_TRA_CUU_SO)),
        BaiVietCaiVan: readSheetData(ss.getSheetByName(SHEET_BAI_VIET))
      };
    } else if (action === "getTuTruong") {
      responseData = readSheetData(ss.getSheetByName(SHEET_TU_TRUONG));
    } else if (action === "getChuyenHoa") {
      responseData = readSheetData(ss.getSheetByName(SHEET_CHUYEN_HOA));
    } else if (action === "getTraCuu") {
      responseData = readSheetData(ss.getSheetByName(SHEET_TRA_CUU_SO));
    } else if (action === "getBaiViet") {
      responseData = readSheetData(ss.getSheetByName(SHEET_BAI_VIET));
    } else {
      return jsonResponse({
        status: "error",
        message: "Hành động (action) không hợp lệ: " + action
      });
    }
    
    return jsonResponse({
      status: "success",
      action: action,
      data: responseData,
      timestamp: new Date().toISOString()
    });
    
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: "Lỗi xử lý doGet: " + error.toString()
    });
  }
}

/**
 * Xử lý yêu cầu HTTP POST
 * Nhận dữ liệu thêm mới: tra cứu số, bài viết, hoặc cập nhật
 */
function doPost(e) {
  try {
    var contents = e.postData ? e.postData.contents : "";
    var payload = {};
    if (contents) {
      try {
        payload = JSON.parse(contents);
      } catch (err) {
        payload = e.parameter;
      }
    } else {
      payload = e.parameter;
    }
    
    var action = payload.action || "saveTraCuu";
    var ss = SpreadsheetApp.getActiveSpreadsheet();
    ensureSheetsInitialized(ss);
    
    if (action === "saveTraCuu") {
      var sheetTraCuu = ss.getSheetByName(SHEET_TRA_CUU_SO);
      var soDienThoai = payload.SoDienThoaiHoacDaySo || payload.phone || "";
      var phanTich = payload.PhanTichChiTiet || payload.analysis || "";
      var diemSo = payload.DiemSo || payload.score || 0;
      var danhGia = payload.DanhGia || payload.rating || "";
      var ngayTraCuu = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd HH:mm:ss");
      
      sheetTraCuu.appendRow([soDienThoai, phanTich, diemSo, danhGia, ngayTraCuu]);
      
      return jsonResponse({
        status: "success",
        message: "Đã lưu lịch sử tra cứu vào Google Sheets thành công!",
        data: {
          SoDienThoaiHoacDaySo: soDienThoai,
          PhanTichChiTiet: phanTich,
          DiemSo: diemSo,
          DanhGia: danhGia,
          NgayTraCuu: ngayTraCuu
        }
      });
    }
    
    if (action === "addBaiViet") {
      var sheetBaiViet = ss.getSheetByName(SHEET_BAI_VIET);
      var newId = new Date().getTime();
      var tieuDe = payload.TieuDe || "";
      var chuyenMuc = payload.ChuyenMuc || "Cải Vận";
      var noiDung = payload.NoiDung || "";
      var ngayDang = Utilities.formatDate(new Date(), "GMT+7", "yyyy-MM-dd");
      
      sheetBaiViet.appendRow([newId, tieuDe, chuyenMuc, noiDung, ngayDang]);
      
      return jsonResponse({
        status: "success",
        message: "Đã thêm bài viết mới vào Google Sheets!",
        data: { ID: newId, TieuDe: tieuDe }
      });
    }

    if (action === "initSample") {
      initSampleData(ss);
      return jsonResponse({
        status: "success",
        message: "Đã khởi tạo thành công dữ liệu mẫu Bát Cực Linh Số vào Google Sheets!"
      });
    }
    
    return jsonResponse({
      status: "error",
      message: "Hành động POST không hợp lệ: " + action
    });
    
  } catch (error) {
    return jsonResponse({
      status: "error",
      message: "Lỗi xử lý doPost: " + error.toString()
    });
  }
}

/**
 * Đọc dữ liệu từ một Sheet thành mảng các Object dựa trên dòng tiêu đề đầu tiên
 */
function readSheetData(sheet) {
  if (!sheet) return [];
  var lastRow = sheet.getLastRow();
  var lastCol = sheet.getLastColumn();
  if (lastRow <= 1 || lastCol === 0) return [];
  
  var values = sheet.getRange(1, 1, lastRow, lastCol).getValues();
  var headers = values[0];
  var results = [];
  
  for (var r = 1; r < values.length; r++) {
    var row = values[r];
    // Kiểm tra dòng có dữ liệu không
    var hasData = false;
    for (var c = 0; c < row.length; c++) {
      if (row[c] !== "" && row[c] !== null) {
        hasData = true;
        break;
      }
    }
    if (!hasData) continue;
    
    var obj = {};
    for (var h = 0; h < headers.length; h++) {
      var key = headers[h].toString().trim();
      obj[key] = row[h];
    }
    results.push(obj);
  }
  return results;
}

/**
 * Đảm bảo 4 sheet cơ sở tồn tại với đúng tiêu đề cột
 */
function ensureSheetsInitialized(ss) {
  // 1. Sheet TuTrường
  var sheetTuTruong = ss.getSheetByName(SHEET_TU_TRUONG);
  if (!sheetTuTruong) {
    sheetTuTruong = ss.insertSheet(SHEET_TU_TRUONG);
    sheetTuTruong.appendRow(["MaSo", "TenTuTruong", "NhomNangLuong", "YNghia", "MoTaChiTiet", "UngDungCaiVan"]);
    formatHeaderRow(sheetTuTruong);
  }
  
  // 2. Sheet ChuyenHoa
  var sheetChuyenHoa = ss.getSheetByName(SHEET_CHUYEN_HOA);
  if (!sheetChuyenHoa) {
    sheetChuyenHoa = ss.insertSheet(SHEET_CHUYEN_HOA);
    sheetChuyenHoa.appendRow(["ID", "TuTruongGoc", "TuTruongChuyenDoi", "YNghiaChuyenHoa", "LoiKhuyen"]);
    formatHeaderRow(sheetChuyenHoa);
  }
  
  // 3. Sheet TraCuuSo
  var sheetTraCuu = ss.getSheetByName(SHEET_TRA_CUU_SO);
  if (!sheetTraCuu) {
    sheetTraCuu = ss.insertSheet(SHEET_TRA_CUU_SO);
    sheetTraCuu.appendRow(["SoDienThoaiHoacDaySo", "PhanTichChiTiet", "DiemSo", "DanhGia", "NgayTraCuu"]);
    formatHeaderRow(sheetTraCuu);
  }
  
  // 4. Sheet BaiVietCaiVan
  var sheetBaiViet = ss.getSheetByName(SHEET_BAI_VIET);
  if (!sheetBaiViet) {
    sheetBaiViet = ss.insertSheet(SHEET_BAI_VIET);
    sheetBaiViet.appendRow(["ID", "TieuDe", "ChuyenMuc", "NoiDung", "NgayDang"]);
    formatHeaderRow(sheetBaiViet);
  }
  
  // Nếu Sheet1 mặc định còn trống thì có thể xóa hoặc đổi tên
  var defaultSheet = ss.getSheetByName("Sheet1") || ss.getSheetByName("Trang tính1");
  if (defaultSheet && defaultSheet.getLastRow() === 0 && ss.getSheets().length > 1) {
    try { ss.deleteSheet(defaultSheet); } catch(e) {}
  }
}

/**
 * Định dạng dòng tiêu đề đẹp mắt (Xanh dương giáo dục)
 */
function formatHeaderRow(sheet) {
  var range = sheet.getRange(1, 1, 1, sheet.getLastColumn());
  range.setBackground("#0F4C81");
  range.setFontColor("#FFFFFF");
  range.setFontWeight("bold");
  range.setFontSize(11);
  sheet.setFrozenRows(1);
}

/**
 * Khởi tạo dữ liệu mẫu Bát Cực Linh Số nếu sheet còn trống
 */
function initSampleData(ss) {
  ensureSheetsInitialized(ss);
  
  // Nạp Sheet TuTrường
  var sheetTuTruong = ss.getSheetByName(SHEET_TU_TRUONG);
  if (sheetTuTruong.getLastRow() <= 1) {
    var dataTuTruong = [
      ["14/41, 67/76, 39/93, 28/82", "Sinh Khí", "Cát Tinh", "Quý nhân phù trợ, may mắn, tinh thần lạc quan", "Người mang từ trường Sinh Khí vui vẻ, bao dung, dễ gặp quý nhân nâng đỡ, tiền bạc tự nhiên đến.", "Dùng Sinh Khí hóa giải Họa Hại, kích hoạt quý nhân. Phù hợp kinh doanh, bán hàng, ngoại giao."],
      ["13/31, 68/86, 49/94, 27/72", "Thiên Y", "Cát Tinh", "Tài lộc chính đạo, hôn nhân hòa thuận, sức khỏe", "Đại diện của cải chân chính, tích lũy vững bền, thông minh nhân hậu, gia đạo hạnh phúc.", "Dùng chế ngự Tuyệt Mệnh. Đặt Thiên Y ở đuôi số để giữ tài lộc."],
      ["19/91, 78/87, 34/43, 26/62", "Diên Niên", "Cát Tinh", "Lãnh đạo, trách nhiệm cao, uy tín, kiên định", "Có tài chỉ huy, nguyên tắc, chuyên môn xuất sắc. Nhược điểm là đôi khi áp đặt, bảo thủ.", "Dùng Diên Niên áp chế Lục Sát, rèn luyện ý chí và làm chủ cảm xúc."],
      ["11/22, 88/99, 66/77, 33/44", "Phục Vị", "Cát Tinh", "Bền bỉ, kiên nhẫn, ổn định, cẩn trọng", "Làm việc chắc chắn, bền bỉ tích lũy. Nhược điểm là do dự, sợ mạo hiểm.", "Dùng làm bước đệm ổn định giữa các cặp số, củng cố sự bền vững."],
      ["12/21, 69/96, 48/84, 37/73", "Tuyệt Mệnh", "Hung Tinh", "Dám nghĩ dám làm, liều lĩnh, hao tài nhanh", "Trực giác nhạy bén, thích mạo hiểm nhưng khó giữ tiền, dễ tranh chấp kiện tụng.", "Bắt buộc dùng Thiên Y đứng sau hóa giải (Thiên Y chế Tuyệt Mệnh)."],
      ["18/81, 79/97, 36/63, 24/42", "Ngũ Quỷ", "Hung Tinh", "Thông minh mưu lược, biến ảo nhưng đa nghi, bất an", "Tư duy đột phá, sáng tạo nhưng tâm tính thất thường, dễ gặp tai ương bất ngờ.", "Dùng Sinh Khí + Diên Niên hóa giải để biến mưu lược thành kết quả thực tế."],
      ["16/61, 47/74, 38/83, 29/92", "Lục Sát", "Hung Tinh", "Duyên ngầm, đào hoa thị phi, đa sầu đa cảm, hao tài vì tình", "Giao tiếp khéo léo, thẩm mỹ cao nhưng quá nhạy cảm, dễ u uất và hao tài vì tình cảm.", "Dùng Diên Niên áp chế Lục Sát, tăng tính kỷ luật và bản lĩnh."],
      ["17/71, 89/98, 46/64, 23/32", "Họa Hại", "Hung Tinh", "Khẩu tài hùng biện, dễ khẩu thiệt thị phi, cứng đầu", "Nói năng lưu loát nhưng dễ lỡ lời, hiếu thắng, sức khỏe hô hấp yếu.", "Dùng Sinh Khí giáng Họa Hại để chuyển tài ăn nói thành duyên quý nhân."]
    ];
    for (var i = 0; i < dataTuTruong.length; i++) {
      sheetTuTruong.appendRow(dataTuTruong[i]);
    }
  }
  
  // Nạp Sheet ChuyenHoa
  var sheetChuyenHoa = ss.getSheetByName(SHEET_CHUYEN_HOA);
  if (sheetChuyenHoa.getLastRow() <= 1) {
    var dataChuyenHoa = [
      [1, "Tuyệt Mệnh (12/21, 69/96, 48/84, 37/73)", "Thiên Y (13/31, 68/86, 49/94, 27/72)", "Thiên Y chế Tuyệt Mệnh: Thuần hóa tính liều lĩnh thành tài lộc vững chắc.", "Đặt cặp Thiên Y liền kề sau Tuyệt Mệnh để biến lòng dũng cảm thành kết quả đầu tư."],
      [2, "Họa Hại (17/71, 89/98, 46/64, 23/32)", "Sinh Khí (14/41, 67/76, 39/93, 28/82)", "Sinh Khí giáng Họa Hại: Tiêu trừ khẩu thiệt thị phi, hóa giải tranh chấp.", "Đặt Sinh Khí sau Họa Hại để biến tài ăn nói thành khả năng kết nối quý nhân."],
      [3, "Lục Sát (16/61, 47/74, 38/83, 29/92)", "Diên Niên (19/91, 78/87, 34/43, 26/62)", "Diên Niên áp Lục Sát: Khắc phục đào hoa sát và sự đa sầu đa cảm.", "Ghép Diên Niên sau Lục Sát giúp làm chủ cảm xúc và gìn giữ hôn nhân viên mãn."],
      [4, "Ngũ Quỷ (18/81, 79/97, 36/63, 24/42)", "Sinh Khí + Diên Niên", "Sinh Khí hóa Ngũ Quỷ: Giải tỏa bất an và nghi kỵ, biến mưu lược thành tài.", "Dùng bộ ba Ngũ Quỷ + Sinh Khí + Diên Niên để ổn định tâm tính và sự nghiệp."],
      [5, "Sinh Khí (14/41, 67/76, 39/93, 28/82)", "Diên Niên (19/91, 78/87, 34/43, 26/62)", "Sinh Khí trợ Diên Niên: Quý nhân mang cơ hội, Diên Niên nắm bắt thành công.", "Tổ hợp vàng cho người lãnh đạo: vừa có quý nhân nâng đỡ vừa có tài quản lý."],
      [6, "Thiên Y (13/31, 68/86, 49/94, 27/72)", "Phục Vị (11/22, 88/99, 66/77, 33/44)", "Thiên Y tụ Phục Vị: Giữ kho tài lộc, tích lũy tiền bạc bền vững.", "Tổ hợp chiêu tài giữ lộc lâu dài, tài vận hanh thông không bị hao tán."]
    ];
    for (var j = 0; j < dataChuyenHoa.length; j++) {
      sheetChuyenHoa.appendRow(dataChuyenHoa[j]);
    }
  }

  // Nạp Sheet BaiVietCaiVan
  var sheetBaiViet = ss.getSheetByName(SHEET_BAI_VIET);
  if (sheetBaiViet.getLastRow() <= 1) {
    sheetBaiViet.appendRow([1, "Bát Cực Linh Số Là Gì? Ý Nghĩa 8 Từ Trường Năng Lượng", "Kiến Thức", "Bát Cực Linh Số gồm 4 Cát Tinh và 4 Hung Tinh đại diện cho các tần số rung động cuộc đời...", "2026-03-25"]);
    sheetBaiViet.appendRow([2, "Bí Quyết Chuyển Hóa Cải Vận: Lấy Cát Chế Hung", "Cải Vận", "Đỉnh cao của phong thủy số không phải chọn toàn số cát, mà là phối hợp hóa giải...", "2026-03-26"]);
    sheetBaiViet.appendRow([3, "Ảnh Hưởng Của Con Số 0 và 5 Trong Dãy Số Phong Thủy", "Chuyên Sâu", "Số 0 làm ẩn năng lượng, số 5 làm bộc lộ và gia tăng năng lượng...", "2026-03-27"]);
  }

  // Nạp Sheet TraCuuSo
  var sheetTraCuu = ss.getSheetByName(SHEET_TRA_CUU_SO);
  if (sheetTraCuu.getLastRow() <= 1) {
    sheetTraCuu.appendRow(["0988686831", "Hội tụ Phục Vị (88), Thiên Y liên hoàn (86, 68), kết đuôi Thiên Y (31). Tài lộc dồi dào, hậu vận ấm êm.", 95, "Đại Cát - Vượng Tài Tiến Bảo", "2026-03-27 10:00:00"]);
    sheetTraCuu.appendRow(["0912211941", "Có Tuyệt Mệnh (12, 21) nhưng hóa giải bằng Diên Niên (19) và Sinh Khí (41). Dám nghĩ dám làm, hanh thông.", 82, "Cát Đa Hung Ích", "2026-03-27 10:15:00"]);
  }
}

/**
 * Trả về phản hồi dạng JSON hỗ trợ CORS cho trình duyệt web
 */
function jsonResponse(data) {
  return ContentService.createTextOutput(JSON.stringify(data))
    .setMimeType(ContentService.MimeType.JSON);
}
`;
