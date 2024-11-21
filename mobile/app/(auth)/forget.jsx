import { useState, useEffect, useRef, createRef } from "react";
import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  ActivityIndicator,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import Input from "../../components/ui/Input";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { formatTime } from "../../utils/formatTime";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { forgetSchema } from "../../zods/forgetSchema";
import { resetPasswordSchema } from "../../zods/resetPasswordSchema";
import { useMutation } from "@tanstack/react-query";
import ToastUI from "../../components/ui/Toast";
import { authApi } from "../../services/authApi";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import AsyncStorage from "@react-native-async-storage/async-storage";

const Forget = () => {
  const [formChangePassword, setFormChangePassword] = useState(false);
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sendOtpAgain, setSendOtpAgain] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const otpRefs = useRef(otp.map(() => createRef()));
  const [phoneNumber, setPhoneNumber] = useState("");

  useEffect(() => {
    const fetchOtpTime = async () => {
      if (sendOtpAgain) {
        const otpSentTime = Number(await AsyncStorage.getItem("otpSentTime"));
        const currentTime = new Date().getTime();
        const timeElapsed = (currentTime - otpSentTime) / 1000;
        const otpExpiration = 90;
        const timeRemaining = Math.max(otpExpiration - timeElapsed, 0);
        setTimeLeft(timeRemaining);
      }
      setSendOtpAgain(false);
    };
    fetchOtpTime();
  }, [sendOtpAgain]);

  useEffect(() => {
    if (timeLeft > 0) {
      const timerId = setInterval(() => {
        setTimeLeft((prev) => Math.max(prev - 1, 0));
      }, 1000);

      return () => clearInterval(timerId);
    }
  }, [timeLeft]);

  const handleOtpChange = (text, index) => {
    if (!/^\d$/.test(text) && text !== "") return;
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      const nextInput = index + 1;
      otpRefs.current[nextInput]?.current?.focus();
    }
  };

  const handleKeyPress = (event, index) => {
    if (
      event.nativeEvent.key === "Backspace" &&
      !otp[index] &&
      index > 0 &&
      index !== 5
    ) {
      const prevInput = index - 1;
      const updatedOtp = [...otp];
      updatedOtp[prevInput] = "";
      setOtp(updatedOtp);
      otpRefs.current[prevInput]?.current?.focus();
    } else if (event.nativeEvent.key === "Backspace" && index === 5) {
      const updatedOtp = ["", "", "", "", "", ""];
      setOtp(updatedOtp);
      otpRefs.current[0]?.current?.focus();
    }
  };

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(forgetSchema),
    defaultValues: {
      phoneNumber: "",
    },
  });

  const {
    handleSubmit: handleSubmitReset,
    formState: { errors: errorsReset },
    control: controlReset,
  } = useForm({
    resolver: zodResolver(resetPasswordSchema),
    defaultValues: {
      newPassword: "",
      confirmPassword: "",
    },
  });

  const onSubmitReset = async (data) => {
    const otpForgot = await AsyncStorage.getItem("otpForgot");
    const tokenForgotChangePassword = await AsyncStorage.getItem("tokenForgotChangePassword");
    changePasswordForgotMutation({
      OTP: otpForgot,
      otpToken: tokenForgotChangePassword,
      password: data.newPassword,
    });
  };

  const { mutate: sendOtpForgotPassword, isPending } = useMutation({
    mutationFn: (phone) => {
      return authApi.sendOtpForgotPassword(phone);
    },
    onSuccess: async (data) => {
      ToastUI({
        type: "success",
        text1: "Thành công",
        text2: "Mã OTP sẽ được gửi đến số điện thoại qua cuộc gọi.",
      });
      await AsyncStorage.setItem("phoneNumber", phoneNumber);
      await AsyncStorage.setItem("otpTokenForgot", data.data.otpToken);
      await AsyncStorage.setItem(
        "otpSentTime",
        new Date().getTime().toString()
      );
      setVerifyOtp(true);
      setSendOtpAgain(true);
    },
    onError: (error) => {
      console.log("error.response", error.response);
      setPhoneNumber("");
      const errorMessage = error.response?.data?.message;
      ("Đã xảy ra lỗi, vui lòng thử lại.");
      ToastUI({
        type: "error",
        text1: "Thất bại",
        text2: errorMessage,
      });
    },
  });

  const onSubmit = (data) => {
    setPhoneNumber(data.phoneNumber);
    sendOtpForgotPassword(data.phoneNumber);
  };

  const handleSendAgainOtp = async () => {
    const phoneNumber = await AsyncStorage.getItem("phoneNumber");
    sendOtpForgotPassword(phoneNumber);
  };

  const { mutate: changePasswordForgotMutation, isPending: isChangePassword } =
    useMutation({
      mutationFn: (data) => {
        return authApi.changePasswordForgot(data);
      },
      onSuccess: async () => {
        await AsyncStorage.removeItem("phoneNumber");
        await AsyncStorage.removeItem("otpForgot");
        await AsyncStorage.removeItem("tokenForgotChangePassword");
        await AsyncStorage.removeItem("otpSentTimeForgot");
        ToastUI({
          type: "success",
          text1: "Thành công",
          text2: "Đổi mật khẩu thành công.",
        });
        router.replace("sign-in");
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Đã xảy ra lỗi, vui lòng thử lại.";
        ToastUI({
          type: "error",
          text1: "Thất bại",
          text2: errorMessage,
        });
      },
    });

  const { mutate: checkOtpForgotPasswordMutation, isPending: isOtpPending } =
    useMutation({
      mutationFn: (data) => {
        return authApi.checkOtpForgotPassword(data);
      },
      onSuccess: async (data) => {
        await AsyncStorage.setItem("otpForgot", data.data.OTP);
        await AsyncStorage.setItem(
          "tokenForgotChangePassword",
          data.data.otpToken
        );
        ToastUI({
          type: "success",
          text1: "Thành công",
          text2: "Xác thực OTP thành công.",
        });
        setFormChangePassword(true);
        setVerifyOtp(false);
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.error ||
          error.message ||
          "Đã xảy ra lỗi, vui lòng thử lại.";
        ToastUI({
          type: "error",
          text1: "Thất bại",
          text2: errorMessage,
        });
      },
    });

  const verifyOtpSubmit = async () => {
    if (otp.length === 6 && otp.every((digit) => digit !== "")) {
      const otpToken = await AsyncStorage.getItem("otpTokenForgot");
      if (!otpToken) {
        ToastUI({
          type: "error",
          text1: "Xác thực thất bại",
          text2: "Token OTP không tồn tại.",
        });
      }
      const data = {
        otpToken: otpToken,
        OTP: otp.join(""),
      };
      checkOtpForgotPasswordMutation(data);
    } else {
      ToastUI({
        type: "error",
        text1: "Xác thực thất bại",
        text2: "Vui lòng nhập đủ 6 số OTP.",
      });
    }
  };

  return (
    <ScrollView
      className="bg-white"
      contentContainerStyle={{
        height: "100%",
      }}
    >
      <View className="w-full h-[40%] flex justify-center items-center bg-[#209bdd]">
        <Image
          source={require("../../assets/images/brandLogo.png")}
          className="w-[280px]"
          resizeMode="contain"
        ></Image>
      </View>
      {formChangePassword ? (
        <>
          <View className="mt-8">
            <Text className="text-center font-semibold text-xl">
              Đổi mật khẩu mới
            </Text>
          </View>
          <View className="flex-1 px-6 pt-8 bg-white">
            <Input
              control={controlReset}
              name="newPassword"
              error={errorsReset.newPassword?.message}
              placeholder="Nhập mật khẩu mới"
              isInputPw={true}
            />
            <Input
              control={controlReset}
              name="confirmPassword"
              error={errorsReset.confirmPassword?.message}
              placeholder="Nhập lại mật khẩu mới"
              isInputPw={true}
            />
            <TouchableOpacity
              className="bg-[#209bdd] py-3 mt-4 rounded-md items-center"
              onPress={handleSubmitReset(onSubmitReset)}
              disabled={isChangePassword}
            >
              <Text className="text-white uppercase text-sm font-bold">
                {isChangePassword ? <ActivityIndicator color="#fff" /> : "Xác nhận"}
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center mt-5 justify-center space-x-1">
              <Text className="text-center text-[14px]">Quay lại màn hình</Text>
              <TouchableOpacity>
                <Text
                  className="text-[14px] font-bold text-blue-500 underline"
                  onPress={() => router.back()}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      ) : verifyOtp ? (
        <View className="flex-1 px-6 pt-6 bg-white">
          <TouchableOpacity
            onPress={() => setVerifyOtp(false)}
            className="flex-row items-center gap-1 mb-4"
          >
            <MaterialIcons name="arrow-back-ios" size={15} color="red" />
            <Text className="font-semibold text-[16px] text-red-500">
              Hủy bỏ xác thực
            </Text>
          </TouchableOpacity>
          <Text className="text-center text-[20px] font-bold">
            Xác thực OTP
          </Text>
          <Text className="text-center text-[14px] my-2 text-gray-600">
            Nhập mã OTP gửi qua số điện thoại của bạn.
          </Text>
          <Text className="text-center text-[14px] text-gray-600">
            Số điện thoại:{" "}
            <Text className="font-bold text-primary-400">
              {formatPhoneNumber(phoneNumber)}
            </Text>
          </Text>
          <View className="flex-row justify-between mt-6">
            {otp.map((value, index) => (
              <TextInput
                key={index}
                id={`otp-input-${index}`}
                value={value}
                onChangeText={(text) => handleOtpChange(text, index)}
                maxLength={1}
                keyboardType="numeric"
                onKeyPress={(event) => handleKeyPress(event, index)}
                ref={otpRefs.current[index]}
                className="w-12 h-12 border border-[#209bdd] rounded-md text-center text-[18px] font-bold"
              />
            ))}
          </View>
          <View className="flex-row justify-between mt-3 ">
            <Text className="font-semibold text-[12px]">
              Yêu cầu mã OTP mới sau:{" "}
              <Text className="font-bold text-primary-500">
                {formatTime(timeLeft)}
              </Text>
            </Text>
            <TouchableOpacity
              onPress={() => handleSendAgainOtp()}
              disabled={isPending || timeLeft > 0}
              className={`${isPending || timeLeft > 0 ? "opacity-50" : ""}`}
            >
              <Text className="font-semibold text-[12px]">
                {isPending ? (
                  <ActivityIndicator size="small" color="blue" />
                ) : (
                  "Gửi lại mã OTP"
                )}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => verifyOtpSubmit()}
            disabled={isOtpPending}
            className="bg-[#209bdd] py-3 mt-7 rounded-md items-center"
          >
            <Text className="text-white uppercase text-sm font-bold">
              {isOtpPending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Xác thực"
              )}
            </Text>
          </TouchableOpacity>
          <View className="flex flex-row items-center mt-5 justify-center space-x-1">
            <Text className="text-center text-[14px]">Quay lại màn hình</Text>
            <TouchableOpacity>
              <Text
                className="text-[14px] font-bold text-blue-500 underline"
                onPress={() => router.back()}
              >
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <>
          <View className="mt-8">
            <Text className="text-center font-semibold text-xl">
              Quên mật khẩu
            </Text>
          </View>
          <View className="flex-1 px-6 pt-8 bg-white">
            <Input
              control={control}
              name="phoneNumber"
              error={errors.phoneNumber?.message}
              placeholder="Nhập số điện thoại"
              isInputPw={false}
            />
            <TouchableOpacity
              city
              className="bg-[#209bdd] py-3 mt-4 rounded-md items-center"
              onPress={handleSubmit(onSubmit)}
              disabled={isPending}
            >
              <Text className="text-white uppercase text-sm font-bold">
                {isPending ? <ActivityIndicator color="#fff" /> : "Tiếp theo"}
              </Text>
            </TouchableOpacity>
            <View className="flex flex-row items-center mt-5 justify-center space-x-1">
              <Text className="text-center text-[14px]">Quay lại màn hình</Text>
              <TouchableOpacity>
                <Text
                  className="text-[14px] font-bold text-blue-500 underline"
                  onPress={() => router.back()}
                >
                  Đăng nhập
                </Text>
              </TouchableOpacity>
            </View>
          </View>
        </>
      )}
    </ScrollView>
  );
};

export default Forget;
