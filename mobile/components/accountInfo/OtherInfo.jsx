import { useState } from "react";
import {
  Text,
  TextInput,
  View,
  TouchableOpacity,
  StyleSheet,
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
          <View className="relative">
            <Controller
              control={control}
              name="birthDate"
              render={({ field: { onChange, value } }) => (
                <>
                  <TextInput
                    className="border-b border-gray-500 p-2 rounded h-10 font-semibold"
                    placeholder="Chọn ngày sinh"
                    value={value ? new Date(value) : ""}
                    editable={false}
                  />
                  {/* Modal chọn ngày */}
                  <DateTimePickerModal
                    isVisible={isDatePickerVisible}
                    mode="date"
                    onConfirm={(date) => {
                      const formattedDate = date.toLocaleDateString("en-CA");
                      hideDatePicker();
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
            render={({ field: { onChange, value } }) => (
              <SelectDropdown
                data={ethnicGroups}
                defaultValue={ethnicGroups.find((item) => item.value === value)}
                onSelect={(selectedItem) => {
                  console.log(selectedItem.value);
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
              <RadioGroup
                radioButtons={radioButtons}
                onPress={onChange}
                selectedId={value}
                layout='row'
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
