import { useState, useEffect, useCallback } from "react";
import { Text, View } from "react-native";
import { useFocusEffect } from "@react-navigation/native";
import { useQuery } from "@tanstack/react-query";
import { useLocalSearchParams } from "expo-router"
import HeaderTab from "../ui/HeaderTabScreen";
import ListSpecialty from "./ListSpecialty";
import ListPackage from "./ListPackage";
import { specialtiesApi } from "../../services/specialtiesApi";
import { packagesApi } from "../../services/packagesApi";
import Loading from "../ui/Loading";

const Package = () => {
  const [selectedSpecialty, setSelectedSpecialty] = useState("0");
  const [dataPackage, setDataPackage] = useState([]);
  const { id_specialty } = useLocalSearchParams();

  useFocusEffect(
    useCallback(() => {
      console.log("id_specialty", id_specialty);
      setSelectedSpecialty(id_specialty || "0");
    }, [id_specialty])
  );

  const handleSelectSpecialty = (id) => {
    setSelectedSpecialty(id);
  }

  const {
    data: dataSpecialty = [],
    error: errorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtiesApi.getAllSpecialties,
  });

  const {
    data: packageAll = [],
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: packagesApi.getAllPackages,
  });

  useEffect(() => {
    if (!isLoadingPackage) {
      if (selectedSpecialty === "0") {
        setDataPackage(packageAll);
      } else {
        const filterPackage = packageAll.filter((item) => item.specialty._id === selectedSpecialty);
        setDataPackage(filterPackage);
      }
    }
  }, [selectedSpecialty, packageAll]);

  if (errorSpecialty || errorPackage) {
    setDataPackage([]);
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
      <ListSpecialty listSpecialty={dataSpecialty} selectedSpecialty={selectedSpecialty} handleSelectSpecialty={handleSelectSpecialty} />
      <ListPackage listPackages={dataPackage} selectedSpecialty={selectedSpecialty} />
    </>
  );
};

export default Package;
