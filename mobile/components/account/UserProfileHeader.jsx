import { Text, View, Image, TouchableOpacity } from "react-native";
import { useSelector } from "react-redux";
import { router } from "expo-router";

const UserProfileHeader = () => {
  const profile = useSelector((state) => state.profile.profile);

  return (
    <>
      <View className="bg-white relative pt-14 px-5 pb-5">
        <View className="w-[450px] h-[90%] bg-[#007BBB] rounded-b-full absolute -left-9 -top-8"></View>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={ () => {
            router.push("account-info");
          } }
        >
          <Text className="w-full text-right text-white">Chỉnh sửa</Text>
        </TouchableOpacity>
        <View className="flex gap-1 justify-center items-center pt-14">
          <Image
            source={ require("../../assets/fav.png") }
            className="w-[100px] h-[100px] rounded-full border-2 border-[#F8D068] mb-3 bg-white"
          />
          <Text className="font-semibold block ">
            { profile?.fullName }
          </Text>
          <Text>{ profile.phoneNumber }</Text>
          <Text className="underline">
            ID: { profile.otherInfo?.patientCode || "Trống" }
          </Text>
        </View>
      </View>
    </>
  );
};

export default UserProfileHeader;
