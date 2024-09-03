import { Text, View, Image } from "react-native";
import { Tabs, Redirect } from "expo-router";

const TabIcon = ({ image, color, name, focused }) => {
  return (
    <View
      className={`${
        name === "Trang chủ" ? "absulute -top-5 gap-2" : "gap-1"
      } flex justify-center items-center pt-5 `}
    >
      <View
        className={`${
          name === "Trang chủ" ? "p-2 rounded-full bg-[#007BBB]" : ""
        } `}
      >
        <Image
          source={{ uri: image }}
          style={{
            tintColor: name === "Trang chủ" ? "#ffff" : color,
          }}
          className={`${name === "Trang chủ" ? " " : "w-8 h-8"} w-8 h-8`}
        />
      </View>
      <Text
        className={`${
          name === "Trang chủ" ? "font-bold text-[12px]" : "text-[11px]"
        } `}
        style={{ color: color }}
      >
        {name}
      </Text>
    </View>
  );
};

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={{
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#007BBB",
          tabBarInactiveTintColor: "#AEAEAE",
          tabBarStyle: {
            shadowColor: "#000", // Màu bóng đổ
            shadowOffset: { width: 0, height: 2 }, // Kích thước bóng đổ
            shadowOpacity: 0.2, // Độ mờ của bóng đổ
            shadowRadius: 4, // Radius của bóng đổ
            elevation: 5, // Bóng đổ cho Android
          },
        }}
      >
        <Tabs.Screen
          name="package"
          options={{
            title: "Package",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                image="https://cdn4.iconfinder.com/data/icons/health-medical-18/64/health_medical-04-512.png"
                color={color}
                name="Gói dịch vụ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="service"
          options={{
            title: "Service",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                image="https://amazinglywellrx.com/wp-content/uploads/2023/07/5507920-1.png"
                color={color}
                name="Dịch vụ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="home"
          options={{
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                image="https://clipart-library.com/new_gallery/674941_home-icon-png-transparent.jpg"
                color={color}
                name="Trang chủ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="doctor"
          options={{
            title: "Doctor",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                image="https://svgsilh.com/png-512/1639328.png"
                color={color}
                name="Bác sĩ"
                focused={focused}
              />
            ),
          }}
        />
        <Tabs.Screen
          name="account"
          options={{
            title: "User",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabIcon
                image="https://pluspng.com/img-png/user-png-icon-file-user-icon-black-01-png-311.png"
                color={color}
                name="Tài khoản"
                focused={focused}
              />
            ),
          }}
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
