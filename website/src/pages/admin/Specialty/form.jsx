import SpecialtiesForm from "@/components/admin/specialty/SpecialtiesForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Chuyên khoa'
  },
  {
    href: '/admin/specialties/create',
    title: 'Thêm chuyên khoa'
  },
];

const SpecialtiesFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SpecialtiesForm />
    </div>
  );
};

export default SpecialtiesFormPage;