
import {  FaLock, FaEye  } from "react-icons/fa";

export default function ChangePassComponent() {
  return (
    <div className="flex items-center justify-center h-auto bg-gray-100 py-20 px-2 md:px-3">
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1">
          {/* FORM */}
          <div className="bg-white py-16 md:py-20 px-5 md:px-11 shadow-lg">
            <h1 className="text-4xl md:text-5xl font-bold mb-2 text-center">Đặt lại mật khẩu</h1>
            <p className="mb-6 text-center text-sm text-gray-500">Đặt mật khẩu mới cho tài khoản của bạn</p>

            <form>
              <div className="mb-2">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Mật khẩu mới:</label>
                  <div className="relative">
                      <span className="absolute inset-y-0 left-0 md:left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
                      <input placeholder="Mật khẩu mới" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  />
                  <span className="absolute inset-y-0 right-5 md:right-5 flex items-center pl-3">
                        <FaEye className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                  </span>
                  </div>
              </div>
                                
              <div className="mb-2">
                  <label htmlFor="phone" className="block text-gray-700 font-semibold">Nhập lại mật khẩu:</label>
                  <div className="relative">
                      <span className="absolute inset-y-0 left-0 md:left-0 flex items-center pl-3">
                          <FaLock className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
                      <input placeholder="Nhập lại mật khẩu" type="text" id="phone" 
                      className="w-full 
                      px-9 py-3 border-2 border-gray-200 
                      rounded-md focus:outline-none focus:ring-2 
                      focus:ring-blue-500 focus:border-blue"  />
                      <span className="absolute inset-y-0 right-5 md:right-5 flex items-center pl-3">
                        <FaEye className="text-gray-400 w-4 md:w-5 h-4 md:h-5 " />                  
                      </span>
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
