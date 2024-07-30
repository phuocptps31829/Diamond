import { FaHospital, FaHandHoldingMedical } from "react-icons/fa";
import InputCustom from "@/components/ui/inputCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";

import Autoplay from "embla-carousel-autoplay";

const contactSchema = z.object({
  fullName: z.string().min(1, "Họ và tên không được để trống"),
  phoneNumber: z.string().regex(/^[0-9]{10}$/, "Số điện thoại không hợp lệ"),
  email: z.string().email("Email không hợp lệ"),
});

export default function ContactForm() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted");
    console.log(data);
  };

  return (
    <div className="mx-auto w-full max-w-screen-xl p-5 md:p-10">
      <div className="flex flex-col rounded-lg bg-white">
        <div className="flex flex-col gap-5 p-[30px] lg:flex-row lg:gap-0">
          <div className="flex flex-col gap-5 lg:max-w-[35%]">
            <h2 className="text-[20px] font-semibold">Thông tin chi tiết</h2>
            <div className="flex items-center gap-5">
              <FaHospital className="min-w-[30px] text-3xl text-primary-400" />
              <div className="flex flex-col text-[15px]">
                <p className="font-medium">DIAMOND - ĐẶT LỊCH KHÁM BỆNH</p>
                <p>
                  236/29/18 Điện Biên Phủ - Phường 17 - Quận Bình Thạnh - TPHCM.
                </p>
              </div>
            </div>
            <div className="flex items-center gap-5">
              <FaHandHoldingMedical className="min-w-[30px] text-3xl text-primary-400" />
              <div className="flex flex-col text-[15px]">
                <p className="font-medium">HỖ TRỢ ĐẶT KHÁM</p>
                <p>1900-2115</p>
              </div>
            </div>
          </div>
          <form
            onSubmit={handleSubmit(onSubmit)}
            className="flex w-full flex-col space-y-5 lg:ml-[12%] lg:max-w-[50%]"
          >
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="fullName"
                label="Họ và tên"
                type="text"
                control={control}
                errors={errors}
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="email"
                label="Email"
                type="email"
                control={control}
                errors={errors}
                placeholder="Nhập email"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="phoneNumber"
                label="Số điện thoại"
                type="text"
                control={control}
                errors={errors}
                placeholder="Nhập số điện thoại"
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
          <h3 className="text-center text-[18px] font-semibold sm:text-[24px]">
            Hệ thống Cơ sở Y tế triển khai
          </h3>
          <Carousel
            opts={{
              align: "start",
              loop: true,
            }}
            className="my-4 w-full"
            plugins={[
              Autoplay({
                delay: 2500,
                stopOnInteraction: false,
                stopOnMouseEnter: false,
              }),
            ]}
          >
            <CarouselContent>
              {Array.from({ length: 12 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="pl-4 sm:basis-1/2 lg:basis-1/3"
                >
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
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        </div>
      </div>
    </div>
  );
}
