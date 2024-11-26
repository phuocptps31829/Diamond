import { useState } from "react";
import { Text, View, Image, Pressable, ScrollView } from "react-native";
import RenderHtml from "react-native-render-html";
import { useWindowDimensions } from "react-native";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const DoctorInformation = ({ doctor }) => {
  console.log("doctor", doctor);
  const { width } = useWindowDimensions();
  const [showInfor, setShowInfor] = useState(0);

  const handleShowInfor = (index) => {
    setShowInfor(index);
  };

  return (
    <>
      <View className="flex-col justify-center items-center gap-2 mt-4">
        <Image
          source={{
            uri: URL_IMAGE + "/" + doctor.avatar,
          }}
          className="w-[100px] h-[100px] rounded-full"
        />
        <Text className="font-semibold text-[15px]">
          BS. {doctor.fullName}
        </Text>
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
            Giới thiệu
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
            Lịch làm việc
          </Text>
        </Pressable>
      </View>
      <ScrollView className="border-t-2 border-gray-300 px-4">
        <View
          className={`${
            showInfor === 0 ? "flex" : "hidden"
          } space-y-2 mt-3`}
        >
          <RenderHtml
            contentWidth={width}
            source={{ html: doctor?.otherInfo?.detail }}
            tagsStyles={tagsStyles}
          />
        </View>
        <View
          className={`${
            showInfor === 1 ? "flex" : "hidden"
          } space-y-2 mt-3`}
        >
          <RenderHtml 
            contentWidth={width} 
            source={{ html: doctor?.otherInfo?.detail }}
            tagsStyles={tagsStyles}
          />
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

const tagsStyles = {
  ul: {
    margin: 0,
    paddingLeft: 0,
    listStyleType: "none",
  },
  p: {
    fontSize: 15,
    color: "#333",
    marginBottom: 5,
    lineHeight: 24,
  },
  li: {
    fontSize: 15,
    color: "#333",
    marginBottom: 5,
    listStyleType: "none",
    lineHeight: 24,
  },
  strong: {
    fontWeight: "bold",
    color: "#007BBB",
  },
};

export default DoctorInformation;
