import SpecialtiesForm from "@/components/admin/specialty/SpecialtiesForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SpecialtiesForm />
    </div>
  );
};

export default SpecialtiesFormPage;