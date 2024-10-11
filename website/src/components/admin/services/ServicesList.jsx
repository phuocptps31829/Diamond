import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllServices } from "@/services/servicesApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const ServicesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => getAllServices({ limit: 9999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  return <DataTable columns={ columns } data={ data.data } />;
};

export default ServicesList;
