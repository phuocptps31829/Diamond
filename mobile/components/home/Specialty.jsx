import { Text, FlatList, View, Image, TouchableOpacity } from "react-native";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const pairData = (data) => {
  const paired = [];
  for (let i = 0; i < data.length; i += 2) {
    paired.push(data.slice(i, i + 2));
  }
  return paired;
};

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
        />
      </View>
      <FlatList
        data={pairData(listSpecialty)}
        className="w-full mt-4"
        renderItem={({ item }) => (
          <View className="flex flex-col gap-4">
            {item.map((specialty, index) => (
              <TouchableOpacity
                key={index}
                className="relative flex-1 rounded-[15px] overflow-hidden max-h-[120px]"
                onPress={() => {
                  console.log("Specialty selected:", specialty.name);
                }}
              >
                <Image
                  source={{
                    uri: `${URL_IMAGE}/${specialty.image}`,
                  }}
                  className="h-full rounded-md w-28"
                />
                <View className="absolute bottom-0 left-0 right-0 bg-[#006ca69c] px-1 py-2 flex items-center justify-center">
                  <Text numberOfLines={1} className="text-white text-center uppercase text-[11px] font-bold">
                    {specialty.name}
                  </Text>
                </View>
              </TouchableOpacity>
            ))}
          </View>
        )}
        horizontal
        showsHorizontalScrollIndicator={false}
        ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
      />
    </View>
  );
};

export default Specialty;
