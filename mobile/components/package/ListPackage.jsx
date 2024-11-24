import {
  Text,
  View,
  FlatList,
  TouchableOpacity,
  Image,
  ActivityIndicator,
} from "react-native";
import { useWindowDimensions } from "react-native";
import empty from "../../assets/images/empty.png";
import { useEffect, useState } from "react";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const ListPackage = ({ listPackages, selectedSpecialty }) => {
  const { width } = useWindowDimensions();
  const [loading, setLoading] = useState(false);

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
      ) : listPackages.length > 0 ? (
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
                console.log(
                  `Button pressed for ${item.services[0].servicesID}!`
                );
              }}
            >
              <Image
                source={{
                  uri: URL_IMAGE + "/" + item.image,
                }}
                className="w-full aspect-[2/1] min-h-[100px]"
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
      ) : (
        <View className="w-full flex justify-center items-center mt-5">
          <Image source={empty} className="w-[70px] h-[70px] mb-4" />
          <Text className="font-normal text-gray-600">
            Không có gói khám nào.
          </Text>
        </View>
      )}
    </>
  );
};

export default ListPackage;
