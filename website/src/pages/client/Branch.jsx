import BranchBody from "@/components/client/branch/BranchBody";
import BranchHero from "@/components/client/branch/BranchHero";
import NotFound from "@/components/ui/NotFound";
import { Skeleton } from "@/components/ui/Skeleton";
import { branchApi } from "@/services/branchesApi";
import { useQuery } from "@tanstack/react-query";

const Branch = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["branches"],
    queryFn: () => branchApi.getAllBranches({ limit: 999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Skeleton className='w-full h-[600px]' />;
  }

  if (error) {
    return <NotFound message={error.message} />;
  }
  return (
    <div className="mx-auto max-w-screen-xl">
      <BranchHero />
      <BranchBody data={data?.data} />
    </div>
  );
};

export default Branch;
