import { Text, View, Image, TouchableOpacity } from "react-native";

const News = () => {
  return (
    <View className="p-4">
      <View className="flex items-center justify-between flex-row">
        <Text className="font-semibold text-[#929292]">Tin tức - Sự kiện</Text>
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
          Bệnh Sởi: Diễn Biến Mạnh Vào Mùa Đông - Xuân, Dễ Bùng Phát Thành Dịch
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
  );
};

export default News;
