import BookingInfo from "./InfoDetail/BookingInfo";
import Patient from "./InfoDetail/Patient";

const AppointmentsDetailAdmin = () => {
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
