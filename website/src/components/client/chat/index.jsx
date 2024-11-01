import { useState, useEffect, useRef } from "react";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const ChatComponent = ({ setShowChat }) => {
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
    <div className="relative mx-auto flex h-screen w-full flex-col rounded-lg antialiased sm:max-h-[500px] md:max-w-[400px]">
      <div className="rounded-t-lg border-b border-gray-600 bg-primary-700">
        <div className="mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <img
              src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
              alt="Chat avatar"
              className="h-10 w-10 rounded-full"
            />
            <div>
              <h1 className="text-[15px] font-semibold text-white">
                Nhân viên tư vấn khách hàng
              </h1>
              <p className="text-[12px] text-green-400">Đang hoạt động</p>
            </div>
          </div>
          <button onClick={() => setShowChat(false)}>
            <IoCloseCircleOutline color="white" size={30} />
          </button>
        </div>
      </div>
      <div className="flex flex-auto flex-col rounded-b-lg bg-primary-900">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col">
          <div className="flex h-full flex-col overflow-x-auto">
            <div className="scrollable-services flex min-h-full flex-col py-7">
              {Array.from({ length: 4 }).map((_, index) => (
                <div className="grid grid-cols-12 gap-y-5" key={index}>
                  <div className="col-start-1 col-end-8 rounded-lg p-3">
                    <div className="flex flex-row items-center">
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                        <img
                          src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                          alt="Chat avatar"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="relative ml-3 rounded-xl bg-gray-700 px-3 py-2 text-sm shadow">
                        <div className="min-w-[200px] text-gray-200">
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
                      <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                        <img
                          src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                          alt="Chat avatar"
                          className="h-full w-full rounded-full object-cover"
                        />
                      </div>
                      <div className="relative mr-3 rounded-xl bg-primary-400 px-3 py-2 text-sm shadow">
                        <div className="min-w-[200px] text-white">
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
          <div className="flex h-16 w-full flex-row items-center border-t rounded-b-lg border-primary-200 bg-primary-900 p-4">
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
              <button className="flex flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 px-4 py-2 text-white hover:bg-primary-600">
                <span>Gửi</span>
                <IoIosSend className="ml-1" size={18} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
