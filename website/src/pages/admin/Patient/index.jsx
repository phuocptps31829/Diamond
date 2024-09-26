import PatientsList from "@/components/admin/patient/PatientsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Bệnh nhân'
  },
  {
    href: '/admin/patients/list',
    title: 'Danh sách bệnh nhân'
  },
];

const PatientsListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PatientsList/>
    </div>
  );
};

export default PatientsListPage;
