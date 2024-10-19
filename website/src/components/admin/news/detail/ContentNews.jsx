import PropTypes from "prop-types";
import { FaRegEye } from "react-icons/fa";
import { Skeleton } from "@/components/ui/Skeleton";

export default function ContentNews({ news, isLoading }) {
  return (
    <div className="mx-auto max-w-screen-xl p-4 md:p-5">
      <div className="flex gap-10">
        {isLoading ? (
          <div className="mx-auto min-w-[800px]">
            <div className="text-center">
              <Skeleton className="mx-auto my-4 h-[40px] w-[300px] md:w-[500px]" />
            </div>
            <div className="my-5 mb-[6px] flex items-center justify-center gap-2 text-[14px]">
              <Skeleton className="h-4 w-24" />
              <div className="font-semibold">
                <Skeleton className="h-4 w-32" />
              </div>
              <div>|</div>
              <div className="font-semibold">
                <Skeleton className="h-4 w-32" />
              </div>
              <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <Skeleton className="h-4 w-6" />
                <Skeleton className="h-4 w-16" />
              </div>
            </div>

            <div className="w-full">
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <div className="h-[200px] w-full rounded-md bg-gray-200"></div>
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <Skeleton className="my-4 h-4 w-full sm:w-[90%]" />
              <div className="h-[200px] w-full rounded-md bg-gray-200"></div>
            </div>
          </div>
        ) : (
          <div className="mx-auto max-w-[800px]">
            <h2 className="text-center text-[30px] font-semibold md:text-[40px]">
              {news.title}
            </h2>
            <div className="my-5 mb-[6px] flex items-center justify-center gap-2 text-[14px]">
              <div className="font-bold text-primary-700">Tin Tức</div>
              <div className="font-semibold">
                {new Date(news.createdAt).toLocaleDateString()}
              </div>
              <div>|</div>
              <div className="font-semibold">{news.author}</div>
              <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
                <FaRegEye />
                <div>{news.viewCount}</div>
              </div>
            </div>
            <div
              className="content-news w-full"
              dangerouslySetInnerHTML={{ __html: news.content }}
            ></div>
          </div>
        )}
      </div>
    </div>
  );
}

ContentNews.propTypes = {
  news: PropTypes.object,
  isLoading: PropTypes.bool,
};
