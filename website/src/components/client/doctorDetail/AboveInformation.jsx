import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/Skeleton";

export default function AboveInformation({ doctor, isLoading }) {
  if (isLoading)
    return (
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-10 md:px-10">
          <Skeleton className="block h-[400px] w-[400px] overflow-hidden rounded-full" />
          <div className="flex flex-col space-y-4">
            <div className="flex gap-4">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <Skeleton className="h-8 w-1/2 text-3xl" />
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <div className="flex gap-10">
              <Skeleton className="h-4 w-[80px]" />
              <Skeleton className="h-4 w-[110px]" />
            </div>
            <Skeleton className="h-12 w-full rounded-md" />
            <div className="flex flex-col space-y-3 rounded-md bg-white p-5 lg:min-w-[550px]">
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
              <Skeleton className="h-4" />
            </div>
          </div>
        </div>
      </div>
    );

  const { fullName, address, phoneNumber, gender, avatar } = doctor;

  return (
    <>
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-20 md:px-10">
          <div className="block max-h-[300px] w-full overflow-hidden rounded-lg sm:max-h-[400px] md:max-w-[400px]">
            <img
              src={`${import.meta.env.VITE_IMAGE_API_URL}/${avatar}`}
              className="h-full w-full object-cover object-center"
            />
          </div>
          <div className="flex w-full flex-col space-y-4 md:w-auto">
            <div className="text-3xl font-semibold uppercase">{fullName}</div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Chi nhánh:
              </strong>
              {doctor.otherInfo?.branch?.name}
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Chuyên khoa:
              </strong>
              {doctor.otherInfo?.specialty?.name}
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Chức vụ:
              </strong>
              Trưởng khoa Tai Mũi Họng
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Kinh nghiệm:
              </strong>
              {new Date().getFullYear() -
                new Date(doctor.otherInfo.yearsExperience).getFullYear()}{" "}
              năm
            </div>
            <div className="flex text-sm">
              <strong className="block w-[110px] whitespace-nowrap pr-2 md:pr-0">
                Giới tính:
              </strong>
              {gender}
            </div>
            <button className="w-full rounded-md bg-primary-500 p-3 text-white duration-500 hover:bg-primary-600">
              Đặt lịch hẹn
            </button>
            <div className="flex flex-col space-y-3 rounded-md bg-white p-5 lg:min-w-[550px]">
              <div className="flex text-[14px] md:text-[15px]">
                <strong className="block min-w-[80px] whitespace-nowrap pr-2 md:pr-0">
                  Liên hệ:
                </strong>
                {phoneNumber}
              </div>
              <div className="flex text-[14px] md:text-[15px]">
                <strong className="block min-w-[80px] whitespace-nowrap pr-2 md:pr-0">
                  Địa chỉ:
                </strong>
                {address}
              </div>
              <Link
                to="/none"
                className="flex items-center justify-center gap-2 text-primary-500 underline"
              >
                Xem bản đồ <FaMapLocationDot />
              </Link>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
