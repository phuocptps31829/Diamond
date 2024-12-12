import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { serviceApi } from "@/services/servicesApi";
import NotFound from "@/components/ui/NotFound";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { RECORD_PER_PAGE } from "@/constants/config";

const ServicesList = () => {
  const [searchValue, setSearchValue] = useState("");

  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState({
    data: [],
    pageCount: 0,
    total: 0,
  });
  const [debouncedSearchValue] = useDebounce(searchValue, 500);

  const { data, error, isLoading } = useQuery({
    queryKey: ["services", pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
    queryFn: () =>
      serviceApi.getAllServicesAdmin({
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
        pageCount: Math.ceil((data?.totalRecords || 0) / RECORD_PER_PAGE),
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
      columns={columns(pageIndex, RECORD_PER_PAGE)}
      pageCount={tableData.pageCount}
      pageSize={RECORD_PER_PAGE}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      isLoading={isLoading}
      total={tableData.total}
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default ServicesList;
