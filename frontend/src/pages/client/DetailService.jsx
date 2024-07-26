import DescriptionService from "../../components/client/serviceDetail/sá";
import MedicalPackageService from "../../components/client/serviceDetail/sss";
import PackageServiceOther from "../../components/client/serviceDetail/ccc";
import Rules from "../../components/client/serviceDetail/xx";
import ServiceDetail from "../../components/client/serviceDetail/cdcd";

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
