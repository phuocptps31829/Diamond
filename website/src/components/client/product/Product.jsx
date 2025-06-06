import { Link, useNavigate } from "react-router-dom";
import { SiTicktick } from "react-icons/si";
import { AiOutlineDoubleRight } from "react-icons/ai";
import { MdOutlineAddCircle } from "react-icons/md";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";
import { useDispatch, useSelector } from "react-redux";
import { addToCart, removeFromCart } from "@/redux/cartSlice";
import { useEffect, useState } from "react";
import { removeItemInfo, initBookingDetails } from "@/redux/bookingSlice";
import { RiDeleteBackFill } from "react-icons/ri";
import { formatPrice } from "@/utils/format";
import toast from "react-hot-toast";

export default function Product({ product }) {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const cartItems = useSelector((state) => state.cart.cart);
  const profileCustomer = useSelector((state) => state.auth.userProfile);
  const [isInCart, setIsInCart] = useState(false);

  const {
    _id,
    name,
    slug,
    specialty,
    price,
    discountPrice,
    image,
    orderCount,
    services,
  } = product;

  const isService = !services || !services?.length;

  useEffect(() => {
    const isExists = cartItems.some((item) =>
      isService ? item.serviceID === _id : item.medicalPackageID === _id
    );
    setIsInCart(isExists);
  }, [cartItems, _id, isService]);

  const handleAddClick = (isNavigate) => {
    if (!profileCustomer) {
      toast.error("Vui lòng đăng nhập để đặt lịch.");

      return;
    }

    const newItem = isService
      ? {
        serviceID: _id,
        name,
        specialtyID: specialty?._id,
        price: discountPrice,
        image,
      }
      : {
        medicalPackageID: _id,
        name,
        levelID: services[0]._id,
        specialtyID: specialty._id,
        price: services[0].discountPrice,
        levelName: services[0].levelName,
        image,
        services,
      };

    const toBookingItem = {
      ...(isService
        ? {
          serviceID: _id,
        }
        : {
          medicalPackageID: _id,
        }),
      bookingDetail: {
        specialtyID: specialty._id,
        ...(isService ? {} : { levelID: services[0]._id }),
        name,
        image,
        price: isService ? discountPrice : services[0].discountPrice,
        selectedBranchID: "",
        selectedDoctorID: "",
        selectedWorkScheduleID: "",
        selectedDate: "",
        selectedTime: "",
        clinic: "",
      },
    };

    if (!isInCart) {
      dispatch(addToCart(newItem));
      dispatch(
        initBookingDetails(toBookingItem)
      );
    } else {
      if (!isNavigate) {
        dispatch(removeFromCart({ _id, isService: isService }));
        dispatch(removeItemInfo({ _id, isService: isService }));
        setIsInCart(false);
      }
    }

    if (isNavigate) {
      navigate("/booking");
    }
  };

  return (
    <div className="flex h-full flex-col overflow-hidden rounded-xl bg-white">
      <Link
        to={ isService ? `/service/${slug}` : `/package/${slug}` }
        className="group block w-full overflow-hidden"
      >
        <img
          src={ `${import.meta.env.VITE_IMAGE_API_URL}/${image}` }
          alt={ name }
          className="ease w-full transform object-cover transition-transform duration-500 group-hover:scale-[1.15] aspect-[2/1]"
        />
      </Link>
      <div className="mt-1 flex flex-1 flex-col justify-between p-3 md:p-5 md:pt-2">
        { services && services?.length > 0 ? (
          <Link
            to={ `/package/${slug}` }
            className="text-[9px] font-bold uppercase text-[#7a7a7a] md:text-[11px]"
          >
            { services[0].levelName }
          </Link>
        ) : (
          ""
        ) }
        <div className="mb-1 flex-1">
          <Link
            to={ isService ? `/service/${slug}` : `/package/${slug}` }
            className="my-1 text-sm font-bold text-[#3e3e3e] md:text-xl line-clamp-2 uppercase"
          >
            { name }
          </Link>
        </div>
        <div>
          <hr className="mb-1" />
          <div className="flex items-center space-x-2 py-1">
            <span className="text-xs font-semibold text-primary-500 sm:text-lg">
              { formatPrice(
                services && services?.length > 0
                  ? services[0].discountPrice
                  : discountPrice
              ) }
            </span>
            <span className="text-[10px] text-gray-400 line-through sm:text-sm">
              { formatPrice(
                services && services?.length > 0 ? services[0].price : price
              ) }
            </span>
          </div>
          <hr className="mb-1" />
          <div className="flex items-center justify-between sm:mt-2">
            <div className="flex gap-[3px] text-[8px] opacity-85 md:text-[12px]">
              { product?.applicableObject?.age?.min + " - " + product?.applicableObject?.age?.max } tuổi
              {/* { product?.applicableObject?.gender === '0' ?
                "Nam/Nữ"
                : product?.applicableObject?.gender
              } */}
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger
                  className="cursor-pointer"
                  asChild>
                  <div className="flex items-center gap-1 text-[9px] font-semibold md:gap-2 md:text-[12px]">
                    <SiTicktick /> { orderCount }
                  </div>
                </TooltipTrigger>
                <TooltipContent>
                  { orderCount } lượt đặt
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
          <div className="mt-2 flex w-full items-center justify-center gap-2">
            <div
              onClick={ () => handleAddClick(true) }
              className="flex h-full flex-[7] cursor-pointer items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]"
            >
              Đặt ngay <AiOutlineDoubleRight />
            </div>
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger className="h-full flex-[2] items-center justify-center">
                  <button
                    onClick={ () => handleAddClick(false) }
                    className={ `group flex h-full w-full items-center justify-center rounded-md border py-1 text-[10px] font-semibold transition duration-300 ease-in-out md:py-2 md:text-[13px] ${isInCart
                      ? "bg-red-500 text-white"
                      : "bg-primary-500 text-primary-500"
                      }` }
                  >
                    { isInCart ? (
                      <RiDeleteBackFill className="text-base text-white transition-transform duration-300 ease-in-out group-hover:scale-125 md:text-lg" />
                    ) : (
                      <MdOutlineAddCircle className="text-base text-white transition-transform duration-300 ease-in-out group-hover:scale-125 md:text-xl" />
                    ) }
                  </button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>{ isInCart ? "Xóa khỏi y tế" : "Thêm giỏ y tế" }</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          </div>
        </div>
      </div>
    </div>
  );
}
