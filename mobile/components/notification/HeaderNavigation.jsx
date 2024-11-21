import { Text, View, Pressable } from "react-native";
import { useState } from "react";
import { ScrollView } from "react-native";
import PromotionNotification from "./PromotionNotification";
import SystemNotification from "./SystemNotification";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const HeaderNavigation = () => {
  const [activeTab, setActiveTab] = useState("system");

  const handleChooseTab = (tab) => {
    setActiveTab(tab);
  };

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
            <FontAwesome name="list-ul" size={16} color="white" />
            <Text className="text-white text-[14px]">Hệ thống</Text>
          </View>
        </Pressable>
        <Pressable
          className={`flex-1 p-4 border-b-4 ${
            activeTab === "promotion" ? " border-[#FBCC50]" : "border-[#007BBB]"
          }`}
          onPress={() => handleChooseTab("promotion")}
        >
          <View className="flex-row gap-2 font-semibold justify-center items-center">
            <FontAwesome name="list-ul" size={16} color="white" />
            <Text className="text-white text-[14px]">Chương trình ưu đãi</Text>
          </View>
        </Pressable>
      </View>
      <ScrollView className="bg-[#E8F2F7]" showsVerticalScrollIndicator={false}>
        {activeTab === "system" && <SystemNotification />}
        {activeTab === "promotion" && <PromotionNotification />}
      </ScrollView>
    </>
  );
};

export default HeaderNavigation;
