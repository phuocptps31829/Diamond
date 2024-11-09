import { useState, useEffect, useRef } from "react";
import { useSocket } from "@/hooks/useSocket"; // Thêm hook để sử dụng socket
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { Input } from "@/components/ui/Input";
import { MdInsertEmoticon } from "react-icons/md";
import { IoCloseCircleOutline } from "react-icons/io5";
import LogoNoLetters from "@/assets/images/LogoNoLetters.png";
import { GrFormNextLink } from "react-icons/gr";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const options = [
  "Tôi muốn đặt lịch hẹn",
  "Tôi muốn biết thêm về dịch vụ",
  "Tôi muốn hủy lịch hẹn",
  "Tôi cần tư vấn về gói khám sức khỏe",
];

const ChatComponent = ({ setShowChat }) => {
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [messages, setMessages] = useState([]);
  const [message, setMessage] = useState("");
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [showPicker, setShowPicker] = useState(false);
  const [isFirstMessage, setIsFirstMessage] = useState(true);
  const [sendFirstMessage, setSendFirstMessage] = useState(true);
  const [chatted, setChatted] = useState(false);
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

    const handleOldMessages = (messages) => {
      setMessages(messages);
    };

    const unsubscribeOldMessages = subscribe("oldRoomMessages", (data) =>
      handleOldMessages(data)
    );
    const unsubscribeUser = subscribe("newMessageUser", (data) =>
      handleNewMessage(data.message, "user", data.name)
    );
    const unsubscribeAdmin = subscribe("newMessageAdmin", (data) =>
      handleNewMessage(data.message, "admin", data.name)
    );

    return () => {
      unsubscribeUser();
      unsubscribeAdmin();
      unsubscribeOldMessages();
    };
  }, [subscribe, socket]);

  const handleOptionClick = (option) => {
    sendEvent(
      "newMessageUser",
      { message: option, room: socket.id, name: userName, phoneNumber },
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
    console.log("sendFirstMessage", sendFirstMessage)
    if (socket) {
      sendEvent(
        "newMessageUser",
        { message, room: socket.id, name: userName, phoneNumber },
        () => {
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

  const clickMeToGetOldMessages = () => {
    if (userName.trim() === "" || phoneNumber.trim() === "") {
      return;
    }
    if (socket) {
      localStorage.setItem("userSocketID", socket.id);
    }
    setChatted(true);
  };

  useEffect(() => {
    if (socket) {
      const userSocketID = localStorage.getItem("userSocketID");
      if (userSocketID) {
        sendEvent("getOldRoomMessages", userSocketID);
        setChatted(true);
        setIsFirstMessage(false);
        setSendFirstMessage(false);
      }
    }
  }, [socket, sendEvent]);

  return (
    <div className="container-chat-shadow relative flex h-screen w-full flex-col bg-white antialiased sm:h-[500px] sm:w-[400px] sm:rounded-[20px]">
      {chatted ? (
        <>
          <div className="rounded-t-[20px] bg-white">
            <div className="mx-auto flex items-center justify-between px-4 py-3">
              <div className="flex items-center space-x-4">
                <img
                  src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                  alt="Chat avatar"
                  className="h-11 w-11 rounded-full border-2 border-primary-700"
                />
                <div>
                  <h1 className="text-[16px] font-semibold text-black">
                    Nhân viên tư vấn khách hàng
                  </h1>
                  <p className="text-[13px] text-green-400">Đang hoạt động</p>
                </div>
              </div>
              <button onClick={() => setShowChat(false)}>
                <IoCloseCircleOutline color="black" size={30} />
              </button>
            </div>
          </div>
          <div className="flex flex-auto flex-col bg-[#F9F9FB] sm:rounded-b-[20px]">
            <div className="flex h-full flex-auto flex-shrink-0 flex-col sm:rounded-b-[20px]">
              <div className="flex h-full flex-col overflow-x-auto">
                <div className="scrollable-services min-h-full">
                  <div className="flex h-full flex-col">
                    <div className="flex-grow"></div>
                    {messages.map((msg, index) => {
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
                                <div className="relative mr-3 max-w-[75%] break-words rounded-[20px] rounded-br-none bg-[#2D87F3] px-4 py-3 text-sm shadow">
                                  <div className="text-white">
                                    {msg.message}
                                  </div>
                                </div>
                              </div>
                            </div>
                          ) : (
                            <div className="col-start-1 col-end-13 w-full rounded-lg px-2 py-[2px]">
                              <div className="flex items-center">
                                {isFirstInSequence && (
                                  <div className="flex h-9 w-9 flex-shrink-0 items-center self-end rounded-full">
                                    <img
                                      src="https://img.lovepik.com/free-png/20211116/lovepik-customer-service-personnel-icons-png-image_400960942_wh1200.png"
                                      alt="Admin avatar"
                                      className="h-full w-full rounded-full object-cover"
                                    />
                                  </div>
                                )}
                                <div
                                  className={`relative ${isFirstInSequence ? "ml-3" : "ml-12"} chat-bubble-shadow max-w-[75%] break-words rounded-[20px] rounded-bl-none bg-white px-4 py-3 text-sm`}
                                >
                                  <div className="text-black">
                                    {msg.message}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })}

                    {isFirstMessage && (
                      <div className="grid grid-cols-12 gap-y-3">
                        {options.map((option, index) => (
                          <div
                            key={index}
                            className="col-start-1 col-end-13 w-full rounded-lg"
                          >
                            <div className="flex flex-row-reverse items-center justify-start">
                              <div className="relative mr-3 max-w-[75%] break-words rounded-[20px] rounded-br-none bg-[#2D87F3] text-sm shadow">
                                <button
                                  onClick={() => handleOptionClick(option)}
                                  className="rounded px-4 py-3 text-white"
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
              <div className="mb-4 flex h-16 w-full flex-row items-center p-4 sm:rounded-b-[20px]">
                <div className="flex-grow">
                  <div className="relative w-full rounded-xl border-white">
                    <form onSubmit={onSubmit}>
                      <input
                        placeholder="Gõ tin nhắn..."
                        type="text"
                        value={message}
                        onChange={(e) => setMessage(e.target.value)}
                        className="chat-message-shadow-input flex h-12 w-full rounded-xl border border-none bg-white pl-4 pr-12 text-black focus:outline-none"
                      />
                    </form>
                    <button
                      onClick={() => setShowPicker(!showPicker)}
                      className="absolute right-0 top-0 flex h-full w-12 items-center justify-center rounded-r-xl bg-white text-gray-900"
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
              </div>
            </div>
          </div>
        </>
      ) : (
        <div className="h-full rounded-[20px] bg-[#F9F9FB] p-5">
          <div className="flex w-full justify-end">
            <button onClick={() => setShowChat(false)}>
              <IoCloseCircleOutline color="black" size={30} />
            </button>
          </div>
          <img src={LogoNoLetters} alt="" className="w-16" />
          <h2 className="mb-1 mt-2 text-2xl">Chào bạn 👋</h2>
          <p className="text-[15px] font-normal tracking-wide text-gray-600">
            Bạn đang tìm kiếm bác sĩ và dịch vụ y tế phù hợp? Chat với chúng tôi
            để được hỗ trợ nhanh chóng.
          </p>
          <div className="chat-register-shadow mt-4 flex flex-col gap-4 rounded-2xl bg-white p-6">
            <span className="text-[14px] text-red-500">
              Nhập thông tin của bạn để bắt đầu chat *
            </span>
            <Input
              placeholder="Họ và tên"
              className="border border-gray-400 p-3 py-5"
              value={userName}
              onChange={(e) => setUserName(e.target.value)}
            />
            <Input
              placeholder="Số điện thoại"
              className="border border-gray-400 p-3 py-5"
              value={phoneNumber}
              onChange={(e) => setPhoneNumber(e.target.value)}
            />
            <button
              className={`${
                userName.trim() === "" || phoneNumber.trim() === ""
                  ? "text-gray-400 opacity-90"
                  : "text-primary-600 hover:text-primary-900"
              } mt-4 flex w-fit items-center gap-2 self-end bg-transparent`}
              disabled={userName.trim() === "" || phoneNumber.trim() === ""}
              onClick={() => {
                clickMeToGetOldMessages();
              }}
            >
              Bắt đầu chat <GrFormNextLink size={25} />
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ChatComponent;
