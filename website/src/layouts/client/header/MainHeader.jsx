import { useContext, useEffect, useRef, useState } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { NavbarContext } from "../../../contexts/NavBarContext";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "@/redux/authSlice";
import { useNavigate } from "react-router-dom";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/DropdownMenu";
import { Avatar } from "@/components/ui/Avatar";
import { AvatarImage } from "@radix-ui/react-avatar";
import brandLogo from "@/assets/images/brandLogo.png";
import { FaBell, FaExternalLinkAlt, FaRegUser } from "react-icons/fa";
import { FaPowerOff } from "react-icons/fa6";
import { clearCart } from "@/redux/cartSlice";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Badge } from "@/components/ui/Badge";
import { IoCalendarOutline } from "react-icons/io5";
import toast from "react-hot-toast";
import { AnimatedList } from "@/components/ui/AnimatedList";
import Notification from "./notion/NotionMessage";
import { useSocket } from "@/hooks/useSocket";
import { notificationsApi } from "@/services/notificationsApi";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const dataNav = [
  {
    id: 1,
    name: "Gói khám",
    to: "/packages",
  },
  {
    id: 2,
    name: "Dịch vụ",
    to: "/services",
  },
  {
    id: 3,
    name: "Chuyên khoa",
    to: "/specialties",
  },
  {
    id: 4,
    name: "Bác sĩ",
    to: "/doctors",
  },
  {
    id: 5,
    name: "Tin tức",
    to: "/news",
  },
  {
    id: 6,
    name: "Liên hệ",
    to: "/contact",
  },
];
const appointments = [
  { date: "15/06/2023", time: "09:00", doctor: "Dr. Nguyễn Văn A" },
  { date: "20/06/2023", time: "14:30", doctor: "Dr. Trần Thị B" },
];

