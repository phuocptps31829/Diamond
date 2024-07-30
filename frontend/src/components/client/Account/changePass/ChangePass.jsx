
import {  FaLock, FaEye  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const registerSchema = z.object({
  password: z.string().min(1, "Mật khẩu không được để trống!"),
  confirmPassword: z.string().min(1, "Nhập lại mật khẩu không được để trống!")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Mật khẩu không khớp!",
  path: ["confirmPassword"],
});


export default function ChangePassComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
  } = useForm({
    resolver: zodResolver(registerSchema),
    defaultValues: {
      phoneNumber: "",
      password: "",
      confirmPassword: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate('/');
  };
  return (
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Đặt lại mật khẩu</h1>
            <p className="mb-6 text-center text-sm text-gray-400">Đặt mật khẩu mới cho tài khoản của bạn</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Mật khẩu mới:</label>
                  <div className="relative">
                      <span className="absolute inset-y-0 left-0 md:left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
                      <Controller
                    name="password"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Mật khẩu"
                        type="password"
                        id="password"
                        {...field}
                        className={`w-full px-9 py-3 border-2 ${
                          errors.password ? 'border-red-500' : 'border-gray-200'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    )}
                  />

                      {/* <input placeholder="Mật khẩu mới" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  /> */}
                  <span className="absolute inset-y-0 right-5 md:right-5 flex items-center pl-3">
                        <FaEye className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                  </span>
                  </div>
                  {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
              </div>
                                
              <div className="mb-2">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Nhập lại mật khẩu:</label>
                  <div className="relative">
                      <span className="absolute inset-y-0 left-0 md:left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
                      
                      {/* <input placeholder="Nhập lại mật khẩu" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  /> */}
                      <span className="absolute inset-y-0 right-5 md:right-5 flex items-center pl-3">
                        <FaEye className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
                      <Controller
                    name="confirmPassword"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Nhập lại mật khẩu"
                        type="password"
                        id="confirmPassword"
                        {...field}
                        className={`w-full px-9 py-3 border-2 ${
                          errors.confirmPassword ? 'border-red-500' : 'border-gray-200'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    )}
                    />
                  </div>
                  {errors.confirmPassword && (
                    <p className="text-red-500 text-sm mt-1">{errors.confirmPassword.message}</p>
                  )}
              </div>

              <div className="text-center mt-3">
                <button type="submit" className="font-bold text-2xl w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Đặt lại mật khẩu
                </button>
              </div>

            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
