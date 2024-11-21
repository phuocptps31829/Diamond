import { Skeleton } from "@/components/ui/Skeleton";
import NewsCard from "@/components/ui/NewsCard";

export default function NewsAbove({ news, isLoading }) {
  console.log("news", news);
  return (
    <div className="mx-auto max-w-screen-xl p-3 py-5 pb-4 md:p-5">
      <div className="mt-2 flex items-center gap-5">
        <h2 className="whitespace-nowrap text-[22px] font-bold text-primary-500 sm:text-[28px]">
          Tin tức mới nhất
        </h2>
        <div className="h-[2.5px] w-full bg-[linear-gradient(to_right,#007BBB,#F57116)]"></div>
      </div>
      {isLoading ? (
        <div className="mt-6 flex flex-col gap-5 md:flex-row">
          <div className="min-w-[60%] gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid">
            <Skeleton className="h-[300px] w-full" />{" "}
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
            {Array.from({ length: 5 }).map((_, index) => (
              <div
                key={index}
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
            ))}
          </div>
        </div>
      ) : (
        <div className="mt-6 flex flex-col gap-5 md:flex-row">
          <div className="lg:max-w-[60%] w-full" >
            <NewsCard
              newsItem={news[0]}
              className="flex-col overflow-hidden rounded-md border md:row-span-3 md:grid-rows-subgrid"
              firstNews={true}
            />
          </div>
          <div className="flex flex-col gap-5">
            {news
              .slice(1, 6)
              .map((newsItem, index) => (
                <NewsCard
                  key={index}
                  newsItem={newsItem}
                  className="flex-row items-center pl-2"
                />
              ))}
          </div>
        </div>
      )}
    </div>
  );
}
