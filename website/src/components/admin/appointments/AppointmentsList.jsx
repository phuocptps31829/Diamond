import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllAppointments } from "@/services/appointmentsApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const AppointmentsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn:  getAllAppointments,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <NotFound />;
  }


  return <DataTable columns={columns} data={data?.data} />;
};


export default AppointmentsList;
