import { Text, View, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";
import { URL_IMAGE } from "../../configs/variables";

const ListDoctors = ({ listDoctors }) => {
  const router = useRouter();
  return (
    <>
      <ScrollView
        className="bg-white p-4 "
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-4 mb-8 divide-y divide-violet-50 ">
          {listDoctors.map((item, index) => (
            <View
              className={`${
                index === 0 ? "pt-0" : "pt-4"
              } flex-row items-center space-x-3 `}
              key={index}
            >
              <Pressable
                onPress={() => {
                  router.push({
                    pathname: "/detail-doctor",
                    params: { id: item._id },
                  });
                }}
              >
                <Image
                  source={{ uri: URL_IMAGE + item.avatar }}
                  className="w-[70px] h-[70px] rounded-full"
                />
              </Pressable>
              <View className="flex-1">
                <Pressable
                  className="space-y-1"
                  onPress={() => {
                    router.push({
                      pathname: "/detail-doctor",
                      params: { id: item._id },
                    });
                  }}
                >
                  <Text className="font-bold">BS. {item.fullName}</Text>
                  <Text className="text-[12px] text-gray-400 font-semibold">
                    Bác sĩ
                  </Text>
                </Pressable>
                <View className="flex-row items-center justify-between">
                  <Pressable
                    onPress={() => {
                      router.push({
                        pathname: "/detail-doctor",
                        params: { id: item._id },
                      });
                    }}
                  >
                    <Text className="text-blue-500 text-[12px] font-semibold italic">
                      Xem chi tiết bác sĩ...
                    </Text>
                  </Pressable>
                  <Pressable
                    className="self-end border border-blue-500 px-4 py-2 rounded-[999px]"
                    onPress={() => {
                      router.push({
                        pathname: "/detail-doctor",
                        params: { id: item._id },
                      });
                    }}
                  >
                    <Text className="font-semibold text-[12px]">
                      Đặt hẹn ngay
                    </Text>
                  </Pressable>
                </View>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
    </>
  );
};

export default ListDoctors;
