import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllClinics } from "@/services/clinicApi";
import { getAllBranches } from "@/services/branchesApi";
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
  const {
    data: branchesResponse = {},
    isLoading: loadingBranches,
    isError: errorLoadingBranches,
  } = useQuery({
    queryKey: ["branches", page, limit],
    queryFn: () => getAllBranches(page, limit), 
  });
  if (loadingClinics || loadingBranches) return <div>Loading...</div>;
  if (errorLoadingClinics || errorLoadingBranches) return <div>Error loading data</div>;
  const branchesData = branchesResponse.data || [];
  const branchMap = {};
  branchesData.forEach((branch) => {
    branchMap[branch._id] = {
      name: branch.name,
      address: branch.address,
    };
  });
  const clinicsWithBranches = clinicsData.map((clinic) => ({
    ...clinic,
    branchName: branchMap[clinic.branchID]?.name || "Error!",
    branchAddress: branchMap[clinic.branchID]?.address || "Error!",
  }));
  const branchesOnly = branchesData.map((branch) => ({
    branchName: branch.name,
    branchAddress: branch.address,
  }));
  return (
    <DataTable
      columns={columns}
      branchData={branchesOnly}
      data={clinicsWithBranches}
    />
  );
};

export default ClinicsList;
