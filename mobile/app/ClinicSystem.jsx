import React, { useRef, useState, useEffect } from "react";
import { View, Pressable, Platform, Text, Image, Linking } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";
import * as Location from "expo-location";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";
import Entypo from "@expo/vector-icons/Entypo";

const dataClinic = [
  {
    image:
      "https://img.ykhoadiamond.com/Uploads/Content/06032023/bd990b33-3f52-4848-9a4b-56b68abf79cf.jpg",
    title: "Phòng khám",
    name: "Đa khoa Diamond",
    address: "179-181 Võ Thị Sáu, P.Võ Thị Sáu, Q.3, HCM",
    phone: "091.8686.067",
    location: {
      latitude: 10.7822,
      longitude: 106.6862,
      latitudeDelta: 0.0014,
      longitudeDelta: 0.0008,
    },
  },
  {
    image:
      "https://img.ykhoadiamond.com/Uploads/Content/06032023/67fd9a5a-9a79-4943-9a67-9c4677932cbe.jpg",
    title: "Phòng khám",
    name: "Đa khoa 179",
    address: "27 Nguyễn Thị Minh Khai, P.Bến Thành, Q.1, HCM",
    phone: "091.8686.067",
    location: {
      latitude: 10.7821,
      longitude: 106.6995,
      latitudeDelta: 0.0014,
      longitudeDelta: 0.0008,
    },
  },
];

export default function App() {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(dataClinic[0].location);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleGetDirections = () => {
    const url = Platform.select({
      ios: `maps:0,0?q=${region.latitude},${region.longitude}`,
      android: `google.navigation:q=${region.latitude},${region.longitude}`,
    });

    Linking.openURL(url).catch((err) =>
      console.error("An error occurred", err)
    );
  };

  useEffect(() => {
    (async () => {
      let { status } = await Location.requestForegroundPermissionsAsync();
      if (status !== "granted") {
        console.log("Quyền truy cập vị trí bị từ chối");
        return;
      }

      let currentLocation = await Location.getCurrentPositionAsync({});
      setLocation({
        latitude: currentLocation.coords.latitude,
        longitude: currentLocation.coords.longitude,
        latitudeDelta: 0.01,
        longitudeDelta: 0.01,
      });
    })();
  }, []);

  const handleZoomToCurrentLocation = () => {
    if (location) {
      mapRef.current.animateToRegion(location, 2000);
    }
  };

  const handleZoomToClinic = (index) => {
    mapRef.current.animateToRegion(dataClinic[index].location, 2000);
    setRegion(dataClinic[index].location);
    setActiveIndex(index);
  };

  return (
    <>
      <View className="flex-1">
        <MapView
          ref={mapRef}
          className="w-full h-full"
          initialRegion={dataClinic[0].location}
          showsUserLocation
          showsScale
          pitch={45}
          heading={90}
          showsMyLocationButton={Platform.OS === "android"} // Chỉ hiển thị nút hệ thống trên Android
        >
          {dataClinic.map((item, index) => (
            <Marker coordinate={item.location} key={index}>
              <Callout>
                <View className="p-1 space-y-2">
                  <Text className="font-semibold">
                    {item.title} {item.name}
                  </Text>
                  <Text>{item.address}</Text>
                  <Text>Số điện thoại: {item.phone}</Text>
                </View>
              </Callout>
            </Marker>
          ))}
        </MapView>
      </View>
      <View className="absolute bottom-24 z-50 flex-row gap-3 px-2">
        {dataClinic.map((item, index) => (
          <Pressable
            onPress={() => handleZoomToClinic(index)}
            className={`${
              activeIndex === index ? "border-blue-500" : "border-gray-400"
            } flex-col items-center  bg-white flex-1 rounded-lg border-2 shadow-sm`}
            key={index}
          >
            <Image
              source={{ uri: item.image }}
              className="w-full h-[100px] rounded-lg"
              resizeMode="contain"
            />
            <View className="space-y-1 w-full p-2">
              <Text>{item.title}</Text>
              <Text className="font-semibold">{item.name}</Text>
            </View>
          </Pressable>
        ))}
      </View>
      <View className="absolute bottom-10 inset-x-0 w-full flex justify-center items-center">
        <Pressable
          onPress={handleGetDirections}
          className="bg-blue-500 w-[250px] p-3 rounded-md"
        >
          <View className="flex-row items-center gap-3 justify-center">
            <Text className="text-center text-white font-semibold">
              Chỉ đường đến đấy
            </Text>
            <Entypo name="location" size={20} color="white" />
          </View>
        </Pressable>
      </View>
      {Platform.OS === "ios" && ( // Chỉ hiển thị nút tùy chỉnh trên iOS
        <Pressable
          onPress={handleZoomToCurrentLocation}
          className="absolute top-5 right-5 bg-white w-[60px] h-[60px] flex justify-center items-center shadow-sm rounded-full"
        >
          <View className="flex-row gap-2 font-semibold justify-center items-center">
            <FontAwesome6 name="location-crosshairs" size={30} color="gray" />
          </View>
        </Pressable>
      )}
    </>
  );
}
