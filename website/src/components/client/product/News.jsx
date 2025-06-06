import { Link } from "react-router-dom";
import { FaRegEye } from "react-icons/fa";
import { FaRegCalendarAlt } from "react-icons/fa";
export default function NewsProduct({
  slug,
  title,
  viewCount,
  createdAt,
  image,
}) {
  return (
    <div className="h-full overflow-hidden rounded-xl bg-white shadow-sm">
      <Link
        to={ `/new/${slug}` }
        className="block gap-4 overflow-hidden rounded-md md:row-span-3 md:grid-rows-subgrid"
      >
        <div className="h-[250px] w-full rounded-lg">
          <img
            src={ `${import.meta.env.VITE_IMAGE_API_URL}/${image}` }
            alt={ title }
            className="block h-full w-full rounded-t-lg object-cover"
          />
        </div>
        <div className="flex h-full flex-col p-5">
          <h2 className="mb-2 text-[14px] font-bold sm:text-[18px]">{ title }</h2>
          <div className="mb-[6px] flex items-center justify-between gap-2 text-[12px]">
            <div className="flex items-center gap-2">
              <FaRegCalendarAlt />
              <div className="font-semibold">
                { new Date(createdAt).toLocaleDateString("vi-VN", {
                  day: "2-digit",
                  month: "2-digit",
                  year: "numeric",
                }) }
                ,{ " " }
                { new Date(createdAt).toLocaleTimeString("vi-VN", {
                  hour: "2-digit",
                  minute: "2-digit",
                }) }
              </div>
            </div>

            <div className="flex items-center gap-2 text-[13px] font-semibold opacity-50">
              <FaRegEye />
              <div>{ viewCount }</div>
            </div>
          </div>
        </div>
      </Link>
    </div>
  );
}
