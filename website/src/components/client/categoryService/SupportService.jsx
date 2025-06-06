import avatarImg from "../../../assets/images/105124.jpg";
import mapImg from "../../../assets/images/2149377706.jpg";
import { Avatar, AvatarImage } from "@/components/ui/Avatar";

const services = [
    {
        img: avatarImg,
        title: "Hỗ trợ tư vấn gói khám",
        description: "Hỏi chuyên viên",
        link: "/",
    },
    {
        img: mapImg,
        title: "Hỗ trợ tư vấn gói khám",
        description: "Hỏi chuyên viên",
        link: "/",
    },
    {
        img: avatarImg,
        title: "Dịch vụ chăm sóc khách hàng",
        description: "Liên hệ ngay",
        link: "/",
    },
    {
        img: mapImg,
        title: "Dịch vụ cấp cứu 24/7",
        description: "Gọi ngay",
        link: "/",
    },
];

const SupportService = () => {
    return (
        <div className="mx-auto w-full max-w-screen-xl md:px-5 sm:px-4 p-3 sm:pt-5">
            <div className="h-auto w-full rounded-md bg-primary-500 py-3 px-6">
                <div className="flex flex-col items-start justify-start gap-5 md:flex-row md:items-center md:justify-around md:gap-6">
                    { services.map((service, index) => (
                        <a href={ service.link } key={ index }>
                            <div className="flex items-center gap-2">
                                <Avatar className="size-14 ">
                                    <AvatarImage src={ service.img } className="object-cover" />
                                </Avatar>
                                <div className="items-center text-white">
                                    <h2 className="text-sm font-normal md:text-base">
                                        { service.title }
                                    </h2>
                                    <span className="text-xs md:text-sm">
                                        { service.description }
                                    </span>
                                </div>
                            </div>
                        </a>
                    )) }
                </div>
            </div>
        </div>
    );
};

export default SupportService;
