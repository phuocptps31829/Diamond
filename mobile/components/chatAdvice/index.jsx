import React, { useState, useEffect } from "react";
import {
  View,
  FlatList,
  Text,
  TextInput,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
  Animated,
  Image,
  ActivityIndicator
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EmojiPicker from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import empty_chat from "../../assets/images/support.png";
import { useSocket } from "../../hooks/useSocket";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { setConnectFirstTime } from "../../store/chat/chatSlice";
import { useDispatch, useSelector } from "react-redux";

const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;

const ChatAdvice = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const connectFirstTime = useSelector((state) => state.chat.connectFirstTime);
  const [messages, setMessages] = useState(
    []
  );
  const [loadingSendFirstMessage, setLoadingSendFirstMessage] = useState(false);
  const [loading, setLoading] = useState(true);
  const { sendEvent, subscribe, socket } = useSocket(SOCKET_URL);
  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);

  const heightAnim = useState(new Animated.Value(0))[0];
  const [startChat, setStartChat] = useState(false);
  
  useEffect(() => {
    if (!socket) return;

    const handleNewMessage = (message, type, name) => {
      setMessages((prevMessages) => [
        { type, name, message },
        ...prevMessages,
      ]);
    };

    const handleOldMessages = (messages) => {
      setMessages(messages.reverse());
      setLoading(false);
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

  useEffect(() => {
    const initializeSocket = async () => {
      if (socket) {
        const userSocketID = await AsyncStorage.getItem("userSocketID");
        if (userSocketID) {
          sendEvent("joinRoom", userSocketID);
          sendEvent("getOldRoomMessages", userSocketID);
        } else {
          setLoading(false);
          setStartChat(true);
        }
      }
    };
    initializeSocket();
  }, [socket, sendEvent]);

  const sendMessageFirst = async () => {
    if (socket) {
      const userSocketID = await AsyncStorage.getItem("userSocketID");
      sendEvent(
        "newMessageUser",
        { message: "Bắt đầu", room: userSocketID ? userSocketID : socket.id, name: profile.fullName || "", phoneNumber: profile.phoneNumber || "" },
        () => {
          setTimeout(() => {
            setStartChat(false);
            setLoadingSendFirstMessage(false);
            sendEvent("newMessageAdmin", {
              message:
                "Cảm ơn bạn đã liên hệ, chúng tôi sẽ sớm phản hồi lại cho bạn!",
              room: socket.id,
              name: "Admin",
            });
          }, 500);
        }
      );
    }
  }

  const clickStartChat = async () => {
    if (socket) {
      setLoadingSendFirstMessage(true);
      await AsyncStorage.setItem("userSocketID", socket.id);
      dispatch(setConnectFirstTime(!connectFirstTime));
      sendMessageFirst();
    }
  };

  const renderItem = ({ item, index }) => {
    const showImage = index === 0 || messages[index - 1].type !== item.type;
    return (
      <View
        className={`${
          item.type === "user" ? "self-end" : "self-start"
        } ${ index === 0 ? " mb-5" : "mb-2" } flex flex-row`}
      >
        {item.type !== "user" && showImage && (
          <Image
            source={{
              uri: "https://thanglongosc.edu.vn/wp-content/uploads/2016/08/tuyen-nhan-vien-tu-van-xuat-khau-lao-dong.jpg",
            }}
            className="w-8 h-8 rounded-full mr-2 self-end"
          />
        )}
        {item.type !== "user" && !showImage && (
          <View className="w-8 h-8 rounded-full mr-2 bg-transparent"></View>
        )}
        <View
          className={` max-w-[80%] items-center p-3 rounded-xl ${
            item.type === "user"
              ? "bg-[#D2EFFD] border border-[#BCD0DB]"
              : "bg-[#FEFEFE] border border-[#D4D9DD]"
          }`}
        >
          <Text className="text-base text-[14px]">{item.message}</Text>
        </View>
      </View>
    );
  };

  const sendMessage = async () => {
    if (newMessage.trim() === "") return;
    const userSocketID = await AsyncStorage.getItem("userSocketID");
    if (socket) {
      sendEvent(
        "newMessageUser",
        { message: newMessage, room: userSocketID ? userSocketID : socket.id, name: profile.fullName || "", phoneNumber: profile.phoneNumber || "" },
        () => {
          setNewMessage("");
          setIsEmojiPickerVisible(false);
        }
      );
    }
  };
  
  const handleEmojiSelect = (emoji) => {
    setNewMessage((prevMessage) => prevMessage + emoji.emoji);
  };

  useEffect(() => {
    Animated.timing(heightAnim, {
      toValue: isEmojiPickerVisible ? 1000 : 0,
      duration: 200,
    }).start();
  }, [isEmojiPickerVisible]);

  return (
      <KeyboardAvoidingView
        behavior={Platform.OS === "ios" ? "padding" : "height"}
        className="flex flex-col h-full flex-1 bg-[#E4E8F3]"
        keyboardVerticalOffset={Platform.OS === "ios" ? -14 : 0}
      > 
        {loading ? (
          <View className="flex flex-col items-center justify-center flex-1">
            <ActivityIndicator size="large" color="#000" />
          </View>
          ) : (
          messages.length === 0 ? (
            <View className="flex flex-col items-center justify-center flex-1">
              <Image source={empty_chat} className="w-40 h-40 opacity-50" />
              <Text className="text-base text-[14px] text-black mt-4">
                Bắt đầu cuộc trò chuyện để được tư vấn.
              </Text>
            </View>
          ) : (
            <FlatList
              data={messages}
              keyExtractor={(_, index) => index.toString()}
              renderItem={renderItem}
              className="px-3"
              inverted
            />
          )
        )}
        <View
          className={`${
            isEmojiPickerVisible ? "pb-4" : "pb-7"
          } flex-row items-center px-3 pt-4 bg-transparent bg-white`}
        >

          {startChat ? (
            <View className="w-full">
              <TouchableOpacity 
                onPress={() => clickStartChat()} 
                className="w-full bg-primary-300 py-4 rounded-lg"
              >
                {loadingSendFirstMessage ? (
                  <ActivityIndicator size="small" color="#fff" />
                ) : (
                  <Text className="text-white text-center font-semibold text-[17px]">Bắt đầu trò chuyện</Text>
                )}
              </TouchableOpacity>
            </View>
          ) : (
            <>
              <View className="flex-1 relative">
                <TextInput
                  className="w-full h-11 px-4 py-2 rounded-full border border-gray-300 bg-white"
                  value={newMessage}
                  onChangeText={(text) => setNewMessage(text)}
                  placeholder="Gõ tin nhắn..."
                  returnKeyType="send"
                  onSubmitEditing={sendMessage}
                  onFocus={() => {
                    setIsEmojiPickerVisible(false);
                  }}
                />
                <TouchableOpacity
                  className="absolute top-[21%] right-3"
                  onPress={() => setIsEmojiPickerVisible(!isEmojiPickerVisible)}
                >
                  <MaterialCommunityIcons
                    name="emoticon-angry-outline"
                    size={25}
                    color="gray"
                  />
                </TouchableOpacity>
              </View>
              {newMessage.trim() !== "" && (
                <TouchableOpacity
                  className="bg-[#1ba4f3] rounded-full ml-3 h-11 w-11 flex justify-center items-center"
                  onPress={sendMessage}
                >
                  <Feather name="send" size={22} color="white" />
                </TouchableOpacity>
            )}
            </>
          )}
        
        </View>

        <Animated.View
          style={{
            height: heightAnim,
            overflow: "hidden",
          }}
          className="bg-white transition-all duration-300 ease-in-out"
        >
          {isEmojiPickerVisible && (
            <EmojiPicker
              emojis={emojis}
              recent={recentEmojis}
              onSelect={handleEmojiSelect}
              onChangeRecent={setRecentEmojis}
              darkMode={false}
              perLine={9}
              toFocus={true}
            />
          )}
        </Animated.View>
      </KeyboardAvoidingView>
  );
};

export default ChatAdvice;
