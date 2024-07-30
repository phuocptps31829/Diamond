
import { Link } from "react-router-dom";
import { FaPhone, FaLock, FaEye } from "react-icons/fa";
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { accountSchema } from "@/zods/account";

export default function LoginComponent() {
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
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-screen-xl px-10 py-5" >
        <div className="grid grid-cols-1 md:grid-cols-2 ">
          {/* FORM */}
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg ">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Đăng nhập</h1>
            <p className="mb-6 text-center text-sm text-gray-400">Đăng nhập với số điện thoại và mật khẩu</p>
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2">
                <label htmlFor="phone" className="block text-gray-700 font-semibold">Số điện thoại:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaPhone className="text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  </span>
                  <Controller
                    name="phoneNumber"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Số điện thoại"
                        type="text"
                        id="phone"
                        {...field}
                        className={`w-full px-9 py-3 border-2 ${
                          errors.phoneNumber ? 'border-red-500' : 'border-gray-200'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500`}
                      />
                    )}
                  />
  
                </div>
                {errors.phoneNumber && (
                    <p className="text-red-500 text-sm mt-1">{errors.phoneNumber.message}</p>
                  )}
              </div>
              <div className="mb-2">
                <label htmlFor="password" className="block text-gray-700 font-semibold">Mật khẩu:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                    <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5" />
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
     
                  <span className="absolute inset-y-0 right-5 flex items-center pl-3">
                    <FaEye className="text-gray-400 w-4 md:w-5 h-4 md:h-5" />
                  </span>
                </div>
                {errors.password && (
                    <p className="text-red-500 text-sm mt-1">{errors.password.message}</p>
                  )}
              </div>
              <div className="my-3 flex items-center justify-between">
                <div className="flex items-center">
                  <input
                    type="checkbox"
                    id="remember"
                    className="form-checkbox h-4 w-4 text-blue-600 transition duration-150 ease-in-out"
                  />
                  <label htmlFor="remember" className="ml-2 block text-gray-700 text-sm">
                    Ghi nhớ tôi
                  </label>
                </div>
                <Link to="/forget-password" className="text-primary-500 text-sm italic font-bold hover:underline">
                  Quên mật khẩu?
                </Link>
              </div>
              <div className="text-center">
                <button className="font-bold text-2xl w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Đăng nhập
                </button>
              </div>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-800 text-sm">Hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              {/* GG - FB LOGIN */}
              <div className="block md:flex justify-center md:space-x-2">
                <button
                  type="button"
                  className="flex w-[100%] bg-gray-500 items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-3 px-4 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 my-2"
                >
                  <img src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" className="w-7 mr-2 md:mr-2" alt="Google icon" />
                  <span className="block mr-4 md:mr-0">
                    Tài khoản Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-[100%] bg-gray-500 items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-1 md:py-1 px-2 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 my-2"
                >
                  <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" className="w-12 mr-0 md:mr-0" alt="Facebook icon" />
                  <span className="block">
                    Tài khoản Facebook
                  </span>
                </button>
              </div>
              <div className="flex flex-col items-center mt-3 mb-10">
                <p className="text-center">
                  Bạn chưa có tài khoản?
                  <Link to={'/register'} className="block md:inline text-primary-500 font-medium ml-1 hover:text-primary-800 hover:font-semibold">
                    Đăng kí ngay!
                  </Link>
                </p>
              </div>
            </form>
          </div>
          {/* ADS BANNER */}
          <div className="bg-gray-200 shadow-lg hidden md:block">
            <img src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSOwyLlse4nIWK6PGSl3LBlvnQuAnfSOHGCvA&s" className="w-full h-full object-cover" alt="Ad Banner" />
          </div>
        </div>
      </div>
    </div>
  );
}
