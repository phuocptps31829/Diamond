import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

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

const OutstandingServices = () => {
  const { width } = useWindowDimensions();

  return (
    <>
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
    </>
  );
};

export default OutstandingServices;
