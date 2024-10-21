import { Outlet, useNavigate } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { authApi } from "@/services/authApi";
import { setAccessToken, setUserProfile } from "@/redux/authSlice";
import Balloon from "@/components/ui/Balloon";
import BalloonMessage from "@/components/ui/BalloonMessage";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export default function AppLayout() {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profileFetched } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
  });

  useEffect(() => {
    if (profileFetched?.data && profileFetched.data.role.name !== "PATIENT") {
      navigate('/admin');
    }
    dispatch(setUserProfile(profileFetched?.data));
  }, [profileFetched, navigate, dispatch]);

  useEffect(() => {
    const accessToken = Cookies.get("accessToken");

    if (accessToken) {
      dispatch(setAccessToken(accessToken));
    }

  }, [dispatch]);

  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
      <Balloon />
      <BalloonMessage />
      <Footer />
    </>
  );
}
