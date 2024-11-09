import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { newsApi } from "@/services/newsApi";
import { useQuery } from "@tanstack/react-query";
import { Skeleton } from "@/components/ui/Skeleton";
import NewsCard from "@/components/ui/NewsCard";

export default function News() {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.takeItAllNews,
  });

  if (error) {
    return <div>Error loading news</div>;
  }
  const newsData = data || [];

  return (
    <div className="my-4 w-full bg-primary-500 py-4">
      <div className="mx-auto my-2 max-w-screen-xl px-5">
        <div className="w-full text-center text-[23px] font-bold text-white md:text-[35px]">
          Tin tức mới nhất
        </div>
        <span className="mx-auto block w-full max-w-[90%] text-center text-[14px] text-white md:max-w-[800px] md:text-[16px]">
          Cập nhật những tin tức mới nhất về y tế, sức khỏe, cùng những thông
          tin hữu ích khác.
        </span>

        { isLoading ? (
          <div className="mt-2 flex flex-col gap-5 md:flex-row">
            <div className="min-w-[60%] gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid">
              <Skeleton className="h-[300px] w-full" />{ " " }
              <div className="p-5">
                <div className="mb-[6px] flex flex-wrap gap-2 text-[12px]">
                  <Skeleton className="h-4 w-16 flex-shrink-0" />
                  <Skeleton className="h-4 w-24 flex-shrink-0" />
                  <div className="flex-shrink-0">|</div>
                  <Skeleton className="h-4 w-16 flex-shrink-0" />
                </div>
                <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                  <Skeleton className="h-4 w-8" />
                  <Skeleton className="h-4 w-8" />
                </div>
              </div>
            </div>
            <div className="flex flex-col gap-5">
              { Array.from({ length: 5 }).map((_, index) => (
                <div
                  key={ index }
                  className="flex flex-row items-center overflow-hidden rounded-md bg-white"
                >
                  <div className="h-full min-w-[195px] max-w-[195px]">
                    <Skeleton className="h-full min-h-[126px] w-full" />
                  </div>
                  <div className="p-3">
                    <div className="mb-[6px] flex flex-wrap gap-2 text-[12px]">
                      <Skeleton className="h-4 w-16 flex-shrink-0" />
                      <Skeleton className="h-4 w-24 flex-shrink-0" />
                      <div className="flex-shrink-0">|</div>
                      <Skeleton className="h-4 w-16 flex-shrink-0" />
                    </div>
                    <Skeleton className="my-2 h-6 w-full sm:w-3/4" />
                    <Skeleton className="line-clamp-2 h-4 w-full text-ellipsis sm:w-3/4" />
                    <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
                      <Skeleton className="h-4 w-8" />
                      <Skeleton className="h-4 w-8" />
                    </div>
                  </div>
                </div>
              )) }
            </div>
          </div>
        ) : (
          <div className="mt-3 flex flex-col gap-5 md:flex-row">
            <div className="w-full lg:max-w-[60%]">
              <NewsCard
                newsItem={ newsData[newsData.length - 1] }
                className="flex-col overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid"
                firstNews={ true }
                colorWhite={ true }
              />
            </div>
            <div className="flex flex-col gap-5">
              { newsData
                .slice(newsData.length - 6, newsData.length - 1)
                .reverse()
                .map((newsItem, index) => (
                  <NewsCard
                    key={ index }
                    newsItem={ newsItem }
                    className="flex-row items-center p-1 pl-2"
                    colorWhite={ true }
                  />
                )) }
            </div>
          </div>
        ) }
        <Link
          to="/news"
          className="mx-auto mt-5 flex w-[50%] items-center justify-center gap-2 rounded-md border py-2 text-[12px] font-semibold uppercase text-white hover:bg-white hover:text-primary-500 md:w-[195px] md:text-[14px]"
        >
          Xem tất cả <AiOutlineDoubleRight />
        </Link>
      </div>
    </div>
  );
}
