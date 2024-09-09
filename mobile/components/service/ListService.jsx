import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity, Image } from "react-native";

const ListService = ({ listServices }) => {
  const router = useRouter();

  return (
    <>
      <FlatList
        data={ listServices }
        className="w-full mt-2"
        contentContainerStyle={ { paddingHorizontal: 10 } }
        renderItem={ ({ item, index }) => (
          <TouchableOpacity
            key={ index }
            className="flex-column max-w-[170px] relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
            onPress={ () => router.push(`/detail-service/${item._id}`) }
          >
            <Image
              source={ {
                uri: item?.image,
              } }
              className="h-[110px]"
            />
            <Text
              className="text-black font-semibold p-2"
              numberOfLines={ 1 }
              ellipsizeMode="tail"
            >
              { item?.name }
            </Text>
          </TouchableOpacity>
        ) }
        numColumns={ 2 }
      />
    </>
  );
};

export default ListService;
