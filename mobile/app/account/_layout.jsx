import { Stack } from "expo-router";
import HeaderScreen from "../../components/ui/HeaderScreen";

const AccountLayout = () => {
    return (
        <Stack screenOptions={ {
            headerStyle: {
                backgroundColor: "#007BBB",
            },
            headerTintColor: "#ffffff"
        } }>
            <Stack.Screen
                name="change-password"
                options={ {
                    headerTitle: "Thay đổi mật khẩu",
                    header: () => <HeaderScreen />
                } }
            />
            <Stack.Screen
                name="invite-friend"
                options={ {
                    headerTitle: "Giới thiệu bạn bè",
                } }
            />
        </Stack>
    );
};

export default AccountLayout;