import ClinicsForm from "@/components/admin/clinic/ClinicForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Phòng khám'
  },
  {
    href: '/admin/clinics/create',
    title: 'Thêm phòng khám'
  },
];

const ClinicsFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ClinicsForm />
    </div>
  );
};

export default ClinicsFormPage;