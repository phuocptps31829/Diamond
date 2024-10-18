import ClinicsForm from "@/components/admin/clinic/ClinicEditForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Phòng khám'
  },
  {
    href: '/admin/clinics/edit/:id',
    title: 'Sửa phòng khám'
  },
];

const ClinicsEditFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ClinicsForm />
    </div>
  );
};

export default ClinicsEditFormPage;