import BranchesList from "@/components/admin/branches/BranchesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: 'Chi nhánh'
  },
  {
    href: '/admin/branches/list',
    title: 'Danh sách chi nhánh'
  },
];

const BranchesListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"]);

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <BranchesList />
    </div>
  );
};

export default BranchesListPage;
