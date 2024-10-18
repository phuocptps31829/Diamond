import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { URL_IMAGE } from "../../configs/variables";

const ListService = ({ listServices }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <>
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
                uri: URL_IMAGE + item?.image,
              }}
              className="h-[110px]"
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
    </>
  );
};

export default ListService;
