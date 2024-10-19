import InputCustom from "@/components/ui/InputCustom";
import { specialtySchema } from "@/zods/specialty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Controller, useForm } from "react-hook-form";
import { specialtyApi } from "@/services/specialtiesApi";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";
import Loading from "@/components/ui/Loading";
export default function Form() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
  } = useForm({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: "",
      image: null,
      status: true,
    },
  });
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const { data, error, isLoading } = useQuery({
    queryKey: ["specialty", id],
    queryFn: () => specialtyApi.getSpecialtiesById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setValue("name", data.name);
      setValue("status", data.isHidden ? "Ẩn" : "Hiện");
      setImagePreview(
        `${import.meta.env.VITE_IMAGE_API_URL}/${data.image}`,
      );
    }
  }, [data, setValue]);

  const { mutate: updateSpecialty, isPending: isSubmitting } = useMutation({
    mutationFn: (newSpecialty) => specialtyApi.updateSpecialty(newSpecialty),
    onSuccess: () => {
      toastUI("Cập nhật chuyên khoa thành công", "success");
      navigate("/admin/specialties/list");
    },
    onError: (err) => {
      console.error("Update error: ", err);
      toastUI("Có lỗi xảy ra: " + err.message, "error");
    },
  });

  const onSubmit = async (data) => {
    try {
      if (!fileImage && !imagePreview) {
        toastUI('Vui lòng chọn ảnh!', 'error');
        return;
      }

      const newSpecialty = {
        updatedSpecialty: {
          name: data.name,
          isHidden: data.status,
          description: "Đâu có cần mô tả???",
        },
        id
      };

      if (!fileImage) {
        updateSpecialty(newSpecialty);
        return;
      }

      const formData = new FormData();
      formData.append('file', fileImage);

      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;

      newSpecialty.updatedSpecialty.image = imageUrl;
      updateSpecialty(newSpecialty);
    } catch (error) {
      console.error("Error during submission:", error);
      toastUI("Có lỗi xảy ra: " + error.message, "error");
    }
  };

  if (isLoading) return <Loading />;

  console.log(errors);
  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">Thông tin chuyên khoa</h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="grid-cols-1 gap-[60px] sm:grid md:flex mb-6">
          <div className="flex gap-3">
            <div className="mr-5">
              <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
                Ảnh đại diện <span className="text-red-500">*</span>
              </label>
              <ImagePreview
                imagePreview={
                  imagePreview && fileImage
                    ? imagePreview
                    : imagePreview && imagePreview
                }
                setFileImage={ setFileImage }
                setImagePreview={ setImagePreview }
              />
              { !imagePreview && (
                <p className="mt-3 text-center text-sm text-red-500">
                  Vui lòng chọn ảnh
                </p>
              ) }
            </div>
          </div>
          <div className="w-1/2 ">
            <div className="block">
              <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
                <label htmlFor="hoten" className="left-[15px] block bg-white px-1">
                  Tên chuyên khoa <span className="text-red-500">*</span>
                </label>
                <InputCustom
                  className="col-span-1 sm:col-span-1 w-4/5"
                  name="name"
                  type="text"
                  id="name"
                  placeholder="Nhập tên chuyên khoa"
                  control={ control }
                  errors={ errors }
                />
              </div>
              <div className="">
                <Label htmlFor="" className="mb-2 block text-sm font-medium leading-none text-black">
                  Trạng thái
                </Label>
                <Controller
                  name="status"
                  control={ control }
                  render={ ({ field }) => (
                    <RadioGroup
                      value={ field.value }
                      onValueChange={ (value) => field.onChange(value) }
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
                  ) }
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            size=""
            type="button"
            variant="primary"
            className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
            onClick={ () => navigate('/admin/specialties/list') }
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="border-none bg-primary-500 hover:bg-primary-600 px-6"
            disabled={ isSubmitting }
          >
            { isSubmitting ? (
              <>
                <SpinLoader />
              </>) : "Cập nhật chuyên khoa" }
          </Button>
        </div>
      </form>
    </div>
  );
}
