import { useForm } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicineAdminSchema } from "@/zods/admin/medicineAdmin";
import InputCustom from "@/components/ui/InputCustom";
import SelectMedicineCategories from "./select/SelectMedicineCategories";
import SelectUnit from "./select/SelectUnit";
import SelectType from "./select/SelectType";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { Label } from "@/components/ui/Label";
import { toastUI as toast } from "@/components/ui/Toastify";
import { medicineApi } from "@/services/medicineApi";
import SpinLoader from "@/components/ui/SpinLoader";

const MedicinesFormFix = ({ medicineDetail }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(medicineAdminSchema),
    defaultValues: {
      name: medicineDetail.name || "",
      price: Number(medicineDetail.price) || 0,
      medicineCode: medicineDetail.medicineCode || "",
      medicineCategoryID: medicineDetail.medicineCategory._id || "",
      ingredients: medicineDetail.ingredients || "",
      type: medicineDetail.type || "",
      unit: medicineDetail.unit || "",
      instruction: medicineDetail.instruction || "",
      sideEffects: medicineDetail.sideEffects || "",
      note: medicineDetail.note || "",
    },
  });

  const { mutate: updatePackageMutation, isPending } = useMutation({
    mutationFn: ({ id, data }) => medicineApi.updateMedicine(id, data),
    onSuccess: (newData) => {
      const updateData = {
        ...newData,
        price: Number(newData.price),
      };
      reset(updateData);
      queryClient.invalidateQueries(["medicine", medicineDetail._id]);
      toast("Thêm mới thuốc thành công!", "success");
    },
    onError: () => {
      toast("Thêm mới thuốc thất bại!", "error");
    },
  });

  const onSubmit = (data) => {
    updatePackageMutation({
      id: medicineDetail._id,
      data,
    });
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin thuốc
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="relative md:mb-1 md:w-1/3">
              <InputCustom
                label={"Tên thuốc"}
                required
                className="col-span-1 sm:col-span-1"
                name="name"
                type="text"
                id="name"
                placeholder="Nhập tên thuốc"
                control={control}
                errors={errors}
              />
            </div>
            <div className="relative md:mb-1 md:w-1/3">
              <InputCustom
                label={"Mã thuốc"}
                required
                className="col-span-1 sm:col-span-1"
                name="medicineCode"
                type="text"
                id="medicineCode"
                placeholder="Nhập mã thuốc"
                control={control}
                errors={errors}
              />
            </div>
            <div className="md:w-1/3">
              <Label className="mb-3 block text-sm font-medium leading-none text-black">
                Danh mục: <span className="text-red-500">*</span>
              </Label>
              <SelectMedicineCategories
                name="medicineCategoryID"
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="md:w-1/4">
              <InputCustom
                required
                className="col-span-1 sm:col-span-1"
                name="price"
                label="Giá thuốc:"
                type="number"
                control={control}
                errors={errors}
                placeholder="Nhập giá thuốc"
              />
            </div>
            <div className="relative flex-1">
              <InputCustom
                label={"Thành phần thuốc:"}
                required
                className="col-span-1 sm:col-span-1"
                name="ingredients"
                type="text"
                id="ingredients"
                placeholder="Nhập thành phần thuốc:"
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="md:w-1/4">
              <Label className="mb-3 block text-sm font-medium leading-none text-black">
                Đơn vị: <span className="text-red-500">*</span>
              </Label>
              <SelectUnit name="unit" control={control} errors={errors} />
            </div>
            <div className="md:w-1/4">
              <Label className="mb-3 block text-sm font-medium leading-none text-black">
                Loại: <span className="text-red-500">*</span>
              </Label>
              <SelectType name="type" control={control} errors={errors} />
            </div>
            <div className="relative flex-1">
              <InputCustom
                label={"Hướng dẫn sử dụng"}
                required
                className="col-span-1 sm:col-span-1"
                name="instruction"
                type="text"
                id="instruction"
                placeholder="Nhập hướng dẫn sử dụng"
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className="flex w-full gap-[20px]">
            <div className="relative md:mb-1 md:w-1/2">
              <InputCustom
                label={"Tác dụng phụ"}
                required
                className="col-span-1 sm:col-span-1"
                name="sideEffects"
                type="text"
                id="sideEffects"
                placeholder="Nhập tác dụng phụ"
                control={control}
                errors={errors}
              />
            </div>
            <div className="relative md:mb-1 md:w-1/2">
              <InputCustom
                label={"Lưu ý"}
                required
                className="col-span-1 sm:col-span-1"
                name="note"
                type="text"
                id="note"
                placeholder="Nhập lưu ý"
                control={control}
                errors={errors}
              />
            </div>
          </div>
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit" disabled={isPending}>
              {isPending ? <SpinLoader /> : "Cập nhật"}
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicinesFormFix;
