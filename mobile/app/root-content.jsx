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
        options={ {
          title: "Home pageeees",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        } }
      />
      <Stack.Screen
        name="(tabs)"
        options={ {
          title: "Tab",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        } }
      />
      <Stack.Screen
        name="(auth)"
        options={ {
          title: "Auth",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        } }
      />
      <Stack.Screen
        name="account"
        options={ {
          title: "Account",
          headerShown: false,
          headerStyle: {
            backgroundColor: "blue",
          },
          headerTintColor: "white",
        } }
      />
      <Stack.Screen
        name="news"
        options={ {
          header: () => <HeaderScreen title="Tin Tức Và Sự Kiện" />,
        } }
      />
      <Stack.Screen
        name="detail-news"
        options={ {
          header: () => <HeaderScreen title="Y Học - Sức Khỏe" />,
        } }
      />
      <Stack.Screen
        name="notification"
        options={ {
          header: () => <HeaderScreen title="Thông Báo" />,
        } }
      />
      <Stack.Screen
        name="chat-advice"
        options={ {
          header: () => <HeaderScreen title="Hỗ Trợ Trực Tuyến" />,
        } }
      />
      <Stack.Screen
        name="doctor-ai"
        options={ {
          header: () => <HeaderScreen title="Bác Sĩ AI" />,
        } }
      />
      <Stack.Screen
        name="clinic-system"
        options={ {
          header: () => <HeaderScreen title="Hệ Thống Phòng Khám" />,
        } }
      />
      <Stack.Screen
        name="detail-doctor"
        options={ {
          header: () => <HeaderScreen title="Thông Tin Bác Sĩ" />,
        } }
      />
      <Stack.Screen
        name="account-info"
        options={ {
          header: () => <HeaderScreen title="Thông Tin Tài Khoản" />,
        } }
      />
      <Stack.Screen
        name="booking"
        options={ {
          header: () => <HeaderScreen title="Đặt Lịch Khám Bệnh" />,
        } }
      />
    </Stack>
  );
}
