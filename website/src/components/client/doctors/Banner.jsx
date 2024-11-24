import banner from "../../../assets/images/doctorBanner.jpg";

export default function BannerDoctor() {
  return (
    <div className="relative w-full h-[30vw] lg:h-[8vw]">
      <img
        src={ banner }
        alt="Banner"
        className="h-full w-full object-cover opacity-40"
      />
      <div className="absolute inset-0 flex h-full w-full items-center justify-center">
        <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-[37px] text-center">
          <h1 className="text-[30px] font-bold text-primary-500">
            Đội ngũ bác sĩ
          </h1>
          <h4 className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
            Bệnh viện hợp tác với các bác sĩ chuyên khoa sâu, cùng đội ngũ bác
            sỹ chất lượng cao.
          </h4>
        </div>
      </div>
    </div>
  );
}
