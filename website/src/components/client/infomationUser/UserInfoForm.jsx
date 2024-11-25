import { Label } from "@/components/ui/Label";
import InputCustom from "@/components/ui/InputCustom";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { userInfoSchema } from "@/zods/client/user";
import { authApi } from "@/services/authApi";
import { useDispatch, useSelector } from "react-redux";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { logoutAction, setUserProfile } from "@/redux/authSlice";
import { useEffect, useRef, useState } from "react";
import { Input } from "@/components/ui/Input";
import { useNavigate } from "react-router-dom";
import Loading from "@/components/ui/Loading";
import { imageApi } from "@/services/imageApi";
import { patientApi } from "@/services/patientsApi";
import SelectEthnic from "../checkout/select/SelectEthnicity";
import SelectDateOfBirth from "./SelectDateOfBirth";
import SpinLoader from "@/components/ui/SpinLoader";
import toast from "react-hot-toast";

const UserInfoForm = () => {
  const queryClient = useQueryClient();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [fileImage, setFileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const profile = useSelector((state) => state.auth.userProfile);

  const { data: profileFetched, isLoading } = useQuery({
    queryKey: ["userProfile"],
    queryFn: authApi.getProfileInfo,
    enabled: !profile
  });

  const { mutate: updatePatient, isPending: isPendingUpdate } = useMutation({
    mutationFn: ({ id, requestBody }) => {
      return patientApi.updatePatient(id, requestBody);
    },
    onSuccess: () => {
      toast.success("Cập nhật thành công");
      setFileImage(null);
      queryClient.invalidateQueries(["userProfile"]);
    },
    onError: (error) => {
      console.log(error);
      const errorMessage =
        error.response?.data?.message ||
        error.message ||
        "Đã xảy ra lỗi, vui lòng thử lại.";
      toast.error(errorMessage || "Cập nhật thất bại");
    },
  });

  const {
    handleSubmit,
    formState: { errors },
    control,
    setValue,
    register
  } = useForm({
    resolver: zodResolver(userInfoSchema),
    defaultValues: {
      fullName: profile?.fullName || "",
      phoneNumber: profile?.phoneNumber || "",
      email: profile?.email || "",
      gender: profile?.gender || "",
      dateOfBirth: profile?.dateOfBirth || "",
      citizenIdentificationNumber: profile?.citizenIdentificationNumber || "",
      occupation: profile?.occupation || "",
      ethnic: profile?.ethnic || "",
      insuranceCode: profile?.insuranceCode || "",
      address: profile?.address || "",
    },
  });

  useEffect(() => {
    if (!profileFetched) return;

    if (profileFetched?.role) {
      if (profileFetched?.role && profileFetched.role?.name !== "PATIENT") {
        dispatch(logoutAction());
        navigate('/login');
      }
    }

    dispatch(setUserProfile(profileFetched?.data));

    setImagePreview(profileFetched?.data?.avatar);
    setValue('fullName', profileFetched?.data?.fullName);
    setValue('phoneNumber', profileFetched?.data?.phoneNumber);
    setValue('email', profileFetched?.data?.email);
    setValue('dateOfBirth', profileFetched?.data?.dateOfBirth);
    setValue('gender', profileFetched?.data?.gender);
    setValue('address', profileFetched?.data?.address);
    setValue('citizenIdentificationNumber', profileFetched?.data?.citizenIdentificationNumber);
    setValue('occupation', profileFetched?.data?.otherInfo?.occupation);
    setValue('ethnic', profileFetched?.data?.otherInfo?.ethnic);
    setValue('insuranceCode', profileFetched?.data?.otherInfo?.insuranceCode);
  }, [profileFetched, dispatch, setValue, navigate]);

  const onSubmit = async (data) => {
    const requestBody = {
      fullName: data.fullName,
      phoneNumber: data.phoneNumber,
      email: data.email,
      dateOfBirth: data.dateOfBirth,
      gender: data.gender,
      avatar: "",
      citizenIdentificationNumber: data.citizenIdentificationNumber,
      address: data.address,
      isActivated: true,
      otherInfo: {
        occupation: data.occupation,
        insuranceCode: data.insuranceCode,
        ethnic: data.ethnic,
      },
    };

    if (fileImage) {
      const formData = new FormData();
      formData.append("file", fileImage);

      const imageResponse = await imageApi.createImage(formData);
      const imageUrl = imageResponse?.data;

      if (!imageUrl) {
        throw new Error("Không thể upload ảnh");
      }
      requestBody.avatar = imageUrl;

      console.log('requestBody', requestBody);
      updatePatient({ id: profileFetched?.data?._id, requestBody });
    } else {
      requestBody.avatar = imagePreview;
      updatePatient({ id: profileFetched?.data?._id, requestBody });
    }
  };
  console.log(errors);
  const fileInputRef = useRef(null);

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      setFileImage(file);
      const imageUrl = URL.createObjectURL(file);
      setImagePreview(imageUrl);
    }
  };

  useEffect(() => {
    if (!imagePreview) {
      fileInputRef.current.value = "";
    }
  }, [imagePreview]);

  return (
    <div className="w-full p2 md:p-6">
      { isLoading && <Loading /> }
      <h2 className="col-span-2 text-xl font-bold">Thông tin tài khoản</h2>
      <form onSubmit={ handleSubmit(onSubmit) }>
        <div className="flex flex-col-reverse gap-2 md:flex-row">
          <div className="sm:grid w-full flex flex-col gap-4 p-4 sm:grid-cols-2">
            <InputCustom
              className=""
              name="fullName"
              label="Họ và tên"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập họ và tên"
              required
            />
            <InputCustom
              className=""
              name="phoneNumber"
              label="Số điện thoại"
              disabled
              type="text"
              control={ control }
              errors={ errors }
              required
              placeholder="Nhập số điện thoại"
            />
            <InputCustom
              className=""
              name="email"
              label="Email"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập email"
            />
            <InputCustom
              className=""
              name="occupation"
              label="Nghề nghiệp"
              type="text"
              control={ control }
              errors={ errors }
              placeholder="Nhập nghề nghiệp"
            />
            <div className="relative">
              <label
                htmlFor="ethnic"
                className="left-[15px] mb-[7.5px] block bg-white px-1 text-[14px]"
              >
                Ngày sinh <span className="text-red-500">*</span>
              </label>
              <SelectDateOfBirth
                control={ control }
                name="dateOfBirth"
                errors={ errors }
                disabled={ isPendingUpdate }
              />
            </div>
            <div className="relative">
              <label
                htmlFor="ethnic"
                className="left-[15px] mb-[7.5px] block bg-white px-1 text-[14px]"
              >
                Dân tộc
              </label>
              <SelectEthnic control={ control } name="ethnic" errors={ errors } />
            </div>
            <InputCustom
              className=""
              name="citizenIdentificationNumber"
              label="Số CMND/CCCD"
              type="password"
              required
              control={ control }
              errors={ errors }
              placeholder="Nhập số CMND/CCCD"
            />
            <InputCustom
              className=""
              name="insuranceCode"
              label="Số thẻ BH"
              control={ control }
              errors={ errors }
              placeholder="Nhập số thẻ BHYT"
            />
            <div className="flex flex-col gap-1 col-span-2">
              <InputCustom
                label="Địa chỉ"
                className=""
                placeholder="Nhập địa chỉ cụ thể của bạn"
                name="address"
                type="text"
                id="address"
                required
                control={ control }
                errors={ errors }
              />
            </div>
          </div>

          <div className="mt-6 flex h-full w-auto flex-col items-center lg:gap-5 p-4 md:mt-0 md:border-l">
            <div className="w-40 h-40 rounded-full overflow-hidden">
              <img
                alt={ profileFetched?.data?.fullName }
                src={ `${import.meta.env.VITE_IMAGE_API_URL}/${imagePreview}` } className="object-contain w-full h-full" />
            </div>

            <div className="mt-4 w-full max-w-sm bg-white p-2 text-center">
              <Label htmlFor="picture" className="mb-1.5 block">
                Ảnh đại diện
              </Label>
              <Input id="picture" ref={ fileInputRef } onChange={ handleFileChange } type="file" />
            </div>
            <div className="mt-4 flex w-full justify-center gap-4 md:flex-wrap">
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  { ...register('gender') }
                  id="male"
                  type="radio"
                  value="Nam"
                  className="mr-3 size-4"
                  required
                />
                <label className="mr-2" htmlFor="male">Nam</label>
              </div>
              <div className="flex w-full items-center justify-center rounded-md border p-2 text-center sm:w-24">
                <input
                  { ...register('gender') }
                  id="female"
                  type="radio"
                  value="Nữ"
                  className="mr-3 size-4"
                  required
                />
                <label htmlFor="female">Nữ</label>
              </div>
            </div>
            <button
              type="submit"
              disabled={ isPendingUpdate }
              className="mt-5 hidden h-fit w-full rounded-md bg-primary-500 p-2 text-white md:flex md:justify-center"
            >
              { isPendingUpdate ? <SpinLoader /> : "Cập nhật" }
            </button>
          </div>
        </div>
        <div className="mt-auto block w-full px-4 pb-4 md:hidden md:px-4">
          <button
            type="submit"
            className="mt-4 h-fit w-full rounded-sm bg-primary-500 p-3 text-white"
          >
            Cập nhật
          </button>
        </div>
      </form>
    </div>
  );
};

export default UserInfoForm;
