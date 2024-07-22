import { AiOutlineMenu } from "react-icons/ai";
import { Link, NavLink } from "react-router-dom";

export default function MainHeader() {
    return (
        <div className="bg-white mx-auto flex items-center justify-between max-w-screen-2xl p-3 sm:px-10 lg:py-4">
            <Link
                to={ "/" }
                className="relative w-44 items-center"
            >
                <img src="https://ykhoadiamond.com/images/icons/logo.png" className="w-full" alt="Logo" />
            </Link>
            <div className="block lg:hidden" role="button">
                <AiOutlineMenu className="text-3xl" />
            </div>
            <nav className="hidden lg:block">
                <ul className="flex gap-8 nav__link">
                    <li>
                        <NavLink className="uppercase" to='/'>
                            Gói khám
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="uppercase" to='/sss'>
                            Chuyên khoa
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="uppercase" to='/qqq'>
                            Bác sĩ
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="uppercase" to='/cccc'>
                            Tin tức
                        </NavLink>
                    </li>
                    <li>
                        <NavLink className="uppercase" to='/bbb'>
                            Liên hệ
                        </NavLink>
                    </li>
                    <li>
                        |
                    </li>
                    <li>
                        <Link className="uppercase bg-primary-500 px-5 py-2 rounded-lg text-white" to='components/client/Account/login'>
                            Đăng nhập
                        </Link>
                    </li>
                </ul>
            </nav>
        </div>
    );
}