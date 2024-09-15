import { KeyboardAvoidingView, Platform, Text, TouchableOpacity, View } from "react-native";
import InputPassword from "../ui/InputPassword";

const ChangePassword = () => {
  return (
    <KeyboardAvoidingView
      keyboardVerticalOffset={ Platform.OS === 'ios' ? 100 : 0 }
      behavior={ Platform.OS === "ios" ? "padding" : "height" }
      className="flex-1 px-4 pt-6 bg-white"
    >
      <View className="flex-1">
        <InputPassword
          placeholder="Nhập mật khẩu hiện tại"
        />
        <InputPassword
          placeholder="Nhập mật khẩu mới"
        />
        <InputPassword
          placeholder="Xác nhận mật khẩu mới"
        />
      </View>
      <TouchableOpacity className="bg-primary-500 py-3 rounded-xl mb-10">
        <Text className="text-white text-center text-base uppercase font-semibold">
          Đổi mật khẩu
        </Text>
      </TouchableOpacity>
    </KeyboardAvoidingView>
  );
};

export default ChangePassword;
