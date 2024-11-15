import React, { useState } from "react";
import { GoogleGenerativeAI } from "@google/generative-ai";
import {
    FlatList,
    Keyboard,
    KeyboardAvoidingView,
    Platform,
    Text,
    TextInput,
    TouchableOpacity,
    View,
} from "react-native";
import Animated, { Keyframe } from 'react-native-reanimated';
import Feather from "@expo/vector-icons/Feather";
import LoadingDots from "react-native-loading-dots";
import { useDispatch, useSelector } from "react-redux";
import { setMessages } from "../../store/chat/chatSlice";

const goToTop = new Keyframe({
    0: {
        transform: [{ translateY: '90%' }],
    },
    100: {
        transform: [{ translateY: '0' }],
    },
}).duration(200).delay(0);

const DoctorAI = () => {
    const [textInput, setTextInput] = useState("");
    const [isLoading, setIsLoading] = useState(false);

    const messages = useSelector((state) => state.chat.messages);
    const dispatch = useDispatch();

    const handleSendPrompt = async () => {
        if (!textInput) return;

        dispatch(setMessages({
            id: "US" + Date.now(),
            role: "user",
            content: textInput.trim()
        }));
        setTextInput("");
        Keyboard.dismiss();

        try {
            setIsLoading(true);

            const genAI = new GoogleGenerativeAI(process.env.EXPO_PUBLIC_GEMINI_API_KEY);
            const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

            const prompt = textInput;

            const result = await model.generateContent(prompt);

            dispatch(setMessages({
                id: "BOT" + Date.now(),
                role: "bot",
                content: result.response.text().trim()
            }));
        } catch (error) {
            console.log(error);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <KeyboardAvoidingView
            behavior={ Platform.OS === "ios" ? "padding" : "height" }
            className="flex flex-col h-full bg-white flex-1"
            keyboardVerticalOffset={ Platform.OS === 'ios' ? -14 : 0 }
        >
            <FlatList
                data={ messages }
                keyExtractor={ item => item.id }
                contentContainerStyle={ { gap: 20, paddingBottom: 60, flexDirection: 'column-reverse' } }
                className="pt-7 px-5"
                renderItem={ ({ item }) => item?.role === "bot" ? (
                    <Animated.View
                        className="px-6 py-4 self-start rounded-2xl max-w-[250px] bg-zinc-200 rounded-bl-none"
                        entering={ goToTop }
                    >
                        <Text className="text-base font-medium">{ item?.content }</Text>
                    </Animated.View>
                ) : (
                    <Animated.View
                        className="px-6 py-4 self-end float-right rounded-2xl max-w-[250px] bg-primary-500 rounded-br-none"
                        entering={ goToTop }
                    >
                        <Text className="text-base text-white font-medium">
                            { item?.content }
                        </Text>
                    </Animated.View>
                )
                }
                inverted={ true }
            />
            { isLoading && <View className="-translate-y-8 pl-4 pt-3 flex-row items-center gap-2">
                <Text className="font-medium text-zinc-500 text-[15px]">
                    Bác sĩ AI đang trả lời
                </Text>
                <View className="w-8">
                    <LoadingDots size={ 8 } colors={ ["#a1a1aa", "#a1a1aa", "#a1a1aa"] } bounceHeight={ 2 } dots={ 3 } />
                </View>
            </View> }
            <View className="pt-1 pb-5 border-t-[1px] flex flex-row gap-4 items-center border-primary-600 px-6 mb-4 bg-white">
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
