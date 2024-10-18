import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton";
import NewsCard from "@/components/ui/NewsCard";

export default function NewsAbove({ news, isLoading }) {
  return (
    <div className="mx-auto max-w-screen-xl p-3 md:p-5 md:py-10">
      <div className="w-full text-center text-[23px] font-bold uppercase md:text-[35px]">
        Tin tức
      </div>
      <div className="my-3 flex items-center justify-center text-2xl text-[#797676]">
        <img src="https://benhviennamsaigon.com.vn/skins/default/images/line.png" />
      </div>

      { isLoading ? (
        <div className="mt-6 grid gap-4 md:grid-cols-2 md:grid-rows-1">
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
            newsItem={ news[news.length - 1] }
            className="gap-4 overflow-hidden rounded-md border bg-white md:row-span-3 md:grid-rows-subgrid"
            firstNews={ true }
          />
          { news
            .slice(news.length - 4, news.length - 1)
            .reverse()
            .map((newsItem, index) => (
              <NewsCard
                key={ index }
                newsItem={ newsItem }
                className="sm:h-[200px] sm:flex-row"
              />
            )) }
        </div>
      ) }
    </div>
  );
}

NewsAbove.propTypes = {
  news: PropTypes.array,
  isLoading: PropTypes.bool,
};
