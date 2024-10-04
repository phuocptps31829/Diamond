import { cn } from "@/lib/utils";
import { Outlet } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Toaster } from "@/components/ui/Toaster";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";
import Loading from "@/components/ui/Loading";

export default function AdminLayout() {
  const [isOpen, setIsOpen] = useState(true);

  const dispatch = useDispatch();

  const { data: profileFetched, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
  });

  useEffect(() => {
    console.log(profileFetched);
    dispatch(setUserProfile(profileFetched?.data));
  }, [profileFetched, dispatch]);

  return (
    <>
      { isLoading && <Loading /> }
      <Toaster />
      <Sidebar isOpen={ isOpen } onToggleOpen={ setIsOpen } />
      <main
        className={ cn(
          "min-h-[calc(100vh_-_56px)] bg-[#F4F4F5] transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        ) }
      >
        <div>
          <Header isOpen={ isOpen } onToggleOpen={ setIsOpen } />
          <div className="container px-4 pb-8 pt-5 sm:px-8">
            <Outlet />
          </div>
        </div>
      </main>
      <footer
        className={ cn(
          "transition-[margin-left] duration-300 ease-in-out",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        ) }
      ></footer>
    </>
  );
}
