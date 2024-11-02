import { useQuery } from "@tanstack/react-query";
import DataTable from "./table";
import { columns } from "./table/columns";
import { newsApi } from "@/services/newsApi";
import NotFound from "@/components/client/notFound";
import Loading from "@/components/ui/Loading";

const NewsList = () => {
  const { data, error, isLoading } = useQuery({
    queryKey: ["news"],
    queryFn: newsApi.takeItAllNews,
    keepPreviousData: true,
  });

  if (isLoading) {
    return <Loading/>;
  }

  if (error) {
    return <NotFound />;
  }


  return <DataTable columns={columns} data={data} />;
};

export default NewsList;
