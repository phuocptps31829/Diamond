import { Link } from "react-router-dom";
import { Skeleton } from "@/components/ui/Skeleton";

const SpecialtiesList = ({ specialties, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-screen-xl py-2">
        <div className="mx-auto w-full">
          <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
            Tìm kiếm theo chuyên khoa:
          </h1>
          <div className="grid grid-cols-2 gap-4 rounded-lg bg-white p-0 md:grid-cols-3 lg:grid-cols-5 lg:p-6">
            { Array.from({ length: 20 }).map((_, index) => (
              <Skeleton key={ index } className="h-48 w-full" />
            )) }
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-xl py-2 md:px-4 px-3">
      <div className="mx-auto w-full">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Tìm kiếm theo chuyên khoa:
        </h1>
        <div className="grid grid-cols-2 gap-2 sm:gap-4 rounded-lg sm:bg-white p-0 md:grid-cols-3 lg:grid-cols-5 lg:p-6">
          { specialties.map((item) => (
            <div
              key={ item._id }
              className="group relative max-w-full rounded-lg bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <div className="absolute inset-0 flex sm:flex-row flex-col z-40 cursor-pointer items-center justify-center gap-2 px-5 opacity-0 transition-opacity duration-500 group-hover:opacity-100">
                <Link
                  to={ `/services?specialtyID=${item._id}` }
                  className="flex h-8 w-24 whitespace-nowrap cursor-pointer items-center justify-center rounded-md bg-primary-500 px-7 text-center text-[12px] text-white shadow transition duration-500 hover:scale-105"
                >
                  Dịch vụ
                </Link>
                <Link
                  to={ `/packages?specialtyID=${item._id}` }
                  className="flex h-8 w-24 cursor-pointer items-center justify-center rounded-md bg-primary-500 px-3 text-center text-[12px] text-white shadow transition duration-500 hover:scale-105"
                >
                  Gói khám
                </Link>
              </div>
              <img
                className="w-full rounded-lg object-cover aspect-[4/3]"
                src={ `${import.meta.env.VITE_IMAGE_API_URL}/${item.image}` }
                alt={ item.name }
              />
              <div className="absolute inset-0 top-20 sm:top-28 flex items-center justify-center">
                <h5 className="w-full bg-primary-500 bg-opacity-40 py-2 text-center font-semibold uppercase tracking-tight text-white backdrop-blur text-[11px] sm:text-[13px]">
                  { item.name }
                </h5>
              </div>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesList;
