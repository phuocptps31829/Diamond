import { useQuery } from "@tanstack/react-query";
import Service from "../product/Service";
import SidebarFilter from "./SidebarFilter";
import Loading from "@/components/ui/Loading";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";

const ServiceContainer = () => {
  const {
    data: medicalPackages,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["medical-packages"],
    queryFn: getAllMedicalPackages,
  });
  

  if (isLoading)
    return (
      <div>
        <Loading />
      </div>
    );
  if (error) return <div>Error loading services</div>;

  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 md:gap-7">
          <SidebarFilter />
          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {medicalPackages.map((medicalPackage) => {
                return <Service key={medicalPackage._id} {...medicalPackage} />;
              })}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContainer;