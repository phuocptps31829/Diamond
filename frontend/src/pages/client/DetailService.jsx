import DescriptionService from "../../components/client/serviceDetail/DescriptionService";
import MedicalPackageService from "../../components/client/serviceDetail/MedicalPackageService";
import PackageServiceOther from "../../components/client/serviceDetail/PackageServiceOther";
import Rules from "../../components/client/serviceDetail/Rules";
import ServiceDetail from "../../components/client/serviceDetail/ServiceDetail";

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
