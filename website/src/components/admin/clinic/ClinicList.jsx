import DataTable from "./table";
import { columns } from "./table/columns";
import { clinicsApi } from "@/services/clinicApi";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/ui/NotFound";
import { useState } from "react";
const ClinicsList = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ["clinics", pageIndex, 10],
    queryFn: () => clinicsApi.getAllClinicsAdmin({ page: pageIndex + 1, limit: 10 }),
    keepPreviousData: true,
  });

  if (error) {
    return <NotFound message={error.message} />;
  }

  const tableData = {
    data: data?.data || [],
    pageCount: Math.ceil((data?.totalRecords || 0) / 10),
    total: data?.totalRecords || 0,
  };
  return (
    <DataTable
      data={tableData.data}
      columns={columns(pageIndex, 10)}
      pageCount={tableData.pageCount}
      pageSize={10}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      isLoading={isLoading}
      total={tableData.total}
    />
  );
};
export default ClinicsList;