export default function MainHeader() {
  const navigate = useNavigate();

  const dispatch = useDispatch();
  const { toggleNavbar } = useContext(NavbarContext);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [isTooltipOpen, setIsTooltipOpen] = useState(false);
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [notifications, setNotifications] = useState([]);
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };
  const tooltipTimeoutRef = useRef(null);
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(clearCart());
    toast.success("Đăng xuất thành công");
    navigate("/");
  };
  const hasAppointments = appointments.length > 0;
  const handleMouseEnter = () => {
    if (tooltipTimeoutRef.current) {
      clearTimeout(tooltipTimeoutRef.current);
    }
    setIsTooltipOpen(true);
  };
  const handleMouseLeave = () => {
    tooltipTimeoutRef.current = setTimeout(() => {
      setIsTooltipOpen(false);
    }, 300);
  };
  const fetchNotifications = async () => {
    try {
      const data = await notificationsApi.getNotificationsByUser();
      setNotifications(data.data);
    } catch (error) {
      console.error("Failed to fetch notifications:", error);
    }
  };

  useEffect(() => {
    if (!socket) return;

    const testUpcoming = subscribe("notification", (data) => {
      const userID = userProfile?._id;
      console.log("New notification:", data);
      console.log("User ID:", userID);

      if (data.data?.userIDs.includes(userID)) {
        toast.custom((t) => (
          <div
            className={ `${t.visible ? "animate-enter" : "animate-leave"
              } pointer-events-auto flex w-full max-w-[26rem] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-300 ease-in-out` }
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
                onClick={ () => toast.dismiss(t.id) }
                className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
              >
                Đóng
              </button>
            </div>
          </div>
        ));
      }
      fetchNotifications();
    });
    return () => {
      testUpcoming();
    };
  }, [subscribe, socket, userProfile]);
  return (
    <div className="w-full bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-1 md:px-5">
        <Link to={ "/" } className="relative w-56 items-center">
          <img src={ brandLogo } className="w-full" alt="Logo" />
        </Link>
        <div className="flex items-center space-x-3">
          { userProfile && (
            <DropdownMenu >
              <DropdownMenuTrigger asChild className="">
                <button
                  className="relative block lg:hidden"
                  onClick={ toggleDropdown }
                >
                  { notifications.length > 0 && (
                    <span className="absolute right-0 flex h-3 w-3">
                      <span
                        className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
                        style={ { animationDuration: "2s" } }
                      ></span>
                      <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
                    </span>
                  ) }
                  <FaBell size={ 25 } color="#007BBB" />
                </button>
              </DropdownMenuTrigger>
              <DropdownMenuContent
                side="bottom"
                className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 mt-[0.9rem] max-h-[400px] w-[400px] overflow-y-auto rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
              >
                <DropdownMenuLabel className="text-base font-semibold dark:text-white">
                  Thông báo
                </DropdownMenuLabel>
                <DropdownMenuSeparator className="mb-4" />
                <AnimatedList>
                  { notifications.length === 0 ? (
                    <div className="my-3 text-center text-gray-500 dark:text-gray-400">
                      Bạn không có thông báo nào
                    </div>
                  ) : (
                    notifications.map((item, idx) => (
                      <DropdownMenuItem asChild key={ idx } className="">
                        <Notification { ...item } />
                      </DropdownMenuItem>
                    ))
                  ) }
                </AnimatedList>
              </DropdownMenuContent>
            </DropdownMenu>
          ) }
          <div className="block lg:hidden" role="button" onClick={ toggleNavbar }>
            <AiOutlineMenu className="text-2xl" />
          </div>
        </div>
        <nav className="hidden lg:block">
          <ul className="nav__link flex items-center justify-center space-x-1 text-center text-sm font-semibold">
            { dataNav.map((item) => (
              <li key={ item.id }>
                <NavLink
                  to={ item.to }
                  className="rounded-full px-4 py-2.5 uppercase hover:bg-primary-500 hover:text-white"
                >
                  { item.name }
                </NavLink>
              </li>
            )) }
            <li className="px-5">|</li>
            { userProfile && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild className="">
                  <button
                    className="relative hidden lg:block !mr-1"
                    onClick={ toggleDropdown }
                  >
                    { notifications.length > 0 && (
                      <span className="absolute right-0 flex h-3 w-3">
                        <span
                          className="absolute -left-[2px] -top-[2px] inline-flex h-4 w-4 animate-ping rounded-full bg-[#13D6CB] opacity-75"
                          style={ { animationDuration: "2s" } }
                        ></span>
                        <span className="relative inline-flex h-3 w-3 rounded-full bg-[#13D6CB]"></span>
                      </span>
                    ) }
                    <FaBell size={ 25 } color="#007BBB" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent
                  side="bottom"
                  className="scrollbar-thin scrollbar-thumb-primary-500 scrollbar-track-gray-200 mt-[0.9rem] max-h-[400px] w-[400px] overflow-y-auto rounded-xl bg-white p-4 shadow-lg dark:bg-gray-800"
                >
                  <DropdownMenuLabel className="text-base font-semibold dark:text-white">
                    Thông báo
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator className="mb-4" />
                  <AnimatedList>
                    { notifications.length === 0 ? (
                      <div className="my-3 text-center text-gray-500 dark:text-gray-400">
                        Bạn không có thông báo nào
                      </div>
                    ) : (
                      notifications.map((item, idx) => (
                        <DropdownMenuItem asChild key={ idx } className="">
                          <Notification { ...item } />
                        </DropdownMenuItem>
                      ))
                    ) }
                  </AnimatedList>
                </DropdownMenuContent>
              </DropdownMenu>
            ) }
            <li className="h-auto">
              { userProfile ? (
                <div className="relative">
                  <DropdownMenu>
                    <DropdownMenuTrigger className="flex w-full items-center justify-center">
                      <div className="mx-3 flex flex-col items-start justify-center">
                        <p>Xin chào</p>
                        <p>{ userProfile?.fullName.split(" ").at(-1) } </p>
                      </div>
                      <div className="relative">
                        <Avatar>
                          <AvatarImage
                            className="cursor-pointer"
                            src={
                              userProfile?.avatar
                                ? `${import.meta.env.VITE_IMAGE_API_URL}/${userProfile?.avatar}`
                                : "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png"
                            }
                          />
                        </Avatar>
                        <span className="absolute bottom-0 right-0 block h-3 w-3 rounded-full bg-green-500 ring-2 ring-white" />
                      </div>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className="mt-1">
                      <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                      <DropdownMenuSeparator />
                      <Link to={ "/profile/information" }>
                        <DropdownMenuItem>
                          <FaRegUser className="mr-2" />
                          Thông tin
                        </DropdownMenuItem>
                      </Link>
                      <DropdownMenuSeparator />
                      <DropdownMenuItem onClick={ handleLogout }>
                        <FaPowerOff className="mr-2" />
                        Đăng xuất
                      </DropdownMenuItem>
                    </DropdownMenuContent>
                  </DropdownMenu>

                  { hasAppointments && (
                    <TooltipProvider>
                      <Tooltip open={ isTooltipOpen }>
                        <TooltipTrigger asChild>
                          <div
                            onMouseEnter={ handleMouseEnter }
                            onMouseLeave={ handleMouseLeave }
                          >
                            <Badge
                              variant="destructive"
                              className="absolute -right-2 -top-2 z-20 flex h-5 w-4 cursor-pointer items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
                            >
                              { appointments.length }
                            </Badge>
                          </div>
                        </TooltipTrigger>
                        <TooltipContent
                          side="bottom"
                          className="bottom mt-[9px] rounded-xl border border-gray-200 p-0 shadow-2xl"
                          onMouseEnter={ handleMouseEnter }
                          onMouseLeave={ handleMouseLeave }
                        >
                          <div className="max-w-xs bg-white p-4">
                            <div className="mb-2 flex items-center justify-between">
                              <div className="flex items-center space-x-2">
                                <IoCalendarOutline className="h-5 w-5 text-primary-500" />
                                <h3 className="text-sm font-semibold text-black">
                                  Lịch hẹn khám bệnh
                                </h3>
                              </div>
                              <Link
                                to="/appointments"
                                className="ml-1 rounded-full p-1 text-primary-500 transition-colors hover:bg-gray-100 hover:text-primary-700"
                                aria-label="Xem chi tiết lịch hẹn"
                              >
                                <FaExternalLinkAlt className="h-4 w-4" />
                              </Link>
                            </div>
                            { hasAppointments ? (
                              <ul className="space-y-2">
                                { appointments.map((appointment) => (
                                  <li key={ appointment.id } className="text-sm">
                                    <p className="text-start font-medium text-black">
                                      { appointment.date } - { appointment.time }
                                    </p>
                                    <p className="text-start text-gray-600">
                                      Bác sĩ: { appointment.doctor }
                                    </p>
                                  </li>
                                )) }
                              </ul>
                            ) : (
                              <p className="text-sm text-gray-600">
                                Bạn không có lịch hẹn nào.
                              </p>
                            ) }
                          </div>
                        </TooltipContent>
                      </Tooltip>
                    </TooltipProvider>
                  ) }
                </div>
              ) : (
                <Link
                  to={ "/login" }
                  className="rounded-lg bg-primary-500 px-5 py-3 uppercase text-white"
                >
                  Đăng nhập
                </Link>
              ) }
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
