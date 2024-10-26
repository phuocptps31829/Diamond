import SpecialtiesBanner from "../../components/client/specialties/SpecialtiesBanner";
import SpecialtiesList from "../../components/client/specialties/SpecialtiesList";
import Safe from "../../components/client/specialties/TrustedSafety";
import useScrollToTop from "@/hooks/useScrollToTop";
import { useQuery } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
import { specialtyApi } from "@/services/specialtiesApi";
const Specialties = () => {
  // const delay = (ms) => new Promise((resolve) => setTimeout(resolve, ms));

  useScrollToTop();
  const {
    data: specialties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: specialtyApi.getAllSpecialties,
  });

  if (error) return <NotFound />;

  return (
    <div className="bg-[#E8F2F7]">
      <SpecialtiesBanner />
      <SpecialtiesList specialties={ specialties } isLoading={ isLoading } />
      <Safe />
    </div>
  );
};

export default Specialties;
