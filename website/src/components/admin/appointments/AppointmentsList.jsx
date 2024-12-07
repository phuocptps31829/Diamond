import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import NotFound from "@/components/ui/NotFound";
import { appointmentApi } from "@/services/appointmentsApi";
import { useSelector } from "react-redux";
import { useState } from "react";
import { getColumnsAppointments } from "./table/columns";

const AppointmentsList = () => {
  const profile = useSelector((state) => state.auth.userProfile);
  const roleID = profile?.role?._id;
  const [pageIndex, setPageIndex] = useState(0);

  let options = {
    keepPreviousData: true,
  };

  switch (roleID) {
    case import.meta.env.VITE_ROLE_DOCTOR:
      options = {
        ...options,
        queryKey: ["appointmentsDoctor", pageIndex, 10],
        queryFn: () =>
          appointmentApi.getAppointmentByDoctor({
            page: pageIndex + 1,
            limit: 10,
          }),
      };
      break;
    case import.meta.env.VITE_ROLE_SUPER_ADMIN:
      options = {
        ...options,
        queryKey: ["appointments", pageIndex, 10],
        queryFn: () =>
          appointmentApi.getAllAppointmentsAdmin({
            page: pageIndex + 1,
            limit: 10,
          }),
      };
      break;
    default:
      options = {};
  }

  const { data, error, isLoading } = useQuery(options);

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
      columns={getColumnsAppointments(pageIndex, 10)}
      pageCount={tableData.pageCount}
      pageSize={10}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      isLoading={isLoading}
      total={tableData.total}
    />
  );
};

export default AppointmentsList;
