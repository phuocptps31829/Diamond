import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import { useState } from "react";
import Entypo from "@expo/vector-icons/Entypo";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Input from "../../components/ui/Input";

const SignUp = () => {
  const [gender, setGender] = useState("Nam");

  const handlePreviousTab = () => {
    router.back();
  };

  return (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <View className="w-full h-[40%] flex justify-center items-center bg-[#209bdd]">
        <Image
          source={require("../../assets/images/brandLogo.png")}
          className="w-[280px]"
          resizeMode="contain"
        ></Image>
      </View>
      <View className="flex-1 px-6 pt-8 bg-white">
        <Input placeholder="Nhập số điện thoại đăng ký" isInputPw={false} />
        <View className="flex-row mb-7 mt-2 space-x-20 ml-2">
          <TouchableOpacity
            onPress={() => setGender("Nam")}
            className="flex-row items-center space-x-3"
          >
            <FontAwesome
              name={gender === "Nam" ? "dot-circle-o" : "circle-o"}
              size={21}
              color={gender === "Nam" ? "#209bdd" : "#000"}
            />
            <Text className="ml-2 text-[14px]">Nam</Text>
          </TouchableOpacity>

          <TouchableOpacity
            onPress={() => setGender("Nữ")}
            className="flex-row items-center space-x-3"
          >
            <FontAwesome
              name={gender === "Nữ" ? "dot-circle-o" : "circle-o"}
              size={21}
              color={gender === "Nữ" ? "#209bdd" : "#000"}
            />
            <Text className="ml-2 text-[14px]">Nữ</Text>
          </TouchableOpacity>
        </View>
        <Input placeholder="Nhập mật khẩu" />
        <Input placeholder="Nhập lại mật khẩu" />
        <Input placeholder="Nhập mã giới thiệu (nếu có)" />
        <TouchableOpacity className="bg-[#209bdd] py-3 mt-4 rounded-md items-center">
          <Text className="text-white uppercase text-sm font-bold">
            Đăng ký
          </Text>
        </TouchableOpacity>
        <View className="pb-40">
          <Text className="text-center mt-8 text-[14px]">
            Bạn đã có tài khoản?
          </Text>
          <TouchableOpacity
            className="bg-[#EEEEEE] py-3 mt-4 rounded-md items-center"
            onPress={handlePreviousTab}
          >
            <Text className="uppercase text-sm font-bold ">Đăng nhập</Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignUp;
