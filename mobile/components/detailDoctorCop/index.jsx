import DoctorInformation from "./DoctorInformation";
import { useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "../../services/doctorsApi";
import Loading from "../ui/Loading";

const DetailDoctor = () => {
  const { id } = useLocalSearchParams();
  const {
    data: dataDoctor = [],
    error: errorDoctor,
    isLoading: isLoadingDoctor,
  } = useQuery({
    queryKey: ["doctor", id],
    queryFn: () => doctorApi.getDoctorById(id),
  });

  if (errorDoctor) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{ errorDoctor?.message }</Text>
      </View>
    );
  }

  return (
    <>
      { isLoadingDoctor && <Loading /> }
      <DoctorInformation doctor={ dataDoctor } />
    </>
  );
};

export default DetailDoctor;