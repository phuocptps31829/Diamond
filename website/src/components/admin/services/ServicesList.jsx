import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";
import { serviceApi } from "@/services/servicesApi";

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
    return <NotFound />;
  }

  console.log("data: ", data);
  return <DataTable columns={ columns } data={ data.data } />;
};

export default ServicesList;
