import { useState, useEffect, useRef } from "react";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";

const SupportComponent = () => {
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const pickerRef = useRef(null);

  const handleEmojiSelect = (emoji) => {
    setMessage((prev) => prev + emoji.native);
  };

  const handleClickOutside = (event) => {
    if (pickerRef.current && !pickerRef.current.contains(event.target)) {
      setShowPicker(false);
    }
  };

  useEffect(() => {
    if (showPicker) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [showPicker]);

  return (
    <motion.div
      variants={{
        hidden: { opacity: 1, scale: 0 },
        visible: {
          opacity: 1,
          scale: 1,
          transition: {
            delayChildren: 0.5,
            staggerChildren: 2,
            duration: 0.5,
          },
        },
      }}
      initial="hidden"
      animate="visible"
      className="flex h-screen max-h-[550px] max-w-[1500px] overflow-hidden rounded-2xl border-2 border-primary-200 text-gray-800 antialiased shadow-md"
    >
      <div className="flex w-[300px] flex-shrink-0 flex-col bg-gradient-to-t from-[#d6eff9] to-[#bdecff] text-[#F1F7FF]">
        <div className="relative flex h-20 items-center justify-center border-b-2 border-primary-200">
          <Input
            type="text"
            placeholder="Tìm kiếm người dùng..."
            className="h-10 w-[90%] rounded-full bg-white px-4 text-black"
          />
          <IoSearchSharp size={21} className="absolute right-7 text-black" />
        </div>
        <div className="h-full">
          <div className="scrollable-services min-h-full">
            {Array.from({ length: 12 }).map((_, index) => (
              <div
                className="flex cursor-pointer items-center px-4 py-3 hover:bg-primary-200"
                key={index}
              >
                <div className="relative">
                  <img
                    src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                    alt="Chat avatar"
                    className="h-9 w-9 rounded-full border border-primary-800"
                  />
                  <div className="absolute bottom-0 right-0 h-3 w-3 rounded-full border-2 bg-green-400"></div>
                </div>
                <div className="ml-3">
                  <div className="text-[14px] font-semibold text-black">
                    Võ Thanh Phương
                  </div>
                  <div className="text-[12px] text-green-500">Online</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      <div className="flex flex-auto flex-col bg-white bg-gradient-to-r">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col p-4">
          <div className="mb-4 flex h-full flex-col overflow-x-auto">
            <div className="scrollable-services flex min-h-full flex-col py-7">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="grid grid-cols-12 gap-y-5" key={index}>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full border border-primary-800">
                        <img
                          src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                          alt="Chat avatar"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="relative ml-3 rounded-xl bg-primary-100 px-3 py-2 text-sm text-black shadow">
                        <div className="min-w-[200px]">
                          Chào bạn! Bạn cần tư vấn gì ạ?
                        </div>
                        <div className="absolute -bottom-1 left-0 -mb-5 ml-2 text-[10px] text-gray-700">
                          10:30 30/11/2024
                        </div>
                      </div>
                    </div>
                  </div>
                  <div className="col-start-6 col-end-13 rounded-lg p-3">
                    <div className="flex flex-row-reverse items-center justify-start">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                        <img
                          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                          alt="Chat avatar"
                          className="h-full w-full rounded-full border border-primary-800 object-cover"
                        />
                      </div>
                      <div className="relative mr-3 rounded-xl bg-primary-600 px-3 py-2 text-sm shadow">
                        <div className="min-w-[200px] text-white">
                          Tôi cần tư vấn về dịch vụ của bạn ạ!
                        </div>
                        <div className="absolute -bottom-1 right-0 -mb-5 mr-2 text-[10px] text-gray-700">
                          10:30 30/11/2024
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
          <div className="flex h-20 w-full flex-row items-center rounded-full bg-white px-4 shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
            <div className="flex-grow">
              <div className="relative w-full">
                <input
                  placeholder="Aa"
                  type="text"
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  className="flex h-10 w-full rounded-xl border-none pl-4 text-black focus:border-none focus:outline-none"
                />
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-600 hover:text-gray-900"
                >
                  <MdInsertEmoticon size={30} />
                </button>
                {showPicker && (
                  <div ref={pickerRef} className="absolute bottom-12 right-0">
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
            </div>
            <div className="ml-2">
              <button className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-200 text-white">
                <IoIosSend size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export default SupportComponent;
