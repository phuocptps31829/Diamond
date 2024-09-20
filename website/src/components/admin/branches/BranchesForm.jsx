import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useState } from "react";
import { Label } from "@/components/ui/Label";
import { Input } from "@/components/ui/Input";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";

const BranchesForm = () => {
  const [imagePreview, setImagePreview] = useState(null);
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(branchesAdminSchema),
    defaultValues: {
      branch_name: "",
      working_hours: "",
      hotline: "",
      address: "",
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
      <h1 className="mb-3 text-2xl font-bold">Thêm chi nhánh</h1>
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-10 grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2">
              <InputCustom
                id="branch_name"
         
                type="text"
                name="branch_name"
                label="Tên chi nhánh"
                placeholder="Nhập tên chi nhánh"
                control={control}
                errors={errors}
              />

              <InputCustom
                id="working_hours"
                name="working_hours"
         
                label="Giờ làm việc"
                type="text"
                placeholder="Nhập thời gian làm việc"
                control={control}
                errors={errors}
              />

            
              <InputCustom
                id="hotline"
         
                type="number"
                name="hotline"
                label="Hotline"
                placeholder="Nhập hotline"
                control={control}
                errors={errors}
              />

            
              <InputCustom
                id="address"
         
                type="text"
                name="address"
                label="Địa chỉ"
                placeholder="Nhập địa chỉ"
                control={control}
                errors={errors}
              />

            <div className="sm:col-span-2">
              <Label
                htmlFor="image"
                className="mb-2 block text-sm font-medium text-black"
              >
                Hình ảnh <span className="text-red-500">*</span>
              </Label>
              <Input
                id="image"
                className="h-10 pt-2 shadow-none"
                type="file"
                required
                onChange={handleImageChange}
              />
            </div>

            {imagePreview && (
              <div className="sm:col-span-2">
                <img
                  src={imagePreview}
                  alt="Image Preview"
                  className="h-auto w-full max-w-[300px] rounded-md object-cover"
                />
              </div>
            )}
          </div>

          <div className="mt-10 flex justify-between">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Thêm
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default BranchesForm;
