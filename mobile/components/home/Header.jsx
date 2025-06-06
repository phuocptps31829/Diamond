import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
  StatusBar,
  ActivityIndicator,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef, useEffect } from "react";
import { useRouter } from "expo-router";
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import FontAwesome from "@expo/vector-icons/FontAwesome";
import { buttons } from "../../constants/nav-home-buttons";
import { itemsBanner } from "../../constants/items-banner";
import { useSelector } from "react-redux";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const Header = () => {
  const router = useRouter();
  const [isImageLoading, setIsImageLoading] = useState(true);
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollIndex = useRef(0);
  const profile = useSelector((state) => state.profile.profile);

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
      <StatusBar barStyle="light-content" />
      <View className="bg-[#007BBB] w-screen pb-14 rounded-b-[30px] relative mb-12">
        <View className="mt-14 flex-row justify-between items-center w-full px-4">
          <View className="flex-row items-center gap-3">
            <View className="relative w-[47px] h-[47px] bg-gray-300 rounded-full">
              <Image
                source={
                  profile.avatar
                    ? { uri: `${URL_IMAGE}/${profile.avatar}` }
                    : require("../../assets/fav.png")
                }
                className="rounded-full w-full h-full border border-[#FBCC50] bg-white"
                onLoad={() => setIsImageLoading(false)}
              />
              {isImageLoading && (
                <View className="bg-[#0000006c] rounded-full absolute w-full h-full top-0 flex justify-center items-center">
                  <ActivityIndicator size="small" color="white" />
                </View>
              )}
            </View>
            <View className="space-y-1">
              <Text className="text-white">Chào bạn</Text>
              <Text className="text-white font-semibold">
                { profile?.fullName }
              </Text>
            </View>
          </View>
          <View className="flex-row gap-2">
            <TouchableOpacity
              className="bg-[#00000096] black w-8 h-8 rounded-full flex justify-center items-center"
              onPress={ () => {
                router.push("/chat-advice");
              } }
            >
              <Text className="text-white">
                <FontAwesome6 name="headset" size={ 15 } color="white" />
              </Text>
            </TouchableOpacity>
            <TouchableOpacity
              className="bg-[#00000096] black w-8 h-8 rounded-full flex justify-center items-center"
              onPress={ () => {
                router.push("/notification");
              } }
            >
              <Text className="text-white">
                <FontAwesome name="bell" size={ 15 } color="white" />
              </Text>
            </TouchableOpacity>
          </View>
        </View>
        <View className="relative">
          <FlatList
            ref={ flatListRef }
            data={ itemsBanner }
            className="mt-6"
            renderItem={ ({ item, index }) => (
              <View style={ [{ width: width }] } className="px-4" key={ index }>
                <Image
                  source={ {
                    uri: item.image,
                  } }
                  style={ [{ height: 170, borderRadius: 20 }] }
                />
              </View>
            ) }
            horizontal
            showsHorizontalScrollIndicator={ false }
            pagingEnabled
            onViewableItemsChanged={ onViewRef.current }
            viewabilityConfig={ viewConfigRef.current }
          />
          <View className="absolute flex-row gap-1 bottom-2 w-full justify-center items-center">
            { itemsBanner.map((_, index) => (
              <View
                key={ index }
                className={ `w-2 h-2 rounded-full ${index === currentIndex ? "bg-[#007BBB]" : "bg-white"
                  }` }
              />
            )) }
          </View>
        </View>
        <View className="absolute w-full px-4 -bottom-10 left-0 ">
          <View className="w-full bg-white rounded-lg p-3 px-4 shadow-sm flex-row justify-between ">
            { buttons.map((item, index) => (
              <TouchableOpacity
                key={ index }
                className="flex-columns items-center justify-center gap-2"
                onPress={ () => router.push(item.navigateTo) }
              >
                <LinearGradient
                  colors={ [item.colorOne, item.colorTwo] }
                  className="rounded-md h-[32px] w-[35px] justify-center items-center"
                >
                  { item.icon }
                </LinearGradient>
                <Text className="font-semibold text-[11px]">{ item.title }</Text>
              </TouchableOpacity>
            )) }
          </View>
        </View>
      </View>
    </>
  );
};

export default Header;
