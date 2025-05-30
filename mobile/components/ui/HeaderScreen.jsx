import { useRouter } from "expo-router";
import { Text, TouchableOpacity, View, Platform } from "react-native";
import Ionicons from "@expo/vector-icons/Ionicons";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";

const HeaderScreen = ({ title }) => {
  const router = useRouter();

  return (
    <View className={`${ Platform.OS === "ios" ? "pt-16" : "pt-8" } flex px-4 justify-between bg-primary-500 items-center flex-row pb-4`}>
      <TouchableOpacity onPress={() => router.back()}>
        <Ionicons name="chevron-back-outline" size={26} color="white" />
      </TouchableOpacity>
      <Text className="text-base text-white font-semibold max-w-[290px] ml-4" numberOfLines={1} ellipsizeMode="tail">{title}</Text>
      <View className="opacity-0">
        <MaterialIcons name="navigate-next" size={26} color="black" />
      </View>
    </View>
  );
};

export default HeaderScreen;
