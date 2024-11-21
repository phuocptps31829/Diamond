import BranchesAdd from "@/components/admin/branches/BranchesAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Chi nhánh",
  },
  {
    href: "/admin/branches/create",
    title: "Thêm chi nhánh",
  },
];

const BranchesAddPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <BranchesAdd />
    </div>
  );
};

export default BranchesAddPage;
