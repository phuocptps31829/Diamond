import { Stack } from "expo-router";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from 'react-native-paper';
import HeaderScreen from "../components/ui/HeaderScreen";
import Toast from "react-native-toast-message";

const queryClient = new QueryClient();

export default function RootLayout() {
  return (
    <Provider store={ store }>
      <QueryClientProvider client={ queryClient }>
        <PaperProvider>
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
              name="Doctor"
              options={ {
                title: "Doctor",
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
                header: () => <HeaderScreen title="Tin tức và sự kiện" />,
              } }
            />
            <Stack.Screen
              name="detail-news"
              options={ {
                header: () => <HeaderScreen title="Y học - Sức khỏe" />,
              } }
            />
            <Stack.Screen
              name="notification"
              options={ {
                header: () => <HeaderScreen title="Thông báo" />,
              } }
            />
            <Stack.Screen
              name="doctor-ai"
              options={ {
                header: () => <HeaderScreen title="Bác sĩ AI" />,
              } }
            />
            <Stack.Screen
              name="history"
              options={ {
                header: () => <HeaderScreen title="Lịch sử đặt khám" />,
              } }
            />
            <Stack.Screen
              name="clinic-system"
              options={ {
                header: () => <HeaderScreen title="Hệ thống phòng khám" />,
              } }
            />
            <Stack.Screen
              name="detail-doctor"
              options={ {
                header: () => <HeaderScreen title="Thông tin Bác sĩ" />,
              } }
            />
            <Stack.Screen
              name="detail-history"
              options={ {
                header: () => <HeaderScreen title="Thông tin Lịch khám" />,
              } }
            />
          </Stack>
        </PaperProvider>
        <Toast />
      </QueryClientProvider>
    </Provider>
  );
}
