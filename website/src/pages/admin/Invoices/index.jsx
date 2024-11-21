import InvoiceList from "@/components/admin/invoices/InvoiceList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";

const breadcrumbData = [
  {
    title: 'Hóa đơn'
  },
  {
    href: '/admin/branches/list',
    title: 'Danh sách hóa đơn'
  },
];

const InvoicesListPage = () => {
  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <InvoiceList />
    </div>
  );
};

export default InvoicesListPage;
