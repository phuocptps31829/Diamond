import { useSelector } from "react-redux";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { FaMapMarkerAlt, FaUserCheck } from "react-icons/fa";
import defaultAvatar from "@/assets/images/avatar_default.png";
import { Card } from "@/components/ui/Card";
import { Label } from "@/components/ui/Label";
import InputCustom from "@/components/ui/InputCustom";
import { Button } from "@/components/ui/Button";
import { changePasswordSchema } from "@/zods/changePassword";
import { toastUI } from "@/components/ui/Toastify";
import SpinLoader from "@/components/ui/SpinLoader";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";

const ProfileContainer = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);

  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(changePasswordSchema),
    defaultValues: {
      password: "",
      newPassword: "",
      confirmPassword: "",
    },
  });
  console.log(errors);

  const { mutate: changePassword, isPending } = useMutation({
    mutationFn: authApi.changePassword,
    onSuccess: () => {
      toastUI("Cập nhật thành công", "success");
      reset({
        password: "",
        newPassword: "",
        confirmPassword: "",
      });
    },
    onError: (error) => {
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toastUI(errorMessage || "Có lỗi xảy ra khi đổi mật khẩu", "error");
    },
  });

  const onSubmitPasswordChange = (data) => {
    changePassword({
      password: data.password,
      newPassword: data.newPassword,
    });
  };

  return (
    <div className="w-full rounded-2xl bg-white pb-12">
      {/* User information section */}
      <div className="h-32 w-full rounded-t-2xl bg-gradient-to-r from-[#00C9FF] to-[#1d78b4]" />
      <div className="mb-1 mt-3 flex flex-col justify-around gap-4 md:flex-row">
        <div className="mx-auto -mt-20 h-32 w-32 rounded-full border-2 border-white shadow-2xl md:mx-0">
          <img
            src={userProfile?.avatar || defaultAvatar}
            alt="avatar"
            className="h-full w-full rounded-full"
          />
        </div>
      </div>
      <div className="ml-4 mr-auto flex w-full flex-col justify-start md:flex-row">
        <div>
          <h2 className="text-xl font-bold text-gray-900">
            {userProfile?.fullName || "Tên chưa cập nhật"}
          </h2>
          <p className="text-gray-600">
            {userProfile?.email || "Email chưa cập nhật"}
          </p>
          <div className="mt-2 flex items-center text-sm text-gray-600">
            <span className="flex items-center gap-1 pr-2">
              <FaMapMarkerAlt size={16} />
              {userProfile?.address || "Địa chỉ chưa cập nhật"}
            </span>
            <span className="flex items-center gap-1 border-l px-2">
              <FaUserCheck size={16} />
              Tham gia vào{" "}
              {new Date(userProfile?.createdAt).toLocaleDateString()}
            </span>
          </div>
        </div>
      </div>
      <div className="mx-5 mt-2">
        <Label className="text-sm text-primary-900">Thông tin cá nhân:</Label>
        <div className="grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="w-full p-3 duration-500 hover:border hover:border-secondary">
            <div className="text-sm text-gray-700">
              <p>
                <strong>Ngày sinh:</strong>{" "}
                {userProfile?.dateOfBirth || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Số điện thoại:</strong>{" "}
                {userProfile?.phoneNumber || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Giới tính:</strong>{" "}
                {userProfile?.gender || "Chưa cập nhật"}
              </p>
              <p>
                <strong>Số CMND/CCCD:</strong>{" "}
                {userProfile?.citizenIdentificationNumber || "Chưa cập nhật"}
              </p>
            </div>
          </Card>
          <Card className="w-full p-3 duration-500 hover:border hover:border-secondary">
            <div className="text-sm text-gray-700">
              <p>
                <strong>Loại tài khoản:</strong>{" "}
                {userProfile?.role.name || "Chưa xác định"}
              </p>
              <p>
                <strong>Trạng thái kích hoạt:</strong>{" "}
                {userProfile?.isActivated ? "Đã kích hoạt" : "Chưa kích hoạt"}
              </p>
            </div>
          </Card>
        </div>
      </div>

      <div className="mx-5 mt-3 flex w-auto flex-col items-start gap-1">
        <Card className="mt-3 w-full p-4 shadow-none">
          <form
            onSubmit={handleSubmit(onSubmitPasswordChange)}
            className="space-y-2"
          >
            <InputCustom
              name="password"
              label="Mật khẩu cũ:"
              type="password"
              control={control}
              errors={errors}
              placeholder="Nhập mật khẩu cũ"
            />
            <InputCustom
              name="newPassword"
              label="Mật khẩu mới:"
              type="password"
              control={control}
              errors={errors}
              placeholder="Nhập mật khẩu mới"
            />
            <InputCustom
              name="confirmPassword"
              label="Xác nhận mật khẩu:"
              type="password"
              control={control}
              errors={errors}
              placeholder="Nhập lại mật khẩu mới"
            />
            <div className="w-full text-end">
              <Button
                type="submit"
                variant="primary"
                className="mt-3"
                disabled={isPending}
              >
                {isPending ? <SpinLoader /> : "Cập nhật"}
              </Button>
            </div>
          </form>
        </Card>
      </div>
    </div>
  );
};

export default ProfileContainer;
