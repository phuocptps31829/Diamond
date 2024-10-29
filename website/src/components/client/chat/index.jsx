import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdExitToApp, MdInsertEmoticon } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import chatBg from "@/assets/images/chat_bg.jpg";

const ChatComponent = () => {
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
    <div
      className="relative h-screen w-screen bg-cover bg-center flex justify-center items-center"
      style={{ backgroundImage: `url(${chatBg})` }}
    >
      <div className="absolute inset-0 bg-black opacity-50"></div>
      <div className="relative mx-auto flex h-screen max-h-[700px] w-full flex-col antialiased md:max-w-[700px]">
        <div className="border-b border-gray-600 bg-gray-900">
          <div className="mx-auto flex items-center justify-between px-4 py-3">
            <div className="flex items-center space-x-4">
              <img
                src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                alt="Chat avatar"
                className="h-12 w-12 rounded-full"
              />
              <div>
                <h1 className="text-md font-semibold text-white">
                  Nhân viên tư vấn khách hàng
                </h1>
                <p className="text-[13px] text-green-400">Đang hoạt động</p>
              </div>
            </div>
            <Link to="/">
              <MdExitToApp color="white" size={28} />
            </Link>
          </div>
        </div>
        <div className="flex flex-auto flex-col bg-gray-800">
          <div className="flex h-full flex-auto flex-shrink-0 flex-col py-4 px-3">
            <div className="mb-4 flex h-full flex-col overflow-x-auto">
              <div className="scrollable-services flex h-full min-h-[500px] flex-col gap-y-5 pr-2">
                {Array.from({ length: 14 }).map((_, index) => (
                  <div className="grid grid-cols-12 gap-y-5" key={index}>
                    <div className="col-start-1 col-end-8 rounded-lg p-3">
                      <div className="flex flex-row items-center">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                          <img
                            src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                            alt="Chat avatar"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                        <div className="relative ml-3 rounded-xl bg-gray-700 px-4 py-2 text-sm shadow">
                          <div className="min-w-[180px] text-gray-200">
                            Chào bạn! Bạn cần tư vấn gì ạ?
                          </div>
                          <div className="absolute -bottom-1 left-0 -mb-5 ml-2 text-[10px] text-gray-500">
                            10:30 30/11/2024
                          </div>
                        </div>
                      </div>
                    </div>
                    <div className="col-start-6 col-end-13 rounded-lg p-3">
                      <div className="flex flex-row-reverse items-center justify-start">
                        <div className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-full">
                          <img
                            src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                            alt="Chat avatar"
                            className="h-full w-full rounded-full object-cover"
                          />
                        </div>
                        <div className="relative mr-3 rounded-xl bg-indigo-600 px-4 py-2 text-sm shadow">
                          <div className="min-w-[180px] text-white">
                            Tôi cần tư vấn về dịch vụ của bạn ạ!
                          </div>
                          <div className="absolute -bottom-1 right-0 -mb-5 mr-2 text-[10px] text-gray-500">
                            10:30 30/11/2024
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="flex h-16 w-full flex-row items-center rounded-xl bg-gray-700 px-4">
              <div className="flex-grow">
                <div className="relative w-full">
                  <input
                    placeholder="Aa"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex h-10 w-full rounded-xl border bg-gray-600 pl-4 text-gray-200 focus:border-indigo-300 focus:outline-none"
                  />
                  <button
                    onClick={() => setShowPicker(!showPicker)}
                    className="absolute right-0 top-0 flex h-full w-12 items-center justify-center text-gray-400 hover:text-gray-200"
                  >
                    <MdInsertEmoticon size={22} />
                  </button>
                </div>
                {showPicker && (
                  <div
                    ref={pickerRef}
                    className="absolute bottom-[5rem] left-1/2 -translate-x-1/2 transform"
                  >
                    <Picker data={data} onEmojiSelect={handleEmojiSelect} />
                  </div>
                )}
              </div>
              <div className="ml-4">
                <button className="flex flex-shrink-0 items-center justify-center rounded-xl bg-primary-500 px-4 py-2 text-white hover:bg-primary-600">
                  <span>Gửi</span>
                  <IoIosSend className="ml-1" size={18} />
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
