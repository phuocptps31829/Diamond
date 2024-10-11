import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllClinics } from "@/services/clinicApi";
import { branchApi } from "@/services/branchesApi";
import { getAllSpecialties } from "@/services/specialtiesApi";
import { useQuery } from "@tanstack/react-query";
import { useState } from "react";
const ClinicsList = () => {
  const [page] = useState(1); 
  const [limit] = useState(10); 
  const {
    data: clinicsData = [],
    isLoading: loadingClinics,
    isError: errorLoadingClinics,
  } = useQuery({
    queryKey: ["clinics"],
    queryFn: getAllClinics,
  });  
  // Get specialty data
  const {
    data: specialtiesResponse = [],
    isLoading: loadingSpecialties,
    isError: errorLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });
  const specialtiesData = specialtiesResponse || [];
  const specialtiesMap = {};
  specialtiesData.forEach((specialty) => {
    specialtiesMap[specialty._id] = {
      name: specialty.name,
    };
  });
  // Get branch data
  const {
    data: branchesResponse = {},
    isLoading: loadingBranches,
    isError: errorLoadingBranches,
  } = useQuery({
    queryKey: ["branches", page, limit],
    queryFn: () => branchApi.getAllBranches(page, limit), 
  });
  const branchesData = branchesResponse.data || [];
  const branchMap = {};
  branchesData.forEach((branch) => {
    branchMap[branch._id] = {
      name: branch.name,
      address: branch.address,
    };
  });
  // Dub
  const clinicsWithBranches = clinicsData.map((clinic) => ({
    ...clinic,
    specialtyName: specialtiesMap[clinic.specialtyID]?.name || "Error!",
    branchName: branchMap[clinic.branchID]?.name || "Error!",
    branchAddress: branchMap[clinic.branchID]?.address || "Error!",
  }));
  if (loadingClinics || loadingBranches ||loadingSpecialties) return <div>Loading...</div>;
  if (errorLoadingClinics || errorLoadingBranches ||errorLoadingSpecialties) return <div>Error loading data</div>;
  return (
    <DataTable
      columns={columns}
      data={clinicsWithBranches}
    />
  );
};
export default ClinicsList;
