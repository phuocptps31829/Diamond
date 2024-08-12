import { useContext } from "react";
import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";
import { NavbarContext } from "../../../contexts/NavBarContext";

export default function MainHeader() {
  const { toggleNavbar } = useContext(NavbarContext);
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

  return (
    <div className="w-full bg-white/70 backdrop-blur-md">
      <div className="mx-auto flex max-w-screen-xl items-center justify-between p-3 sm:px-10 lg:py-4">
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
          <ul className="nav__link flex space-x-1 text-sm font-semibold">
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
            <li>
              <Link
                to={"/login"}
                className="rounded-lg bg-primary-500 px-5 py-3 uppercase text-white"
              >
                Đăng nhập
              </Link>
            </li>
          </ul>
        </nav>
      </div>
    </div>
  );
}
