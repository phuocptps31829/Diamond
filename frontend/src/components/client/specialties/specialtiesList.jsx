
import imageDoctor from "../../../assets/Virus-Theat-Found-1--Streamline-Milano.png";
const SpecialtiesList = () => {
  const items = new Array(16).fill({
    label: "Bác Sĩ Gia Đình",
    img: imageDoctor,
  });

  return (
    <div className="container mx-auto max-w-screen-2xl py-10 lg:py-10">
      <div className="mx-auto w-5/6">
        <h1 className="py-4 text-center text-2xl font-semibold sm:text-left">
          Chọn một chuyên khoa:
        </h1>
        <div className="grid grid-cols-2 gap-4 rounded-lg border border-black bg-white p-6 sm:grid-cols-3 lg:grid-cols-4 lg:p-6">
          {items.map((item, index) => (
            <div
              key={index}
              className="flex flex-col items-center gap-3 rounded-md border-2 border-dashed p-6"
            >
              <img
                src={item.img}
                alt="Bác Sĩ Gia Đình"
                className="size-24 object-cover"
              />
              <span className="mt-2 text-center">{item.label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default SpecialtiesList;
