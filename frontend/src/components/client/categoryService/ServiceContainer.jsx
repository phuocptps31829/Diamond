import Service from "../product/Package";
import SidebarFilter from "./SidebarFilter";
import { Skeleton } from "@/components/ui/Skeleton";
import PropTypes from "prop-types";
const ServiceContainer = ({ medicalPackages, isLoading }) => {
  if (isLoading) {
    return (
      <section className="relative mx-auto max-w-screen-2xl py-3">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-12 md:gap-7">
            <SidebarFilter />
            <div className="col-span-12 mt-7 md:col-span-9">
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
                {Array(6)
                  .fill()
                  .map((_, index) => (
                    <Skeleton key={index} className="h-80 w-full" />
                  ))}
              </div>
            </div>
          </div>
        </div>
      </section>
    );
  }

  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 md:gap-7">
          <SidebarFilter />
          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {console.log(medicalPackages)}
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
ServiceContainer.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackages: PropTypes.array,
};
export default ServiceContainer;
