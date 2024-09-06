import { Stack } from "expo-router";
import HeaderScreen from "../../components/ui/HeaderScreen";

const AccountLayout = () => {
  return (
    <Stack>
      <Stack.Screen
        name="change-password"
        options={ {
          header: () => <HeaderScreen title="Thay đổi mật khẩu" />,
        } }
      />
      <Stack.Screen
        name="invite-friend"
        options={ {
          header: () => <HeaderScreen title="Giới thiệu bạn bè" />,
        } }
      />
      <Stack.Screen
        name="history-appointment"
        options={ {
          header: () => <HeaderScreen title="Lịch sử đặt khám" />,
        } }
      />
      <Stack.Screen
        name="medical-record"
        options={ {
          header: () => <HeaderScreen title="Bệnh án điện tử" />,
        } }
      />
      <Stack.Screen
        name="member"
        options={ {
          header: () => <HeaderScreen title="Thành viên" />,
        } }
      />
    </Stack>
  );
};

export default AccountLayout;
