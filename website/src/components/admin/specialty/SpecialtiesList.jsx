// import { getAllSpecialties } from "@/services/specialtiesApi";
import DataTable from "./table";
import { columns } from "./table/columns";
import { useQuery } from "@tanstack/react-query";
import { specialtyApi } from "@/services/specialtiesApi";
import Loading from "@/components/ui/Loading";
const SpecialtiesList = () => {
  const {
    data: specialtiesDataResponse,
    isLoading: loadingSpecialties,
    isError: errorLoadingSpecialties,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtyApi.getAllSpecialties,
  });

  const specialtiesData = specialtiesDataResponse || [];
  if (loadingSpecialties) return <Loading />;
  if (errorLoadingSpecialties) return <div>Error loading data</div>;

  return <DataTable columns={ columns } data={ specialtiesData } />;
};

export default SpecialtiesList;
