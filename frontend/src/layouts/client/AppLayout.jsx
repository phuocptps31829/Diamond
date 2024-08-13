import { Outlet } from "react-router-dom";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { getProfilePatients } from "@/services/authApi";
import { setUserProfile } from "@/redux/authSlice";

export default function AppLayout() {
  const dispatch = useDispatch();
  const userProfile = useSelector((state) => state.auth.userProfile);
  useEffect(() => {
    const fetchUserProfile = async () => {
      if (!userProfile) {
        const accessToken = localStorage.getItem("accessToken");
        try {
          const userData = await getProfilePatients(accessToken);
          dispatch(setUserProfile(userData));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };

    fetchUserProfile();
  }, [userProfile, dispatch]);

  return (
    <>
      <Header />
      <Toaster />
      <Outlet />
      <Footer />
    </>
  );
}
