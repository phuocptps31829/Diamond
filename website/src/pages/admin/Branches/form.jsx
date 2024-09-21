import BranchesForm from "@/components/admin/branches/BranchesForm";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Chi nhánh'
  },
  {
    href: '/admin/branches/create',
    title: 'Thêm chi nhánh'
  },
];

const BranchesFormPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <BranchesForm />
    </div>
  );
};

export default BranchesFormPage;