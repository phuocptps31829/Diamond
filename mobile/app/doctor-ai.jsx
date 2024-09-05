import React, { useRef, useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
  FlatList,
  Keyboard,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from "react-native";
import Feather from "@expo/vector-icons/Feather";

const DoctorAI = () => {
  const [textInput, setTextInput] = useState("");
  const [messages, setMessages] = useState([]);

  const flatListRef = useRef(null);

  const scrollToEnd = () => {
    if (flatListRef.current) {
      flatListRef.current.scrollToEnd({ animated: true });
    }
  };

  const handleSendPrompt = async () => {
    if (!textInput) return;

    setMessages(prev => [...prev, {
      id: "US" + Date.now(),
      role: "user",
      content: textInput.trim()
    }]);
    setTextInput("");
    Keyboard.dismiss();

    try {
      const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
      const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

      const prompt = textInput;

      const result = await model.generateContent(prompt);

      setMessages(prev => [...prev, {
        id: "BOT" + Date.now(),
        role: "bot",
        content: result.response.text().trim()
      }]);

    } catch (error) {
      console.log(error);
    }
  };

  return (
    <KeyboardAvoidingView
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
      className="flex flex-col h-full bg-white flex-1"
      keyboardVerticalOffset={ Platform.OS === 'ios' ? 76 : 0 }
    >
      <FlatList
        ref={ flatListRef }
        data={ messages }
        keyExtractor={ item => item.id }
        contentContainerStyle={ { gap: 20, paddingBottom: 60 } }
        className="pt-7 px-5"
        renderItem={ ({ item }) => item?.role === "bot" ? (
          <View className="px-6 py-4 self-start rounded-2xl max-w-[250px] bg-zinc-200 rounded-bl-none">
            <Text className="text-base font-medium">{ item?.content }</Text>
          </View>
        ) : (
          <View className="px-6 py-4 self-end float-right rounded-2xl max-w-[250px] bg-primary-500 rounded-br-none">
            <Text className="text-base text-white font-medium">
              { item?.content }
            </Text>
          </View>
        )
        }
        onContentSizeChange={ scrollToEnd }
        onLayout={ scrollToEnd }
      />
      <View className="pt-1 pb-5 border-t-[1px] flex flex-row gap-4 items-center border-primary-600 px-6 mb-8 bg-white">
        <TextInput
          placeholderTextColor="gray"
          placeholder="Nhập nội dung cần tư vấn"
          className="bg-zinc-200 py-4 px-5 text-[15px] rounded-2xl flex-1"
          value={ textInput }
          onChangeText={ (text) => setTextInput(text) }
        />
        { textInput && (
          <TouchableOpacity onPress={ handleSendPrompt }>
            <Feather name="send" size={ 26 } color="black" />
          </TouchableOpacity>
        ) }
      </View>
    </KeyboardAvoidingView>
  );
};

export default DoctorAI;
