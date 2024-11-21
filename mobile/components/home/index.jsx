import { ScrollView, Text, View } from "react-native";
import { useState, useEffect } from "react";
import Header from "./Header";
import News from "./News";
import OutstandingServices from "./OutstandingServices";
import OutstandingPackages from "./OutstandingPackages";
import HeaderScroll from "./HeaderScroll";
import Specialty from "./Specialty";
import { useQuery } from "@tanstack/react-query";
import { newsApi } from "../../services/newsApi";
import { servicesApi } from "../../services/servicesApi";
import { packagesApi } from "../../services/packagesApi";
import { specialtiesApi } from "../../services/specialtiesApi";
import Loading from "../ui/Loading";

const Home = () => {
  const [showView, setShowView] = useState(false);

  const handleScroll = (event) => {
    const scrollY = event.nativeEvent.contentOffset.y;
    if (scrollY > 300) {
      setShowView(true);
    } else {
      setShowView(false);
    }
  };

  const {
    data: dataNews = [],
    error: errorNews,
    isLoading: isLoadingNews,
  } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.getAllNews,
  });

  const {
    data: dataService = [],
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["services"],
    queryFn: servicesApi.getAllServices,
  });

  const {
    data: dataPackage = [],
    error: errorPackage,
    isLoading: isLoadingPackage,
  } = useQuery({
    queryKey: ["packages"],
    queryFn: packagesApi.getAllPackages,
  });

  const {
    data: dataSpecialty = [],
    error: errorSpecialty,
    isLoading: isLoadingSpecialty,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtiesApi.getAllSpecialties,
  });

  if (errorNews || errorService || errorPackage || errorSpecialty) {
    return (
      <View className="w-full h-full flex justify-center items-center">
        <Text>
          {errorNews?.message ||
            errorService?.message ||
            errorPackage?.message ||
            errorSpecialty?.message
          }
        </Text>
      </View>
    );
  }

  return (
    <>
      {(isLoadingNews ||
        isLoadingService ||
        isLoadingPackage ||
        isLoadingSpecialty) && <Loading />}
      <HeaderScroll showView={showView} />
      <ScrollView
        onScroll={handleScroll}
        scrollEventThrottle={16}
        className="bg-[#E8F2F7] relative"
        showsVerticalScrollIndicator={false}
      >
        <Header />
        <OutstandingServices listServices={dataService} />
        <OutstandingPackages listPackages={dataPackage} />
        <Specialty listSpecialty={dataSpecialty} />
        <News listNews={dataNews} />
      </ScrollView>
    </>
  );
};

export default Home;
