import Loading from "@/components/ui/Loading";
import DataTable from "./table";
import { columns } from "./table/columns";
import { clinicsApi } from "@/services/clinicApi";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
const ClinicsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["clinics"],
    queryFn: () => clinicsApi.getAllClinics({ limit: 9999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }
  return <DataTable columns={columns} data={data} />;
};
export default ClinicsList;
