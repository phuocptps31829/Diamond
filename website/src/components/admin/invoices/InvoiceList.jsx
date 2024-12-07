import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import NotFound from "@/components/ui/NotFound";
import { invoicesApi } from "@/services/invoicesApi";
import { useState } from "react";

const InvoiceList = () => {
  const [pageIndex, setPageIndex] = useState(0);

  const { data, error, isLoading } = useQuery({
    queryKey: ["invoices", pageIndex, 10],
    queryFn: () =>
      invoicesApi.getAllInvoicesAdmin({
        page: pageIndex + 1,
        limit: 10,
      }),
    keepPreviousData: true,
  });

  if (error) {
    return <NotFound message={error.message} />;
  }

  const tableData = {
    data: data?.data || [],
    pageCount: Math.ceil((data?.totalRecords || 0) / 10),
    total: data?.totalRecords || 0,
  };

  return (
    <DataTable
      data={tableData.data}
      columns={columns(pageIndex, 10)}
      pageCount={tableData.pageCount}
      pageSize={10}
      pageIndex={pageIndex}
      onPageChange={setPageIndex}
      isLoading={isLoading}
      total={tableData.total}
    />
  );
};

export default InvoiceList;
