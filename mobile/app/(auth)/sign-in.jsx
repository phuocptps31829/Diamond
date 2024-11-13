import { useEffect } from "react";
import { ScrollView, Text, View, Image, TouchableOpacity, ActivityIndicator } from "react-native";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { signInSchema } from "../../zods/signInSchema";
import { router } from "expo-router";
import { authApi } from "../../services/authApi";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useMutation } from "@tanstack/react-query";
import Input from "../../components/ui/Input";
import ToastUI from "../../components/ui/Toast";

const SignIn = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(signInSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
    },
  });

  const { mutate: login, isPending } = useMutation({
    mutationFn: authApi.login,
    onSuccess: async (data) => {
      console.log(data);
      await AsyncStorage.setItem("accessToken", data.accessToken.token);
      await AsyncStorage.setItem("refreshToken", data.refreshToken.token);
      ToastUI({
        type: "success",
        text1: "Đăng nhập thành công",
        text2: "Chào mừng bạn trở lại!",
      });
      router.replace("home");
    },
    onError: (error) => {
      const errorMessage =
      error.response?.data?.message ||
      error.message ||
      "Đã xảy ra lỗi, vui lòng thử lại.";
      ToastUI({
        type: "error",
        text1: "Đăng nhập thất bại",
        text2: errorMessage,
      });
    }
  })

  const onSubmit = (data) => {
    login(data);
  };
  
  return (
    <>
      <ScrollView
        className="bg-white"
        contentContainerStyle={{
          height: "100%",
        }}
      >
        <View className="w-full max-h-[250px] h-[100%] flex justify-center items-center bg-[#209bdd]">
          <Image
            source={require("../../assets/images/brandLogo.png")}
            className="w-[280px]"
            resizeMode="contain"
          ></Image>
        </View>

        <View className="flex-1 px-6 pt-12 bg-white">
          <Input
            control={control}
            name="phoneNumber"
            error={errors.phoneNumber?.message}
            placeholder="Nhập số điện thoại đăng nhập"
            isInputPw={false}
          />
          <Input
            control={control}
            name="password"
            error={errors.password?.message}
            placeholder="Nhập mật khẩu"
          />
          <View className="flex flex-row justify-between">
            <Text></Text>
            <TouchableOpacity onPress={() => router.push("forget")}>
              <Text className="text-center text-[14px] text-blue-500">
                Quên mật khẩu?
              </Text>
            </TouchableOpacity>
          </View>
          <TouchableOpacity
            className={`${isPending ? "opacity-50" : ""} bg-[#209bdd] py-3 mt-7 rounded-md items-center`}
            onPress={handleSubmit(onSubmit)}
            disabled={isPending}
          >
            <Text className="text-white uppercase text-sm font-bold">
              {isPending ? <ActivityIndicator size="small" color="#fff" /> : "Đăng nhập"}
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
          <View className="flex-row items-center mt-7 justify-center">
            <Text className="text-center text-[14px] mr-1">
              Bạn chưa có tài khoản?
            </Text>
            <TouchableOpacity onPress={() => router.push("sign-up")}>
              <Text className="text-center text-[14px] text-blue-500">
                Đăng ký
              </Text>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </>
  );
};

export default SignIn;
