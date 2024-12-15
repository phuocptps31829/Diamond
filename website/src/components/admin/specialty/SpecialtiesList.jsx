import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { specialtyApi } from "@/services/specialtiesApi";
import { useEffect, useState } from "react";
import { RECORD_PER_PAGE } from "@/constants/config";
import { useDebounce } from "use-debounce";

const SpecialtiesList = () => {
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

  const {
    data: specialtiesDataResponse,
    isLoading: loadingSpecialties,
    isError: errorLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties", pageIndex, RECORD_PER_PAGE, debouncedSearchValue],
    queryFn: () => specialtyApi.getAllSpecialties({
      page: pageIndex + 1,
      limit: RECORD_PER_PAGE,
      search: debouncedSearchValue,
      notHidden: false,
    }),
  });

  useEffect(() => {
    if (!loadingSpecialties) {
      setTableData({
        data: specialtiesDataResponse?.data || [],
        pageCount: Math.ceil((specialtiesDataResponse?.totalRecords || 0) / 10),
        total: specialtiesDataResponse?.totalRecords || 0,
      });
    }
  }, [specialtiesDataResponse, loadingSpecialties]);

  if (errorLoadingSpecialties) return <div>Error loading data</div>;

  return <DataTable
    columns={ columns(pageIndex, RECORD_PER_PAGE) }
    data={ tableData.data }
    pageCount={ tableData.pageCount }
    pageSize={ 10 }
    pageIndex={ pageIndex }
    onPageChange={ setPageIndex }
    isLoading={ loadingSpecialties }
    total={ tableData.total }
    searchValue={ searchValue }
    setSearchValue={ setSearchValue }
  />;
};

export default SpecialtiesList;
