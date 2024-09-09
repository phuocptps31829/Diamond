import { Platform, Pressable, View, ActivityIndicator } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MyLocationButton = ({ handleZoomToCurrentLocation, location }) => {
  return (
    <>
      {Platform.OS === "ios" && ( // Chỉ hiển thị nút tùy chỉnh trên iOS
        <Pressable
          disabled={!location}
          onPress={handleZoomToCurrentLocation}
          className="absolute top-5 right-5 bg-white w-[60px] h-[60px] flex justify-center items-center shadow-sm rounded-full"
        >
          <View className="flex-row gap-2 font-semibold justify-center items-center">
            {location ? (
              <FontAwesome6 name="location-crosshairs" size={30} color="gray" />
            ) : (
              <ActivityIndicator size="small" color="gray" />
            )}
          </View>
        </Pressable>
      )}
    </>
  );
};

export default MyLocationButton;
