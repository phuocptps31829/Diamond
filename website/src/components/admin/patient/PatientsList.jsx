import { useState, useEffect } from "react";
import { useQuery } from "@tanstack/react-query";
import { patientApi } from "@/services/patientsApi";
import NotFound from "@/components/ui/NotFound";
import DataTable from "./table";
import { columnsSchedule } from "./table/columns";

const PatientsList = () => {
  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState({
    data: [],
    pageCount: 0,
    total: 0,
  });

  const { data, error, isLoading } = useQuery({
    queryKey: ["medical-packages", pageIndex, 10],
    queryFn: () =>
      patientApi.getDataPatients({ page: pageIndex + 1, limit: 10 }),
    keepPreviousData: true,
  });

  useEffect(() => {
    if (!isLoading) {
      setTableData({
        data: data?.data || [],
        pageCount: Math.ceil((data?.totalRecords || 0) / 10),
        total: data?.totalRecords || 0,
      });
    }
  }, [data, isLoading]);

  if (error) {
    return <NotFound message={error.message} />;
  }
  return (
    <DataTable
      data={tableData.data}
      columns={columnsSchedule(pageIndex, 10)}
      pageCount={tableData.pageCount}
      pageSize={10}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      isLoading={isLoading}
      total={tableData.total}
    />
  );
};

export default PatientsList;
