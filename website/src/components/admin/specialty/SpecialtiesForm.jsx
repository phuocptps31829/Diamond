import InputCustom from "@/components/ui/InputCustom";
import { specialtySchema } from "@/zods/specialty";
import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { MdCloudUpload } from "react-icons/md";
import { specialtyApi } from "@/services/specialtiesApi";
import { useMutation } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
import { useNavigate } from "react-router-dom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
export default function Form() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register,
  } = useForm({
    resolver: zodResolver(specialtySchema),
    defaultValues: {
      name: "",
      image: null,
      status: true,
    },
  });
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
  const handleFileChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      setSelectedFile(file);
      setPreviewImage(URL.createObjectURL(file));
      setValue("image", file);
      setFileName(file.name);
    }
  };
  const [fileName, setFileName] = useState(""); 
  const removeImage = () => {
    setSelectedFile(null);
    setPreviewImage(null);
    setValue("image", null); 
  };
  const [previewImage, setPreviewImage] = useState(null);
  const { mutate: createSpecialty } = useMutation({
    mutationFn: (newSpecialty) => specialtyApi.createSpecialty(newSpecialty),
    onSuccess: () => {
      toastUI("Thêm chuyên khoa mới thành công", "success");
      navigate('/admin/specialties/list');
    },
    onError: (err) => {
      console.error(err);
      toastUI("Có lỗi xảy ra: " + err.message, "error");
    },
  });
  const onSubmit = async (data) => {
    let imageUrl = "";
    if (selectedFile) {
      setUploading(true);
      const imageResponse = await specialtyApi.uploadIMG(selectedFile);
      setUploading(false);
      imageUrl = imageResponse?.data; 
    }
    const specialtyData = {
      name: data.name,
      image: imageUrl,
      isHidden: data.status,
      description: "Description of the new specialty",
    };
    createSpecialty(specialtyData);
    console.log("Submit DATA: ", specialtyData);
  };
  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">
        Thêm chuyên khoa
      </h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-cols-1 gap-[60px] sm:grid md:flex mb-6">
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
                  control={control}
                  errors={errors}
                />
              </div>
              {/* Status */}
              <div className="mt-2">
              <Label>Trạng thái</Label>
              <Controller
                name="status"
                control={control}
                render={({ field }) => (
                  <RadioGroup
                    value={field.value}
                    onValueChange={field.onChange}
                    className="mt-5 flex items-center justify-start gap-5"
                  >
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={true} id="r1" />
                      <Label htmlFor="r1">Ẩn</Label>
                    </div>
                    <div className="flex items-center space-x-2">
                      <RadioGroupItem value={false} id="r2" />
                      <Label htmlFor="r2">Hiện</Label>
                    </div>
                  </RadioGroup>
                )}
              />
              </div>
            </div>
          </div>
          {/* Image */}
          <div className="mr-5">
            <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
              Ảnh <span className="text-red-500">*</span>
            </label>
            <div className="relative h-[250px] min-w-[250px] rounded-3xl border-2 border-dashed border-primary-500">
              {previewImage ? (
                <div className="relative h-full w-full">
                  <img
                    src={previewImage}
                    alt="Ảnh đã chọn"
                    className="h-full w-full rounded-3xl object-cover"
                  />
                  <button
                    type="button"
                    className="absolute p-2 top-4 right-4 rounded-sm bg-red-500 text-white hover:bg-red-600"
                    onClick={removeImage}
                  >
                    ✕
                  </button>
                </div>
              ) : (
                <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                  <label className="flex h-full w-full cursor-pointer items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <MdCloudUpload size={45} color="#007BBB" />
                      <p className="mt-2 text-sm">Chọn ảnh</p>
                    </div>
                    <input
                      name="image"
                      type="file"
                      id="fileImage"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              )}
            </div>
          </div>
        </div>

        {/* Button */}
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
            disabled={uploading} // Disable nút khi đang upload
          >
            {uploading ? "Đang tải..." : "Thêm chuyên khoa"}
          </Button>
        </div>
      </form>
    </div>
  );
}
