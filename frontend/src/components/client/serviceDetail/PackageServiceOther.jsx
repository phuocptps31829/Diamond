import { Skeleton } from "@/components/ui/Skeleton";
import PackageProduct from "../product/Package";
import ServiceProduct from "../product/Service";
import PropTypes from "prop-types";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";

const PackageServiceOther = ({ medicalPackageSpecialty, isLoading, serviceSpecialty }) => {

  const renderSkeletons = () => (
    <div className="grid grid-cols-2 gap-5 sm:grid-cols-2 lg:grid-cols-4">
      {Array.from({ length: 4 }).map((_, index) => (
        <Skeleton key={index} className="h-64 w-full" />
      ))}
    </div>
  );

  const renderCarouselItems = (items, Component) => (
    items.map((item) => (
      <CarouselItem key={item._id} className="p-2 md:basis-1/2 lg:basis-1/4">
        <Component {...item} />
      </CarouselItem>
    ))
  );

  if (isLoading) {
    return (
      <div className="mx-auto max-w-7xl p-4">
        <h1 className="my-6 text-center text-2xl font-bold">Các gói khám khác</h1>
        {renderSkeletons()}
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-7xl p-4">
      <h1 className="my-6 text-center text-2xl font-bold">Các gói khám khác</h1>
      <Carousel opts={{ align: "start", loop: true }} className="w-full">
        <CarouselContent className="md:m-0 ml-1">
          {medicalPackageSpecialty && medicalPackageSpecialty.length > 0
            ? renderCarouselItems(medicalPackageSpecialty, PackageProduct)
            : renderCarouselItems(serviceSpecialty, ServiceProduct)}
        </CarouselContent>
        <CarouselPrevious />
        <CarouselNext />
      </Carousel>
    </div>
  );
};

PackageServiceOther.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  medicalPackageSpecialty: PropTypes.array,
  serviceSpecialty: PropTypes.array,
};

PackageServiceOther.defaultProps = {
  medicalPackageSpecialty: [],
  serviceSpecialty: [],
};

export default PackageServiceOther;
