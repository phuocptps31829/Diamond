import { View } from "react-native";
import InputPassword from "../../ui/InputPassword";

const ChangePassword = () => {
  return (
    <View className="flex-1 px-4 pt-6 bg-white">
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
  );
};

export default ChangePassword;
