import { View, Text } from "react-native";

const HeaderTabScreen = ({ title }) => {
  return (
    <View className="flex px-4 justify-between bg-primary-500 items-center flex-row pt-16 pb-4">
      <Text className="text-white font-semibold w-full text-center text-[15px]">
        {title}
      </Text>
    </View>
  );
};

export default HeaderTabScreen;
