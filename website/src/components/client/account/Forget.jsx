import { Link } from "react-router-dom";
import { FaPhoneAlt } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { forgotSchema } from "@/zods/client/forgot";
import { authApi } from "@/services/authApi";
import { useMutation } from "@tanstack/react-query";
import toast from "react-hot-toast";


export default function ForgetComponent() {
  const navigate = useNavigate();

  const {
    handleSubmit,
    control,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(forgotSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const mutation = useMutation({
    mutationFn: authApi.sendOtpForgotPassword,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Mã OTP đã được gửi đến số điện thoại của bạn.");
      sessionStorage.setItem("otpTokenForgot", data.data.otpToken);
      const currentTime = new Date().getTime();
      sessionStorage.setItem("otpSentTimeForgot", currentTime);
      navigate("/changepassword-accuracy");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.");
      sessionStorage.removeItem("phoneNumberForgot");
    },
  });

  const onSubmit = (data) => {
    mutation.mutate(data.phoneNumber);
    sessionStorage.setItem("phoneNumberForgot", data.phoneNumber);
  };

  return (
    <div className="flex h-auto items-center justify-center bg-[#E8F2F7] px-2 py-3 md:px-3">
      <div className="py-5 px-3 md:px-5 w-[38%]">
        {/* FORM */ }
        <div className="bg-white px-5 py-4 md:px-11 md:py-8 rounded-lg">
          <h1 className="mb-2 text-center text-2xl font-bold md:text-3xl">
            Quên mật khẩu
          </h1>
          <p className="mb-6 text-center text-sm text-gray-400">
            Đặt lại mật khẩu của bạn
          </p>

          <form onSubmit={ handleSubmit(onSubmit) } className="relative">
            <div className="relative mb-2">
              <label
                htmlFor="phone"
                className="block font-semibold text-gray-700"
              >
                Số điện thoại:
              </label>
              <div className="relative">
                <InputCustom
                  className=""
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

            <div className="my-2 text-right text-sm italic">
              <Link
                to={ "/login" }
                className="text-base font-bold italic text-primary-500 hover:underline"
              >
                Quay lại
              </Link>
            </div>

            <button
              className="my-4 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-lg font-semibold text-white hover:bg-primary-500"
              disabled={ mutation.isPending }
            >
              { mutation.isPending ? "Đang xử lí" : "Xác nhận" }
              { mutation.isPending && (
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) }
            </button>

            <div className="mb-10 mt-3 flex flex-col items-center">
              <p className="text-center">
                Bạn chưa có tài khoản?
                <Link
                  to={ "/register" }
                  className="ml-1 block font-medium text-primary-500 hover:font-semibold hover:text-primary-800 md:inline"
                >
                  Đăng kí ngay!
                </Link>
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
