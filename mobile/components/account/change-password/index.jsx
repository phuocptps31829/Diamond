import { View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";
import Input from "../../ui/Input";

const ChangePassword = () => {
  return (
    <View className="flex-1 px-4 pt-6 bg-white">
      <Input
        placeholder="Nhập mật khẩu hiện tại"
        iconEnd={<Entypo name="eye" size={24} color="black" />}
      />
      <Input
        placeholder="Nhập mật khẩu mới"
        iconEnd={<Entypo name="eye" size={24} color="black" />}
      />
      <Input
        placeholder="Xác nhận mật khẩu mới"
        iconEnd={<Entypo name="eye" size={24} color="black" />}
      />
    </View>
  );
};

export default ChangePassword;
