import { Link } from "react-router-dom";
import { FaKey } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
import { useForm, Controller } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

const authCodeSchema = z.object({
  authCode: z.string().min(6, "Mã xác thực phải có ít nhất 6 ký tự").max(6, "Mã xác thực chỉ có 6 ký tự"),
});

export default function ChangePassAccuracyComponent() {
  const navigate = useNavigate();

  const { handleSubmit, control, formState: { errors } } = useForm({
    resolver: zodResolver(authCodeSchema),
    defaultValues: {
      authCode: "",
    },
  });

  const onSubmit = (data) => {
    console.log(data);
    navigate('/change-password');
  };

  return (
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Xác thực</h1>
            <p className="mb-6 text-center text-sm text-gray-500">Nhập mã xác thực để tiếp tục đặt lại mật khẩu</p>

            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-2 relative">
                <label htmlFor="authCode" className="block text-gray-700 font-semibold">Mã xác thực:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-[-2px] md:left-0 flex items-center pl-3">
                    <FaKey className="text-gray-400 w-5 h-5 " />
                  </span>
                  <Controller
                    name="authCode"
                    control={control}
                    render={({ field }) => (
                      <input
                        placeholder="Nhập mã xác thực:"
                        type="text"
                        id="authCode"
                        {...field}
                        className={`w-full px-8 md:px-10 py-3 border-2 ${
                          errors.authCode ? 'border-red-500' : 'border-gray-200'
                        } rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue`}
                      />
                    )}
                  />
                  {errors.authCode && (
                    <p className="text-red-500 text-sm mt-1">{errors.authCode.message}</p>
                  )}
                  <button
                    type="button"
                    className=" text-base absolute inset-y-0 right-0 flex items-center font-bold md:text-lg pr-3 text-primary-500 hover:text-blue-700"
                    style={{ paddingRight: '20px' }}
                  >
                    Nhận mã
                  </button>
                </div>
              </div>

              <div className="my-2 text-sm">
                <p>
                  Gửi lại mã xác thực sau
                  <strong className="ml-1 text-primary-500">
                    30 giây
                  </strong>
                </p>
              </div>

              <div className="text-center">
                <button type="submit" className="font-bold text-2xl w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Xác thực tài khoản
                </button>
              </div>
              <div className="flex items-center my-2">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4 text-gray-500 text-sm">Hoặc tiếp tục với</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>

              {/* GG - FB LOGIN */}
              <div className="block md:flex justify-center  md:space-x-2">
                <button
                  type="button"
                  className="flex w-[100%] items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-3 px-4 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-red-500 focus:ring-opacity-50 my-2">
                  <img src="https://static-00.iconduck.com/assets.00/google-icon-512x512-tqc9el3r.png" className="w-7 mr-2 md:mr-2" alt="Google icon" />
                  <span className="block mr-4 md:mr-0">
                    Tài khoản Google
                  </span>
                </button>
                <button
                  type="button"
                  className="flex w-[100%] items-center justify-center flex-2 md:flex-1 bg-customGray-50 bg-opacity-40 text-black py-1 md:py-1 px-2 md:px-1 rounded-lg hover:bg-opacity-60 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:ring-opacity-50 my-2">
                  <img src="https://static.vecteezy.com/system/resources/previews/018/930/698/original/facebook-logo-facebook-icon-transparent-free-png.png" className="w-12 mr-0 md:mr-0" alt="Facebook icon" />
                  <span className="block">
                    Tài khoản Facebook
                  </span>
                </button>
              </div>
              <div className="flex flex-col items-center mt-3 mb-10">
                <p className="text-center">
                  Bạn đã có tài khoản?
                  <Link to={'/login'} className="block md:inline text-primary-500 font-medium ml-1 hover:text-primary-800 hover:font-semibold">
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
