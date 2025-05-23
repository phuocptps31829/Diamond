import banner from "../../../assets/images/young-asia-female-doctor-white-medical-uniform-using-clipboard-is-delivering-great-news-talk-discuss-results.jpg";

const specialtiesBanner = () => {
  return (
    <>
      <div className="relative w-full h-[30vw] lg:h-[8vw]">
        <img
          src={ banner }
          alt="Doctor delivering great news"
          className="h-full w-full object-cover opacity-40"
        />
        <div className="absolute inset-0 flex h-full w-full items-center justify-center">
          <div className="mx-auto flex max-w-screen-xl flex-col items-center justify-center py-9 text-center">
            <h1 className="text-[30px] font-bold text-primary-500">
              Chuyên khoa Diamond
            </h1>
            <h4 className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
              Chọn chuyên khoa phù hợp với bạn nhất để được tư vấn và chăm sóc
            </h4>
          </div>
        </div>
      </div>
    </>
  );
};

export default specialtiesBanner;
