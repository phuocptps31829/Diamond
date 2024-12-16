import { Text, View, Image } from "react-native";
import empty from "../../assets/images/empty.png";
import Entypo from "@expo/vector-icons/Entypo";
import { formatDateTimeLocale } from "../../utils/format";

const PromotionNotification = ({ data }) => {
  return (
    <View className="px-4 pb-4 mt-2">
      {data.length > 0 ? (
        data.map((item, index) => (
          <View key={index}>
            <View
              key={index}
              className="bg-white p-3 rounded-lg space-y-1 mb-2"
            >
              <Text className="text-primary-700 font-semibold text-[15px]">
                {item.title}
              </Text>
              <Text className="leading-5 text-[13.5px]">
                {item.description}
              </Text>
              <View className="flex-row items-center space-x-2">
                <Entypo name="clock" size={12} color="gray" />
                <Text className="text-[12px] text-gray-600">
                  {formatDateTimeLocale(item.createdAt)}
                </Text>
              </View>
            </View>
          </View>
        ))
      ) : (
        <View className="w-full flex justify-center items-center mt-5">
          <Image source={empty} className="w-[70px] h-[70px] mb-4" />
          <Text className="font-normal text-gray-600">
            Không có thông báo nào.
          </Text>
        </View>
      )}
    </View>
  );
};

export default PromotionNotification;
