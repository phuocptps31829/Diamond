import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const menuItems = [
  {
    icon: <FontAwesome name="history" size={24} color="#FBCC50" />,
    text: "Lịch sử khám",
    onPress: () => console.log("Lịch sử khám pressed!"),
  },
  {
    icon: <FontAwesome5 name="file-medical-alt" size={24} color="#FBCC50" />,
    text: "Bệnh án điện tử",
    onPress: () => console.log("Bệnh án điện tử pressed!"),
  },
  {
    icon: <FontAwesome6 name="house-medical-flag" size={24} color="#FBCC50" />,
    text: "Trung tâm hỗ trợ",
    onPress: () => console.log("Trung tâm hỗ trợ pressed!"),
  },
  {
    icon: <Fontisto name="unlocked" size={24} color="#FBCC50" />,
    text: "Thay đổi mật khẩu",
    onPress: () => console.log("Thay đổi mật khẩu pressed!"),
  },
  {
    icon: <MaterialIcons name="policy" size={28} color="#FBCC50" />,
    text: "Chính sách quyền riêng tư",
    onPress: () => console.log("Chính sách quyền riêng tư pressed!"),
  },
  {
    icon: <FontAwesome5 name="user-friends" size={20} color="#FBCC50" />,
    text: "Giới thiệu bạn bè",
    onPress: () => console.log("Giới thiệu bạn bè pressed!"),
  },
];

const MenuList = () => {
  return (
    <>
      <View className="bg-white w-full mt-3 px-5 py-5">
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome6 name="ranking-star" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Thành viên Đồng
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
      </View>
      <View className="bg-white w-full my-3 px-5 divide-y divide-gray-100">
        {menuItems.map((item, index) => (
          <TouchableOpacity
            className="flex-row items-center justify-between py-4"
            key={index}
            onPress={item.onPress}
          >
            <View className="flex-row items-center gap-2">
              <View className="w-[30px] block">{item.icon}</View>
              <Text className="text-black text-[15px] font-medium">
                {item.text}
              </Text>
            </View>
            <AntDesign name="right" size={17} color="black" />
          </TouchableOpacity>
        ))}
      </View>
      <View className="bg-white w-full px-5 py-5">
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <SimpleLineIcons name="logout" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Đăng xuất
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MenuList;
