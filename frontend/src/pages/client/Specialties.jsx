import SpecialtiesBanner from "../../components/client/specialties/SpecialtiesBanner";
import SpecialtiesList from "../../components/client/specialties/SpecialtiesList";
import Safe from "../../components/client/specialties/TrustedSafety";
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
