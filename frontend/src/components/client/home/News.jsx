import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { AiOutlineDoubleRight } from "react-icons/ai";
import NewsProduct from "../product/News";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function News() {
  return (
    <div className="my-10 w-full bg-primary-500 py-4">
      <div className="mx-auto my-5 max-w-screen-xl p-5 md:my-10">
        <div className="w-full text-center text-[23px] font-bold text-white md:text-[35px]">
          Tin tức mới nhất
        </div>
        <span className="mx-auto my-2 mb-4 block w-full max-w-[90%] text-center text-[14px] text-white md:max-w-[800px] md:text-[16px]">
          Cập nhật những tin tức mới nhất về y tế, sức khỏe, cùng những thông
          tin hữu ích khác.
        </span>
        <div className="hidden gap-4 sm:grid md:grid-cols-2 md:grid-rows-1 lg:px-3">
          <Link
            to="/news-detail"
            className="gap-4 overflow-hidden rounded-md border-2 border-white bg-white md:row-span-3 md:grid-rows-subgrid"
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
                Trân Trọng Kính Mời Bác Sĩ Hợp Tác Cùng Hệ THống Y Khoa Diamond
              </h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] sm:text-[14px]">
                Chúng tôi mang đến cơ hội hợp tác với chính sách hấp dẫn và môi
                trường làm việc chuyên nghiệp. Hãy cùng hợp tác với Hệ Thống Y
                Khoa Diamond để cùng phát triển - cùng thành công ngay hôm nay.
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>100</div>
              </div>
            </div>
          </Link>
          <Link
            to="/news-detail"
            className="flex flex-col overflow-hidden rounded-md border-2 border-white bg-white sm:h-[200px] sm:flex-row"
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
              <h2 className="my-2 text-[14px] font-bold">
                Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
              </h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống
                nhất dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm
                chủng
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>100</div>
              </div>
            </div>
          </Link>
          <Link
            to="/news-detail"
            className="flex flex-col overflow-hidden rounded-md border-2 border-white bg-white sm:h-[200px] sm:flex-row"
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
              <h2 className="my-2 text-[14px] font-bold">
                Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
              </h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống
                nhất dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm
                chủng
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>100</div>
              </div>
            </div>
          </Link>
          <Link
            to="/news-detail"
            className="flex flex-col overflow-hidden rounded-md border-2 border-white bg-white sm:h-[200px] sm:flex-row"
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
              <h2 className="my-2 text-[14px] font-bold">
                Dùng chung 1 ứng dụng dữ liệu tiêm chủng vaccine
              </h2>
              <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280] md:max-w-[340px]">
                Bộ Y tế, Bộ Công an, Bộ Thông tin và Truyền thông cùng thống
                nhất dùng chung một ứng dụng trong khai báo, nhập dữ liệu tiêm
                chủng
              </div>
              <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>100</div>
              </div>
            </div>
          </Link>
        </div>

        <Carousel
          opts={{
            align: "start",
            loop: true,
          }}
          className="block w-full sm:hidden"
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
        <Link
          to="/news"
          className="mx-auto my-5 mt-10 flex w-[50%] items-center justify-center gap-2 rounded-md border py-2 text-[12px] font-semibold uppercase text-white hover:bg-white hover:text-primary-500 md:w-[40%] md:text-[14px]"
        >
          Xem tất cả <AiOutlineDoubleRight />
        </Link>
      </div>
    </div>
  );
}
