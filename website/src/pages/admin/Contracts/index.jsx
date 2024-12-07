import ContractsList from "@/components/admin/contracts/ContractsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

const breadcrumbData = [
  {
    title: 'Hợp đồng'
  },
  {
    href: '/admin/contracts/list',
    title: 'Danh sách hợp đồng'
  },
];

const ContractListPage = () => {
  useAuthRedirect(["SUPER_ADMIN", "ADMIN"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ContractsList />
    </div>
  );
};

export default ContractListPage;