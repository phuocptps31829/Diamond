import {
  Text,
  FlatList,
  View,
  Image,
  useWindowDimensions,
  TouchableOpacity,
} from "react-native";
import { useRouter } from "expo-router";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const OutstandingServices = ({ listServices }) => {
  const router = useRouter();
  const { width } = useWindowDimensions();

  return (
    <>
      <View className="py-4 pb-8">
        <View className="flex items-center justify-between flex-row px-4">
          <Text className="font-semibold text-[#929292]">
            Gói dịch vụ nổi bật
          </Text>
          <TouchableOpacity
            className="flex-columns items-center justify-center gap-2"
            onPress={ () => {
              router.push("/service");
            } }
          >
            <Text className="text-blue-500 font-semibold underline">
              Tất cả
            </Text>
          </TouchableOpacity>
        </View>
        <View>
          <FlatList
            data={ listServices }
            className="mt-6"
            contentContainerStyle={ { paddingHorizontal: 16 } }
            renderItem={ ({ item, index }) => (
              <TouchableOpacity
                key={ index }
                style={ [{ width: width - 110 }] }
                className="relative rounded-[15px] overflow-hidden"
                onPress={ () => router.push(`/detail-service/${item._id}`) }
              >
                <Image
                  source={ {
                    uri: URL_IMAGE + "/" + item?.image,
                  } }
                  style={ [{ height: 170, borderRadius: 15 }] }
                />
                <Text numberOfLines={1} className="absolute bottom-0 left-0 right-0 bg-[#006ca69f] py-3 text-center px-4 text-white font-semibold">
                  { item?.name }
                </Text>
              </TouchableOpacity>
            ) }
            horizontal
            showsHorizontalScrollIndicator={ false }
            ItemSeparatorComponent={ () => <View style={ { width: 20 } } /> }
          />
        </View>
      </View>
    </>
  );
};

export default OutstandingServices;
