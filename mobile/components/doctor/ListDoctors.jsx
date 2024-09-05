import { Text, View, ScrollView, Pressable, Image } from "react-native";
import { useRouter } from "expo-router";

const data = [
  {
    id: 1,
    name: "Đỗ Thị Phong Lan",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/a543a4b9-55d9-422e-8937-2bc74ca6d1b4.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Thúy",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/378c5830-8030-4bc6-a656-0a3e9a0ed0be.jpg",
  },
  {
    id: 3,
    name: "Bùi Thị Tuyết Mai",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/4bfe5ed2-f0e4-4ed1-bc32-4f04ec25611d.jpg",
  },
  {
    id: 4,
    name: "Đinh Nhật Hoàng Chương",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/163ac14c-51a0-4c69-96d1-5aca8f04ee0c.jpg",
  },
  {
    id: 1,
    name: "Đỗ Thị Phong Lan",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/a543a4b9-55d9-422e-8937-2bc74ca6d1b4.jpg",
  },
  {
    id: 2,
    name: "Nguyễn Thị Thanh Thúy",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/378c5830-8030-4bc6-a656-0a3e9a0ed0be.jpg",
  },
  {
    id: 3,
    name: "Bùi Thị Tuyết Mai",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/4bfe5ed2-f0e4-4ed1-bc32-4f04ec25611d.jpg",
  },
  {
    id: 4,
    name: "Đinh Nhật Hoàng Chương",
    avatar:
      "https://img.ykhoadiamond.com/uploads/doctor/20032023/163ac14c-51a0-4c69-96d1-5aca8f04ee0c.jpg",
  },
];

const ListDoctors = () => {
  const router = useRouter();
  return (
    <>
      <View className="flex px-4 justify-between bg-primary-500 items-center flex-row pt-16 pb-4">
        <Text className="text-white font-semibold w-full text-center text-[15px]">
          Đội ngũ Bác sĩ
        </Text>
      </View>
      <ScrollView
        className="bg-white p-4 "
        showsVerticalScrollIndicator={false}
      >
        <View className="space-y-4 mb-8 divide-y divide-violet-50 ">
          {data.map((item, index) => (
            <View
              className={`${
                index === 0 ? "pt-0" : "pt-4"
              } flex-row items-center space-x-3 `}
              key={index}
            >
              <Pressable
                onPress={() => {
                  router.push("/DetailDoctor");
                }}
              >
                <Image
                  source={{ uri: item.avatar }}
                  className="w-[70px] h-[70px] rounded-full"
                />
              </Pressable>
              <View className="flex-1">
                <Pressable
                  className="space-y-1"
                  onPress={() => {
                    router.push("/DetailDoctor");
                  }}
                >
                  <Text className="font-bold">BS. {item.name}</Text>
                  <Text className="text-[12px] text-gray-400 font-semibold">
                    Bác sĩ
                  </Text>
                </Pressable>
                <View className="flex-row items-center justify-between">
                  <Pressable
                    onPress={() => {
                      router.push("/DetailDoctor");
                    }}
                  >
                    <Text className="text-blue-500 text-[12px] font-semibold italic">
                      Xem chi tiết bác sĩ...
                    </Text>
                  </Pressable>
                  <Pressable
                    className="self-end border border-blue-500 px-4 py-2 rounded-[999px]"
                    onPress={() => {
                      router.push("/DetailDoctor");
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
