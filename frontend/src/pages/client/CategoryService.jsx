import SupportService from "@/components/client/categoryService/SupportService";
import ServiceBanner from "../../components/client/categoryService/ServiceBanner";
import ServiceContainer from "../../components/client/categoryService/ServiceContainer";

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
