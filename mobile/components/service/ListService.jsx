import { useRouter } from "expo-router";
import { Text, FlatList, TouchableOpacity, Image } from "react-native";
import { useWindowDimensions } from "react-native";

const ListService = ({ listServices }) => {
<<<<<<< HEAD
  const { width } = useWindowDimensions();
=======
  const router = useRouter();

>>>>>>> 3d4743d554b51a8f26325013d30057929d344d5c
  return (
    <>
      <FlatList
        data={ listServices }
        className="w-full mt-2"
        contentContainerStyle={ { paddingHorizontal: 10 } }
        renderItem={ ({ item, index }) => (
          <TouchableOpacity
<<<<<<< HEAD
            key={index}
            style={{
              maxWidth: width / 2 - 18,
            }}
            className="flex-column relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
            onPress={() => {
              console.log("Button pressed!");
            }}
=======
            key={ index }
            className="flex-column max-w-[170px] relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
            onPress={ () => router.push(`/detail-service/${item._id}`) }
>>>>>>> 3d4743d554b51a8f26325013d30057929d344d5c
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
