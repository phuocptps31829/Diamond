import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";

export default function Collaborate() {
  const dataImg = [
    "https://img.ykhoadiamond.com/uploads/banner/27032023/2885063c-0597-493e-aff5-6738ab0e9701.jpg",
    "https://img.ykhoadiamond.com/uploads/banner/27032023/c724a189-0b42-4183-9911-422ec76267f7.jpg",
    "https://img.ykhoadiamond.com/uploads/banner/27032023/2885063c-0597-493e-aff5-6738ab0e9701.jpg",
    "https://img.ykhoadiamond.com/uploads/banner/27032023/18e54040-521b-4f1f-ac82-38d360f1dc26.jpg",
    "https://img.ykhoadiamond.com/uploads/banner/27032023/6faabf48-7d03-4b41-bfce-c08652e65727.jpg",
    "https://img.ykhoadiamond.com/uploads/banner/29062024/9f10dbf2-87d0-4912-8ef0-07d3be2f22fd.png",
    "https://img.ykhoadiamond.com/uploads/banner/27032023/e27f1f04-5094-4331-9111-f17f6eecad6b.jpg",
    'https://img.ykhoadiamond.com/uploads/banner/27032023/6fac8729-2684-4b31-ad84-d6809531ca92.jpg',
    'https://img.ykhoadiamond.com/uploads/banner/27032023/6edb4d93-395d-42aa-95da-0c0d9dace27e.jpg',
    'https://img.ykhoadiamond.com/uploads/banner/27032023/fec810ca-3b28-4de9-9472-d9cd68eaae57.jpg'

  ];

  const getRandomImage = () => {
    const randomIndex = Math.floor(Math.random() * dataImg.length);
    return dataImg[randomIndex];
  };

  return (
    <div className="mx-auto mt-2 max-w-screen-xl px-3 py-2 pb-8 sm:px-5 md:mt-3">
      <div className="mb-4 w-full text-center text-[23px] font-bold md:text-[35px]">
        Đối tác y khoa Diamond
      </div>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
        plugins={[
          Autoplay({
            delay: 1500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
         <CarouselContent>
          {dataImg.map((imgUrl, index) => (
            <CarouselItem
              key={index}
              className="basis-1/2 pl-4 sm:basis-1/3 md:basis-1/4 lg:basis-1/6"
            >
              <img
                src={imgUrl}
                alt={`Image ${index}`}
                className="rounded-sm border border-gray-300"
              />
            </CarouselItem>
          ))}
        </CarouselContent>
      </Carousel>
    </div>
  );
}
