import React, { useState } from "react";
import { TextInput, TouchableOpacity, View, Text } from "react-native";
import { Controller } from "react-hook-form";
import Entypo from "@expo/vector-icons/Entypo";

const Input = ({ placeholder, control, name, isInputPw = true, error }) => {
  if (!control) return null;
  const [isShowPassword, setIsShowPassword] = useState(false);

  return (
    <View className="relative mb-4">
      <Controller
        control={control}
        name={name}
        render={({ field: { value, onChange } }) => (
          <TextInput
            value={value}
            onChangeText={onChange}
            placeholder={placeholder}
            placeholderTextColor="#5D5E60"
            secureTextEntry={isInputPw && !isShowPassword}
            className="bg-[#F8F9FD] rounded-md px-3 py-4 text-[14px]"
          />
        )}
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
      {error && <Text className="text-red-500 text-[12px] mt-1">{error}</Text>}
    </View>
  );
};

export default Input;
