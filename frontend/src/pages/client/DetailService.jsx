import { useParams } from "react-router-dom";
import DescriptionService from "../../components/client/serviceDetail/DescriptionService";
import MedicalPackageService from "../../components/client/serviceDetail/MedicalPackageService";
import PackageServiceOther from "../../components/client/serviceDetail/PackageServiceOther";
import Rules from "../../components/client/serviceDetail/Rules";
import ServiceDetail from "../../components/client/serviceDetail/ServiceDetail";
import { useQuery } from "@tanstack/react-query";
import { getMedicalPackageById } from "@/services/medicalPackagesApi";
import Loading from "@/components/ui/Loading";

const DetailService = () => {
  const { id } = useParams();
  const {
    data: medicalPackage,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["medical-packages", id],
    queryFn: () => getMedicalPackageById(id),
  });

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading services</div>;

  return (
    <div className="bg-bg-gray p-8">
      <ServiceDetail medicalPackage={medicalPackage} isLoading={isLoading} />
      <DescriptionService medicalPackage={medicalPackage} />
      <MedicalPackageService medicalPackage={medicalPackage} />
      <Rules medicalPackage={medicalPackage} />
      <PackageServiceOther medicalPackage={medicalPackage} />
    </div>
  );
};

export default DetailService;
