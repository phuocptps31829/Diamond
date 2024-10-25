import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { branchApi } from "@/services/branchesApi";
import GoogleMapComponent from "./GoogleMapComponent";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";
import { useNavigate } from "react-router-dom";
import SpinLoader from "@/components/ui/SpinLoader";
const BranchesAdd = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const [address, setAddress] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isPending, setIsPending] = useState(false); 

  const queryClient = useQueryClient();
  const navigate = useNavigate();

  console.log(address);

  const {
    handleSubmit,
    formState: { errors },
    control,
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
    mutationFn: (newsData) => branchApi.addBranch(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("branches");
      toastUI("Thêm chi nhánh thành công.", "success");
      reset();
      setImagePreview(null);
      setAddress(null);
      navigate("/admin/branches/list");
    },
    onError: (error) => {
      toastUI("Thêm chi nhánh thất bại.", "error");
      console.error("Error creating branch:", error);
    },
  });

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }

    const formData = new FormData();
    formData.append("file", fileImage);
    setIsPending(true); 

    try {
      const response = await axiosInstanceCUD.post("/images/upload", formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      });

      console.log(response.data.data);
      const imageName = response.data.data;

      const branchData = {
        name: data.branch_name,
        imagesURL: [imageName],
        address: address?.name || null,
        workingTime: data.working_hours,
        hotline: data.hotline,
        coordinates: {
          lat: address ? address.lat : null,
          lng: address ? address.lng : null,
        },
      };

      console.log(branchData);

      mutation.mutate(branchData);
    } catch (error) {
      toastUI("Lỗi hình ảnh vui lòng thử lại.", "error");
      console.error("Error uploading image:", error);
    }
    finally{
      setIsPending(false)
    }
  };
  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
      <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thêm chi nhánh
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-2 grid-cols-1 gap-[10px] sm:grid md:flex">
            <div className="mr-2">
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
              <div className="grid grid-cols-1 items-center justify-center gap-5">
                <InputCustom
                  id="branch_name"
                  type="text"
                  name="branch_name"
                  label="Tên chi nhánh:"
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
                />{" "}
                <InputCustom
                  id="working_hours"
                  name="working_hours"
                  label="Giờ làm việc (VD: Sáng: 8:00 - 12:00, Chiều: 13:00 - 17:00):"
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
            <Button type="submit"      disabled={isPending || mutation.isPending} variant="custom">
              {isPending || mutation.isPending ? (
                <>
                                   <SpinLoader />

                </>
              ) : (
                "Thêm chi nhánh"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchesAdd;
