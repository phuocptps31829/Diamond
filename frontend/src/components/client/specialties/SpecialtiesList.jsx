import { getAllSpecialties } from "@/services/specialtiesApi";
import { useQuery } from "@tanstack/react-query";
const SpecialtiesList = () => {
  const {
    data: specialties,
    error,
    isLoading,
  } = useQuery({
    queryKey: ["specialties"],
    queryFn: getAllSpecialties,
  });

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading data</div>;
  }

  return (
    <div className="container mx-auto max-w-screen-xl py-5 lg:py-10">
      <div className="mx-auto w-full md:w-5/6">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Chọn một chuyên khoa:
        </h1>
        <div className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
          { specialties.map((item) => (
            <div
              key={ item.id }
              className="relative max-w-full rounded-lg border border-gray-200 bg-white shadow dark:border-gray-700 dark:bg-gray-800"
            >
              <a href="#">
                <img className="rounded-lg" src={ item.image } alt={ item.name } />
                <div className="absolute  inset-0 flex top-24 items-center justify-center rounded-lg">
                  <h5 className="rounded-lg bg-white bg-opacity-10 w-full text-center py-1 text-2xl font-bold tracking-tight text-white backdrop-blur">
                    { item.name }
                  </h5>
                </div>
              </a>
            </div>
          )) }
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesList;
