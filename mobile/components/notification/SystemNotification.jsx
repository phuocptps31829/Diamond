import { Text, View } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const dataSystemNotification = [
  {
    id: 1,
    date: "03/09/2024",
    data: [
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "19:49 03/09/2024",
      },
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "20:49 03/09/2024",
      },
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "19:49 03/09/2024",
      },
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "20:49 03/09/2024",
      },
    ],
  },
  {
    id: 2,
    date: "06/09/2024",
    data: [
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "21:49 06/09/2024",
      },
      {
        title: "Hệ thống",
        subTitle: "Thay đổi mật khẩu!",
        status: "Mật khẩu đã được thay đổi!",
        fullTime: "21:49 06/09/2024",
      }
    ],
  },
];

const SystemNotification = () => {
  return (
    <View className="px-4 pb-4">
      {dataSystemNotification.map((item) => (
        <View key={item.id}>
          <Text className="font-bold mt-4 mb-2">{item.date}</Text>
          {item.data.map((notification, index) => (
            <View
              key={index}
              className="bg-white p-3 rounded-lg space-y-1 mb-2"
            >
              <Text className="text-[#007BBB] font-semibold">
                {notification.title}
              </Text>
              <Text className="font-semibold">{notification.subTitle}</Text>
              <Text className="text-[12px] text-gray-600">
                {notification.status}
              </Text>
              <View className="flex-row items-center space-x-2 pt-1">
                <Entypo name="clock" size={12} color="gray" />
                <Text className="text-[12px] text-gray-600">
                  {notification.fullTime}
                </Text>
              </View>
            </View>
          ))}
        </View>
      ))}
    </View>
  );
};

export default SystemNotification;
