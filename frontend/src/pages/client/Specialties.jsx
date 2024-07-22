import SpecialtiesBanner from "../../components/client/specialties/specialtiesBanner";
import SpecialtiesList from "../../components/client/specialties/specialtiesList";
import Safe from "../../components/client/specialties/trustedSafety";
const Specialties = () => {
  return (
    <div className="bg-bg-gray">
      <SpecialtiesBanner />
      <SpecialtiesList />
      <Safe />
    </div>
  );
};

export default Specialties;
