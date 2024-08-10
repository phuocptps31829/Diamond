import { Skeleton } from "@/components/ui/Skeleton";
import Service from "../product/Package";
import PropTypes from "prop-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

const PackageServiceOther = ({ medicalPackageSpecialty, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="my-6 text-center text-2xl font-bold">
          Các gói khám khác
        </h1>
        <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
          {Array.from({ length: 4 }).map((_, index) => (
            <Skeleton key={index} className="h-64 w-full" />
          ))}
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="my-6 text-center text-2xl font-bold">Các gói khám khác</h1>
      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="w-full"
      >
        <CarouselContent className="ml-1 md:m-0">
          {medicalPackageSpecialty &&
            medicalPackageSpecialty.map((medicalPackage) => (
              <CarouselItem
                key={medicalPackage._id}
                className="p-2 md:basis-1/2 lg:basis-1/4"
              >
                <Service key={medicalPackage._id} {...medicalPackage} />
              </CarouselItem>
            ))}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

PackageServiceOther.propTypes = {
  isLoading: PropTypes.bool,
  medicalPackageSpecialty: PropTypes.array,
};

export default PackageServiceOther;
