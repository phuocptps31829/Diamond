import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";

const pairData = (data) => {
  const paired = [];
  for (let i = 0; i < data.length; i += 2) {
    paired.push(data.slice(i, i + 2));
  }
  return paired;
};

const OutstandingPackages = ({ listPackages }) => {
  const { width } = useWindowDimensions();
  const router = useRouter();

  return (
    <View className="bg-[#006DA6] py-4 pb-8">
      <View className="flex items-center justify-between flex-row px-4">
        <Text className="font-semibold text-white">Gói khám nổi bật</Text>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            router.push("/package");
          }}
        >
          <Text className="text-white font-semibold underline">Tất cả</Text>
        </TouchableOpacity>
      </View>
      <View>
        <FlatList
          data={pairData(
            listPackages
              .sort((a, b) => b.orderCount - a.orderCount)
              .slice(0, 15)
          )}
          className="mt-6"
          contentContainerStyle={{ paddingHorizontal: 16 }}
          renderItem={({ item }) => (
            <View className="flex gap-4">
              {item.map((service, index) => (
                <TouchableOpacity
                  key={index}
                  style={[{ width: width - 130 }]}
                  className="rounded-[15px] overflow-hidden"
                  onPress={() => {
                    console.log("Button pressed!");
                  }}
                >
                  <Image
                    source={{
                      uri: service.image,
                    }}
                    style={[{ height: 150, borderRadius: 15 }]}
                  />
                </TouchableOpacity>
              ))}
            </View>
          )}
          horizontal
          showsHorizontalScrollIndicator={false}
          ItemSeparatorComponent={() => <View style={{ width: 15 }} />}
        />
      </View>
    </View>
  );
};

export default OutstandingPackages;
