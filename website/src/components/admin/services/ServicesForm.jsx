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
import { MdCloudUpload } from "react-icons/md";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@radix-ui/react-toast";

export default function Form() {
  const { toast } = useToast();
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
      citizenIdentificationNumber: "",
      ethnicity: "",
      address: "",
      status: "",
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [showMenu, setShowMenu] = useState(false);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = (data) => {
    const formattedData = {
      fullName: data.patientName,
      phoneNumber: data.phone,
      email: data.email,
      gender: data.gender === "male" ? "Nam" : "Nữ",
      dateOfBirth: data.birthDate,
      address: {
        province: data.province,
        district: data.district,
        ward: data.ward,
        street: data.address,
      },
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      occupation: data.job,
      ethnic: data.ethnicity,
      password: data.password,
    };

    console.log(JSON.stringify(formattedData, null, 2));
    toast({
      variant: "success",
      title: "Thao tác thành công",
      description: "Thêm người dùng thành công.",
      action: <ToastAction altText="Đóng">Đóng</ToastAction>,
    });
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin bệnh nhân
      </h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        {/* Image */ }
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <div className="relative h-[250px] min-w-[250px] rounded-3xl border-2 border-dashed border-primary-500">
              <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                <label className="flex h-full w-full cursor-pointer items-center justify-center">
                  <div className="flex flex-col items-center justify-center">
                    <MdCloudUpload size={ 45 } color="#007BBB" />
                    <p className="mt-2 text-sm">Chọn ảnh</p>
                  </div>
                  <input
                    type="file"
                    id="fileImage"
                    className="hidden"
                    onChange={ (e) => handleFileChange(e) }
                  />
                </label>
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* Line 1 */ }
            <div className="block">
              <div className="flex w-full grid-cols-1 gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Họ và tên bệnh nhân <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="patientName"
                    type="text"
                    id="patientName"
                    placeholder="Nhập họ và tên bệnh nhân"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="phone"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="phone"
                    type="text"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */ }
            <div className="flex w-full">
              <div className="flex w-full gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="email"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Nhập email"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-1 md:w-2/4 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="ngaysinh"
                    className="left-[15px] mb-2 block bg-white px-1 text-sm"
                  >
                    Ngày sinh <span className="text-red-500">*</span>
                  </label>
                  <SelectBirthDate
                    control={ control }
                    name="birthDate"
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
            {/* Line 3 */ }
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="password"
                    type="password"
                    id="Password"
                    placeholder="Nhập mật khẩu"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="phone"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Nhập lại mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>

            {/* Line 4 */ }
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Mã bảo hiểm y tế <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="bhyt"
                    type="text"
                    id="bhyt"
                    placeholder="Nhập mã bảo hiểm y tế"
                    control={ control }
                    errors={ errors }
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-sm"
                  >
                    Nghề nghiệp <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="job"
                    type="text"
                    id="job"
                    placeholder="Nhập nghề nghiệp"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-[20px]">
          <div className="w-1/4">
            <label className="mb-3 mr-2 block text-sm">
              Giới tính <span className="text-red-500">*</span>
            </label>
            <div className="flex items-center gap-2 pb-2 md:p-0">
              <label className="mr-2 flex items-center text-sm">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                  defaultChecked={ true }
                />
                Nam
              </label>
              <label className="flex items-center text-sm">
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
          <div className="relative md:mb-1 md:w-1/2">
            <label
              htmlFor="hoten"
              className="left-[15px] block bg-white px-1 text-sm"
            >
              Mã căn cước công dân <span className="text-red-500">*</span>
            </label>
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="citizenIdentificationNumber"
              type="text"
              id="citizenIdentificationNumber"
              placeholder="Nhập mã căn cước công dân"
              control={ control }
              errors={ errors }
            />
          </div>
          <div className="relative mb-3 md:w-1/2">
            <label
              htmlFor="hoten"
              className="left-[15px] mb-2 block bg-white px-1 text-sm"
            >
              Dân tộc <span className="text-red-500">*</span>
            </label>
            <SelectEthnic control={ control } name="ethnicity" errors={ errors } />
          </div>
        </div>

        {/* Line 5 */ }
        <div className="flex w-full gap-[10px]">
          {/* Line 6 */ }
          <div className="w-full gap-[20px] md:flex">
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-sm"
              >
                Tỉnh/Thành phố <span className="text-red-500">*</span>
              </label>
              <SelectProvince
                control={ control }
                name="province"
                errors={ errors }
                onProvinceChange={ (provinceId) => {
                  setSelectedProvinceId(provinceId);
                  setSelectedDistrictId(null);
                } }
              />
            </div>

            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-sm"
              >
                Quận huyện <span className="text-red-500">*</span>
              </label>
              <SelectDistrict
                control={ control }
                name="district"
                errors={ errors }
                provinceId={ selectedProvinceId }
                onDistrictChange={ setSelectedDistrictId }
                setValue={ setValue }
              />
            </div>

            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-sm"
              >
                Phường/Xã <span className="text-red-500">*</span>
              </label>
              <SelectWard
                control={ control }
                name="ward"
                errors={ errors }
                setValue={ setValue }
                districtId={ selectedDistrictId }
              />
            </div>
          </div>
        </div>
        {/* Line 7 */ }
        <div className="flex w-full gap-[10px]">
          <div className="relative mb-3 w-full">
            <label
              htmlFor="hoten"
              className="left-[15px] block bg-white px-1 text-sm"
            >
              Địa chỉ cụ thể <span className="text-red-500">*</span>
            </label>
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              placeholder="Nhập địa chỉ cụ thể"
              control={ control }
              errors={ errors }
            />
          </div>
        </div>
        {/* Status */ }
        <div className="mt-2">
          <h2 className="mb-3 text-sm">
            Trạng thái tài khoản <span className="text-red-600">*</span>
          </h2>
          <div className="mb-3 flex items-center">
            <label className="mr-6 flex items-center">
              <input
                type="radio"
                name="status"
                value="active"
                className="mr-2"
                defaultChecked={ true }
              />
              <span className="text-sm">Hoạt động</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="status"
                value="inactive"
                className="mr-2"
              />
              <span className="text-sm">Khóa tài khoản</span>
            </label>
          </div>
        </div>
        {/* Button */ }
        <div className="flex justify-end">
          <Button
            size=""
            variant="primary"
            className="border-none bg-primary-500 px-6 hover:bg-primary-600"
          >
            Xác nhận
          </Button>
        </div>
      </form>
    </div>
  );
}
