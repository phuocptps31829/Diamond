import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { Button } from "@/components/ui/Button";
import InputCustom from "@/components/ui/InputCustom";
import { branchesAdminSchema } from "@/zods/admin/branchesAdmin";

const AppointmentsForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
    reset,
  } = useForm({
    resolver: zodResolver(branchesAdminSchema),
    defaultValues: {
      fullName: "",
      email: "",
      phoneNumber: "",
      job: "",
      ethnicity: "",
      cccd: "",
      bhyt: "",
      address: "",
      department: "",
      doctor: "",
      time: "",
      room: "",
      date: "",
      birthDate: "",
      gender: "",
      province: "",
      district: "",
      ward: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Submitted Data:", data);
  };

  return (
    <div className="w-full">
      <h1 className="mb-3 text-2xl font-bold">Chỉnh sửa lịch đặt</h1>
      <div className="rounded-xl bg-white px-6 py-6">
        <form onSubmit={handleSubmit(onSubmit)}>
          <div className="mb-10 grid grid-cols-1 items-center justify-center gap-8 sm:grid-cols-2">
            <InputCustom
              id="fullName"
              name="fullName"
              label="Họ và tên"
              type="text"
              placeholder="Nhập họ và tên"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="email"
              name="email"
              label="Email"
              type="email"
              placeholder="Nhập email"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="phoneNumber"
              name="phoneNumber"
              label="Số điện thoại"
              type="text"
              placeholder="Nhập số điện thoại"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="job"
              name="job"
              label="Nghề nghiệp"
              type="text"
              placeholder="Nhập nghề nghiệp"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="ethnicity"
              name="ethnicity"
              label="Dân tộc"
              type="text"
              placeholder="Nhập dân tộc"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="cccd"
              name="cccd"
              label="CCCD"
              type="text"
              placeholder="Nhập CCCD"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="bhyt"
              name="bhyt"
              label="BHYT"
              type="text"
              placeholder="Nhập BHYT"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="address"
              name="address"
              label="Địa chỉ"
              type="text"
              placeholder="Nhập địa chỉ"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="department"
              name="department"
              label="Khoa"
              type="text"
              placeholder="Nhập khoa"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="doctor"
              name="doctor"
              label="Bác sĩ"
              type="text"
              placeholder="Nhập tên bác sĩ"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="time"
              name="time"
              label="Giờ khám"
              type="time"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="room"
              name="room"
              label="Phòng khám"
              type="text"
              placeholder="Nhập phòng khám"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="date"
              name="date"
              label="Ngày khám"
              type="date"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="birthDate"
              name="birthDate"
              label="Ngày sinh"
              type="date"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="gender"
              name="gender"
              label="Giới tính"
              type="text"
              placeholder="Nhập giới tính"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="province"
              name="province"
              label="Tỉnh"
              type="text"
              placeholder="Nhập tỉnh"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="district"
              name="district"
              label="Quận/Huyện"
              type="text"
              placeholder="Nhập quận/huyện"
              control={control}
              errors={errors}
            />

            <InputCustom
              id="ward"
              name="ward"
              label="Phường/Xã"
              type="text"
              placeholder="Nhập phường/xã"
              control={control}
              errors={errors}
            />
          </div>

          <div className="mt-10 flex justify-between">
            <Button type="button" variant="secondary" onClick={() => reset()}>
              Hủy
            </Button>
            <Button type="submit" variant="primary">
              Lưu
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default AppointmentsForm;
