import React from "react";
import { Stack, useLocalSearchParams } from "expo-router";
import { useQuery } from "@tanstack/react-query";

import HeaderScreen from "../../components/ui/HeaderScreen";
import Loading from "../../components/ui/Loading";
import NotFound from "../../components/ui/NotFound";
import DetailProduct from "../../components/detailProduct";
import { servicesApi } from "../../services/servicesApi";
import Error from "../../components/ui/Error";

const DetailServiceScreen = () => {
  const { id } = useLocalSearchParams();
  const {
    data: serviceData,
    isError,
    isLoading,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => servicesApi.getServiceByID(id),
  });

  return (
    <>
      <Stack.Screen
        options={ {
          header: () => (
            <HeaderScreen
              title={ serviceData?.name || (!isLoading && "Không tìm thấy") }
              titleStyle={ {
                maxWidth: 200,
                overflow: "hidden",
                whiteSpace: "nowrap",
                textOverflow: "ellipsis",
              } }
            />
          ),
        } }
      />
      { isError ? (
        <Error />
      ) : !isLoading && !serviceData ? (
        <NotFound />
      ) : isLoading ? (
        <Loading />
      ) : (
        <DetailProduct data={ serviceData } />
      ) }
    </>
  );
};

export default DetailServiceScreen;
