import { useRef, useState, useEffect } from "react";
import WorldMap from "./MapView";
import Clinics from "./Clinics";
import GoThereButton from "./GoThereButton";
import MyLocationButton from "./MyLocationButton";
import { Platform, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";
import { useSelector } from "react-redux";

const ClinicMapSystem = () => {
  const dataClinic = useSelector((state) => state.branches.branches);
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(dataClinic[0].coordinates);
  const [activeIndex, setActiveIndex] = useState(0);
  const [km, setKm] = useState(null);

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
      const storedLocation = await AsyncStorage.getItem("userLocation");
      if (storedLocation) {
        setLocation({
          latitude: JSON.parse(storedLocation).latitude,
          longitude: JSON.parse(storedLocation).longitude,
          latitudeDelta: JSON.parse(storedLocation).latitudeDelta,
          longitudeDelta: JSON.parse(storedLocation).longitudeDelta,
        });
      }
    })();
  }, []);

  useEffect(() => {
    if (location) {
      const distance = getDistance(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: dataClinic[0].coordinates.latitude,
          longitude: dataClinic[0].coordinates.longitude,
        }
      );

      const distanceInKm = distance / 1000;
      const roundedDistance = Math.floor(distanceInKm);

      setKm(roundedDistance);
    }
  }, [location]);

  const handleZoomToCurrentLocation = () => {
    if (location) {
      mapRef.current.animateToRegion(location, 2000);
    }
  };

  const handleZoomToClinic = (index) => {
    mapRef.current.animateToRegion(dataClinic[index].coordinates, 2000);
    setRegion(dataClinic[index].coordinates);
    setActiveIndex(index);

    if (location) {
      const distance = getDistance(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: dataClinic[index].coordinates.latitude,
          longitude: dataClinic[index].coordinates.longitude,
        }
      );

      const distanceInKm = distance / 1000;
      const roundedDistance = Math.floor(distanceInKm);

      setKm(roundedDistance);
    }
  };
  return (
    <>
      <WorldMap
        mapRef={mapRef}
        dataClinic={dataClinic}
        currentLocation={location}
        selectedClinicLocation={region}
      />
      <Clinics
        dataClinic={dataClinic}
        activeIndex={activeIndex}
        handleZoomToClinic={handleZoomToClinic}
        km={km}
      />
      <GoThereButton handleGetDirections={handleGetDirections} />
      <MyLocationButton
        location={location}
        handleZoomToCurrentLocation={handleZoomToCurrentLocation}
      />
    </>
  );
};

export default ClinicMapSystem;
