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
import { getNewsById, createNews, updateNews } from "@/services/newsApi";
import { Textarea } from "@/components/ui/Textarea";
import axios from "axios";
import { Skeleton } from "@/components/ui/Skeleton";
import { useToast } from "@/hooks/useToast";
import { ToastAction } from "@radix-ui/react-toast";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
const clientId = import.meta.env.VITE_CLIENT_ID;

const NewsForm = () => {
  const { id } = useParams();
  const { toast } = useToast();
  const queryClient = useQueryClient();

  const [imagePreview, setImagePreview] = useState(null);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
    setValue,
  } = useForm({
    resolver: zodResolver(newsAdminSchema),
    defaultValues: {
      title: "",
      category: "",
      author: "",
      status: "Ẩn",
      content: "",
      shortDescription: "",
    },
  });

  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  const { data, error, isLoading } = useQuery({
    queryKey: ["news", id],
    queryFn: () => getNewsById(id),
    enabled: !!id,
  });
  console.log(errors);
  useEffect(() => {
    if (data) {
      console.log("Fetched data: ", data);
      setValue("title", data.title);
      setValue("category", data.specialtyID);
      setValue("author", data.author);
      setValue("shortDescription", data.shortDescription);
      setValue("status", data.isHidden ? "Ẩn" : "Hiện");
      setValue("content", data.content);
      setImagePreview(data.image);
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
      id ? updateNews(id, newsData) : createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("news");
      toast({
        variant: "success",
        title: id
          ? "Đã cập nhật thành công tin tức!"
          : "Đã thêm thành công tin tức!",
        description: id
          ? "Tin tức đã được cập nhật, vui lòng kiểm tra danh sách."
          : "Tin tức đã được thêm, vui lòng kiểm tra danh sách.",
        action: <ToastAction altText="Đóng">Đóng</ToastAction>,
      });
    },
    onError: (error) => {
      toast({
        variant: "error",
        title: id ? "Lỗi cập nhật tin tức!" : "Lỗi thêm tin tức!",
        description: id
          ? "Đã xảy ra lỗi khi cập nhật tin tức, vui lòng thử lại."
          : "Đã xảy ra lỗi khi thêm tin tức, vui lòng thử lại.",
      });
      console.error("Error creating/updating news:", error);
    },
  });

  const onSubmit = (data) => {
    console.log("onSubmit called with data:", data);
    const newsData = {
      specialtyID: data.category,
      title: data.title,
      shortDescription: data.shortDescription,
      image: data.image,
      content: data.content,
      author: data.author,
      viewCount: 0,
      isHidden: data.status === "Ẩn",
    };
    mutation.mutate(newsData);
    console.log("====================================");
    console.log(newsData);
    console.log("====================================");
  };

  useEffect(() => {
    if (!id) {
      reset({
        title: "",
        category: "",
        author: "",
        status: "Ẩn",
        content: "",
        shortDescription: "",
      });
      setImagePreview(null);
    }
  }, [id, reset]);

  if (isLoading) {
    return (
      <div className="w-full">
        <h1 className="mb-3 text-2xl">
          <Skeleton className="h-8 w-1/2" />
        </h1>
        <div className="rounded-xl bg-white px-6 py-6">
          <Skeleton className="mb-4 h-10 w-full" />
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
      <h1 className="mb-3 text-2xl">
        {id ? "Chỉnh sửa tin tức" : "Thêm tin tức"}
      </h1>
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="title"
              id="title"
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
                onChange={handleSpecialtyChange}
              />
            </div>

            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="author"
              label="Tác giả"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tác giả"
            />
            <div className="grid w-full gap-1.5">
              <Label htmlFor="shortDescription">Nhập mô tả ngắn:</Label>
              <Controller
                name="shortDescription"
                control={control}
                render={({ field }) => (
                  <Textarea
                    placeholder="Nhập mô tả."
                    id="shortDescription"
                    {...field}
                  />
                )}
              />
              {errors.shortDescription && (
                <p className="mt-1 text-sm text-red-500">
                  {errors.shortDescription.message}
                </p>
              )}
            </div>
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

            <div className=" ">
              <Label
                htmlFor=""
                className="mb-2 block text-sm font-medium leading-none text-black"
              >
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

            {imagePreview && (
              <div className="">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-auto max-w-[300px] rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <NewsEditor control={control} name="content" errors={errors} />
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit">
              {id ? "Cập nhật tin tức" : "Lưu tin tức"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
