import { Avatar, AvatarImage } from "@/components/ui/avatar";
import { Label } from "@/components/ui/label";
import avatarU from "../../../assets/images/healthcare-medical-people-concept-smiling-asian-female-doctor-pointing-fingers-right-showing-adverti.jpg";
import InputCustom from "@/components/ui/inputCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/zod/UserZod";


const UserInfoForm = () => {
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: "",
      phoneNumber: "",
      email: "",
      occupation: "",
      birthDate: "",
      ethnicity: "",
      idNumber: "",
      insuranceNumber: "",
      address: "",
      avatar: "",
    },
  });

  const onSubmit = (data) => {
    console.log("Form submitted");
    console.log(data);
  };

  return (
    <div className="w-full p-6">
      <h2 className="col-span-2 mb-6 text-xl font-bold">Thông tin tài khoản</h2>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div className="flex-2 grid w-full grid-cols-1 gap-6 p-4 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="fullName"
              label="Họ và tên"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập họ và tên"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="phoneNumber"
              label="Số điện thoại"
              
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập số điện thoại"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="email"
              label="Email"
              type="email"
              control={control}
              errors={errors}
              placeholder="Nhập email"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="occupation"
              label="Nghề nghiệp"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập nghề nghiệp"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="birthDate"
              label="Ngày sinh"
              type="date"
              control={control}
              errors={errors}
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="ethnicity"
              label="Dân tộc"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập dân tộc"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="idNumber"
              label="Số CMND/CCCD"
              type="password"
              control={control}
              errors={errors}
              placeholder="**************"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="insuranceNumber"
              label="Số thẻ BH"
              type="password"
              control={control}
              errors={errors}
              placeholder="**************"
            />
            <InputCustom
              name="address"
              label="Địa chỉ"
              type="text"
              control={control}
              errors={errors}
              placeholder="Nhập địa chỉ"
              className="col-span-1 sm:col-span-2"
            />
          </div>

          <div className="mt-6 flex h-full w-auto flex-col items-center gap-5 p-4 md:mt-0 md:border-l">
            <Avatar className="size-36">
              <AvatarImage src={avatarU} />
            </Avatar>

            <div className="mt-4 w-full max-w-sm bg-white p-2 text-center">
              <Label htmlFor="picture" className="mb-1.5 block">
                Ảnh đại diện
              </Label>
              <InputCustom
                name="avatar"
                id="picture"
                type="file"
                control={control}
                errors={errors}
              />
            </div>
            <div className="mt-4 flex w-full justify-center gap-4 md:flex-wrap">
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  type="radio"
                  name="gender"
                  value="male"
                  className="mr-3 size-5"
                  required
                />
                <label className="mr-2">Nam</label>
              </div>
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  type="radio"
                  name="gender"
                  value="female"
                  className="mr-3 size-5"
                  required
                />
                <label>Nữ</label>
              </div>
            </div>
          <button
            type="submit"
            className="mt-5 h-fit w-full rounded bg-primary-500 p-2 text-white md:block hidden"
          >
            Cập nhật
          </button>
          </div>
        </div>
        <div className="mt-auto w-full px-4 pb-4 md:px-4  md:hidden block">
          <button
            type="submit"
            className="mt-4 h-fit w-full rounded bg-primary-500 p-3 text-white"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
