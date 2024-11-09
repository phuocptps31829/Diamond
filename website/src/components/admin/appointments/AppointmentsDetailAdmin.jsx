import { useParams } from "react-router-dom";
import { useQuery } from "@tanstack/react-query";
import BookingInfo from "./InfoDetail/BookingInfo";
import Patient from "./InfoDetail/Patient";
import { getAppointmentById } from "@/services/appointmentsApi";
import NotFound from "@/components/client/notFound";

const AppointmentsDetailAdmin = () => {
  const { id } = useParams();
  console.log(id, "id");

  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => getAppointmentById(id),
    enabled: !!id,
  });
  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }
  console.log(data);

  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl font-bold">Chi tiết lịch đặt</h1>
      <div className="w-full">
        <Patient />
        <BookingInfo />
      </div>
    </div>
  );
};

export default AppointmentsDetailAdmin;
