import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useEffect, useState } from "react";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";
import { useParams } from "react-router-dom";
import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import { branchApi } from "@/services/branchesApi";

import GoogleMapComponent from "./GoogleMapComponent";
import { Skeleton } from "@/components/ui/Skeleton";
import { toastUI } from "@/components/ui/Toastify";
import NotFound from "@/components/ui/NotFound";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import SpinLoader from "@/components/ui/SpinLoader";

const BranchesEdit = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const { id } = useParams();
  const [isPending, setIsPending] = useState(false);
  const queryClient = useQueryClient();
  console.log(address,'dhsjh');
  
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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

  const { data, error, isLoading } = useQuery({
    queryKey: ["branches", id],
    queryFn: () => branchApi.getBranchesById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setValue("branch_name", data.name);
      setValue("working_hours", data.workingTime);
      setValue("hotline", data.hotline);
      setValue("address", data.address);
      setImagePreview(
        `${import.meta.env.VITE_IMAGE_API_URL}/${data.imagesURL[0]}`
      );
      setAddress({
        formatted_address: data.address,
        lat: data.coordinates.lat,
        lng: data.coordinates.lng,
      });
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: (newsData) => branchApi.updateBranch(id, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("branches", id);
      toastUI("Chỉnh sửa chi nhánh thành công.", "success");
    },
    onError: (error) => {
      toastUI("Chỉnh sửa chi nhánh thành công.", "error");
      console.error("Error updating branch:", error);
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
          }
        );

        imageName = response.data.data;
      } catch (error) {
        toastUI("Lỗi hình ảnh vui lòng thử lại.", "error");
        console.error("Error uploading image:", error);
        return;
      } finally {
        setIsPending(false);
      }
    } else {
      imageName = imagePreview.split("/").pop();
    }

    
    const branchData = {
      name: data.branch_name,
      imagesURL: [imageName],
      address: address?.name || data.address,
      workingTime: data.working_hours,
      hotline: data.hotline,
      coordinates: {
        lat: address ? address.lat : null,
        lng: address ? address.lng : null,
      },
    };


    mutation.mutate(branchData);
  };
  if (isLoading) {
    return <Skeleton />;
  }
  if (error) return <NotFound message={error.message} />;

  return (
    <div className="w-full">
      <div className="min-h-[calc(100vh-140px)] rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Chỉnh sửa chi nhánh
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-3 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-2">
              <ImagePreview
                imagePreview={imagePreview}
                setFileImage={setFileImage}
                setImagePreview={setImagePreview}
              />
              {!fileImage ||
                (!imagePreview && (
                  <p className="mt-3 text-center text-sm text-red-500">
                    Vui lòng chọn ảnh
                  </p>
                ))}
            </div>
            <div className="w-full">
              <div className="grid grid-cols-1 items-center justify-center gap-5">
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
                  id="hotline"
                  type="text"
                  name="hotline"
                  label="Hotline"
                  placeholder="Nhập hotline"
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
              </div>
            </div>
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
            <Button
              type="submit"
              disabled={isPending || mutation.isPending}
              variant="custom"
            >
              {isPending || mutation.isPending ? (
                <>
                  <SpinLoader />
                </>
              ) : (
                "Cập nhật"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchesEdit;
