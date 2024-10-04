import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { newsAdminSchema } from "@/zods/admin/newsAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { createNews } from "@/services/newsApi";
import { toastUI } from "@/components/ui/Toastify";

const NewsAdd = () => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);
  const fileInputRef = useRef(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(newsAdminSchema),
    defaultValues: {
      title: "",
      category: "",
      author: "",
      status: "Ẩn",
      content: "",
    },
  });

  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

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

  const mutation = useMutation({
    mutationFn: (newsData) => createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("news");
      toastUI("Đã thêm thành công tin tức!", "success");
      reset();
      setImagePreview(null);
      setImage(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
    },
    onError: (error) => {
      toastUI(
        "Đã xảy ra lỗi khi thêm tin tức, vui lòng thử lại.",
        "error",
      );
      console.error("Error creating news:", error);
    },
  });

  const onSubmit = (data) => {
    const formData = new FormData();
    formData.append("specialtyID", data.category);
    formData.append("title", data.title);
    formData.append("file", image);
    formData.append("content", data.content);
    formData.append("author", data.author);
    formData.append("viewCount", 0);
    formData.append("isHidden", data.status === "Ẩn");

    mutation.mutate(formData);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2">
            {/* Form inputs */}
            <InputCustom
              name="title"
              label="Tiêu đề:"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tiêu đề"
            />
            <div className="">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
                Chuyên khoa:
              </Label>
              <SelectSpecialty
                name="category"
                control={control}
                errors={errors}
                onChange={handleSpecialtyChange}
              />
            </div>

            <InputCustom
              name="author"
              label="Tác giả:"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tác giả"
            />

            <div>
              <Label>Hình ảnh:</Label>
              <Input
                className="p-1"
                type="file"
                required={!imagePreview}
                onChange={handleImageChange}
                ref={fileInputRef}
              />
            </div>

            <div>
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
              <img src={imagePreview} alt="Preview" className="max-w-[300px]" />
            )}
          </div>

          <NewsEditor control={control} name="content" errors={errors} />
          <div className="mt-10 w-full text-end">
            <Button type="submit" variant="custom">
              Lưu tin tức
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsAdd;
