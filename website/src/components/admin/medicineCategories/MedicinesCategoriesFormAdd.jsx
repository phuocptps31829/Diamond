import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import { medicineCategoriesAdminSchema } from "@/zods/admin/medicineCategories";
import InputCustom from "@/components/ui/InputCustom";
import SpinLoader from "@/components/ui/SpinLoader";
import { medicineApi } from "@/services/medicineApi";
import { useMutation } from "@tanstack/react-query";
import { toastUI as toast } from "@/components/ui/Toastify";

const MedicinesCategoriesFormAdd = () => {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(medicineCategoriesAdminSchema),
    defaultValues: {
      name: "",
    },
  });

  const { mutate: createMedicineCategoriesMutation, isPending } = useMutation({
    mutationFn: (data) => medicineApi.createMedicineCategories(data),
    onSuccess: () => {
      reset();
      toast("Thêm mới danh mục thuốc thành công!", "success");
      navigate("/admin/medicinesCategories/list");
    },
    onError: () => {
      toast("Thêm mới danh mục thuốc thất bại!", "error");
    },
  });

  const onSubmit = (data) => {
    createMedicineCategoriesMutation(data);
  };

  return (
    <div className="w-full">
      <div className="rounded-xl bg-white px-6 py-6 min-h-[calc(100vh-140px)]">
        <h1 className="mb-5 mr-2 h-fit bg-white text-2xl font-bold">
          Thông tin danh mục thuốc
        </h1>
        <form onSubmit={ handleSubmit(onSubmit) }>
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="name"
            id="name"
            label="Tên danh mục thuốc:"
            required
            type="text"
            control={ control }
            errors={ errors }
            placeholder="Tên danh mục thuốc"
          />
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

export default MedicinesCategoriesFormAdd;
