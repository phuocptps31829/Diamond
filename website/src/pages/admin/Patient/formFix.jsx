import PatientFormAdd from "@/components/admin/patient/PatientsFormAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Người dùng",
  },
  {
    href: "/admin/patients/create",
    title: "Chỉnh sửa người dùng",
  },
];

const PatientsFormFixPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <PatientFormAdd />
    </div>
  );
};

export default PatientsFormFixPage;
