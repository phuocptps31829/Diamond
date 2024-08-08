import { Link } from "react-router-dom";
import { FaPhoneAlt, FaLock } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import InputCustom from "@/components/ui/InputCustom";
import { registerSchema } from "@/zods/register";

export default function RegisterComponent() {
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
    navigate('/accuracy');
  };

  return (
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-screen-xl px-10 py-5">
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* ADS BANNER */ }
          <div className="bg-gray-200 shadow-lg hidden md:block">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOwyLlse4nIWK6PGSl3LBlvnQuAnfSOHGCvA&s" className="w-full h-full object-cover" alt="Ad Banner" />
          </div>

          {/* FORM */ }
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg ">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Đăng kí tài khoản</h1>
            <p className="mb-6 text-center text-sm text-gray-400">Đăng kí ngay để sử dụng dịch vụ</p>

            <form onSubmit={ handleSubmit(onSubmit) }>
              <div className="mb-2">
                <label htmlFor="phone" className="block text-gray-700 font-semibold">Số điện thoại:</label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1 "
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
                <label htmlFor="password" className="block text-gray-700 font-semibold">Mật khẩu:</label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1 "
                    placeholder="Nhập mật khẩu"
                    name="password"
                    type="password"
                    id="password"
                    icon={ <FaLock></FaLock> }
                    control={ control }
                    errors={ errors }
                  />
                </div>
              </div>

              <div className="mb-2">
                <label htmlFor="confirmPassword" className="block text-gray-700 font-semibold">Nhập lại mật khẩu:</label>
                <div className="relative">
                  <InputCustom
                    className="col-span-1 sm:col-span-1 "
                    placeholder="Nhập lại mật khẩu"
                    name="confirmPassword"
                    type="password"
                    id="confirmPassword"
                    icon={ <FaLock></FaLock> }
                    control={ control }
                    errors={ errors }
                  />


                </div>
              </div>

              <div className="text-center my-3">
                <button type="submit" className="font-bold text-2xl w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Đăng kí tài khoản
                </button>
              </div>

              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-800 text-sm">Hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* GG - FB LOGIN */ }
              <div className="block md:flex justify-center md:space-x-2">
                <button
                  type="button"
                  className="flex w-[100%] bg-gray-500 items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-3 px-4 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 my-2">
                  <img src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" className="w-7 mr-2 md:mr-2" alt="Google icon" />
                  <span className="block mr-4 md:mr-0">
                    Tài khoản Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-[100%] bg-gray-500 items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-1 md:py-1 px-2 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 my-2">
                  <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" className="w-12 mr-0 md:mr-0" alt="Facebook icon" />
                  <span className="block">
                    Tài khoản Facebook
                  </span>
                </button>
              </div>

              <div className="flex flex-col items-center mt-3 mb-10">
                <p className="text-center">
                  Bạn đã có tài khoản?
                  <Link to={ '/login' } className="block md:inline text-primary-500 font-medium ml-1 hover:text-primary-800 hover:font-semibold">
                    Đăng nhập ngay!
                  </Link>
                </p>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}
