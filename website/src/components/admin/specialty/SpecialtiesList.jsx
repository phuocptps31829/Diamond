import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { specialtyApi } from "@/services/specialtiesApi";
import { useState } from "react";
import { RECORD_PER_PAGE } from "@/constants/config";

const SpecialtiesList = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const {
    data: specialtiesDataResponse,
    isLoading: loadingSpecialties,
    isError: errorLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties", pageIndex, RECORD_PER_PAGE],
    queryFn: () => specialtyApi.getAllSpecialties({
      page: pageIndex + 1,
      limit: RECORD_PER_PAGE
    }),
  });

  if (errorLoadingSpecialties) return <div>Error loading data</div>;

  const tableData = {
    data: specialtiesDataResponse?.data || [],
    pageCount: Math.ceil((specialtiesDataResponse?.totalRecords || 0) / 10),
    total: specialtiesDataResponse?.totalRecords || 0,
  };

  return <DataTable
    columns={ columns(pageIndex, RECORD_PER_PAGE) }
    data={ tableData.data }
    pageCount={ tableData.pageCount }
    pageSize={ 10 }
    pageIndex={ pageIndex }
    onPageChange={ setPageIndex }
    isLoading={ loadingSpecialties }
    total={ tableData.total }
  />;
};

export default SpecialtiesList;
