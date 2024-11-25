import { Text, View, Pressable, ActivityIndicator } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import PromotionNotification from "./PromotionNotification";
import SystemNotification from "./SystemNotification";
import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import { useQuery } from "@tanstack/react-query";
import { notificationsApi } from "../../services/notificationsApi";

const HeaderNavigation = () => {
  const [activeTab, setActiveTab] = useState("system");

  const {
    data,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["notifications"],
    queryFn: notificationsApi.getNotifications,
  });

  const handleChooseTab = (tab) => {
    setActiveTab(tab);
  };

  if (error) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{errorPackage?.message || errorSpecialty?.message}</Text>
      </View>
    );
  }

  return (
    <>
      <View className="flex flex-row justify-between items-center bg-[#007BBB] border-t border-white">
        <Pressable
          onPress={() => handleChooseTab("system")}
          className={`flex-1 p-4 border-b-4 ${
            activeTab === "system" ? " border-[#FBCC50]" : "border-[#007BBB]"
          }`}
        >
          <View className=" flex-row gap-2  font-semibold justify-center items-center">
          <MaterialIcons name="notification-important" size={20} color="white" />
            <Text className="text-white text-[13px] font-semibold">Thông báo chưa xem</Text>
          </View>
        </Pressable>
        <Pressable
          className={`flex-1 p-4 border-b-4 ${
            activeTab === "promotion" ? " border-[#FBCC50]" : "border-[#007BBB]"
          }`}
          onPress={() => handleChooseTab("promotion")}
        >
          <View className="flex-row gap-2 font-semibold justify-center items-center">
          <Ionicons name="notifications-circle-outline" size={20} color="white" />
            <Text className="text-white text-[13px] font-semibold">Thông báo đã xem</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView className="bg-[#E8F2F7]" showsVerticalScrollIndicator={false}>
        {isLoading ? (
          <View className="w-full flex justify-center items-center mt-5">
            <ActivityIndicator size="large" color="#006ca6" />
          </View>
        ) : (
          <>
            {activeTab === "system" && <SystemNotification data={data} />}
            {activeTab === "promotion" && <PromotionNotification data={data} />}
          </>
        )}
      </ScrollView>
    </>
  );
};

export default HeaderNavigation;
