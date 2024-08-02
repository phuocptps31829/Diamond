import { Link } from "react-router-dom";
import imageDoctor from "../../../assets/images/Virus-Theat-Found-1--Streamline-Milano.png";
const SpecialtiesList = () => {
  const items = new Array(16).fill({
    label: "Bác Sĩ Gia Đình",
    img: imageDoctor,
  });

  return (
    <div className="container mx-auto max-w-screen-xl py-5 lg:py-10">
      <div className="mx-auto w-full md:w-5/6">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Chọn một chuyên khoa:
        </h1>
        <Link
          to="/none"
          className="grid grid-cols-2 gap-4 rounded-lg border bg-white p-6 shadow-lg sm:grid-cols-3 lg:grid-cols-4 lg:p-6"
        >
          {items.map((item, index) => (
            <div
              key={index}
              className="relative flex cursor-pointer flex-col items-center gap-3 rounded-md border border-dashed border-black"
            >
              <img
                src="https://hoangnguyenpharma.com.vn/wp-content/uploads/2019/06/NOI-SOI-TAI-MUI-HONG-2.jpg"
                alt="Bác Sĩ Gia Đình"
                className="size-24 h-auto w-full rounded-md object-cover"
              />
              <span className="absolute bottom-0 flex h-full w-full text-center text-white">
                <div className="h-fit w-full bg-[#0000009e] py-1 self-end mb-2">
                  {item.label}
                </div>
              </span>
            </div>
          ))}
        </Link>
      </div>
    </div>
  );
};

export default SpecialtiesList;
