import SupportService from "@/components/client/categoryService/supportService";
import ServiceBanner from "../../components/client/categoryService/serviceBanner";
import ServiceContainer from "../../components/client/categoryService/serviceContainer";

const CategoryService = () => {
  return (
    <div className="bg-bg-gray ">
      <ServiceBanner />
      <SupportService />
      <ServiceContainer />
    </div>
  );
};

export default CategoryService;
