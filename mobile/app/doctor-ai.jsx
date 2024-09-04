import React, { useState } from 'react';
import { ScrollView, Text, TextInput, TouchableOpacity, View } from 'react-native';
import Feather from '@expo/vector-icons/Feather';

const DoctorAI = () => {
    const [textInput, setTextInput] = useState('');
    const [messages, setMessages] = useState([{ role: "user", content: "hello" },
    { role: "bot", content: "Lo cc" }
    ]);

    const handleSendPrompt = async () => {
        try {
            const res = await fetch('https://api.openai.com/v1/chat/completions', {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${process.env.EXPO_PUBLIC_OPEN_API_KEY}`
                },
                body: JSON.stringify({
                    messages: [{ role: "system", content: textInput }],
                    model: "gpt-3.5-turbo-0125",
                })
            });

            const data = await res.json();

            console.log(data);
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <View className="flex flex-col h-full">
            <ScrollView className="px-5 pt-7 flex gap-4" automaticallyAdjustKeyboardInsets={ true }>
                { messages.map((m, i) => m.role === "user"
                    ? <View className="px-5 py-6 self-start rounded-2xl max-w-[250px] bg-zinc-200 rounded-bl-none">
                        <Text className="text-base font-medium">{ m.content }</Text>
                    </View>
                    : <View className="px-5 py-6 self-end float-right rounded-2xl max-w-[250px] bg-primary-500 rounded-br-none">
                        <Text className="text-base text-white font-medium">{ m.content }</Text>
                    </View>) }
            </ScrollView>
            <View className="pt-1 pb-5 border-t-[1px] flex flex-row gap-4 items-center border-primary-600 px-6 mb-8">
                <TextInput
                    placeholderTextColor="gray"
                    placeholder='Nhập nội dung cần tư vấn'
                    className="bg-zinc-200 py-4 px-5 text-[15px] rounded-2xl flex-1"
                    value={ textInput }
                    onChangeText={ (text) => setTextInput(text) }
                />
                { textInput && <TouchableOpacity onPress={ handleSendPrompt }>
                    <Feather name="send" size={ 26 } color="black" />
                </TouchableOpacity> }
            </View>
        </View>
    );
};

export default DoctorAI;