import { Button } from "@/components/ui/Button";
import { ToastAction } from "@/components/ui/Toast";
import { useToast } from "@/hook/use-toast";
import { AiOutlineSchedule } from "react-icons/ai";
import PropTypes from "prop-types";
const ServiceDetail = ({ medicalPackage , isLoading}) => {
  const { image, name, orderCount, shortDescription, services } =
    medicalPackage;
  const { toast } = useToast();
  if (isLoading) {
    return <div>Loading...</div>;
  }
  return (
    <div className="mx-auto max-w-screen-2xl pb-4">
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md border bg-white p-8 md:grid-cols-2 md:py-10">
        <div className="container flex items-center justify-center">
          <img src={image} alt={name} className="h-auto w-9/12" />
        </div>

        <div className="flex flex-col items-start justify-center text-start">
          <h3 className="mb-4 text-xl font-bold md:text-3xl">{name}</h3>
          <div className="my-4 flex items-center gap-2">
            <AiOutlineSchedule size={25} />
            <span className="text-sm font-bold !text-gray-700">
              {orderCount} lượt đặt lịch
            </span>
          </div>

          <p className="mb-4 text-justify text-sm font-normal leading-[27px] text-gray-600">
            {shortDescription}
          </p>
          <span className="mb-6 block text-lg font-medium">
            <strong className="font-semibold">Giá:</strong>{" "}
            {services[0].price.toLocaleString()} đ
          </span>

          <div className="mb-4 flex w-full items-center gap-3">
            <Button
              className="w-full"
              size="lg"
              variant="custom"
              onClick={() => {
                toast({
                  variant: "success",
                  title: "Uh oh! Something went wrong.",
                  description: "There was a problem with your request.",
                  action: (
                    <ToastAction altText="Try again">Try again</ToastAction>
                  ),
                });
              }}
            >
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
  medicalPackage: PropTypes.shape({

    image: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    orderCount: PropTypes.number.isRequired,
    shortDescription: PropTypes.string.isRequired,
    services: PropTypes.arrayOf(
      PropTypes.shape({
        price: PropTypes.number.isRequired,
      }),
    ).isRequired,
  }).isRequired,
};

export default ServiceDetail;
