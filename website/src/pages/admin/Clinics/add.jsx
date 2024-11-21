import ClinicsAdd from "@/components/admin/clinic/ClinicAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <ClinicsAdd />
    </div>
  );
};

export default ClinicsAddPage;
