import { useEffect, useState } from "react";
import { useMatch, useLocation } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";
import { serviceApi } from "@/services/servicesApi";
import { medicalPackageApi } from "@/services/medicalPackagesApi";
import { useQuery } from "@tanstack/react-query";
import SidebarFilter from "../categoryService/SidebarFilter";
import NotFound from "@/components/ui/NotFound";
import Product from "../product/Product";
import CustomPagination from "@/components/ui/CustomPagination";

const ServicesContainer = () => {
  const location = useLocation();

  const isServiceRoute = useMatch("/services/:specialtyId?");
  const isPackageRoute = useMatch("/packages/:specialtyId?");
  const type = isServiceRoute ? "service" : isPackageRoute ? "package" : null;
  const queryParams = new URLSearchParams(location.search);
  const [currentPage, setCurrentPage] = useState(
    () => parseInt(queryParams.get("page")) || 1
  );
  const currentLimit = parseInt(queryParams.get("limit")) | 6;

  const [filters, setFilters] = useState({
    page: currentPage,
    limit: currentLimit,
    sort: "",
    specialtyID: [],
    branch: [],
    gender: [],
  });

  useEffect(() => {
    if (!currentLimit && !currentPage) {
      setFilters({
        page: 1,
        limit: 6,
        sort: "",
        specialtyID: [],
        branch: [],
        gender: [],
      });
    }
  }, [location, currentPage, currentLimit]);

  const handleFilterApply = (newFilters) => {
    const updatedFilters = { ...filters, ...newFilters };
    window.history.replaceState(null, '', location.pathname + '?' + Object.entries(updatedFilters)
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          console.log(value);
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&'));
    setFilters(updatedFilters);
  };

  const handlePageChange = (newPage) => {
    setCurrentPage(newPage);
    const updatedFilters = { ...filters, page: +newPage, limit: +filters.limit };
    window.history.replaceState(null, '', location.pathname + '?' + Object.entries(updatedFilters)
      .filter(([, value]) => {
        if (Array.isArray(value)) {
          return value.length > 0;
        }
        return value !== undefined && value !== null && value !== '';
      })
      .map(([key, value]) => {
        if (Array.isArray(value)) {
          console.log(value);
          return `${encodeURIComponent(key)}=${encodeURIComponent(value.join(','))}`;
        }
        return `${encodeURIComponent(key)}=${encodeURIComponent(value)}`;
      })
      .join('&'));
    setFilters(updatedFilters);
  };

  useEffect(() => {
    window.scrollTo({
      top: 0,
      left: 0,
      behavior: "smooth",
    });
  }, [filters]);

  const { data, error, isLoading } = useQuery({
    queryKey: [type, filters],
    queryFn: async () => {
      if (type === "service") {
        return await serviceApi.getAllServices(filters);
      } else if (type === "package") {
        return await medicalPackageApi.getAllMedicalPackages(filters);
      }
    },
    retry: 1,
    enabled: !!type,
  });

  const totalItems = data?.totalRecords || 0;
  const limit = filters.limit;
  const totalPages = Math.ceil(totalItems / limit);

  return (
    <section className="relative mx-auto max-w-screen-xl md:px-5 py-3 pb-10">
      <div className="mx-auto w-full px-4 md:px-0">
        <div className="grid grid-cols-12 md:gap-7">
          <div className="col-span-12 md:col-span-3">
            <SidebarFilter filters={ filters } onFilterApply={ handleFilterApply } />
          </div>

          <div className="col-span-12 md:col-span-9 flex flex-col justify-between">
            <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-3">
              { isLoading ? (
                <>
                  { Array(6)
                    .fill(null)
                    .map((_, index) => (
                      <Skeleton key={ index } className="h-80 w-full" />
                    )) }
                </>
              ) : error ? (
                type === "package"
                  ? <NotFound message={ "Không tìm thấy gói khám nào." } />
                  : <NotFound message={ "Không tìm thấy dịch vụ nào." } />
              ) : data?.data?.map((item) =>
                <Product key={ item._id } product={ item } />) }
            </div>
            <CustomPagination
              currentPage={ currentPage }
              totalPages={ totalPages }
              onPageChange={ handlePageChange }
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default ServicesContainer;