import { useEffect, useState } from "react";
import { useSocket } from "@/hooks/useSocket";
import { notificationsApi } from "@/services/notificationsApi";
import toast from "react-hot-toast";

const SOCKET_URL = import.meta.env.VITE_SOCKET_URL;
const userName = "Chinh";
const phoneNumber = "0999999999";

const UserChat = () => {
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [userName, setUserName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [messages, setMessages] = useState([]);
  const [value, setValue] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [notifications, setNotifications] = useState([]);

  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message, type, name) => {
      console.log("New message received:", message);
      setMessages((prevMessages) => [
        ...prevMessages,
        {
          type,
          name,
          message,
        },
      ]);
    };

    const handleOldMessages = (messages) => {
      console.log("Old messages received:", messages);
      setMessages(messages);
    };

    const fetchNotifications = async () => {
      try {
        const data = await notificationsApi.getNotificationsByUser();
        setNotifications(data);
        if (data.length) {
          toast.success("Bạn có thông báo mới");

        }
        console.log("Fetched notifications:", data);
      } catch (error) {
        console.error("Failed to fetch notifications:", error);
      }
    };
    const unsubscribeOldMessages = subscribe("oldRoomMessages", (data) =>
      handleOldMessages(data)
    );
    const testUpcoming = subscribe("notification", (data) => {
      console.log("This is new notification:", data);
      fetchNotifications();
    });
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
      testUpcoming();
    };
  }, [subscribe, socket]);

  const onSubmit = (event) => {
    event.preventDefault();
    setIsLoading(true);

    if (socket) {
      const userSocketID = localStorage.getItem("userSocketID");
      if (!userSocketID) {
        localStorage.setItem("userSocketID", socket.id);
      }
      sendEvent(
        "newMessageUser",
        { message: value, room: socket.id, name: userName, phoneNumber },
        () => {
          setIsLoading(false);
          setValue("");
        }
      );
    }
  };

  // Mỗi lần click vào nút chat sẽ tìm message cũ dựa trên socketID của user lưu trong localStorage
  const clickMeToGetOldMessages = () => {
    if (socket) {
      const userSocketID = localStorage.getItem("userSocketID");
      if (userSocketID) {
        console.log("Sending getOldRoomMessages event", userSocketID);
        sendEvent("getOldRoomMessages", userSocketID);
      }
    }
  };

  return (
    <div>
      <button onClick={ clickMeToGetOldMessages } className="bg-red-400">
        GET OLD messages
      </button>
      { !messages.length && (
        <div>
          <h1>Điền thông tin:</h1>
          <div>
            <label>Tên:</label>
            <input
              type="text"
              value={ userName }
              onChange={ (e) => setUserName(e.target.value) }
            />
          </div>
          <div>
            <label>SDT:</label>
            <input
              type="text"
              value={ phoneNumber }
              onChange={ (e) => setPhoneNumber(e.target.value) }
            />
          </div>
        </div>
      ) }
      <div>
        <ul>
          { messages.map((message, index) => (
            <li
              key={ index }
              className={
                message.type === "user" ? "text-red-500" : "text-blue-500"
              }
            >
              { (message.type === "user" ? message.name : "Admin") +
                ": " +
                message.message }
            </li>
          )) }
        </ul>
        <form onSubmit={ onSubmit }>
          <input
            className="border border-red-400"
            value={ value }
            onChange={ (e) => setValue(e.target.value) }
          />
          <button type="submit" disabled={ isLoading }>
            Gui
          </button>
        </form>
      </div>
    </div>
  );
};

export default UserChat;
