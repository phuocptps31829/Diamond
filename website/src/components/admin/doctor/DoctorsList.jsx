import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { doctorApi } from "@/services/doctorsApi";

const DoctorsList = () => {
  const {
    data: doctorsData,
    isLoading: loadingDoctors,
    isError: errorLoadingDoctors,
  } = useQuery({
    queryKey: ["doctors"],
    queryFn: doctorApi.getAllDoctors,
  });
  if (loadingDoctors ) return <div>Loading...</div>;
  if (errorLoadingDoctors ) return <div>Error loading data</div>;
  return (
    <DataTable 
      columns={columns} 
      data={doctorsData || []} 
    />
  );
};

export default DoctorsList;
