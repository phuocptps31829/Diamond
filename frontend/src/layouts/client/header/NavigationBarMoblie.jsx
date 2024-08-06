export default function NavigationBarMobile() {
  return (
    <nav className="fixed bottom-0 left-0 z-10 w-[500px] bg-white shadow-md">
      <div className="container mx-auto flex items-center justify-between px-4 py-4">
        <div className="flex items-center">
          <img src="logo.png" alt="Logo" className="h-8 w-auto" />
          <span className="ml-3 text-lg font-semibold text-blue-500">
            medpro
          </span>
        </div>
        <div className="flex items-center space-x-4">
          <button
            id="mobile-menu-button"
            className="block text-blue-500 focus:outline-none md:hidden"
          >
            <svg
              className="h-6 w-6"
              fill="none"
              stroke="currentColor"
              viewBox="0 0 24 24"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M4 6h16M4 12h16M4 18h16"
              ></path>
            </svg>
          </button>
        </div>
      </div>
      <div id="mobile-menu" >
        <div className="bg-white px-6 py-5 shadow-md">
          <div className="mb-4 flex items-center justify-between">
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Đăng ký
            </button>
            <button className="rounded bg-blue-500 px-4 py-2 text-white">
              Đăng nhập
            </button>
          </div>
          <ul className="space-y-4">
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Cơ sở y tế</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Dịch vụ y tế</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Khám sức khỏe doanh nghiệp</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Tin tức</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Hướng dẫn</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Liên hệ hợp tác</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Hỗ trợ Zalo</span>
              </a>
            </li>
            <li>
              <a href="#" className="flex items-center space-x-2 text-blue-500">
                <svg
                  className="h-5 w-5"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M4 6h16M4 12h16M4 18h16"
                  ></path>
                </svg>
                <span>Hỗ trợ Facebook</span>
              </a>
            </li>
          </ul>
        </div>
      </div>
    </nav>
  );
}
