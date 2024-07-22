import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

export default function MainHeader() {
  return (
    <div className="mx-auto flex max-w-screen-xl items-center justify-between bg-white p-3 sm:px-10 lg:py-4">
      <Link to={"/"} className="relative w-44 items-center">
        <img
          src="https://ykhoadiamond.com/images/icons/logo.png"
          className="w-full"
          alt="Logo"
        />
      </Link>
      <div className="block lg:hidden" role="button">
        <AiOutlineMenu className="text-3xl" />
      </div>
      <nav className="hidden lg:block">
        <ul className="nav__link flex gap-8">
          <li>
            <NavLink className="uppercase" to="/">
              Gói khám
            </NavLink>
          </li>
          <li>
            <NavLink className="uppercase" to="/sss">
              Chuyên khoa
            </NavLink>
          </li>
          <li>
            <NavLink className="uppercase" to="/qqq">
              Bác sĩ
            </NavLink>
          </li>
          <li>
            <NavLink className="uppercase" to="/cccc">
              Tin tức
            </NavLink>
          </li>
          <li>
            <NavLink className="uppercase" to="/bbb">
              Liên hệ
            </NavLink>
          </li>
          <li>|</li>
          <li>
            <Link className="rounded-lg bg-primary-500 px-5 py-2 uppercase text-white">
              Đăng nhập
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
