import { View, ActivityIndicator } from "react-native";

const Loading = ({ padding }) => {
  return (
    <View className={ `w-full h-full flex justify-center items-center absolute bg-[#0000002e] z-[9999] ${padding ? padding : ''}` }>
      <ActivityIndicator size="large" color="#007BBB" />
    </View>
  );
};

export default Loading;
