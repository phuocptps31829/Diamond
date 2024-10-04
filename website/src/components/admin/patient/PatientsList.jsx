import { getAllPatients } from "@/services/patientsApi";
import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";

const PatientsList = () => {
  const {
    data: patientsDataResponse,
    isLoading: loadingPatients,
    isError: errorLoadingPatients,
  } = useQuery({
    queryKey: ["patients"],
    queryFn: getAllPatients,
  });
  const patientsData = patientsDataResponse?.data || [];
  if (loadingPatients) return <div>Loading...</div>;
  if (errorLoadingPatients) return <div>Error loading data</div>;
  console.log("Patients", patientsData.map(patient => patient.userID.fullName));

  return <DataTable
    columns={ columns }
    data={ patientsData } />;
};

export default PatientsList;