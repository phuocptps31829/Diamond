import { Text, View, Platform } from "react-native";
import MapView, { Marker, Callout } from "react-native-maps";

const WorldMap = ({ mapRef, dataClinic }) => {
  return (
    <View className="flex-1">
      <MapView
        ref={mapRef}
        className="w-full h-full"
        initialRegion={dataClinic[0].location}
        showsUserLocation
        showsScale
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
  );
};

export default WorldMap;
