import InputCustom from "@/components/ui/InputCustom";
import { patientAdminSchema } from "@/zods/admin/patientAdmin";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
import SelectBirthDate from "./select/SelectBirthday";
import SelectEthnic from "@/components/client/checkout/select/SelectEthnicity";
import RadioGroupField from "@/components/ui/RadioGroupField";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import ImagePreview from "@/components/ui/ImagePreview";
import { imageApi } from "@/services/imageApi";
import { patientApi } from "@/services/patientsApi";
import { toastUI as toast } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";

export default function PatientFormAdd() {
  const navigate = useNavigate();
  const [loadingImage, setLoadingImage] = useState(false);

  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(patientAdminSchema),
    defaultValues: {
      fullName: "",
      phone: "",
      email: "",
      dateOfBirth: "",
      password: "",
      confirmPassword: "",
      gender: "Nam",
      insuranceCode: "",
      occupation: "",
      address: "",
      citizenIdentificationNumber: "",
      ethnic: "",
      isActivated: true,
    },
  });

  const { mutate: createPatientMutation, isPending } = useMutation({
    mutationFn: patientApi.createPatient,
    onSuccess: () => {
      reset();
      setFileImage(null);
      setImagePreview(null);
      setLoadingImage(false);
      toast("Thêm mới người dùng thành công!", "success");
      navigate("/admin/patients/list");
    },
    onError: (error) => {
      console.log("error", error);
      setLoadingImage(false);
      toast(
        error ? error.response.data.message : "Thêm mới người dùng thất bại!",
        "error"
      );
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage) {
      toast("Vui lòng chọn ảnh!", "error");
      return;
    }

    setLoadingImage(true);

    const formData = new FormData();
    formData.append("file", fileImage);

    const imageResponse = await imageApi.createImage(formData);
    const imageUrl = imageResponse?.data;

    if (!imageUrl) {
      setLoadingImage(false);
      throw new Error("Không thể upload ảnh");
    }

    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phone,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      password: data.password,
      avatar: imageUrl,
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      isActivated: data.isActivated,
      address: data.address,
      otherInfo: {
        occupation: data.occupation,
        insuranceCode: data.insuranceCode,
        ethnic: data.ethnic,
      },
    };

    createPatientMutation(requestBody);
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin người dùng
      </h1>

      <form onSubmit={handleSubmit(onSubmit)}>
        {/* Image */}
        <div className="grid-cols-1 gap-[10px] sm:grid md:flex">
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh đại diện <span className="text-red-500">*</span>
            </label>
            <ImagePreview
              imagePreview={imagePreview}
              setFileImage={setFileImage}
              setImagePreview={setImagePreview}
            />
            {!fileImage && (
              <p className="mt-3 text-center text-sm text-red-500">
                Vui lòng chọn ảnh
              </p>
            )}
          </div>
          <div className="w-full">
            {/* Line 1 */}
            <div className="block">
              <div className="flex w-full grid-cols-1 gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Họ và tên người dùng"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeholder="Nhập họ và tên bệnh nhân"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Số điện thoại"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="phone"
                    type="text"
                    id="phone"
                    placeholder="Nhập số điện thoại"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            {/* Line 2 */}
            <div className="flex w-full">
              <div className="flex w-full gap-[20px]">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Email"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="text"
                    id="email"
                    placeholder="Nhập email"
                    control={control}
                    errors={errors}
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
                    control={control}
                    name="dateOfBirth"
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            {/* Line 3 */}
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Mật khẩu"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="password"
                    type="password"
                    id="Password"
                    placeholder="Nhập mật khẩu"
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Nhập lại mật khẩu"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    placeholder="Nhập lại mật khẩu"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>

            {/* Line 4 */}
            <div className="block">
              <div className="w-full gap-[20px] md:flex">
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Mã bảo hiểm y tế"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="insuranceCode"
                    type="text"
                    id="insuranceCode"
                    placeholder="Nhập mã bảo hiểm y tế"
                    control={control}
                    errors={errors}
                  />
                </div>
                <div className="relative md:mb-1 md:w-1/2 xl:mb-[4px] 2xl:mb-3">
                  <InputCustom
                    label={"Nghề nghiệp"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="occupation"
                    type="text"
                    id="occupation"
                    placeholder="Nhập nghề nghiệp"
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex w-full gap-[10px]">
          <div className="mr-5 w-[297px]">
            <RadioGroupField
              name="gender"
              label="Giới tính:"
              options={[
                { value: "Nam", label: "Nam" },
                { value: "Nữ", label: "Nữ" },
              ]}
              control={control}
            />
          </div>
          <div className="flex-1 flex gap-[20px] mb-2">
            <div className="relative md:mb-1 w-1/2">
              <InputCustom
                label={"Mã căn cước công dân"}
                required
                className="col-span-1 sm:col-span-1"
                name="citizenIdentificationNumber"
                type="text"
                id="citizenIdentificationNumber"
                placeholder="Nhập mã căn cước công dân"
                control={control}
                errors={errors}
              />
            </div>
            <div className="relative w-1/2">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-[14px]"
              >
                Dân tộc <span className="text-red-500">*</span>
              </label>
              <SelectEthnic control={control} name="ethnic" errors={errors} />
            </div>
          </div>
        </div>
        <div className="mt-1 flex w-full gap-[10px]">
          <div className="mr-5 w-[297px]">
            <RadioGroupField
              name="isActivated"
              label="Trạng thái tài khoản:"
              options={[
                { value: true, label: "Hoạt động" },
                { value: false, label: "Khóa tài khoản" },
              ]}
              control={control}
            />
          </div>
          <div className="flex-1">
            <InputCustom
              label={"Tên địa chỉ"}
              required
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              placeholder="Nhập địa chỉ"
              control={control}
              errors={errors}
            />
          </div>
        </div>

        <div className="flex justify-end mt-10">
          <Button
            variant="custom"
            type="submit"
            disabled={isPending || loadingImage}
          >
            {isPending || loadingImage ? <SpinLoader /> : "Thêm mới"}
          </Button>
        </div>
      </form>
    </div>
  );
}
