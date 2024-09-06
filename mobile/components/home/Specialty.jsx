import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";

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

const Specialty = () => {
  return (
    <View className="p-2 py-4">
      <Text className="font-semibold text-[#929292] px-2">Chuyên khoa</Text>
      <FlatList
        data={specialties}
        className="w-full mt-2"
        renderItem={({ item }) => (
          <TouchableOpacity
            className="flex-column gap-2 relative flex-1 m-2 rounded-[15px] overflow-hidden"
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
  );
};

export default Specialty;
