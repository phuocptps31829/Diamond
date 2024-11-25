import { Text, View } from "react-native";


const TabsScreen = ({ icon, color, name }) => {
  return (
    <View
      className={ `${name === "Trang chủ" ? "-top-2 gap-2" : "gap-1 top-3"
        } flex justify-center items-center flex-col z-50 absulute` }
    >
      <View
        className={ `${name === "Trang chủ"
          ? "rounded-full w-[50px] h-[50px] bg-[#007BBB] flex justify-center items-center"
          : ""
          } ` }
      >
        { icon }
      </View>
      <Text
        className={ `${name === "Trang chủ" ? "font-bold text-[12px]" : "text-[10px] text-center"
          } w-16 text-center` }
        style={ { color: color } }
      >
        { name }
      </Text>
    </View>
  );
};

export default TabsScreen;