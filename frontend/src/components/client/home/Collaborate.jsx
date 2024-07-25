import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Collaborate() {
  return (
    <div className="mx-auto mt-5 max-w-screen-xl md:mt-10 px-5">
      <div className="mb-4 w-full text-center text-[23px] font-bold md:mb-2 md:text-[35px]">
        Đối tác y khoa Diamond
      </div>
      <Swiper
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={20}
        slidesPerView={5}
        loop={true}
        speed={500}
        autoplay={{
          delay: 1000,
          disableOnInteraction: true,
        }}
        breakpoints={{
          0: {
            slidesPerView: 2,
          },
          576: {
            slidesPerView: 3,
          },
          768: {
            slidesPerView: 4,
          },
          900: {
            slidesPerView: 5,
          },
          1250: {
            slidesPerView: 6,
          },
        }}
      >
        {Array.from({ length: 10 }).map((_, index) => (
          <SwiperSlide key={index}>
            <img
              src="https://img.ykhoadiamond.com/uploads/banner/27032023/374c0e9c-9945-48e5-80e7-5b8dc78bf6f4.jpg"
              alt={`Slide ${index + 1}`}
            />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
