import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import NewsItem from "../product/News";
import { takeItAllNews } from "@/services/newsApi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import NewsCard from "@/components/ui/NewsCard";

export default function News() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: takeItAllNews,
  });

  if (error) {
    return <div>Error loading news</div>;
  }

  return (
    <div className="my-10 w-full bg-primary-500 py-4">
      <div className="mx-auto my-2 max-w-screen-xl p-5">
        <div className="w-full text-center text-[23px] font-bold text-white md:text-[35px]">
          Tin tức mới nhất
        </div>
        <span className="mx-auto my-2 mb-4 block w-full max-w-[90%] text-center text-[14px] text-white md:max-w-[800px] md:text-[16px]">
          Cập nhật những tin tức mới nhất về y tế, sức khỏe, cùng những thông
          tin hữu ích khác.
        </span>

        {isLoading ? (
          <div className="mt-6 hidden gap-4 px-2 sm:grid md:grid-cols-2 md:grid-rows-1 lg:px-3">
            <div className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid">
              <Skeleton className="h-[200px] w-full md:h-[300px]" />
              <div className="p-5">
                <div className="mb-[6px] flex gap-2 text-[12px]">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <div>|</div>
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
              <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-3">
                <div className="mb-[6px] flex gap-2 text-[12px]">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <div>|</div>
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
              <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-3">
                <div className="mb-[6px] flex gap-2 text-[12px]">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <div>|</div>
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col overflow-hidden rounded-md bg-white sm:h-[200px] sm:flex-row">
              <div className="h-full min-w-[155px] max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
                <Skeleton className="h-full w-full" />
              </div>
              <div className="p-3">
                <div className="mb-[6px] flex gap-2 text-[12px]">
                  <Skeleton className="h-4 w-16" />
                  <Skeleton className="h-4 w-24" />
                  <div>|</div>
                  <Skeleton className="h-4 w-16" />
                </div>
                <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
          </div>
        ) : (
          <div className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-1">
            <NewsCard
              newsItem={data[data.length - 1]}
              className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid"
              firstNews={true}
            />
            {data
              .slice(data.length - 4, data.length - 1)
              .map((newsItem, index) => (
                <NewsCard
                  key={index}
                  newsItem={newsItem}
                  className="sm:h-[200px] sm:flex-row"
                />
              ))}
          </div>
        )}
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
            {isLoading
              ? Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem
                    key={index}
                    className="pl-4 sm:basis-1/2 lg:basis-1/3"
                  >
                    <div
                      className="h-full overflow-hidden rounded-xl bg-white shadow-sm"
                      key={index}
                    >
                      <div className="block gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid">
                        <div className="h-[250px] w-full">
                          <Skeleton className="block h-full w-full object-cover" />
                        </div>
                        <div className="p-5">
                          <div className="mb-[6px] flex gap-2 text-[12px]">
                            <Skeleton className="h-4 w-16" />
                            <Skeleton className="h-4 w-24" />
                            <div>|</div>
                            <Skeleton className="h-4 w-16" />
                          </div>
                          <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                          <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                          <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                            <Skeleton className="h-4 w-8" />
                            <Skeleton className="h-4 w-8" />
                          </div>
                        </div>
                      </div>
                    </div>
                  </CarouselItem>
                ))
              : data
                  .slice(
                    data.length - 3 < 0 ? 0 : data.length - 3,
                    data.length - 1,
                  )
                  .map((news, index) => (
                    <CarouselItem
                      key={index}
                      className="pl-4 sm:basis-1/2 lg:basis-1/3"
                    >
                      <NewsItem {...news} />
                    </CarouselItem>
                  ))}
          </CarouselContent>
          <CarouselPrevious />
          <CarouselNext />
        </Carousel>
        <Link
          to="/news"
          className="mx-auto my-5 mt-10 flex w-[50%] items-center justify-center gap-2 rounded-md border py-2 text-[12px] font-semibold uppercase text-white hover:bg-white hover:text-primary-500 md:w-[195px] md:text-[14px]"
        >
          Xem tất cả <AiOutlineDoubleRight />
        </Link>
      </div>
    </div>
  );
}
