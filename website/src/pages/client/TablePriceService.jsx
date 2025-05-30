import { useQuery } from "@tanstack/react-query";
import ListServiceBanner from "../../components/client/priceListService/ListServiceBanner";
import PriceServiceContainer from "../../components/client/priceListService/PriceServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/ui/NotFound";
import { specialtyApi } from "@/services/specialtiesApi";

const TablePriceService = () => {
  useScrollToTop();

  const {
    data: specialtyWithService,
    error: specialtyError,
    isLoading: specialtyLoading,
  } = useQuery({
    queryKey: ["specialtyWithService"],
    queryFn: specialtyApi.getAllSpecialtiesWithServices,
  });

  if (specialtyError) return <NotFound message={ specialtyError.message } />;

  return (
    <div>
      <ListServiceBanner />
      <PriceServiceContainer
        specialtyWithService={ specialtyWithService }
        isLoading={ specialtyLoading }
      />
    </div>
  );
};

export default TablePriceService;
