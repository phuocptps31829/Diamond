import { useParams } from 'react-router-dom';
import DescriptionService from '../../components/client/serviceDetail/DescriptionService';
import MedicalPackageService from '../../components/client/serviceDetail/MedicalPackageService';
import PackageServiceOther from '../../components/client/serviceDetail/PackageServiceOther';
import Rules from '../../components/client/serviceDetail/Rules';
import ServiceDetail from '../../components/client/serviceDetail/ServiceDetail';
import { useQuery } from '@tanstack/react-query';
import useScrollToTop from '@/hooks/useScrollToTop';
import NotFound from '@/components/ui/NotFound';
import { medicalPackageApi } from '@/services/medicalPackagesApi';
import { serviceApi } from '@/services/servicesApi';

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
    queryKey: ['medical-packages-specialty', medicalPackage?.specialty._id],
    queryFn: () =>
      medicalPackageApi.getMedicalPackageBySpecialty(medicalPackage?.specialty._id),
    enabled: !!medicalPackage?.specialty._id,
  });
  const {
    data: serviceSpecialty,
    error: errorServiceSpecialty,
    isLoading: isLoadingServiceSpecialty,
  } = useQuery({
    queryKey: ['service-specialty', service?.specialty._id],
    queryFn: () => serviceApi.getServiceBySpecialty(service?.specialty._id),
    enabled: !!service?.specialty._id,
  });
  console.log(serviceSpecialty, medicalPackageSpecialty);

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
    <div className="bg-[#E8F2F7] py-8">
      <ServiceDetail
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
      <DescriptionService
        medicalPackage={ medicalPackage }
        service={ service }
        isLoading={ isLoading }
      />

      <Rules />
      <PackageServiceOther
        serviceSpecialty={ serviceSpecialty }
        medicalPackageSpecialty={ medicalPackageSpecialty }
        isLoading={ isLoading }
        currentSlug={ slug }
      />
    </div>
  );
};

export default DetailService;
