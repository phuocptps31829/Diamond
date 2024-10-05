import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import SelectSpecialty from "./select/SelectSpecialty";
import { createService } from "@/services/servicesApi";
import { Textarea } from "@/components/ui/Textarea";

import { useMutation, useQueryClient } from "@tanstack/react-query";
import { serviceAdminSchema } from "@/zods/admin/serviceAdmin";
import ServiceEditor from "./editor";
import { toastUI } from "@/components/ui/Toastify";

const ServicesAdd = () => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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
      isHidden: false,
      image: null,
      content: "",
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImagePreview(URL.createObjectURL(file));
      setValue("image", file);
    } else {
      setImagePreview(null);
      setValue("image", null);
    }
  };
  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  const mutation = useMutation({
    mutationFn: (serviceData) => createService(serviceData),
    onSuccess: () => {
      queryClient.invalidateQueries("service");
      toastUI("Thêm dịch vụ thành công.", "success");
      reset();
      setImagePreview(null);
    },
    onError: (error) => {
      toastUI("Thêm dịch vụ thất bại.", "error");
      console.error("Error creating service:", error);
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

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="name"
              id="name"
              label="Tên dịch vụ:"
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
                onChange={handleSpecialtyChange}
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
              label="Giá:"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập giá"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="discountPrice"
              label="Giá giảm:"
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
                Hình ảnh :
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
                Trạng thái :
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
              Lưu dịch vụ
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ServicesAdd;
