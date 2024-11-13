import { Text, View, FlatList, TouchableOpacity, Image } from "react-native";
import { URL_IMAGE } from "../../configs/variables";

const ListSpecialty = ({ listSpecialty }) => {
  return (
    <>
      <View className="mt-4 pb-3">
        <FlatList
          data={listSpecialty}
          className="w-full"
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <TouchableOpacity
              className="overflow-hidden rounded-md "
              onPress={() => {
                console.log("Button pressed!");
              }}
            >
              <Image
                source={{
                  uri: URL_IMAGE + "/" + item?.image,
                }}
                className="w-[100px] h-[110px] "
              />
              <View className="absolute bottom-0 left-0 right-0 bg-[#006ca6b8] px-1 min-h-[40px] py-1 flex items-center justify-center">
                <Text className=" text-white leading-4 text-center uppercase text-[10px] font-bold">
                  {item?.name}
                </Text>
              </View>
            </TouchableOpacity>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
      </View>
    </>
  );
};

export default ListSpecialty;
