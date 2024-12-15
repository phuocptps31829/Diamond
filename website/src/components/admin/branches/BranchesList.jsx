import NotFound from "@/components/ui/NotFound";
import { branchApi } from "@/services/branchesApi";
import { useQuery } from "@tanstack/react-query";
import { columns } from "./table/columns";
import DataTable from "./table";
import { useEffect, useState } from "react";
import { useDebounce } from "use-debounce";
import { RECORD_PER_PAGE } from "@/constants/config";

const BranchesList = () => {
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
    queryKey: ["branches", pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
    queryFn: () =>
      branchApi.getAllBranchesAdmin({
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

export default BranchesList;
