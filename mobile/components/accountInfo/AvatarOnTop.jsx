import { View, Text, TouchableOpacity, Image } from "react-native";

const AvatarOnTop = () => {
  return (
    <View className="flex gap-1 justify-center items-center pt-5 border-b-[8px] border-[#F3F2F7] pb-4">
      <Image
        source={require("../../assets/fav.png")}
        className="w-[115px] h-[115px] rounded-full border-2 border-primary-500 mb-1 bg-white"
      />
      <TouchableOpacity
        className="flex-columns items-center justify-center gap-2"
        onPress={() => {
          console.log("Đổi ảnh đại diện");
        }}
      >
        <Text className="w-full text-right font-semibold">Đổi ảnh đại diện</Text>
      </TouchableOpacity>
    </View>
  );
};

export default AvatarOnTop;
