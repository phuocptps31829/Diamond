import { View, ActivityIndicator } from "react-native";

const Loading = () => {
  return (
    <View className="w-full h-full flex justify-center items-center absolute bg-[#00000084] z-50">
      <ActivityIndicator size="large" color="white" />
    </View>
  );
};

export default Loading;
