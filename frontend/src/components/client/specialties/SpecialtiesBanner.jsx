import banner from "../../../assets/images/young-asia-female-doctor-white-medical-uniform-using-clipboard-is-delivering-great-news-talk-discuss-results.jpg";

const specialtiesBanner = () => {
    return (
        <div className="mx-auto max-w-screen-2xl">
            <div className="relative w-full">
                <img
                    className="h-48 w-full object-cover sm:h-72 lg:h-80"
                    src={ banner }
                    alt="Doctor delivering great news"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                    <div className="text-center">
                        <h1 className="mb-3 text-[30px] font-bold text-primary-500 sm:text-[39px]">
                            Chuyên khoa Diamond
                        </h1>
                        <span className="px-5 text-[14px] font-medium sm:px-20 sm:text-[18px]">
                            Chọn chuyên khoa phù hợp với bạn nhất để được tư vấn và chăm sóc
                        </span>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default specialtiesBanner;
