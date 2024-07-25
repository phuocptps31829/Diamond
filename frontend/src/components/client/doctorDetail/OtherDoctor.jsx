import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import DoctorProduct from "../product/Doctor";

export default function OtherDoctor() {
  return (
    <div className="mx-auto max-w-screen-xl px-5">
      <h2 className="relative flex text-[24px] font-bold">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="sm:text-md pl-5 text-[22px]">
          Bác sĩ cùng chuyên ngành
        </span>
      </h2>
      <Swiper
        className="my-3"
        modules={[Navigation, Pagination]}
        spaceBetween={10}
        slidesPerView={5}
        loop={true}
        speed={500}
        navigation
        pagination
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 2,
          },
          768: {
            slidesPerView: 3,
          },
          1024: {
            slidesPerView: 4,
          },
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide
            className="overflow-hidden rounded-md bg-white"
            key={index}
          >
            <DoctorProduct key={index} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
