import { useMatch } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAllServices } from "@/services/servicesApi";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
import NotFound from "../notFound";
import { useQuery } from "@tanstack/react-query";
import PackageList from "../product/Package";
import ServiceList from "../product/Service";
import notFoundImg from "@/assets/images/undraw_Empty_re_opql.png";

const ServiceContainer = ({ filters }) => {
  const isServiceRoute = useMatch("/services/:specialtyId?");
  const isPackageRoute = useMatch("/packages/:specialtyId?");
  const type = isServiceRoute ? "service" : isPackageRoute ? "package" : null;

  const { data, error, isLoading } = useQuery({
    queryKey: [type, filters],
    queryFn: async () => {
      if (type === "service") {
        return await getAllServices(filters);
      } else if (type === "package") {
        return await getAllMedicalPackages(filters);
      }
    },
    enabled: !!type,
  });

  if (isLoading) {
    return (
      <>
        {Array(12)
          .fill(null)
          .map((_, index) => (
            <Skeleton key={index} className="h-80 w-full" />
          ))}
      </>
    );
  }

  if (error) {
    return (
      <div className="col-span-3 flex flex-col items-center justify-center p-4">
        <img
          src={notFoundImg}
          alt="Not Found"
          className="w-full max-w-xs md:max-w-md lg:max-w-lg rounded-md"
        />
        <h1 className="mt-4 text-center text-lg font-semibold text-gray-700">
          {type === "package"
            ? "Gói khám không tồn tại"
            : "Dịch vụ không tồn tại"}
        </h1>
      </div>
    );
  }
  return (
    <>
      {" "}
      {type === "package"
        ? data.map((item) => <PackageList key={item._id} {...item} />)
        : data.map((item) => <ServiceList key={item._id} {...item} />)}
    </>
  );
};

export default ServiceContainer;
