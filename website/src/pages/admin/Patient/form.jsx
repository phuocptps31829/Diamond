import PatientsForm from "@/components/admin/patient/PatientsForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Bệnh nhân'
  },
  {
    href: '/admin/patients/create',
    title: 'Thêm bệnh nhân'
  },
];

const PatientsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PatientsForm />
    </div>
  );
};

export default PatientsFormPage;