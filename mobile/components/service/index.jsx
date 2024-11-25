import { useState, useEffect, useCallback } from "react";
import { View, Text } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useLocalSearchParams } from "expo-router"
import { useQuery } from "@tanstack/react-query";
import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListService from "./ListService";
import { specialtiesApi } from "../../services/specialtiesApi";
import { servicesApi } from "../../services/servicesApi";
import Loading from "../ui/Loading";

const Service = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("0");
  const [dataService, setDataService] = useState([]);
  const { id_specialty } = useLocalSearchParams();

  const handleSelectSpecialty = (id) => {
    setSelectedSpecialty(id);
  }

  useFocusEffect(
    useCallback(() => {
      setSelectedSpecialty(id_specialty || "0");
    }, [id_specialty])
  );

  const {
    data: dataSpecialty = [],
    error: errorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtiesApi.getAllSpecialties,
  });

  const {
    data: serviceAll = [],
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getAllServices,
  });

  useEffect(() => {
    if (!isLoadingService) {
      if (selectedSpecialty === "0") {
        setDataService(serviceAll);
      } else {
        const filterPackage = serviceAll.filter((item) => item.specialty._id === selectedSpecialty);
        setDataService(filterPackage);
      }
    }
  }, [selectedSpecialty, serviceAll]);

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
      <ListSpecialty listSpecialty={dataSpecialty} selectedSpecialty={selectedSpecialty} handleSelectSpecialty={handleSelectSpecialty} />
      <ListService listServices={dataService} selectedSpecialty={selectedSpecialty} />
    </>
  );
};

export default Service;
