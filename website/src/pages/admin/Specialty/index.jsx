import SpecialtyList from "@/components/admin/specialty/SpecialtiesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <SpecialtyList />
    </div>
  );
};

export default SpecialtiesListPage;
