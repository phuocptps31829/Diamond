import { Text, View, Image, TouchableOpacity } from "react-native";
import { useRouter } from "expo-router";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const News = ({ listNews }) => {
  const router = useRouter();

  return (
    <View className="p-4">
      <View className="flex items-center justify-between flex-row mb-4">
        <Text className="font-semibold text-[#929292]">Tin tức - Sự kiện</Text>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            router.push("/news");
          }}
        >
          <Text className="text-blue-500 font-semibold underline">
            Xem thêm
          </Text>
        </TouchableOpacity>
      </View>
      <TouchableOpacity
        className="bg-white rounded-lg shadow-sm"
        onPress={() => {
          router.push({
            pathname: "/detail-news",
            params: { id: listNews[0]._id },
          });
        }}
      >
        <Image
          source={{
            uri: URL_IMAGE + "/" + listNews[0]?.image,
          }}
          className="w-full h-[200px] rounded-t-2xl"
        />
        <View className="p-2">
          <Text className="font-bold text-[17px] leading-6">
            {listNews[0]?.title}
          </Text>
          <View className="flex-row gap-3 mt-1 justify-between">
            <View className="flex-row items-center space-x-2 opacity-50">
              <FontAwesome5 name="eye" size={15} color="black" />
              <Text>{listNews[0]?.viewCount}</Text>
            </View>
            <TouchableOpacity
              className="bg-[#007BBB] px-4 py-1 rounded-[99px]"
              onPress={() => {
                router.push({
                  pathname: "/detail-news",
                  params: { id: listNews[0]?._id },
                });
              }}
            >
              <Text className="text-white">Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      {listNews.slice(1, 11).map((item, index) => (
        <TouchableOpacity
          key={index}
          className="h-[100px] flex-row bg-white rounded-lg mt-3 shadow-sm"
          onPress={() => {
            router.push({
              pathname: "/detail-news",
              params: { id: item._id },
            });
          }}
        >
          <Image
            source={{
              uri: URL_IMAGE + "/" + item?.image,
            }}
            className="w-[40%] h-full rounded-lg"
          />
          <View className="flex-1 p-2 justify-between">
            <Text className="font-semibold text-[13px]">{item?.title}</Text>

            <View className="flex-row justify-between items-center">
              <View className="flex-row gap-3 opacity-50">
                <View className="flex-row items-center space-x-2">
                  <FontAwesome5 name="eye" size={15} color="black" />
                  <Text>{item?.viewCount}</Text>
                </View>
              </View>
              <TouchableOpacity
                className="bg-[#007BBB] px-4 py-1 rounded-[99px]"
                onPress={() => {
                  router.push({
                    pathname: "/detail-news",
                    params: { id: item._id },
                  });
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
