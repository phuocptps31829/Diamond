import { Stack } from "expo-router";

export default function RootLayout() {
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
    </Stack>
  );
}
