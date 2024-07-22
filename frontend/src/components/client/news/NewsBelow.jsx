import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function NewsBelow() {
  return (
    <div className="mx-auto my-5 max-w-screen-xl p-3 md:my-10">
      <h2 className="relative flex text-[24px] font-bold uppercase">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="pl-5">Đọc nhiều nhất</span>
      </h2>
      <Swiper
        className="my-3"
        modules={[Navigation, Pagination]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        speed={500}
        navigation
        pagination
        breakpoints={{
          0: {
            slidesPerView: 1,
          },
          576: {
            slidesPerView: 2,
          },
          1250: {
            slidesPerView: 3,
          },
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide
            className="overflow-hidden rounded-md bg-primary-50"
            key={index}
          >
            <Link
              to="/none"
              className="gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid"
            >
              <img
                src="https://img.ykhoadiamond.com/uploads/avatar/19072024/cd8b430b-d6b2-44f7-9ce5-7a132804c72f.png"
                alt=""
              />
              <div className="p-5">
                <div className="mb-[6px] flex gap-2 text-[12px]">
                  <div className="font-bold text-primary-700">Tin Tức</div>
                  <div className="font-semibold">19, Tháng 7, 2024</div>
                  <div>|</div>
                  <div className="font-semibold">Admin</div>
                </div>
                <h2 className="my-2 text-[14px] font-bold sm:text-[18px]">
                  Trân Trọng Kính Mời Bác Sĩ Hợp Tác Cùng Hệ THống Y Khoa
                  Diamond
                </h2>
                <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] sm:text-[14px]">
                  Chúng tôi mang đến cơ hội hợp tác với chính sách hấp dẫn và
                  môi trường làm việc chuyên nghiệp. Hãy cùng hợp tác với Hệ
                  Thống Y Khoa Diamond để cùng phát triển - cùng thành công ngay
                  hôm nay.
                </div>
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <FaRegEye />
                  <div>100</div>
                </div>
              </div>
            </Link>
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
