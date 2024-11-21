import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { appointmentApi } from "@/services/appointmentsApi";
import { useSelector } from "react-redux";

const AppointmentsList = () => {
  const profile = useSelector((state) => state.auth.userProfile);
  const roleID = profile?.role?._id;

  let options = {
    keepPreviousData: true,
  };

  switch (roleID) {
    case import.meta.env.VITE_ROLE_DOCTOR:
      options = {
        ...options,
        queryKey: ["appointmentsDoctor"],
        queryFn: appointmentApi.getAppointmentByDoctor,
      };
      break;
    case import.meta.env.VITE_ROLE_SUPER_ADMIN:
      options = {
        ...options,
        queryKey: ["appointments"],
        queryFn: appointmentApi.getAllAppointments,
      };
      break;
    default:
      options = {};
  }

  const { data, error, isLoading } = useQuery(options);

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }

  return <DataTable data={ data?.data } />;
};

export default AppointmentsList;