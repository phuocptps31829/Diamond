import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { serviceApi } from "@/services/servicesApi";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";

const ServicesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["services"],
    queryFn: () => serviceApi.getAllServices({ limit: 9999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }

  console.log("data: ", data);
  return <DataTable columns={ columns } data={ data?.data } />;
};

export default ServicesList;