import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import NotFound from "@/components/ui/NotFound";
import { appointmentApi } from "@/services/appointmentsApi";
import { useSelector } from "react-redux";
import { useEffect, useState } from "react";
import { getColumnsAppointments } from "./table/columns";
import { useDebounce } from "use-debounce";
import { RECORD_PER_PAGE } from "@/constants/config";

const AppointmentsList = () => {
  const profile = useSelector((state) => state.auth.userProfile);
  const roleID = profile?.role?._id;
  const [searchValue, setSearchValue] = useState("");
  const [debouncedSearchValue] = useDebounce(searchValue, 500);
  const [pageIndex, setPageIndex] = useState(0);
  const [tableData, setTableData] = useState({
    data: [],
    pageCount: 0,
    total: 0,
  });

  let options = {
    keepPreviousData: true,
  };
  useEffect(() => {
    setPageIndex(0);
  }, [debouncedSearchValue]);

  switch (roleID) {
    case import.meta.env.VITE_ROLE_DOCTOR:
      options = {
        ...options,
        queryKey: [
          "appointmentsDoctor",
          pageIndex,
          RECORD_PER_PAGE,
          debouncedSearchValue,
        ],
        queryFn: () =>
          appointmentApi.getAppointmentByDoctor({
            page: pageIndex + 1,
            limit: RECORD_PER_PAGE,
            search: debouncedSearchValue,
          }),
      };
      break;
    case import.meta.env.VITE_ROLE_SUPER_ADMIN:
    case import.meta.env.VITE_ROLE_STAFF_RECEPTIONIST:
      options = {
        ...options,
        queryKey: [
          "appointments",
          pageIndex,
          RECORD_PER_PAGE,
          debouncedSearchValue,
        ],
        queryFn: () =>
          appointmentApi.getAllAppointmentsAdmin({
            page: pageIndex + 1,
            limit: RECORD_PER_PAGE,
            search: debouncedSearchValue,
          }),
      };
      break;
    default:
      options = {};
  }

  const { data, error, isLoading } = useQuery(options);
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
    return <NotFound message={ error.message } />;
  }

  return (
    <DataTable
      data={ tableData.data }
      columns={ getColumnsAppointments(pageIndex, RECORD_PER_PAGE) }
      pageCount={ tableData.pageCount }
      pageSize={ RECORD_PER_PAGE }
      pageIndex={ pageIndex }
      onPageChange={ setPageIndex }
      isLoading={ isLoading }
      total={ tableData.total }
      searchValue={ searchValue }
      setSearchValue={ setSearchValue }
    />
  );
};

export default AppointmentsList;
