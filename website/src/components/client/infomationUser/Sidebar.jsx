import { NavLink, useLocation, useNavigate } from "react-router-dom";
import {
  FaUser,
  FaFileMedical,
  FaHistory,
  FaLock,
  FaSignOutAlt,
} from "react-icons/fa";
import { logoutAction } from "@/redux/authSlice";
import { clearCart } from "@/redux/cartSlice";
import { toastUI } from "@/components/ui/Toastify";
import { useDispatch } from "react-redux";

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(logoutAction());
    dispatch(clearCart());
    toastUI("Đăng xuất thành công!", "success");
    navigate("/");
  };

  const isActiveLink = (path) => location.pathname === path;

  const navLinkClasses = (path) =>
    isActiveLink(path)
      ? "flex items-center rounded-lg p-3  text-primary-500 bg-bg-gray"
      : "flex items-center rounded-lg p-3  text-gray-600 hover:bg-bg-gray hover:text-primary-700 active:bg-bg-gray active:text-primary-600";

  return (
    <div className="h-auto w-full bg-white">
      <ul>
        <li className="p-2">
          <NavLink
            to="/user-profile"
            className={ navLinkClasses("/user-profile") }
          >
            <FaUser className="mr-2" />
            <span>Thông tin tài khoản</span>
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            to="/user-profile/medical-records"
            className={ navLinkClasses("/user-profile/medical-records") }
          >
            <FaFileMedical className="mr-2" />
            <span>Hồ sơ bệnh án</span>
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            to="/user-profile/appointment-history"
            className={ navLinkClasses("/user-profile/appointment-history") }
          >
            <FaHistory className="mr-2" />
            <span>Lịch sử đặt lịch</span>
          </NavLink>
        </li>
        <li className="p-2">
          <NavLink
            to="/user-profile/change-password"
            className={ navLinkClasses("/user-profile/change-password") }
          >
            <FaLock className="mr-2" />
            <span>Thay đổi mật khẩu</span>
          </NavLink>
        </li>
        <li className="p-2 cursor-pointer">
          <div
            onClick={ handleLogout }
            className="flex items-center rounded-lg p-3 text-gray-600 hover:bg-bg-gray hover:text-primary-700 active:bg-bg-gray active:text-primary-600"
          >
            <FaSignOutAlt className="mr-2" />
            <span>Đăng xuất</span>
          </div>
        </li>
      </ul>
    </div>
  );
};

export default Sidebar;
