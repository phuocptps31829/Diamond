import SupportService from "@/components/client/categoryService/SupportService";
import ServiceBanner from "../../components/client/categoryService/ServiceBanner";
import ServiceContainer from "../../components/client/categoryService/ServiceContainer";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";
import { useQuery } from "@tanstack/react-query";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
const CategoryService = () => {
  useScrollToTop();
  const {
    data: medicalPackages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["medical-packages"],
    queryFn: () => getAllMedicalPackages(),
  });

  if (error) return <NotFound />;
  return (
    <div className="bg-bg-gray">
      <ServiceBanner />
      <SupportService />
      <ServiceContainer
        medicalPackages={medicalPackages}
        isLoading={isLoading}
      />
    </div>
  );
};

export default CategoryService;
