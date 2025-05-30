import { useEffect, useState } from "react";
import { useLoadScript } from "@react-google-maps/api";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { Link } from "react-router-dom";
// import { AiOutlineLoading3Quarters } from "react-icons/ai";
const libraries = ["places"];
const keyGoogleMaps = import.meta.env.VITE_GOOGLE_MAP_KEY;
const GomapDistance = ({ hospitalCoordinates, className, room }) => {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: keyGoogleMaps,
    libraries,
  });

  const [distance, setDistance] = useState(null);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!isLoaded || !hospitalCoordinates) return;
    console.log(hospitalCoordinates);

    const calculateDistance = (patientCoordinates) => {
      const service = new window.google.maps.DistanceMatrixService();
      service.getDistanceMatrix(
        {
          origins: [patientCoordinates],
          destinations: [hospitalCoordinates],
          travelMode: window.google.maps.TravelMode.DRIVING,
        },
        (response, status) => {
          if (status === "OK" && response.rows[0].elements[0].status === "OK") {
            const distanceInMeters =
              response.rows[0].elements[0].distance.value;
            const distanceInKm = distanceInMeters / 1000;
            setDistance(distanceInKm);
          } else {
            setError("Không thể tính khoảng cách.");
          }
        }
      );
    };

    const getPatientLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            const patientCoordinates = {
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            };
            calculateDistance(patientCoordinates);
          },
          () => {
            setError("Không thể lấy vị trí của bạn.");
          }
        );
      } else {
        setError("Trình duyệt của bạn không hỗ trợ Geolocation.");
      }
    };

    getPatientLocation();

  }, [isLoaded, hospitalCoordinates, room]);

  if (!room || !isLoaded || !hospitalCoordinates || distance === null)
    return (
      <div>
    </div>
    );
  const googleMapsUrl = `https://www.google.com/maps/search/?api=1&query=${hospitalCoordinates?.lat},${hospitalCoordinates?.lng}`;
  return (
    <div className={ className }>
      { distance !== null ? (
        <div className="flex items-center gap-4">
          { error && <p className="text-sm text-red-500">{ error }</p> }
          <p className="text-sm">{ distance.toFixed(2) } km</p>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger type="button">
                <Link to={ googleMapsUrl } target="_blank">
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="32"
                    height="32"
                    viewBox="0 0 32 32"
                  >
                    <path
                      fill="#4285f4"
                      d="M25.3959 8.8345l-.0039.0038c.0837.2319.1617.4667.2285.7062C25.5527 9.3047 25.48 9.067 25.3959 8.8345zM16 2.23L8.929 5.1593 12.9916 9.222A4.2486 4.2486 0 0 1 19.0208 15.21L25 9.23l.392-.392A9.9872 9.9872 0 0 0 16 2.23z"
                    ></path>
                    <path
                      fill="#ffba00"
                      d="M16,16.4733A4.25,4.25,0,0,1,12.9916,9.222L8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23c0,4.4057,2.2651,7.1668,4.93,10,.1787.1828.3274.3852.4959.5746l7.5608-7.5609A4.2341,4.2341,0,0,1,16,16.4733Z"
                    ></path>
                    <path
                      fill="#0066da"
                      d="M16,2.23a10,10,0,0,0-10,10,11.0918,11.0918,0,0,0,.5454,3.4546l12.8505-12.85A9.9563,9.9563,0,0,0,16,2.23Z"
                    ></path>
                    <path
                      fill="#00ac47"
                      d="M16.9011,29.12a21.83,21.83,0,0,1,4.032-6.8966C23.7976,19.3129,26,16.636,26,12.23a9.9585,9.9585,0,0,0-.6041-3.3958l-13.97,13.97A18.0436,18.0436,0,0,1,15.0173,29.08.9975.9975,0,0,0,16.9011,29.12Z"
                    ></path>
                    <path
                      fill="#0066da"
                      d="M10.93 22.23c.1787.1828.3274.3852.4959.5746h0C11.257 22.6155 11.1083 22.4131 10.93 22.23zM7.207 7.4637A9.9357 9.9357 0 0 0 6.45 9.2566 9.9429 9.9429 0 0 1 7.207 7.4637zM6.45 9.2566a9.9522 9.9522 0 0 0-.398 1.9513A9.9537 9.9537 0 0 1 6.45 9.2566z"
                      opacity=".5"
                    ></path>
                    <path
                      fill="#fff"
                      d="M15.1957 29.3989c.02.0248.0445.0422.0664.0644C15.24 29.4411 15.2156 29.4236 15.1957 29.3989zM15.7874 29.7429l.04.0066zM13.6216 25.9269c-.0371-.067-.0679-.1382-.1059-.2047C13.5533 25.789 13.5849 25.86 13.6216 25.9269zM15.0173 29.08q-.3069-.9036-.6906-1.7566C14.5793 27.8937 14.8127 28.4771 15.0173 29.08zM15.5269 29.6563c-.0229-.0112-.0463-.0207-.0684-.0338C15.4809 29.6356 15.5036 29.6452 15.5269 29.6563zM19.7117 23.7529c-.249.3474-.4679.7125-.6927 1.0741C19.2431 24.465 19.4633 24.1006 19.7117 23.7529z"
                    ></path>
                    <polygon
                      fill="#fff"
                      points="23.322 19.553 23.322 19.553 23.322 19.553 23.322 19.553"
                    ></polygon>
                    <path
                      fill="#fff"
                      d="M17.0468 28.774h0q.3516-.887.7561-1.7428C17.5316 27.6006 17.2812 28.1826 17.0468 28.774zM18.68 25.3584c-.2879.4957-.55 1.0068-.8 1.5242C18.13 26.3647 18.3931 25.8547 18.68 25.3584z"
                    ></path>
                    <path
                      fill="#ea4435"
                      d="M8.929,5.1593A9.9683,9.9683,0,0,0,6,12.23a11.0918,11.0918,0,0,0,.5454,3.4546L13,9.23Z"
                    ></path>
                  </svg>
                </Link>
              </TooltipTrigger>
              <TooltipContent>
                <Link to={ googleMapsUrl } target="_blank">
                  <p>Vị trí của bạn tới bệnh viện</p>
                </Link>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
        </div>
      ) : (
      <div></div>
      ) }
    </div>
  );
};

export default GomapDistance;
