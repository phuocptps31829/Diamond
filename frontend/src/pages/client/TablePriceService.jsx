import { useQuery } from "@tanstack/react-query";
import ListServiceBanner from "../../components/client/priceListService/ListServiceBanner";
import PriceServiceContainer from "../../components/client/priceListService/PriceServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";

import { getAllSpecialties } from "@/services/specialtiesApi";

const TablePriceService = () => {
  useScrollToTop();

  const {
    data: specialty,
    error: specialtyError,
    isLoading: specialtyLoading,
  } = useQuery({
    queryKey: ["specialty"],
    queryFn: getAllSpecialties,
  });

  if (specialtyError) return <NotFound />;

  return (
    <div>
      <ListServiceBanner />
      <PriceServiceContainer
        specialty={specialty}
        isLoading={specialtyLoading}
      />
    </div>
  );
};

export default TablePriceService;
