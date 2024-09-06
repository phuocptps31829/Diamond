import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";

const packages = [
  {
    id: 1,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/00667e4b-3aca-4b5c-9b1f-d5b109ce3d26.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 2,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/16a3ca9f-cc5a-4aa5-b49a-874581e4ced5.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 3,
    image:
      "https://img.ykhoadiamond.com/uploads/package/27032024/c721bcb2-00e2-4f1e-814a-287182eda1a3.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 4,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/3476a26c-5fa4-43af-8e44-2aaa237e0f98.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 5,
    image:
      "https://img.ykhoadiamond.com/uploads/package/29032023/e57f31da-fe0f-4a4c-a08f-e4e5be283ce4.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 6,
    image:
      "https://img.ykhoadiamond.com/uploads/package/28032023/2f3b7bea-caeb-4e42-a3e8-fa85007a9408.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
  {
    id: 7,
    image:
      "https://img.ykhoadiamond.com/uploads/package/26032023/027ee175-28c4-4144-9b7e-b7fbb19fbe99.jpg",
    type: "Tiêu chuẩn",
    name: "Gói khám sức khỏe tổng quát",
  },
];

const ListPackage = () => {
  return (
    <FlatList
      data={packages}
      className="w-full mt-2"
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index}
          className="flex-column max-w-[170px] relative bg-white flex-1 m-1 rounded-[15px] overflow-hidden"
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
          <View className="p-2 space-y-1">
            <Text className="text-black font-medium text-[12px]">
              {item.type}
            </Text>
            <Text
              className="text-black font-semibold"
              numberOfLines={1}
              ellipsizeMode="tail"
            >
              {item.name}
            </Text>
          </View>
        </TouchableOpacity>
      )}
      numColumns={2}
    />
  );
};

export default ListPackage;
