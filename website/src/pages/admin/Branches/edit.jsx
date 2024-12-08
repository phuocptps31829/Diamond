import BranchesEdit from "@/components/admin/branches/BranchesEdit";

import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <BranchesEdit />
    </div>
  );
};

export default BranchesEditPage;
