import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";
import { appointmentApi } from "@/services/appointmentsApi";

const AppointmentsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: appointmentApi.getAllAppointments,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <NotFound />;
  }
console.log(data);


  return <DataTable columns={columns} data={data?.data} />;
};


export default AppointmentsList;
