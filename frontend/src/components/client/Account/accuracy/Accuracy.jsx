import { useState, useRef, useEffect } from "react";
import { Link } from "react-router-dom";
import { formatPhoneNumber } from "@/utils/formatPhoneNumber";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@/components/ui/Toast";
import { useMutation } from "@tanstack/react-query";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import { otpUserVerification } from "@/services/authApi";

export default function AccurancyComponent() {
  const { toast } = useToast();
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));

  useEffect(() => {
    const phoneNumber = localStorage.getItem("phoneNumber");
    setPhoneNumber(phoneNumber);
    const otpToken = localStorage.getItem("otpToken");
    setOtpToken(otpToken);
  }, []);

  const handleChange = (value, index) => {
    const newOtp = [...otp];
    newOtp[index] = value;

    setOtp(newOtp);

    if (value && index < inputRefs.current.length - 1) {
      inputRefs.current[index + 1].focus();
    }
  };

  const handleKeyDown = (e, index) => {
    if (e.key === "Backspace") {
      const newOtp = [...otp];
      newOtp[index] = "";
      setOtp(newOtp);

      if (index > 0) {
        inputRefs.current[index - 1].focus();
      }
    }
  };

  const mutation = useMutation({
    mutationFn: otpUserVerification,
    onSuccess: () => {
      toast({
        variant: "success",
        title: "Xác thực thành công!",
        description: "Bạn đã xác thực tài khoản thành công.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      setOtp(new Array(6).fill(""));
      localStorage.removeItem("phoneNumber");
      localStorage.removeItem("otpToken");
      navigate("/login");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast({
        variant: "destructive",
        title: "Xác thực thất bại!",
        description: errorMessage,
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
    },
  });

  const handleSubmit = () => {
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      toast({
        variant: "destructive",
        title: "Xác thực thất bại!",
        description: "Vui lòng nhập đủ 6 số.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
      return;
    }

    console.log(otpValue, typeof otpValue);

    const data = {
      OTP: otpValue,
      otpToken: otpToken,
    };

    console.log("data: ", data);

    mutation.mutate(data);
  };

  useEffect(() => {
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  return (
    <div className="flex h-auto items-center justify-center bg-gray-100 px-2 py-20 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white px-5 py-16 shadow-lg md:px-11 md:py-20">
            <h1 className="mb-4 text-center text-4xl font-bold md:text-5xl">
              Xác thực tài khoản
            </h1>
            <p className="mb-2 text-center text-sm text-gray-700">
              Vui lòng nhập mã 6 số đã gửi cho bạn qua số điện thoại
            </p>

            <p className="mb-4 text-center text-sm text-gray-600">
              Số điện thoại:{" "}
              <strong className="text-primary-500">
                {formatPhoneNumber(phoneNumber)}
              </strong>
            </p>
            <div className="relative mb-2">
              <OtpInput
                value={otp.join("")}
                onChange={(value) => handleChange(value, otp.length)}
                numInputs={6}
                renderInput={(props, index) => (
                  <input
                    {...props}
                    value={otp[index]}
                    ref={(el) => (inputRefs.current[index] = el)}
                    onKeyDown={(e) => handleKeyDown(e, index)}
                    onChange={(e) => handleChange(e.target.value, index)}
                    className="h-10 flex-1 rounded-md border bg-[#e1e1e1] text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary-500 sm:h-16"
                  />
                )}
                containerStyle="flex justify-center space-x-2 sm:space-x-5"
              />
            </div>
            <span className="my-5 flex items-center justify-between text-sm">
              <p>Mã OTP sẽ hết hạn sau 5 phút</p>{" "}
              <button className="hover:text-primary-400">Gửi lại mã OTP</button>
            </span>

            <button
              onClick={handleSubmit}
              className="my-4 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-3 text-xl font-semibold text-white hover:bg-primary-500"
              disabled={mutation.isPending}
            >
              {mutation.isPending ? "Đang xử lí" : "Xác thực"}
              {mutation.isPending && (
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              )}
            </button>

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
                Bạn đã có tài khoản?
                <Link
                  to={"/login"}
                  className="ml-1 block font-medium text-primary-500 hover:font-semibold hover:text-primary-800 md:inline"
                >
                  Đăng nhập ngay!
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
