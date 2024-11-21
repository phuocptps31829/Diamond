import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";
import badgeInternal from "@/assets/images/badgeInternal.png";
import badgeExternal from "@/assets/images/badgeExternal.png";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/Tooltip";

export default function DoctorProduct({ doctor }) {
  if (!doctor) return null;

  return (
    <div className="relative flex flex-col rounded-lg border">
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger>
            <div className="absolute right-2 top-2 z-10 w-9">
              <img
                src={
                  doctor.otherInfo.isInternal ? badgeInternal : badgeExternal
                }
                alt=""
              />
            </div>
          </TooltipTrigger>
          <TooltipContent>
            <p>
              {doctor.otherInfo.isInternal
                ? "Bác sĩ nội bộ"
                : "Bác sĩ bên ngoài"}
            </p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      <Link
        to={`/doctor/${doctor._id}`}
        className="group flex max-h-[120px] min-h-[120px] w-full items-center justify-center overflow-hidden rounded-t-lg !bg-white sm:max-h-[200px] sm:min-h-[200px]"
      >
        <img
          src={`${import.meta.env.VITE_IMAGE_API_URL}/${doctor.avatar}`}
          alt={doctor.fullName}
          className="ease h-full max-h-[120px] w-full transform overflow-hidden object-cover object-top transition-transform duration-500 group-hover:scale-[1.05] sm:max-h-[200px]"
        />
      </Link>
      <div className="flex h-full flex-col bg-white px-3 pb-3 pt-2">
        <Link
          to={`/doctor/${doctor._id}`}
          className="text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]"
        >
          Chuyên khoa: {doctor.otherInfo.specialty.name}
        </Link>
        <Link
          to={`/doctor/${doctor._id}`}
          className="grow py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl"
        >
          {doctor.fullName}
        </Link>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between text-[10px] font-medium sm:text-[14px]">
          <span>Kinh nghiệm:</span>
          {new Date().getFullYear() -
            new Date(doctor.otherInfo.yearsExperience).getFullYear()}{" "}
          năm
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}
