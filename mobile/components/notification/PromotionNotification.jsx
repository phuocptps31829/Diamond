import { Text, View, Image, Pressable } from "react-native";
import Entypo from "@expo/vector-icons/Entypo";

const dataPromotionNotification = [
  {
    id: 1,
    date: "03/09/2024",
    data: [
      {
        image:
          "https://img.ykhoadiamond.com/uploads/avatar/07112023/05ab219d-3389-4fbe-941c-7ec084f1c7dc_M.jpg",
        title: "Thông báo ưu đãi",
        subTitle:
          "Trong 2 ngày thứ 9 và 10/5/2024, Hội nghị Sản phụ khoa Việt Pháp Châu Á Thái Bình Dương lần thứ 24 (VFAP 24) được tổ chức tại TP.HCM. Đây là Hội nghị Sản phụ khoa lớn nhất năm",
        fullTime: "19:49 03/09/2024",
      },
      {
        image:
          "https://img.ykhoadiamond.com/Uploads/Content/19082024/e76688ba-e2ab-41c5-b4aa-4628bb452f0f.jpg",
        title: "Thông báo ưu đãi",
        subTitle:
          "Trong 2 ngày thứ 9 và 10/5/2024, Hội nghị Sản phụ khoa Việt Pháp Châu Á Thái Bình Dương lần thứ 24 (VFAP 24) được tổ chức tại TP.HCM. Đây là Hội nghị Sản phụ khoa lớn nhất năm",
        fullTime: "19:49 03/09/2024",
      },
    ],
  },
  {
    id: 1,
    date: "03/09/2024",
    data: [
      {
        image:
          "https://img.ykhoadiamond.com/Uploads/Content/19082024/01756158-4d05-4caa-a12f-e07bd224baaf.jpg",
        title: "Thông báo ưu đãi",
        subTitle:
          "Trong 2 ngày thứ 9 và 10/5/2024, Hội nghị Sản phụ khoa Việt Pháp Châu Á Thái Bình Dương lần thứ 24 (VFAP 24) được tổ chức tại TP.HCM. Đây là Hội nghị Sản phụ khoa lớn nhất năm",
        fullTime: "19:49 03/09/2024",
      },
      {
        image:
          "https://img.ykhoadiamond.com/Uploads/Content/19082024/b3c92e0b-ac15-4219-b4d8-fe10c69c4a21.jpg",
        title: "Thông báo ưu đãi",
        subTitle:
          "Trong 2 ngày thứ 9 và 10/5/2024, Hội nghị Sản phụ khoa Việt Pháp Châu Á Thái Bình Dương lần thứ 24 (VFAP 24) được tổ chức tại TP.HCM. Đây là Hội nghị Sản phụ khoa lớn nhất năm",
        fullTime: "19:49 03/09/2024",
      },
    ],
  },
];

const PromotionNotification = () => {
  return (
    <View className="px-4 pb-4">
      {dataPromotionNotification.map((item) => (
        <Pressable key={item.id}>
          <Text className="font-bold mt-4 mb-2">{item.date}</Text>
          {item.data.map((notification, index) => (
            <View
              key={index}
              className="bg-white rounded-lg space-y-1 mb-2 overflow-hidden"
            >
              <Image
                source={{
                  uri: notification.image,
                }}
                className="w-full h-[180px]"
                resizeMode="cover"
              />
              <View className="p-3">
                <Text className="font-semibold mb-1">{notification.title}</Text>
                <Text className="text-[12px] text-gray-600">
                  {notification.subTitle}
                </Text>
                <View className="flex-row items-center space-x-2 pt-1 mt-1">
                  <Entypo name="clock" size={12} color="gray" />
                  <Text className="text-[12px] text-gray-600">
                    {notification.fullTime}
                  </Text>
                </View>
              </View>
            </View>
          ))}
        </Pressable>
      ))}
    </View>
  );
};

export default PromotionNotification;
