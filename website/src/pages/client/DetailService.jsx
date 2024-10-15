import { useParams } from "react-router-dom";
import DescriptionService from "../../components/client/serviceDetail/DescriptionService";
import MedicalPackageService from "../../components/client/serviceDetail/MedicalPackageService";
import PackageServiceOther from "../../components/client/serviceDetail/PackageServiceOther";
import Rules from "../../components/client/serviceDetail/Rules";
import ServiceDetail from "../../components/client/serviceDetail/ServiceDetail";
import { useQuery } from "@tanstack/react-query";
import useScrollToTop from "@/hooks/useScrollToTop";
import NotFound from "@/components/client/notFound";
import { medicalPackageApi } from "@/services/medicalPackagesApi";
import { serviceApi } from "@/services/servicesApi";

const DetailService = () => {
  useScrollToTop();

  const { serviceSlug, packageSlug } = useParams();
  const slug = serviceSlug || packageSlug;

  // Fetch medical package if packageId is present
  const {
    data: medicalPackage,
    error: errorMedicalPackage,
    isLoading: isLoadingMedicalPackage,
  } = useQuery({
    queryKey: ["medical-packages", slug],
    queryFn: () => medicalPackageApi.getMedicalPackageBySlug(packageSlug),
    enabled: !!packageSlug,
  });

  // Fetch service if serviceId is present
  const {
    data: service,
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["service", slug],
    queryFn: () => serviceApi.getServiceBySlug(serviceSlug),
    enabled: !!serviceSlug,
  });

  const {
    data: medicalPackageSpecialty,
    error: errorMedicalPackageSpecialty,
    isLoading: isLoadingMedicalPackageSpecialty,
  } = useQuery({
    queryKey: ["medical-packages-specialty", medicalPackage?.specialtyID],
    queryFn: () => medicalPackageApi.getMedicalPackageBySpecialty(medicalPackage?.specialtyID),
    enabled: !!medicalPackage?.specialtyID,
  });
  const {
    data: serviceSpecialty,
    error: errorServiceSpecialty,
    isLoading: isLoadingServiceSpecialty,
  } = useQuery({
    queryKey: ["service-specialty", service?.specialtyID],
    queryFn: () => serviceApi.getServiceBySpecialty(service?.specialtyID),
    enabled: !!service?.specialtyID,
  });

  if (
    errorMedicalPackage ||
    errorMedicalPackageSpecialty ||
    errorService ||
    errorServiceSpecialty
  ) {
    return <NotFound />;
  }

  const isLoading =
    isLoadingMedicalPackage ||
    isLoadingService ||
    isLoadingMedicalPackageSpecialty ||
    isLoadingServiceSpecialty;

  return (
    <div className="bg-[#E8F2F7] p-8">
      <ServiceDetail
        medicalPackage={ medicalPackage }
        service={ service }
        isLoading={ isLoading }
      />
      <DescriptionService
        medicalPackage={ medicalPackage }
        service={ service }
        isLoading={ isLoading }
      />
      { !service && (
        <MedicalPackageService
          medicalPackage={ medicalPackage }
          service={ service }
          isLoading={ isLoading }
        />
      ) }

      <Rules />
      <PackageServiceOther
        serviceSpecialty={ serviceSpecialty }
        medicalPackageSpecialty={ medicalPackageSpecialty }
        isLoading={ isLoading }
      />
    </div>
  );
};

export default DetailService;
