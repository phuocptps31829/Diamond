import InputCustom from "@/components/ui/InputCustom";
import { doctorSchema } from "@/zods/doctor";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import SelectDepartment from "@/components/client/checkout/select/SelectDepartmentDoctor";
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
import { useState, useEffect } from "react";
import SelectSpecialty from "@/components/client/checkout/select/SelectSpecialty";
import { MdCloudUpload } from "react-icons/md";
import { useForm, Controller } from "react-hook-form";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import Modal from 'react-modal';
import { doctorApi } from "@/services/doctorsApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";

import { toastUI } from "@/components/ui/Toastify";

Modal.setAppElement("#root");

export default function DoctorsForm() {
  const navigate = useNavigate();
  const [selectedProvinceId, setSelectedProvinceId] = useState(null);
  const [selectedDistrictId, setSelectedDistrictId] = useState(null);
  const [previewImage, setPreviewImage] = useState(null);
  const [isDegreeModalOpen, setIsDegreeModalOpen] = useState(false);
  const [DegreePreview, setDegreePreview] = useState(null);
  const [Degrees, setDegrees] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    onChange,

  } = useForm({
    resolver: zodResolver(doctorSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      gender: "",
      password: "",
      confirmPassword: "",
      practicingCertificate: "",
      title: "",
      isInternal: "",
      yearsExperience: "",
      specialty: "",
      branch: "",
      province: "",
      district: "",
      ward: "",
      ethnicity: "",
      address: "",
      isActivated: "",
      detail: "abc",
    },
  });

  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);

  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
      setFileName(file.name);
    }
  };
  const [fileName, setFileName] = useState(""); 

  const handleRemoveImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
  };
const handleDegreeChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    const reader = new FileReader();
    reader.onloadend = () => {
      setDegreePreview(reader.result);
    };
    reader.readAsDataURL(file);
  }
};
  const handleAddDegree = () => {
    if (DegreePreview) {
      setDegrees((prev) => [...prev, DegreePreview]);
      setDegreePreview(null);
    }
  };
  const handleRemoveDegree = (index) => {
    setDegrees((prev) => prev.filter((_, i) => i !== index));
  };
  const toggleDegreeModal = () => {
    setIsDegreeModalOpen(!isDegreeModalOpen);
  };
  const { mutate: createDoctors } = useMutation({
    mutationFn: (newDoctors) => doctorApi.createDoctors(newDoctors),
    onSuccess: () => {
        toastUI("Thêm bác sĩ thành công", "success");
        navigate('/admin/doctors/list');
    },
    onError: (err) => {
        console.error(err);
        toastUI("Có lỗi xảy ra: " + err.message, "error");
    },
  });
  const onSubmit = async (data) => {
    const dateOfBirth = new Date(data.dateOfBirth);
    console.log(dateOfBirth);
    if (isNaN(dateOfBirth.getTime())) {
      console.error("Invalid date");
      toastUI("Ngày sinh không hợp lệ.", "error");
      return;
    }
    let imageUrl = "";
    if (selectedFile) {
      setUploading(true);
      const imageResponse = await doctorApi.uploadIMG(selectedFile);
      setUploading(false);
      imageUrl = imageResponse?.data; 
      console.log("IMG uploaded: ", imageUrl); 
    }
    const formattedDateOfBirth = dateOfBirth.toISOString().split('T')[0];
    const doctorData = {
      role: "1",
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: formattedDateOfBirth,
      detail: data.detail,
      password: data.password,
      address: {
        province: data.province,
        district: data.district, 
        ward: data.ward, 
        street: data.address 
      },
      isInternal: data.isInternal,
      isActivated: data.isActivated,
      image: imageUrl, 
      citizenIdentificationNumber: data.citizenIdentificationNumber, 
      specialty: {
        _id: data.specialty, 
      },
      otherInfo: {
        specialtyID: data.specialty, 
        verification: {
          practicingCertificate : "112131312", // Thêm trường verification với practicing là 1
          images:["123", "456", "789"],
        },
      },
      branch: {
        _id: data.branch, 
      },
    };
    console.log("Dữ liệu gửi đi: ", data);
    createDoctors(doctorData);
    console.log("Doctor data: ", doctorData);
  };
  console.log(errors);
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
                  { previewImage ? (
                    <div className="h-[100%]">
                      <img
                        src={ previewImage }
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
                    htmlFor="fullName"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Họ và tên bác sĩ <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-4 md:w-1/2">
                  <label
                    htmlFor="phoneNumber"
                    className="left-[15px] block bg-white px-1 text-lg md:text-base"
                  >
                    Số điện thoại <span className="text-red-500">*</span>
                  </label>
                  <InputCustom
                    className="col-span-1 sm:col-span-1"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
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
                      htmlFor="dateOfBirth"
                      className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-base"
                    >
                      Ngày sinh <span className="text-red-500">*</span>
                    </label>
                    <SelectBirthDate
                      control={ control }
                      name="dateOfBirth"
                      errors={ errors }
                      onChange={(value) => console.log("Giá trị khoa được chọn: ", value)}

                    />
                  </div>
                  <Controller
                    name="gender"
                    control={control}
                    render={({ field }) => (
                      <div className="flex items-center gap-2 pb-2 md:p-0">
                        <label className="mr-2 flex items-center text-lg md:text-base">
                          <input
                            {...field}
                            type="radio"
                            value="male"
                            className="mr-2"
                          />
                          Nam
                        </label>
                        <label className="flex items-center text-lg md:text-base">
                          <input
                            {...field}
                            type="radio"
                            value="female"
                            className="mr-2"
                          />
                          Nữ
                        </label>
                      </div>
                    )}
                  />
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
        <div className="relative md:mb-4">
              <label
                htmlFor="hoten"
                className="left-[15px] block bg-white px-1 text-lg md:text-base "
              >
                Bằng cấp <span className="text-red-500">*</span>
              </label>
              <Button
              variant="primary"
              type="button"
              onClick={toggleDegreeModal}
              className="px-4 py-2 bg-blue-500 text-white rounded-md text-xl my-1 p-5"
              > 
              <MdCloudUpload className="mr-2" size={24} />
              Tải ảnh lên
            </Button>
            <div className="relative ">
              <div className="flex flex-wrap gap-4 ">
                {Degrees.map((cert, index) => (
                  <div key={index} className="relative">
                    <img
                      src={cert}
                      alt={`Degree ${index + 1}`}
                      className="h-[250px] w-[250px] object-cover rounded-lg"
                    />
                    <button
                      type="button"
                      onClick={() => handleRemoveDegree(index)}
                      className="absolute top-1 right-1 bg-red-500 text-white rounded-lg p-2 text-sm"
                    >
                      X
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
        <Modal
          isOpen={isDegreeModalOpen}
          onRequestClose={toggleDegreeModal}
          contentLabel="Thêm ảnh"
          className="w-1/6 mx-auto mt-20 bg-white p-6 rounded-lg shadow-lg"
          overlayClassName="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
        >
          <h2 className="text-xl font-semibold mb-4">Thêm ảnh <span className="text-red-500">*</span></h2>
          <div className="relative h-64 w-full rounded-lg border-2 border-dashed border-primary-500 flex items-center justify-center">
            {DegreePreview ? (
              <div className="relative h-full w-full">
                <img
                  src={DegreePreview}
                  alt="Degree Preview"
                  className="h-full w-full object-cover rounded-lg"
                />
                <button
                  type="button"
                  onClick={() => setDegreePreview(null)}
                  className="absolute top-3 right-3 bg-red-500 text-white rounded-sm p-2 hover:bg-red-600"
                >
                  X
                </button>
              </div>
            ) : (
              <label className="flex h-full w-full cursor-pointer items-center justify-center">
                <div className="flex flex-col items-center justify-center">
                  <MdCloudUpload size={45} color="#007BBB" />
                  <p className="mt-2 text-sm">Chọn ảnh</p>
                </div>
                <input
                  type="file"
                  id="DegreeImage"
                  className="hidden"
                  onChange={handleDegreeChange}
                  accept="image/*"
                />
              </label>
            )}
          </div>
          {/* Close Modal Button */}
          <div className="flex justify-end gap-2 items-center">
            <button
              type="button"
              onClick={toggleDegreeModal}
              className="
                mt-2 h-fit px-4 py-2 text-primary-500 rounded-md border border-primary-500 
              hover:bg-primary-600 hover:text-white hover:border-primary-600 transition duration-300"
            >
              Đóng
            </button>
            {DegreePreview && (
              <button
                type="button"
                onClick={handleAddDegree}
                className="
                  mt-2 px-4 py-2 bg-primary-500 text-white rounded-md 
                hover:bg-primary-600 hover:shadow-lg transition duration-300"
              >
                Tải lên
              </button>
            )}
          </div>
        </Modal>
        {/* Select images end */}
        <div className="block">
          <div className="w-full gap-[10px] md:flex">
          <div className="md:mb-4 md:w-1/2 relative ">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white md:text-base text-lg ">
                Chứng chỉ hành nghề <span className="text-red-500">*</span>
              </label>
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="practicingCertificate"
                type="text"
                id="practicingCertificate"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="md:mb-4 md:w-1/2 relative">
              <label htmlFor="hoten" className=" block px-1 left-[15px] bg-white md:text-base text-lg ">
                Trình độ chuyên môn <span className="text-red-500">*</span>
              </label>
              <InputCustom
                className="col-span-1 sm:col-span-1"
                name="title"
                type="text"
                id="title"
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
                name="isInternal"
                errors={ errors }
                onChange={(value) => console.log("Giá trị khoa được chọn: ", value)}
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
                name="yearsExperience"
                type="text"
                id="yearsExperience"
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
                setValue={(value) => console.log("Giá trị branch được chọn: ",value)}
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
          <label htmlFor="hoten" className="mb-2 block px-1 left-[15px] bg-white text-base">
            Chi tiết về bác sĩ <span className="text-red-500">*</span>
          </label>
          <DoctorEditor name="detail"
            control={ control }
            errors={ errors }
          />
        </div>
          {/* isActivated */ }
          <div className=" mt-3">
            <Label
              htmlFor=""
              className="mb-2 block text-base text-black"
            >
              Trạng thái<span className="text-red-[250px]0">*</span>
            </Label>
            <Controller
              name="isActivated"
              control={ control }
              render={ ({ field }) => (
                <RadioGroup
                  value={ field.value }
                  onValueChange={ (value) => field.onChange(value) }
                  className="flex items-center justify-start gap-5"
                >
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ true } id="r3" />
                    <Label htmlFor="r3">Đang hoạt động</Label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <RadioGroupItem value={ false } id="r4" />
                    <Label htmlFor="r4">Tạm dừng</Label>
                  </div>
                </RadioGroup>
              ) }
            />
          </div>
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
            type="submit"
            className="border-none bg-primary-500 px-6 hover:bg-primary-[250px]0"
          >
            Cập nhật
          </Button>
        </div>
      </form>
    </div>
  );
}
