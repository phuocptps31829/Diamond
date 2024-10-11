import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { clinicsApi } from "@/services/clinicApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";
const ClinicsList = () => {
  const {
    data: clinicsData = [],
    error,
    isLoading
  } = useQuery({
    queryKey: ["clinics"],
    queryFn: clinicsApi.getAllClinics,

  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }
  console.log("aaaaaa:", clinicsData);
  return (
    <DataTable
      columns={ columns }
      data={ clinicsData }
    />
  );
};
export default ClinicsList;