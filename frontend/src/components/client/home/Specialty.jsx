import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function Specialty() {
  return (
    <div className="my-10 w-full bg-primary-500 py-4">
      <div className="mx-auto my-5 max-w-screen-xl px-3">
        <div className="mb-2 w-full text-center text-[23px] font-bold text-white md:text-[35px]">
          Chuyên khoa
        </div>
        <span className="block w-full text-center text-[14px] text-white md:text-[16px]">
          Danh sách toàn bộ các Khoa & Chuyên khoa tại Hệ Thống Y Khoa Diamond
        </span>
        <Swiper
          modules={[Navigation, Pagination]}
          spaceBetween={20}
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
              <div className="flex flex-col items-center rounded-md bg-white p-4 pb-10">
                <div className="w-full">
                  <img
                    src="https://img.ykhoadiamond.com/uploads/packagecontent/21032023/8eec0869-fbc1-4cbe-9780-8aa8135c5147.jpg"
                    alt=""
                    className="h-40 w-full rounded-md object-cover"
                  />
                </div>
                <div className="my-3 text-[16px] font-bold uppercase">
                  Da liễu
                </div>
              </div>
            </SwiperSlide>
          ))}
        </Swiper>
      </div>
    </div>
  );
}
