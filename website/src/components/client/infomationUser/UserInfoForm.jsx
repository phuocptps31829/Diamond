import { Avatar, AvatarImage } from "@/components/ui/Avatar";
import { Label } from "@/components/ui/Label";
// import avatarU from "../../../assets/images/healthcare-medical-people-concept-smiling-asian-female-doctor-pointing-fingers-right-showing-adverti.jpg";
import InputCustom from "@/components/ui/InputCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/zods/user";
import { authApi } from "@/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useQuery } from "@tanstack/react-query";
import { logoutAction, setUserProfile } from "@/redux/authSlice";
import { useEffect } from "react";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";

const UserInfoForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const profile = useSelector((state) => state.auth.userProfile);

  const { data: profileFetched, error, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
    enabled: !!profile
  });
  console.log(profileFetched);

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    reset,
  } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
      email: profile?.email || "",
      dateOfBirth: profile?.dateOfBirth || "",
      citizenIdentificationNumber: profile?.citizenIdentificationNumber || "",
      occupation: profile?.occupation || "",
      ethnic: profile?.ethnic || "",
      insuranceCode: profile?.insuranceCode || "",
      address: profile?.address || "",
    },
  });

  useEffect(() => {
    if (profileFetched?.role) {
      if (profileFetched?.role && profileFetched.role?.name !== "PATIENT") {
        dispatch(logoutAction());
        navigate('/login');
      }
    }

    dispatch(setUserProfile(profileFetched?.data));

    setValue('fullName', profileFetched?.data?.fullName);
    setValue('phoneNumber', profileFetched?.data?.phoneNumber);
    setValue('email', profileFetched?.data?.email);
    setValue('dateOfBirth', profileFetched?.data?.dateOfBirth);
    setValue('gender', profileFetched?.data?.gender);
    setValue('citizenIdentificationNumber', profileFetched?.data?.citizenIdentificationNumber);
    setValue('occupation', profileFetched?.data?.otherInfo?.occupation);
    setValue('ethnic', profileFetched?.data?.otherInfo?.ethnic);
    setValue('insuranceCode', profileFetched?.data?.otherInfo?.insuranceCode);
  }, [profileFetched, dispatch, setValue]);

  const onSubmit = (data) => {
    console.log("Form submitted");
    console.log(data);
  };

  // if (isLoading) return <p>Loading...</p>;
  // if (error) return <p>Error fetching profile data.</p>;

  return (
    <div className="w-full p-6">
      <h2 className="col-span-2 mb-6 text-xl font-bold">Thông tin tài khoản</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div className="flex-2 grid w-full grid-cols-1 gap-4 p-4 sm:grid-cols-2">
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="fullName"
              label="Họ và tên"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập họ và tên"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="phoneNumber"
              label="Số điện thoại"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập số điện thoại"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="email"
              label="Email"
              type="email"
              control={ control }
              errors={ errors }
              placeholder="Nhập email"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="occupation"
              label="Nghề nghiệp"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập nghề nghiệp"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="dateOfBirth"
              label="Ngày sinh"
              type="date"
              control={ control }
              errors={ errors }
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="ethnic"
              label="Dân tộc"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập dân tộc"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="citizenIdentificationNumber"
              label="Số CMND/CCCD"
              type="password"
              control={ control }
              errors={ errors }
              placeholder="**************"
            />
            <InputCustom
              className="col-span-1 sm:col-span-1"
              name="insuranceCode"
              label="Số thẻ BH"
              type="password"
              control={ control }
              errors={ errors }
              placeholder="**************"
            />
            <InputCustom
              name="address"
              label="Địa chỉ"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập địa chỉ"
              className="col-span-1 sm:col-span-2"
            />
          </div>

          <div className="mt-6 flex h-full w-auto flex-col items-center gap-5 p-4 md:mt-0 md:border-l">
            <Avatar className="size-36">
              <AvatarImage src={ profile?.avatar || "https://icons.iconarchive.com/icons/papirus-team/papirus-status/512/avatar-default-icon.png" } className="object-cover" />
            </Avatar>

            <div className="mt-4 w-full max-w-sm bg-white p-2 text-center">
              <Label htmlFor="picture" className="mb-1.5 block">
                Ảnh đại diện
              </Label>
              <Input id="picture" type="file" />
            </div>
            <div className="mt-4 flex w-full justify-center gap-4 md:flex-wrap">
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  type="radio"
                  name="gender"
                  value="Nam"
                  checked={ profileFetched?.data.gender === "Nam" }
                  className="mr-3 size-5"
                  required
                />
                <label className="mr-2">Nam</label>
              </div>
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  type="radio"
                  name="gender"
                  value="Nữ"
                  checked={ profileFetched?.data.gender === "Nữ" }
                  className="mr-3 size-5"
                  required
                />
                <label>Nữ</label>
              </div>
            </div>
            <button
              type="submit"
              className="mt-5 hidden h-fit w-full rounded bg-primary-500 p-2 text-white md:block"
            >
              Cập nhật
            </button>
          </div>
        </div>
        <div className="mt-auto block w-full px-4 pb-4 md:hidden md:px-4">
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
