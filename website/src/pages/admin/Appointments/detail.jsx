import AppointmentsDetailAdmin from "@/components/admin/appointments/AppointmentsDetailAdmin";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const AppointmentsDetailPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST", "DOCTOR"]);

  return (
    <div>
      <AppointmentsDetailAdmin />
    </div>
  );
};

export default AppointmentsDetailPage;
