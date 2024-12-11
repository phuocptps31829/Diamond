import { useState } from "react";
import { Outlet, useNavigate } from "react-router-dom";
import { useSocket } from "@/hooks/useSocket";
import Header from "./header";
import Footer from "./Footer";
import { Toaster } from "@/components/ui/Toaster";
import { useDispatch } from "react-redux";
import { useEffect } from "react";
import { authApi } from "@/services/authApi";
import toast from "react-hot-toast";
import { setAccessToken, setUserProfile } from "@/redux/authSlice";
import Balloon from "@/components/ui/Balloon";
import BalloonMessage from "@/components/ui/BalloonMessage";
import Cookies from "js-cookie";
import { useQuery } from "@tanstack/react-query";
import notification_sound from "../../assets/audio/ui-hello-bells-om-fx-1-00-03.mp3"

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

export default function AppLayout() {
  const [showChat, setShowChat] = useState(false);
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    if (!socket) return;

    const unsubscribeAdmin = subscribe("newMessageAdmin", () => {
      const notificationSound = new Audio(notification_sound);
      notificationSound.play();
      toast.custom((t) => (
        <div
          className={ `${t.visible ? "animate-enter" : "animate-leave"
            } pointer-events-auto flex w-full max-w-[26rem] rounded-lg bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition duration-300 ease-in-out` }
        >
          <div className="w-0 flex-1 p-4 py-3 cursor-pointer" onClick={() => setShowChat(true)}>
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
              <div className="ml-3 flex-1 flex flex-col text-[14px]">
                <span>Bạn có một tin nhắn mới !</span>
                <span className="text-[11px] text-gray-600">Nhấn vào để xem tin nhắn.</span>
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
    });

    return () => {
      unsubscribeAdmin();
    };
  }, [subscribe, socket]);

  useEffect(() => {
    if (socket) {
      const userSocketID = localStorage.getItem("userSocketID");
      if (userSocketID) {
        sendEvent("joinRoom", userSocketID);
      }
    }
  }, [socket, sendEvent]);

  const { data: profileFetched } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
  });

  useEffect(() => {
    if (profileFetched?.data && profileFetched.data.role.name !== "PATIENT") {
      navigate("/admin");
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
      <div className="min-h-[300px]">
        <Outlet />
      </div>
      <Balloon />
      <BalloonMessage showChat={showChat} setShowChat={setShowChat} />
      <Footer />
    </>
  );
}
