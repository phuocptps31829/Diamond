import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import { Avatar } from "../../components/ui/Avatar";
import { Button } from "../../components/ui/Button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuGroup,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "../../components/ui/DropdownMenu";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "../../components/ui/Tooltip";
import { LogOut, User } from "lucide-react";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { roles } from "@/constants/roles";
import { logoutAction } from "@/redux/authSlice";
import { toastUI } from "@/components/ui/Toastify";
import { AnimatedList } from "@/components/ui/AnimatedList";
import Notification from "./notion/NotionMessage";
import { useSocket } from "@/hooks/useSocket";
import { notificationsApi } from "@/services/notificationsApi";
import toast from "react-hot-toast";
import { useQuery, useQueryClient } from "@tanstack/react-query";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const UserNav = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const { subscribe, socket } = useSocket(SOCKET_URL);
  useEffect(() => {
    if (!socket) return;
    const handleNotification = (data) => {
      const userID = userProfile?._id;
      if (data.data?.userIDs.includes(userID)) {
        queryClient.invalidateQueries(["notifications"]);
        toast.custom((t) => (
          <div
            className={`${
              t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-[26rem] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-300 ease-in-out`}
          >
            <div className="w-0 flex-1 p-4 py-3">
              <div className="flex items-start">
                <div className="flex-shrink-0 pt-0.5">
                  <svg
                    className="h-10 w-10 text-blue-500"
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 20 20"
                    fill="currentColor"
                  >
                    <path
                      fillRule="evenodd"
                      d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v3a1 1 0 102 0V6zm-1 7a1 1 0 100-2 1 1 0 000 2z"
                      clipRule="evenodd"
                    />
                  </svg>
                </div>
                <div className="ml-3 flex-1">
                  <p className="text-sm font-medium text-gray-900">
                    Bạn có một thông báo mới!
                  </p>
                  <p className="mt-1 text-sm text-gray-500">
                    Nhấn vào chuông để xem chi tiết.
                  </p>
                </div>
              </div>
            </div>
            <div className="flex border-l border-gray-200">
              <button
                onClick={() => toast.dismiss(t.id)}
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Đóng
              </button>
            </div>
          </div>
        ));
      }
    };

    const unsubscribe = subscribe("notification", handleNotification);

    return () => {
      unsubscribe();
    };
  }, [subscribe, socket, userProfile]);
  const handleLogout = () => {
    dispatch(logoutAction());
    toastUI("Đăng xuất thành công!", "success");
    navigate("/admin/auth");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  const { data } = useQuery({
    queryKey: ["notifications"],
    queryFn: () => notificationsApi.getNotificationsByUser(),
    enabled: !!userProfile,
  });

  const notifications = data?.data || [];
  const allNotificationsRead = notifications.every(
    (notification) => notification.isRead
  );
  return (
    <>
      <div className="flex items-center gap-6">
        <DropdownMenu>
          <DropdownMenuTrigger asChild className="">
            <button className="relative" onClick={toggleDropdown}>
              {notifications.length > 0 && !allNotificationsRead && (
                <span className="absolute right-0 flex h-3 w-3">
                  <span
                    className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
                    style={{ animationDuration: "2s" }}
                  ></span>
                  <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
                </span>
              )}
              <FaBell size={25} color="#007BBB" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="scrollbar-thin positionFixed scrollbar-thumb-primary-500 scrollbar-track-gray-200 mt-4 max-h-[500px] w-[400px] overflow-y-auto rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800">
            <DropdownMenuLabel className="text-base font-semibold dark:text-white">
              Thông báo
            </DropdownMenuLabel>
            <DropdownMenuSeparator className="mb-4" />
            <AnimatedList baseDelay={1000} minDelay={100}>
              {notifications.length === 0 ? (
                <div className="my-3 text-center text-gray-500 dark:text-gray-400">
                  Bạn không có thông báo nào
                </div>
              ) : (
                notifications.map((item, idx) => (
                  <DropdownMenuItem asChild key={idx}>
                    <Notification {...item} />
                  </DropdownMenuItem>
                ))
              )}
            </AnimatedList>
          </DropdownMenuContent>
        </DropdownMenu>
      </div>
      <DropdownMenu>
        <TooltipProvider disableHoverableContent>
          <Tooltip delayDuration={100}>
            <TooltipTrigger asChild>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="flex items-center space-x-2 border-none bg-transparent shadow-none"
                >
                  <div className="flex flex-col">
                    <span className="font-semibold text-primary-500">
                      {userProfile?.fullName}
                    </span>
                    <span className="text-right text-[13px] font-light text-primary-300">
                      {
                        roles.find(
                          (role) => role.value === userProfile?.role?.name
                        )?.label
                      }
                    </span>
                  </div>
                  <Avatar>
                    <img
                      src={
                        userProfile?.avatar
                          ? `${import.meta.env.VITE_IMAGE_API_URL}/${userProfile?.avatar}`
                          : "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                      }
                      alt={userProfile?.fullName}
                      className="h-10 w-10 rounded-full"
                    />
                  </Avatar>
                </Button>
              </DropdownMenuTrigger>
            </TooltipTrigger>
            <TooltipContent side="bottom">Hồ sơ</TooltipContent>
          </Tooltip>
        </TooltipProvider>

        <DropdownMenuContent className="w-56" align="end" forceMount>
          <DropdownMenuLabel className="font-normal">
            <div className="flex flex-col space-y-1">
              <p className="text-sm font-medium leading-none">
                {userProfile?.fullName}
              </p>
              <p className="text-xs leading-none text-muted-foreground">
                {userProfile?.phoneNumber || userProfile?.email}
              </p>
            </div>
          </DropdownMenuLabel>
          <DropdownMenuSeparator />
          <DropdownMenuGroup>
            <DropdownMenuItem className="hover:cursor-pointer" asChild>
              <Link to="/admin/profile-admin" className="flex items-center">
                <User className="mr-3 h-4 w-4 text-muted-foreground" />
                Hồ sơ
              </Link>
            </DropdownMenuItem>
          </DropdownMenuGroup>
          <DropdownMenuSeparator />
          <DropdownMenuItem
            className="hover:cursor-pointer"
            onClick={handleLogout}
          >
            <LogOut className="mr-3 h-4 w-4 text-muted-foreground" />
            Đăng xuất
          </DropdownMenuItem>
        </DropdownMenuContent>
      </DropdownMenu>
    </>
  );
};

export default UserNav;
