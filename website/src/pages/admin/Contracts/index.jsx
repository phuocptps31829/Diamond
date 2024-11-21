import ContractsList from "@/components/admin/contracts/ContractsList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

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
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <ContractsList />
    </div>
  );
};

export default ContractListPage;