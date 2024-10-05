import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import SelectSpecialty from "./select/SelectSpecialty";
import { useParams } from "react-router-dom";
import { getServiceById, updateService } from "@/services/servicesApi";
import { Textarea } from "@/components/ui/Textarea";

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { serviceAdminSchema } from "@/zods/admin/serviceAdmin";
import ServiceEditor from "./editor";
import { Skeleton } from "@/components/ui/Skeleton";
import { toastUI } from "@/components/ui/Toastify";

const ServicesEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);

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
      image: null,
      content: "",
      duration: "",
    },
  });

  const { data, isLoading } = useQuery({
    queryKey: ["service", id],
    queryFn: () => getServiceById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("specialtyID", data.specialtyID);
      setValue("price", data.price);
      setValue("discountPrice", data.discountPrice);
      setValue("shortDescription", data.shortDescription);
      setValue("content", data.details);
      setValue("isHidden", data.isHidden);
      setValue("duration", data.duration);
      setValue("image", data.image);
      setImagePreview(data.image);
    }
  }, [data, setValue]);

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    } else {
      setImagePreview(null);
      setValue("image", null);
    }
  };

  const mutation = useMutation({
    mutationFn: (serviceData) => updateService(id, serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries("service");
      toastUI("Chỉnh sửa dịch vụ thành công.", "success");
    },
    onError: (error) => {
      toastUI("Chỉnh sửa dịch vụ thất bại.", "error");
      console.error("Error updating service:", error);
    },
  });

  const onSubmit = (data) => {
    const serviceData = {
      specialtyID: data.specialtyID,
      name: data.name,
      price: Number(data.price),
      discountPrice: Number(data.discountPrice),
      shortDescription: data.shortDescription,
      content: data.content,
      image: data.image,
      duration: Number(data.duration),
      isHidden: data.isHidden,
    };
    mutation.mutate(serviceData);
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
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="name"
              id="name"
              label="Tên dịch vụ"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tên dịch vụ"
            />
            <div className="">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
                Chuyên khoa:
              </Label>
              <SelectSpecialty
                name="specialtyID"
                control={control}
                errors={errors}
              />
            </div>
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="duration"
              label="Thời lượng khám (phút):"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập thời lượng khám (phút)"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="price"
              label="Giá"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập giá"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="discountPrice"
              label="Giá giảm"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập giá giảm"
            />
            <div className="grid w-full gap-1.5">
              <Label htmlFor="shortDescription">Nhập mô tả ngắn:</Label>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Nhập mô tả."
                    id="shortDescription"
                    {...field}
                  />
                )}
              />
              {errors.shortDescription && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
            <div className="">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
                Hình ảnh
              </Label>
              <Input
                className="col-span-1 h-11 py-3 shadow-none sm:col-span-1"
                name="image"
                label="Hình ảnh"
                type="file"
                required={!imagePreview}
                onChange={handleImageChange}
              />
            </div>

            <div className=" ">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
                Trạng thái
              </Label>
              <Controller
                name="isHidden"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value ? "Ẩn" : "Hiện"}
                    onValueChange={(value) => field.onChange(value === "Ẩn")}
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Ẩn" id="r1" />
                      <Label htmlFor="r1">Ẩn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value="Hiện" id="r2" />
                      <Label htmlFor="r2">Hiện</Label>
                    </div>
                  </RadioGroup>
                )}
              />
            </div>

            {imagePreview && (
              <div className="">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-auto max-w-[300px] rounded-md object-cover"
                />
              </div>
            )}
          </div>
          <ServiceEditor control={control} name="content" errors={errors} />
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit">
              Cập nhật dịch vụ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesEdit;
