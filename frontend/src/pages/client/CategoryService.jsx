import SupportService from "@/components/client/categoryService/SupportService";
import ServiceBanner from "../../components/client/categoryService/ServiceBanner";
import useScrollToTop from "@/hooks/useScrollToTop";
import ServicesPage from "@/components/client/categoryService/ServicesPage";

const CategoryService = () => {
  useScrollToTop();

  return (
    <div className="bg-bg-gray">
      <ServiceBanner />
      <SupportService />
      <ServicesPage />
    </div>
  );
};

export default CategoryService;
