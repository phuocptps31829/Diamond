import { View, Text, Pressable } from "react-native";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { store } from "../store";
import { Provider } from "react-redux";
import { Provider as PaperProvider } from "react-native-paper";
import Toast from "react-native-toast-message";
import RootContent from "./root-content";
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
      className="bg-white p-3 rounded-lg flex flex-row items-center py-4 shadow-md"
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
 

  return (
    <Provider store={store}>
      <QueryClientProvider client={queryClient}>
        <PaperProvider>
          <RootContent />
        </PaperProvider>
        <Toast config={toastConfig} />
      </QueryClientProvider>
    </Provider>
  );
}
