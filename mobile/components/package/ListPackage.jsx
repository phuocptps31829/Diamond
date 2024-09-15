import { useRouter } from "expo-router";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";

const transformData = (listPackages) => {
  const transformedData = [];

  listPackages.forEach((pkg) => {
    pkg.services.forEach((service) => {
      transformedData.push({
        ...pkg,
        service,
      });
    });
  });

  return transformedData;
};

const ListPackage = ({ listPackages }) => {
  const transformedPackages = transformData(listPackages);
  const router = useRouter();

  return (
    <FlatList
      data={ transformedPackages }
      className="w-full mt-2"
      contentContainerStyle={ { paddingHorizontal: 10 } }
      renderItem={ ({ item, index }) => (
        <TouchableOpacity
          key={ index }
          className="flex-column max-w-[170px] relative bg-white flex-1 m-1 rounded-[15px] overflow-hidden"
          onPress={ () => {
            router.push(`/detail-package/${item._id}`);
          } }
        >
          <Image
            source={ {
              uri: item.image,
            } }
            className="h-[110px] rounded-md"
          />
          <View className="p-2 space-y-1">
            <Text className="text-black font-medium text-[12px]">
              { item.service.levelName }
            </Text>
            <Text
              className="text-black font-semibold"
              numberOfLines={ 1 }
              ellipsizeMode="tail"
            >
              { item.name }
            </Text>
          </View>
        </TouchableOpacity>
      ) }
      numColumns={ 2 }
    />
  );
};

export default ListPackage;
