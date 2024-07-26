import banner from "../../../assets/images/healthcare-workers-preventing-virus-quarantine-campaign-concept-smiling-asian-female-nurse-doctor-wi.jpg";

const serviceBanner = () => {
  return (
    <div className="mx-auto max-w-screen-2xl">
      <div className="relative w-full">
        <img
          className="h-48 w-full object-cover sm:h-64 lg:h-80"
          src={banner}
          alt="Doctor delivering great news"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center">
            <h1 className="mb-3 text-[30px] font-bold text-primary-500 sm:text-[39px]">
              Dịch vụ gói khám sức khỏe
            </h1>
            <span className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
              Đăng ký gói khám sức khỏe để nhận ưu đãi hấp dẫn từ chúng tôi
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default serviceBanner;
