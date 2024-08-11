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
import { getServiceById, getServiceBySpecialty } from "@/services/servicesApi";

const DetailService = () => {
  useScrollToTop();

  const { serviceId, packageId } = useParams();
  const id = serviceId || packageId;

  // Fetch medical package if packageId is present
  const {
    data: medicalPackage,
    error: errorMedicalPackage,
    isLoading: isLoadingMedicalPackage,
  } = useQuery({
    queryKey: ["medical-packages", id],
    queryFn: () =>
      packageId ? getMedicalPackageById(id) : Promise.resolve(null),
    enabled: !!packageId,
  });

  // Fetch service if serviceId is present
  const {
    data: service,
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => (serviceId ? getServiceById(id) : Promise.resolve(null)),
    enabled: !!serviceId,
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
  const {
    data: serviceSpecialty,
    error: errorServiceSpecialty,
    isLoading: isLoadingServiceSpecialty,
  } = useQuery({
    queryKey: ["service-specialty", service?.specialtyID],
    queryFn: () => getServiceBySpecialty(service?.specialtyID),
    enabled: !!service?.specialtyID,
  });

  if (errorMedicalPackage || errorMedicalPackageSpecialty || errorService || errorServiceSpecialty) {
    return <NotFound />;
  }

  const contentToRender = service || medicalPackage;

  return (
    <div className="bg-bg-gray p-8">
      {contentToRender && (
        <>
          <ServiceDetail
            medicalPackage={medicalPackage}
            service={service}
            isLoading={isLoadingMedicalPackage || isLoadingService}
          />
          <DescriptionService
            medicalPackage={medicalPackage}
            service={service}
            isLoading={isLoadingMedicalPackage || isLoadingService}
          />
          {!service && (
            <MedicalPackageService
              medicalPackage={medicalPackage}
              service={service}
              isLoading={isLoadingMedicalPackage || isLoadingService}
            />
          )}

          <Rules />
          <PackageServiceOther
            serviceSpecialty={serviceSpecialty}
            medicalPackageSpecialty={medicalPackageSpecialty}
            isLoading={isLoadingMedicalPackageSpecialty || isLoadingServiceSpecialty}
          />
        </>
      )}
      {!contentToRender && !isLoadingMedicalPackage && !isLoadingService && (
        <NotFound />
      )}
    </div>
  );
};

export default DetailService;
