import DoctorProduct from "../product/Doctor";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function OtherDoctor() {
  return (
    <div className="mx-auto max-w-screen-xl px-5">
      <h2 className="relative flex text-[24px] font-bold">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="sm:text-md pl-5 text-[22px]">
          Bác sĩ cùng chuyên ngành
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
              className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4"
            >
              <DoctorProduct />
            </CarouselItem>
          ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
}
