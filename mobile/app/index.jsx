import { router } from "expo-router";
import React from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";

const Index = () => {
  const handleSubmitLogin = () => {
    router.push("home");
  };

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <View className="w-full h-[40%] flex justify-center items-center bg-[#209bdd]">
        <Image
          source={{
            uri: "https://ykhoadiamond.com/images/icons/logo.png",
          }}
          className="w-[255px] h-[55px]"
        ></Image>
      </View>
      <View className="flex-1 px-6 pt-12 bg-white">
        <TextInput
          placeholder="Nhập số điện thoại hoặc email"
          placeholderTextColor="#5D5E60"
          className="bg-[#F8F9FD] rounded-md px-3 py-4 mb-4 text-[14px]"
        />
        <View className="relative">
          <TextInput
            placeholder="Nhập mật khẩu"
            placeholderTextColor="#5D5E60"
            secureTextEntry={true}
            className="bg-[#F8F9FD] rounded-md px-3 py-4 mb-4 text-[14px]"
          />
          <Image
            source={{
              uri: "https://images.vexels.com/media/users/3/140160/isolated/preview/2d4e09879b6f017f74ffaee0b0011c0a-eye-icon-by-vexels.png",
            }}
            className="absolute right-4 top-4 w-5 h-5 opacity-50"
          ></Image>
        </View>
        <TouchableOpacity
          className="bg-[#209bdd] py-3 mt-4 rounded-md items-center"
          onPress={handleSubmitLogin}
        >
          <Text className="text-white uppercase text-sm font-bold">
            Đăng nhập
          </Text>
        </TouchableOpacity>
        <View>
          <Text className="text-center mt-8 text-[14px]">
            Bạn chưa có tài khoản?
          </Text>
          <TouchableOpacity
            className="bg-[#EEEEEE] py-3 mt-4 rounded-md items-center"
            onPress={() => alert("Chuyển đến trang đăng ký")}
          >
            <Text className="uppercase text-sm font-bold ">Đăng ký</Text>
          </TouchableOpacity>
          <Text className="text-center mt-4 text-[14px]">Quên mật khẩu?</Text>
        </View>
      </View>
    </ScrollView>
  );
};

export default Index;
