import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";

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

const pairData = (data) => {
  const paired = [];
  for (let i = 0; i < data.length; i += 2) {
    paired.push(data.slice(i, i + 2));
  }
  return paired;
};

const OutstandingPackages = () => {
  const { width } = useWindowDimensions();

  return (
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
  );
};

export default OutstandingPackages;
