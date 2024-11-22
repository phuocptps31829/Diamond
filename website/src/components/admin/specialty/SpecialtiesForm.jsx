import InputCustom from "@/components/ui/InputCustom";
import { specialtySchema } from "@/zods/specialty";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { specialtyApi } from "@/services/specialtiesApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import ImagePreview from "@/components/ui/ImagePreview";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";
export default function Form() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: "",
      image: null,
      isHidden: '',
    },
  });
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const queryClient = useQueryClient();

  const { mutate: createSpecialty, isPending } = useMutation({
    mutationFn: (newSpecialty) => specialtyApi.createSpecialty(newSpecialty),
    onSuccess: () => {
      toastUI("Thêm chuyên khoa thành công", "success");
      navigate('/admin/specialties/list');
      queryClient.invalidateQueries("branches");
    },
    onError: (err) => {
      console.error(err);
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
        name: data.name,
        isHidden: data.isHidden,
      };

      const formData = new FormData();
      formData.append('file', fileImage);

      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;

      newSpecialty.image = imageUrl;
      createSpecialty(newSpecialty);
    } catch (error) {
      console.error("Error during submission:", error);
      toastUI("Có lỗi xảy ra: " + error.message, "error");
    }
  };

  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 min-h-[calc(100vh-140px)]">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thông tin chuyên khoa
      </h1>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="grid-cols-1 gap-[60px] sm:grid md:flex mb-6">
          {/* Image */ }
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh <span className="text-red-500">*</span>
            </label>
            <ImagePreview
              imagePreview={
                imagePreview && fileImage
                  ? imagePreview
                  : imagePreview && import.meta.env.VITE_IMAGE_API_URL + '/' + imagePreview
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
          <div className="w-1/2">
            <div className="block">
              <div className="relative md:mb-1 xl:mb-[4px] 2xl:mb-3">
                <label htmlFor="hoten" className="left-[15px] block bg-white px-1 text-sm">
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
              {/* isHidden */ }
              <div className="mt-2">
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
                        <RadioGroupItem value={ true } id="r1" />
                        <Label htmlFor="r1">Ẩn</Label>
                      </div>
                      <div className="flex items-center space-x-2">
                        <RadioGroupItem value={ false } id="r2" />
                        <Label htmlFor="r2">Hiện</Label>
                      </div>
                    </RadioGroup>
                  ) }
                />
              </div>
            </div>
          </div>
        </div>

        {/* Button */ }
        <div className="flex justify-end gap-2">
          <Button
            size=""
            variant="primary"
            className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
          >
            Hủy
          </Button>
          <Button
            type="submit"
            size=""
            variant="primary"
            className="border-none bg-primary-500 px-6 hover:bg-primary-600"
            disabled={ isPending } // Disable nút khi đang upload
          >
            { isPending ? <SpinLoader /> : "Thêm chuyên khoa" }
          </Button>
        </div>
      </form>
    </div>
  );
}
