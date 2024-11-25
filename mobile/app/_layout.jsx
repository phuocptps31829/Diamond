import { useEffect } from "react";
import { Text, Pressable, View } from "react-native";
import { useRouter } from "expo-router";
import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import HeaderScreen from "../components/ui/HeaderScreen";
import Toast from "react-native-toast-message";
import { useSocket } from "../hooks/useSocket";
const SOCKET_URL = process.env.EXPO_PUBLIC_SOCKET_URL;
import ToastUI from "../components/ui/Toast";
import FontAwesome from "@expo/vector-icons/FontAwesome";

const queryClient = new QueryClient({
  keepPreviousData: true,
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: false,
    },
  },
});

const toastConfig = {
  info: ({ text1, text2, onPress }) => (
    <Pressable
      onPress={onPress}
      className="bg-white p-3 rounded-lg flex flex-row items-center py-4"
    >
      <FontAwesome name="bell" size={25} color="#007BBB" />
      <View className="ml-3">
        <Text className="text-black font-semibold text-[15px] mb-1">
          {text1}
        </Text>
        <Text className="text-gray-600 text-[13px]">{text2}</Text>
      </View>
    </Pressable>
  ),
};

export default function RootLayout() {
  const router = useRouter();
  const { subscribe, socket } = useSocket(SOCKET_URL);

  useEffect(() => {
    if (!socket) return;

    const testUpcoming = subscribe("notification", (data) => {
      console.log("this is new notification", data);
      ToastUI({
        type: "info",
        text1: data.data.title,
        text2: "Bạn có một thông báo mới click để xem chi tiết",
        onPress: () => {
          router.push("/notification");
        },
      });
    });

    return () => {
      testUpcoming();
    };
  }, [subscribe, socket]);

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
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
        </PaperProvider>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </Provider>
  );
}
