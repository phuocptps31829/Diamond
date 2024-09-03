import { Stack } from "expo-router";
import HeaderScreen from "../../components/ui/HeaderScreen";

const AccountLayout = () => {
  return (
    <Stack
      screenOptions={{
        headerStyle: {
          backgroundColor: "#007BBB",
        },
        headerTintColor: "#ffffff",
      }}
    >
      <Stack.Screen
        name="change-password"
        options={{
          header: () => <HeaderScreen title="Thay đổi mật khẩu" />,
        }}
      />
      <Stack.Screen
        name="invite-friend"
        options={{
          header: () => <HeaderScreen title="Giới thiệu bạn bè" />,
        }}
      />
    </Stack>
  );
};

export default AccountLayout;
