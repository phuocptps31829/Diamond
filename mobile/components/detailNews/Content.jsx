import { Text, Image, View } from "react-native";

const Content = () => {
  return (
    <>
      <View className="my-4">
        <Image
          source={{
            uri: "https://img.ykhoadiamond.com/Uploads/Content/31082024/c87f8bef-0dde-4e18-8bf6-c8dc4d16def8.jpg",
          }}
          style={styles.image}
          resizeMode="contain"
        />
        <View className="p-6">
          <Text className="leading-6 text-lg font-bold mb-4">
            Kính gửi Quý Khách hàng,
          </Text>

          <Text className="leading-6 mb-4">
            Hệ Thống Y Khoa Diamond xin trân trọng thông báo đến Quý Đối Tác &
            Quý Khách Hàng lịch nghỉ lễ Quốc Khánh 2/9 như sau:
          </Text>

          <Text className="leading-6 mb-2">▪️ Thời gian nghỉ lễ 02 ngày:</Text>
          <Text className="leading-6 mb-2 pl-4">
            Từ Thứ Hai, ngày 02/09/2024 đến hết Thứ Ba, ngày 03/09/2024
          </Text>

          <Text className="leading-6 mb-2">▪️ Thời gian bắt đầu làm việc trở lại:</Text>
          <Text className="leading-6 mb-4 pl-4">Thứ Tư, ngày 04/09/2024</Text>

          <Text className="leading-6 mb-4">
            Để đảm bảo sức khỏe và thuận tiện cho kế hoạch khám chữa bệnh, Quý
            Khách vui lòng sắp xếp thời gian đến thăm khám trước kỳ nghỉ Lễ. Hệ
            Thống Y Khoa Diamond luôn sẵn sàng phục vụ Quý Khách với đầy đủ các
            dịch vụ y tế chuyên nghiệp, cùng đội ngũ bác sĩ giàu kinh nghiệm.
          </Text>

          <Text className="leading-6 mb-4 font-semibold">
            Lưu ý: Trong thời gian nghỉ lễ, nếu có bất kỳ thắc mắc hoặc cần hỗ
            trợ khẩn cấp, Quý Khách có thể liên hệ với chúng tôi qua hotline:
            028 3930 7575 để được tư vấn và hỗ trợ kịp thời.
          </Text>

          <Text className="leading-6 mb-4">
            Kính chúc Quý Khách và gia đình một kỳ nghỉ lễ nhiều niềm vui, an
            lành và hạnh phúc!
          </Text>

          <Text className="leading-6 font-bold">Trân trọng,</Text>
          <Text>Hệ Thống Y leading-6 Khoa Diamond</Text>
        </View>
      </View>
    </>
  );
};

const styles = {
  image: {
    aspectRatio: 1,
  },
};

export default Content;
