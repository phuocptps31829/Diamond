import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import NewsProduct from "../product/News";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ContentNews() {
  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <div className="flex gap-3">
        <div className="mx-auto max-w-[800px]">
          <h2 className="text-center text-[30px] font-semibold md:text-[40px]">
            ÁP DỤNG BẢO HIỂM KHI THĂM KHÁM
          </h2>
          <div className="my-5 mb-[6px] flex items-center justify-center gap-2 text-[14px]">
            <div className="font-bold text-primary-700">Tin Tức</div>
            <div className="font-semibold">19, Tháng 7, 2024</div>
            <div>|</div>
            <div className="font-semibold">Admin</div>
            <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>100</div>
            </div>
          </div>

          <div className="w-full">
            <p className="my-2">
              Hướng đến phương châm Tất cả vì người bệnh, để đảm bảo quyền lợi
              và tạo điều kiện thuận lợi cho người bệnh được tiếp cận dịch vụ y
              tế chất lượng cao với chi phí hợp lý nhất, Bệnh viện đã và đang
              triển khai khám chữa bệnh áp dụng bảo hiểm, bao gồm Bảo hiểm y tế
              và Bảo hiểm sức khỏe
            </p>
            <img src="https://img.ykhoadiamond.com/Uploads/Content/22072024/61e5e1f1-eeb0-4b5c-9082-bf68794c5df0.jpg" />
            <p className="my-2">
              Hướng đến phương châm Tất cả vì người bệnh, để đảm bảo quyền lợi
              và tạo điều kiện thuận lợi cho người bệnh được tiếp cận dịch vụ y
              tế chất lượng cao với chi phí hợp lý nhất, Bệnh viện đã và đang
              triển khai khám chữa bệnh áp dụng bảo hiểm, bao gồm Bảo hiểm y tế
              và Bảo hiểm sức khỏe
            </p>
            <img src="https://img.ykhoadiamond.com/Uploads/Content/22072024/61e5e1f1-eeb0-4b5c-9082-bf68794c5df0.jpg" />
          </div>
        </div>
        <div className="mt-10 hidden h-fit flex-col gap-3 lg:flex items-center">
          <h2 className="p-2 text-center text-xl font-bold border-b border-b-black w-fit">Tin tức mới</h2>
          {Array.from({ length: 4 }).map((_, index) => (
            <div className="flex" key={index}>
              <Link
                to="/news-detail"
                className="flex flex-col overflow-hidden rounded-md bg-white shadow-lg sm:h-[150px] sm:flex-row"
              >
                <div className="h-full w-[500px] md:w-[40%]">
                  <img
                    className="h-full w-full object-cover"
                    src="https://img.ykhoadiamond.com/uploads/avatar/12072024/b7e64860-6ce1-4909-bcb2-b564f4a15845_M.jpg"
                  />
                </div>
                <div className="p-3">
                  <div className="mb-[6px] flex gap-2 text-[12px]">
                    <div className="font-bold text-primary-700">Tin Tức</div>
                    <div className="font-semibold">19, Tháng 7, 2024</div>
                    <div>|</div>
                    <div className="font-semibold">Admin</div>
                  </div>
                  <h2 className="my-1 text-[14px] font-bold">
                    Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
                  </h2>
                  <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                    Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống
                    nhất dùng chung một ứng dụng trong khai báo, nhập dữ liệu
                    tiêm chủng
                  </div>
                  <div className="mt-1 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                    <FaRegEye />
                    <div>100</div>
                  </div>
                </div>
              </Link>
            </div>
          ))}
        </div>
      </div>
      <div className="my-10">
        <h2 className="relative flex text-[24px] font-bold uppercase">
          <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
          <span className="sm:text-md pl-5 text-[18px] uppercase">
            Tin tức liên quan
          </span>
        </h2>
        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="my-4 w-full"
          plugins={[
            Autoplay({
              delay: 3500,
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
                <NewsProduct />
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
      </div>
    </div>
  );
}
