import InvoiceList from "@/components/admin/invoices/InvoiceList";
import BreadcrumbCustom from "@/components/ui/BreadcrumbCustom";
import { useAuthRedirect } from "@/hooks/useAuthRedirect";

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
  useAuthRedirect(["SUPER_ADMIN", "STAFF_ACCOUNTANT"], "/admin/dashboard");

  return (
    <div>
      <BreadcrumbCustom data={ breadcrumbData } />
      <InvoiceList />
    </div>
  );
};

export default InvoicesListPage;
