import { Text, View, Image, TouchableOpacity } from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const buttons = [
  {
    id: 1,
    icon: <AntDesign name="calendar" size={15} color="white" />,
    title: "Đặt hẹn",
    colorOne: "#0E7999",
    colorTwo: "#9789CD",
  },
  {
    id: 2,
    icon: <FontAwesome6 name="hospital-user" size={15} color="white" />,
    title: "Bệnh án điện tử",
    colorOne: "#93C4FC",
    colorTwo: "#D8C3FC",
  },
  {
    id: 3,
    icon: <FontAwesome5 name="hospital" size={15} color="white" />,
    title: "Hệ thống PK",
    colorOne: "#009BAC",
    colorTwo: "#007A96",
  },
  {
    id: 4,
    icon: <FontAwesome5 name="robot" size={15} color="white" />,
    title: "Bác sĩ AI",
    colorOne: "#FCA381",
    colorTwo: "#F7CF67",
  },
];
const HeaderScroll = ({ showView }) => {
  return (
    <>
      <View className="absolute z-50">
        <View
          className={`fixed w-full px-4 bg-[#007BBB] py-4 pt-14  ${
            showView ? "block" : "hidden"
          }`}
        >
          <View className="w-full bg-white rounded-lg p-3 px-4 shadow-sm flex-row justify-between ">
            {buttons.map((item) => (
              <TouchableOpacity
                className="flex-columns items-center justify-center gap-2"
                onPress={() => {
                  console.log("Button pressed!");
                }}
              >
                <LinearGradient
                  colors={[item.colorOne, item.colorTwo]}
                  className="rounded-md h-[32px] w-[35px] justify-center items-center"
                >
                  {item.icon}
                </LinearGradient>
                <Text className="font-semibold text-[11px]">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
    </>
  );
};

export default HeaderScroll;
