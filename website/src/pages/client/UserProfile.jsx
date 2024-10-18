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
      navigate('/user-profile');
    }
  }, [navigate, searchParams, queryAccessToken, queryRefreshToken, dispatch]);

  useScrollToTop();

  return (
    <div className="bg-[#E8F2F7]">
      <div className="mx-auto max-w-screen-2xl pb-6">
        <div className="mx-auto grid max-w-7xl grid-cols-12">
          <div className="col-span-12 w-full max-md:mx-auto max-md:max-w-md md:col-span-3 md:max-w-72">
            <div className="box mt-7 w-full rounded-xl border-gray-300 bg-white p-6">
              <Sidebar />
            </div>
          </div>
          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-1 gap-5 rounded-xl bg-white sm:grid-cols-1 lg:grid-cols-1">
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserProfileLayout;
