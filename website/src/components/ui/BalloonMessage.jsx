import { useState } from "react";
import ChatComponent from "@/components/client/chat";
import { IoChatbubbleEllipses } from "react-icons/io5";
import { motion } from "framer-motion";

const BalloonMessage = () => {
  const [showChat, setShowChat] = useState(false);

  return (
    <>
      {showChat ? (
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          animate={{ opacity: 1, y: 0 }}
          exit={{ opacity: 0, y: 50 }}
          transition={{ duration: 0.5 }}
          className="fixed bottom-0 right-0 z-50 sm:bottom-10 sm:right-5"
        >
          <ChatComponent setShowChat={setShowChat} showChat={showChat} />
        </motion.div>
      ) : (
        <button
          className="fixed bottom-10 right-5 flex space-x-4 z-30"
          onClick={() => setShowChat((prev) => !prev)}
        >
          <div className="social-button relative">
            <button className="group relative h-16 w-16 rounded-full">
              <div className="floater absolute left-0 top-0 h-full w-full rounded-full bg-primary-800"></div>
              <div className="icon relative z-10 flex h-full w-full items-center justify-center rounded-full">
                <IoChatbubbleEllipses className="h-8 w-8 text-white duration-300 group-hover:scale-125" />
              </div>
            </button>
          </div>
        </button>
      )}
    </>
  );
};

export default BalloonMessage;
