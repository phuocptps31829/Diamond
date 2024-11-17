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
import { useMutation, useQuery } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/Dialog";
import { useState } from "react";
import { roles } from "@/constants/roles";
import { branchApi } from "@/services/branchesApi";
import { specialtyApi } from "@/services/specialtiesApi";

const ProfileContainer = () => {
  const userProfile = useSelector((state) => state.auth.userProfile);
  const [selectedImage, setSelectedImage] = useState(null);
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
  const { data: branchData, isLoading: isBranchLoading } = useQuery({
    queryKey: ["branches", userProfile?.otherInfo?.branchID],
    queryFn: () =>
      userProfile?.otherInfo?.branchID
        ? branchApi.getBranchesById(userProfile.otherInfo.branchID)
        : Promise.resolve(null),
    enabled: !!userProfile?.otherInfo?.branchID,
  });

  const { data: specialtyData, isLoading: isSpecialtyLoading } = useQuery({
    queryKey: ["specialty", userProfile?.otherInfo?.specialtyID],
    queryFn: () =>
      userProfile?.otherInfo?.specialtyID
        ? specialtyApi.getSpecialtiesById(userProfile.otherInfo.specialtyID)
        : Promise.resolve(null),
    enabled: !!userProfile?.otherInfo?.specialtyID,
  });
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
  const isDoctor = userProfile?.role?.name === "DOCTOR";
  return (
    <div className="w-full rounded-2xl bg-white pb-12">
      <div className="h-32 w-full rounded-t-2xl bg-gradient-to-r from-[#00C9FF] to-[#1d78b4]" />
      <div className="mb-1 mt-3 flex flex-col justify-around gap-4 md:flex-row">
        <div className="mx-auto -mt-20 h-32 w-32 rounded-full border-2 border-white shadow-2xl md:mx-0">
          <img
            src={
              userProfile?.avatar
                ? import.meta.env.VITE_IMAGE_API_URL + "/" + userProfile?.avatar
                : defaultAvatar
            }
            alt="avatar"
            className="h-full w-full rounded-full bg-white object-cover"
          />
        </div>
      </div>
      <div className="ml-4 mr-auto flex w-full flex-col justify-start md:flex-row">
        <div>
          <h2 className="text-2xl font-bold text-gray-900">
            {userProfile?.fullName || "Tên chưa cập nhật"}
          </h2>
          <p className="text-base text-gray-600">
            {userProfile?.email || "Email chưa cập nhật"}
          </p>
          <div className="mt-2 flex items-center text-base text-gray-600">
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
        <Label className="text-lg text-primary-900">Thông tin cá nhân:</Label>
        <div className="mt-1 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
          <Card className="w-full px-4 py-3 duration-500 hover:border hover:border-secondary">
            <div className="text-sm text-gray-700">
              <p className="text-base">
                <strong>Ngày sinh:</strong>{" "}
                {userProfile?.dateOfBirth || "Chưa cập nhật"}
              </p>
              <p className="text-base">
                <strong>Số điện thoại:</strong>{" "}
                {userProfile?.phoneNumber || "Chưa cập nhật"}
              </p>
              <p className="text-base">
                <strong>Giới tính:</strong>{" "}
                {userProfile?.gender || "Chưa cập nhật"}
              </p>
              <p className="text-base">
                <strong>Số CMND/CCCD:</strong>{" "}
                {userProfile?.citizenIdentificationNumber || "Chưa cập nhật"}
              </p>
            </div>
          </Card>
          <Card className="w-full px-4 py-3 duration-500 hover:border hover:border-secondary">
            <div className="text-sm text-gray-700">
              <p className="text-base">
                <strong>Loại tài khoản:</strong>{" "}
                {
                  roles.find((role) => role.value === userProfile?.role?.name)
                    ?.label
                }
              </p>
              <p className="text-base">
                <strong>Trạng thái kích hoạt:</strong>{" "}
                {userProfile?.isActivated ? "Đã kích hoạt" : "Chưa kích hoạt"}
              </p>
            </div>
          </Card>
        </div>
      </div>

      {isDoctor && (
        <div className="mx-5 mt-4">
          <Label className="text-lg text-primary-900">Thông tin bác sĩ:</Label>
          <div className="mt-1 grid w-full grid-cols-1 gap-4 md:grid-cols-2">
            <Card className="w-full px-4 py-3 duration-500 hover:border hover:border-secondary">
              <div className="text-sm text-gray-700">
                <p className="text-base">
                  <strong>Chuyên khoa:</strong>{" "}
                  {isSpecialtyLoading
                    ? "Đang tải..."
                    : specialtyData?.name || "Chưa cập nhật"}
                </p>
                <p className="text-base">
                  <strong>Chi nhánh:</strong>{" "}
                  {isBranchLoading
                    ? "Đang tải..."
                    : branchData?.name || "Chưa cập nhật"}
                </p>
                <p className="text-base">
                  <strong>Chức danh:</strong>{" "}
                  {userProfile?.otherInfo?.title || "Chưa cập nhật"}
                </p>
                <p className="text-base">
                  <strong>Năm kinh nghiệm:</strong>{" "}
                  {userProfile?.otherInfo?.yearsExperience || "Chưa cập nhật"}
                </p>
              </div>
            </Card>
            <Card className="w-full px-4 py-3 duration-500 hover:border hover:border-secondary">
              <div className="text-sm text-gray-700">
                <p className="text-base">
                  <strong>Chứng chỉ hành nghề:</strong>{" "}
                  {userProfile?.otherInfo?.verification
                    ?.practicingCertificate || "Chưa cập nhật"}
                </p>
                <p className="text-base">
                  <strong>Loại bác sĩ:</strong>{" "}
                  {userProfile?.otherInfo?.isInternal ? "Nội bộ" : "Bên ngoài"}
                </p>
                <div>
                  <strong className="text-base">Hình ảnh chứng chỉ:</strong>
                  {userProfile?.otherInfo?.verification?.images?.length > 0 ? (
                    <div className="mt-2 flex flex-wrap gap-2">
                      {userProfile.otherInfo.verification.images.map(
                        (image, index) => (
                          <Dialog key={index}>
                            <DialogTrigger asChild>
                              <button
                                className="h-24 w-24 overflow-hidden rounded-md border border-gray-200 focus:outline-none focus:ring-2 focus:ring-blue-500"
                                onClick={() => setSelectedImage(image)}
                              >
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${image}`}
                                  alt={`Chứng chỉ hành nghề ${index + 1}`}
                                  className="h-full w-full object-cover"
                                />
                              </button>
                            </DialogTrigger>
                            <DialogContent className="sm:max-w-[655px]">
                              <div className="">
                                <img
                                  src={`${import.meta.env.VITE_IMAGE_API_URL}/${image}`}
                                  alt={`Chứng chỉ hành nghề ${index + 1}`}
                                  className="h-auto w-full"
                                />
                              </div>
                            </DialogContent>
                          </Dialog>
                        )
                      )}
                    </div>
                  ) : (
                    <p className="mt-1 text-base">Chưa cập nhật</p>
                  )}
                </div>
              </div>
            </Card>
          </div>
          <Card className="mt-4 w-full px-4 py-3 duration-500 hover:border hover:border-secondary">
            <div className="text-sm text-gray-700">
              <p className="text-base">
                <strong>Chi tiết:</strong>
              </p>
              <div
                className="mt-2"
                dangerouslySetInnerHTML={{
                  __html: userProfile?.otherInfo?.detail || "Chưa cập nhật",
                }}
              />
            </div>
          </Card>
        </div>
      )}

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
