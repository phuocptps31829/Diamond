import { useQuery } from "@tanstack/react-query";
import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListService from "./ListService";
import { specialtiesApi } from "../../services/specialtiesApi";
import { servicesApi } from "../../services/servicesApi";
import Loading from "../ui/Loading";

const Service = () => {
  const {
    data: dataSpecialty = [],
    error: errorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtiesApi.getAllSpecialties,
  });

  const {
    data: dataService = [],
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getAllServices,
  });

  if (errorSpecialty || errorService) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{errorSpecialty?.message}</Text>
      </View>
    );
  }

  return (
    <>
      {(isLoadingSpecialty || isLoadingService) && <Loading />}
      <HeaderTab title="Dịch vụ" />
      <ListSpecialty listSpecialty={dataSpecialty} />
      <ListService listServices={dataService} />
    </>
  );
};

export default Service;
