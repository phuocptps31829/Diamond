import InputCustom from "@/components/ui/InputCustom";
import { staffSchema } from "@/zods/staff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import SelectDepartment from "@/components/client/checkout/select/SelectDepartment";
import {
  SelectDistrict,
  SelectProvince,
  SelectWard,
} from "@/components/client/checkout/select/SelectLocation";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import 'react-quill/dist/quill.snow.css'; 
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
    resolver: zodResolver(staffSchema),
    defaultValues: {
      staffName: "",
      fullName:"",
      phone: "",
      email: "",
      birthDate: "",
      chungchi:"",
      gender: "",
      room: "",
      branch:"",
      password: "",
      confirmPassword: "",
      department: "",
      experienceYears: "",
      province: "",
      district: "",
      ward: "",
      ethnicity: "",
      address: "",
      status: ""
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const handleFileChange = (event) => {
    setSelectedFile(event.target.files[0]);
  };
  const onSubmit = () => {  
  };


    return (
      <div className="bg-white w-[100%] px-7 py-6 rounded-lg shadow-gray ">
        <h1 className="mr-2 bg-white h-fit mb-4 text-2xl font-bold">Thông tin nhân viên</h1>
        
        <form onSubmit={handleSubmit(onSubmit)} >
          {/* Image */}
          <div className="flex gap-[10px] ">

          <div className="w-1/5  p-4">
            <div className=" w-[260px] h-[260px] ">
              <img src="https://cdn.pixabay.com/photo/2024/03/25/18/35/ai-generated-8655320_640.png"
                className="rounded-3xl"
              ></img>
            </div>

            <div className="mt-4 flex justify-center">
              <label className="block w-1/2 px-4 py-2 text-center text-lg text-white bg-primary-500 rounded-md cursor-pointer hover:bg-primary-600">
              {selectedFile ? selectedFile.name : "Chọn file"}
              <input
                type="file"
                className="hidden"
                onChange={handleFileChange}
              />
              </label>
            </div>
          </div>


          <div className=" w-full">
          {/* Line 1 */}
          <div className="block ">
            <div className="w-full flex gap-[10px]">
              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white">
                  Họ và tên nhân viên <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1 "
                  name="fullName"
                  type="text"
                  id="fullName"
                  control={control}
                  errors={errors}
                />
              </div>

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="phone" className="block px-1 left-[15px] bg-white">
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
          <div className="w-full flex gap-[10px] ">
            <div className="w-full flex gap-[10px]">

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="email" className="block px-1 left-[15px] bg-white">
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

              <div className="mb-3 w-2/5 relative">
                <label htmlFor="birthdate" className="block px-1 left-[15px] bg-white mb-2">
                  Ngày sinh <span className="text-red-500">*</span>
                </label>
                <SelectBirthDate
                      control={control}
                      name="birthDate"
                      errors={errors}
                    />
              </div>
            <div className="flex items-center gap-2">
              <label className="flex items-center mr-2">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-2"
                />
                Nam
              </label>
              <label className="flex items-center">
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
          <div className="block ">
            <div className="w-full flex gap-[10px]">
              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white">
                  Mật khẩu <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="password"
                  type="password"
                  id="password"
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="mb-3 w-1/2 relative">
                <label htmlFor="phone" className="block px-1 left-[15px] bg-white">
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
          <div className="block ">
            <div className="w-full flex gap-[10px]">


              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white">
                  Chứng chỉ hành nghề <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="chungchi"
                  type="text"
                  id="chungchi"
                  control={control}
                  errors={errors}
                />
              </div>

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
                  Khoa <span className="text-red-500">*</span>
                </label>
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                    // specialtyID={
                    //   selectedService?.bookingDetail?.specialtyID || ""
                    // }
                    // setValue={setValue}
                    // onChange={(branchID) => {
                    //   setSelectedBranchId(branchID);
                    // }}
                  />
              </div>

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="phone" className="block px-1 left-[15px] bg-white">
                  Số năm kinh nghiệm <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1"
                  name="experienceYears"
                  type="text"
                  id=""
                  control={control}
                  errors={errors}
                />
              </div>

            </div>
          </div>
          </div>
          </div>
        {/* Line 5 */}
          <div className=" w-full flex gap-[10px]">
            <div className="w-full flex gap-[10px]">
            <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
                  Chuyên khoa <span className="text-red-500">*</span>
                </label>
                  {/* Khoa khám */}
                  <SelectDepartment
                    control={control}
                    name="department"
                    errors={errors}
                    // specialtyID={
                    //   selectedService?.bookingDetail?.specialtyID || ""
                    // }
                    // setValue={setValue}
                    // onChange={(branchID) => {
                    //   setSelectedBranchId(branchID);
                    // }}
                  />
              </div>

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
                  Chi nhánh làm việc <span className="text-red-500">*</span>
                </label>
                  <SelectDepartment
                    control={control}
                    name="branch"
                    errors={errors}
                    // specialtyID={
                    //   selectedService?.bookingDetail?.specialtyID || ""
                    // }
                    // setValue={setValue}
                    // onChange={(branchID) => {
                    //   setSelectedBranchId(branchID);
                    // }}
                  />
                </div>

                <div className="mb-3 w-1/2 relative">
                  <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
                    Phòng <span className="text-red-500">*</span>
                  </label>
                    <SelectDepartment
                      control={control}
                      name="room"
                      errors={errors}
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
        {/* Line 6 */}
            <div className="w-full flex gap-[10px]">
            <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
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

              <div className="mb-3 w-1/2 relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
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

                <div className="mb-3 w-1/2 relative">
                  <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
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
                <div className="mb-3 w-1/2 relative">
                  <label htmlFor="hoten" className="block px-1 left-[15px] bg-white mb-2">
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
            <div className="w-full flex gap-[10px]">
              <div className="mb-3 w-full relative">
                <label htmlFor="hoten" className="block px-1 left-[15px] bg-white">
                  Địa chỉ thường trú <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1 "
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
              <h2 className="mb-1">Trạng thái tài khoản <span className="text-red-600">*</span></h2>
              <div className="flex items-center mb-3">
                <label className="flex items-center mr-6">
                  <input
                    type="radio"
                    name="gender"
                    value="male"
                    className="mr-2 "
                  />
                  <span className="text-lg">
                    Đang hoạt động

                  </span>
                </label>
                <label className="flex items-center">
                  <input
                    type="radio"
                    name="gender"
                    value="female"
                    className="mr-2"
                  />
                  <span className="text-lg">
                    Đã khóa
                  </span>
                </label>
              </div>
            </div>
              
            {/* Button */}
            <div className="flex gap-2 justify-end">
            <Button
              size=""
              variant="primary"
              className="border-none bg-gray-200 hover:bg-gray-400 text-primary-500 px-6"
            >
              Hủy
            </Button>
            <Button
              size=""
              variant="primary"
              className="border-none bg-primary-500 hover:bg-primary-600 px-6"
            >
              Cập nhật
            </Button>
            </div>
        </form>
      </div>
    );
  }
  