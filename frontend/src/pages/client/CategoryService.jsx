import SupportService from "@/components/client/categoryService/SupportService";
import ServiceBanner from "../../components/client/categoryService/ServiceBanner";
import ServiceContainer from "../../components/client/categoryService/ServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";

const CategoryService = () => {
  useScrollToTop();

  return (
    <div className="bg-bg-gray">
      <ServiceBanner />
      <SupportService />
      <ServiceContainer />
    </div>
  );
};

export default CategoryService;
