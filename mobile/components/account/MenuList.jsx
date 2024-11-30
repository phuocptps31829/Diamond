import { Text, View, TouchableOpacity, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import AntDesign from "@expo/vector-icons/AntDesign";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";
import { useRouter } from "expo-router";
import { menuItems } from "../../constants/menu-items";
import ToastUI from "../../components/ui/Toast";
import { useDispatch } from "react-redux";
import { clearProfile } from "../../store/profile/profileSlice";

const MenuList = () => {
  const dispatch = useDispatch();
  const router = useRouter();

  const handleLogout = async () => {
    dispatch(clearProfile());
    await AsyncStorage.removeItem("accessToken");
    await AsyncStorage.removeItem("refreshToken");
    await AsyncStorage.removeItem("userSocketID");
    ToastUI({
      type: "success",
      text1: "Đăng xuất thành công",
      text2: "Hẹn gặp lại bạn!",
    });
    router.replace("sign-in");
  };

  return (
    <>
      <View className="bg-white w-full mt-3 px-5">
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => router.push("/account/member")}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome6 name="ranking-star" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium py-6">
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
            onPress={() =>
              item.navigateTo.startsWith("/")
                ? router.push(item.navigateTo)
                : Linking.openURL(item.navigateTo)
            }
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
            handleLogout();
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
