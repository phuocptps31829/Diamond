import { useState } from "react";
import ServiceContainer from "./ServiceContainer";
import SidebarFilter from "./SidebarFilter";

const ServicesPage = () => {
  const [filters, setFilters] = useState({});

  const handleFilterApply = (filters) => {
    setFilters(filters);
    
  };

  return (
    <section className="relative mx-auto max-w-screen-2xl py-3">
      <div className="mx-auto w-full max-w-7xl px-4 md:px-8">
        <div className="grid grid-cols-12 md:gap-7">
          <div className="col-span-12 mt-7 md:col-span-3">
            <SidebarFilter onFilterApply={handleFilterApply} />
          </div>

          <div className="col-span-12 mt-7 md:col-span-9">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              <ServiceContainer filters={filters} />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesPage;
