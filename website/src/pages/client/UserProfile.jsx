import Cookies from "js-cookie";
import { useEffect } from "react";
import { Outlet, useNavigate, useSearchParams } from "react-router-dom";
import Sidebar from "../../components/client/infomationUser/Sidebar";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useDispatch } from "react-redux";

const UserProfileLayout = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const dispatch = useDispatch();

  const queryAccessToken = searchParams.get("accessToken");
  const queryRefreshToken = searchParams.get("refreshToken");

  useEffect(() => {
    if (queryAccessToken && queryRefreshToken) {
      Cookies.set("accessToken", queryAccessToken, {
        expires: new Date(Date.now() + 60 * 1000)
      });
      Cookies.set("refreshToken", queryRefreshToken, {
        expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000)
      });
      navigate('/profile/information');
    }
  }, [navigate, searchParams, queryAccessToken, queryRefreshToken, dispatch]);

  useScrollToTop();

  return (
    <div className="bg-[#E8F2F7]">
      <div className="mx-auto max-w-screen-2xl pb-6">
        <div className="pt-7 mx-auto grid max-w-7xl grid-cols-12 px-4 md:px-5">
          <div className="col-span-12 w-full lg:col-span-3 lg:max-w-72 relative mb-4 lg:mb-0">
            <div className="box w-full rounded-xl border-gray-300 bg-white p-6 sticky top-32">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-12 lg:col-span-9">
            <div className="grid grid-cols-1 gap-5 rounded-xl min-h-full bg-white sm:grid-cols-1 lg:grid-cols-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
