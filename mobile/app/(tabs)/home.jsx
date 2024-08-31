import { Text } from "react-native";
import {
  FlatList,
  View,
  ScrollView,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { LinearGradient } from "expo-linear-gradient";
import { useState, useRef, useEffect } from "react";
import Ionicons from "@expo/vector-icons/Ionicons";
import FontAwesome from "@expo/vector-icons/FontAwesome";

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
    icon: "https://img.icons8.com/?size=256w&id=23&format=png",
    title: "Đặt hẹn",
    colorOne: "#0E7999",
    colorTwo: "#9789CD",
  },
  {
    id: 2,
    icon: "https://img.icons8.com/?size=256w&id=11730&format=png",
    title: "Bệnh án điện tử",
    colorOne: "#93C4FC",
    colorTwo: "#D8C3FC",
  },
  {
    id: 3,
    icon: "https://img.icons8.com/?size=50&id=4952&format=png",
    title: "Hệ thống PK",
    colorOne: "#009BAC",
    colorTwo: "#007A96",
  },
  {
    id: 4,
    icon: "https://img.icons8.com/?size=256w&id=61864&format=png",
    title: "Bác sĩ AI",
    colorOne: "#FCA381",
    colorTwo: "#F7CF67",
  },
];

const services = [
  {
    id: 1,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    title: "Điện tim thường",
  },
  {
    id: 2,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    title: "Điện tim thường",
  },
  {
    id: 3,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    title: "Điện tim thường",
  },
  {
    id: 4,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    title: "Điện tim thường",
  },
  {
    id: 5,
    image: "https://ykhoadiamond.com/images/thumbs/goikham-dich-vu.jpg",
    title: "Điện tim thường",
  },
];

const packages = [
  {
    id: 1,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/00667e4b-3aca-4b5c-9b1f-d5b109ce3d26.jpg",
  },
  {
    id: 2,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/16a3ca9f-cc5a-4aa5-b49a-874581e4ced5.jpg",
  },
  {
    id: 3,
    image:
      "https://img.ykhoadiamond.com/uploads/package/27032024/c721bcb2-00e2-4f1e-814a-287182eda1a3.jpg",
  },
  {
    id: 4,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/3476a26c-5fa4-43af-8e44-2aaa237e0f98.jpg",
  },
  {
    id: 5,
    image:
      "https://img.ykhoadiamond.com/uploads/package/29032023/e57f31da-fe0f-4a4c-a08f-e4e5be283ce4.jpg",
  },
  {
    id: 6,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/2f3b7bea-caeb-4e42-a3e8-fa85007a9408.jpg",
  },
  {
    id: 7,
    image:
      "https://img.ykhoadiamond.com/uploads/package/26032023/027ee175-28c4-4144-9b7e-b7fbb19fbe99.jpg",
  },
  {
    id: 8,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/7ed89d96-2426-4b69-9120-2321106389de.jpg",
  },
];

const specialties = [
  {
    id: 1,
    image:
      "https://hoangnguyenpharma.com.vn/wp-content/uploads/2019/06/NOI-SOI-TAI-MUI-HONG-2.jpg",
    title: "Tai mũi họng",
  },
  {
    id: 2,
    image:
      "https://img.ykhoadiamond.com/uploads/packagecontent/21032023/b71b59e0-8ef9-4c69-8bc9-4586c54b70d6.jpg",
    title: "Răng hàm mặt",
  },
  {
    id: 3,
    image:
      "https://img.ykhoadiamond.com/uploads/packagecontent/21032023/ddf0c09d-b65d-4212-8651-99a56f4a0df3.jpg",
    title: "Phụ khoa",
  },
  {
    id: 4,
    image:
      "https://img.ykhoadiamond.com/uploads/packagecontent/21032023/04afb1c2-db84-4c69-8bd7-846e7904e7dc.jpg",
    title: "Mắt",
  },
  {
    id: 5,
    image:
      "https://img.ykhoadiamond.com/uploads/packagecontent/21032023/8eec0869-fbc1-4cbe-9780-8aa8135c5147.jpg",
    title: "Da liễu",
  },
  {
    id: 6,
    image:
      "https://img.ykhoadiamond.com/uploads/packagecontent/21032023/7847ec14-106b-407e-b5f6-ff2897900c0a.jpg",
    title: "Khác",
  },
];

