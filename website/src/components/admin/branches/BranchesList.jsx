import NotFound from "@/components/client/notFound";
import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllBranches } from "@/services/branchesApi";
import { useQuery } from "@tanstack/react-query";

const BranchesList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: () => getAllBranches({ limit: 999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  return <DataTable columns={columns} data={data.data} />;
};

export default BranchesList;
