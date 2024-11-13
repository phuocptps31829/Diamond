import { View, Image } from "react-native";
import { router } from "expo-router";
import { useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";

const Index = () => {
  const storeLocation = async (currentLocation) => {
    try {
      await AsyncStorage.setItem(
        "userLocation",
        JSON.stringify(currentLocation)
      );
    } catch (error) {
      console.error("Failed to save location", error);
    }
  };

  useEffect(() => {
    (async () => {
      const storedLocation = await AsyncStorage.getItem("userLocation");

      if (!storedLocation) {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          console.log("Permission to access location was denied");
          return;
        }

        let currentLocation = await Location.getCurrentPositionAsync({});
        const locationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };

        storeLocation(locationData);
      }

      setTimeout(() => {
        router.replace("/sign-in");
      }, 200);
    })();
  }, []);

  // useEffect(() => {
  //   async function checkAuth() {
  //    const accessToken = await AsyncStorage.getItem("accessToken")
  //    const refreshToken = await AsyncStorage.getItem("refreshToken")
  //    console.log("accessToken", accessToken)
  //   console.log("refreshToken", refreshToken)
  //   }
  //   checkAuth();
  // }, []);

  return (
    <View className="w-full h-full bg-[#41bdff] flex justify-center items-center">
      <Image
        source={require("../assets/images/brandLogo.png")}
        className="w-[335px]"
        resizeMode="contain"
      ></Image>
    </View>
  );
};

export default Index;
