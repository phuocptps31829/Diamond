import DescriptionService from "../../components/client/serviceDetail/descriptionService";
import MedicalPackageService from "../../components/client/serviceDetail/medicalPackageService";
import PackageServiceOther from "../../components/client/serviceDetail/packageServiceOther";
import Rules from "../../components/client/serviceDetail/rules";
import ServiceDetail from "../../components/client/serviceDetail/serviceDetail";

const DetailService = () => {
  return (
    <div className="bg-bg-gray p-8">
      <ServiceDetail />
      <DescriptionService />
      <MedicalPackageService />
      <Rules />
      <PackageServiceOther />
    </div>
  );
};

export default DetailService;
