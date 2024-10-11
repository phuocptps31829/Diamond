import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { medicineCategoriesAdminSchema } from "@/zods/admin/medicineCategories";
import InputCustom from "@/components/ui/InputCustom";
import SpinLoader from "@/components/ui/SpinLoader";
import { medicineApi } from "@/services/medicineApi";
import { useMutation, useQueryClient } from "@tanstack/react-query";
import { toastUI as toast } from "@/components/ui/Toastify";

const MedicinesCategoriesFormFix = ({ medicineCategoriesDetail }) => {
  const queryClient = useQueryClient();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(medicineCategoriesAdminSchema),
    defaultValues: {
      name: medicineCategoriesDetail?.name || "NaN",
    },
  });

  const { mutate: updateMedicineCategoriesMutation, isPending } = useMutation({
    mutationFn: ({ id, data }) =>
      medicineApi.updateMedicineCategories(id, data),
    onSuccess: (newData) => {
      reset(newData);
      toast("Cập nhật danh mục thuốc thành công!", "success");
      queryClient.invalidateQueries([
        "medicineCategories",
        medicineCategoriesDetail._id,
      ]);
    },
    onError: () => {
      toast("Cập nhật danh mục thuốc thất bại!", "error");
    },
  });

  const onSubmit = (data) => {
    updateMedicineCategoriesMutation({
      id: medicineCategoriesDetail._id,
      data,
    });
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin danh mục thuốc
        </h1>
        <form onSubmit={handleSubmit(onSubmit)}>
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="name"
            id="name"
            label="Tên danh mục thuốc:"
            required
            type="text"
            control={control}
            errors={errors}
            placeholder="Tên danh mục thuốc"
          />
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

export default MedicinesCategoriesFormFix;
