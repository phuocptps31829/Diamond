import React from 'react';
import { TextInput, View } from 'react-native';

const Input = ({ placeholder, iconEnd }) => {
    return (
        <View className="relative">
            <TextInput
                placeholder={ placeholder }
                placeholderTextColor="#5D5E60"
                secureTextEntry={ true }
                className="bg-[#F8F9FD] rounded-md px-5 py-5 mb-4 text-[15px]"
            />
            <View className="absolute inline-block right-4 top-1/2 -translate-y-1/2 opacity-50 z-10">
                { iconEnd && iconEnd }
            </View>
        </View>
    );
};

export default Input;