import SpecialtiesEditForm from "@/components/admin/specialty/SpecialtiesEditForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SpecialtiesEditForm />
    </div>
  );
};

export default SpecialtiesEditFormPage;