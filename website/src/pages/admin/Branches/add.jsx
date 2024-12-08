import BranchesAdd from "@/components/admin/branches/BranchesAdd";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <BranchesAdd />
    </div>
  );
};

export default BranchesAddPage;
