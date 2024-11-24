import { useRef, useCallback, useState } from "react";
import { useLocalSearchParams } from "expo-router";
import { useFocusEffect } from "@react-navigation/native";
import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;
import all_specialty from "../../assets/images/all_specialty.png";

const ListSpecialty = ({
  listSpecialty,
  selectedSpecialty,
  handleSelectSpecialty,
}) => {
  const { id_specialty } = useLocalSearchParams();
  const updatedListSpecialty = [
    { _id: "0", image: all_specialty, name: "Tất cả" },
    ...listSpecialty,
  ];
  const [isReady, setIsReady] = useState(false);
  const flatListRef = useRef(null);

  const getItemLayout = (data, index) => ({
    length: 115,
    offset: 115 * index,
    index,
  });

  useFocusEffect(
    useCallback(() => {
      if (!id_specialty) return;
      const index = updatedListSpecialty.findIndex(
        (item) => item._id === id_specialty
      );
      if (flatListRef.current) {
        setTimeout(() => {
          flatListRef.current.scrollToIndex({
            index: index,
            viewPosition: 0.5,
            animated: true,
          });
        }, 100);
      }
    }, [id_specialty, isReady])
  );

  return (
    <>
      <View className="mt-4 pb-3">
        <FlatList
          ref={flatListRef}
          data={updatedListSpecialty}
          className="w-full"
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="overflow-hidden rounded-md "
              onPress={() => {
                handleSelectSpecialty(item._id);
              }}
            >
              <Image
                source={
                  item._id !== "0"
                    ? { uri: URL_IMAGE + "/" + item.image }
                    : item.image
                }
                className="w-[100px] h-[110px]"
              />
              <View
                className={`${
                  selectedSpecialty === item._id
                    ? "bg-[#fbcd50cd]"
                    : "bg-[#006ca6b8]"
                } absolute h-[40px] transition duration-300 ease-in-out bottom-0 left-0 right-0 px-1 py-1 flex items-center justify-center`}
              >
                <Text
                  className={`${
                    selectedSpecialty === item._id ? "text-black" : "text-white"
                  } leading-4 text-center uppercase text-[10px] font-bold`}
                >
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
          getItemLayout={getItemLayout}
          onContentSizeChange={() => setIsReady(true)}
          initialNumToRender={updatedListSpecialty.length}
        />
      </View>
    </>
  );
};

export default ListSpecialty;
