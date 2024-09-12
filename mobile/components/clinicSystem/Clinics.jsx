import { FlatList, Image, Pressable, Text, View } from "react-native";

const Clinics = ({ dataClinic, activeIndex, handleZoomToClinic }) => {
  return (
    <View className="absolute bottom-24 z-50 flex-row">
      <FlatList
        data={dataClinic}
        className="w-full"
        contentContainerStyle={{ paddingHorizontal: 10 }}
        renderItem={({ item, index }) => (
          <Pressable
            onPress={() => handleZoomToClinic(index)}
            className={`${
              activeIndex === index ? "border-blue-500" : "border-gray-400"
            } flex-col items-center  bg-white w-[190px] rounded-lg border-2 shadow-sm`}
            key={index}
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-[100px] rounded-lg"
              resizeMode="contain"
            />
            <View className="space-y-1 w-full p-2">
              <Text>{item.title}</Text>
              <Text className="font-semibold">{item.name}</Text>
            </View>
          </Pressable>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 10 }} />}
      />
    </View>
  );
};

export default Clinics;
