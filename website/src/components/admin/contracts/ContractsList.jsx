import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";
import NotFound from "@/components/ui/NotFound";
import { columns } from "./table/columns";
import DataTable from "./table";
import { contractApi } from "@/services/contractApi";

const ContractsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["contracts"],
    queryFn: () => contractApi.getAllContracts(),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound />;
  }

  console.log("data: ", data);
  
  return <DataTable columns={columns} data={data} />;
};

export default ContractsList;
