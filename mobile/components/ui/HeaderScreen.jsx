import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View } from "react-native";

import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderScreen = ({ title }) => {
  const router = useRouter();

  return (
    <View className="flex px-4 justify-between bg-primary-500 items-center flex-row pt-16 pb-4">
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={26} color="white" />
      </TouchableOpacity>
      <Text className="text-[15px] text-white font-semibold">{title}</Text>
      <View className="opacity-0">
        <MaterialIcons name="navigate-next" size={28} color="black" />
      </View>
    </View>
  );
};

export default HeaderScreen;
