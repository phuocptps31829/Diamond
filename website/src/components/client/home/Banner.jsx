import banner from "../../../assets/images/homeBannerTin.webp";
import { CiSearch } from "react-icons/ci";

export default function Banner() {
  return (
    <div className="relative h-[55vw] w-full text-primary-500 md:h-[20vw]">
      <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-[#e8f2f7f7] to-transparent"></div>
      <img src={banner} alt="Banner" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
        <div className="mb-2 font-medium text-primary-500 sm:mb-0 md:text-[20px]">
          Nền tảng công nghệ
        </div>
        <div className="mt-2 flex max-w-[260px] flex-col text-center text-[20px] text-primary-950 sm:text-[25px] md:max-w-full md:flex-row md:gap-[10px] md:text-left">
          <p className="whitespace-nowrap font-bold">Kết nối người dân với </p>
          <p className="whitespace-nowrap font-bold"> Cơ sở - Dịch vụ Y tế</p>
        </div>
        <div className="mt-3 flex w-[65%] max-w-[635px] items-center gap-2 rounded-full bg-white p-2 px-5 shadow-[0_1px_3px_rgba(0,123,187,0.3)] sm:mt-6 sm:gap-0 md:w-[55%]">
          <CiSearch className="text-2xl" />
          <input
            type="text"
            className="w-full bg-transparent p-1 text-[16px] text-black outline-none placeholder:text-[13px] sm:placeholder:text-[16px] md:p-3"
            placeholder="Tìm kiếm cơ sở y tế, dịch vụ y tế..."
          />
        </div>
        <div className="my-5 hidden font-medium text-primary-900 md:block md:text-[17px]">
          Đặt khám nhanh - Tiện ích toàn diện - Nhanh chóng dễ dàng
        </div>
      </div>
    </div>
  );
}
