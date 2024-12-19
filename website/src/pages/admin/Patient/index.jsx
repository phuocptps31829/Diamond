import PatientsList from "@/components/admin/patient/PatientsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Bệnh nhân",
  },
  {
    href: "/admin/patients/list",
    title: "Danh sách bệnh nhân",
  },
];

const PatientsListPage = () => {
  useAuthRedirect(
    ["SUPER_ADMIN", "ADMIN", "STAFF_RECEPTIONIST"],
    "/admin/dashboard"
  );

  return (
    <>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PatientsList />
    </>
  );
};

export default PatientsListPage;
