import { Text, View, Platform } from "react-native";
import MapView, { Marker, Callout, Polyline } from "react-native-maps";

const WorldMap = ({
  mapRef,
  dataClinic,
  currentLocation,
  selectedClinicLocation,
}) => {
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

        {/* Vẽ đường nếu có vị trí hiện tại và phòng khám được chọn */}
        {currentLocation && selectedClinicLocation && (
          <Polyline
            coordinates={[
              {
                latitude: currentLocation.latitude,
                longitude: currentLocation.longitude,
              },
              {
                latitude: selectedClinicLocation.latitude,
                longitude: selectedClinicLocation.longitude,
              },
            ]}
            strokeColor="blue"
            strokeWidth={5}
          />
        )}
      </MapView>
    </View>
  );
};

export default WorldMap;
