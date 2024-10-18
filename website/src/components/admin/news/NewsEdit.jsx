import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState, useEffect } from "react";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { newsAdminSchema } from "@/zods/admin/newsAdmin";
import { useParams } from "react-router-dom";
import { newsApi } from "@/services/newsApi";
import { Skeleton } from "@/components/ui/Skeleton";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import NotFound from "@/components/client/notFound";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { axiosInstanceCUD } from "@/services/axiosInstance";

import SpinLoader from "@/components/ui/SpinLoader";
const NewsEdit = () => {
  const { id } = useParams();
  const queryClient = useQueryClient();
  const [isPending, setIsPending] = useState(false);
  const [initialData, setInitialData] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
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
    queryFn: () => newsApi.getNewsById(id),
    enabled: !!id,
  });

  useEffect(() => {
    if (data) {
      const initialFormData = {
        title: data.title,
        category: data.specialtyID,
        author: data.author,
        content: data.content,
        status: data.isHidden ? "Ẩn" : "Hiện",
      };
      setInitialData(initialFormData);
      setValue("title", data.title);
      setValue("category", data.specialtyID);
      setValue("author", data.author);
      setValue("status", data.isHidden ? "Ẩn" : "Hiện");
      setValue("content", data.content);
      setImagePreview(`${import.meta.env.VITE_IMAGE_API_URL}/${data.image}`);
    }
  }, [data, setValue]);

  const mutation = useMutation({
    mutationFn: (newsData) => newsApi.updateNews(id, newsData),
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
  const handleSpecialtyChange = (specialtyId) => {
    console.log(specialtyId);
  };

  const onSubmit = async (data) => {
    if (!fileImage && !imagePreview) {
      toastUI("Vui lòng chọn ảnh!", "error");
      return;
    }
  
    if (JSON.stringify(data) === JSON.stringify(initialData)) {
      toastUI("Không có thay đổi nào được thực hiện.", "warning");
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
          },
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

    const newsData = {
      specialtyID: data.category,
      title: data.title,
      image: imageName,
      content: data.content,
      author: data.author,
      viewCount: 0,
      isHidden: data.status === "Ẩn",
    };
    mutation.mutate(newsData);
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
          <div className="mb-6 grid-cols-1 gap-[10px] sm:grid md:flex">
            {/* Form inputs */}
            <div className="mr-5">
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
              <div className="grid grid-cols-1 items-center justify-center gap-5 sm:grid-cols-2">
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
              </div>
            </div>
          </div>

          <NewsEditor control={control} name="content" errors={errors} />
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
                "Cập nhật tin tức"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsEdit;
