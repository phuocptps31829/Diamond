import { Controller, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useRef, useState } from "react";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { newsAdminSchema } from "@/zods/admin/newsAdmin";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { newsApi } from "@/services/newsApi";
import { toastUI } from "@/components/ui/Toastify";
import ImagePreview from "@/components/ui/ImagePreview";
import { useNavigate } from "react-router-dom";
import { imageApi } from "@/services/imageApi";
import SpinLoader from "@/components/ui/SpinLoader";
const NewsAdd = () => {
  const queryClient = useQueryClient();
  const [imagePreview, setImagePreview] = useState(null);
  const [fileImage, setFileImage] = useState(null);
  const [isPending, setIsPending] = useState(false); 
  const fileInputRef = useRef(null);
  const navigate = useNavigate();

  const {
    handleSubmit,
    formState: { errors },
    control,
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

  const mutation = useMutation({
    mutationFn: (newsData) => newsApi.createNews(newsData),
    onSuccess: () => {
      queryClient.invalidateQueries("news");
      toastUI("Đã thêm thành công tin tức!", "success");
      reset();
      setImagePreview(null);
      if (fileInputRef.current) {
        fileInputRef.current.value = "";
      }
      navigate("/admin/news/list");
    },
    onError: (error) => {
      toastUI("Đã xảy ra lỗi khi thêm tin tức.", "error");
      console.error("Error creating news:", error);
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
      const response = await imageApi.createImage(formData);

      console.log(response.data);

      const imageName = response.data;

      const newsData = {
        specialtyID: data.category,
        title: data.title,
        image: imageName,
        content: data.content,
        author: data.author,
        viewCount: 0,
        isHidden: data.status === "Ẩn",
      };
      console.log(newsData);

      mutation.mutate(newsData);
    } catch (error) {
      toastUI("Đã xảy ra lỗi ảnh,vui lòng thử lại.", "error");

      console.error("Error uploading image:", error);
    }
    finally {setIsPending(false);}
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
      <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thêm tin tức
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-6 grid-cols-1 gap-[10px] sm:grid md:flex">
            {/* Form inputs */}
            <div className="mr-5">
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
                 <SpinLoader/>

                </>
              ) : (
                "Thêm tin tức"
              )}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsAdd;
