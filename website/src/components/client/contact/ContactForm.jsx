import { FaHospital, FaHandHoldingMedical } from "react-icons/fa";
import { useMutation, useQuery } from "@tanstack/react-query";
import InputCustom from "@/components/ui/InputCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { contactSchema } from "@/zods/client/contact";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { contactApi } from "@/services/contactApi";

import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { branchApi } from "@/services/branchesApi";
import { Skeleton } from "@/components/ui/Skeleton";
import NotFound from "@/components/ui/NotFound";
import { Button } from "@/components/ui/Button";
import { Link } from "react-router-dom";

export default function ContactForm() {
  const { toast } = useToast();

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(contactSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      note: "",
    },
  });

  const mutation = useMutation({
    mutationFn: contactApi.postContact,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Gửi thành công!",
        description: "Chúng tôi sẽ phản hồi với bạn sớm nhất.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      reset();
    },
    onError: (error) => {
      toast({
        variant: "destructive",
        title: "Gửi thất bại!",
        description: error.message || "Đã xảy ra lỗi, vui lòng thử lại.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data);
  };
  const { data, error, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: () => branchApi.getAllBranches({ limit: 999 }),
    keepPreviousData: true,
  });

  if (error) {
    return <NotFound message={ error.message } />;
  }

  return (
    <div className="mx-auto w-full max-w-screen-xl p-4 md:p-5">
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
            onSubmit={ handleSubmit(onSubmit) }
            className="flex w-full flex-col space-y-5 lg:ml-[12%] lg:max-w-[50%]"
          >
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="fullName"
                label="Họ và tên"
                type="text"
                control={ control }
                errors={ errors }
                placeholder="Nhập họ và tên"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="email"
                label="Email"
                type="email"
                control={ control }
                errors={ errors }
                placeholder="Nhập email"
              />
            </div>
            <div className="flex flex-col text-[14px]">
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="phoneNumber"
                label="Số điện thoại"
                type="text"
                control={ control }
                errors={ errors }
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
                { ...control.register("note") }
              ></textarea>
              { errors.note && (
                <small className="mt-2 block text-sm text-red-400">
                  { errors.note.message }
                </small>
              ) }
            </div>
            <Button
              className="flex w-fit items-center gap-2 self-end"
              variant="primary"
              disabled={ mutation.isPending }
            >
              { mutation.isPending ? "Đang gửi" : "Gửi ngay" }
              { mutation.isPending && (
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) }
            </Button>
          </form>
        </div>
        <div className="relative p-10">
          <div className="absolute left-0 top-0 w-full border border-dashed border-t-black bg-transparent"></div>
          <h3 className="text-center text-[18px] font-semibold sm:text-[24px]">
            Hệ thống Cơ sở Y tế triển khai
          </h3>
          { isLoading ? (
            <div className="my-4 w-full">
              <Skeleton className="h-64 w-full" />
            </div>
          ) : (
            <Carousel
              opts={ {
                align: "start",
                loop: true,
              } }
              className="my-4 w-full"
              plugins={ [
                Autoplay({
                  delay: 2500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                }),
              ] }
            >
              <CarouselContent>
                { data.data?.map((branch) => (
                  <CarouselItem
                    key={ branch._id }
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <Link
                      to={ `https://www.google.com/maps/search/?api=1&query=${branch.coordinates.lat},${branch.coordinates.lng}` }
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex flex-col items-center rounded-md bg-white"
                    >
                      <div className="w-full">
                        <img
                          src={
                            branch.imagesURL?.[0]
                              ? `${import.meta.env.VITE_IMAGE_API_URL}/${branch.imagesURL[0]}`
                              : "https://placehold.co/600x400"
                          }
                          alt={ branch.name }
                          className="h-[250px] w-full rounded-md object-cover"
                        />
                      </div>
                      <div className="my-3 text-[16px] font-medium uppercase">
                        { branch.name }
                      </div>
                    </Link>
                  </CarouselItem>
                )) }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          ) }
        </div>
      </div>
    </div>
  );
}
