import { FaRegEye } from "react-icons/fa";
import { Link } from "react-router-dom";
import { FaRegCalendarAlt } from "react-icons/fa";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

const NewsCard = ({ newsItem, className, firstNews, colorWhite }) => (
  <Link
    to={`/new/${newsItem.slug}`}
    className={`flex h-full overflow-hidden rounded-md backdrop-blur-lg ${className} ${colorWhite ? "bg-[#0000003f] text-white" : "bg-[#ffffff56] text-black"}`}
  >
    {firstNews ? (
      <>
        <div className="h-full w-full">
          <img
            className="h-full w-full object-cover"
            src={`${URL_IMAGE}/${newsItem.image}`}
            alt=""
          />
        </div>
        <div className="p-3">
          <h2 className="my-2 line-clamp-2 text-[14px] font-bold md:text-[20px]">
            {newsItem.title}
          </h2>
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280]">
            {newsItem.shortDescription}
          </div>
          <div className="mb-[6px] flex items-center gap-2 text-[13px] md:text-[15px]">
            <FaRegCalendarAlt />
            <div className="font-semibold">
              {new Date(newsItem.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              ,{" "}
              {new Date(newsItem.createdAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
            <FaRegEye />
            <div>{newsItem.viewCount}</div>
          </div>
        </div>
      </>
    ) : (
      <>
        <div className="relative aspect-[1.6] max-h-[100px] min-h-[100px]">
          <span>
            <img
              className="absolute h-full w-full rounded-md object-cover"
              src={`${URL_IMAGE}/${newsItem.image}`}
              alt={newsItem.title}
            />
          </span>
        </div>
        <div className="w-full p-3 pt-2">
          <h2 className="mb-2 line-clamp-2 text-[14px] font-bold">
            {newsItem.title}
          </h2>
          <div className="line-clamp-2 overflow-hidden text-ellipsis text-[12px] text-[#6D7280]">
            {newsItem.shortDescription}
          </div>
          <div className="mb-[6px] flex items-center gap-2 text-[12px]">
            <FaRegCalendarAlt />
            <div className="font-semibold">
              {new Date(newsItem.createdAt).toLocaleDateString("vi-VN", {
                day: "2-digit",
                month: "2-digit",
                year: "numeric",
              })}
              ,{" "}
              {new Date(newsItem.createdAt).toLocaleTimeString("vi-VN", {
                hour: "2-digit",
                minute: "2-digit",
              })}
            </div>
          </div>
          <div className="mt-3 flex items-center gap-2 text-[13px] font-semibold opacity-50">
            <FaRegEye />
            <div>{newsItem.viewCount}</div>
          </div>
        </div>
      </>
    )}
  </Link>
);

export default NewsCard;
