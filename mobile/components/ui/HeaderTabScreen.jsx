import { View, Text, Platform } from "react-native";

const HeaderTabScreen = ({ title }) => {
  return (
    <View
      className={`flex px-4 justify-between bg-primary-500 items-center flex-row pb-4 ${
        Platform.OS === "ios" ? "pt-16" : "pt-8"
      }`}
    >
      <Text className="text-white font-semibold w-full text-center text-[15px]">
        {title}
      </Text>
    </View>
  );
};

export default HeaderTabScreen;
