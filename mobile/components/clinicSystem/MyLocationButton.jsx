import { Platform, Pressable, View, ActivityIndicator } from "react-native";
import FontAwesome6 from "@expo/vector-icons/FontAwesome6";

const MyLocationButton = ({ handleZoomToCurrentLocation, location }) => {
  return (
    <>
      {Platform.OS === "ios" && ( // Chỉ hiển thị nút tùy chỉnh trên iOS
        <Pressable
          disabled={!location}
          onPress={handleZoomToCurrentLocation}
          className="absolute top-[495px] right-[10px] bg-primary-700 z-50 w-[50px] h-[50px] flex justify-center items-center shadow-sm rounded-full"
        >
          <View className="flex-row gap-2 font-semibold justify-center items-center">
            {location ? (
              <FontAwesome6 name="location-crosshairs" size={23} color="white" />
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
