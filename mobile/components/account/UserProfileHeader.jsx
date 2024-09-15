import { Text, View, Image, TouchableOpacity } from "react-native";

const UserProfileHeader = () => {
  return (
    <>
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
    </>
  );
};

export default UserProfileHeader;
