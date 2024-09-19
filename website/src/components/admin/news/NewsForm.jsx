import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectLabel,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/Select";
import { Label } from "@/components/ui/Label";
import { RadioGroup, RadioGroupItem } from "@/components/ui/RadioGroup";
import { Button } from "@/components/ui/Button";
import { useState } from "react";
import { Input } from "@/components/ui/Input";
import NewsEditor from "./editor";
import SelectSpecialty from "./select/SelectSpecialty";
import { newsAdminSchema } from "@/zods/admin/newsAdmin";

const NewsForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
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
    },
  });

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result);
      };
      reader.readAsDataURL(file);
    } else {
      setImagePreview(null);
    }
  };

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl">Thêm tin tức</h1>
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-10 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
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
              className="col-span-1 sm:col-span-1"
              name="author"
              label="Tác giả"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập tác giả"
            />
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
                required
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
              <RadioGroup
                defaultValue="Ẩn"
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

          <NewsEditor />
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit">
              Lưu tin tức
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default NewsForm;
