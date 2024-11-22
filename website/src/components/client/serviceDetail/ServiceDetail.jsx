import { Button } from "@/components/ui/Button";
import { AiOutlineSchedule } from "react-icons/ai";
import { Skeleton } from "@/components/ui/Skeleton";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addToCart } from "@/redux/cartSlice";
import { useNavigate } from "react-router-dom";
import { toastUI } from "@/components/ui/Toastify";
import { initBookingDetails } from "@/redux/bookingSlice";

const ServiceDetail = ({ medicalPackage, service, isLoading }) => {
  const [selectedService, setSelectedService] = useState(null);
  const cartItems = useSelector((state) => state.cart.cart);
  const userProfile = useSelector((state) => state.auth.userProfile);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  useEffect(() => {
    if (medicalPackage?.services?.length > 0) {
      setSelectedService(medicalPackage.services[0]);
    }
  }, [medicalPackage]);

  const product = service || medicalPackage;
  const isService = !(product?.services?.length > 0);

  const isInCart = cartItems.some((item) =>
    isService
      ? item.serviceID === product?._id
      : item.medicalPackageID === product?._id
  );
  const handleAddToCart = () => {
    if (!userProfile) {
      toastUI("Vui lòng đăng nhập để đặt lịch", "warning");
      return;
    }

    const newItem = isService
      ? {
        serviceID: product._id,
        name: product.name,
        specialtyID: product.specialty._id,
        price: product.discountPrice,
        image: product.image,
      }
      : {
        medicalPackageID: product._id,
        name: product.name,
        levelID: selectedService._id,
        specialtyID: product.specialty._id,
        price: selectedService.discountPrice,
        levelName: selectedService.levelName,
        image: product.image,
        services: product.services,
      };

    if (!isInCart) {
      dispatch(addToCart(newItem));
      dispatch(
        initBookingDetails({
          ...(isService
            ? {
              serviceID: product._id,
            }
            : {
              medicalPackageID: product._id,
            }),
          bookingDetail: {
            specialtyID: product.specialty._id,
            ...(isService ? {} : { levelID: selectedService._id }),
            image: product.image,
            name: product.name,
            price: selectedService.discountPrice || 0,
            selectedBranchID: "",
            selectedDoctorID: "",
            selectedWorkScheduleID: "",
            selectedDate: "",
            selectedTime: "",
            clinic: "",
          },
        })
      );
    }
    navigate("/booking");
  };
  console.log(isService, "dsaghghj");

  if (isLoading) {
    return (
      <div className="mx-auto max-w-screen-2xl pb-4">
        <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md bg-white p-8 md:grid-cols-2 md:py-10">
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
      <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 rounded-md bg-white p-4 md:grid-cols-2">
        <div className="flex h-[400px] items-center">
          <img
            src={ `${import.meta.env.VITE_IMAGE_API_URL}/${product?.image}` }
            alt={ product?.name }
            className="h-full w-full rounded-md object-cover md:object-fill"
          />
        </div>
        <div className="flex w-full flex-col items-start justify-start pt-4 text-start">
          <div>
            <h4>{ isService ? "Dịch vụ" : "Gói khám" }</h4>
            <h3 className="mt-2 text-xl font-bold md:text-3xl">
              { product.name }
            </h3>
            <div className="my-2 flex items-center gap-2">
              <AiOutlineSchedule size={ 25 } />
              <span className="text-sm font-bold !text-gray-700">
                { product.orderCount || 0 } lượt đã đặt
              </span>
            </div>
            <p className="mb-4 w-full text-justify text-sm font-normal leading-[27px] text-gray-600">
              { product.shortDescription }
            </p>
          </div>
          <div>
            { product?.services && (
              <div className="mb-4 w-full">
                <h4 className="mb-2 text-lg font-semibold">Cấp độ gói:</h4>
                <ul className="flex list-inside items-center gap-3">
                  { product?.services?.map((item) => (
                    <li
                      key={ item._id }
                      className={ `cursor-pointer rounded-lg border px-3 py-2 text-sm font-normal text-gray-600 hover:border-primary-600 ${selectedService?._id === item._id ? "border-primary-600 bg-primary-50 text-primary-500" : "border-primary-200"}` }
                      onClick={ () => setSelectedService(item) }
                    >
                      { item.levelName }
                    </li>
                  )) }
                </ul>
              </div>
            ) }
            <div className="flex w-full flex-1 items-end gap-3">
              <div className="w-full">
                <span className="mb-4 block text-lg font-medium">
                  <strong className="mr-2 font-semibold">Giá:</strong>
                  <span className="mr-2 text-base font-semibold text-gray-600 line-through">
                    { !isService
                      ? selectedService?.price.toLocaleString()
                      : service.price.toLocaleString() }{ " " }
                    đ
                  </span>
                  <span className="font-semibold text-primary-500">
                    { !isService
                      ? selectedService?.discountPrice.toLocaleString()
                      : service.discountPrice.toLocaleString() }{ " " }
                    đ
                  </span>
                </span>
                <Button
                  className=""
                  size="lg"
                  variant="custom"
                  onClick={ handleAddToCart }
                >
                  { isInCart ? "Thanh toán ngay" : "Đặt lịch ngay" }
                </Button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceDetail;
