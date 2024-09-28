import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { NavbarContext } from "../../../contexts/NavBarContext";
import { useSelector, useDispatch } from "react-redux";
import { logoutAction } from "@/redux/authSlice";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
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
export default function MainHeader() {
  const navigate = useNavigate();
  const { toast } = useToast();
  const dispatch = useDispatch();
  const { toggleNavbar } = useContext(NavbarContext);
  const userProfile = useSelector((state) => state.auth.userProfile);

  // const mutation = useMutation({
  //   mutationFn: logutApi,
  //   onSuccess: () => {
  //     toast({
  //       title: "Đăng xuất thành công",
  //       description: "Hẹn gặp lại bạn!",
  //       status: "success",
  //       action: <ToastAction altText="Đóng">Đóng</ToastAction>,
  //     });
  //   },
  //   onError: (error) => {
  //     const errorMessage =
  //       error.response?.data?.error ||
  //       error.message ||
  //       "Đã xảy ra lỗi, vui lòng thử lại.";
  //     toast({
  //       title: "Đăng xuất thất bại",
  //       description: errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.",
  //       status: "error",
  //       action: <ToastAction altText="Đóng">Đóng</ToastAction>,
  //     });
  //   },
  // });

  const handleLogout = () => {
    // const accessToken = localStorage.getItem("accessToken");
    // mutation.mutate(accessToken);
    dispatch(logoutAction());
    toast({
      variant: "success",
      title: "Đăng xuất thành công!",
      description: "Hẹn gặp lại bạn!",
      status: "success",
      action: <ToastAction altText="Đóng">Đóng</ToastAction>,
    });
    navigate("/");
  };

  return (
    <div className="w-full bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-1 md:px-5">
        <Link to={ "/" } className="relative w-52 items-center">
          <img src={ brandLogo } className="w-full" alt="Logo" />
        </Link>
        <div className="block lg:hidden" role="button" onClick={ toggleNavbar }>
          <AiOutlineMenu className="text-2xl" />
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
            <li className="h-auto">
              { userProfile ? (
                <DropdownMenu>
                  <DropdownMenuTrigger>
                    <div className="flex w-full items-center justify-center">
                      <div className="mr-3 flex flex-col items-start justify-center">
                        <p className="">Xin chào</p>
                        <p className="">{ userProfile.fullName.split(' ').at(-1) } </p>
                      </div>

                      <Avatar>
                        <AvatarImage src={ userProfile?.avatar || 'https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png' } />
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-1">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <Link to={ "/user-profile" }>
                      <DropdownMenuItem>
                        { " " }
                        Thông tin
                      </DropdownMenuItem>
                    </Link>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem onClick={ handleLogout }>
                      Đăng xuất
                    </DropdownMenuItem>
                  </DropdownMenuContent>
                </DropdownMenu>
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
