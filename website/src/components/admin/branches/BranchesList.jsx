import NotFound from "@/components/ui/NotFound";
import { branchApi } from "@/services/branchesApi";
import { useQuery } from "@tanstack/react-query";
import Loading from "@/components/ui/Loading";
import { columns } from "./table/columns";
import DataTable from "./table";

const BranchesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: () => branchApi.getAllBranches({ limit: 999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading />;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }

  return <DataTable columns={columns} data={data.data} />;
};

export default BranchesList;
