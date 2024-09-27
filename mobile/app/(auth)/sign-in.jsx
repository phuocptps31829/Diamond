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

const SignIn = () => {
  const handleSwitchtabs = ({ tab }) => {
    router.push(tab);
  };

  const handleSubmitLogin = () => {
    router.replace("home");
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

      <View className="flex-1 px-6 pt-12 bg-white">
        <Input placeholder="Nhập số điện thoại đăng nhập" isInputPw={false} />
        <Input placeholder="Nhập mật khẩu" />

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
            onPress={() =>
              handleSwitchtabs({
                tab: "sign-up",
              })
            }
          >
            <Text className="uppercase text-sm font-bold ">Đăng ký</Text>
          </TouchableOpacity>
          <TouchableOpacity
            onPress={() =>
              handleSwitchtabs({
                tab: "forget",
              })
            }
          >
            <Text className="text-center mt-4 text-[14px] underline text-blue-500">
              Quên mật khẩu?
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </ScrollView>
  );
};

export default SignIn;
