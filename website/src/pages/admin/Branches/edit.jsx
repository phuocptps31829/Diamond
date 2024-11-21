import BranchesEdit from "@/components/admin/branches/BranchesEdit";

import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: "Chi nhánh",
  },
  {
    href: "/admin/branches/create",
    title: "Chỉnh sửa chi nhánh",
  },
];

const BranchesEditPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={breadcrumbData} />
      <BranchesEdit />
    </div>
  );
};

export default BranchesEditPage;
