import { useForm, Controller } from "react-hook-form";
import { Button } from "@/components/ui/Button";
import { zodResolver } from "@hookform/resolvers/zod";
import { medicineAdminSchema } from "@/zods/admin/medicineAdmin";
import InputCustom from "@/components/ui/InputCustom";
import SelectMedicineCategories from "./select/SelectMedicineCategories";
import SelectUnit from "./select/SelectUnit";
import SelectType from "./select/SelectType";
import { useNavigate } from "react-router-dom";
import { useMutation } from "@tanstack/react-query";
import { Label } from "@/components/ui/Label";
import { Textarea } from "@/components/ui/Textarea";
import { toastUI as toast } from "@/components/ui/Toastify";
import { medicineApi } from "@/services/medicineApi";
import SpinLoader from "@/components/ui/SpinLoader";

const MedicinesFormAdd = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(medicineAdminSchema),
    defaultValues: {
      name: "",
      price: 0,
      medicineCode: "",
      medicineCategoryID: "",
      ingredients: "",
      type: "",
      unit: "",
      instruction: "",
      sideEffects: "",
      note: "",
    },
  });

  const { mutate: createPackageMutation, isPending } = useMutation({
    mutationFn: (data) => medicineApi.createMedicine(data),
    onSuccess: () => {
      toast("Thêm mới thuốc thành công!", "success");
      navigate("/admin/medicines/list");
    },
    onError: () => {
      toast("Thêm mới thuốc thất bại!", "error");
    },
  });

  const onSubmit = (data) => {
    createPackageMutation(data);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6 min-h-[calc(100vh-140px)]">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin thuốc
        </h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="relative md:mb-1 min-w-[370px]">
              <InputCustom
                label={ "Tên thuốc" }
                required
                className="col-span-1 sm:col-span-1"
                name="name"
                type="text"
                id="name"
                placeholder="Nhập tên thuốc"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="relative md:mb-1 md:w-1/3">
              <InputCustom
                label={ "Mã thuốc" }
                required
                className="col-span-1 sm:col-span-1"
                name="medicineCode"
                type="text"
                id="medicineCode"
                placeholder="Nhập mã thuốc"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="md:w-1/3">
              <Label className="mb-3 block text-sm font-medium leading-none text-black">
                Danh mục: <span className="text-red-500">*</span>
              </Label>
              <SelectMedicineCategories
                name="medicineCategoryID"
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="min-w-[370px]">
              <InputCustom
                required
                className="col-span-1 sm:col-span-1"
                name="price"
                label="Giá thuốc:"
                type="number"
                control={ control }
                errors={ errors }
                placeholder="Nhập giá thuốc"
              />
            </div>
            <div className="relative w-full">
              <InputCustom
                label={ "Thành phần thuốc:" }
                required
                className="col-span-1 sm:col-span-1"
                name="ingredients"
                type="text"
                id="ingredients"
                placeholder="Nhập thành phần thuốc:"
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
          <div className="mb-4 flex w-full gap-[20px]">
            <div className="flex flex-col gap-5">
              <div className="w-[370px]">
                <Label className="mb-3 block text-sm font-medium leading-none text-black">
                  Đơn vị: <span className="text-red-500">*</span>
                </Label>
                <SelectUnit name="unit" control={ control } errors={ errors } />
              </div>
              <div className="w-[370px]">
                <Label className="mb-3 block text-sm font-medium leading-none text-black">
                  Loại: <span className="text-red-500">*</span>
                </Label>
                <SelectType name="type" control={ control } errors={ errors } />
              </div>
            </div>
            <div className="relative flex-1">
              <Label className="mb-3 block" htmlFor="shortDescription">
                Hướng dẫn sử dụng: <span className="text-red-500">*</span>
              </Label>
              <Controller
                name="instruction"
                control={ control }
                render={ ({ field }) => (
                  <Textarea
                    placeholder="Nhập hướng dẫn sử dụng"
                    id="instruction"
                    className="min-h-[135px] w-full"
                    { ...field }
                  />
                ) }
              />
              { errors.instruction && (
                <p className="mt-1 text-sm text-red-500">
                  { errors.instruction.message }
                </p>
              ) }
            </div>
          </div>
          <div className="flex w-full gap-[20px]">
            <div className="relative md:mb-1 md:w-1/2">
              <InputCustom
                label={ "Tác dụng phụ" }
                required
                className="col-span-1 sm:col-span-1"
                name="sideEffects"
                type="text"
                id="sideEffects"
                placeholder="Nhập tác dụng phụ"
                control={ control }
                errors={ errors }
              />
            </div>
            <div className="relative md:mb-1 md:w-1/2">
              <InputCustom
                label={ "Lưu ý" }
                required
                className="col-span-1 sm:col-span-1"
                name="note"
                type="text"
                id="note"
                placeholder="Nhập lưu ý"
                control={ control }
                errors={ errors }
              />
            </div>
          </div>
          <div className="mt-10 w-full text-end">
            <Button variant="custom" type="submit" disabled={ isPending }>
              { isPending ? <SpinLoader /> : "Thêm mới" }
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default MedicinesFormAdd;
