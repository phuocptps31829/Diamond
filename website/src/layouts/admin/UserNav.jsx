import { useState } from "react";
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
import { IoMdMailUnread } from "react-icons/io";
import { FaBell } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { roles } from "@/constants/roles";
import { logoutAction } from "@/redux/authSlice";
import { toastUI } from "@/components/ui/Toastify";
import { AnimatedList } from "@/components/ui/AnimatedList";
import Notification from "./notion/NotionMessage";
let notifications = [
  {
    name: "Payment received",
    description: "Magic UI",
    time: "15m ago",
    icon: "💸",
    color: "#00C9A7",
  },
  {
    name: "User signed up",
    description: "Magic UI",
    time: "10m ago",
    icon: "👤",
    color: "#FFB800",
  },
  {
    name: "New message",
    description: "Magic UI",
    time: "5m ago",
    icon: "💬",
    color: "#FF3D71",
  },
  {
    name: "New event",
    description: "Magic UI",
    time: "2m ago",
    icon: "🗞️",
    color: "#1E86FF",
  },
];

notifications = Array.from({ length: 10 }, () => notifications).flat();
const UserNav = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  const handleLogout = () => {
    dispatch(logoutAction());
    toastUI("Đăng xuất thành công!", "success");
    navigate("/admin/auth");
  };

  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  return (
    <>
      <div className="mr-6 flex items-center gap-6">
        <button className="relative">
          <span className="absolute -right-1 flex h-3 w-3">
            <span
              className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
              style={{ animationDuration: "2s" }}
            ></span>
            <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
          </span>
          <IoMdMailUnread size={25} color="#007BBB" />
        </button>
        
        <DropdownMenu >
          <DropdownMenuTrigger asChild className="">
            <button className="relative" onClick={toggleDropdown}>
              <span className="absolute right-0 flex h-3 w-3">
                <span
                  className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
                  style={{ animationDuration: "2s" }}
                ></span>
                <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
              </span>
              <FaBell size={25} color="#007BBB" />
            </button>
          </DropdownMenuTrigger>
          <DropdownMenuContent className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 max-h-[500px] w-[400px] overflow-y-auto rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800 mt-4">
            <DropdownMenuLabel className="text-base font-semibold dark:text-white">
              Thông báo
            </DropdownMenuLabel>
            <DropdownMenuSeparator />
            <AnimatedList>
              {notifications.map((item, idx) => (
                <DropdownMenuItem asChild key={idx}>
                  <Notification {...item} />
                </DropdownMenuItem>
              ))}
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
