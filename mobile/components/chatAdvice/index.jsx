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
} from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Feather from "@expo/vector-icons/Feather";
import MaterialCommunityIcons from "@expo/vector-icons/MaterialCommunityIcons";
import EmojiPicker from "rn-emoji-picker";
import { emojis } from "rn-emoji-picker/dist/data";
import empty_chat from "../../assets/images/support.png";

const ChatAdvice = () => {
  const [messages, setMessages] = useState(
    [
      // { id: 1, text: "Chào bạn, tôi có thể giúp gì cho bạn hôm nay?", sender: "John Doe" },
      // { id: 2, text: "Chào bác sĩ, tôi cảm thấy đau ở vùng bụng và muốn được tư vấn.", sender: "You" },
      // { id: 3, text: "Vậy bạn đã gặp phải triệu chứng này bao lâu rồi?", sender: "John Doe" },
      // { id: 4, text: "Tôi bị đau bụng đã khoảng 3 ngày, cảm giác rất khó chịu.", sender: "You" },
      // { id: 5, text: "Hiểu rồi, bạn có thấy buồn nôn hoặc sốt không?", sender: "John Doe" },
      // { id: 6, text: "Có, tôi cảm thấy hơi buồn nôn và sốt nhẹ.", sender: "You" },
      // { id: 7, text: "Cảm ơn bạn đã cung cấp thông tin. Có thể bạn đang gặp vấn đề về dạ dày hoặc viêm ruột. Tôi khuyên bạn nên đi khám để làm xét nghiệm.", sender: "John Doe" },
      // { id: 8, text: "Chúng tôi luôn sẵn sàn hỗ trợ bạn.", sender: "John Doe" },
      // { id: 9, text: "Cảm ơn bác sĩ, tôi sẽ sắp xếp thời gian để đi khám.", sender: "You" },
      // { id: 10, text: "Chúc bạn mau chóng bình phục. Nếu cần thêm bất kỳ sự hỗ trợ nào, đừng ngần ngại liên hệ với tôi.", sender: "John Doe" },
      // { id: 11, text: "Cảm ơn bác sĩ rất nhiều!", sender: "You" },
    ].reverse()
  );

  const [newMessage, setNewMessage] = useState("");
  const [isEmojiPickerVisible, setIsEmojiPickerVisible] = useState(false);
  const [recentEmojis, setRecentEmojis] = useState([]);

  const heightAnim = useState(new Animated.Value(0))[0];

  const renderItem = ({ item, index }) => {
    const showImage = index === 0 || messages[index - 1].sender !== item.sender;
    return (
      <View
        className={`${
          item.sender === "You" ? "self-end" : "self-start"
        } flex flex-row`}
      >
        {item.sender !== "You" && showImage && (
          <Image
            source={{
              uri: "https://thanglongosc.edu.vn/wp-content/uploads/2016/08/tuyen-nhan-vien-tu-van-xuat-khau-lao-dong.jpg",
            }}
            className="w-8 h-8 rounded-full mr-2 self-end mb-[10px]"
          />
        )}
        {item.sender !== "You" && !showImage && (
          <View className="w-8 h-8 rounded-full mr-2 bg-transparent"></View>
        )}
        <View
          className={`${
            index === 0 ? "mb-5" : "mb-2"
          } max-w-[80%] items-center p-3 rounded-xl ${
            item.sender === "You"
              ? "bg-[#D2EFFD] border border-[#BCD0DB]"
              : "bg-[#FEFEFE] border border-[#D4D9DD]"
          }`}
        >
          <Text className="text-base text-[14px]">{item.text}</Text>
        </View>
      </View>
    );
  };

  const sendMessage = () => {
    if (newMessage.trim() !== "") {
      const newItem = {
        id: messages.length + 1,
        text: newMessage,
        sender: "You",
        timestamp: "12:00 PM",
      };
      setMessages([newItem, ...messages]);
      setNewMessage("");
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
      {messages.length === 0 ? (
        <View className="flex flex-col items-center justify-center flex-1">
          <Image source={empty_chat} className="w-40 h-40 opacity-50" />
          <Text className="text-base text-[14px] text-black mt-4">
            Bắt đầu cuộc trò chuyện để được tư vấn.
          </Text>
        </View>
      ) : (
        <FlatList
          data={messages}
          keyExtractor={(item) => item.id.toString()}
          renderItem={renderItem}
          className="px-3"
          inverted
        />
      )}
      <View
        className={`${
          isEmojiPickerVisible ? "pb-4" : "pb-7"
        } flex-row items-center px-3 pt-4 bg-transparent bg-white`}
      >
        <View className="flex-1 relative">
          <TextInput
            className="w-full h-11 px-4 py-2 rounded-full border border-gray-300 bg-white"
            value={newMessage}
            onChangeText={setNewMessage}
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
        {newMessage.trim() === "" ? (
          <TouchableOpacity
            className="bg-[#5DBAEE] rounded-full ml-3 h-11 w-11 flex justify-center items-center"
            onPress={console.log("Voice message")}
          >
            <FontAwesome5 name="microphone" size={20} color="white" />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            className="bg-[#1ba4f3] rounded-full ml-3 h-11 w-11 flex justify-center items-center"
            onPress={sendMessage}
          >
            <Feather name="send" size={22} color="white" />
          </TouchableOpacity>
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
