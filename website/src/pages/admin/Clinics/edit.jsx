import ClinicEdit from "@/components/admin/clinic/ClinicEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Phòng khám",
  },
  {
    href: "/admin/clinics/edit",
    title: "Chỉnh sửa phòng khám",
  },
];

const ClinicsEditPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ClinicEdit />
    </div>
  );
};

export default ClinicsEditPage;
