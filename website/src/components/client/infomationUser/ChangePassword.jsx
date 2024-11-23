import InputCustom from "@/components/ui/InputCustom";
import SpinLoader from "@/components/ui/SpinLoader";

import { authApi } from "@/services/authApi";
import { changePasswordSchema } from "@/zods/changePassword";
import { zodResolver } from "@hookform/resolvers/zod";
import { useMutation } from "@tanstack/react-query";
import { useForm } from "react-hook-form";
import toast from "react-hot-toast";

const ChangePassword = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: (data) => {
      console.log(data);
      toast.success("Đổi mật khẩu thành công");
      reset({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      console.log(error);
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Đã xảy ra lỗi, vui lòng thử lại.");
    }
  });

  const onSubmit = (data) => {
    console.log("Form submittedd");
    console.log(data);
    changePassword({ password: data.password, newPassword: data.newPassword });
  };

  return (
    <div className="p-4 md:p-6">
      <h2 className="mb-2 text-xl font-bold">Thay đổi mật khẩu</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="mb-4 flex flex-col gap-2 md:flex-row md:flex-wrap md:justify-end">
          <InputCustom
            className="col-span-1 sm:col-span-1"
            name="password"
            label="Mật khẩu hiện tại"
            type="password"
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
            className="md:w-2/12 text-center mt-4 h-fit w-4/12 rounded-md bg-primary-500 p-2 text-white text-[15px]"
          >
            { isPending ? <SpinLoader /> : "Cập nhật" }
          </button>
        </div>
      </form>
    </div>
  );
};

export default ChangePassword;
