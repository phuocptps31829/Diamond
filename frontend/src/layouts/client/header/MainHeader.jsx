import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

export default function MainHeader() {
  const dataNav = [
    {
      id: 1,
      name: "Gói khám",
      to: "/goikham",
    },
    {
      id: 2,
      name: "Chuyên khoa",
      to: "/chuyenkhoa",
    },
    {
      id: 3,
      name: "Bác sĩ",
      to: "/bacsi",
    },
    {
      id: 4,
      name: "Tin tức",
      to: "/tintuc",
    },
    {
      id: 5,
      name: "Liên hệ",
      to: "/lienhe",
    },
  ];

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
        <AiOutlineMenu className="text-2xl" />
      </div>
      <nav className="hidden lg:block">
        <ul className="nav__link flex text-sm font-semibold">
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
            <Link className="rounded-lg bg-primary-500 px-5 py-3 uppercase text-white">
              Đăng nhập
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
