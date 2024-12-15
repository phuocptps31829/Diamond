import { useState, useEffect } from "react";
import ChatComponent from "@/components/client/chat";
import { IoChatbubbles } from "react-icons/io5";
import { motion, AnimatePresence } from "framer-motion";
import chatZalo from "@/assets/images/chatZalo.png";
import chatSuport from "@/assets/images/chatSuport.png";
import { MdOutlineClose } from "react-icons/md";
import { Link } from "react-router-dom";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

const BalloonMessage = ({ showChat, setShowChat, setConnect }) => {
  const [showMenu, setShowMenu] = useState(false);

  useEffect(() => {
    const handleResize = () => {
      if (showChat && window.innerWidth < 640) {
        document.body.style.overflow = "hidden";
      } else {
        document.body.style.overflow = "auto";
      }
    };

    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
      document.body.style.overflow = "auto";
    };
  }, [showChat]);

  return (
    <TooltipProvider>
      {showChat ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 right-0 z-50 w-full sm:bottom-5 sm:right-5 sm:w-auto"
        >
          <ChatComponent setShowChat={setShowChat} showChat={showChat} setConnect={setConnect} />
        </motion.div>
      ) : (
        <div className="fixed bottom-10 right-5 flex gap-4">
          <AnimatePresence>
            {showMenu && (
              <>
                <motion.div
                  initial={{ scale: 0, y: 0 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 0 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.4,
                  }}
                  className="h-16 w-16"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Link
                        className="group relative block h-16 w-16 rounded-full"
                        to="https://zalo.me/0945554874"
                        target="_blank"
                      >
                        <img
                          src={chatZalo}
                          alt="chatZalo"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </Link>
                    </TooltipTrigger>
                    <TooltipContent>Tư vấn qua Zalo</TooltipContent>
                  </Tooltip>
                </motion.div>
                <motion.div
                  initial={{ scale: 0, y: 0 }}
                  animate={{ scale: 1, y: 0 }}
                  exit={{ scale: 0, y: 0 }}
                  transition={{
                    type: "tween",
                    ease: "easeInOut",
                    duration: 0.4,
                  }}
                  className="h-16 w-16"
                >
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <button
                        className="group relative h-16 w-16 rounded-full"
                        onClick={() => {
                          setShowChat(true);
                          setShowMenu(false);
                        }}
                      >
                        <img
                          src={chatSuport}
                          alt="chatSuport"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </button>
                    </TooltipTrigger>
                    <TooltipContent>Tư vấn tại đây</TooltipContent>
                  </Tooltip>
                </motion.div>
              </>
            )}
          </AnimatePresence>
          <button
            className="relative z-30 flex space-x-4"
            onClick={() => setShowMenu((prev) => !prev)}
          >
            <div className="social-button relative">
              <button className="group relative h-16 w-16 rounded-full">
                <div className="absolute left-0 top-0 h-full w-full rounded-full bg-primary-800"></div>
                <div className="icon relative z-10 flex h-full w-full items-center justify-center rounded-full">
                  {showMenu ? (
                    <MdOutlineClose className="h-8 w-8 text-white duration-300 group-hover:scale-110" />
                  ) : (
                    <IoChatbubbles className="h-8 w-8 text-white duration-300 group-hover:scale-110" />
                  )}
                </div>
              </button>
            </div>
            {!showMenu && <div className="fade-effect bg-primary-800"></div>}
          </button>
        </div>
      )}
    </TooltipProvider>
  );
};

export default BalloonMessage;
