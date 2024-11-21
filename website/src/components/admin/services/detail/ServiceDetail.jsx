import { AiOutlineSchedule } from "react-icons/ai";
import PropTypes from "prop-types";
import { Skeleton } from "@/components/ui/Skeleton";
import { Button } from "@/components/ui/Button";

const ServiceDetail = ({ service, isLoading }) => {
  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl pb-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
          <div className="container flex items-center justify-center">
            <Skeleton className="h-[400px] w-[400px] overflow-hidden rounded-md" />
          </div>
          <div className="flex flex-col items-start justify-center text-start">
            <Skeleton className="mb-4 h-8 w-3/4 md:h-12" />
            <div className="my-4 flex items-center gap-2">
              <Skeleton className="h-6 w-6" />
              <Skeleton className="h-6 w-1/2" />
            </div>
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-4 h-6 w-full" />
            <Skeleton className="mb-6 h-8 w-1/2" />
            <div className="mb-4 flex w-full items-center gap-3">
              <Skeleton className="h-12 w-full" />
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-screen-2xl pb-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
        <div className="container flex items-center justify-center">
          <img
            src={`${import.meta.env.VITE_IMAGE_API_URL}/${service?.image}`}
            alt={service?.name}
            className="h-auto w-[90%]"
          />
        </div>
        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="mb-4 text-xl font-bold md:text-3xl">{service.name}</h3>
          <div className="my-4 flex items-center gap-2">
            <AiOutlineSchedule size={25} />
            <span className="text-sm font-bold !text-gray-700">
              {service.orderCount} lượt đặt lịch
            </span>
          </div>
          <p className="mb-4 text-justify text-sm font-normal leading-[27px] text-gray-600">
            {service.shortDescription}
          </p>
          <span className="mb-6 block text-lg font-medium">
            <strong className="font-semibold">Giá:</strong>{" "}
            {service.price.toLocaleString()} đ
          </span>
          <div className="mb-4 flex w-full items-center gap-3">
            <Button className="w-full" size="lg" variant="custom">
              Đặt lịch ngay
            </Button>
          </div>
        </div>
      </div>
    </div>
  );
};

ServiceDetail.propTypes = {
  isLoading: PropTypes.bool,
  service: PropTypes.object,
};

export default ServiceDetail;
