import { Text, TextInput, View, TouchableOpacity } from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { informationSchema } from "../../zods/informationSchema";

const OtherInfo = () => {
  const {
    control,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(informationSchema),
    defaultValues: {
      fullName: "Võ Thanh Phương",
      phoneNumber: "0123456789",
      email: "vothanhhphuongg2k4@gmail.com",
      job: "",
      birthDate: "",
      ethnicity: "",
      idNumber: "",
      insuranceNumber: "",
      address: "",
      gender: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Dữ liệu gửi đi:", data);
  };

  return (
    <View className="p-4">
      <View className="mb-5">
        <Text className="text-[16px] font-semibold">Thông tin cá nhân</Text>
      </View>

      <View className="mb-5">
        {/* Họ và tên */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Họ và tên:</Text>
          <Controller
            control={control}
            name="fullName"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập họ và tên"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.fullName && (
            <Text className="text-red-500">{errors.fullName.message}</Text>
          )}
        </View>

        {/* Số điện thoại */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Số điện thoại:</Text>
          <Controller
            control={control}
            name="phoneNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 bg-gray-100 p-2 rounded h-10 font-semibold"
                placeholder="Nhập số điện thoại"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="phone-pad"
                editable={false}
              />
            )}
          />
          {errors.phoneNumber && (
            <Text className="text-red-500">{errors.phoneNumber.message}</Text>
          )}
        </View>

        {/* Email */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Email:</Text>
          <Controller
            control={control}
            name="email"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập email"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
                keyboardType="email-address"
              />
            )}
          />
          {errors.email && (
            <Text className="text-red-500">{errors.email.message}</Text>
          )}
        </View>

        {/* Nghề nghiệp */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Nghề nghiệp:</Text>
          <Controller
            control={control}
            name="job"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập nghề nghiệp"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.job && (
            <Text className="text-red-500">{errors.job.message}</Text>
          )}
        </View>

        {/* Ngày sinh */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Ngày sinh:</Text>
          <Controller
            control={control}
            name="birthDate"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập ngày sinh (YYYY-MM-DD)"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.birthDate && (
            <Text className="text-red-500">{errors.birthDate.message}</Text>
          )}
        </View>

        {/* Dân tộc */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Dân tộc:</Text>
          <Controller
            control={control}
            name="ethnicity"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập dân tộc"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.ethnicity && (
            <Text className="text-red-500">{errors.ethnicity.message}</Text>
          )}
        </View>

        {/* Số CMND/CCCD */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Số CMND/CCCD:</Text>
          <Controller
            control={control}
            name="idNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập số CMND/CCCD"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.idNumber && (
            <Text className="text-red-500">{errors.idNumber.message}</Text>
          )}
        </View>

        {/* Số thẻ BH */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Số thẻ BH:</Text>
          <Controller
            control={control}
            name="insuranceNumber"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập số thẻ BHYT"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.insuranceNumber && (
            <Text className="text-red-500">
              {errors.insuranceNumber.message}
            </Text>
          )}
        </View>

        {/* Địa chỉ */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Địa chỉ:</Text>
          <Controller
            control={control}
            name="address"
            render={({ field: { onChange, onBlur, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập địa chỉ"
                onBlur={onBlur}
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.address && (
            <Text className="text-red-500">{errors.address.message}</Text>
          )}
        </View>

        {/* Giới tính */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Giới tính:</Text>
          <Controller
            control={control}
            name="gender"
            render={({ field: { onChange, value } }) => (
              <TextInput
                className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                placeholder="Nhập giới tính (Nam/Nữ/Khác)"
                onChangeText={onChange}
                value={value}
              />
            )}
          />
          {errors.gender && (
            <Text className="text-red-500">{errors.gender.message}</Text>
          )}
        </View>
        <View className="flex justify-center items-center w-full mt-2">
          <TouchableOpacity
            className="bg-[#007BBB] p-3 rounded-lg w-full"
            onPress={handleSubmit(onSubmit)}
          >
            <Text className="text-white text-center font-semibold text-[15px]">
              Cập nhật
            </Text>
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default OtherInfo;
