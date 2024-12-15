import DataTable from "./table";
import { columns } from "./table/columns";
import { clinicsApi } from "@/services/clinicApi";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/ui/NotFound";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { RECORD_PER_PAGE } from "@/constants/config";
const ClinicsList = () => {
  const [searchValue, setSearchValue] = useState("");
  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState({
    data: [],
    pageCount: 0,
    total: 0,
  });
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearchValue]);
  const { data, error, isLoading } = useQuery({
    queryKey: ["clinics", pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
    queryFn: () =>
      clinicsApi.getAllClinicsAdmin({
        page: pageIndex + 1,
        limit: RECORD_PER_PAGE,
        search: debouncedSearchValue,
      }),
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
    return <NotFound message={ error.message } />;
  }

  return (
    <DataTable
      data={ tableData.data }
      columns={ columns(pageIndex, 10) }
      pageCount={ tableData.pageCount }
      pageSize={ 10 }
      pageIndex={ pageIndex }
      onPageChange={ setPageIndex }
      isLoading={ isLoading }
      total={ tableData.total }
      searchValue={ searchValue }
      setSearchValue={ setSearchValue }
    />
  );
};
export default ClinicsList;
