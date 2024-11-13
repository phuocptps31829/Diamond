import { Text, View } from "react-native";
import { useQuery } from "@tanstack/react-query";
import HeaderTab from "../ui/HeaderTabScreen";
import ListDoctors from "./ListDoctors";
import { doctorApi } from "../../services/doctorsApi";
import Loading from "../ui/Loading";

const Doctor = () => {
  const {
    data: dataDoctors = [],
    error: errorDoctors,
    isLoading: isLoadingDoctors,
  } = useQuery({
    queryKey: ["Doctors"],
    queryFn: doctorApi.getAllDoctors,
  });

  if (errorDoctors) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{errorDoctors?.message}</Text>
      </View>
    );
  }

  return (
    <>
      {isLoadingDoctors && <Loading />}
      <HeaderTab title="Đội ngũ Bác sĩ" />
      <ListDoctors listDoctors={dataDoctors} />
    </>
  );
};

export default Doctor;
