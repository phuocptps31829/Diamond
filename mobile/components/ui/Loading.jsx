import { View, ActivityIndicator } from "react-native";

const Loading = ({ padding }) => {
  return (
    <View className={ `w-full h-full flex justify-center items-center absolute bg-transparent z-[9999] ${padding ? padding : ''}` }>
      <ActivityIndicator size="large" color="#006ca6" />
    </View>
  );
};

export default Loading;
