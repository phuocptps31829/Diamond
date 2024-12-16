import InputCustom from "@/components/ui/InputCustom";
import ImagePreview from "@/components/ui/ImagePreview";
import { staffSchema } from "@/zods/client/staff";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import SelectBirthDate from "@/components/client/checkout/select/SelectBirthday";
import SelectRole from "./select/SelectRole";
import staffApi from "@/services/staffApi";
import { imageApi } from "@/services/imageApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import RadioGroupField from "@/components/ui/RadioGroupField";
import "react-quill/dist/quill.snow.css";
import { toastUI as toast } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export default function StaffsFormFix({ staffDetail }) {
  const queryClient = useQueryClient();
  const [loadingImage, setLoadingImage] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(staffSchema),
    defaultValues: {
      staffName: "",
      phone: "",
      email: undefined,
      birthDate: "",
      password: undefined,
      confirmPassword: undefined,
      citizenIdentificationNumber: undefined,
      address: undefined,
      gender: "Nam",
      isActivated: true,
      role: "",
    },
  });

  useEffect(() => {
    if (staffDetail) {
      const {
        fullName,
        phoneNumber,
        avatar,
        email,
        dateOfBirth,
        address,
        citizenIdentificationNumber,
        role,
        gender,
        isActivated,
      } = staffDetail;
      setValue("staffName", fullName);
      setValue("phone", phoneNumber);
      setValue("email", email || "");
      setValue("birthDate", dateOfBirth || "");
      setValue(
        "citizenIdentificationNumber",
        citizenIdentificationNumber || ""
      );
      setValue("role", role._id);
      setValue("address", address || "");
      setValue("gender", gender);
      setValue("isActivated", isActivated);
      setImagePreview(URL_IMAGE + "/" + avatar);
    }
  }, [staffDetail, setValue]);

  const { mutate: createStaffMutation, isPending } = useMutation({
    mutationFn: ({ id, requestData }) => {
      return staffApi.updateStaff(id, requestData);
    },
    onSuccess: () => {
      queryClient.invalidateQueries(["staff", staffDetail._id]);
      toast("Cập nhật nhân viên thành công!", "success");
    },
    onError: (error) => {
      console.log("error", error);
      setLoadingImage(false);
      toast(
        error ? error.response.data.message : "Cập nhật người dùng thất bại!",
        "error"
      );
    },
  });

  const onSubmit = async (data) => {
    const requestData = {
      fullName: data.staffName,
      roleID: data.role,
      phoneNumber: data.phone,
      email: data.email || "",
      dateOfBirth: data.birthDate || "",
      address: data.address || "",
      gender: data.gender,
      password: data.password,
      avatar: "",
      isActivated: data.isActivated,
      citizenIdentificationNumber: data.citizenIdentificationNumber || "",
    };

    if (fileImage) {
      setLoadingImage(true);
      const formData = new FormData();
      formData.append("file", fileImage);
      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;
      requestData.avatar = imageUrl;
      setLoadingImage(false);
    } else {
      requestData.avatar = staffDetail.avatar;
    }

    createStaffMutation({
      id: staffDetail._id,
      requestData,
    });
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 min-h-[calc(100vh-140px)]">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin nhân viên
      </h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-1 block bg-white px-2">
              Ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <ImagePreview
              imagePreview={ imagePreview }
              setFileImage={ setFileImage }
              setImagePreview={ setImagePreview }
            />
          </div>
          <div className="flex w-full flex-col gap-2">
            <div className="block">
              <div className="w-full grid-cols-1 md:flex md:gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Họ và tên người dùng" }
                    required
                    className="col-span-1 sm:col-span-1"
                    name="staffName"
                    type="text"
                    id="staffName"
                    placeholder="Nhập họ và tên bệnh nhân"
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
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={ "Email" }
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Nhập email"
                    control={ control }
                    errors={ errors }
                  />
                </div>
                <div className="relative flex w-1/2 gap-2">
                  <div className="relative md:mb-1 md:w-full xl:mb-[4px] 2xl:mb-3">
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
            </div>
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative w-1/2">
                  <InputCustom
                    label={ "Mã căn cước công dân" }
                    className="col-span-1 sm:col-span-1"
                    name="citizenIdentificationNumber"
                    type="text"
                    id="citizenIdentificationNumber"
                    placeholder="Nhập mã căn cước công dân"
                    control={ control }
                    errors={ errors }
                  />
                </div>
                <div className="w-1/2">
                  <Label className="mb-3 block text-sm font-medium leading-none text-black">
                    Vai trò: <span className="text-red-500">*</span>
                  </Label>
                  <SelectRole name="role" control={ control } errors={ errors } />
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="my-5 w-full gap-[10px] md:flex">
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
          <div className="relative flex-1">
            <InputCustom
              label={ "Nhập địa chỉ" }
              className="col-span-1 sm:col-span-1"
              name="address"
              id="address"
              placeholder="Nhập địa chỉ"
              control={ control }
              errors={ errors }
            />
          </div>
        </div>
        <div className="block">
          <div className="flex w-full gap-[10px]">
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
            <div className="flex w-full flex-1 gap-[20px]">
              <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
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
              <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                <InputCustom
                  label={ "Nhập lại mật khẩu" }
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
        <div className="mt-10 w-full text-end">
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
