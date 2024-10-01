import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";

const NewsCard = ({ newsItem, className, firstNews }) => (
  <Link
    to={`/news-detail/${newsItem._id}`}
    className={`flex flex-col overflow-hidden rounded-md bg-white ${className}`}
  >
    {firstNews ? (
      <div className="h-full w-full">
        <img
          className="h-full w-full object-cover"
          src={newsItem.image}
          alt=""
        />
      </div>
    ) : (
      <div className="h-full w-full sm:min-w-[155px] sm:max-w-[155px] lg:min-w-[195px] lg:max-w-[195px]">
        <img
          className="h-full w-full object-cover"
          src={newsItem.image}
          alt=""
        />
      </div>
    )}

    <div className="p-3">
      <div className="mb-[6px] flex gap-2 text-[12px]">
        <div className="font-bold text-primary-700">Tin Tức</div>
        <div className="font-semibold">
          {new Date(newsItem.createdAt).toLocaleDateString()}
        </div>
        <div>|</div>
        <div className="font-semibold">{newsItem.author}</div>
      </div>
      <h2 className="my-2 text-[14px] font-bold">{newsItem.title}</h2>
      <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280]">
        {newsItem.shortDescription}
      </div>
      <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
        <FaRegEye />
        <div>{newsItem.viewCount}</div>
      </div>
    </div>
  </Link>
);

export default NewsCard;
