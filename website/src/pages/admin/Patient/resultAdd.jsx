import PatientResult from "@/components/admin/patient/result/addResult";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Người dùng",
  },
  {
    href: "/admin/patients/result",
    title: "Thêm kết quả khám bệnh",
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
