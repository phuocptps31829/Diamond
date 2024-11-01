import banner from "@/assets/images/homeBannerTin.webp";
import chPlay from "@/assets/images/ch-play.png";
import appStore from "@/assets/images/app-store.png";
import { Link } from "react-router-dom";

export default function Banner() {
  return (
    <div className="relative h-[55vw] w-full text-primary-500 md:h-[20vw]">
      <div className="absolute bottom-0 h-10 w-full bg-gradient-to-t from-[#e8f2f7f7] to-transparent"></div>
      <img src={banner} alt="Banner" className="h-full w-full object-cover" />
      <div className="absolute inset-0 flex h-full w-full flex-col items-center justify-center">
        <div className="font-medium text-primary-500 sm:mb-2 md:text-[20px]">
          Nền tảng công nghệ
        </div>
        <div className="mt-2 flex max-w-[260px] flex-col text-center text-[20px] text-primary-950 sm:text-[25px] md:max-w-full md:flex-row md:gap-[10px] md:text-left">
          <p className="whitespace-nowrap font-bold">Kết nối người dân với </p>
          <p className="whitespace-nowrap font-bold"> Cơ sở - Dịch vụ Y tế</p>
        </div>
        <div className="mt-2 flex flex-row gap-4 sm:mt-4">
          <Link
            to="/download"
            target="_blank"
            className="flex w-32 items-center rounded-lg border border-primary-100 bg-gradient-to-l from-[#163a4d] to-[#000000d5] px-3 py-1 text-white transition-colors sm:w-48 sm:px-4 sm:py-2"
          >
            <div className="mr-3">
              <img src={chPlay} alt="Google Play" className="h-6 sm:h-7" />
            </div>
            <div className="leading-4">
              <div className="text-[8px] sm:text-xs">Tải ứng dụng</div>
              <div className="whitespace-nowrap text-[11px] font-semibold leading-tight sm:text-[16px]">
                Google Play
              </div>
            </div>
          </Link>
          <Link
            to="/download"
            target="_blank"
            className="flex w-32 items-center rounded-lg border border-primary-100 bg-gradient-to-l from-[#163a4d] to-[#000000d5] px-3 py-1 text-white transition-colors sm:w-48 sm:px-4 sm:py-2"
          >
            <div className="mr-3">
              <img src={appStore} alt="App Store" className="h-6 sm:h-7" />
            </div>
            <div className="leading-4">
              <div className="text-[8px] sm:text-xs">Tải ứng dụng</div>
              <div className="whitespace-nowrap text-[11px] font-semibold leading-tight sm:text-[16px]">
                App Store
              </div>
            </div>
          </Link>
        </div>
        <div className="my-3 block text-[11px] font-medium italic text-black sm:my-5 md:text-[15px]">
          Đặt khám nhanh - Tiện ích toàn diện - Nhanh chóng dễ dàng
        </div>
      </div>
    </div>
  );
}
