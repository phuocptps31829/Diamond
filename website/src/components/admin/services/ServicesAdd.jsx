import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import SelectSpecialty from "./select/SelectSpecialty";
import { serviceApi } from "@/services/servicesApi";
import { Textarea } from "@/components/ui/Textarea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceAdminSchema } from "@/zods/admin/serviceAdmin";
import ServiceEditor from "./editor";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { useNavigate } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";

const ServicesAdd = () => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const navigate = useNavigate();
  const [isPending, setIsPending] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(serviceAdminSchema),
    defaultValues: {
      name: "",
      specialtyID: "",
      price: "",
      duration: "",
      discountPrice: "",
      shortDescription: "",
      isHidden: true,
      gender: "0",
      isFamily: true,
      content: "",
      maxAge: 0,
      minAge: 0,
    },
  });
  console.log(errors);

  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  const mutation = useMutation({
    mutationFn: (serviceData) => serviceApi.createService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries("service");
      toastUI("Thêm dịch vụ thành công.", "success");
      reset();
      setImagePreview(null);

      navigate("/admin/services/list");
    },
    onError: (error) => {
      toastUI("Thêm dịch vụ thất bại.", "error");
      console.error("Error creating service:", error);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }
    let imageName = null;

    if (fileImage) {
      const formData = new FormData();
      formData.append("file", fileImage);
      setIsPending(true);

      try {
        const response = await axiosInstanceCUD.post(
          "/images/upload",
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );

        imageName = response.data.data;
      } catch (error) {
        toastUI("Lỗi hình ảnh vui lòng thử lại.", "error");
        console.error("Error uploading image:", error);
      } finally {
        setIsPending(false);
      }
    }

    const serviceData = {
      specialtyID: data.specialtyID,
      name: data.name,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice),
      shortDescription: data.shortDescription,
      details: data.content,
      image: imageName,
      duration: Number(data.duration),
      isHidden: data.isHidden,
      applicableObject: {
        gender: data.gender,
        age: {
          min: Number(data.minAge),
          max: Number(data.maxAge),
        },
        isFamily: data.isFamily,
      },
    };
    console.log(serviceData);

    mutation.mutate(serviceData);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
      <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thêm dịch vụ
        </h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-3 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-2">
              <ImagePreview
                imagePreview={ imagePreview }
                setFileImage={ setFileImage }
                setImagePreview={ setImagePreview }
              />
              { !fileImage && (
                <p className="mt-3 text-center text-sm text-red-500">
                  Vui lòng chọn ảnh
                </p>
              ) }
              <div className="mt-7 w-full">
                <InputCustom
                  className="w-full"
                  name="duration"
                  label="Thời lượng khám (phút):"
                  type="number"
                  control={ control }
                  errors={ errors }
                  placeholder="Nhập thời lượng khám (phút)"
                />
              </div>
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 gap-x-5 gap-y-3 sm:grid-cols-2">
                <div className="w-full">
                  <InputCustom
                    className="w-full"
                    name="name"
                    id="name"
                    label="Tên dịch vụ:"
                    type="text"
                    control={ control }
                    errors={ errors }
                    placeholder="Nhập tên dịch vụ"
                  />
                </div>
                <div className="w-full">
                  <Label
                    htmlFor="specialtyID"
                    className="mb-2 block text-sm font-medium leading-none text-gray-700"
                  >
                    Chuyên khoa:
                  </Label>
                  <SelectSpecialty
                    name="specialtyID"
                    control={ control }
                    errors={ errors }
                    onChange={ handleSpecialtyChange }
                  />
                </div>

                <div className="w-full">
                  <InputCustom
                    className="w-full"
                    name="price"
                    label="Giá:"
                    type="number"
                    control={ control }
                    errors={ errors }
                    placeholder="Nhập giá"
                  />
                </div>
                <div className="w-full">
                  <InputCustom
                    className="w-full"
                    name="discountPrice"
                    label="Giá giảm:"
                    type="number"
                    control={ control }
                    errors={ errors }
                    placeholder="Nhập giá giảm"
                  />
                </div>
                <div className="w-full">
                  <InputCustom
                    className="w-full"
                    name="minAge"
                    label="Tuổi tối thiểu:"
                    type="number"
                    control={ control }
                    errors={ errors }
                    min={ 0 }
                    placeholder="Nhập tuổi tối thiểu"
                  />
                </div>
                <div className="w-full">
                  <InputCustom
                    className="w-full"
                    name="maxAge"
                    label="Tuổi tối đa:"
                    type="number"
                    control={ control }
                    errors={ errors }
                    min={ 0 }
                    placeholder="Nhập tuổi tối đa"
                  />
                </div>
              </div>
              <div className="mt-5 w-full">
                <Label
                  htmlFor="shortDescription"
                  className="mb-2 block text-sm font-medium leading-none text-gray-700"
                >
                  Nhập mô tả ngắn:
                </Label>
                <Controller
                  name="shortDescription"
                  control={ control }
                  render={ ({ field }) => (
                    <Textarea
                      placeholder="Nhập mô tả."
                      id="shortDescription"
                      className="w-full rounded-md border p-2"
                      { ...field }
                    />
                  ) }
                />
                { errors.shortDescription && (
                  <p className="mt-1 text-sm text-red-500">
                    { errors.shortDescription.message }
                  </p>
                ) }
              </div>
            </div>
          </div>
          <div className="mb-3 flex w-full justify-around gap-2 py-1">
            <div className="w-full px-5">
              <Label>Giới tính</Label>
              <Controller
                name="gender"
                control={ control }
                render={ ({ field }) => (
                  <RadioGroup
                    value={ field.value }
                    onValueChange={ field.onChange }
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Nam" id="gender_male" />
                      <Label htmlFor="gender_male">Nam</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Nữ" id="gender_female" />
                      <Label htmlFor="gender_female">Nữ</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="0" id="gender_all" />
                      <Label htmlFor="gender_all">Tất cả</Label>
                    </div>
                  </RadioGroup>
                ) }
              />
            </div>
            <div className="w-full border-l-2 border-r-2 border-dashed border-primary-500 px-5">
              <Label>Gia đình</Label>
              <Controller
                name="isFamily"
                control={ control }
                render={ ({ field }) => (
                  <RadioGroup
                    value={ field.value }
                    onValueChange={ field.onChange }
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ true } id="family_yes" />
                      <Label htmlFor="family_yes">Có</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ false } id="family_no" />
                      <Label htmlFor="family_no">Không</Label>
                    </div>
                  </RadioGroup>
                ) }
              />
            </div>
            <div className="w-full px-5">
              <Label>Trạng thái</Label>
              <Controller
                name="isHidden"
                control={ control }
                render={ ({ field }) => (
                  <RadioGroup
                    value={ field.value }
                    onValueChange={ field.onChange }
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ true } id="hidden_yes" />
                      <Label htmlFor="hidden_yes">Ẩn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={ false } id="hidden_no" />
                      <Label htmlFor="hidden_no">Hiện</Label>
                    </div>
                  </RadioGroup>
                ) }
              />
            </div>
          </div>

          <ServiceEditor control={ control } name="content" errors={ errors } />
          <div className="mt-10 w-full text-end">
            <Button
              type="submit"
              disabled={ isPending || mutation.isPending }
              variant="custom"
            >
              { isPending || mutation.isPending ? (
                <>
                  <SpinLoader />
                </>
              ) : (
                "Thêm dịch vụ"
              ) }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesAdd;