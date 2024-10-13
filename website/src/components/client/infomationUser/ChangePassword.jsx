import InputCustom from "@/components/ui/InputCustom";
import { toastUI } from "@/components/ui/Toastify";
import { changePasswordSchema } from "@/zods/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";

const ChangePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      oldPassword: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: () => { },
    onError: (error) => {
      console.log(error);
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toastUI(errorMessage || "Có lỗi xảy ra khi đổi mật khẩu", "error");
    }
  });

  const onSubmit = (data) => {
    console.log("Form submittedd");
    console.log(data);
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="mb-2 text-xl font-bold">Thay đổi mật khẩu</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="oldPassword"
            label="Mật khẩu hiện tại"
            type="text"
            control={ control }
            errors={ errors }
            placeholder="Nhập mật khẩu hiện tại"
          />
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="newPassword"
            label="Mật khẩu mới"
            type="password"
            control={ control }
            errors={ errors }
            placeholder="Nhập mật khẩu mới"
          />
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="confirmPassword"
            label="Xác nhận mật khẩu mới"
            type="password"
            control={ control }
            errors={ errors }
            placeholder="Xác nhận mật khẩu mới"
          />
        </div>
        <div className="flex w-full items-end justify-end">
          <button
            type="submit"
            className="md:w-2/12 mt-4 h-fit w-4/12 rounded-md bg-primary-500 p-2 text-white text-[15px]"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
