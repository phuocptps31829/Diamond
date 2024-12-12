import { useRef } from "react";
import { cn } from "@/lib/utils";
import { useSocket } from "@/hooks/useSocket";
import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "./Sidebar";
import { useEffect, useState } from "react";
import Header from "./Header";
import { Toaster } from "@/components/ui/Toaster";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import toast from "react-hot-toast";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";
import Loading from "@/components/ui/Loading";
import notification_sound from "../../assets/audio/ui-hello-bells-om-fx-1-00-03.mp3"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function AdminLayout() {
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [isOpen, setIsOpen] = useState(true);
  const [isMobile, setIsMobile] = useState(false);
  const checkOject = useRef({});

  useEffect(() => {
    if (!socket) return;

    let isFirstRender = true;
  
    const handleActiveRooms = (activeRooms) => {

      if (isFirstRender) { 
        isFirstRender = false;
        checkOject.current = activeRooms; 
        return;
      }

      Object.keys(activeRooms).forEach((roomId) => {
        const currentRoom = checkOject.current[roomId] || [];
        const newRoom = activeRooms[roomId] || [];
  
        if (newRoom.length !== currentRoom.length) {
          const lastElement = newRoom[newRoom.length - 1];
          if (lastElement.type === "user") {
            const notificationSound = new Audio(notification_sound);
            notificationSound.play();
            toast.custom((t) => (
              <div
                className={ `${t.visible ? "animate-enter" : "animate-leave"
                  } pointer-events-auto flex w-full max-w-[26rem] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-300 ease-in-out` }
              >
                <div className="w-0 flex-1 p-4 py-3">
                  <div className="flex items-center">
                    <div className="flex-shrink-0 pt-0.5">
                      <svg
                        className="h-10 w-10 text-blue-500"
                        xmlns="http://www.w3.org/2000/svg"
                        viewBox="0 0 20 20"
                        fill="currentColor"
                      >
                        <path
                          fillRule="evenodd"
                          d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-12a1 1 0 10-2 0v3a1 1 0 102 0V6zm-1 7a1 1 0 100-2 1 1 0 000 2z"
                          clipRule="evenodd"
                        />
                      </svg>
                    </div>
                    <div className="ml-3 flex-1">
                      Bạn có một tin nhắn mới !
                    </div>
                  </div>
                </div>
                <div className="flex border-l border-gray-200">
                  <button
                    onClick={ () => toast.dismiss(t.id) }
                    className="flex w-full items-center justify-center rounded-none rounded-r-lg border border-transparent p-4 text-sm font-medium text-primary-600 hover:text-primary-500 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                  >
                    Đóng
                  </button>
                </div>
              </div>
            ));
          }
        }
      });
  
      checkOject.current = activeRooms;
    };
  
    sendEvent("getActiveRooms", null, handleActiveRooms);
  
    const unsubscribeActiveRooms = subscribe("activeRooms", handleActiveRooms);
  
    return () => unsubscribeActiveRooms();
  }, [socket, subscribe, sendEvent]);

  useEffect(() => {
    const handleResize = () => {
      setIsMobile(window.innerWidth < 768);
    };

    handleResize();

    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, []);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const { data: profileFetched, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
  });

  useEffect(() => {
    if (profileFetched?.data.role && profileFetched?.data?.role?.name === "PATIENT") {
      navigate('/');
    }

    dispatch(setUserProfile(profileFetched?.data));
  }, [profileFetched, dispatch, navigate]);

  if (isMobile) {
    return (
      <div className="flex h-screen items-center justify-center bg-gray-100">
        <p className="text-lg font-bold text-gray-700">
          Giao diện không hỗ trợ trên thiết bị di động !
        </p>
      </div>
    );
  }

  return (
    <>
      { isLoading && <div className="absolute top-0 left-0 right-0 bottom-0 z-50"></div> }
      <Toaster />
      <Sidebar isOpen={ isOpen } onToggleOpen={ setIsOpen } />
      <main
        className={ cn(
          "min-h-[100vh] bg-[#F4F4F5] transition-[margin-left] duration-300 ease-in-out dark:bg-zinc-900 container-main",
          !isOpen ? "lg:ml-[90px]" : "lg:ml-72",
        ) }
      >
        <div>
          <Header isOpen={ isOpen } onToggleOpen={ setIsOpen } />
          <div className="px-4 pb-8 pt-5 sm:px-8">
            { isLoading ? <Loading ScaleMini={ true } /> : <Outlet /> }
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
