import { useState, useRef, useEffect } from "react";
import { useMutation } from "@tanstack/react-query";
import OtpInput from "react-otp-input";
import { useNavigate } from "react-router-dom";
import NotFound from "@/components/ui/NotFound";
import { authApi } from "@/services/authApi";
import toast from "react-hot-toast";
import { formatPhoneNumber, formatTime } from "@/utils/format";

export default function ChangePassAccuracyComponent() {
  const navigate = useNavigate();
  const inputRefs = useRef([]);
  const [phoneNumber, setPhoneNumber] = useState("");
  const [otpToken, setOtpToken] = useState("");
  const [otp, setOtp] = useState(new Array(6).fill(""));
  const [timeLeft, setTimeLeft] = useState(0);
  const [sendOtpAgain, setSendOtpAgain] = useState(true);

  useEffect(() => {
    if (sendOtpAgain) {
      const phoneNumber = sessionStorage.getItem("phoneNumberForgot");
      setPhoneNumber(phoneNumber);
      const otpToken = sessionStorage.getItem("otpTokenForgot");
      setOtpToken(otpToken);

      const otpSentTime = sessionStorage.getItem("otpSentTimeForgot");
      const currentTime = new Date().getTime();
      const timeElapsed = (currentTime - otpSentTime) / 1000; // Thời gian đã trôi qua tính bằng giây
      const otpExpiration = 90; // Thời gian hết hạn OTP (300 giây = 5 phút)
      const timeRemaining = Math.max(otpExpiration - timeElapsed, 0);
      setTimeLeft(timeRemaining);
    }

    setSendOtpAgain(false);
  }, [sendOtpAgain]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

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
    mutationFn: authApi.checkOtpForgotPassword,
    onSuccess: (data) => {
      toast.success("Xác thực thành công!");
      setOtp(new Array(6).fill(""));
      sessionStorage.removeItem("phoneNumberForgot");
      sessionStorage.setItem("otpForgot", data.data.OTP);
      sessionStorage.setItem("otpTokenForgot", data.data.otpToken);
      setOtp(new Array(6).fill(""));
      sessionStorage.removeItem("phoneNumberForgot");
      navigate("/change-password");
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.");
    },
  });

  const mutationSendOtpAgain = useMutation({
    mutationFn: authApi.sendOtpForgotPassword,
    onSuccess: (data) => {
      toast.success("Đã gửi mã OTP mới.");
      sessionStorage.setItem("otpTokenForgot", data.data.otpToken);
      const currentTime = new Date().getTime();
      sessionStorage.setItem("otpSentTimeForgot", currentTime);
      setSendOtpAgain(true);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.");
    },
  });

  const handleSubmitOTP = () => {
    const otpValue = otp.join("");

    if (otpValue.length < 6) {
      toast.error("Vui lòng nhập đủ 6 số OTP.");
      return;
    }

    const data = {
      OTP: otpValue,
      otpToken: otpToken,
    };

    mutation.mutate(data);
  };

  useEffect(() => {
    console.log("inputRefs.current[0]: ", inputRefs.current[0]);
    if (inputRefs.current[0]) {
      inputRefs.current[0].focus();
    }
  }, []);

  const handleSendAgainOtp = () => {
    if (timeLeft > 0) {
      toast.error("Vui lòng đợi thêm một chút để gửi lại mã OTP.");
      return;
    }

    mutationSendOtpAgain.mutate(phoneNumber);
  };

  if (!phoneNumber || !otpToken) {
    return <NotFound />;
  }

  return (
    <div className="flex h-auto items-center justify-center bg-[#E8F2F7] px-2 py-10 md:px-3">
      <div className="w-full max-w-[90%] md:max-w-[60%] xl:max-w-[38%]">
        <div className="grid grid-cols-1">
          {/* FORM */ }
          <div className="rounded-lg bg-white px-5 py-6 md:px-11 md:py-10">
            <h1 className="mb-1 text-center text-2xl font-bold md:text-3xl">
              Xác thực tài khoản
            </h1>
            <p className="mb-6 text-center text-sm text-gray-700">
              Nhập mã 6 số đã gửi cho bạn qua số điện thoại
              { " " }
              <strong className="text-primary-500">
                { formatPhoneNumber(phoneNumber) }
              </strong>
            </p>

            <div className="relative mb-2">
              <OtpInput
                value={ otp.join("") }
                onChange={ (value) => handleChange(value, otp.length) }
                numInputs={ 6 }
                renderInput={ (props, index) => (
                  <input
                    { ...props }
                    value={ otp[index] }
                    ref={ (el) => (inputRefs.current[index] = el) }
                    onKeyDown={ (e) => handleKeyDown(e, index) }
                    onChange={ (e) => handleChange(e.target.value, index) }
                    className="h-10 flex-1 rounded-md border bg-[#e1e1e1] text-center text-xl focus:outline-none focus:ring-2 focus:ring-primary-500 sm:h-16"
                  />
                ) }
                containerStyle="flex justify-center space-x-2 sm:space-x-5"
              />
            </div>
            <span className="my-5 flex items-center justify-between text-sm">
              <p>
                Yêu cầu mã OTP mới sau:{ " " }
                <span className="font-bold text-primary-500">
                  { formatTime(timeLeft) }
                </span>
              </p>
              <button
                className="flex items-center gap-2 hover:text-primary-400"
                onClick={ handleSendAgainOtp }
                disabled={ mutationSendOtpAgain.isPending }
              >
                { mutationSendOtpAgain.isPending
                  ? "Đang xử lí"
                  : "Gửi lại mã OTP" }
                { mutationSendOtpAgain.isPending && (
                  <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                ) }
              </button>
            </span>

            <button
              onClick={ handleSubmitOTP }
              className="my-4 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-3 text-lg font-semibold text-white hover:bg-primary-500"
              disabled={ mutation.isPending }
            >
              { mutation.isPending ? "Đang xử lí" : "Xác thực" }
              { mutation.isPending && (
                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
              ) }
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
