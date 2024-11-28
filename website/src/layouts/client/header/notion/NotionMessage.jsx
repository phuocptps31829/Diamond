import { cn } from "@/lib/utils";
import { formatRelativeDate } from "@/utils/format";
import { Link } from "react-router-dom";

const typeStyles = {
  0: { color: "#ec6d6d", icon: "📢" },
  1: { color: "#E1F2FC", icon: "ℹ️" },
  2: { color: "#fff0b5", icon: "🎉" },
};

const Notification = ({
  title,
  description,
  createdAt,
  redirect,
  type,
  isRead,
}) => {
  const { color, icon } = typeStyles[type] || { color: "#ccc", icon: "🔔" };
  const link = `/profile/${redirect?.endpoint || "appointments"}/detail/${redirect?._id}`;
  return (
    <Link to={ link }>
      <figure
        className={ cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          // animation styles
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          // light styles
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          // dark styles
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]",
          isRead === 1 ? "opacity-50" : "opacity-100"
        ) }
      >
        <div className="flex flex-row items-center gap-3">
          {/* Icon */ }
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={ {
              backgroundColor: color,
            } }
          >
            <span className="text-lg">{ icon }</span>
          </div>
          {/* Content */ }
          <div className="flex flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
              <span className="text-sm sm:text-lg">{ title }</span>
              <span className="mx-1">·</span>
              <span className="text-xs text-gray-500">
                { formatRelativeDate(createdAt) }
              </span>
            </figcaption>
            <p className="text-[12px] font-normal dark:text-white/60">
              { description }
            </p>
          </div>
        </div>
      </figure>
    </Link>
  );
};

export default Notification;
