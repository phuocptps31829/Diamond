import { useContext, useRef, useState } from "react";
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
import { toastUI } from "@/components/ui/Toastify";
import { FaExternalLinkAlt, FaRegUser } from "react-icons/fa";
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
  const tooltipTimeoutRef = useRef(null);
  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(clearCart());
    toastUI("Đăng xuất thành công!", "success");
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

  return (
    <div className="w-full bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-1 md:px-5">
        <Link to={"/"} className="relative w-56 items-center">
          <img src={brandLogo} className="w-full" alt="Logo" />
        </Link>
        <div className="block lg:hidden" role="button" onClick={toggleNavbar}>
          <AiOutlineMenu className="text-2xl" />
        </div>
        <nav className="hidden lg:block">
          <ul className="nav__link flex items-center justify-center space-x-1 text-center text-sm font-semibold">
            {dataNav.map((item) => (
              <li key={item.id}>
                <NavLink
                  to={item.to}
                  className="rounded-full px-4 py-2.5 uppercase hover:bg-primary-500 hover:text-white"
                >
                  {item.name}
                </NavLink>
              </li>
            ))}
            <li className="px-5">|</li>
            <li className="h-auto">
              {userProfile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex w-full items-center justify-center">
                      <div className="mr-3 flex flex-col items-start justify-center">
                        <p className="">Xin chào</p>
                        <p className="">
                          {userProfile?.fullName.split(" ").at(-1)}{" "}
                        </p>
                      </div>
                      <TooltipProvider>
                        <Tooltip open={isTooltipOpen}>
                          <TooltipTrigger asChild>
                            <div
                              className="relative inline-block"
                              onMouseEnter={handleMouseEnter}
                              onMouseLeave={handleMouseLeave}
                            >
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

                              {hasAppointments && (
                                <>
                                  <Badge
                                    variant="destructive"
                                    className="absolute -right-2 -top-2 z-20 flex h-5 w-4 items-center justify-center rounded-full bg-red-500 text-[10px] font-medium text-white"
                                  >
                                    {appointments.length}
                                  </Badge>
                                </>
                              )}
                            </div>
                          </TooltipTrigger>
                          <TooltipContent
                            side="bottom"
                            className="bottom mt-2 rounded-xl border border-gray-200 p-0 shadow-2xl"
                            onMouseEnter={handleMouseEnter}
                            onMouseLeave={handleMouseLeave}
                          >
                            <div className="max-w-xs bg-white p-4">
                              <div className="mb-2 flex items-center justify-between">
                                <div className="flex items-center space-x-2">
                                  <IoCalendarOutline className="h-5 w-5 text-primary-500" />
                                  <h3 className="text-sm font-semibold text-black">
                                    Lịch hẹn khám bệnh
                                  </h3>
                                </div>
                                <TooltipProvider>
                                  <Tooltip>
                                    <TooltipTrigger asChild>
                                      <Link
                                        href="/appointments"
                                        className="ml-1 rounded-full p-1 text-primary-500 transition-colors hover:bg-gray-100 hover:text-primary-700"
                                        aria-label="Xem chi tiết lịch hẹn"
                                      >
                                        <FaExternalLinkAlt className="h-4 w-4" />
                                      </Link>
                                    </TooltipTrigger>
                                    <TooltipContent
                                      side="top"
                                      className="bg-gray-800 px-2 py-1 text-xs text-white"
                                    >
                                      Xem chi tiết lịch hẹn
                                    </TooltipContent>
                                  </Tooltip>
                                </TooltipProvider>
                              </div>
                              {hasAppointments ? (
                                <ul className="space-y-2">
                                  {appointments.map((appointment) => (
                                    <li
                                      key={appointment.id}
                                      className="text-sm"
                                    >
                                      <p className="text-start font-medium text-black">
                                        {appointment.date} - {appointment.time}
                                      </p>
                                      <p className="text-start text-gray-600">
                                        Bác sĩ: {appointment.doctor}
                                      </p>
                                    </li>
                                  ))}
                                </ul>
                              ) : (
                                <p className="text-sm text-gray-600">
                                  Bạn không có lịch hẹn nào.
                                </p>
                              )}
                            </div>
                          </TooltipContent>
                        </Tooltip>
                      </TooltipProvider>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-1">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={"/profile/information"}>
                      <DropdownMenuItem>
                        {" "}
                        <FaRegUser className="mr-2" />
                        Thông tin
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={handleLogout}>
                      <FaPowerOff className="mr-2" />
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
              ) : (
                <Link
                  to={"/login"}
                  className="rounded-lg bg-primary-500 px-5 py-3 uppercase text-white"
                >
                  Đăng nhập
                </Link>
              )}
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
