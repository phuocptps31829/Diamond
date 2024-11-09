import {
  ScrollView,
  Text,
  View,
  Image,
  TextInput,
  TouchableOpacity,
} from "react-native";
import { router } from "expo-router";
import Input from "../../components/ui/Input";

const Forget = () => {
  const handleSwitchtabs = () => {
    router.back();
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
          source={require("../../assets/images/brandLogo.png")}
          className="w-[280px]"
          resizeMode="contain"
        ></Image>
      </View>
      <View className="mt-8">
        <Text className="text-center font-semibold text-xl">Quên mật khẩu</Text>
      </View>
      <View className="flex-1 px-6 pt-8 bg-white">
        <Input placeholder="Nhập số điện thoại" isInputPw={false} />
        <Input placeholder="Nhập mã OTP" disable={false} isInputPw={false} />
        <Input placeholder="Nhập mật khẩu mới" disable={false} />
        <Input placeholder="Nhập lại mật khẩu mới" disable={false} />
        <TouchableOpacity className="bg-[#209bdd] py-3 mt-4 rounded-md items-center">
          <Text className="text-white uppercase text-sm font-bold">
            Xác nhận
          </Text>
        </TouchableOpacity>
        <View className="flex flex-row items-center mt-8 justify-center space-x-1">
          <Text className="text-center text-[14px]">Quay lại màn hình</Text>
          <TouchableOpacity>
            <Text
              className="text-[14px] font-bold text-blue-500 underline"
              onPress={handleSwitchtabs}
            >
              Đăng nhập
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default Forget;
