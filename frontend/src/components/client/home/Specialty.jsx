import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Specialty() {
  return (
    <div className="my-10 w-full bg-primary-500 py-4">
      <div className="mx-auto my-5 max-w-screen-xl px-5">
        <div className="mb-2 w-full text-center text-[23px] font-bold text-white md:text-[35px]">
          Chuyên khoa
        </div>
        <span className="block w-full text-center text-[14px] text-white md:text-[16px]">
          Danh sách toàn bộ các Khoa & Chuyên khoa tại Hệ Thống Y Khoa Diamond
        </span>

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
                className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
              >
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
