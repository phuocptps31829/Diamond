import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BookingInfo from "./InfoDetail/BookingInfo";
import NotFound from "@/components/ui/NotFound";
import { appointmentApi } from "@/services/appointmentsApi";
import Loading from "@/components/ui/Loading";

const AppointmentsDetailAdmin = () => {
  const { id } = useParams();
  console.log(id, "id");

  const { data, error, isLoading } = useQuery({
    queryKey: ["appointment", id],
    queryFn: () => appointmentApi.getAppointmentById(id),
    enabled: !!id,
  });
  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }
  
  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl font-bold">Chi tiết lịch đặt</h1>
      <div className="w-full">
        <BookingInfo data={data} />
      </div>
    </div>
  );
};

export default AppointmentsDetailAdmin;
