import PatientResult from "@/components/admin/patient/result/addResult";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Lịch đặt khám",
  },
  {
    href: "/admin/patients/result",
    title: "Thêm lịch đặt khám",
  },
];

const PatientsResult = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTOINIST"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PatientResult />
    </div>
  );
};

export default PatientsResult;
