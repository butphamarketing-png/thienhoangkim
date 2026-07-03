type PageBlock = {
  title?: string;
  paragraphs: string[];
};

function p(title: string | undefined, ...paragraphs: string[]): PageBlock {
  return { title, paragraphs };
}

export const INTRO_MAIN_BLOCKS: PageBlock[] = [
  p(
    undefined,
    "Thiên Hoàng Kim Aesthetic Clinic là phòng khám thẩm mỹ chuẩn y khoa tại 323–325 Hùng Vương, Phường An Đông, TP. Hồ Chí Minh — nơi kiến tạo vẻ đẹp tự nhiên, an toàn và bền vững cho từng khách hàng.",
    "Chúng tôi kết hợp chuyên môn bác sĩ, quy trình vô trùng và công nghệ hiện đại để mang đến trải nghiệm làm đẹp minh bạch: tư vấn trung thực, phác đồ cá nhân hóa và theo dõi sau điều trị tận tâm.",
  ),
  p(
    "Tầm nhìn & sứ mệnh",
    "Sứ mệnh của Thiên Hoàng Kim là nâng tầm nhan sắc theo hướng tôn vinh vẻ đẹp riêng — không ép buộc một chuẩn mực duy nhất. Mỗi khách hàng được lắng nghe, thăm khám kỹ và giải thích rõ lợi ích, rủi ro cũng như thời gian hồi phục trước khi quyết định.",
    "Chúng tôi hướng tới trở thành địa chỉ thẩm mỹ y khoa và spa cao cấp được tin tưởng tại khu vực An Đông và TP.HCM nhờ chất lượng dịch vụ ổn định và đạo đức nghề nghiệp.",
  ),
  p(
    "Giá trị cốt lõi",
    "An toàn y khoa là ưu tiên hàng đầu — mọi can thiệp tuân thủ quy trình chuẩn, sản phẩm rõ nguồn gốc và bác sĩ có chứng chỉ hành nghề.",
    "Tự nhiên và hài hòa — thiết kế kết quả phù hợp tỉ lệ khuôn mặt, làn da và cơ địa người Việt.",
    "Tận tâm — chăm sóc khách hàng trước, trong và sau liệu trình; tái khám đúng lịch để đạt kết quả tối ưu.",
  ),
  p(
    "Dịch vụ chính",
    "Thẩm mỹ y khoa: nâng mũi hoàng kim, cắt mí phượng hoàng, cấy tóc, căng nội soi, căng chỉ, filler, botox…",
    "Spa & chăm sóc da: ủ đá muối Himalaya, phun xăm thẩm mỹ, massage body, massage facial, chăm sóc da toàn diện.",
    "Hotline tư vấn miễn phí: 0938 673 996 — mở cửa 08:00–20:00 tất cả các ngày trong tuần.",
  ),
];

export const INTRO_BRAND_STORY_BLOCKS: PageBlock[] = [
  p(
    undefined,
    "Thiên Hoàng Kim ra đời từ khát vọng mang đến dịch vụ thẩm mỹ an toàn, minh bạch cho khách hàng Việt — đặc biệt tại khu vực An Đông, nơi nhu cầu làm đẹp ngày càng cao nhưng thông tin trên mạng còn nhiều mâu thuẫn.",
    "Tên gọi Thiên Hoàng Kim gợi ý vẻ đẹp quý phá, bền vững — như ánh vàng của sự tự tin được xây dựng trên nền tảng y khoa, không phải cam kết hão huyền.",
  ),
  p(
    "Khởi nguồn",
    "Phòng khám được hình thành bởi đội ngũ am hiểu cả chuyên môn thẩm mỹ lẫn trải nghiệm khách hàng: từ khâu tiếp nhận, tư vấn đến theo dõi sau điều trị đều được chuẩn hóa.",
    "Ngay từ những ngày đầu, chúng tôi chọn hướng đi thẩm mỹ y khoa có kiểm soát — ưu tiên tư vấn trung thực thay vì chạy theo xu hướng ngắn hạn.",
  ),
  p(
    "Hành trình phát triển",
    "Qua từng năm, Thiên Hoàng Kim không ngừng đầu tư trang thiết bị, cập nhật kỹ thuật và mở rộng danh mục spa chăm sóc da chuyên sâu song song với phẫu thuật thẩm mỹ.",
    "Hàng nghìn khách hàng đã tin tưởng lựa chọn — từ can thiệp nhẹ như tiêm filler, botox đến phẫu thuật nâng mũi, cắt mí — và quay lại tái khám, giới thiệu người thân.",
  ),
  p(
    "Cam kết thương hiệu",
    "Mỗi ca điều trị đều được đặt trên nền tảng chuyên môn, đạo đức nghề nghiệp và sự tôn trọng vẻ đẹp riêng của từng người.",
    "Chúng tôi không hứa hẹn kết quả giống hệt ảnh mạng; thay vào đó, bác sĩ phân tích giải phẫu thực tế và đề xuất phác đồ khả thi, an toàn.",
  ),
];

