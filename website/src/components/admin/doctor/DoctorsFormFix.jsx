import InputCustom from "@/components/ui/InputCustom";
import { doctorAdminSchema } from "@/zods/admin/doctorAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBirthDate from "./select/SelectBirthday";
import SelectDepartment from "@/components/client/checkout/select/SelectDepartmentDoctor";
import "react-quill/dist/quill.snow.css";
import DoctorEditor from "./editor";
import SelectBranch from "./select/SelectBranch";
import { useState, useEffect } from "react";
import SelectSpecialty from "./select/SelectSpecialty";
import { imageApi } from "@/services/imageApi";
import { useForm } from "react-hook-form";
import ImagePreview from "@/components/ui/ImagePreview";
import RadioGroupField from "@/components/ui/RadioGroupField";
import { doctorApi } from "@/services/doctorsApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI as toast } from "@/components/ui/Toastify";
import { CertificateInFixPage } from "@/components/admin/doctor/dialog/CertificateInFixPage";
import { AddCertificateImages } from "@/components/admin/doctor/dialog/AddCertificateImages";
import SpinLoader from "@/components/ui/SpinLoader";
import { Button } from "@/components/ui/Button";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export default function DoctorsFormFix({ dataDoctor }) {
  const queryClient = useQueryClient();
  const [loadingCertificate, setLoadingCertificate] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [locationSubmit, setLocationSubmit] = useState(0);
  const [isOpen, setIsOpen] = useState(false);
  const [imagePreview, setImagePreview] = useState(null);
  const [isInitialized, setIsInitialized] = useState(false);
  const [otherInfo, setOtherInfo] = useState(null);
  const [arrayImages, setArrayImages] = useState([]);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(doctorAdminSchema),
    defaultValues: {
      fullName: dataDoctor?.fullName || "",
      phoneNumber: dataDoctor?.phoneNumber || "",
      email: dataDoctor?.email || "",
      dateOfBirth: dataDoctor?.dateOfBirth || "",
      address: dataDoctor?.address || "",
      gender: dataDoctor?.gender || "Nam",
      password: undefined,
      confirmPassword: undefined,
      practicingCertificate:
        dataDoctor?.otherInfo?.verification?.practicingCertificate || "",
      citizenIdentificationNumber:
        dataDoctor?.citizenIdentificationNumber.toString() || "",
      title: dataDoctor?.otherInfo?.title || "",
      isInternal: dataDoctor?.otherInfo?.isInternal || true,
      yearsExperience: dataDoctor?.otherInfo?.yearsExperience || "",
      specialty: dataDoctor?.otherInfo?.specialty?._id || "",
      branchID: dataDoctor?.otherInfo?.branch?._id || "",
      isActivated: dataDoctor?.isActivated,
      detail: dataDoctor?.otherInfo?.detail || "",
    },
  });

  useEffect(() => {
    if (isInitialized) return;
    setImagePreview(dataDoctor?.avatar || null);
    setArrayImages(dataDoctor?.otherInfo?.verification?.images || []);
    const otherInfoFormated = {
      specialtyID: dataDoctor.otherInfo.specialty?._id || "",
      branchID: dataDoctor.otherInfo.branch?._id || "",
      title: dataDoctor.otherInfo.title || "",
      yearsExperience: dataDoctor.otherInfo.yearsExperience || "",
      detail: dataDoctor.otherInfo.detail || "",
      isInternal: dataDoctor.otherInfo.isInternal || true,
      verification: {
        practicingCertificate:
          dataDoctor?.otherInfo?.verification?.practicingCertificate || "",
        images: dataDoctor?.otherInfo?.verification?.images || [],
      },
    };

    setOtherInfo(otherInfoFormated);
    setIsInitialized(true);
  }, [isInitialized, dataDoctor]);

  const handleClickDeleteImage = (index) => {
    const newImages = arrayImages.filter((_, i) => i !== index);

    const updateDoctor = {
      otherInfo: {
        ...otherInfo,
        verification: {
          ...otherInfo.verification,
          images: newImages,
        },
      },
    };

    updateDoctorMutation({
      id: dataDoctor._id,
      newData: updateDoctor,
      location: 1,
    });
  };

  const handleClickDeleteImagesAll = () => {
    const updateDoctor = {
      otherInfo: {
        ...otherInfo,
        verification: {
          ...otherInfo.verification,
          images: [],
        },
      },
    };

    updateDoctorMutation({
      id: dataDoctor._id,
      newData: updateDoctor,
      location: 2,
    });
  };

  const { mutate: updateDoctorMutation, isPending } = useMutation({
    mutationFn: ({ id, newData, location }) => {
      setLocationSubmit(location);
      return doctorApi.updateDoctors(id, newData);
    },
    onSuccess: (newData) => {
      console.log("newData", newData);
      reset({
        fullName: newData.fullName,
        phoneNumber: newData.phoneNumber,
        email: newData.email,
        dateOfBirth: newData.dateOfBirth,
        address: newData.address,
        gender: newData.gender,
        password: undefined,
        confirmPassword: undefined,
        isActivated: newData.isActivated,
      });

      setValue(
        "practicingCertificate",
        newData.otherInfo.verification.practicingCertificate
      );
      setValue(
        "citizenIdentificationNumber",
        newData.citizenIdentificationNumber
      );
      setValue("title", newData.otherInfo.title);
      setValue("isInternal", newData.otherInfo.isInternal);
      setValue("yearsExperience", newData.otherInfo.yearsExperience);
      setValue("specialty", newData.otherInfo.specialtyID);
      setValue("branchID", newData.otherInfo.branchID);
      setValue("detail", newData.otherInfo.detail);
      setArrayImages(newData.otherInfo.verification.images);
      setOtherInfo(newData.otherInfo);
      setImagePreview(newData.avatar);

      queryClient.invalidateQueries("doctor");
      setFileImage(null);
      setIsLoading(false);
      setLoadingCertificate(false);
      setIsOpen(false);
      toast("Chỉnh sửa bác sĩ thành công!", "success");
    },
    onError: (error) => {
      console.error("Lỗi khi chỉnh sửa bác sĩ:", error);
      toast("Có lỗi xảy ra, vui lòng thử lại.", "error");
      setIsLoading(false);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toast("Vui lòng chọn ảnh!", "error");
      return;
    }

    setIsLoading(true);

    const { password } = data;

    const updateDoctor = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      gender: data.gender,
      avatar: "",
      isActivated: data.isActivated,
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      otherInfo: {
        specialtyID: data.specialty,
        branchID: data.branchID,
        title: data.title,
        yearsExperience: data.yearsExperience,
        detail: data.detail,
        isInternal: data.isInternal,
        verification: {
          practicingCertificate: data.practicingCertificate,
          images: arrayImages,
        },
      },
    };

    if (fileImage) {
      const formData = new FormData();
      formData.append("file", fileImage);
      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;
      if (!imageUrl) {
        setIsLoading(false);
        throw new Error("Không thể upload ảnh");
      }
      updateDoctor.avatar = imageUrl;
    } else {
      updateDoctor.avatar = imagePreview;
    }

    if (password !== undefined) {
      updateDoctor.password = password;
    }

    updateDoctorMutation({
      id: dataDoctor._id,
      newData: updateDoctor,
      location: 0,
    });
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 min-h-[calc(100vh-140px)]">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin bác sĩ
      </h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="grid-cols-1 gap-5 sm:grid md:flex">
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <ImagePreview
              imagePreview={
                imagePreview && fileImage
                  ? imagePreview
                  : imagePreview && URL_IMAGE + "/" + imagePreview
              }
              setFileImage={ setFileImage }
              setImagePreview={ setImagePreview }
            />
            { !imagePreview && (
              <div className="mt-3 text-center text-sm text-red-500">
                Vui lòng chọn ảnh
              </div>
            ) }
          </div>
          <div className="w-full">
            <div className="block">
              <div className="w-full grid-cols-1 md:flex md:gap-5">
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={ "Họ và tên" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeholder={ "Nhập họ và tên" }
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={ "Số điện thoại" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    placeholder={ "Nhập số điện thoại" }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
            {/* Line 2 */ }
            <div className="flex w-full gap-5">
              <div className="w-full gap-5 md:flex">
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={ "Email" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="email"
                    id="email"
                    placeholder={ "Nhập email" }
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative flex w-1/2 gap-5">
                  <div className="relative flex-1 md:mb-4">
                    <label
                      htmlFor="dateOfBirth"
                      className="left-[15px] mb-2 block bg-white px-1 text-sm"
                    >
                      Ngày sinh <span className="text-red-500">*</span>
                    </label>
                    <SelectBirthDate
                      control={ control }
                      name="dateOfBirth"
                      errors={ errors }
                    />
                  </div>
                  <div className="w-1/3">
                    <RadioGroupField
                      name="gender"
                      label="Giới tính:"
                      options={ [
                        { value: "Nam", label: "Nam" },
                        { value: "Nữ", label: "Nữ" },
                      ] }
                      control={ control }
                    />
                  </div>
                </div>
              </div>
            </div>
            {/* Line 3 */ }
            <div className="block">
              <div className="w-full gap-5 md:flex">
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={ "Mật khẩu" }
                    className="col-span-1 sm:col-span-1"
                    name="password"
                    type="password"
                    id="Password"
                    placeholder="Nhập mật khẩu"
                    control={ control }
                    errors={ errors }
                  />
                </div>
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={ "Xác nhận mật khẩu" }
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
          </div>
        </div>
        <div className="block">
          <div className="my-1 mb-2 flex w-full items-center gap-5">
            {/* isActivated */ }
            <div className="w-1/3">
              <RadioGroupField
                name="isActivated"
                label="Trạng thái tài khoản:"
                options={ [
                  { value: true, label: "Hoạt động" },
                  { value: false, label: "Khóa tài khoản" },
                ] }
                control={ control }
              />
            </div>
            <div className="relative md:mb-4 md:w-1/3">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-4 block bg-white px-1 text-lg md:text-sm"
              >
                Chọn ảnh chứng nhận hành nghề{ " " }
                <span className="text-red-500">*</span>
              </label>
              <>
                <div className="flex gap-3">
                  <CertificateInFixPage
                    data={ arrayImages }
                    onClickDeleteImage={ handleClickDeleteImage }
                    isPending={ isPending }
                    handleClickDeleteImagesAll={ handleClickDeleteImagesAll }
                    locationSubmit={ locationSubmit }
                  />
                  <AddCertificateImages
                    isOpen={ isOpen }
                    setIsOpen={ setIsOpen }
                    otherInfo={ otherInfo }
                    setArrayImages={ setArrayImages }
                    id={ dataDoctor._id }
                    updateDoctorMutation={ updateDoctorMutation }
                    isPending={ isPending }
                    isLoading={ loadingCertificate }
                    setIsLoading={ setLoadingCertificate }
                  />
                </div>
              </>
            </div>
            <div className="relative mb-4 w-1/3">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-sm"
              >
                Khoa <span className="text-red-500">*</span>
              </label>
              <SelectDepartment
                control={ control }
                options={ [
                  { value: true, label: "Bác sĩ cơ hữu" },
                  { value: false, label: "Bác sĩ ngoài giờ" },
                ] }
                name="isInternal"
              />
            </div>
          </div>
        </div>
        {/* Line 4 */ }
        <div className="my-2 flex gap-5">
          <div className="relative mb-4 w-1/3">
            <InputCustom
              label={ "Mã căn cước công dân" }
              required
              className="col-span-1 sm:col-span-1"
              name="citizenIdentificationNumber"
              type="text"
              id="citizenIdentificationNumber"
              placeholder="Nhập mã căn cước công dân"
              control={ control }
              errors={ errors }
            />
          </div>

          <div className="relative md:mb-4 md:w-1/3">
            <InputCustom
              label={ "Chứng chỉ hành nghề" }
              required
              className="col-span-1 sm:col-span-1"
              name="practicingCertificate"
              type="text"
              id="practicingCertificate"
              placeholder={ "Nhập chứng chỉ hành nghề" }
              control={ control }
              errors={ errors }
            />
          </div>
          <div className="relative md:mb-4 md:w-1/3">
            <label
              htmlFor="yearsExperience"
              className="left-[15px] mb-2 block bg-white px-1 text-sm"
            >
              Ngày bắt đầu vào nghề: <span className="text-red-500">*</span>
            </label>
            <SelectBirthDate
              control={ control }
              name="yearsExperience"
              errors={ errors }
            />
          </div>
        </div>
        {/* Line 5 */ }
        <div className="flex w-full gap-5">
          <div className="w-full gap-5 md:flex">
            <div className="relative md:mb-4 md:w-1/2">
              <InputCustom
                label={ "Trình độ chuyên môn" }
                className="col-span-1 sm:col-span-1"
                required
                placeholder={ "Nhập trình độ chuyên môn" }
                name="title"
                type="text"
                id="title"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-sm"
              >
                Chuyên khoa <span className="text-red-500">*</span>
              </label>
              <SelectSpecialty
                control={ control }
                name="specialty"
                errors={ errors }
              />
            </div>
            <div className="relative mb-3 md:w-1/2">
              <label
                htmlFor="branchID"
                className="left-[15px] mb-2 block bg-white px-1 text-sm"
              >
                Chi nhánh làm việc <span className="text-red-500">*</span>
              </label>
              <SelectBranch
                control={ control }
                name="branchID"
                errors={ errors }
                setValue={ (value) =>
                  console.log("Giá trị branchID được chọn: ", value)
                }
              />
            </div>
          </div>
        </div>

        {/* Line 7 */ }
        <div className="flex w-full gap-5">
          <div className="relative mb-3 w-full">
            <InputCustom
              label={ "Địa chỉ" }
              required
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              placeholder={ "Nhập địa chỉ" }
              control={ control }
              errors={ errors }
            />
          </div>
        </div>
        <div className="w-full">
          <label
            htmlFor="hoten"
            className="left-[15px] mb-2 block bg-white px-1 text-sm"
          >
            Chi tiết về bác sĩ <span className="text-red-500">*</span>
          </label>
          <DoctorEditor name="detail" control={ control } errors={ errors } />
        </div>

        {/* Button */ }
        <div className="mt-5 flex justify-end">
          <Button
            variant="custom"
            type="submit"
            disabled={ isLoading || isPending }
          >
            { (isLoading || isPending) && locationSubmit === 0 ? (
              <SpinLoader />
            ) : (
              "Cập nhật"
            ) }
          </Button>
        </div>
      </form>
    </div>
  );
}
