import React, { useState } from "react";
import { TextInput, TouchableOpacity, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const Input = ({ placeholder, disable = true, isInputPw = true }) => {
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View className="relative">
      <TextInput
        placeholder={placeholder}
        placeholderTextColor="#5D5E60"
        secureTextEntry={isInputPw && !isShowPassword}
        className="bg-[#F8F9FD] rounded-md px-3 py-4 mb-4 text-[14px]"
        editable={disable}
      />
      {isInputPw && (
        <TouchableOpacity
          onPress={() => setIsShowPassword(!isShowPassword)}
          className="absolute block right-4 top-1/4 -translate-y-1/2 opacity-50 z-10"
        >
          {isShowPassword ? (
            <Entypo name="eye-with-line" size={22} color="black" />
          ) : (
            <Entypo name="eye" size={22} color="black" />
          )}
        </TouchableOpacity>
      )}
    </View>
  );
};

export default Input;
