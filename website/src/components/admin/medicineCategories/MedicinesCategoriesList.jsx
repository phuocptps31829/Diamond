import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { medicineApi } from "@/services/medicineApi";
import DataTable from "./table";
import { columnsSchedule } from "./table/columns";
import NotFound from "@/components/ui/NotFound";
import { RECORD_PER_PAGE } from "@/constants/config";
import { useDebounce } from "use-debounce";

const MedicinesCategoriesList = () => {
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
    queryKey: ["medical-packages", pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
    queryFn: () => medicineApi.getDataMedicinesCategories({ 
      page: pageIndex + 1, 
      limit: 10,
      search: debouncedSearchValue,
    }),
    keepPreviousData: true,
  });

  useEffect (() => {
    if(!isLoading) {
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
      searchValue={searchValue}
      setSearchValue={setSearchValue}
    />
  );
};

export default MedicinesCategoriesList;
