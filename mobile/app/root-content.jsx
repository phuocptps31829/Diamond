import { useEffect } from "react";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { Audio } from "expo-av";
import HeaderScreen from "../components/ui/HeaderScreen";
import { useSocket } from "../hooks/useSocket";
import { useSelector } from "react-redux";
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;
import ToastUI from "../components/ui/Toast";


export default function RootContent() {
  const router = useRouter();
  const profile = useSelector((state) => state.profile.profile);
  const { subscribe, socket } = useSocket(SOCKET_URL);

  useEffect(() => {
    if (!socket || !profile) return;
    const playSound = async () => {
      const { sound } = await Audio.Sound.createAsync(
        require("../assets/audio/ui-hello-bells-om-fx-1-00-03.mp3")
      );
      await sound.playAsync();
    };

    const testUpcoming = subscribe("notification", async (data) => {
        const { userIDs, title } = data.data;
        if(userIDs && userIDs.includes(profile._id)) {
            await playSound();
            ToastUI({
                type: "info",
                text1: title,
                text2: "Bạn có một thông báo mới click để xem chi tiết",
                onPress: () => {
                router.push("/notification");
                },
            });
        };
    });


    return () => {
      testUpcoming();
    };
  }, [subscribe, socket, profile]);

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
        name="(auth)"
        options={{
          title: "Auth",
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
        name="Doctor"
        options={{
          title: "Doctor",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        }}
      />
      <Stack.Screen
        name="news"
        options={{
          header: () => <HeaderScreen title="Tin tức và sự kiện" />,
        }}
      />
      <Stack.Screen
        name="detail-news"
        options={{
          header: () => <HeaderScreen title="Y học - Sức khỏe" />,
        }}
      />
      <Stack.Screen
        name="notification"
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
        name="history"
        options={{
          header: () => <HeaderScreen title="Lịch sử đặt khám" />,
        }}
      />
      <Stack.Screen
        name="clinic-system"
        options={{
          header: () => <HeaderScreen title="Hệ thống phòng khám" />,
        }}
      />
      <Stack.Screen
        name="detail-doctor"
        options={{
          header: () => <HeaderScreen title="Thông tin Bác sĩ" />,
        }}
      />
      <Stack.Screen
        name="detail-history"
        options={{
          header: () => <HeaderScreen title="Thông tin Lịch khám" />,
        }}
      />
      <Stack.Screen
        name="account-info"
        options={{
          header: () => <HeaderScreen title="Thông tin tài khoản" />,
        }}
      />
    </Stack>
  );
}
