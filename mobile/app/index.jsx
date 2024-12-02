import { View, Image, ActivityIndicator } from "react-native";
import { router } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { authApi } from "../services/authApi";
import { branchApi } from "../services/branchesApi";
import { useEffect, useState } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";
import * as Location from "expo-location";
import { useDispatch } from "react-redux";
import { setProfile } from "../store/profile/profileSlice";
import { setBranches } from "../store/branches/branchesSlice";

const Index = () => {
  const dispatch = useDispatch();
  const [loading, setLoading] = useState(false);
  const [locationReady, setLocationReady] = useState(false);
  const [authReady, setAuthReady] = useState(false);
  const { data, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
    enabled: authReady,
  });

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
    setLoading(true);
    const handleLocation = async () => {
      try {
        let { status } = await Location.requestForegroundPermissionsAsync();
        if (status !== "granted") {
          return;
        }
        let currentLocation = await Location.getCurrentPositionAsync({});
        const locationData = {
          latitude: currentLocation.coords.latitude,
          longitude: currentLocation.coords.longitude,
          latitudeDelta: 0.01,
          longitudeDelta: 0.01,
        };
        await storeLocation(locationData);
        const branchesData = await branchApi.getAllBranches();
        const normalizedData = branchesData.map((branch) => ({
          ...branch,
          coordinates: {
            latitude: branch.coordinates.lat, 
            longitude: branch.coordinates.lng, 
            latitudeDelta: 0.0014, 
            longitudeDelta: 0.0008,
          },
        }));
        dispatch(setBranches(normalizedData));
        setLocationReady(true);
      } catch (error) {
        console.error("Error in handleLocation:", error);
      } finally {
        setLoading(false);
      }
    };

    handleLocation();
  }, []);

  useEffect(() => {
    if (locationReady) {
      const checkAuth = async () => {
        const accessToken = await AsyncStorage.getItem("accessToken");
        const refreshToken = await AsyncStorage.getItem("refreshToken");

        if (accessToken && refreshToken) {
          setAuthReady(true);
        } else {
          router.replace("/sign-in");
        }

        setLoading(false);
      };

      checkAuth();
    }
  }, [locationReady]);
  useEffect(() => {
    const handleAuth = async () => {
      if (authReady && !isLoading) {
        if (data) {
          dispatch(setProfile(data?.data));
          router.replace("/home");
        } else {
          await AsyncStorage.removeItem("accessToken");
          await AsyncStorage.removeItem("refreshToken");
          router.replace("/sign-in");
        }
      }
    };

    handleAuth();
  }, [authReady, data]);

  return (
    <View className="w-full h-full bg-[#41bdff] flex flex-col justify-center items-center">
      <Image
        source={require("../assets/images/logoWhite.png")}
        className="w-[335px]"
        resizeMode="contain"
      />
      {(loading || isLoading) && (
        <ActivityIndicator size="large" color="#fff" />
      )}
    </View>
  );
};

export default Index;
