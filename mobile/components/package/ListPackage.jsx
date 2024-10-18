import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { useWindowDimensions } from "react-native";
import { URL_IMAGE } from "../../configs/variables";

const ListPackage = ({ listPackages }) => {
  const { width } = useWindowDimensions();

  return (
    <FlatList
      data={listPackages}
      className="w-full mt-2"
      contentContainerStyle={{ paddingHorizontal: 10 }}
      renderItem={({ item, index }) => (
        <TouchableOpacity
          key={index}
          style={{
            maxWidth: width / 2 - 18,
          }}
          className="flex-column relative bg-white flex-1 m-1 rounded-[10px] overflow-hidden"
          onPress={() => {
            console.log(`Button pressed for ${item.services[0].servicesID}!`);
          }}
        >
          <Image
            source={{
              uri: URL_IMAGE + item.image,
            }}
            className="h-[110px] rounded-md"
          />
          <View className="p-2 space-y-1">
            <Text className="text-black font-medium text-[12px]">
              {item.services[0].levelName}
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
