import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import NotFound from "@/components/ui/NotFound";
import Loading from "@/components/ui/Loading";
import { invoicesApi } from "@/services/invoicesApi";

const InvoiceList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["invoices"],
    queryFn: invoicesApi.getAllInvoices,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }


  return <DataTable columns={columns} data={data?.data} />;
};

export default InvoiceList;
