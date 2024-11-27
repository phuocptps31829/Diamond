import { Stack } from "expo-router";
import HeaderScreen from "../../components/ui/HeaderScreen";


const AccountLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="change-password"
        options={ {
          header: () => <HeaderScreen title="Thay Đổi Mật Khẩu" />,
        } }
      />
      <Stack.Screen
        name="invite-friend"
        options={ {
          header: () => <HeaderScreen title="Giới Thiệu Bạn Bè" />,
        } }
      />
      <Stack.Screen
        name="history-appointment"
        options={ {
          header: () => <HeaderScreen title="Lịch Sử Đặt Khám" />,
        } }
      />
      <Stack.Screen
        name="medical-record"
        options={ {
          header: () => <HeaderScreen title="Bệnh Án Điện Tử" />,
        } }
      />
      <Stack.Screen
        name="member"
        options={ {
          header: () => <HeaderScreen title="Thành Viên" />,
        } }
      />
    </Stack>
  );
};

export default AccountLayout;
