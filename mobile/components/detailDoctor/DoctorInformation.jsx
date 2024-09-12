import { useState } from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";

const DoctorInformation = () => {
  const [showInfor, setShowInfor] = useState(0);

  const handleShowInfor = (index) => {
    setShowInfor(index);
  };

  return (
    <>
      <View className="flex-col justify-center items-center gap-2 mt-4">
        <Image
          source={{
            uri: "https://img.ykhoadiamond.com/uploads/doctor/20032023/a543a4b9-55d9-422e-8937-2bc74ca6d1b4.jpg",
          }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="font-semibold text-[15px]">BS. Đỗ Thị Phong Lan</Text>
        <Text className="text-gray-400 font-semibold">Bác sĩ</Text>
      </View>
      <View className="flex-row bg-[#f1ce6fa0] p-[5px] m-4 rounded-md">
        <Pressable
          className={`${
            showInfor === 0 ? "bg-primary-500" : ""
          } flex-1 p-3 rounded-md`}
          onPress={() => handleShowInfor(0)}
        >
          <Text
            className={`${
              showInfor === 0 ? "text-white" : "text-black"
            } text-center font-semibold `}
          >
            Chứng nhận
          </Text>
        </Pressable>
        <Pressable
          className={`${
            showInfor === 1 ? "bg-primary-500" : ""
          } flex-1 p-3 rounded-md`}
          onPress={() => handleShowInfor(1)}
        >
          <Text
            className={`${
              showInfor === 1 ? "text-white" : "text-black"
            } text-center font-semibold `}
          >
            Kinh nghiệm
          </Text>
        </Pressable>
      </View>
      <ScrollView className="border-t-2 border-gray-300">
        <View
          className={`${
            showInfor === 0 ? "flex" : "hidden"
          } p-4 space-y-2 pb-20`}
        >
          {Array.from({ length: 8 }).map((_, index) => (
            <View key={index}>
              <Text className="font-semibold text-base mb-1">Trường y:</Text>
              <View className="flex-row">
                <Text className="mr-2 text-[20px]">•</Text>
                <Text className="leading-5 list-decimal">
                  Bác sĩ y khoa, Đại học Y Dược, Thành phố Hồ Chí Minh, Việt
                  Nam, 2002
                </Text>
              </View>
            </View>
          ))}
        </View>
        <View
          className={`${
            showInfor === 1 ? "flex" : "hidden"
          } space-y-2 p-4 pb-20`}
        >
          {Array.from({ length: 2 }).map((_, index) => (
            <View key={index}>
              <Text className="font-semibold text-base mb-1">Kinh nghiệm:</Text>
              <View className="flex-row">
                <Text className="mr-2 text-[20px]">•</Text>
                <Text className="leading-5 list-decimal flex-1">
                  Kinh nghiệm hơn 5 năm làm bác sĩ khoa ngoại, 3 năm làm bác sĩ
                  nội thần kinh
                </Text>
              </View>
            </View>
          ))}
        </View>
      </ScrollView>
      <View className="absolute bottom-7 flex justify-center items-center w-full">
        <Pressable className="fixed bg-[#007BBB] w-[300px] p-3 rounded-lg">
          <Text className="text-white text-center font-semibold text-[15px]">
            Đặt hẹn ngay
          </Text>
        </Pressable>
      </View>
    </>
  );
};

export default DoctorInformation;
