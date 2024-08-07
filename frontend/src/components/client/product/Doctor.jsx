import PropTypes from "prop-types";
import { Link } from "react-router-dom";
import { AiOutlineDoubleRight } from "react-icons/ai";

export default function DoctorProduct({
<<<<<<< HEAD
  _id,
=======
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
  userID,
  yearsExperience,
  specialtyName,
}) {
  return (
<<<<<<< HEAD
    <div className="overflow-hidden rounded-lg border flex flex-col">
      <Link
        to={`/doctor-detail/${_id}`}
=======
    <div className="overflow-hidden rounded-lg border">
      <Link
        to={`/doctor-detail/${userID._id}`}
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
        className="group flex w-full items-center justify-center !bg-white"
      >
        <img
          src={userID.avatar}
          alt=""
<<<<<<< HEAD
          className="ease w-full transform overflow-hidden sm:p-4 p-2 transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-col bg-white px-3 pb-3 h-full">
=======
          className="ease w-full transform overflow-hidden p-4 transition-transform duration-500 group-hover:scale-[1.05]"
        />
      </Link>
      <div className="flex flex-col bg-white px-3 pb-3">
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
        <Link
          to={`/doctor-detail/${userID._id}`}
          className="text-[9px] font-semibold text-[#7a7a7a] md:text-[13px]"
        >
          Chuyên khoa: {specialtyName}
        </Link>
        <Link
          to={`/doctor-detail/${userID._id}`}
<<<<<<< HEAD
          className="py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl grow"
=======
          className="py-2 text-[12px] font-bold sm:text-[14px] md:my-1 md:text-xl"
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
        >
          {userID.fullName}
        </Link>
        <hr className="mb-1 md:mb-3" />
        <div className="flex items-center justify-between text-[10px] font-medium sm:text-[14px]">
          <span>Kinh nghiệm:</span> {yearsExperience} năm
        </div>
        <div className="mt-3 flex items-center justify-center gap-1 rounded-md border border-primary-500 py-1 text-[10px] font-semibold text-primary-500 hover:cursor-pointer hover:bg-primary-500 hover:text-white md:py-2 md:text-[13px]">
          Đặt ngay <AiOutlineDoubleRight />
        </div>
      </div>
    </div>
  );
}

DoctorProduct.propTypes = {
<<<<<<< HEAD
  _id: PropTypes.string.isRequired,
=======
>>>>>>> cdc53e768fe006a9092f56331d16592bf8886e1d
  userID: PropTypes.shape({
    _id: PropTypes.string.isRequired,
    fullName: PropTypes.string.isRequired,
    avatar: PropTypes.string.isRequired,
  }).isRequired,
  yearsExperience: PropTypes.number.isRequired,
  specialtyName: PropTypes.string.isRequired,
};
