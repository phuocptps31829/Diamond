import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaLock, FaUser } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { registerSchema } from "@/zods/client/register";
import AdsProduct from "../product/Ads";
import { useMutation } from "@tanstack/react-query";

import { authApi } from "@/services/authApi";
import { toast } from "react-toastify";

export default function RegisterComponent() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  console.log("control:", control);

  const mutation = useMutation({
    mutationFn: authApi.registerSendOtp,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đăng ký thành công, vui lòng nhập mã OTP để xác nhận.");
      const currentTime = new Date().getTime();
      sessionStorage.setItem("otpSentTime", currentTime);
      sessionStorage.setItem("otpToken", data.data.otpToken);
      navigate("/accuracy");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.");
      sessionStorage.removeItem("phoneNumber");
      sessionStorage.removeItem("fullName");
      sessionStorage.removeItem("password");
    },
  });

  const onSubmit = (data) => {
    const { phoneNumber, password, fullName } = data;

    const dataSend = {
      fullName,
      password,
      phoneNumber,
    };

    sessionStorage.setItem("phoneNumber", phoneNumber);
    sessionStorage.setItem("fullName", fullName);
    sessionStorage.setItem("password", password);
    mutation.mutate(dataSend);
  };

  const handleLoginGoogle = () => {
    window.location.href = `${import.meta.env.VITE_CUD_API_URL}/auth/google`;
  };

  return (
    <div className="flex h-auto items-center justify-center bg-[#E8F2F7] px-2 py-3 md:px-3">
      <div className="md:max-w-screen-lg py-5 px-3 md:px-5 md:w-auto w-full max-w-[500px]">
        <div className="grid grid-cols-1 md:grid-cols-2 rounded-lg overflow-hidden bg-white">
          {/* ADS BANNER */ }
          <div className="hidden bg-white md:block">
            <Carousel
              opts={ {
                align: "start",
                loop: true,
              } }
              className="h-96 w-full"
              plugins={ [
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                }),
              ] }
            >
              <CarouselContent>
                { Array.from({ length: 3 }).map((_, index) => (
                  <CarouselItem key={ index } className="h-full pl-4">
                    <AdsProduct index={ index } isLoginForm={ false } />
                  </CarouselItem>
                )) }
              </CarouselContent>
            </Carousel>
          </div>

          {/* FORM */ }
          <div className="bg-white px-5 md:px-11 py-4 border-l rounded-lg md:rounded-none">
            <h1 className="mb-2 text-center text-2xl font-bold md:text-4xl pt-4">
              Đăng kí tài khoản
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Đăng kí ngay để sử dụng dịch vụ
            </p>

            <form onSubmit={ handleSubmit(onSubmit) }>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Họ và tên:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập tên của bạn"
                    name="fullName"
                    type="text"
                    id="fullName"
                    icon={ <FaUser></FaUser> }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Số điện thoại:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    icon={ <FaPhoneAlt></FaPhoneAlt> }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="password"
                  className="block font-semibold text-gray-700"
                >
                  Mật khẩu:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập mật khẩu"
                    name="password"
                    type="password"
                    id="password"
                    icon={ <FaLock></FaLock> }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
              <div className="mb-2">
                <label
                  htmlFor="confirmPassword"
                  className="block font-semibold text-gray-700"
                >
                  Nhập lại mật khẩu:
                </label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    icon={ <FaLock></FaLock> }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>

              <button
                className="my-5 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-lg font-semibold text-white hover:bg-primary-500"
                disabled={ mutation.isPending }
              >
                { mutation.isPending ? "Đang xử lí" : "Đăng ký" }
                { mutation.isPending && (
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) }
              </button>

              <div className="my-2 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-800">
                  Hoặc tiếp tục với
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* GG - FB LOGIN */ }
              <div className="block justify-center md:flex md:space-x-2">
                <button
                  onClick={ handleLoginGoogle }
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-4 py-[10px] text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 md:flex-1 md:px-1"
                >
                  <img
                    src="https://t3.ftcdn.net/jpg/05/18/09/32/360_F_518093233_bYlgthr8ZLyAUQ3WryFSSSn3ruFJLZHM.jpg"
                    className="mr-2 w-7 md:mr-2"
                    alt="Google icon"
                  />
                  <span className="mr-4 block md:mr-0">Google</span>
                </button>
                <button
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-2 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 md:flex-1 md:px-1"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
                    className="mr-0 w-10 md:mr-2"
                    alt="Facebook icon"
                  />
                  <span className="block">Facebook</span>
                </button>
              </div>

              <div className="mb-4 mt-3 flex flex-col items-center">
                <p className="text-center">
                  Bạn đã có tài khoản?
                  <Link
                    to={ "/login" }
                    className="ml-1 block font-medium text-primary-500 hover:font-semibold hover:text-primary-800 md:inline"
                  >
                    Đăng nhập ngay!
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
