import { Text, View, ScrollView, Image, TouchableOpacity } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import AntDesign from "@expo/vector-icons/AntDesign";
import FontAwesome5 from "@expo/vector-icons/FontAwesome5";
import Fontisto from "@expo/vector-icons/Fontisto";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import SimpleLineIcons from "@expo/vector-icons/SimpleLineIcons";

const Bookmark = () => {
  return (
    <ScrollView className="bg-[#E8F2F7]" showsVerticalScrollIndicator={false}>
      <View className="bg-white relative pt-14 px-5 pb-5">
        <View className="w-[450px] h-[95%] bg-[#007BBB] rounded-b-full absolute -left-9 -top-14"></View>
        <TouchableOpacity
          className="flex-columns items-center justify-center gap-2"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <Text className="w-full text-right text-white">Chỉnh sửa</Text>
        </TouchableOpacity>
        <View className="flex gap-1 justify-center items-center pt-14">
          <Image
            source={{
              uri: "https://s.pro.vn/qNZX",
            }}
            className="w-[100px] h-[100px] rounded-full border-2 border-[#F8D068] mb-3"
          />
          <Text className="font-semibold block ">Nguyen Nam</Text>
          <Text>0345353474</Text>
          <Text className="underline">chinhnguyenn2004@gmail.com</Text>
        </View>
      </View>
      <View className="bg-white w-full mt-3 px-5 py-5">
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome6 name="ranking-star" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Thành viên Đồng
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
      </View>
      <View className="bg-white w-full my-3 px-5 divide-y divide-gray-100">
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome name="history" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Lịch sử khám
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome5 name="file-medical-alt" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Bệnh án điện tử
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome6
                name="house-medical-flag"
                size={24}
                color="#FBCC50"
              />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Trung tâm hỗ trợ
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <Fontisto name="unlocked" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Thay đổi mật khẩu
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <MaterialIcons name="policy" size={28} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Chính sách quyền riêng tư
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
        <TouchableOpacity
          className="flex-row items-center justify-between py-4"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <FontAwesome5 name="user-friends" size={20} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Giới thiệu bạn bè
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
      </View>
      <View className="bg-white w-full mt-3 px-5 py-5">
        <TouchableOpacity
          className="flex-row items-center justify-between"
          onPress={() => {
            console.log("Button pressed!");
          }}
        >
          <View className="flex-row items-center gap-2">
            <View className="w-[30px] block">
              <SimpleLineIcons name="logout" size={24} color="#FBCC50" />
            </View>
            <Text className="text-black text-[15px] font-medium">
              Đăng xuất
            </Text>
          </View>
          <AntDesign name="right" size={17} color="black" />
        </TouchableOpacity>
      </View>
    </ScrollView>
  );
};

export default Bookmark;
