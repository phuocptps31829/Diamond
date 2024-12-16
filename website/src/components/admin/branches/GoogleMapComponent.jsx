import { useEffect, useRef, useState } from "react";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import { Skeleton } from "@/components/ui/Skeleton";

const mapContainerStyle = {
  width: "100%",
  height: "300px",
};

const center = {
  lat: 10.8231,
  lng: 106.6297,
};

const libraries = ["places"];
const key = import.meta.env.VITE_GOOGLE_MAP_KEY;

const GoogleMapComponent = ({ setAddress, register, errors, coordinates }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: key,
    libraries,
  });
  console.log();

  const mapRef = useRef();
  const [marker, setMarker] = useState(null);

  const onLoad = (map) => {
    mapRef.current = map;
    if (coordinates) {
      const location = { lat: coordinates.lat, lng: coordinates.lng };
      map.setCenter(location);
      map.setZoom(17);
      const newMarker = new window.google.maps.Marker({
        position: location,
        map: map,
      });
      setMarker(newMarker);
    }
  };

  const extractAddressComponents = (addressComponents) => {
    let ward = "";
    let district = "";
    let city = "";

    addressComponents.forEach((component) => {
      
      const types = component.types;
      if (types.includes("administrative_area_level_3")) {
        ward = component.long_name;
      } else if (types.includes("administrative_area_level_2")) {
        district = component.long_name;
      } else if (types.includes("administrative_area_level_1")) {
        city = component.long_name;
      }
    });

    return { ward, district, city };
  };
  const removePostalCode = (address) => {
    return address.replace(/\b\d{5}(?:-\d{4})?\b/g, "").trim();
  };
  useEffect(() => {
    if (!isLoaded) return;

    const input = document.getElementById("pac-input");
    const autocomplete = new window.google.maps.places.Autocomplete(input);

    autocomplete.addListener("place_changed", () => {
      const place = autocomplete.getPlace();
      if (place.geometry) {
        const location = place.geometry.location;
        mapRef.current.setCenter(location);
        mapRef.current.setZoom(17);

        if (marker) {
          marker.setPosition(location);
        } else {
          const newMarker = new window.google.maps.Marker({
            position: location,
            map: mapRef.current,
          });
          setMarker(newMarker);
        }

        const { ward, district, city } = extractAddressComponents(
          place.address_components
        );
        const formattedAddress = removePostalCode(
          place.formatted_address || place.name
        );
        const addressDetails = {
          name: formattedAddress,
          lat: location.lat(),
          lng: location.lng(),
          ward,
          district,
          city,
        };
        console.log(addressDetails);
        setAddress(addressDetails);
      }
    });
  }, [isLoaded, marker, setAddress]);

  if (!isLoaded)
    return (
      <div>
        <Skeleton className="mb-4 h-44 w-full" />
      </div>
    );

  return (
    <>
      <input
        id="pac-input"
        type="text"
        placeholder="Tìm kiếm địa điểm"
        className="mb-4 w-full rounded-md border p-2"
        {...register("address", {
          required: "Địa chỉ không được để trống",
        })}
      />
      {errors.address && (
        <p className="text-sm text-red-500">{errors.address.message}</p>
      )}
      <GoogleMap
        mapContainerStyle={mapContainerStyle}
        zoom={16}
        center={center}
        onLoad={onLoad}
      ></GoogleMap>
    </>
  );
};

export default GoogleMapComponent;
