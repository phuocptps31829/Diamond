
import {  FaLock  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { passwordSchema } from "@/zods/password";
import InputCustom from "@/components/ui/inputCustom";



export default function ChangePassComponent() {
  const navigate = useNavigate();
  const {
    handleSubmit,
    formState: { errors },
    control,
    
  } = useForm({
    resolver: zodResolver(passwordSchema),
    defaultValues: {
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
                  <InputCustom
                        className="col-span-1 sm:col-span-1 "
                        placeholder="Nhập mật khẩu"
                        name="password"
                        type="password"
                        id="password"
                        icon={<FaLock></FaLock>}
                        control={control}
                        errors={ errors }
                  />

                      {/* <input placeholder="Mật khẩu mới" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  /> */}
                  </div>
              </div>
                                
              <div className="mb-2">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Nhập lại mật khẩu:</label>
                  <div className="relative">

                      <InputCustom
                        className="col-span-1 sm:col-span-1 "
                        placeholder="Nhập lại mật khẩu"
                        name="confirmPassword"
                        type="password"
                        id="confirmPassword"
                        icon={<FaLock></FaLock>}
                        control={control}
                        errors={ errors }
                  />
                  </div>
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
