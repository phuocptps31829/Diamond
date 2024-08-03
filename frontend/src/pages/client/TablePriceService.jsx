import ListServiceBanner from "../../components/client/priceListService/ListServiceBanner";
import PriceServiceContainer from "../../components/client/priceListService/PriceServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";
const TablePriceService = () => {
  useScrollToTop();
  return (
    <div>
      <ListServiceBanner />
      <PriceServiceContainer />
    </div>
  );
};

export default TablePriceService;
