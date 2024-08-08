import banner from "../../../assets/images/homeBanner.webp";
import { CiSearch } from "react-icons/ci";

export default function Banner() {
  return (
    <div className="relative h-[55vw] w-full text-primary-500 md:h-[30vw]">
      <img src={banner} alt="Banner" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
        <div className="font-medium text-primary-500 md:text-[25px]">
          Nền tảng công nghệ
        </div>
        <div className="max-w-[260px] text-center text-[24px] font-bold text-primary-950 md:max-w-full md:text-left md:text-[36px]">
          Kết nối người dân với Cơ sở - Dịch vụ Y tế
        </div>
        <div className="mt-6 flex w-[65%] max-w-[835px] items-center rounded-full bg-white p-2 px-5 md:w-[55%]">
          <CiSearch className="text-2xl" />
          <input
            type="text"
            className="w-full bg-transparent p-1 text-[16px] text-black outline-none md:p-3"
            placeholder="Tìm kiếm cơ sở y tế, dịch vụ y tế..."
          />
        </div>
        <div className="my-5 hidden font-medium text-primary-900 md:block md:text-[20px]">
          Đặt khám nhanh - Tiện ích toàn diện - Nhanh chóng dễ dàng
        </div>
      </div>
    </div>
  );
}
