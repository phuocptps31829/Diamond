import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function DoctorProduct({ doctor }) {
  if (!doctor) return null;

  console.log(doctor);

  return (
    <div className="flex flex-col overflow-hidden rounded-lg border">
      <Link
        to={ `/doctor/${doctor._id}` }
        className="group flex w-full items-center justify-center !bg-white"
      >
        <img
          src={ `${import.meta.env.VITE_IMAGE_API_URL}/${doctor.avatar}` }
          alt={ doctor.fullName }
          className="ease w-full transform overflow-hidden p-2 transition-transform duration-500 group-hover:scale-[1.05] sm:p-4"
        />
      </Link>
      <div className="flex h-full flex-col bg-white px-3 pb-3">
        <Link
          to={ `/doctor/${doctor._id}` }
          className="text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]"
        >
          Chuyên khoa: { doctor.otherInfo.specialty.name }
        </Link>
        <Link
          to={ `/doctor/${doctor._id}` }
          className="grow py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl"
        >
          { doctor.fullName }
        </Link>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between text-[10px] font-medium sm:text-[14px]">
          <span>Kinh nghiệm:</span>
          { new Date().getFullYear() - new Date(doctor.otherInfo.yearsExperience).getFullYear() } năm
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}