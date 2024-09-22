import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfilePatients } from "@/services/authApi";
import { setAccessToken, setUserProfile } from "@/redux/authSlice";
import Balloon from "@/components/ui/Ballon";
import BalloonMessage from "@/components/ui/BallonMessage";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";

export default function AppLayout() {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.auth.userProfile);

  const { data: profileFetched, error, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: () => getProfilePatients(),
  });

  useEffect(() => {
    dispatch(setUserProfile(profileFetched));
  }, [profileFetched, dispatch]);

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
      <Balloon />;
      <BalloonMessage />
      <Footer />
    </>
  );
}
