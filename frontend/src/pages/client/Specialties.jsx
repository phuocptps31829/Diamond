import SpecialtiesBanner from "../../components/client/specialties/SpecialtiesBanner";
import SpecialtiesList from "../../components/client/specialties/SpecialtiesList";
import Safe from "../../components/client/specialties/TrustedSafety";
import useScrollToTop from "@/hooks/useScrollToTop";
const Specialties = () => {
  useScrollToTop();
  return (
    <div className="bg-bg-gray">
      <SpecialtiesBanner />
      <SpecialtiesList />
      <Safe />
    </div>
  );
};

export default Specialties;
