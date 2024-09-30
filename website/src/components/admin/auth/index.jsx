import { Link } from "react-router-dom";
import brandLogo from "@/assets/images/brandLogo.png";
import InputCustom from "@/components/ui/InputCustom";
import { FaLock, FaPhoneAlt } from "react-icons/fa";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/zods/account";
import { RoleSelect } from "./RoleSelect";

const AuthComponent = () => {
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

    const onSubmit = (data) => {
        console.log(data);
    };

    return (
        <div className="bg-[#E8F2F7] h-dvh flex items-center justify-center">
            <div className="bg-white w-[70%] rounded-lg flex items-start justify-center p-10">
                <div className="flex-1 h-full pr-10">
                    <div className="relative w-60 mb-2 items-center">
                        <Link to={ "/" }>
                            <img src={ brandLogo } className="w-full" alt="Logo" />
                        </Link>
                    </div>
                </div>
                <div className="flex-1 pl-10 border-l border-gray-400">
                    <div>
                        <h2 className="text-3xl mb-1">
                            Đăng nhập
                        </h2>
                        <hr className="w-16 h-[3px] bg-primary-500 mb-3" />
                        <div className="mb-3">
                            <RoleSelect />
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
                            className="mt-5 mb-3 flex w-full items-center justify-center gap-3 rounded-md bg-primary-400 py-2 text-base font-semibold text-white hover:bg-primary-500"
                        >
                            Đăng nhập
                        </button>
                        <div className="flex items-center justify-center">
                            <Link
                                to="/forget-password"
                                className="text-sm font-bold italic text-primary-500 hover:underline"
                            >
                                Quên mật khẩu?
                            </Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
    );
};

export default AuthComponent;