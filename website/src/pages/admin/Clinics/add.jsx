import ClinicsAdd from "@/components/admin/clinic/ClinicAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: "Phòng khám",
  },
  {
    href: "/admin/clinics/create",
    title: "Thêm phòng khám",
  },
];

const ClinicsAddPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ClinicsAdd />
    </div>
  );
};

export default ClinicsAddPage;
