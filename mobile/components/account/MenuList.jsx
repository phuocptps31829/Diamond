import { Text, View, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { menuItems } from "../../constants/menu-items";

const MenuList = () => {
  const router = useRouter();

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
            onPress={() => router.push(item.navigateTo)}
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
        </TouchableOpacity>
      </View>
    </>
  );
};

export default MenuList;