export const INTRO_DOCTORS_BLOCKS: PageBlock[] = [
  p(
    undefined,
    "Đội ngũ bác sĩ và chuyên viên tại Thiên Hoàng Kim là yếu tố then chốt tạo nên chất lượng dịch vụ. Mọi ca phẫu thuật thẩm mỹ và thủ thuật xâm lấn đều do bác sĩ có chứng chỉ hành nghề trực tiếp thực hiện hoặc giám sát.",
  ),
  p(
    "BS. Hồ Thành Hải",
    "Chuyên khoa Thẩm mỹ — nhiều năm kinh nghiệm trong lĩnh vực thẩm mỹ y khoa.",
    "Bác sĩ tận tâm, giàu kinh nghiệm — cam kết mang đến kết quả an toàn và tự nhiên cho khách hàng. Phong cách tư vấn thẳng thắn, giải thích kỹ quy trình, thời gian hồi phục và chăm sóc sau điều trị.",
  ),
  p(
    "Chuyên viên spa & điều dưỡng",
    "Đội ngũ chuyên viên spa được đào tạo bài bản về liệu trình chăm sóc da, massage và phun xăm thẩm mỹ — tuân thủ quy trình vệ sinh và sử dụng sản phẩm chính hãng.",
    "Trước mỗi liệu trình, khách được soi da, phân tích tình trạng và chọn gói phù hợp — không ép mua combo không cần thiết.",
  ),
  p(
    "Đào tạo & cập nhật liên tục",
    "Bác sĩ và chuyên viên tham gia hội thảo, khóa cập nhật kỹ thuật định kỳ để áp dụng phác đồ mới an toàn, phù hợp cơ địa người Việt.",
    "Phòng khám duy trì hồ sơ ca bệnh và lịch tái khám — đảm bảo theo dõi sau điều trị không bị bỏ sót.",
  ),
];

export const INTRO_TECHNOLOGY_BLOCKS: PageBlock[] = [
  p(
    undefined,
    "Thiên Hoàng Kim đầu tư hệ thống máy móc và kỹ thuật thẩm mỹ hiện đại — nhập khẩu chính hãng, bảo trì định kỳ và vận hành bởi bác sĩ, chuyên viên được đào tạo.",
  ),
  p(
    "Công nghệ thẩm mỹ y khoa",
    "Phẫu thuật nội soi và kỹ thuật căng da hỗ trợ — ít xâm lấn, sẹo nhỏ hơn so với mổ mở truyền thống.",
    "Tiêm filler, botox chính hãng có mã truy xuất — bác sĩ tiêm đúng tầng giải phẫu, liều lượng cá nhân hóa.",
    "Cấy tóc FUE/FUT — chiết tách nang tóc tự thân, đặt theo hướng mọc tự nhiên.",
  ),
  p(
    "Công nghệ spa & điều trị da",
    "Máy soi da chuyên sâu — phân tích lớp thường bì, dầu, độ ẩm, lỗ chân lông trước khi lên phác đồ.",
    "Laser, IPL, HIFU, peel da y khoa — chỉ định theo tình trạng: nám, mụn, lão hóa, sẹo.",
    "Phun xăm digital — mực organic, phác thảo trước khi phun để khách duyệt form mày, môi.",
  ),
  p(
    "Quy trình vận hành",
    "Thiết bị kiểm tra trước mỗi ca — calibrate theo hướng dẫn nhà sản xuất.",
    "Phòng thủ thuật vô trùng, dụng cụ tiệt trùng chuẩn y tế; khách được giải thích cơ chế hoạt động của công nghệ trước khi đồng ý.",
  ),
];

export const INTRO_FACILITIES_BLOCKS: PageBlock[] = [
  p(
    undefined,
    "Không gian Thiên Hoàng Kim được thiết kế sang trọng, ấm cúng và riêng tư — giúp khách cảm thấy thoải mái từ lúc bước vào đến khi hoàn tất liệu trình.",
  ),
  p(
    "Khu vực tiếp đón & tư vấn",
    "Sảnh chờ rộng rãi, ghế ngồi êm ái; nhân viên tiếp nhận nhiệt tình, sắp xếp lịch hẹn và hướng dẫn quy trình khám.",
    "Phòng tư vấn riêng — trao đổi kín đáo, chụp ảnh tư vấn tỉ lệ khuôn mặt khi cần.",
  ),
  p(
    "Phòng thủ thuật & phẫu thuật",
    "Phòng mổ và phòng thủ thuật đạt tiêu chuẩn vệ sinh y tế — vô trùng, đủ ánh sáng và thiết bị hồi sức cơ bản.",
    "Khu hồi sức sau thủ thuật — theo dõi mạch, huyết áp trước khi khách về trong ngày (tùy dịch vụ).",
  ),
  p(
    "Khu spa",
    "Phòng spa riêng tư cho massage body, facial và liệu trình da — không gian thư giãn, nhạc nhẹ, tinh dầu thảo dược.",
    "Phòng ủ đá muối Himalaya — nhiệt độ và thời gian ủ được kiểm soát theo phác đồ an toàn.",
  ),
  p(
    "Tiện ích & liên hệ",
    "Địa chỉ: 323–325 Hùng Vương, Phường An Đông, TP. Hồ Chí Minh — dễ tìm, có chỗ đậu xe gần phòng khám.",
    "Giờ mở cửa: 08:00–20:00, Thứ 2 – Chủ nhật. Hotline: 0938 673 996.",
  ),
];
