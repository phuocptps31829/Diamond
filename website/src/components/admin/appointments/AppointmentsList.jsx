import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllAppointments } from "@/services/appointmentsApi";
import NotFound from "@/components/client/notFound";

const AppointmentsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["appointments"],
    queryFn: () => getAllAppointments({ limit: 999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }


  return <DataTable columns={columns} data={data} />;
};


export default AppointmentsList;
