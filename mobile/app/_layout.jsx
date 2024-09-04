import { Stack } from "expo-router";
import HeaderScreen from "../components/ui/HeaderScreen";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen
        name="index"
        options={{
          title: "Home pageeees",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="(tabs)"
        options={{
          title: "Tab",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="account"
        options={{
          title: "Account",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="News"
        options={{
          header: () => <HeaderScreen title="Tin tức và sự kiện" />,
        }}
      />
      <Stack.Screen
        name="DetailNews"
        options={{
          header: () => <HeaderScreen title="Y học - Sức khỏe" />,
        }}
      />
      <Stack.Screen
        name="Notification"
        options={{
          header: () => <HeaderScreen title="Thông báo" />,
        }}
      />
      <Stack.Screen
        name="doctor-ai"
        options={{
          header: () => <HeaderScreen title="Bác sĩ AI" />,
        }}
      />
      <Stack.Screen
        name="ClinicSystem"
        options={{
          header: () => <HeaderScreen title="Hệ thống phòng khám" />,
        }}
      />
    </Stack>
  );
}
