import ClinicEdit from "@/components/admin/clinic/ClinicEdit";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <ClinicEdit />
    </div>
  );
};

export default ClinicsEditPage;
