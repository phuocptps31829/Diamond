import { Text, View } from "react-native";

const TabsScreen = ({ icon, color, name }) => {
  return (
    <View
      className={`${
        name === "Trang chủ" ? "absulute -top-5 gap-2" : "gap-1"
      } flex justify-center items-center pt-5 `}
    >
      <View
        className={`${
          name === "Trang chủ"
            ? "w-[50px] h-[50px] rounded-full bg-[#007BBB] flex justify-center items-center"
            : ""
        } `}
      >
        {icon}
      </View>
      <Text
        className={`${
          name === "Trang chủ" ? "font-bold text-[12px]" : "text-[11px]"
        } `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

export default TabsScreen;
