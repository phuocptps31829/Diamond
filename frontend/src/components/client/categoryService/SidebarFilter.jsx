import { useState } from "react";
import { Checkbox } from "@/components/ui/Checkbox";

const SidebarFilter = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleAccordion = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="col-span-12 w-full max-md:mx-auto max-md:max-w-md md:col-span-3 md:max-w-72">
      <div className="box mt-7 w-full rounded-xl border border-gray-300 bg-white p-6">
        <div className="mb-7 flex w-full items-center justify-between border-b border-gray-200 pb-3">
          <p className="text-base font-medium leading-7 text-black">Lọc</p>
          <p className="cursor-pointer text-sm font-medium text-gray-500 transition-all duration-500 hover:text-primary-600">
            Làm mới
          </p>
        </div>
        <div className="mb-3 gap-2 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Lọc theo giá
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-lowest" />
              <label
                htmlFor="checkbox-lowest"
                className="text-sm font-normal text-gray-600"
              >
                Thấp nhất
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-highest" />
              <label
                htmlFor="checkbox-highest"
                className="text-sm font-normal text-gray-600"
              >
                Cao nhất
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 w-full border-b pb-2">
          <div className="grid grid-cols-1 gap-5 sm:gap-9">
            <div className="accordion">
              <button
                className="inline-flex w-full items-center justify-between leading-8 text-gray-600 transition duration-500 hover:text-primary-600 active:text-primary-600"
                onClick={toggleAccordion}
              >
                <h5 className="text-base font-medium text-gray-900">
                  Chuyên khoa
                </h5>
                <svg
                  className={`text-gray-900 transition duration-500 group-hover:text-primary-600 ${isOpen ? "rotate-180" : ""}`}
                  width="22"
                  height="22"
                  viewBox="0 0 22 22"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    d="M16.5 8.25L12.4142 12.3358C11.7475 13.0025 11.4142 13.3358 11 13.3358C10.5858 13.3358 10.2525 13.0025 9.58579 12.3358L5.5 8.25"
                    stroke="currentColor"
                    strokeWidth="1.6"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  ></path>
                </svg>
              </button>
              <div
                className={` ${isOpen ? "max-h-screen" : "max-h-0"} w-full overflow-hidden px-0 pr-4 transition-[max-height] duration-500 ease-in-out`}
              >
                <div className="box mt-5 flex flex-col gap-2">
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox-option-1" />
                    <label
                      htmlFor="checkbox-option-1"
                      className="text-sm font-normal text-gray-600"
                    >
                      option-1
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox-option-2" />
                    <label
                      htmlFor="checkbox-option-2"
                      className="text-sm font-normal text-gray-600"
                    >
                      option-2
                    </label>
                  </div>
                  <div className="flex items-center space-x-2">
                    <Checkbox id="checkbox-option-3" />
                    <label
                      htmlFor="checkbox-option-3"
                      className="text-sm font-normal text-gray-600"
                    >
                      option-3
                    </label>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
        <div className="mb-3 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Chi nhánh
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-default-1" />
              <label
                htmlFor="checkbox-default-1"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                ĐA KHOA 179
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-default-2" />
              <label
                htmlFor="checkbox-default-2"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                ĐA KHOA DIAMOND
              </label>
            </div>
          </div>
        </div>

        <div className="mb-3 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Loại
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-default-3" />
              <label
                htmlFor="checkbox-default-3"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                Gói khám
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-default-4" />
              <label
                htmlFor="checkbox-default-4"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                Dịch vụ
              </label>
            </div>
          </div>
        </div>
        <div className="mb-3 border-b pb-1">
          <p className="mb-3 text-base font-medium leading-6 text-black">
            Giới tính
          </p>
          <div className="box mb-3 flex flex-col gap-2">
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-gt-1" />
              <label
                htmlFor="checkbox-gt-1"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                Nam
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <Checkbox id="checkbox-gt-2" />
              <label
                htmlFor="checkbox-gt-2"
                className="text-sm font-normal leading-4 text-gray-600"
              >
                Nữ
              </label>
            </div>
          </div>
        </div>

        <button className="flex w-full items-center justify-center gap-2 rounded-full bg-primary-500 py-2.5 text-xs font-semibold text-white shadow-sm shadow-transparent transition-all duration-500 hover:bg-primary-700 hover:shadow-sm">
          <svg
            width="17"
            height="16"
            viewBox="0 0 17 16"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M14.4987 13.9997L13.1654 12.6663M13.832 7.33301C13.832 10.6467 11.1457 13.333 7.83203 13.333C4.51832 13.333 1.83203 10.6467 1.83203 7.33301C1.83203 4.0193 4.51832 1.33301 7.83203 1.33301C11.1457 1.33301 13.832 4.0193 13.832 7.33301Z"
              stroke="white"
              strokeWidth="1.6"
              strokeLinecap="round"
              strokeLinejoin="round"
            />
          </svg>
          Lọc
        </button>
      </div>
    </div>
  );
};

export default SidebarFilter;
