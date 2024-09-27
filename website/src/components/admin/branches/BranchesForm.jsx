import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
  getBranchesById,
  addBranch,
  updateBranch,
} from "@/services/branchesApi";
import axios from "axios";

import { Skeleton } from "@/components/ui/Skeleton";
import GoogleMapComponent from "./GoogleMapComponent";
import { useToast } from "@/hooks/useToast";
const clientId = import.meta.env.VITE_CLIENT_ID;
const BranchesForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const { id } = useParams();
  const queryClient = useQueryClient();
  const { toast } = useToast();
  console.log(imagePreview);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
    register,
  } = useForm({
    resolver: zodResolver(branchesAdminSchema),
    defaultValues: {
      branch_name: "",
      working_hours: "",
      hotline: "",
      address: "",
    },
  });
  console.log(errors);

  const { data, error, isLoading } = useQuery({
    queryKey: ["branches", id],
    queryFn: () => getBranchesById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      console.log("Fetched data: ", data);
      setValue("branch_name", data.name);
      setValue("working_hours", data.workingTime);
      setValue("hotline", data.hotline);
      setValue("address", data.address);
      setImagePreview(data.imagesURL[0]);
      setAddress({
        formatted_address: data.address,
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
      });
    }
  }, [data, setValue]);

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (file) {
      const formData = new FormData();
      formData.append("image", file);

      try {
        const response = await axios.post(
          `https://api.imgbb.com/1/upload?key=${clientId}`,
          formData,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          },
        );
        const imageUrl = response.data.data.url;
        setImagePreview(imageUrl);
        setValue("image", imageUrl);
      } catch (error) {
        console.error("Error uploading image:", error);
      }
    } else {
      setImagePreview(null);
      setValue("image", "");
    }
  };

  const mutation = useMutation({
    mutationFn: (newsData) =>
      id ? updateBranch(id, newsData) : addBranch(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toast({
        variant: "success",
        title: id
          ? "Cập nhật chi nhánh thành công"
          : "Thêm chi nhánh thành công",
        description: id
          ? "Chi nhánh đã được cập nhật thành công"
          : "Chi nhánh đã được thêm vào hệ thống",
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: id ? "Cập nhật chi nhánh thất bại" : "Thêm chi nhánh thất bại",
        description: "Đã xảy ra lỗi khi thêm/ cập nhật chi nhánh",
      });
      console.error("Error creating/updating branch:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit called with data:", data);
    const newsData = {
      name: data.branch_name,
      image: [imagePreview] || null,
      address: address.name,
      workingTime: data.working_hours,
      hotline: data.hotline,
      coordinates: {
        Lat: address ? address.lat : null,
        Ing: address ? address.lng : null,
      },
    };
    mutation.mutate(newsData);
    console.log("====================================");
    console.log(newsData);
    console.log("====================================");
  };
  useEffect(() => {
    if (!id) {
      reset({
        branch_name: "",
        working_hours: "",
        hotline: "",
        address: "",
      });
      setAddress({});
      setImagePreview(null);
    }
  }, [id, reset]);

  if (isLoading) {
    return (
      <div className="w-full">
        <h1 className="mb-3 text-2xl font-bold">
          <Skeleton className="h-8 w-1/2" />
        </h1>
        <div className="rounded-xl bg-white px-6 py-6">
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="mb-4 h-10 w-full" />
          <Skeleton className="mb-4 h-10 w-full" />
        </div>
      </div>
    );
  }

  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl font-bold">
        {id ? "Chỉnh sửa chi nhánh" : "Thêm chi nhánh"}
      </h1>
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
                type="file"
                required={!id}
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
              {id ? "Cập nhật chi nhánh" : "Lưu chi nhánh"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchesForm;
