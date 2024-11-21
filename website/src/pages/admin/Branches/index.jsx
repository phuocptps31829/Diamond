import BranchesList from "@/components/admin/branches/BranchesList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <BranchesList />
    </div>
  );
};

export default BranchesListPage;
