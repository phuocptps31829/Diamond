import { useParams } from "react-router-dom";
import DescriptionService from "../../components/client/serviceDetail/DescriptionService";
import MedicalPackageService from "../../components/client/serviceDetail/MedicalPackageService";
import PackageServiceOther from "../../components/client/serviceDetail/PackageServiceOther";
import Rules from "../../components/client/serviceDetail/Rules";
import ServiceDetail from "../../components/client/serviceDetail/ServiceDetail";
import { useQuery } from "@tanstack/react-query";
import {
  getMedicalPackageById,
  getMedicalPackageBySpecialty,
} from "@/services/medicalPackagesApi";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";

// const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

const DetailService = () => {
  useScrollToTop();

  const { id } = useParams();
  const {
    data: medicalPackage,
    error: errorMedicalPackage,
    isLoading: isLoadingMedicalPackage,
  } = useQuery({
    queryKey: ["medical-packages", id],
    queryFn:  () => getMedicalPackageById(id),
  });

  const {
    data: medicalPackageSpecialty,
    error: errorMedicalPackageSpecialty,
    isLoading: isLoadingMedicalPackageSpecialty,
  } = useQuery({
    queryKey: ["medical-packages-specialty", medicalPackage?.specialtyID],
    queryFn: () => getMedicalPackageBySpecialty(medicalPackage?.specialtyID),
    enabled: !!medicalPackage?.specialtyID,
  });

  if (errorMedicalPackage || errorMedicalPackageSpecialty) {
    return <NotFound />;
  }

  return (
    <div className="bg-bg-gray p-8">
      <ServiceDetail
        medicalPackage={medicalPackage}
        isLoading={isLoadingMedicalPackage}
      />
      <DescriptionService
        medicalPackage={medicalPackage}
        isLoading={isLoadingMedicalPackage}
      />
      <MedicalPackageService
        medicalPackage={medicalPackage}
        isLoading={isLoadingMedicalPackage}
      />
      <Rules />
      <PackageServiceOther
        medicalPackageSpecialty={medicalPackageSpecialty}
        isLoading={isLoadingMedicalPackageSpecialty}
      />
    </div>
  );
};

export default DetailService;
