import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";

const itemsBanner = [
  {
    id: 3,
    image:
      "https://img.ykhoadiamond.com/uploads/banner/15082023/7f94bf88-c3ad-403b-b959-9e46359c379f.jpg",
  },
  {
    id: 4,
    image:
      "https://img.ykhoadiamond.com/uploads/banner/02042024/debaff88-6cf7-4c2c-8803-f2c062c3e79c.jpg",
  },
  {
    id: 5,
    image:
      "https://img.ykhoadiamond.com/uploads/banner/15082023/17badcdb-03e6-4e81-9dc7-a1b1899cd8d7.jpg",
  },
  {
    id: 6,
    image:
      "https://img.ykhoadiamond.com/uploads/banner/13082024/21d829f7-5148-401c-b7f3-73aabfa38e3e.jpg",
  },
  {
    id: 7,
    image:
      "https://img.ykhoadiamond.com/uploads/banner/02042024/debaff88-6cf7-4c2c-8803-f2c062c3e79c.jpg",
  },
];

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

const Header = () => {
  const router = useRouter();
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollIndex = useRef(0);

  const onViewRef = useRef((viewableItems) => {
    if (viewableItems.changed[0]) {
      setCurrentIndex(viewableItems.changed[0].index);
    }
  });

  useEffect(() => {
    const intervalId = setInterval(() => {
      scrollIndex.current += 1;

      if (scrollIndex.current >= itemsBanner.length) {
        scrollIndex.current = 0;
      }

      flatListRef.current.scrollToIndex({
        index: scrollIndex.current,
        animated: true,
      });
    }, 3000);

    return () => clearInterval(intervalId);
  }, []);

  const viewConfigRef = useRef({ viewAreaCoveragePercentThreshold: 50 });
  return (
    <>
      <View className="bg-[#007BBB] w-screen pb-14 rounded-b-[30px] relative mb-12">
        <View className="mt-14 flex-row justify-between items-center w-full px-4">
          <View className="flex-row items-center gap-3">
            <Image
              source={{
                uri: "https://s.pro.vn/qNZX",
              }}
              className="w-[45px] h-[45px] rounded-full"
            />
            <View className="space-y-1">
              <Text className="text-white">Chào bạn</Text>
              <Text className="text-white font-semibold">Nguyen Nam</Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="bg-[#00000096] black w-8 h-8 rounded-full flex justify-center items-center"
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Text className="text-white">
                <Ionicons name="calendar" size={15} color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#00000096] black w-8 h-8 rounded-full flex justify-center items-center"
              onPress={() => {
                router.push("/Notification");
              }}
            >
              <Text className="text-white">
                <FontAwesome name="bell" size={15} color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="relative">
          <FlatList
            ref={flatListRef}
            data={itemsBanner}
            className="mt-6"
            renderItem={({ item }) => (
              <View style={[{ width: width }]} className="px-4">
                <Image
                  source={{
                    uri: item.image,
                  }}
                  style={[{ height: 170, borderRadius: 20 }]}
                />
              </View>
            )}
            horizontal
            showsHorizontalScrollIndicator={false}
            pagingEnabled
            onViewableItemsChanged={onViewRef.current}
            viewabilityConfig={viewConfigRef.current}
          />
          <View className="absolute flex-row gap-1 bottom-2 w-full justify-center items-center">
            {itemsBanner.map((_, index) => (
              <View
                key={index}
                className={`w-2 h-2 rounded-full ${
                  index === currentIndex ? "bg-[#007BBB]" : "bg-white"
                }`}
              />
            ))}
          </View>
        </View>
        <View className="absolute w-full px-4 -bottom-10 left-0 ">
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

export default Header;
