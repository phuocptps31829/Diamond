import { useMatch } from 'react-router-dom';
import PackageProduct from "../product/Package";
import ServiceProduct from "../product/Service";
import SidebarFilter from "./SidebarFilter";
import { Skeleton } from "@/components/ui/Skeleton";
import { getAllServices, getServiceBySpecialty } from '@/services/servicesApi';
import { getAllMedicalPackages, getMedicalPackageBySpecialty } from '@/services/medicalPackagesApi';
import NotFound from '../notFound';
import { useQuery } from '@tanstack/react-query';
import { useState } from 'react';

const ServiceContainer = () => {
  const page = useState(1)[0];
  const [limit] = useState(10);
  const [sort, setSort] = useState('');
  const [selectedSpecialtyId, setSelectedSpecialtyId] = useState(null);

  const isServiceRoute = useMatch("/service/:id?");
  const isPackageRoute = useMatch("/package/:id?");
  const type = isServiceRoute ? "service" : isPackageRoute ? "package" : null;

  const handleSpecialtyChange = (id) => {
    setSelectedSpecialtyId(id);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: [type, selectedSpecialtyId, page, sort],
    queryFn: () => {
      if (type === "service") {
        return selectedSpecialtyId
          ? getServiceBySpecialty(selectedSpecialtyId, page, limit, sort)
          : getAllServices(page, limit, sort);
      } else if (type === "package") {
        return selectedSpecialtyId
          ? getMedicalPackageBySpecialty(selectedSpecialtyId, page, limit, sort)
          : getAllMedicalPackages(page, limit, sort);
      }
    },
    enabled: !!type,
  });

  if (!type) return <NotFound />;

  const renderContent = () => {
    if (isLoading) {
      return Array(6)
        .fill(null)
        .map((_, index) => <Skeleton key={index} className="h-80 w-full" />);
    }

    if (error) {
      return <NotFound />;
    }

    if (!data || data.length === 0) {
      return <p>No Product !!</p>;
    }

    return data.map((item) =>
      type === "package" ? (
        <PackageProduct key={item._id} {...item} />
      ) : (
        <ServiceProduct key={item._id} {...item} />
      )
    );
  };
  const handleFilterApply = (filters) => {
    console.log(filters);
    // Apply the filters to your data fetching logic
  };
  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 md:gap-7">
          <SidebarFilter setSort={setSort} onSpecialtyChange={handleSpecialtyChange}   onFilterApply={handleFilterApply} />
          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              {renderContent()}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServiceContainer;
