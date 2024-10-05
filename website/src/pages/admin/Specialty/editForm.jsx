import SpecialtiesEditForm from "@/components/admin/specialty/SpecialtiesEditForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Chuyên khoa'
  },
  {
    href: '/admin/specialty/edit',
    title: 'Sửa chuyên khoa'
  },
];

const SpecialtiesEditFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SpecialtiesEditForm />
    </div>
  );
};

export default SpecialtiesEditFormPage;