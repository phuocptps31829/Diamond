import { FaRegEye } from "react-icons/fa";
import NewsProduct from "../product/News";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function ContentNews() {
  return (
    <div className="mx-auto max-w-screen-xl p-3">
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
            Hướng đến phương châm Tất cả vì người bệnh, để đảm bảo quyền lợi và
            tạo điều kiện thuận lợi cho người bệnh được tiếp cận dịch vụ y tế
            chất lượng cao với chi phí hợp lý nhất, Bệnh viện đã và đang triển
            khai khám chữa bệnh áp dụng bảo hiểm, bao gồm Bảo hiểm y tế và Bảo
            hiểm sức khỏe
          </p>
          <img src="https://img.ykhoadiamond.com/Uploads/Content/22072024/61e5e1f1-eeb0-4b5c-9082-bf68794c5df0.jpg" />
          <p className="my-2">
            Hướng đến phương châm Tất cả vì người bệnh, để đảm bảo quyền lợi và
            tạo điều kiện thuận lợi cho người bệnh được tiếp cận dịch vụ y tế
            chất lượng cao với chi phí hợp lý nhất, Bệnh viện đã và đang triển
            khai khám chữa bệnh áp dụng bảo hiểm, bao gồm Bảo hiểm y tế và Bảo
            hiểm sức khỏe
          </p>
          <img src="https://img.ykhoadiamond.com/Uploads/Content/22072024/61e5e1f1-eeb0-4b5c-9082-bf68794c5df0.jpg" />
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
