import verifiedDoctorIcon from "../../../assets/images/Profile-2--Streamline-Milano.png";
import insuranceSupportIcon from "../../../assets/images/Insurance-4--Streamline-Milano.png";
import supportTeamIcon from "../../../assets/images/Support-Team-4--Streamline-Milano.png";

const items = [
    {
        imgSrc: verifiedDoctorIcon,
        title: "Bác sĩ được kiểm duyệt",
        description:
            "Mỗi bác sĩ tại Diamond đã trải qua một quá trình sàng lọc kỹ lưỡng.",
    },
    {
        imgSrc: insuranceSupportIcon,
        title: "Được hỗ trợ bởi bảo hiểm",
        description:
            "Các dịch vụ của nền tảng này có thể được bảo vệ lên đến 1 triệu đô la cho thiệt hại tài sản.",
    },
    {
        imgSrc: supportTeamIcon,
        title: "Đội ngũ hỗ trợ",
        description: "Đội ngũ hỗ trợ của Diamond sẽ hỗ trợ bạn 24/7.",
    },
];

const TrustedSafety = () => {
    return (
        <div className="px-3 mx-auto w-full max-w-screen-xl mt-4">
            <div className="bg-white py-6 px-8 text-center rounded-lg">
                <h2 className="mb-8 text-2xl font-semibold sm:text-3xl">
                    Tin Cậy Và An Toàn
                </h2>
                <div className="grid grid-cols-1 gap-5 sm:gap-24 sm:grid-cols-2 md:grid-cols-3">
                    { items.map((item, index) => (
                        <div key={ index } className="flex flex-col items-center">
                            <img
                                src={ item.imgSrc }
                                alt={ item.title }
                                className="mb-4 h-24 w-24 sm:h-32 sm:w-32"
                            />
                            <h3 className="mb-2 text-lg font-medium italic sm:text-xl">
                                { item.title }
                            </h3>
                            <p className="text-sm text-gray-600">{ item.description }</p>
                        </div>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default TrustedSafety;
