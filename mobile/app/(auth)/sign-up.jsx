import {
  ScrollView,
  Text,
  View,
  Image,
  TouchableOpacity,
  TextInput,
} from "react-native";
import { router } from "expo-router";
import { useState, useRef, createRef } from "react";
import { signUpSchema } from "../../zods/signUpSchema";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import FontAwesome from "@expo/vector-icons/FontAwesome";
import Input from "../../components/ui/Input";

const SignUp = () => {
  const [verifyOtp, setVerifyOtp] = useState(true);
  const [gender, setGender] = useState("Nam");
  const [otp, setOtp] = useState(["", "", "", "", "", ""]);

  const otpRefs = useRef(otp.map(() => createRef()));

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

  const onSubmit = (data) => {
    const requestData = {
      ...data,
      gender,
    };

    console.log(requestData);
  };
  const handleOtpChange = (text, index) => {
    const updatedOtp = [...otp];
    updatedOtp[index] = text;
    setOtp(updatedOtp);

    if (text && index < 5) {
      const nextInput = index + 1;
      otpRefs.current[nextInput]?.current?.focus();
    } else if (!text && index > 0) {
      const prevInput = index - 1;
      otpRefs.current[prevInput]?.current?.focus();
    }
  };

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
        <View className="flex-1 px-6 pt-8 bg-white">
          <Text className="text-center text-[20px] font-bold">
            Xác thực tài khoản
          </Text>
          <Text className="text-center text-[14px] my-2 text-gray-600">
            Nhập mã OTP gửi qua số điện thoại của bạn.
          </Text>
          <Text className="text-center text-[14px] text-gray-600">
            Số điện thoại:{" "}
            <Text className="font-bold text-primary-400">0916 222 235</Text>
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
                ref={otpRefs.current[index]}
                className="w-12 h-12 border border-[#209bdd] rounded-md text-center text-[18px] font-bold"
              />
            ))}
          </View>
          <View className="flex-row justify-between mt-3 ">
            <Text className="font-semibold text-[12px]">
              Yêu cầu mã OTP mới sau:{" "}
              <Text className="font-bold text-primary-500">0:00</Text>
            </Text>
            <TouchableOpacity>
              <Text className="font-semibold text-[12px]">Gửi lại mã OTP</Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            onPress={() => setVerifyOtp(false)}
            className="bg-[#209bdd] py-3 mt-7 rounded-md items-center"
          >
            <Text className="text-white uppercase text-sm font-bold">
              Xác thực OTP
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
          <View className="flex-row mb-7 mt-2 space-x-20 ml-2">
            <TouchableOpacity
              onPress={() => setGender("Nam")}
              className="flex-row items-center space-x-3"
            >
              <FontAwesome
                name={gender === "Nam" ? "dot-circle-o" : "circle-o"}
                size={21}
                color={gender === "Nam" ? "#209bdd" : "#000"}
              />
              <Text className="ml-2 text-[14px]">Nam</Text>
            </TouchableOpacity>

            <TouchableOpacity
              onPress={() => setGender("Nữ")}
              className="flex-row items-center space-x-3"
            >
              <FontAwesome
                name={gender === "Nữ" ? "dot-circle-o" : "circle-o"}
                size={21}
                color={gender === "Nữ" ? "#209bdd" : "#000"}
              />
              <Text className="ml-2 text-[14px]">Nữ</Text>
            </TouchableOpacity>
          </View>
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
            onPress={handleSubmit(onSubmit)}
            className="bg-[#209bdd] py-3 mt-4 rounded-md items-center"
          >
            <Text className="text-white uppercase text-sm font-bold">
              Đăng ký
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
