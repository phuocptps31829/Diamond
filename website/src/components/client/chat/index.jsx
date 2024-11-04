import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/hooks/useSocket"; // Thêm hook để sử dụng socket
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import { IoIosSend } from "react-icons/io";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const userName = "Chinh";

const options = [
  "Tôi cần hỗ trợ khác",
  "Tôi muốn biết thêm về dịch vụ",
  "Tôi muốn hủy lịch hẹn",
  "Tôi cần tư vấn về gói khám sức khỏe",
];

const ChatComponent = ({ setShowChat }) => {
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [showPicker, setShowPicker] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [sendFirstMessage, setSendFirstMessage] = useState(true);
  const pickerRef = useRef(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

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

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message, type, name) => {
      setMessages((prevMessages) => [...prevMessages, { type, name, message }]);
    };

    const unsubscribeUser = subscribe("newMessageUser", (data) =>
      handleNewMessage(data.message, "user", data.name)
    );
    const unsubscribeAdmin = subscribe("newMessageAdmin", (data) =>
      handleNewMessage(data.message, "admin", data.name)
    );

    return () => {
      unsubscribeUser();
      unsubscribeAdmin();
    };
  }, [subscribe, socket]);

  const handleOptionClick = (option) => {
    sendEvent(
      "newMessageUser",
      { message: option, room: socket.id, name: userName },
      () => {
        setTimeout(() => {
          sendEvent("newMessageAdmin", {
            message:
              "Cảm ơn bạn đã liên hệ, chúng tôi sẽ sớm phản hồi lại cho bạn!",
            room: socket.id,
            name: "Admin",
          });
        }, 500);
      }
    );
    setIsFirstMessage(false);
    setSendFirstMessage(false);
  };

  const onSubmit = (event) => {
    setIsFirstMessage(false);
    event.preventDefault();
    if (!message.trim()) return;
    setIsLoading(true);

    if (socket) {
      sendEvent(
        "newMessageUser",
        { message, room: socket.id, name: userName },
        () => {
          setIsLoading(false);
          setMessage("");

          if (sendFirstMessage) {
            setTimeout(() => {
              sendEvent("newMessageAdmin", {
                message:
                  "Cảm ơn bạn đã liên hệ, chúng tôi sẽ sớm phản hồi lại cho bạn!",
                room: socket.id,
                name: "Admin",
              });
              setSendFirstMessage(false);
            }, 500);
          }
        }
      );
    }
  };

  return (
    <div className="relative flex h-screen w-full flex-col antialiased sm:h-[500px] sm:w-[400px] sm:rounded-lg">
      <div className="border-b border-gray-600 bg-primary-700 sm:rounded-t-lg">
        <div className="mx-auto flex items-center justify-between px-4 py-3">
          <div className="flex items-center space-x-4">
            <img
              src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
              alt="Chat avatar"
              className="h-11 w-11 rounded-full"
            />
            <div>
              <h1 className="text-[16px] font-semibold text-white">
                Nhân viên tư vấn khách hàng
              </h1>
              <p className="text-[13px] text-green-400">Đang hoạt động</p>
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
            <div className="scrollable-services min-h-full">
              <div className="flex h-full flex-col">
                <div className="flex-grow"></div>
                {messages.map((msg, index) => {
                  console.log("msg", msg);
                  const isFirstInSequence =
                    index === 0 || messages[index - 1].type !== msg.type;
                  const isDifferentUser =
                    index === 0 || messages[index - 1].type !== msg.type;

                  return (
                    <div
                      className={`grid grid-cols-12 gap-y-5 ${isDifferentUser ? "mt-4" : ""}`}
                      key={index}
                    >
                      {msg.type === "user" ? (
                        <div className="col-start-1 col-end-13 w-full rounded-lg py-[2px]">
                          <div className="flex flex-row-reverse items-center justify-start">
                            <div className="relative mr-3 max-w-[70%] break-words rounded-xl bg-primary-400 px-3 py-2 text-sm shadow">
                              <div className="text-white">{msg.message}</div>
                            </div>
                          </div>
                        </div>
                      ) : (
                        <div className="col-start-1 col-end-13 w-full rounded-lg px-2 py-[2px]">
                          <div className="flex items-center">
                            {isFirstInSequence && (
                              <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                                <img
                                  src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                                  alt="Admin avatar"
                                  className="h-full w-full rounded-full object-cover"
                                />
                              </div>
                            )}
                            <div
                              className={`relative ${isFirstInSequence ? "ml-3" : "ml-12"} max-w-[70%] break-words rounded-xl bg-gray-700 px-3 py-2 text-sm shadow`}
                            >
                              <div className="text-gray-200">{msg.message}</div>
                            </div>
                          </div>
                        </div>
                      )}
                    </div>
                  );
                })}

                {isFirstMessage && (
                  <div className="mb-4 grid grid-cols-12 gap-y-3">
                    {options.map((option, index) => (
                      <div
                        key={index}
                        className="col-start-1 col-end-13 w-full rounded-lg"
                      >
                        <div className="flex flex-row-reverse items-center justify-start">
                          <div className="relative mr-3 max-w-[70%] break-words rounded-xl bg-[#cccccc53] py-1 text-sm shadow">
                            <button
                              onClick={() => handleOptionClick(option)}
                              className="rounded px-4 py-2 text-white"
                            >
                              {option}
                            </button>
                          </div>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <div ref={messagesEndRef}></div>
                <div className="grid grid-cols-12">
                  <div className="h-4"></div>
                </div>
              </div>
            </div>
          </div>
          <div className="flex h-16 w-full flex-row items-center border-t border-primary-200 bg-primary-900 p-4 sm:rounded-b-lg">
            <div className="flex-grow">
              <div className="relative w-full overflow-hidden rounded-xl border-white">
                <form onSubmit={onSubmit}>
                  <input
                    placeholder="Aa"
                    type="text"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    className="flex h-10 w-full border border-none bg-white pl-4 pr-12 text-black focus:outline-none"
                  />
                </form>
                <button
                  onClick={() => setShowPicker(!showPicker)}
                  className="absolute right-0 top-0 flex h-full w-12 items-center justify-center bg-white text-gray-400 hover:text-gray-200"
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
              <button
                onClick={onSubmit}
                disabled={isLoading || !message.trim()}
                className={`${isLoading || !message.trim() ? "opacity-50" : "hover:bg-primary-600"} flex min-h-10 min-w-12 flex-shrink-0 items-center justify-center rounded-lg bg-primary-500 text-white`}
              >
                <IoIosSend size={30} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ChatComponent;
