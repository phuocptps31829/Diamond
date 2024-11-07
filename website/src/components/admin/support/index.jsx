import { useState, useEffect, useRef, useCallback } from "react";
import { useSocket } from "@/hooks/useSocket";
import { useDebounce } from "use-debounce";
import { Input } from "@/components/ui/Input";
import { motion } from "framer-motion";
import data from "@emoji-mart/data";
import Picker from "@emoji-mart/react";
import { MdInsertEmoticon } from "react-icons/md";
import { IoIosSend } from "react-icons/io";
import { IoSearchSharp } from "react-icons/io5";
import emptyUser from "@/assets/images/emptyUser.png";
import bg_chat from "@/assets/images/bg_chat.png";
const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;

const SupportComponent = () => {
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [messages, setMessages] = useState({});
  const [isLoading, setIsLoading] = useState(false);
  const [currentRoom, setCurrentRoom] = useState("");
  const [totalRooms, setTotalRooms] = useState([]);
  const [rooms, setRooms] = useState([]);
  const [showPicker, setShowPicker] = useState(false);
  const [message, setMessage] = useState("");
  const [filteredRooms, setFilteredRooms] = useState([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [debouncedSearchTerm] = useDebounce(searchTerm, 300);
  const pickerRef = useRef(null);

  const messagesEndRef = useRef(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (debouncedSearchTerm) {
      const results = rooms.filter((room) =>
        room.toLowerCase().includes(debouncedSearchTerm.toLowerCase())
      );
      setFilteredRooms(results);
    } else {
      setFilteredRooms(rooms);
    }
  }, [debouncedSearchTerm, rooms]);

  useEffect(() => {
    if (!socket) return;

    const handleActiveRooms = (activeRooms) => {
      const filteredRooms = activeRooms.filter((room) => room !== socket?.id);
      setRooms(filteredRooms);
      setTotalRooms(filteredRooms);
    };
    sendEvent("getActiveRooms", null, handleActiveRooms);

    const unsubscribeActiveRooms = subscribe("activeRooms", handleActiveRooms);

    return () => unsubscribeActiveRooms();
  }, [socket, subscribe, sendEvent]);

  const handleNewMessage = useCallback((data, type) => {
    setMessages((prevMessages) => {
      if (prevMessages[data.room]) {
        return {
          ...prevMessages,
          [data.room]: [
            ...prevMessages[data.room],
            { type, message: data.message, name: "Admin" },
          ],
        };
      }
      return {
        ...prevMessages,
        [data.room]: [{ type, message: data.message, name: "Admin" }],
      };
    });
  }, []);

  useEffect(() => {
    if (!socket) return;

    const unsubscribeUser = subscribe("newMessageUser", (data) =>
      handleNewMessage(data, "user")
    );
    const unsubscribeAdmin = subscribe("newMessageAdmin", (data) =>
      handleNewMessage(data, "admin")
    );

    return () => {
      unsubscribeUser();
      unsubscribeAdmin();
    };
  }, [subscribe, handleNewMessage, socket]);

  useEffect(() => {
    if (!socket) return;

    const handlePreviousMessages = (previousMessages) => {
      setMessages(previousMessages);
      setTimeout(() => {
        setIsLoading(false);
      }, 1000);
    };

    const unsubscribePreviousMessages = subscribe(
      "previousMessages",
      handlePreviousMessages
    );

    return () => unsubscribePreviousMessages();
  }, [socket, currentRoom, subscribe]);

  const joinRoom = (room) => {
    setIsLoading(true);
    setCurrentRoom(room);
    setMessages([]);
    socket.emit("joinRoom", room);
  };

  const onSubmit = (event) => {
    event.preventDefault();
    sendEvent(
      "newMessageAdmin",
      { message: message, room: currentRoom, name: "Admin" },
      () => {
        setIsLoading(false);
        setMessage("");
      }
    );
  };

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
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            disabled={totalRooms.length < 2}
          />
          <IoSearchSharp size={21} className="absolute right-7 text-black" />
        </div>
        <div className="h-full">
          <div className="scrollable-services min-h-full">
            {filteredRooms.length > 0 ? (
              filteredRooms.map((room, index) => (
                <div
                  className={`${
                    currentRoom === room ? "bg-primary-200" : ""
                  } flex cursor-pointer items-center px-4 py-3 hover:bg-primary-200`}
                  key={index}
                  onClick={() => joinRoom(room)}
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
                      {room}
                    </div>
                    <div className="text-[12px] text-green-500">Online</div>
                  </div>
                </div>
              ))
            ) : (
              <img
                src={emptyUser}
                alt="Empty user"
                className="mx-auto mt-10 w-40 opacity-90"
              />
            )}
          </div>
        </div>
      </div>
      <div className="flex flex-auto flex-col bg-white bg-gradient-to-r">
        <div className="flex h-full flex-auto flex-shrink-0 flex-col p-4">
          <div className="relative flex h-full flex-col overflow-x-auto">
            {isLoading ? (
              <div className="absolute flex h-full w-full items-center justify-center">
                <div className="h-10 w-10 animate-spin rounded-full border-4 border-gray-300 border-t-blue-500"></div>
              </div>
            ) : (
              <div className="scrollable-services flex min-h-full">
                <div className="flex h-full flex-col w-full">
                  <div className="flex-grow"></div>
                  {messages[currentRoom] ? (
                    messages[currentRoom].map((msg, index) => {
                      const isFirstInSequence =
                        index === 0 ||
                        messages[currentRoom][index - 1].type !== msg.type;
                      const isDifferentUser =
                        index === 0 ||
                        messages[currentRoom][index - 1].type !== msg.type;

                      return (
                        <div
                          className={`grid grid-cols-12 gap-y-5 ${isDifferentUser ? "mt-4" : ""}`}
                          key={index}
                        >
                          {msg.type === "admin" ? (
                            <div className="col-start-1 col-end-13 w-full rounded-lg py-[2px]">
                              <div className="flex flex-row-reverse items-center justify-start">
                                <div className="relative mr-3 max-w-[70%] break-words rounded-xl bg-primary-400 px-3 py-2 text-sm shadow">
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
                                  <div className="flex h-9 w-9 flex-shrink-0 items-center justify-center rounded-full">
                                    <img
                                      src="https://png.pngtree.com/png-vector/20190710/ourlarge/pngtree-user-vector-avatar-png-image_1541962.jpg"
                                      alt="Admin avatar"
                                      className="h-full w-full rounded-full border border-primary-800 object-cover"
                                    />
                                  </div>
                                )}
                                <div
                                  className={`relative ${isFirstInSequence ? "ml-3" : "ml-12"} max-w-[70%] break-words rounded-xl bg-gray-700 px-3 py-2 text-sm shadow`}
                                >
                                  <div className="text-gray-200">
                                    {msg.message}
                                  </div>
                                </div>
                              </div>
                            </div>
                          )}
                        </div>
                      );
                    })
                  ) : (
                    <div className="flex h-full items-center justify-center">
                      <img
                        src={bg_chat}
                        alt="Chat background"
                        className="w-60"
                      />
                    </div>
                  )}
                  <div ref={messagesEndRef}></div>
                  <div className="grid grid-cols-12">
                    <div className="h-4"></div>
                  </div>
                </div>
              </div>
            )}
          </div>
          {currentRoom.trim().length > 0 && (
            <div className="flex h-20 w-full flex-row items-center rounded-full bg-white px-4 shadow-[0_1px_3px_rgba(0,0,0,0.4)]">
              <div className="flex-grow">
                <div className="relative w-full">
                  <form onSubmit={onSubmit}>
                    <input
                      placeholder="Aa"
                      type="text"
                      value={message}
                      onChange={(e) => setMessage(e.target.value)}
                      className="flex h-10 w-full rounded-xl border-none pl-4 text-black focus:border-none focus:outline-none"
                    />
                  </form>
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
                <button
                  className={`${isLoading || !message.trim() ? "opacity-50" : ""} flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-gradient-to-r from-primary-500 to-primary-200 text-white`}
                  onClick={onSubmit}
                  disabled={isLoading || !message.trim()}
                >
                  <IoIosSend size={30} />
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </motion.div>
  );
};

export default SupportComponent;
