import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
  ActivityIndicator,
} from "react-native";
import { router } from "expo-router";
import { useState, useEffect, useRef, createRef } from "react";
import { signUpSchema } from "../../zods/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { formatPhoneNumber } from "../../utils/formatPhoneNumber";
import { formatTime } from "../../utils/formatTime";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import Input from "../../components/ui/Input";
import MaterialIcons from "@expo/vector-icons/MaterialIcons";
import ToastUI from "../../components/ui/Toast";
import { authApi } from "../../services/authApi";

const SignUp = () => {
  const [verifyOtp, setVerifyOtp] = useState(false);
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);
  const [sendOtpAgain, setSendOtpAgain] = useState(true);
  const [timeLeft, setTimeLeft] = useState(0);
  const otpRefs = useRef(otp.map(() => createRef()));
  const [dataLocal, setDataLocal] = useState({
    name: "",
    phone: "",
    password: "",
  });

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

  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(signUpSchema),
    defaultValues: {
      name: "",
      phone: "",
      password: "",
      confirmPassword: "",
      referralCode: "",
    },
  });

  const { mutate: registerSendOtpMutation, isPending } = useMutation({
    mutationFn: (data) => {
      return authApi.registerSendOtp(data);
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("otpSentTime", new Date().getTime().toString());
      await AsyncStorage.setItem("otpToken", data.data.otpToken);
      await AsyncStorage.setItem("password", dataLocal.password);
      await AsyncStorage.setItem("fullName", dataLocal.name);
      await AsyncStorage.setItem("phoneNumber", dataLocal.phone);
      ToastUI({
        type: "success",
        text1: "Đăng ký thành công",
        text2: "Mã OTP sẽ được gửi đến số điện thoại qua cuộc gọi.",
      });
      setVerifyOtp(true);
      setSendOtpAgain(true);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      ToastUI({
        type: "error",
        text1: "Đăng ký thất bại",
        text2: errorMessage,
      });
    },
  });

  const { mutate: sendOtpAgainMutation, isPending: isSendOtpAgainPending } = useMutation({
    mutationFn: (data) => {
      return authApi.registerSendOtp(data);
    },
    onSuccess: async (data) => {
      await AsyncStorage.setItem("otpToken", data.data.otpToken);
      await AsyncStorage.setItem("otpSentTime", new Date().getTime().toString());
      ToastUI({
        type: "success",
        text1: "Gửi lại mã OTP thành công",
        text2: "Mã OTP sẽ được gửi đến số điện thoại qua cuộc gọi.",
      });
      setSendOtpAgain(true);
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.error ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
        ToastUI({
          type: "error",
          text1: "Gửi lại mã OTP thất bại",
          text2: errorMessage,
        });
    },
  });

  const { mutate: otpUserVerificationMutation, isPending: isOtpPending } = useMutation({
      mutationFn: (data) => {
        return authApi.otpUserVerification(data);
      },
      onSuccess: async () => {
        await AsyncStorage.removeItem("otpToken");
        await AsyncStorage.removeItem("otpSentTime");
        await AsyncStorage.removeItem("password");
        await AsyncStorage.removeItem("fullName");
        await AsyncStorage.removeItem("phoneNumber");
        ToastUI({
          type: "success",
          text1: "Đăng ký thành công",
          text2: "Chúc mừng bạn đã đăng ký thành công tài khoản.",
        });
        router.replace("sign-in");
      },
      onError: (error) => {
        const errorMessage =
          error.response?.data?.message ||
          error.message ||
          "Đã xảy ra lỗi, vui lòng thử lại.";
        ToastUI({
          type: "error",
          text1: "Xác thực thất bại",
          text2: errorMessage,
        });
      },
    });

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
    
    if (event.nativeEvent.key === "Backspace" && !otp[index] && index > 0 && index !== 5) {
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

  const onSubmit = async (data) => {
    const { name, phone, password, referralCode } = data;
    const requestData = {
      fullName: name,
      password: password,
      phoneNumber: phone,
    };
    setDataLocal({
      name: name,
      phone: phone,
      password: password,
    });
    registerSendOtpMutation(requestData);
  };

  const verifyOtpSubmit = async () => {
    if (otp.length === 6 && otp.every((digit) => digit !== "")) {
      const otpToken = await AsyncStorage.getItem("otpToken");
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
      otpUserVerificationMutation(data);
    } else {
      ToastUI({
        type: "error",
        text1: "Xác thực thất bại",
        text2: "Vui lòng nhập đủ 6 số OTP.",
      });
    }
  };

  const handleSendAgainOtp = async () => {
    const fullName = await AsyncStorage.getItem("fullName");
    const phoneNumber = await AsyncStorage.getItem("phoneNumber");
    const password = await AsyncStorage.getItem("password");
    const data = {
      fullName: fullName,
      password: password,
      phoneNumber: phoneNumber,
    };
    sendOtpAgainMutation(data);
  }

  return (
    <ScrollView className="bg-white" showsVerticalScrollIndicator={false}>
      <View className="w-full max-h-[250px] h-[100%] flex justify-center items-center bg-[#209bdd]">
        <Image
          source={require("../../assets/images/brandLogo.png")}
          className="w-[280px]"
          resizeMode="contain"
        />
      </View>
      {verifyOtp ? (
        <View className="flex-1 px-6 pt-6 bg-white">
          <TouchableOpacity onPress={() => setVerifyOtp(false)} className="flex-row items-center gap-1 mb-4">
            <MaterialIcons name="arrow-back-ios" size={15} color="red" />
            <Text className="font-semibold text-[16px] text-red-500">
              Hủy bỏ xác thực
            </Text>
          </TouchableOpacity>
          <Text className="text-center text-[20px] font-bold">
            Xác thực tài khoản
          </Text>
          <Text className="text-center text-[14px] my-2 text-gray-600">
            Nhập mã OTP gửi qua số điện thoại của bạn.
          </Text>
          <Text className="text-center text-[14px] text-gray-600">
            Số điện thoại:{" "}
            <Text className="font-bold text-primary-400">
              {formatPhoneNumber(dataLocal.phoneNumber)}
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
              <Text className="font-bold text-primary-500">{formatTime(timeLeft)}</Text>
            </Text>
            <TouchableOpacity onPress={() => handleSendAgainOtp()} disabled={isSendOtpAgainPending || timeLeft > 0} className={`${isSendOtpAgainPending || timeLeft > 0 ? "opacity-50" : ""}`}>
              <Text className="font-semibold text-[12px]">
                {isSendOtpAgainPending ? <ActivityIndicator size="small" color="blue" /> : "Gửi lại mã OTP"}
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => verifyOtpSubmit()}
            disabled={isOtpPending}
            className="bg-[#209bdd] py-3 mt-7 rounded-md items-center"
          >
            <Text className="text-white uppercase text-sm font-bold">
              {isOtpPending ? <ActivityIndicator size="small" color="white" /> : "Xác thực"}
            </Text>
          </TouchableOpacity>
          <View className="my-6 flex items-center flex-row">
            <Text className="flex-grow bg-gray-300 h-[1px]"></Text>
            <Text className="mx-4 text-sm text-gray-800">
              Hoặc tiếp tục với
            </Text>
            <Text className="flex-grow bg-gray-300 h-[1px]"></Text>
          </View>
          <View className="flex flex-row gap-3 max-h-[60px]">
            <TouchableOpacity className="bg-gray-500 flex-1 overflow-hidden rounded-md items-center flex-row justify-center">
              <Image
                source={require("../../assets/images/gg.png")}
                className="w-[25px]"
                resizeMode="contain"
              ></Image>
              <Text className="text-black text-sm font-bold ml-3">Google</Text>
            </TouchableOpacity>
            <TouchableOpacity className="bg-gray-500 flex-1  overflow-hidden rounded-md items-center flex-row justify-center">
              <Image
                source={require("../../assets/images/fb.png")}
                className="w-[26px]"
                resizeMode="contain"
              ></Image>
              <Text className="text-black text-sm font-bold ml-3">
                Facebook
              </Text>
            </TouchableOpacity>
          </View>
          <View className="pb-20 flex-row items-center justify-center mt-6">
            <Text className="text-center text-[14px]">
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-center text-[14px] text-blue-500 ml-1">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      ) : (
        <View className="flex-1 px-6 pt-8 bg-white">
          <Input
            control={control}
            name="name"
            error={errors.name?.message}
            placeholder="Nhập tên của bạn"
            isInputPw={false}
          />
          <Input
            control={control}
            name="phone"
            placeholder="Nhập số điện thoại đăng ký"
            isInputPw={false}
            error={errors.phone?.message}
          />
          <Input
            control={control}
            name="password"
            placeholder="Nhập mật khẩu"
            error={errors.password?.message}
          />
          <Input
            control={control}
            name="confirmPassword"
            placeholder="Nhập lại mật khẩu"
            error={errors.confirmPassword?.message}
          />
          <Input
            control={control}
            name="referralCode"
            placeholder="Nhập mã giới thiệu (nếu có)"
            error={errors.referralCode?.message}
            isInputPw={false}
          />
          <TouchableOpacity
            disabled={isPending}
            onPress={handleSubmit(onSubmit)}
            className="bg-[#209bdd] py-3 mt-4 rounded-md items-center"
          >
            <Text className="text-white uppercase text-sm font-bold">
              {isPending ? (
                <ActivityIndicator size="small" color="white" />
              ) : (
                "Đăng ký"
              )}
            </Text>
          </TouchableOpacity>
          <View className="pb-20 flex-row items-center justify-center mt-6">
            <Text className="text-center text-[14px]">
              Bạn đã có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => router.back()}>
              <Text className="text-center text-[14px] text-blue-500 ml-1">
                Đăng nhập
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      )}
    </ScrollView>
  );
};

export default SignUp;
