import Banner from "../../components/client/home/Banner";
import OutstandingPackage from "../../components/client/home/OutstandingPackages";
import OutstandingService from "../../components/client/home/OutstandingServices";
import Specialty from "../../components/client/home/Specialty";
import Introduce from "../../components/client/home/Introduce";
import News from "../../components/client/home/News";
import Collaborate from "../../components/client/home/Collaborate";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";
import { getProfilePatients } from "@/services/authApi";
export default function Home() {
  const dispatch = useDispatch();
  useScrollToTop();
  
  useEffect(() => {
    const fetchProfile = async () => {
      const urlParams = new URLSearchParams(window.location.search);
      const accessTokenUrl = urlParams.get("accessToken");
  
      if (accessTokenUrl) {
       const accessToken = localStorage.setItem("accessToken", accessTokenUrl);

  
        try {
          const userData = await getProfilePatients(accessToken);
          
          dispatch(setUserProfile(userData));
        } catch (error) {
          console.error("Failed to fetch user profile:", error);
        }
      }
    };
  
    fetchProfile();
  }, [dispatch]);
  return (
    <div className="bg-[#E8F2F7]">
      <Banner />
      <OutstandingPackage />
      <OutstandingService />
      <Specialty />
      <Introduce />
      <News />
      <Collaborate />
    </div>
  );
}
