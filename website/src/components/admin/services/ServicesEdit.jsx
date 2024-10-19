import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import SelectSpecialty from "./select/SelectSpecialty";
import { useParams } from "react-router-dom";
import { serviceApi } from "@/services/servicesApi";
import { Textarea } from "@/components/ui/Textarea";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceAdminSchema } from "@/zods/admin/serviceAdmin";
import ServiceEditor from "./editor";
import { Skeleton } from "@/components/ui/Skeleton";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import SpinLoader from "@/components/ui/SpinLoader";

const ServicesEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [initialData, setInitialData] = useState(null);
  const [isPending, setIsPending] = useState(false);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(serviceAdminSchema),
    defaultValues: {
      name: "",
      specialtyID: "",
      price: "",
      discountPrice: "",
      shortDescription: "",
      isHidden: false,
      content: "",
      duration: "",
      gender: "0",
      isFamily: true,
      maxAge: 0,
      minAge: 0,
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => serviceApi.getServiceById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      const initialFormData = {
        name: data.name,
        specialtyID: data.specialtyID,
        content: data.details,
        duration: Number(data.duration),
        price: data.price,
        discountPrice: data.discountPrice,
        shortDescription: data.shortDescription,
        gender: data.applicableObject.gender,
        isFamily: data.applicableObject.isFamily,
        isHidden: data.isHidden,
        minAge: data.applicableObject.age.min,
        maxAge: data.applicableObject.age.max,
      };
      setInitialData(initialFormData);
      setValue("name", data.name);
      setValue("specialtyID", data.specialtyID);
      setValue("price", data.price);
      setValue("discountPrice", data.discountPrice);
      setValue("shortDescription", data.shortDescription);
      setValue("content", data.details);
      setValue("isHidden", data.isHidden);
      setValue("duration", data.duration);
      setValue("isFamily", data.applicableObject.isFamily);
      setValue("minAge", data.applicableObject.age.min);
      setValue("maxAge", data.applicableObject.age.max);
      setValue("gender", data.applicableObject.gender);
      setImagePreview(`${import.meta.env.VITE_IMAGE_API_URL}/${data.image}`);
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: (serviceData) => serviceApi.updateService(id, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries("service");
      toastUI("Chỉnh sửa dịch vụ thành công.", "success");
    },
    onError: (error) => {
      toastUI("Chỉnh sửa dịch vụ thất bại.", "error");
      console.error("Error updating service:", error);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }
    console.log(JSON.stringify(data));
    console.log(JSON.stringify(initialData));

    if (JSON.stringify(data) === JSON.stringify(initialData)) {
      toastUI("Không có thay đổi nào được thực hiện.", "warning");
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
    } else {
      imageName = imagePreview.split("/").pop();
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
    console.log(JSON.stringify(serviceData));

    mutation.mutate(serviceData);
  };
  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  if (isLoading) {
    return (
      <div className="w-full">
        <h1 className="mb-3 text-2xl">
          <Skeleton className="h-8 w-1/2" />
        </h1>
        <Skeleton className="mb-4 h-10 w-full" />
      </div>
    );
  }

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-3 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-5">
              <ImagePreview
                imagePreview={ imagePreview }
                setFileImage={ setFileImage }
                setImagePreview={ setImagePreview }
              />
              { !fileImage ||
                (!imagePreview && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    Vui lòng chọn ảnh
                  </p>
                )) }
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
                "Cập nhật dịch vụ"
              ) }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesEdit;