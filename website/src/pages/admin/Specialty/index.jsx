import PatientsList from "@/components/admin/specialty/SpecialtiesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Chuyên khoa'
  },
  {
    href: '/admin/specialties/list',
    title: 'Danh sách chuyên khoa'
  },
];

const SpecialtiesListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <PatientsList/>
    </div>
  );
};

export default SpecialtiesListPage;
