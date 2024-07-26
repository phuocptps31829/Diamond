import SupportService from "@/components/client/categoryService/";
import ServiceBanner from "../../components/client/categoryService/";
import ServiceContainer from "../../components/client/categoryService/";

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
