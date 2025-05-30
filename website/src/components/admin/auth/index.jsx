import { useNavigate } from "react-router-dom";
import banner from "@/assets/images/bannerloginadmin.jpg";
import InputCustom from "@/components/ui/InputCustom";
import { FaLock, FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/zods/client/account";
import { RoleSelect } from "./RoleSelect";
import { useState } from "react";
import { useMutation } from "@tanstack/react-query";
import { authApi } from "@/services/authApi";
import Cookies from "js-cookie";
import { toastUI } from "@/components/ui/Toastify";
import { useDispatch } from "react-redux";
import { setUserProfile } from "@/redux/authSlice";

const AuthComponent = () => {
    const [selectedRole, setSelectedRole] = useState("");

    const navigate = useNavigate();
    const dispatch = useDispatch();

    const {
        handleSubmit,
        formState: { errors },
        control,
    } = useForm({
        resolver: zodResolver(accountSchema),
        defaultValues: {
            phoneNumber: "",
            password: "",
        },
    });

    const { mutate: getUserProfile, isPending: isPendingProfile } = useMutation({
        cacheTime: 0,
        mutationFn: authApi.getProfileInfo,
        onSuccess: (data) => {
            const role = data.data.role.name;

            if (selectedRole !== role) {
                toastUI("Bạn không có quyền truy cập mục này.", "warning");
                return;
            }
            dispatch(setUserProfile(data.data));

            if (role === "SUPER_ADMIN" || role === "ADMIN") {
                navigate("/admin");
            }

            if (role === "DOCTOR") {
                navigate("/admin/doctor-dashboard");
            }

            if (role === "STAFF_RECEPTIONIST") {
                navigate("/admin/appointments/list");
            }

            if (role === "STAFF_ACCOUNTANT") {
                navigate("/admin/accountant-dashboard");
            }
        },
        onError: (err) => {
            console.log(err);
        },
    });

    const { mutate: login, isPending: isPendingLogin } = useMutation({
        mutationFn: authApi.login,
        onSuccess: (data) => {
            Cookies.set("accessToken", data.accessToken.token, {
                expires: new Date(data.accessToken.expires * 1000),
            });
            Cookies.set("refreshToken", data.refreshToken.token, {
                expires: new Date(data.refreshToken.expires * 1000),
            });

            setTimeout(() => {
                getUserProfile();
            }, 100);
        },
        onError: (err) => {
            console.log(err);
            const errorMessage =
                err.response?.data?.message ||
                err.message ||
                "Đã xảy ra lỗi, vui lòng thử lại.";
            toastUI(errorMessage || "Đăng nhập thất bại!", "error");
        },
    });

    const onSubmit = (data) => {
        if (!selectedRole) {
            toastUI("Vui lòng chọn quyền", "warning");
            return;
        }
        login({
            data,
            params: {
                isAdmin: true
            }
        });
    };

    return (
        <div className="bg-[#E8F2F7] h-dvh flex items-center justify-center">
            { isPendingLogin || isPendingProfile && <div className="absolute top-0 left-0 right-0 bottom-0 z-50"></div> }
            <div className="bg-white w-[70%] rounded-xl flex items-center justify-center p-10">
                <div className="flex-1 h-full pr-10 border-r border-gray-400">
                    <div className="relative w-full h-full">
                        <img src={ banner } className="w-full h-full object-cover rounded-xl" alt="Banner" />
                    </div>
                </div>
                <div className="flex-1 pl-10">
                    <div>
                        <h2 className="text-3xl mb-1">
                            Đăng nhập
                        </h2>
                        <hr className="w-16 h-[3px] bg-primary-500 mb-3" />
                        <div className="mb-3">
                            <RoleSelect role={ selectedRole } onSetSelectedRole={ setSelectedRole } />
                        </div>
                    </div>
                    <form onSubmit={ handleSubmit(onSubmit) }>
                        <div className="mb-2">
                            <label
                                htmlFor="phone"
                                className="block font-semibold text-gray-700"
                            >
                                Số điện thoại:
                            </label>
                            <div className="relative">
                                <InputCustom
                                    className="col-span-1 sm:col-span-1"
                                    placeholder="Nhập số điện thoại"
                                    name="phoneNumber"
                                    type="text"
                                    id="phoneNumber"
                                    icon={ <FaPhoneAlt></FaPhoneAlt> }
                                    control={ control }
                                    errors={ errors }
                                />
                            </div>
                        </div>
                        <div className="mb-2">
                            <label
                                htmlFor="password"
                                className="block font-semibold text-gray-700"
                            >
                                Mật khẩu:
                            </label>
                            <div className="relative">
                                <InputCustom
                                    className="col-span-1 sm:col-span-1"
                                    placeholder="Mật khẩu"
                                    name="password"
                                    type="password"
                                    id="password"
                                    icon={ <FaLock></FaLock> }
                                    control={ control }
                                    errors={ errors }
                                />
                            </div>
                        </div>
                        <button
                            disabled={ isPendingLogin || isPendingProfile }
                            className="mt-5 mb-3 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-base font-semibold text-white hover:bg-primary-500"
                        >
                            Đăng nhập
                            { isPendingLogin && (
                                <div className="mr-2 inline-block h-4 w-4 animate-spin rounded-full border-2 border-solid border-current border-r-transparent align-[-0.125em] motion-reduce:animate-[spin_1.5s_linear_infinite]"></div>
                            ) }
                        </button>
                        {/* <div className="flex items-center justify-center">
                                <Link
                                    to="/forget-password"
                                    className="text-sm font-bold italic text-primary-500 hover:underline"
                                >
                                    Quên mật khẩu?
                                </Link>
                            </div> */}
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;