const pairData = (data) => {
  const paired = [];
  for (let i = 0; i < data.length; i += 2) {
    paired.push(data.slice(i, i + 2));
  }
  return paired;
};

const Home = () => {
  const { width } = useWindowDimensions();
  const [currentIndex, setCurrentIndex] = useState(0);
  const flatListRef = useRef(null);
  const scrollIndex = useRef(0);
  const [showView, setShowView] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 300) {
      setShowView(true);
    } else {
      setShowView(false);
    }
  };

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
      <View className="absolute z-50">
        <View
          className={`fixed w-full px-4 bg-[#007BBB] py-4 pt-14  ${
            showView ? "block" : "hidden"
          }`}
        >
          <View className="w-full bg-white rounded-lg p-3 shadow-sm flex-row justify-between ">
            {buttons.map((item) => (
              <TouchableOpacity
                className="flex-columns items-center justify-center gap-2"
                onPress={() => {
                  console.log("Button pressed!");
                }}
              >
                <LinearGradient
                  colors={[item.colorOne, item.colorTwo]}
                  className="p-2 rounded-md"
                >
                  <Image
                    source={{
                      uri: item.icon,
                    }}
                    className="w-4 h-4"
                  />
                </LinearGradient>
                <Text className="font-semibold text-[12px]">{item.title}</Text>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      </View>
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-[#E8F2F7] relative"
        showsVerticalScrollIndicator={false}
      >
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
                  console.log("Button pressed!");
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
            <View className="w-full bg-white rounded-lg p-3 shadow-sm flex-row justify-between ">
              {buttons.map((item) => (
                <TouchableOpacity
                  className="flex-columns items-center justify-center gap-2"
                  onPress={() => {
                    console.log("Button pressed!");
                  }}
                >
                  <LinearGradient
                    colors={[item.colorOne, item.colorTwo]}
                    className="p-2 rounded-md"
                  >
                    <Image
                      source={{
                        uri: item.icon,
                      }}
                      className="w-4 h-4 "
                    />
                  </LinearGradient>
                  <Text className="font-semibold text-[12px]">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              ))}
            </View>
          </View>
        </View>
        <View className="bg-white py-4 pb-8">
          <View className="flex items-center justify-between flex-row px-4">
            <Text className="font-semibold text-[#929292]">
              Gói dịch vụ nổi bật
            </Text>
            <TouchableOpacity
              className="flex-columns items-center justify-center gap-2"
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Text className="text-blue-500 font-semibold underline">
                Tất cả
              </Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={services}
              className="mt-6"
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <TouchableOpacity
                  style={[{ width: width - 110 }]}
                  className="relative rounded-[15px] overflow-hidden"
                  onPress={() => {
                    console.log("Button pressed!");
                  }}
                >
                  <Image
                    source={{
                      uri: item.image,
                    }}
                    style={[{ height: 170, borderRadius: 15 }]}
                  />
                  <Text className="absolute bottom-0 left-0 right-0 bg-[#00000085] py-3 text-center text-white font-semibold">
                    {item.title}
                  </Text>
                </TouchableOpacity>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 20 }} />}
            />
          </View>
        </View>
        <View className="p-2 py-4">
          <Text className="font-semibold text-[#929292] px-2">Chuyên khoa</Text>
          <FlatList
            data={specialties}
            className="w-full mt-2"
            renderItem={({ item }) => (
              <TouchableOpacity
                className="flex-columngap-2 relative flex-1 m-2 rounded-[15px] overflow-hidden"
                onPress={() => {
                  console.log("Button pressed!");
                }}
              >
                <Image
                  source={{
                    uri: item.image,
                  }}
                  className="h-[110px] rounded-md"
                />
                <Text className="font-semibold absolute bottom-0 left-0 text-[12px] right-0 bg-[#006ca6b8] py-2 text-center text-white">
                  {item.title}
                </Text>
              </TouchableOpacity>
            )}
            numColumns={3}
          />
        </View>
        <View className="bg-[#006DA6] py-4 pb-8">
          <View className="flex items-center justify-between flex-row px-4">
            <Text className="font-semibold text-white">Gói khám nổi bật</Text>
            <TouchableOpacity
              className="flex-columns items-center justify-center gap-2"
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Text className="text-white font-semibold underline">Tất cả</Text>
            </TouchableOpacity>
          </View>
          <View>
            <FlatList
              data={pairData(packages)}
              className="mt-6"
              contentContainerStyle={{ paddingHorizontal: 16 }}
              renderItem={({ item }) => (
                <View className="flex gap-4">
                  {item.map((service) => (
                    <TouchableOpacity
                      style={[{ width: width - 130 }]}
                      className="rounded-[15px] overflow-hidden"
                      onPress={() => {
                        console.log("Button pressed!");
                      }}
                    >
                      <Image
                        source={{
                          uri: service.image,
                        }}
                        style={[{ height: 150, borderRadius: 15 }]}
                      />
                    </TouchableOpacity>
                  ))}
                </View>
              )}
              horizontal
              showsHorizontalScrollIndicator={false}
              ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
            />
          </View>
        </View>
        <View className="p-4">
          <View className="flex items-center justify-between flex-row">
            <Text className="font-semibold text-[#929292]">
              Tin tức - Sự kiện
            </Text>
            <TouchableOpacity
              className="flex-columns items-center justify-center gap-2"
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Text className="text-blue-500 font-semibold underline">
                Xem thêm
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => {
              console.log("Button pressed!");
            }}
          >
            <Image
              source={{
                uri: "https://img.ykhoadiamond.com/uploads/avatar/28082024/510ebb8e-8135-4ae0-af40-274311659b0f.jpg",
              }}
              className="w-full h-[200px] rounded-2xl mt-4"
            />
            <Text className="font-bold mt-2 text-[17px] leading-6">
              Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành
              Dịch
            </Text>
          </TouchableOpacity>
          {Array.from({ length: 9 }).map((_, index) => (
            <TouchableOpacity
              key={index}
              className="h-[100px] flex-row bg-white rounded-lg mt-6 shadow-sm"
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Image
                source={{
                  uri: "https://img.ykhoadiamond.com/uploads/avatar/16082024/6feaac8c-9ea1-4e0a-a336-79eb1c972fd4_M.jpg",
                }}
                className="w-[40%] h-full rounded-lg"
              />
              <View className="flex-1 p-2 justify-between">
                <Text className="font-semibold">
                  Ai Dễ Mắc Bệnh Sởi Nhất - Hiểu Để Phòng Ngừa Hiệu Quả !
                </Text>

                <View className="flex-row justify-between items-center">
                  <View className="flex-row gap-3 opacity-50">
                    <View className="flex-row items-center gap-1">
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=256w&id=85028&format=png",
                        }}
                        className="w-5 h-5"
                      />
                      <Text>13</Text>
                    </View>
                    <View className="flex-row items-center gap-1">
                      <Image
                        source={{
                          uri: "https://img.icons8.com/?size=256&id=143&format=png",
                        }}
                        className="w-4 h-4"
                      />
                      <Text>4</Text>
                    </View>
                  </View>
                  <TouchableOpacity
                    className="bg-[#007BBB] px-4 py-1 rounded-[99px]"
                    onPress={() => {
                      console.log("Button pressed!");
                    }}
                  >
                    <Text className="text-white">Chi tiết</Text>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableOpacity>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default Home;
