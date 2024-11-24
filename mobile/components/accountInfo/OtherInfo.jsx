import { useState, useEffect } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
  ActivityIndicator,
} from "react-native";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { informationSchema } from "../../zods/informationSchema";
import DateTimePickerModal from "react-native-modal-datetime-picker";
import AntDesign from "@expo/vector-icons/AntDesign";
import SelectDropdown from "react-native-select-dropdown";
import { ethnicGroups } from "../../constants/ethnics";
import RadioGroup from "react-native-radio-buttons-group";
import Entypo from "@expo/vector-icons/Entypo";
import moment from "moment";
import { useSelector } from "react-redux";
import { patientApi } from "../../services/patientsApi";
import { useMutation } from "@tanstack/react-query";
import ToastUI from "../../components/ui/Toast";
import { setProfile } from "../../store/profile/profileSlice";
import { useDispatch } from "react-redux";
import "moment/locale/vi";

const radioButtons = [
  {
    id: "Nam",
    label: "Nam",
  },
  {
    id: "Nu",
    label: "Nữ",
  },
];

const OtherInfo = () => {
  const dispatch = useDispatch();
  const profile = useSelector((state) => state.profile.profile);
  const [isDatePickerVisible, setDatePickerVisibility] = useState(false);
  const showDatePicker = () => {
    setDatePickerVisibility(true);
  };

  const hideDatePicker = () => {
    setDatePickerVisibility(false);
  };

  moment.locale("vi");

  const {
    control,
    handleSubmit,
    formState: { errors },
    setValue,
  } = useForm({
    resolver: zodResolver(informationSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      occupation: "",
      dateOfBirth: "",
      ethnic: "",
      citizenIdentificationNumber: "",
      insuranceCode: "",
      address: "",
      gender: "",
    },
  });

  const { mutate: updatePatientMutation, isPending } = useMutation({
    mutationFn: ({ id, requestBody }) => {
      return patientApi.updatePatient(id, requestBody);
    },
    onSuccess: (newData) => {
      newData._id = profile._id;
      dispatch(setProfile(newData));
      ToastUI({
        type: "success",
        text1: "Thành công",
        text2: "Cập nhật thông tin thành công!",
      });
    },
    onError: (error) => {
      console.error("error", error);
      ToastUI({
        type: "error",
        text1: "Thất bại",
        text2: "Cập nhật thông tin thất bại!",
      });
    },
  });

  useEffect(() => {
    setValue("fullName", profile.fullName);
    setValue("phoneNumber", profile.phoneNumber);
    setValue("email", profile.email || "");
    setValue("occupation", profile.otherInfo.occupation || "");
    setValue("dateOfBirth", profile.dateOfBirth || "");
    setValue("ethnic", profile.otherInfo.ethnic || "");
    setValue("citizenIdentificationNumber", profile.citizenIdentificationNumber || "");
    setValue("insuranceCode", profile.otherInfo.insuranceCode || "");
    setValue("address", profile.address || "");
    setValue("gender", profile.gender || "");
  }, [profile]);

  const onSubmit = (data) => {
    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      password: data.password,
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      isActivated: true,
      address: data.address,
      otherInfo: {
        occupation: data.occupation,
        insuranceCode: data.insuranceCode,
        ethnic: data.ethnic,
      },
    };

    console.log("requestBody", requestBody);

    updatePatientMutation({
      id: profile._id,
      requestBody: requestBody,
    });
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
            name="occupation"
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
          {errors.occupation && (
            <Text className="text-red-500">{errors.occupation.message}</Text>
          )}
        </View>

        {/* Ngày sinh */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Ngày sinh:</Text>
          <View className="relative">
            <Controller
              control={control}
              name="dateOfBirth"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                    placeholder="Chọn ngày sinh"
                    value={value ? new Date(value).toLocaleDateString("vi-VN") : ""}
                    editable={false}
                  />
                  {/* Modal chọn ngày */}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      const formattedDate = date.toLocaleDateString("en-CA");
                      hideDatePicker();
                      console.log("Ngày sinh:", formattedDate);
                      onChange(formattedDate);
                    }}
                    onCancel={hideDatePicker}
                    locale="vi"
                  />
                </>
              )}
            />
            <TouchableOpacity
              onPress={showDatePicker}
              className="absolute right-0 top-1/4 w-full flex items-end"
            >
              <Text>
                <AntDesign name="calendar" size={24} color="black" />
              </Text>
            </TouchableOpacity>
          </View>
          {errors.dateOfBirth && (
            <Text className="text-red-500">{errors.dateOfBirth.message}</Text>
          )}
        </View>
        {/* Dân tộc */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Dân tộc:</Text>
          <Controller
            control={control}
            name="ethnic"
            render={({ field: { onChange, value } }) => (
              <SelectDropdown
                data={ethnicGroups}
                defaultValue={ethnicGroups.find((item) => item.value === value)}
                onSelect={(selectedItem) => {
                  onChange(selectedItem.value);
                }}
                search={true}
                searchPlaceHolder="Tìm dân tộc..."
                renderButton={(selectedItem, isOpened) => {
                  return (
                    <View style={styles.buttonContainer}>
                      <Text style={styles.buttonText}>
                        {(selectedItem && selectedItem.name) || "Chọn dân tộc"}
                      </Text>
                      {isOpened ? (
                        <Entypo
                          name="chevron-small-up"
                          size={24}
                          color="black"
                        />
                      ) : (
                        <Entypo
                          name="chevron-small-down"
                          size={24}
                          color="black"
                        />
                      )}
                    </View>
                  );
                }}
                renderItem={(item, index) => {
                  return (
                    <View
                      style={[
                        styles.itemContainer,
                        index % 2 !== 0 && { backgroundColor: "#EDEDED" },
                      ]}
                    >
                      <Text style={styles.itemText}>{item.name}</Text>
                    </View>
                  );
                }}
              />
            )}
          />
          {errors.ethnic && (
            <Text className="text-red-500">{errors.ethnic.message}</Text>
          )}
        </View>

        {/* Số CMND/CCCD */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Số CMND/CCCD:</Text>
          <Controller
            control={control}
            name="citizenIdentificationNumber"
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
          {errors.citizenIdentificationNumber && (
            <Text className="text-red-500">{errors.citizenIdentificationNumber.message}</Text>
          )}
        </View>

        {/* Số thẻ BH */}
        <View className="mb-5">
          <Text className="text-gray-700 mb-1">Số thẻ BH:</Text>
          <Controller
            control={control}
            name="insuranceCode"
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
          {errors.insuranceCode && (
            <Text className="text-red-500">
              {errors.insuranceCode.message}
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
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onChange}
                selectedId={value}
                layout="row"
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
            disabled={isPending}
          >
            {isPending ? (
              <ActivityIndicator size="small" color="#fff" />
            ) : (
              <Text className="text-white text-center font-semibold text-[15px]">
                Cập nhật
              </Text>
            )}
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginTop: 10,
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    padding: 10,
    backgroundColor: "#F2F2F2",
    borderRadius: 8,
    paddingLeft: 15,
  },
  buttonText: {
    fontSize: 14,
    fontWeight: "600",
  },
  itemContainer: {
    padding: 12,
    backgroundColor: "#FFFFFF",
  },
  itemText: {
    fontSize: 16,
    color: "#4B5563",
    fontWeight: "600",
  },
});

export default OtherInfo;
