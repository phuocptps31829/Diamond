import { FaHospital } from "react-icons/fa";
import { FaHandHoldingMedical } from "react-icons/fa";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Autoplay } from "swiper/modules";
import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";

export default function ContactForm() {
  return (
    <div className="mx-auto w-full max-w-screen-xl p-5 md:p-10">
      <div className="flex flex-col rounded-lg bg-white">
        <div className="flex flex-col gap-5 p-[30px] lg:flex-row lg:gap-0">
          <div className="flex flex-col gap-5 lg:max-w-[35%]">
            <h2 className="text-[20px] font-semibold">Thông tin chi tiết</h2>
            <div className="flex items-center gap-5">
              <FaHospital className="text-3xl text-primary-400" />
              <div className="flex flex-col text-[15px]">
                <p className="font-medium">DIAMOND - ĐẶT LỊCH KHÁM BỆNH</p>
                <p>
                  236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <FaHandHoldingMedical className="text-3xl text-primary-400" />
              <div className="flex flex-col text-[15px]">
                <p className="font-medium">HỖ TRỢ ĐẶT KHÁM</p>
                <p>1900-2115</p>
              </div>
            </div>
          </div>
          <form className="flex w-full flex-col space-y-5 lg:ml-[12%] lg:max-w-[50%]">
            <div className="flex flex-col text-[14px]">
              <label className="pb-2 font-semibold" htmlFor="fullname">
                Họ và tên <span className="text-[red]">*</span>
              </label>
              <input
                type="text"
                className="rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-primary-300"
                id="fullname"
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <label className="pb-2 font-semibold" htmlFor="email">
                Email <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-primary-300"
                id="email"
                placeholder="Nhập email"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <label className="pb-2 font-semibold" htmlFor="phone">
                Số điện thoại <span className="text-red-600">*</span>
              </label>
              <input
                type="text"
                className="rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-primary-300"
                id="phone"
                placeholder="Nhập email"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <label className="pb-2 font-semibold" htmlFor="note">
                Ghi chú <span className="text-red-600">*</span>
              </label>
              <textarea
                id="note"
                className="rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-1 focus:ring-primary-300"
                placeholder="Nhập ghi chú"
              ></textarea>
            </div>
            <button className="w-fit self-end rounded-lg bg-gradient-to-r from-[#00b5f1] to-[#00e0ff] px-3 py-2 font-semibold text-white">
              Đăng ký ngay
            </button>
          </form>
        </div>
        <div className="relative p-10">
          <div className="absolute left-0 top-0 w-full border border-dashed border-t-black bg-transparent"></div>
          <h3 className="text-center sm:text-[24px] text-[18px] font-semibold">
            Hệ thống Cơ sở Y tế triển khai
          </h3>
          <Swiper
            modules={[Navigation, Pagination, Autoplay]}
            spaceBetween={20}
            slidesPerView={5}
            loop={true}
            speed={1000}
            autoplay={{
              delay: 2000,
              disableOnInteraction: false,
            }}
            pagination={{ clickable: true }}
            breakpoints={{
              0: {
                slidesPerView: 1,
              },
              576: {
                slidesPerView: 2,
              },
              1024: {
                slidesPerView: 3,
              },
            }}
          >
            {Array.from({ length: 10 }).map((_, index) => (
              <SwiperSlide key={index}>
                <div className="flex flex-col items-center rounded-md bg-white">
                  <div className="w-full">
                    <img
                      src="https://medpro.vn/_next/image?url=https%3A%2F%2Fcdn-pkh.longvan.net%2Fprod-partner%2F37e8f61f-8075-4f03-a814-e035a06ee385-nhidong1.webp&w=384&q=75"
                      alt=""
                      className="w-full rounded-md object-cover"
                    />
                  </div>
                  <div className="my-3 text-[16px] font-medium uppercase">
                    Bệnh viện Nhi Đồng 1
                  </div>
                </div>
              </SwiperSlide>
            ))}
          </Swiper>
        </div>
      </div>
    </div>
  );
}
