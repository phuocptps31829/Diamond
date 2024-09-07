import { Text, View, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import { LinearGradient } from "expo-linear-gradient";

import { buttons } from "../../constants/nav-home-buttons";

const HeaderScroll = ({ showView }) => {
  const router = useRouter();
  return (
    <>
      <View className="absolute z-50">
        <View
          className={`fixed w-full px-4 bg-[#007BBB] py-4 pt-14  ${
            showView ? "block" : "hidden"
          }`}
        >
          <View className="w-full bg-white rounded-lg p-3 px-4 shadow-sm flex-row justify-between ">
            {buttons.map((item, index) => (
              <TouchableOpacity
                key={index}
                className="flex-columns items-center justify-center gap-2"
                onPress={() => router.push(item.navigateTo)}
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
