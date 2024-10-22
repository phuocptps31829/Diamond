import InputCustom from "@/components/ui/InputCustom";
import { doctorAdminSchema } from "@/zods/admin/doctorAdmin";
import { zodResolver } from "@hookform/resolvers/zod";
import SelectBirthDate from "./select/SelectBirthday";
import SelectDepartment from "@/components/client/checkout/select/SelectDepartmentDoctor";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import DoctorEditor from "./editor";
import SelectBranch from "./select/SelectBranch";
import { useState } from "react";
import SelectSpecialty from "./select/SelectSpecialty";
import { imageApi } from "@/services/imageApi";
import { useForm, Controller } from "react-hook-form";
import ImagePreview from "@/components/ui/ImagePreview";
import RadioGroupField from "@/components/ui/RadioGroupField";
import { doctorApi } from "@/services/doctorsApi";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { toastUI as toast } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";
import { CertificateInAddPage } from "@/components/admin/doctor/dialog/CertificateInAddPage";
import { LuImagePlus } from "react-icons/lu";

export default function DoctorsFormAdd() {
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    watch,
    setValue,
  } = useForm({
    resolver: zodResolver(doctorAdminSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      dateOfBirth: "",
      address: "",
      gender: "Nam",
      password: "",
      confirmPassword: "",
      practicingCertificate: "",
      citizenIdentificationNumber: "",
      imagesPracticingCertificate: [],
      title: "",
      isInternal: true,
      yearsExperience: "",
      specialty: "",
      branchID: "",
      ethnicity: "",
      isActivated: true,
      detail: "",
    },
  });

  const handleUpdateImages = (newImages) => {
    setValue("imagesPracticingCertificate", newImages);
  };

  const handleUploadImages = (filesWithPreview) => {
    const currentImages = watch("imagesPracticingCertificate");
    const updatedImages = [...currentImages, ...filesWithPreview];

    setValue("imagesPracticingCertificate", updatedImages);
  };

  const { mutate: createDoctor, isPending } = useMutation({
    mutationFn: doctorApi.createDoctors,
    onSuccess: () => {
      toast("Tạo mới bác sĩ thành công!", "success");
      navigate("/admin/doctors/list");
      setIsLoading(false);
    },
    onError: (error) => {
      console.error("Lỗi khi tạo mới bác sĩ:", error);
      toast("Có lỗi xảy ra, vui lòng thử lại.", "error");
      setIsLoading(false);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage) {
      toast("Vui lòng chọn ảnh!", "error");
      return;
    } else if (data.imagesPracticingCertificate.length === 0) {
      toast("Vui lòng chọn ảnh chứng chỉ hành nghề!", "error");
      return;
    }

    setIsLoading(true);

    const newDoctor = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      address: data.address,
      gender: data.gender,
      password: data.password,
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
          images: [],
        },
      },
    };

    const formData = new FormData();
    formData.append("file", fileImage);

    const imageResponse = await imageApi.createImage(formData);
    const imageUrl = imageResponse?.data;

    newDoctor.avatar = imageUrl;

    try {
      const { imagesPracticingCertificate } = data;
      const uploadedImages = await Promise.all(
        imagesPracticingCertificate.map(async (imageObj) => {
          const formData = new FormData();
          formData.append("file", imageObj.file);
          try {
            const response = await imageApi.createImage(formData);
            return response.data;
          } catch (error) {
            console.error(
              "Lỗi khi upload ảnh:",
              error.response?.data || error.message
            );
            throw error;
          }
        })
      );

      newDoctor.otherInfo.verification.images = uploadedImages;

      createDoctor(newDoctor);
    } catch (error) {
      console.error("Lỗi khi tải ảnh hoặc tạo mới bác sĩ:", error);
      toast("Có lỗi xảy ra, vui lòng thử lại.", "error");
      setIsLoading(false);
    }
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin bác sĩ
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-cols-1 gap-5 sm:grid md:flex">
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
          <div className="mt-5 w-full">
            <div className="block">
              <div className="w-full grid-cols-1 md:flex md:gap-5">
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={"Họ và tên"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="fullName"
                    type="text"
                    id="fullName"
                    placeholder={"Nhập họ và tên"}
                    control={control}
                    errors={errors}
                  />
                </div>

                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={"Số điện thoại"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="phoneNumber"
                    type="text"
                    id="phoneNumber"
                    placeholder={"Nhập số điện thoại"}
                    control={control}
                    errors={errors}
                  />
                </div>
              </div>
            </div>
            {/* Line 2 */}
            <div className="flex w-full gap-5">
              <div className="w-full gap-5 md:flex">
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={"Email"}
                    required
                    className="col-span-1 sm:col-span-1"
                    name="email"
                    type="email"
                    id="email"
                    placeholder={"Nhập email"}
                    control={control}
                    errors={errors}
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
                      control={control}
                      name="dateOfBirth"
                      errors={errors}
                    />
                  </div>
                  <div className="w-1/3">
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
                </div>
              </div>
            </div>
            {/* Line 3 */}
            <div className="block">
              <div className="w-full gap-5 md:flex">
                <div className="relative md:mb-4 md:w-1/2">
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
                <div className="relative md:mb-4 md:w-1/2">
                  <InputCustom
                    label={"Xác nhận mật khẩu"}
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
          </div>
        </div>
        <div className="block">
          <div className="w-full gap-5 md:flex">
            {/* isActivated */}
            <div className="mt-5 md:w-1/3">
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
            <div className="relative md:mb-4 md:w-1/3">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-4 block bg-white px-1 text-lg md:text-sm"
              >
                Chọn ảnh chứng nhận hành nghề{" "}
                <span className="text-red-500">*</span>
              </label>

              {watch("imagesPracticingCertificate").length > 0 ? (
                <CertificateInAddPage
                  data={watch("imagesPracticingCertificate")}
                  setValue={handleUpdateImages}
                  handleUploadImages={handleUploadImages}
                />
              ) : (
                <>
                  <Controller
                    name="imagesPracticingCertificate"
                    control={control}
                    render={({ field }) => (
                      <>
                        <input
                          id="imagesPracticingCertificate"
                          className="hidden"
                          type="file"
                          multiple
                          onChange={(e) => {
                            const files = Array.from(e.target.files);
                            const filesWithPreview = files.map((file) => ({
                              file,
                              imagePreview: URL.createObjectURL(file),
                            }));
                            field.onChange(filesWithPreview);
                          }}
                        />
                        <label
                          htmlFor="imagesPracticingCertificate"
                          className="flex w-fit cursor-pointer rounded-sm bg-primary-400 p-2 px-4 text-[13px] text-white hover:bg-primary-500"
                        >
                          Thêm ảnh <LuImagePlus size={20} className="ml-2" />
                        </label>
                      </>
                    )}
                  />
                  {errors.imagesPracticingCertificate && (
                    <small className="mt-3 block text-sm text-red-500">
                      {errors.imagesPracticingCertificate.message}
                    </small>
                  )}
                </>
              )}
            </div>

            <div className="relative md:mb-4 md:w-1/3">
              <label
                htmlFor="hoten"
                className="left-[15px] mb-2 block bg-white px-1 text-lg md:text-sm"
              >
                Khoa <span className="text-red-500">*</span>
              </label>
              <SelectDepartment
                control={control}
                options={[
                  { value: true, label: "Nội khoa" },
                  { value: false, label: "Ngoại khoa" },
                ]}
                name="isInternal"
              />
            </div>
          </div>
        </div>
        {/* Line 4 */}
        <div className="my-4 flex gap-5">
          <div className="relative md:mb-4 md:w-1/3">
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
          <div className="relative md:mb-4 md:w-1/3">
            <InputCustom
              label={"Chứng chỉ hành nghề"}
              required
              className="col-span-1 sm:col-span-1"
              name="practicingCertificate"
              type="text"
              id="practicingCertificate"
              placeholder={"Nhập chứng chỉ hành nghề"}
              control={control}
              errors={errors}
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
              control={control}
              name="yearsExperience"
              errors={errors}
            />
          </div>
        </div>
        {/* Line 5 */}
        <div className="flex w-full gap-5">
          <div className="w-full gap-5 md:flex">
            <div className="relative md:mb-4 md:w-1/2">
              <InputCustom
                label={"Trình độ chuyên môn"}
                className="col-span-1 sm:col-span-1"
                required
                placeholder={"Nhập trình độ chuyên môn"}
                name="title"
                type="text"
                id="title"
                control={control}
                errors={errors}
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
                control={control}
                name="specialty"
                errors={errors}
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
                control={control}
                name="branchID"
                errors={errors}
                setValue={(value) =>
                  console.log("Giá trị branchID được chọn: ", value)
                }
              />
            </div>
          </div>
        </div>

        {/* Line 7 */}
        <div className="flex w-full gap-5">
          <div className="relative mb-3 w-full">
            <InputCustom
              label={"Địa chỉ"}
              required
              className="col-span-1 sm:col-span-1"
              name="address"
              type="text"
              id="address"
              placeholder={"Nhập địa chỉ"}
              control={control}
              errors={errors}
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
          <DoctorEditor name="detail" control={control} errors={errors} />
        </div>
        {/* Button */}
        <div className="mt-5 flex justify-end">
          <Button
            variant="custom"
            type="submit"
            disabled={isLoading || isPending}
          >
            {isLoading || isPending ? <SpinLoader /> : "Thêm mới"}
          </Button>
        </div>
      </form>
    </div>
  );
}
