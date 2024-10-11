import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { addBranch } from "@/services/branchesApi";
import { useToast } from "@/hooks/useToast";
import GoogleMapComponent from "./GoogleMapComponent";
import { toastUI } from "@/components/ui/Toastify";

const BranchesAdd = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const [image, setImage] = useState(null);
  const { toast } = useToast();
  const queryClient = useQueryClient();
console.log(address);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register,
    reset,
  } = useForm({
    resolver: zodResolver(branchesAdminSchema),
    defaultValues: {
      branch_name: "",
      working_hours: "",
      hotline: "",
      address: "",
    },
  });

  const mutation = useMutation({
    mutationFn: (newsData) => addBranch(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toastUI(
        "Thêm chi nhánh thành công.",
        "success",
      );
      reset();
      setImagePreview(null);
      setAddress(null);
    },
    onError: (error) => {
      toastUI(
        "Thêm chi nhánh thất bại.",
        "error",
      );
      console.error("Error creating branch:", error);
    },
  });

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      setImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
      setValue("image", imageUrl);
    } else {
      setImagePreview(null);
      setValue("image", "");
    }
  };
  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("name", data.branch_name);
    formData.append("image", image);
    formData.append("address", address?.name || null);
    formData.append("workingTime", data.working_hours);
    formData.append("hotline", data.hotline);

    const coordinates = {
      Lat: address ? address.lat : null,
      Ing: address ? address.lng : null,
    };
    formData.append("coordinates", JSON.stringify(coordinates));

    for (let [key, value] of formData.entries()) {
      console.log(`${key}: ${value}`);
    }

    mutation.mutate(formData);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2">
            <InputCustom
              id="branch_name"
              type="text"
              name="branch_name"
              label="Tên chi nhánh"
              placeholder="Nhập tên chi nhánh"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="working_hours"
              name="working_hours"
              label="Giờ làm việc"
              type="text"
              placeholder="Nhập thời gian làm việc"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="hotline"
              type="text"
              name="hotline"
              label="Hotline"
              placeholder="Nhập hotline"
              control={control}
              errors={errors}
            />

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
                required={!imagePreview}
                type="file"
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="sm:col-span-2">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-auto w-full max-w-[300px] rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="sm:col-span-2">
            <Label
              htmlFor="address"
              className="mb-2 block text-sm font-medium text-black"
            >
              Địa chỉ
            </Label>
            <GoogleMapComponent
              setAddress={setAddress}
              register={register}
              errors={errors}
              coordinates={address}
            />
          </div>

          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit">
              Lưu chi nhánh
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchesAdd;
