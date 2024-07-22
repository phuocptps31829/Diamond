import healthImg from "../../../assets/healthcare-medical-people-concept-smiling-asian-female-doctor-pointing-fingers-right-showing-adverti.jpg";
const DescriptionService = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
    <div className="container mx-auto max-w-7xl py-4">
      <div className="mb-8 grid grid-cols-1 gap-8 md:grid-cols-2">
        <div className="flex items-center justify-center">
          <img
            src={healthImg}
            alt="Doctor"
            className="max-h-full rounded-lg object-cover"
          />
        </div>
        <div className="flex flex-col items-start justify-center gap-8 text-start">
          <div className="rounded-md border border-primary-500 bg-white p-5">
            <h2 className="mb-4 text-2xl font-bold">Khám tiền sản là gì?</h2>
            <p className="mb-4 text-justify">
              Khám tiền sản là phương pháp tiến hành kiểm tra sức khỏe cặp vợ
              chồng, đặc biệt là người vợ trước khi mang thai nhằm mục đích đánh
              giá tình trạng sức khỏe, phát hiện sớm những dấu hiệu bất thường
              cũng như những nguy cơ xấu tiềm ẩn có thể đe dọa thai phụ và bé
              trong suốt thai kỳ.
            </p>
          </div>
          <div className="rounded-md border border-primary-500 bg-white p-5">
            <h2 className="mb-4 text-2xl font-bold">Khám tiền sản là gì?</h2>
            <p className="mb-4 text-justify">
              Tại những quốc gia phát triển, khám sức khỏe tiền sản là việc làm
              vô cùng quan trọng đối với những cặp đôi chuẩn bị kết hôn hoặc
              mang thai. Tuy nhiên, tại Việt Nam việc làm này chưa thực sự được
              coi trọng bởi tâm lý chủ quan, có bệnh mới đi khám hoặc cảm giác
              lo sợ phát hiện bệnh sẽ ảnh hưởng đến hạnh phúc lứa đôi.
            </p>
          </div>
        </div>
      </div>
      <div className="container rounded-md border border-primary-500 bg-white p-5">
        <h2 className="mb-4 text-2xl font-bold">
          Theo đó, việc khám tiền sản mang đến những lợi ích sau:
        </h2>
        <ul className="list-disc pl-6 text-justify">
          <li className="mb-2">
            Giúp các cặp đôi có thêm kiến thức, sự tự tin và thoải mái trong đời
            sống vợ chồng.
          </li>
          <li className="mb-2">
            Phát hiện và tầm soát nguy cơ các bệnh lý lây truyền qua đường tình
            dục như viêm gan B, giang mai, lậu, HIV... đảm bảo không lây nhiễm
            bệnh cho bạn đời và đặc biệt và con cái khi mang thai.
          </li>
          <li className="mb-2">
            Kiểm tra sức khỏe tổng quát, có kế hoạch chuẩn bị mang thai khoa
            học, phòng ngừa hiệu quả những nguy cơ tiềm ẩn có thể đe dọa mẹ và
            bé trong suốt thời gian mang thai.
          </li>
          <li className="mb-2">
            Đánh giá nguy cơ vô sinh hiếm muộn để có biện pháp can thiệp kịp
            thời, tăng khả năng điều trị thành công.
          </li>
        </ul>
      </div>
    </div>
    </div>
  );
};

export default DescriptionService;
