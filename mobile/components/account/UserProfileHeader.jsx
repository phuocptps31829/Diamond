import React, { useState } from "react";
import { Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useSelector } from "react-redux";
import { router } from "expo-router";
const URL_IMAGE = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const UserProfileHeader = () => {
  const profile = useSelector((state) => state.profile.profile);
  const [isImageLoading, setIsImageLoading] = useState(true);

  return (
    <>
      <View className="bg-white relative pt-14 px-5 pb-5">
        <View className="w-[450px] h-[90%] bg-[#007BBB] rounded-b-full absolute -left-9 -top-8"></View>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            router.push("account-info");
          }}
        >
          <Text className="w-full text-right text-white">Chỉnh sửa</Text>
        </TouchableOpacity>
        <View className="flex gap-1 justify-center items-center pt-14">
          <View className="relative w-[100px] h-[100px] bg-gray-300 rounded-full">
            <Image
              source={
                profile.avatar
                  ? { uri: `${URL_IMAGE}/${profile.avatar}` }
                  : require("../../assets/fav.png")
              }
              className="rounded-full w-full h-full border-2 border-[#FBCC50] bg-white"
              onLoad={() => setIsImageLoading(false)}
            />
            {isImageLoading && (
              <View className="bg-[#0000006c] rounded-full absolute w-full h-full top-0 flex justify-center items-center">
                <ActivityIndicator size="large" color="white" />
              </View>
            )}
          </View>
          <Text className="font-semibold block ">{profile?.fullName}</Text>
          <Text>{profile.phoneNumber}</Text>
          <Text className="underline">
            ID: {profile.otherInfo?.patientCode || "Trống"}
          </Text>
        </View>
      </View>
    </>
  );
};

export default UserProfileHeader;
