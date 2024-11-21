import { useRef, useState, useEffect } from "react";
import WorldMap from "./MapView";
import Clinics from "./Clinics";
import GoThereButton from "./GoThereButton";
import MyLocationButton from "./MyLocationButton";
import { Platform, Linking } from "react-native";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { getDistance } from "geolib";

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

const ClinicMapSystem = () => {
  const mapRef = useRef(null);
  const [location, setLocation] = useState(null);
  const [region, setRegion] = useState(dataClinic[0].location);
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
          latitude: dataClinic[0].location.latitude,
          longitude: dataClinic[0].location.longitude,
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
    mapRef.current.animateToRegion(dataClinic[index].location, 2000);
    setRegion(dataClinic[index].location);
    setActiveIndex(index);

    if (location) {
      const distance = getDistance(
        {
          latitude: location.latitude,
          longitude: location.longitude,
        },
        {
          latitude: dataClinic[index].location.latitude,
          longitude: dataClinic[index].location.longitude,
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
