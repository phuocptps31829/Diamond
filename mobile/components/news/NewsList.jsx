import { Text, View, Image, TouchableOpacity } from "react-native";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import { useRouter } from "expo-router";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const NewsList = ({ dataNews }) => {
  const router = useRouter();

  return (
    <>
      <TouchableOpacity
        className="bg-white rounded-lg shadow-sm"
        onPress={() => {
          router.push({
            pathname: "/detail-news",
            params: { id: dataNews[0]?._id },
          });
        }}
      >
        <Image
          source={{
            uri: URL_IMAGE + "/" + dataNews[0]?.image,
          }}
          className="w-full h-[200px]"
        />
         <View className="p-2 px-3"> 
          <Text className="font-bold text-[17px] leading-6">
            {dataNews[0]?.title}
          </Text>
          <View className="flex-row gap-3 mt-1 justify-between">
            <View className="flex-row items-center space-x-2 opacity-50">
              <FontAwesome5 name="eye" size={15} color="black" />
              <Text>{dataNews[0]?.viewCount}</Text>
            </View>
            <TouchableOpacity
              className="bg-[#007BBB] px-4 py-1 rounded-[99px]"
              onPress={() => {
                router.push({
                  pathname: "/detail-news",
                  params: { id: dataNews[0]?._id },
                });
              }}
            >
              <Text className="text-white">Chi tiết</Text>
            </TouchableOpacity>
          </View>
        </View>
      </TouchableOpacity>
      <View className="p-4">
        {dataNews.slice(1).map((item, index) => (
          <TouchableOpacity
            key={index}
            className={`${index === 0 ? "mt-2" : "mt-5"} h-[100px] flex-row bg-white rounded-lg shadow-sm`}
            onPress={() => {
              router.push({
                pathname: "/detail-news",
                params: { id: item._id },
              });
            }}
          >
            <Image
              source={{
                uri: URL_IMAGE + "/" + item.image,
              }}
              className="w-[40%] h-full rounded-lg"
            />
            <View className="flex-1 p-2 justify-between">
              <Text className="font-semibold">
                {item.title}
              </Text>

              <View className="flex-row justify-between items-center">
                <View className="flex-row gap-3 opacity-50">
                  <View className="flex-row items-center gap-1">
                    <FontAwesome5 name="eye" size={15} color="black" />
                    <Text>{item.viewCount}</Text>
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
    </>
  );
};

export default NewsList;
