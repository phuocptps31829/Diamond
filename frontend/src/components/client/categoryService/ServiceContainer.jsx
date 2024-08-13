import { useMatch, useLocation } from "react-router-dom";

import SidebarFilter from "./SidebarFilter";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAllServices } from "@/services/servicesApi";
import { getAllMedicalPackages } from "@/services/medicalPackagesApi";
import NotFound from "../notFound";
import { useQuery, useQueryClient } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import PackageList from "../product/Package";
import ServiceList from "../product/Service";

const ServiceContainer = () => {
  const [page] = useState(1);
  const [limit] = useState(10);
  const [sort, setSort] = useState("");

  const queryClient = useQueryClient();
  const location = useLocation();

  const isServiceRoute = useMatch("/service/:id?");
  const isPackageRoute = useMatch("/package/:id?");
  const type = isServiceRoute ? "service" : isPackageRoute ? "package" : null;

  useEffect(() => {
    queryClient.clear();
  }, [location.pathname, queryClient]);

  const { data, error, isLoading } = useQuery({
    queryKey: [type, page, sort],
    queryFn: async () => {
      await new Promise((resolve) => setTimeout(resolve, 4000));
      if (type === "service") {
        return await getAllServices(page, limit, sort);
      } else if (type === "package") {
        return await getAllMedicalPackages(page, limit, sort);
      }
    },
    enabled: !!type,
  });
  if (isLoading) {
    return (
      <section className="relative mx-auto max-w-screen-2xl py-3">
        <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
          <div className="grid grid-cols-12 md:gap-7">
            <div className="col-span-10 mt-7 md:col-span-12">
              <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
                {Array(12)
                  .fill(null)
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

  if (error) return <NotFound />;

  const handleFilterApply = (filters) => {
    console.log(filters);
  };

  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 md:gap-7">
          <SidebarFilter onFilterApply={handleFilterApply} />
          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {type === "package"
                ? data.map((item) => <PackageList key={item._id} {...item} />)
                : data.map((item) => <ServiceList key={item._id} {...item} />)}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContainer;
