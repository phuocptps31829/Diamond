import InputCustom from "@/components/ui/InputCustom";
import { patientSchema } from "@/zods/patient";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "@/components/client/checkout/select/SelectLocation";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";

export default function Form() {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(patientSchema),
    defaultValues: {
      patientName: "",
      phone: "",
      email: "",
      birthDate: "",
      password: "",
      confirmPassword: "",
      gender: "",
      bhyt: "",
      job: "",
      province: "",
      district: "",
      ward: "",
      ethnicity: "",
      address: "",
      status: "",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = () => {};

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin bệnh nhân
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image */}
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="h-fit md:w-1/3 2xl:w-1/5">
            <div className="flex justify-center">
              <img
                src="https://cdn.pixabay.com/photo/2024/03/25/18/35/ai-generated-8655320_640.png"
                className="w-2/3 rounded-xl md:w-[95%] md:rounded-3xl"
              ></img>
            </div>
            <div className="mb-4 mt-5 flex justify-center md:mb-0">
              <label className="block w-1/2 cursor-pointer rounded-md bg-primary-500 py-2 text-center text-white hover:bg-primary-600 md:px-2 md:py-2 md:text-[13px] 2xl:text-lg">
                {selectedFile ? selectedFile.name : "Chọn file"}
                <input
                  type="file"
                  className="hidden"
                  onChange={handleFileChange}
                />
              </label>
            </div>
          </div>

          <div className="w-full">
            {/* Line 1 */}
            <div className="block">
              <div className="w-full grid-cols-1 md:flex md:gap-[10px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1"
                  >
                    Họ và tên bệnh nhân <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="patientName"
                    type="text"
                    id="patientName"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="phone"
                    className="left-[15px] block bg-white px-1"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="phone"
                    type="text"
                    id="phone"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */}
            <div className="flex w-full gap-[10px]">
              <div className="w-full gap-[10px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="email"
                    className="left-[15px] block bg-white px-1"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="text"
                    id="email"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-1 md:w-2/5 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="birthdate"
                    className="left-[15px] mb-2 block bg-white px-1"
                  >
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <SelectBirthDate
                    control={control}
                    name="birthDate"
                    errors={errors}
                  />
                </div>
                <div className="flex items-center gap-2 pb-2 md:p-0">
                  <label className="mr-2 flex items-center text-lg md:text-base">
                    <input
                      type="radio"
                      name="gender"
                      value="male"
                      className="mr-2"
                    />
                    Nam
                  </label>
                  <label className="flex items-center text-lg md:text-base">
                    <input
                      type="radio"
                      name="gender"
                      value="female"
                      className="mr-2"
                    />
                    Nữ
                  </label>
                </div>
              </div>
            </div>
            {/* Line 3 */}
            <div className="block">
              <div className="w-full gap-[10px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="Password"
                    type="password"
                    id="Password"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="phone"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Nhập lại mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            {/* Line 4 */}
            <div className="block">
              <div className="w-full gap-[10px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1"
                  >
                    MÃ BHYT <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="bhyt"
                    type="text"
                    id="bhyt"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1"
                  >
                    Nghề nghiệp <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="job"
                    type="text"
                    id="job"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Line 5 */}
        <div className="flex w-full gap-[10px]">
          {/* Line 6 */}
          <div className="w-full gap-[10px] md:flex">
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
              >
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <SelectProvince
                control={control}
                name="province"
                errors={errors}
                onProvinceChange={(provinceId) => {
                  setSelectedProvinceId(provinceId);
                  setSelectedDistrictId(null);
                }}
              />
            </div>

            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
              >
                Quận huyện <span className="text-red-500">*</span>
              </label>
              <SelectDistrict
                control={control}
                name="district"
                errors={errors}
                provinceId={selectedProvinceId}
                onDistrictChange={setSelectedDistrictId}
                setValue={setValue}
              />
            </div>

            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
              >
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <SelectWard
                control={control}
                name="ward"
                errors={errors}
                setValue={setValue}
                districtId={selectedDistrictId}
              />
            </div>
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
              >
                Dân tộc <span className="text-red-500">*</span>
              </label>
              <SelectEthnic
                control={control}
                name="ethnicity"
                errors={errors}
              />
            </div>
          </div>
        </div>
        {/* Line 7 */}
        <div className="flex w-full gap-[10px]">
          <div className="relative mb-3 w-full">
            <label htmlFor="hoten" className="left-[15px] block bg-white px-1">
              Địa chỉ thường trú <span className="text-red-500">*</span>
            </label>
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              control={control}
              errors={errors}
            />
          </div>
        </div>
        {/* Status */}
        <div className="mt-2">
          <h2 className="mb-1">
            Trạng thái tài khoản <span className="text-red-600">*</span>
          </h2>
          <div className="mb-3 flex items-center">
            <label className="mr-6 flex items-center">
              <input type="radio" name="gender" value="male" className="mr-2" />
              <span className="text-lg">Đang hoạt động</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
              />
              <span className="text-lg">Đã khóa</span>
            </label>
          </div>
        </div>
        {/* Button */}
        <div className="flex justify-end gap-2">
          <Button
            size=""
            variant="primary"
            className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
          >
            Hủy
          </Button>
          <Button
            size=""
            variant="primary"
            className="border-none bg-primary-500 px-6 hover:bg-primary-600"
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}
