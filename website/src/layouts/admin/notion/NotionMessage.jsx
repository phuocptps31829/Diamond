import { cn } from "@/lib/utils";
import { notificationsApi } from "@/services/notificationsApi";
import { formatRelativeDate } from "@/utils/format";
import { useQueryClient } from "@tanstack/react-query";

const typeStyles = {
  0: { color: "#ec6d6d", icon: "📢" },
  1: { color: "#E1F2FC", icon: "ℹ️" },
  2: { color: "#fff0b5", icon: "🎉" },
};
const Notification = ({ _id, title, description, createdAt, type, isRead }) => {
  const { color, icon } = typeStyles[type] || { color: "#ccc", icon: "🔔" };
  const queryClient = useQueryClient();

  const handleNotificationClick = async (event) => {
    event.preventDefault();

    if (!isRead) {
      const previousNotifications = queryClient.getQueryData(["notifications"]);

      queryClient.setQueryData(["notifications"], (oldData) => {
        if (!oldData || !oldData.data) return oldData;

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

        // Invalidate cache để đồng bộ dữ liệu từ server (nếu cần)
        // queryClient.invalidateQueries(["notifications"]);
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
          // animation styles
          "transition-all duration-200 ease-in-out hover:scale-[103%]",
          // light styles
          "bg-white [box-shadow:0_0_0_1px_rgba(0,0,0,.03),0_2px_4px_rgba(0,0,0,.05),0_12px_24px_rgba(0,0,0,.05)]",
          // dark styles
          "transform-gpu dark:bg-transparent dark:backdrop-blur-md dark:[border:1px_solid_rgba(255,255,255,.1)] dark:[box-shadow:0_-20px_80px_-20px_#ffffff1f_inset]"
        )}
      >
        <div className="flex flex-row items-center gap-3">
          {/* Icon */}
          <div
            className="flex size-10 w-11 items-center justify-center rounded-2xl"
            style={{
              backgroundColor: color,
            }}
          >
            <span className="text-lg">{icon}</span>
          </div>
          {/* Content */}
          <div className="flex flex-col overflow-hidden w-10/12 mx-auto">
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
        </div>
      </figure>
    </div>
  );
};

export default Notification;
