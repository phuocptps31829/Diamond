import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { getAllNews } from "@/services/newsApi";
import NotFound from "@/components/client/notFound";

const NewsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: () => getAllNews({ limit: 999 }),
    keepPreviousData: true,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <NotFound />;
  }

  console.log("data: ", data.totalRecords);

  return <DataTable columns={columns} data={data.data} />;
};

export default NewsList;
