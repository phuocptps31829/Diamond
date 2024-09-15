import { View, Text, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const GoThereButton = ({ handleGetDirections }) => {
  return (
    <View className="absolute bottom-10 inset-x-0 w-full flex justify-center items-center">
      <Pressable
        onPress={handleGetDirections}
        className="bg-blue-500 w-[250px] p-3 rounded-md"
      >
        <View className="flex-row items-center gap-3 justify-center">
          <Text className="text-center text-white font-bold text-[14px]">
            Chỉ đường đến đấy
          </Text>
          <Entypo name="location" size={20} color="white" />
        </View>
      </Pressable>
    </View>
  );
};

export default GoThereButton;
