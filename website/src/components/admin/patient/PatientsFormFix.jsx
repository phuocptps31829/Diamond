import InputCustom from "@/components/ui/InputCustom";
import { patientAdminSchema } from "@/zods/admin/patientAdmin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import RadioGroupField from "@/components/ui/RadioGroupField";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import ImagePreview from "@/components/ui/ImagePreview";
import { imageApi } from "@/services/imageApi";
import { patientApi } from "@/services/patientsApi";
import { toastUI as toast } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export default function PatientFormFix({ patientDetail }) {
  const queryClient = useQueryClient();
  const [loadingImage, setLoadingImage] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [isInitialized, setIsInitialized] = useState(true);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(patientAdminSchema),
    defaultValues: {
      fullName: patientDetail?.fullName || "",
      phone: patientDetail?.phoneNumber || "",
      email: patientDetail?.email || "",
      dateOfBirth: patientDetail?.dateOfBirth || "",
      password: undefined,
      confirmPassword: undefined,
      gender: patientDetail?.gender || "Nam",
      insuranceCode: patientDetail?.otherInfo?.insuranceCode || "",
      occupation: patientDetail?.otherInfo?.occupation || "",
      address: patientDetail?.address || "",
      citizenIdentificationNumber:
        patientDetail?.citizenIdentificationNumber?.toString() || "",
      ethnic: patientDetail?.otherInfo?.ethnic || "",
      isActivated: patientDetail?.isActivated || true,
    },
  });

  useEffect(() => {
    if (!isInitialized) return;
    setImagePreview(patientDetail.avatar);
    setIsInitialized(false);
  }, [isInitialized, patientDetail]);

  const { mutate: updatePatientMutation, isPending } = useMutation({
    mutationFn: ({ id, requestBody }) => {
      return patientApi.updatePatient(id, requestBody);
    },
    onSuccess: (newData) => {
      reset({
        fullName: newData.fullName,
        phone: newData.phoneNumber,
        email: newData.email,
        dateOfBirth: newData.dateOfBirth,
        gender: newData.gender,
        citizenIdentificationNumber: newData.citizenIdentificationNumber,
        isActivated: newData.isActivated,
        adress: newData.address,
        password: undefined,
        confirmPassword: undefined,
      });

      setValue("insuranceCode", newData.otherInfo?.insuranceCode || "");
      setValue("occupation", newData.otherInfo?.occupation || "");
      setValue("ethnic", newData.otherInfo?.ethnic || "");

      setImagePreview(newData.avatar);
      setFileImage(null);
      setLoadingImage(false);
      toast("Cập nhật người dùng thành công!", "success");
      queryClient.invalidateQueries(["patient", patientDetail._id]);
    },
    onError: () => {
      setLoadingImage(false);
      toast("Cập nhật người dùng thất bại!", "error");
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toast("Vui lòng chọn ảnh!", "error");
      return;
    }
    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      password: data.password,
      avatar: "",
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      isActivated: data.isActivated,
      address: data.address,
      otherInfo: {
        occupation: data.occupation,
        insuranceCode: data.insuranceCode,
        ethnic: data.ethnic,
      },
    };

    if (data.password === undefined) {
      delete requestBody.password;
      delete requestBody.confirmPassword;
    }

    if (fileImage) {
      setLoadingImage(true);
      const formData = new FormData();
      formData.append("file", fileImage);
      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;

      if (!imageUrl) {
        setLoadingImage(false);
        throw new Error("Không thể upload ảnh");
      }
      requestBody.avatar = imageUrl;

      updatePatientMutation({ id: patientDetail._id, requestBody });
    } else {
      requestBody.avatar = imagePreview;
      updatePatientMutation({ id: patientDetail._id, requestBody });
    }
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 min-h-[calc(100vh-140px)]">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin người dùng
      </h1>

      <form onSubmit={ handleSubmit(onSubmit) }>
        {/* Image */ }
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
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
              <p className="mt-3 text-center text-sm text-red-500">
                Vui lòng chọn ảnh
              </p>
            ) }
          </div>
          <div className="w-full">
            {/* Line 1 */ }
            <div className="block">
              <div className="flex w-full grid-cols-1 gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Họ và tên người dùng" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeholder="Nhập họ và tên"
                    control={ control }
                    errors={ errors }
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Số điện thoại" }
                    required
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
                  <InputCustom
                    label={ "Email" }
                    required
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
                    name="dateOfBirth"
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
            {/* Line 3 */ }
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Mật khẩu" }
                    required
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
                  <InputCustom
                    label={ "Nhập lại mật khẩu" }
                    required
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
                  <InputCustom
                    label={ "Mã bảo hiểm y tế" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="insuranceCode"
                    type="text"
                    id="insuranceCode"
                    placeholder="Nhập mã bảo hiểm y tế"
                    control={ control }
                    errors={ errors }
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Nghề nghiệp" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="occupation"
                    type="text"
                    id="occupation"
                    placeholder="Nhập nghề nghiệp"
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-[10px] mb-2">
          <div className="mr-5 w-[297px]">
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
          <div className="flex-1 flex gap-[20px]">
            <div className="relative md:mb-1 md:w-1/2">
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
            <div className="relative md:w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-[14px]"
              >
                Dân tộc <span className="text-red-500">*</span>
              </label>
              <SelectEthnic control={ control } name="ethnic" errors={ errors } />
            </div>
          </div>
        </div>
        <div className="mt-1 flex w-full gap-[10px]">
          <div className="mr-5 w-[297px]">
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
          <div className="flex-1">
            <InputCustom
              label={ "Nhập địa chỉ" }
              required
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              placeholder="Nhập địa chỉ"
              control={ control }
              errors={ errors }
            />
          </div>
        </div>
        <div className="flex cursor-pointer justify-end mt-10">
          <Button
            variant="custom"
            type="submit"
            disabled={ isPending || loadingImage }
          >
            { isPending || loadingImage ? <SpinLoader /> : "Cập nhật" }
          </Button>
        </div>
      </form>
    </div>
  );
}
