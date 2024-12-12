import { Badge } from "@/components/ui/Badge";
import { cn } from "@/lib/utils";
import { notificationsApi } from "@/services/notificationsApi";
import { formatRelativeDate } from "@/utils/format";
import { useQueryClient } from "@tanstack/react-query";
import { FaLink } from "react-icons/fa6";
import { Link } from "react-router-dom";

const typeStyles = {
  0: { color: "#ec6d6d", icon: "📢" },
  1: { color: "#E1F2FC", icon: "ℹ️" },
  2: { color: "#fff0b5", icon: "🎉" },
};

const Notification = ({
  _id,
  title,
  description,
  createdAt,
  redirect,
  type,
  isRead,
}) => {
  const { color, icon } = typeStyles[type] || { color: "#ccc", icon: "🔔" };
  const link = `/profile/${redirect?.endpoint || "appointments"}/detail/${redirect?._id}`;
  const queryClient = useQueryClient();

  const handleNotificationClick = async (event) => {
    event.preventDefault();
    if (!isRead) {
      const previousNotifications = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData) return oldData;
        return {
          ...oldData,
          data: oldData.data.map((notification) =>
            notification._id === _id
              ? { ...notification, isRead: true }
              : notification
          ),
        };
      });

      try {
        await notificationsApi.IsReadNotification(_id);
      } catch (error) {
        console.error("Failed to update notification as read:", error);
        queryClient.setQueryData(["notifications"], previousNotifications);
      }
    }
  };

  return (
    <div onClick={handleNotificationClick}>
      <figure
        className={cn(
          "relative mx-auto min-h-fit w-full max-w-[400px] cursor-pointer overflow-hidden rounded-2xl p-4",
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        )}
      >
        <div className="flex flex-row items-center justify-around gap-2">
          {/* Icon */}
          <div
            className="flex size-10 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: color,
            }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          {/* Content */}
          <div className="flex w-8/12 flex-col overflow-hidden">
            <figcaption className="flex flex-row items-center whitespace-pre text-lg font-medium dark:text-white">
              <h1
                className={`text-sm sm:text-base ${isRead ? "text-gray-600/65" : "text-black"}`}
              >
                {title}
              </h1>
              <span
                className={`mx-1 ${isRead ? "text-gray-600/65" : "text-black"}`}
              >
                ·
              </span>
              <span className="text-xs text-gray-500">
                {formatRelativeDate(createdAt)}
              </span>
            </figcaption>
            <p
              className={`text-[12px] font-normal dark:text-white/60 ${isRead ? "text-gray-600/65" : "text-black"}`}
            >
              {description}
            </p>
          </div>
          <Link to={link}>
            <Badge
              variant="ghost"
              className="group rounded-full bg-accent duration-500"
            >
              <FaLink
                size={18}
                className="text-gray-500 group-hover:text-black"
              />
            </Badge>
          </Link>
        </div>
      </figure>
    </div>
  );
};

export default Notification;
