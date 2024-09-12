import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";

const Specialty = ({ listSpecialty }) => {
  return (
    <View className="p-2 py-4">
      <View className="flex items-center justify-between flex-row px-2">
        <Text className="font-semibold text-[#929292]">Chuyên khoa</Text>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            router.push("/service");
          }}
        >
          <Text className="text-blue-500 font-semibold underline">Tất cả</Text>
        </TouchableOpacity>
      </View>
      <FlatList
        data={listSpecialty.slice(0, 6)}
        className="w-full mt-2"
        renderItem={({ item, index }) => (
          <TouchableOpacity
            key={index}
            className="flex-column relative flex-1 m-2 rounded-[15px] overflow-hidden"
            onPress={() => {
              console.log("Button pressed!");
            }}
          >
            <Image
              source={{
                uri: item?.image,
              }}
              className="h-[110px] rounded-md"
            />
            <View className="absolute bottom-0 left-0 right-0 bg-[#006ca6b8] px-1 min-h-[40px] py-1 flex items-center justify-center">
              <Text className=" text-white leading-4 text-center uppercase text-[10px] font-bold">
                {item?.name}
              </Text>
            </View>
          </TouchableOpacity>
        )}
        numColumns={3}
      />
    </View>
  );
};

export default Specialty;
