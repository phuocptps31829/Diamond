import { useEffect, useState } from "react";
import { Skeleton } from "@/components/ui/Skeleton";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Product from "../product/Product";
import NotFound from "@/components/ui/NotFound";

const PackageServiceOther = ({
  medicalPackageSpecialty,
  isLoading,
  serviceSpecialty,
  currentSlug,
}) => {
  const [dataOther, setDataOther] = useState([]);
  const isService = serviceSpecialty?.length > 0;
  const isPackage = medicalPackageSpecialty?.length > 0;

  useEffect(() => {
    if(isLoading) return;
    const filteredPackages = isPackage
    ? medicalPackageSpecialty.filter((item) => item.slug !== currentSlug)
    : serviceSpecialty.filter((item) => item.slug !== currentSlug);

    setDataOther(filteredPackages);

  }, [isService, isPackage, serviceSpecialty, medicalPackageSpecialty, currentSlug, isLoading]);

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="my-6 text-center text-2xl font-bold flex justify-center">
          <Skeleton className="h-6 w-56 ml-2" />
        </h1>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          { Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={ index } className="h-64 w-full" />
          )) }
        </div>
      </div>
    );
  }

  return (
    dataOther.length > 0 && (
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="mb-3 text-center text-2xl font-bold">
          { isPackage ? "Các gói khám khác" : "Các dịch vụ khác" }
        </h1>
        {
          !isService && !isPackage
            ? <div className="w-[300px] mx-auto">
              <NotFound message="Không tìm thấy" />
            </div>
            : <Carousel opts={ { align: "start", loop: true } } className="w-full">
              <CarouselContent className="ml-1 md:m-0">
                {dataOther.map((item) => (
                    <CarouselItem key={ item._id } className="md:basis-1/2 lg:basis-1/4">
                      <Product product={ item } />
                    </CarouselItem>
                  ))
                }
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
        }
      </div>
    )
  );
};

export default PackageServiceOther;