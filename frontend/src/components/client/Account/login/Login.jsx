import AdsProduct from "../../product/Ads";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/Carousel";
import Autoplay from "embla-carousel-autoplay";
import { Link } from "react-router-dom";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { useForm } from "react-hook-form";
import InputCustom from "@/components/ui/InputCustom";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/zods/account";
import { Button } from "@/components/ui/Button";
import { API_LOGIN_GOOGLE } from "@/configs/varibles";
export default function LoginComponent() {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(accountSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
  };
  const handleLoginGoogle = async () => {
    window.location.href = API_LOGIN_GOOGLE;
  };

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100 px-2 py-20 md:px-3">
      <div className="w-full max-w-screen-xl px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2">
          {/* FORM */}
          <div className="bg-white px-5 py-16 shadow-lg md:px-11 md:py-20">
            <h1 className="mb-2 text-center text-4xl font-bold md:text-5xl">
              Đăng nhập
            </h1>
            <p className="mb-6 text-center text-sm text-gray-400">
              Đăng nhập với số điện thoại và mật khẩu
            </p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label
                  htmlFor="phone"
                  className="block font-semibold text-gray-700"
                >
                  Số điện thoại:
                </label>
                <div className="relative">
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaPhone className="text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  </span> */}
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Nhập số điện thoại"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    icon={<FaPhoneAlt></FaPhoneAlt>}
                    control={control}
                    errors={errors}
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
                  {/* <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  </span> */}
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    placeholder="Mật khẩu"
                    name="password"
                    type="password"
                    id="password"
                    icon={<FaLock></FaLock>}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label
                    htmlFor="remember"
                    className="ml-2 block text-sm text-gray-700"
                  >
                    Ghi nhớ tôi
                  </label>
                </div>
                <Link
                  to="/forget-password"
                  className="text-sm font-bold italic text-primary-500 hover:underline"
                >
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="text-center">
                <Button size="full" variant="primary">
                  Đăng nhập
                </Button>
              </div>
              <div className="my-2 flex items-center">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-sm text-gray-800">
                  Hoặc tiếp tục với
                </span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {/* GG - FB LOGIN */}
              <div className="block justify-center md:flex md:space-x-2">
                <button
                  onClick={handleLoginGoogle}
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-4 py-3 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 md:flex-1 md:px-1"
                >
                  <img
                    src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png"
                    className="mr-2 w-7 md:mr-2"
                    alt="Google icon"
                  />
                  <span className="mr-4 block md:mr-0">Tài khoản Google</span>
                </button>
                <button
                  type="button"
                  className="flex-2 bg-customGray-50 my-2 flex w-[100%] items-center justify-center rounded-lg bg-gray-500 bg-opacity-40 px-2 py-1 text-black hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 md:flex-1 md:px-1 md:py-1"
                >
                  <img
                    src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png"
                    className="mr-0 w-12 md:mr-0"
                    alt="Facebook icon"
                  />
                  <span className="block">Tài khoản Facebook</span>
                </button>
              </div>
              <div className="mb-10 mt-3 flex flex-col items-center">
                <p className="text-center">
                  Bạn chưa có tài khoản?
                  <Link
                    to={"/register"}
                    className="ml-1 block font-medium text-primary-500 hover:font-semibold hover:text-primary-800 md:inline"
                  >
                    Đăng kí ngay!
                  </Link>
                </p>
              </div>
            </form>
          </div>
          {/* ADS BANNER */}
          <div className="hidden bg-gray-200 shadow-lg md:block">
            <Carousel
              opts={{
                align: "start",
                loop: true,
              }}
              className="w-full"
              plugins={[
                Autoplay({
                  delay: 3500,
                  stopOnInteraction: false,
                  stopOnMouseEnter: false,
                }),
              ]}
            >
              <CarouselContent>
                {Array.from({ length: 12 }).map((_, index) => (
                  <CarouselItem key={index} className="pl-4">
                    <AdsProduct />
                  </CarouselItem>
                ))}
              </CarouselContent>
            </Carousel>
          </div>
        </div>
      </div>
    </div>
  );
}
