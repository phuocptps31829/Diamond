import InputCustom from "@/components/ui/InputCustom";
import { specialtySchema } from "@/zods/specialty";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState, useEffect } from "react";
import "react-quill/dist/quill.snow.css";
import { Button } from "@/components/ui/Button";
import { MdCloudUpload } from "react-icons/md";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Controller, useForm } from "react-hook-form";
import { specialtyApi } from "@/services/specialtiesApi";
import { useNavigate, useParams } from "react-router-dom";
import { useMutation, useQuery } from "@tanstack/react-query";
import { toastUI } from "@/components/ui/Toastify";
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
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploading, setUploading] = useState(false);
const { data, error, isLoading } = useQuery({
  queryKey: ["specialty", id],
  queryFn: () => specialtyApi.getSpecialtiesById(id),
  enabled: !!id,
});
useEffect(() => {
  if (data) {
    setValue("name", data.name);
    setValue("status", data.isHidden ? "Ẩn" : "Hiện");
    setSelectedFile(data.image);
    console.log("Fetched data x: ", data);
    console.log(" data id: ", data._id);
    console.log("Img", data.image);
    
  }
}, [data, setValue]);
const { mutate: updateSpecialty, isLoading: isSubmitting } = useMutation({
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
    let imageUrl = "";
    console.log("Selected file before upload: ", selectedFile);
    if (selectedFile) {
      setUploading(true);
      const imageResponse = await specialtyApi.uploadIMG(selectedFile);
      setUploading(false);
      imageUrl = imageResponse?.data; 
    } else {
      console.error("No file selected for upload.");
    }
    const newSpecialty = {
      image: imageUrl,
      updateSpecialty: {
        name: data.name,
        image: imageUrl,
        isHidden: data.status,
        description: "Description of the new specialty",
      },
      id: id,
    };
    await updateSpecialty(newSpecialty);
    console.log("Update Data:", newSpecialty);
  } catch (error) {
    console.error("Error during submission:", error);
    toastUI("Có lỗi xảy ra: " + error.message, "error");
  }
};
const handleFileChange = (event) => {
  const file = event.target.files[0];
  if (file) {
    console.log("Selected file:", file);
    setSelectedFile(file);
  }
};
  const renderImagePreview = () => {
    if (selectedFile && typeof selectedFile !== "string") {
      return (
        <img
          src={URL.createObjectURL(selectedFile)}
          alt="Image Preview"
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-3xl"
        />
      );
    }
    if (selectedFile) {
      return (
        <img
          src={selectedFile}
          alt="Current Image"
          className="flex h-full w-full cursor-pointer items-center justify-center rounded-3xl"
        />
      );
    }
    return <p>Không có ảnh để hiển thị</p>;
  };
  console.log(errors);
  return (
    <div className="w-[100%] rounded-lg bg-white px-7 py-6 shadow-gray">
      <h1 className="mb-4 mr-2 h-fit bg-white text-2xl font-bold">Sửa chuyên khoa</h1>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="grid-cols-1 gap-[60px] sm:grid md:flex mb-6">
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
                  control={control}
                  errors={errors}
                />
              </div>
              <div className="">
                <Label htmlFor="" className="mb-2 block text-sm font-medium leading-none text-black">
                  Trạng thái
                </Label>
                <Controller
                  name="status"
                  control={control}
                  render={({ field }) => (
                    <RadioGroup
                      value={field.value}
                      onValueChange={(value) => field.onChange(value)}
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
            </div>
          </div>

          <div className="flex gap-3">
            <div className="w-1/2">
              <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
                Ảnh mới<span className="text-red-500">*</span>
              </label>
              <div className="relative h-[250px] min-w-[250px] rounded-3xl border-2 border-dashed border-primary-500">
                <div className="absolute top-0 flex h-full w-full items-center justify-center rounded-3xl">
                  <label className="flex h-full w-full cursor-pointer items-center justify-center">
                    <div className="flex flex-col items-center justify-center">
                      <MdCloudUpload size={45} color="#007BBB" />
                      <p className="mt-2 text-sm">Chọn ảnh</p>
                    </div>
                    <input
                      type="file"
                      id="fileImage"
                      className="hidden"
                      onChange={handleFileChange}
                    />
                  </label>
                </div>
              </div>
            </div>

            <div className="w-1/2">
              <label htmlFor="fileImage" className="mb-4 block bg-white px-2">
                Ảnh hiện tại<span className="text-red-500">*</span>
              </label>
              <div className="relative h-[250px] min-w-[250px]">{renderImagePreview()}</div>
            </div>
          </div>
        </div>

        <div className="flex justify-end gap-2">
          <Button
            size=""
            type="button"
            variant="primary"
            className="border-none bg-gray-200 px-6 text-primary-500 hover:bg-gray-400"
            onClick={() => navigate('/admin/specialties/list')}
          >
            Hủy
          </Button>
          <Button
            type="submit"
            variant="primary"
            className="border-none bg-primary-500 hover:bg-primary-600 px-6"
            disabled={isSubmitting}
          >
            {isSubmitting ? "Đang xử lý..." : "Cập nhật"}
          </Button>
        </div>
      </form>
    </div>
  );
}
