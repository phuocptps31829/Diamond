import { useState } from "react";
import { Link } from "react-router-dom";
import { FaMapLocationDot } from "react-icons/fa6";
import { Skeleton } from "@/components/ui/Skeleton";
import { LuGitBranchPlus } from "react-icons/lu";
import { FaRegHospital } from "react-icons/fa";
import { FaUserDoctor } from "react-icons/fa6";
import { ImProfile } from "react-icons/im";
import { FaTransgender } from "react-icons/fa6";
import badgeInternal from "@/assets/images/badgeInternal.png";
import badgeExternal from "@/assets/images/badgeExternal.png";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/AlertDialog";
import { LuBadgeCheck } from "react-icons/lu";
import { useNavigate } from "react-router-dom";
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

export default function AboveInformation({ doctor, isLoading }) {
  const navigate = useNavigate();
  const [open, setOpen] = useState(false);
  const [nameChoose, setNameChoose] = useState("packages");

  const handleSearch = () => {
    setOpen(false);
    navigate(
      `/${nameChoose}?page=1&limit=6&specialtyID=${doctor.otherInfo.specialty._id}`
    );
  };

  if (isLoading)
    return (
      <div className="mx-auto max-w-screen-xl">
        <div className="flex flex-col items-center justify-center space-y-5 px-5 md:flex-row md:space-x-10 md:px-10">
          <Skeleton className="block h-[400px] w-[400px] overflow-hidden rounded-lg" />
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
          <div className="relative block max-h-[300px] w-full overflow-hidden rounded-lg sm:max-h-[400px] md:max-w-[400px]">
            <img
              src={`${URL_IMAGE}/${avatar}`}
              className="h-full w-full object-cover object-center"
            />

            <div className="absolute right-2 top-2 z-10 w-9">
              <img
                src={
                  doctor.otherInfo.isInternal ? badgeInternal : badgeExternal
                }
                alt=""
              />
            </div>
          </div>
          <div className="flex w-full flex-col space-y-4 md:w-auto">
            <div className="text-3xl font-semibold uppercase">{fullName}</div>
            <div className="flex text-sm">
              <FaRegHospital size={17} className="mr-2" />
              <strong className="block w-[110px] items-center gap-2 whitespace-nowrap pr-2 md:pr-0">
                Chi nhánh:
              </strong>
              {doctor.otherInfo?.branch?.name}
            </div>
            <div className="flex text-sm">
              <LuGitBranchPlus size={17} className="mr-2" />
              <strong className="block w-[110px] items-center gap-2 whitespace-nowrap pr-2 md:pr-0">
                Chuyên khoa:
              </strong>
              {doctor.otherInfo?.specialty?.name}
            </div>
            <div className="flex text-sm">
              <FaUserDoctor size={17} className="mr-2" />
              <strong className="block w-[110px] items-center gap-2 whitespace-nowrap pr-2 md:pr-0">
                Chức vụ:
              </strong>
              Trưởng khoa Tai Mũi Họng
            </div>
            <div className="flex text-sm">
              <ImProfile size={17} className="mr-2" />
              <strong className="block w-[110px] items-center gap-2 whitespace-nowrap pr-2 md:pr-0">
                Kinh nghiệm:
              </strong>
              {new Date().getFullYear() -
                new Date(doctor.otherInfo.yearsExperience).getFullYear()}{" "}
              năm
            </div>
            <div className="flex text-sm">
              <FaTransgender size={17} className="mr-2" />
              <strong className="block w-[110px] items-center gap-2 whitespace-nowrap pr-2 md:pr-0">
                Giới tính:
              </strong>
              {gender}
            </div>
            <AlertDialog open={open} onOpenChange={setOpen}>
              <AlertDialogTrigger asChild>
                <button
                  onClick={() => setOpen(true)}
                  className="w-full rounded-md bg-primary-500 p-3 text-white duration-500 hover:bg-primary-600"
                >
                  Đặt lịch hẹn
                </button>
              </AlertDialogTrigger>
              <AlertDialogContent>
                <AlertDialogHeader>
                  <AlertDialogTitle>
                    Tìm kiếm đặt lịch hẹn theo:
                  </AlertDialogTitle>
                  <AlertDialogDescription>
                    <div className="mx-2 grid grid-cols-2 gap-5">
                      <div className="relative h-[150px] rounded-md sm:h-[200px]">
                        <img
                          src={`${URL_IMAGE}/1729875972_top-3-phong-kham-san-phu-khoa-binh-duong-uy-tin-va-chat-luong.webp`}
                          alt=""
                          className="h-full w-full rounded-md object-cover"
                        />
                        <div
                          className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#00000080] text-white"
                          onClick={() => setNameChoose("packages")}
                        >
                          Gói khám
                          {nameChoose === "packages" && (
                            <LuBadgeCheck
                              className="absolute right-0 top-0 ml-2"
                              color="#00FF22"
                              size={35}
                            />
                          )}
                        </div>
                      </div>
                      <div className="relative h-[150px] rounded-md sm:h-[200px]">
                        <img
                          src={`${URL_IMAGE}/1729876088_c631e2b7-9d26-4c40-8145-ac0b3a8b1d8c.jpg`}
                          alt=""
                          className="h-full w-full rounded-md object-cover"
                        />
                        <div
                          className="absolute top-0 flex h-full w-full cursor-pointer items-center justify-center rounded-md bg-[#00000080] text-white"
                          onClick={() => setNameChoose("services")}
                        >
                          Dịch vụ
                          {nameChoose === "services" && (
                            <LuBadgeCheck
                              className="absolute right-0 top-0 ml-2"
                              color="#00FF22"
                              size={35}
                            />
                          )}
                        </div>
                      </div>
                    </div>
                  </AlertDialogDescription>
                </AlertDialogHeader>
                <AlertDialogFooter>
                  <AlertDialogCancel onClick={() => setOpen(false)}>
                    Hủy
                  </AlertDialogCancel>
                  <AlertDialogAction
                    onClick={() => {
                      handleSearch();
                    }}
                  >
                    Tìm kiếm
                  </AlertDialogAction>
                </AlertDialogFooter>
              </AlertDialogContent>
            </AlertDialog>
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
