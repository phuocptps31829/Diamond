import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import { Input } from "@/components/ui/Input";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { newsAdminSchema } from "@/zods/admin/newsAdmin";
import { useParams } from "react-router-dom";
import { getNewsById, updateNews } from "@/services/newsApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
import { toastUI } from "@/components/ui/Toastify";

const NewsEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState(null);
  const [image, setImage] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
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

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      setValue("title", data.title);
      setValue("category", data.specialtyID);
      setValue("author", data.author);
      setValue("status", data.isHidden ? "Ẩn" : "Hiện");
      setValue("content", data.content);
      setImagePreview(data.image);
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: (newsData) => updateNews(id, newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("news");
      toastUI("Đã chỉnh sửa thành công tin tức!", "success");
    },
    onError: (error) => {
      toastUI(
        "Đã xảy ra lỗi khi chỉnh sửa tin tức, vui lòng thử lại.",
        "error",
      );
      console.error("Error updating news:", error);
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
    formData.append("specialtyID", data.category);
    formData.append("title", data.title);
    formData.append("image", image || imagePreview);
    formData.append("content", data.content);
    formData.append("author", data.author);
    formData.append("viewCount", 0);
    formData.append("isHidden", data.status === "Ẩn");

    mutation.mutate(formData);
  };

  if (isLoading) {
    return <Skeleton />;
  }

  if (error) {
    return <NotFound />;
  }

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2">
            {/* Form inputs */}
            <InputCustom
              name="title"
              label="Tiêu đề"
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
              />
            </div>

            <InputCustom
              name="author"
              label="Tác giả"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tác giả"
            />

            <div>
              <Label>Hình ảnh</Label>
              <Input
                type="file"
                required={!imagePreview}
                onChange={handleImageChange}
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
              Cập nhật tin tức
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsEdit;
