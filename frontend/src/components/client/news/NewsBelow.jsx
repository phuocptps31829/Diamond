import NewsProduct from "../product/News";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/carousel";
import Autoplay from "embla-carousel-autoplay";

export default function NewsBelow() {
  return (
    <div className="mx-auto max-w-screen-xl p-3">
      <h2 className="relative flex text-[24px] font-bold uppercase">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="sm:text-md pl-5 text-[18px]">Đọc nhiều nhất</span>
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
  );
}
