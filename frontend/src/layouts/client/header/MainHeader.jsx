import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { NavbarContext } from "../../../contexts/NavBarContext";
import { useSelector } from "react-redux";
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
  const { toggleNavbar } = useContext(NavbarContext);
  const userProfile = useSelector((state) => state.auth.userProfile);

  return (
    <div className="w-full bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between px-3 py-3 md:px-5 lg:py-4">
        <Link to={"/"} className="relative w-44 items-center">
          <img
            src="https://ykhoadiamond.com/images/icons/logo.png"
            className="w-full"
            alt="Logo"
          />
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
                        <p className="">{userProfile.fullName} </p>
                      </div>

                      <Avatar>
                        <AvatarImage src={userProfile.avatar} />
                      </Avatar>
                    </div>
                  </DropdownMenuTrigger>
                  <DropdownMenuContent className="mt-1">
                    <DropdownMenuLabel>Tài khoản</DropdownMenuLabel>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>
                      {" "}
                      <Link to={"/user-profile"}>Thông tin</Link>
                    </DropdownMenuItem>
                    <DropdownMenuSeparator />
                    <DropdownMenuItem>Đăng xuất</DropdownMenuItem>
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
