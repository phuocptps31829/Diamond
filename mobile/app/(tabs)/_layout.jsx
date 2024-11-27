import { Tabs } from "expo-router";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import TabsScreen from "../../components/ui/TabsScreen";

const TabsLayout = () => {
  return (
    <>
      <Tabs
        screenOptions={ {
          tabBarShowLabel: false,
          tabBarActiveTintColor: "#007BBB",
          tabBarInactiveTintColor: "#AEAEAE",
          tabBarStyle: {
            shadowColor: "#000",
            shadowOffset: { width: 0, height: 2 }, // Kích thước bóng đổ
            shadowOpacity: 0.2,
            shadowRadius: 4,
            elevation: 5, // Bóng đổ cho Android
          },
        } }
      >
        <Tabs.Screen
          name="package"
          key="package"
          options={ {
            title: "Package",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsScreen
                icon={
                  <FontAwesome6
                    name="briefcase-medical"
                    size={ 28 }
                    color={ color }
                  />
                }
                color={ color }
                name="Gói khám"
                focused={ focused }
              />
            ),
          } }
        />
        <Tabs.Screen
          name="service"
          key="service"
          options={ {
            title: "Service",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsScreen
                icon={
                  <FontAwesome6 name="kit-medical" size={ 28 } color={ color } />
                }
                color={ color }
                name="Dịch vụ"
                focused={ focused }
              />
            ),
          } }
        />
        <Tabs.Screen
          name="home"
          key="home"
          options={ {
            title: "Home",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsScreen
                icon={ <FontAwesome name="home" size={ 30 } color="white" /> }
                color={ color }
                name="Trang chủ"
                focused={ focused }
              />
            ),
          } }
        />
        <Tabs.Screen
          name="doctor"
          key="doctor"
          options={ {
            title: "Doctor",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsScreen
                icon={
                  <FontAwesome6 name="user-doctor" size={ 28 } color={ color } />
                }
                color={ color }
                name="Bác sĩ"
                focused={ focused }
              />
            ),
          } }
        />
        <Tabs.Screen
          name="account"
          key="account"
          options={ {
            title: "User",
            headerShown: false,
            tabBarIcon: ({ color, focused }) => (
              <TabsScreen
                icon={
                  <FontAwesome name="user-circle-o" size={ 28 } color={ color } />
                }
                color={ color }
                name="Tài khoản"
                focused={ focused }
              />
            ),
          } }
        />
      </Tabs>
    </>
  );
};

export default TabsLayout;
