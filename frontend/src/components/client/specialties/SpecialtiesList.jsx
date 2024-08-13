import { Link } from "react-router-dom";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton"; // Ensure you import the Skeleton component correctly

const SpecialtiesList = ({ specialties, isLoading }) => {
  if (isLoading) {
    return (
      <div className="container mx-auto max-w-screen-xl py-5 lg:py-10">
        <div className="mx-auto w-full md:w-5/6">
          <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
            Chọn một chuyên khoa:
          </h1>
          <div className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
            {Array.from({ length: 8 }).map((_, index) => (
              <Skeleton key={index} className="h-48 w-full" />
            ))}
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container mx-auto max-w-screen-xl py-5 lg:py-10">
      <div className="mx-auto w-full md:w-5/6">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Chọn một chuyên khoa:
        </h1>
        <div className="grid grid-cols-1 items-center justify-center gap-8 rounded-lg border bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
          {specialties.map((item) => (
            <div
              key={item._id}
              className="group relative h-80 w-full cursor-pointer overflow-hidden rounded-md border p-5 text-gray-50 duration-500 md:w-64"
            >
              <div className="">
                <img
                  src={item.image}
                  alt={item.name}
                  className="h-60 w-full rounded-md bg-blue-400 object-cover"
                />
                <div className="absolute -bottom-14 left-0 w-full p-5 duration-200 group-hover:-translate-y-12 group-hover:backdrop-blur-md">
                  <div className="absolute left-0 -z-10 h-28 w-64 opacity-0"></div>
                  <span className="mb-5 block text-xl font-bold text-black group-hover:text-white">
                    {item.name}
                  </span>
                  <div className="flex items-center justify-around gap-2 transition-none">
                    <Link 
                     to={`/service/${item._id}`}
                    className="flex h-8 w-full items-center justify-center rounded-md bg-primary-500 px-3 text-center text-xs text-white shadow transition duration-150 hover:bg-primary-600/90">
                      Dịch vụ
                    </Link>
                    <Link 
                    to={`/package/${item._id}`}
                    className="flex h-8 w-full items-center justify-center rounded-md bg-primary-500 px-3 text-center text-xs text-white shadow transition duration-150 hover:bg-primary-600/90">
                      Chuyên khoa
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

SpecialtiesList.propTypes = {
  specialties: PropTypes.object,
  isLoading: PropTypes.bool,
};

export default SpecialtiesList;
