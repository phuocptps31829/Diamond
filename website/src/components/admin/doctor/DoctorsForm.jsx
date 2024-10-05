import InputCustom from "@/components/ui/InputCustom";
import { doctorSchema } from "@/zods/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import SelectDepartment from "@/components/client/checkout/select/SelectDepartment";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "@/components/client/checkout/select/SelectLocation";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import DoctorEditor from "./editor";
import SelectBranch from "@/components/client/checkout/select/SelectBranch";
import SelectRoom from "@/components/client/checkout/select/SelectRoom";
import { useParams } from "react-router-dom";
import { getDoctorById } from "@/services/doctorsApi";
import { useQuery } from "@tanstack/react-query";
import { useState, useEffect } from "react";
import { useForm } from "react-hook-form";
import SelectSpecialty from "@/components/client/checkout/select/SelectSpecialty";
import { MdCloudUpload } from "react-icons/md";
import SelectSpecialties from "@/components/client/checkout/select/SelectSpecialtyold";

export default function DoctorsForm() {
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null);
  const { id } = useParams();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      doctorName: "",
      phone: "",
      email: "",
      birthDate: "",
      experienceYears: "",
      specialty: "",
      room: "",
      branch: "",
      password: "",
      confirmPassword: "",
      chungchi: "",
      trinhdo: "",
      gender: "",
      department: "",
      experience: "",
      province: "",
      district: "",
      ward: "",
      ethnicity: "",
      address: "",
      status: "",
    },
  });
  const { data } = useQuery({
    queryKey: ["doctors", id],
    queryFn: () => getDoctorById(id),
    enabled: !!id,
  });
  useEffect(() => {
    if (data) {
      console.log("Fetched data: ", data);
      setValue("doctorName", data.fullName);
      setValue("phone", data.phoneNumber);
      setValue("email", data.email);
      setValue("birthDate", data.dateOfBirth);
      setValue("gender", data.gender ? "Nam" : "Nữ");
      setValue("status", data.isActivated ? true : false);
      setValue("practicingCertificate", data.otherInfo.practicingCertificate);
      const currentYear = new Date().getFullYear();
      const experienceDate = new Date(data.otherInfo.yearsExperience);
      const experienceYear = experienceDate.getFullYear();
      const experienceYears = currentYear - experienceYear;
      setValue("experienceYears", experienceYears);
      setValue("province", data.address.province);
      setValue("specialty", data.otherInfo.specialtyID);
      setValue("content", data.content);
      setImagePreview(data.image);
    }
  }, [data, setValue]);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };
  const handleRemoveImage = () => {
    setSelectedFile(null);
    setImagePreview(null);
  };
  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };
  const onSubmit = () => {
  };
  return (
    <div className="bg-white w-[100%] px-7 py-6 rounded-lg shadow-gray ">
      <h1 className="mr-2 bg-white h-fit mb-4 text-2xl font-bold">Thông tin bác sĩ</h1>
      <form onSubmit={ handleSubmit(onSubmit) } >
        <div className="md:flex gap-[10px] sm:grid grid-cols-1">
          <div className="2xl:w-[26%] md:w-1/3 h-fit relative mb-2">
            <div className="mr-5">
              <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
                Ảnh đại diện <span className="text-red-500">*</span>
              </label>
              <div className="relative h-[250px] min-w-[250px] rounded-3xl border-2 border-dashed border-primary-500">
                <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                  { imagePreview ? (
                    <div className="h-[100%]">
                      <img
                        src={ imagePreview }
                        alt="Doctor Preview"
                        className="h-full rounded-3xl"
                      />
                      <button
                        type="button"
                        onClick={ handleRemoveImage }
                        className="absolute top-2 right-2 bg-red-500 text-white rounded-sm p-2"
                      >
                        X
                      </button>
                    </div>
                  ) : (
                    <label className="flex h-full w-full cursor-pointer items-center justify-center">
                      <div className="flex flex-col items-center justify-center">
                        <MdCloudUpload size={ 45 } color="#007BBB" />
                        <p className="mt-2 text-sm">Chọn ảnh</p>
                      </div>
                      <input
                        type="file"
                        id="fileImage"
                        className="hidden"
                        onChange={ handleFileChange }
                      />
                    </label>
                  ) }
                </div>
              </div>
            </div>
          </div>
          <div className="w-full">
            {/* Line 1 */ }
            <div className="block">
              <div className="w-full grid-cols-1 md:flex md:gap-[10px]">
                <div className="relative md:mb-4 md:w-1/2">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Họ và tên bác sĩ <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="doctorName"
                    type="text"
                    id="doctorName"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-4 md:w-1/2">
                  <label
                    htmlFor="phone"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="phone"
                    type="text"
                    id="phone"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */ }
            <div className="flex w-full gap-[10px]">
              <div className="w-full gap-[10px] md:flex">
                <div className="relative md:mb-4 md:w-1/2">
                  <label
                    htmlFor="email"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Email <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="text"
                    id="email"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative flex w-1/2 gap-2">
                  <div className="relative w-full md:mb-4">
                    <label
                      htmlFor="birthdate"
                      className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-base"
                    >
                      Ngày sinh <span className="text-red-500">*</span>
                    </label>
                    <SelectBirthDate
                      control={ control }
                      name="birthDate"
                      errors={ errors }
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
            </div>

            {/* Line 3 */ }
            <div className="block">
              <div className="w-full gap-[10px] md:flex">
                <div className="relative md:mb-4 md:w-1/2">
                  <label
                    htmlFor="hoten"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Mật khẩu <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="password"
                    type="password"
                    id="password"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-4 md:w-1/2">
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
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
        {/* Line 4 */ }
        <div className="block">
          <div className="w-full gap-[10px] md:flex">
            <div className="relative md:mb-4 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] block bg-white px-1 text-lg md:text-base"
              >
                Chứng chỉ hành nghề <span className="text-red-500">*</span>
              </label>
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="chungchi"
                type="text"
                id="chungchi"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="relative md:mb-4 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] block bg-white px-1 text-lg md:text-base"
              >
                Trình độ chuyên môn <span className="text-red-500">*</span>
              </label>
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="trinhdo"
                type="text"
                id="trinhdo"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="relative md:mb-4 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-base"
              >
                Khoa <span className="text-red-500">*</span>
              </label>
              {/* Khoa khám */ }
              <SelectDepartment
                control={ control }
                name="department"
                errors={ errors }
              // specialtyID={
              //   selectedService?.bookingDetail?.specialtyID || ""
              // }
              // setValue={setValue}
              // onChange={(branchID) => {
              //   setSelectedBranchId(branchID);
              // }}
              />
            </div>

            <div className="relative md:mb-4 md:w-1/2">
              <label
                htmlFor="phone"
                className="left-[15px] block bg-white px-1 text-lg md:text-base"
              >
                Số năm kinh nghiệm <span className="text-red-500">*</span>
              </label>
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="experienceYears"
                type="text"
                id="experienceYears"
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
        </div>

        {/* Line 5 */ }
        <div className="w-full flex gap-[10px]">
          <div className="w-full md:flex gap-[10px]">
            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2 ">
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              {/* Chuyên khoa */ }
              <SelectSpecialty
                control={ control }
                name="specialty"
                errors={ errors }

              />
            </div>
            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2 ">
                Chi nhánh làm việc <span className="text-red-500">*</span>
              </label>
              <SelectBranch
                control={ control }
                name="branch"
                errors={ errors }
              // specialtyID={
              //   selectedService?.bookingDetail?.specialtyID || ""
              // }
              // setValue={setValue}
              // onChange={(branchID) => {
              //   setSelectedBranchId(branchID);
              // }}
              />
            </div>

            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2 ">
                Phòng <span className="text-red-500">*</span>
              </label>
              <SelectRoom
                control={ control }
                name="room"
                errors={ errors }
              // specialtyID={
              //   selectedService?.bookingDetail?.specialtyID || ""
              // }
              // setValue={setValue}
              // onChange={(branchID) => {
              //   setSelectedBranchId(branchID);
              // }}
              />
            </div>
          </div>

        </div>

        <div className=" w-full flex gap-[10px]">
          {/* Line 6 */ }
          <div className="w-full md:flex gap-[10px]">
            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2">
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

            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2">
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

            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2">
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
            <div className="mb-3 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white mb-2">
                Dân tộc <span className="text-red-500">*</span>
              </label>
              <SelectEthnic
                control={ control }
                name="ethnicity"
                errors={ errors }
              />
            </div>
          </div>
        </div>
        {/* Line 7 */ }
        <div className="w-full flex gap-[10px]">
          <div className="mb-3 w-full relative">
            <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white">
              Địa chỉ thường trú <span className="text-red-500">*</span>
            </label>
            <InputCustom
              className="col-span-1 sm:col-span-1 "
              name="address"
              type="text"
              id="address"
              control={ control }
              errors={ errors }
            />
          </div>
        </div>


        <div className="w-full">
          <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white">
            Chi tiết về bác sĩ <span className="text-red-500">*</span>
          </label>
          {/* Chuyên khoa */ }
          <SelectSpecialties
            control={ control }
            name="specialty"
            errors={ errors }
          // specialtyID={
          //   selectedService?.bookingDetail?.specialtyID || ""
          // }
          // setValue={setValue}
          // onChange={(branchID) => {
          //   setSelectedBranchId(branchID);
          // }}
          />
        </div>
        <div className="relative mb-3 md:w-1/2">
          <label
            htmlFor="hoten"
            className="left-[15px] mb-2 block bg-white px-1"
          >
            Chi nhánh làm việc <span className="text-red-500">*</span>
          </label>
          <SelectBranch
            control={ control }
            name="branch"
            errors={ errors }
          // specialtyID={
          //   selectedService?.bookingDetail?.specialtyID || ""
          // }
          // setValue={setValue}
          // onChange={(branchID) => {
          //   setSelectedBranchId(branchID);
          // }}
          />
        </div>

        <div className="relative mb-3 md:w-1/2">
          <label
            htmlFor="hoten"
            className="left-[15px] mb-2 block bg-white px-1"
          >
            Phòng <span className="text-red-500">*</span>
          </label>
          <SelectRoom
            control={ control }
            name="room"
            errors={ errors }
          // specialtyID={
          //   selectedService?.bookingDetail?.specialtyID || ""
          // }
          // setValue={setValue}
          // onChange={(branchID) => {
          //   setSelectedBranchId(branchID);
          // }}
          />
        </div>

        <div className="flex w-full gap-[10px]">
          {/* Line 6 */ }
          <div className="w-full gap-[10px] md:flex">
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
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
                className="left-[15px] mb-2 block bg-white px-1"
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
                className="left-[15px] mb-2 block bg-white px-1"
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
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1"
              >
                Dân tộc <span className="text-red-500">*</span>
              </label>
              <SelectEthnic
                control={ control }
                name="ethnicity"
                errors={ errors }
              />
            </div>
          </div>
        </div>
        {/* Line 7 */ }
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
              control={ control }
              errors={ errors }
            />
          </div>
        </div>

        <div className="w-full">
          <label htmlFor="hoten" className="left-[15px] block bg-white px-1">
            Chi tiết về bác sĩ <span className="text-red-500">*</span>
          </label>
          <DoctorEditor />
        </div>

        {/* Status */ }
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

        {/*  */ }
        {/* <div className="mt-2">
          <h2 className="mb-1">
            Loại bác sĩ <span className="text-red-600">*</span>
          </h2>
          <div className="mb-3 flex items-center">
            <label className="mr-6 flex items-center">
              <input type="radio" name="gender" value="male" className="mr-2" />
              <span className="text-lg">Bác sĩ nội</span>
            </label>
            <label className="flex items-center">
              <input
                type="radio"
                name="gender"
                value="female"
                className="mr-2"
              />
              <span className="text-lg">Bác sĩ ngoại</span>
            </label>
          </div>
        </div> */}

        {/* Button */ }
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
