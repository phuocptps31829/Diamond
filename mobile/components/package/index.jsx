import { useQuery } from "@tanstack/react-query";
import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListPackage from "./ListPackage";
import { specialtiesApi } from "../../services/specialtiesApi";
import { packagesApi } from "../../services/packagesApi";
import Loading from "../ui/Loading";

const Package = () => {
  const {
    data: dataSpecialty = [],
    error: errorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtiesApi.getAllSpecialties,
  });

  const {
    data: dataPackage = [],
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: packagesApi.getAllPackages,
  });

  if (errorSpecialty || errorPackage) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>{errorPackage?.message || errorSpecialty?.message}</Text>
      </View>
    );
  }

  return (
    <>
      {isLoadingSpecialty || (isLoadingPackage && <Loading />)}
      <HeaderTab title="Gói dịch vụ" />
      <ListSpecialty listSpecialty={dataSpecialty} />
      <ListPackage listPackages={dataPackage} />
    </>
  );
};

export default Package;
