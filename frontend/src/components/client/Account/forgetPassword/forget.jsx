import { Link } from "react-router-dom";
import {  FaPhone  } from "react-icons/fa";
import { useNavigate } from 'react-router-dom';
export default function ForgetComponent() {
  const navigate = useNavigate();

  const handleButtonClick = () => {
    navigate('/changepassword_accuracy');
  };
  return (
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Quên mật khẩu</h1>
            <p className="mb-6 text-center text-sm text-gray-500">Đặt lại mật khẩu của bạn</p>

            <form className="relative">
              <div className="mb-2 relative">
                <label htmlFor="authCode" className="block text-gray-700 font-semibold">Số điện thoại:</label>
                <div className="relative">
                  <span className="absolute inset-y-0 left-[-2px] md:left-0 flex items-center pl-3">
                     <FaPhone className="text-gray-400 w-5 h-5 " />                  
                  </span>
                  <input
                    placeholder="Số điện thoại của bạn"
                    type="text"
                    id="authCode"
                    className="w-full px-8 md:px-10 py-3  border-2 border-gray-200 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue"
                  />
                </div>
              </div>

              <div className="my-2 text-sm italic text-right">
                  <Link to={'/login'} className="text-primary-500 text-lg italic font-bold hover:underline">
                    Quay lại
                  </Link>
              </div>

              <div className="text-center">
                <button   onClick={handleButtonClick} className="font-bold text-3xl w-full bg-primary-500 text-white py-2 px-4 rounded-md hover:bg-primary-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50">
                  Kiểm tra
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
                            Bạn chưa có tài khoản? 
                        <Link to={'/register'} className="block md:inline text-primary-500 font-medium ml-1 hover:text-primary-800 hover:font-semibold">
                            Đăng kí ngay!
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
