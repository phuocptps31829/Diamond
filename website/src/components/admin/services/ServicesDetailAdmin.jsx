import { useParams } from "react-router-dom";
import ServiceDetail from "./detail/ServiceDetail";
import DescriptionService from "./detail/DescriptionService";
import { serviceApi } from "@/services/servicesApi";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
import Rules from "./detail/Rules";

const ServicesDetailAdmin = () => {
  const { id } = useParams();
  const {
    data: service,
    error: errorService,
    isLoading: isLoadingService,
  } = useQuery({
    queryKey: ["service", id],
    queryFn: () => serviceApi.getServiceById(id),

    enabled: !!id,
  });
  if (errorService) return <NotFound />;
  return (
    <div className="rounded-xl bg-bg-gray p-10 border-dashed border-2 border-primary-500">
      <ServiceDetail service={service} isLoading={isLoadingService} />
      <DescriptionService service={service} isLoading={isLoadingService} />
      <Rules />
    </div>
  );
};

export default ServicesDetailAdmin;
