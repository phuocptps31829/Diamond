import PropTypes from "prop-types";
import { useMemo } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
  CarouselNext,
  CarouselPrevious,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Skeleton } from "@/components/ui/Skeleton";
import DoctorItem from "@/components/client/product/Doctor";

export default function OtherDoctor({ doctor = {}, doctors = [], isLoading }) {
  const doctorsBySpecialty = useMemo(() => {
    if (doctor.otherInfo?.specialty._id) {
      return doctors.filter(
        (item) =>
          item.otherInfo?.specialty._id === doctor.otherInfo?.specialty._id &&
          item._id !== doctor._id
      );
    }
    return doctors;
  }, [doctor, doctors]);

  const shouldShowNavigation = doctorsBySpecialty.length > 2;

  if (doctorsBySpecialty.length === 0) return null;

  return (
    <div className="mx-auto max-w-screen-xl px-5">
      <h2 className="relative flex text-[24px] font-bold">
        <span className="absolute h-[90%] w-[8px] animate-pulse bg-orange-500 duration-300"></span>
        <span className="sm:text-md pl-5 text-[22px]">
          Bác sĩ cùng chuyên khoa
        </span>
      </h2>

      <Carousel
        opts={{
          align: "start",
          loop: true,
        }}
        className="my-4 w-full"
        plugins={[
          Autoplay({
            delay: 3500,
            stopOnInteraction: false,
            stopOnMouseEnter: false,
          }),
        ]}
      >
        <CarouselContent>
          {isLoading
            ? Array.from({ length: 5 }).map((_, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4"
                >
                  <div className="overflow-hidden rounded-lg border">
                    <Skeleton className="h-40 w-full" />
                    <div className="flex flex-col bg-white px-3 pb-3">
                      <Skeleton className="mt-4 h-4 w-1/2" />
                      <Skeleton className="mt-2 h-6 w-3/4" />
                      <hr className="my-2" />
                      <Skeleton className="mt-2 h-4 w-full" />
                      <Skeleton className="mt-4 h-10 w-full" />
                    </div>
                  </div>
                </CarouselItem>
              ))
            : doctorsBySpecialty.map((doctor, index) => (
                <CarouselItem
                  key={index}
                  className="basis-1/2 pl-4 md:basis-1/3 lg:basis-1/4"
                >
                  <DoctorItem key={doctor._id} doctor={doctor} />
                </CarouselItem>
              ))}
        </CarouselContent>
        {shouldShowNavigation && <CarouselPrevious />}
        {shouldShowNavigation && <CarouselNext />}
      </Carousel>
    </div>
  );
}

OtherDoctor.propTypes = {
  doctor: PropTypes.object,
  doctors: PropTypes.array,
  isLoading: PropTypes.bool,
};
