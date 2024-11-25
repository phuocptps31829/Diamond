import { useEffect, useState } from "react";
import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity, Image, View, ActivityIndicator } from "react-native";
import { useWindowDimensions } from "react-native";
import empty from "../../assets/images/empty.png";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const ListService = ({ listServices, selectedSpecialty }) => {
  const [loading, setLoading] = useState(false);
  const { width } = useWindowDimensions();
  const router = useRouter();

  useEffect(() => {
    setLoading(true);
    const timer = setTimeout(() => {
      setLoading(false);
    }, 500);

    return () => {
      clearTimeout(timer);
    };
  }, [selectedSpecialty]);

  return (
    <>
      {loading ? (
        <View className="w-full flex justify-center items-center mt-5">
          <ActivityIndicator size="large" color="#006ca6" />
        </View>
      ) : listServices.length > 0 ? (
        <FlatList
          data={listServices}
          className="w-full mt-2"
          contentContainerStyle={{ paddingHorizontal: 10 }}
          renderItem={({ item, index }) => (
            <TouchableOpacity
              key={index}
              style={{
                maxWidth: width / 2 - 18,
              }}
              className="flex-column relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
              onPress={() => router.push(`/detail-service/${item._id}`)}
            >
              <Image
                source={{
                  uri: URL_IMAGE + "/" + item?.image,
                }}
                className="w-full aspect-[2/1] min-h-[100px]"
              />
              <Text
                className="text-black font-semibold p-2"
                numberOfLines={1}
                ellipsizeMode="tail"
              >
                {item?.name}
              </Text>
            </TouchableOpacity>
          )}
          numColumns={2}
        />
      ) : (
        <View className="w-full flex justify-center items-center mt-5">
          <Image source={empty} className="w-[70px] h-[70px] mb-4" />
          <Text className="font-normal text-gray-600">
            Không có dịch vụ nào.
          </Text>
        </View>
      )}
    </>
  );
};

export default ListService;
