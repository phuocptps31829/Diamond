import { AiOutlineSchedule } from 'react-icons/ai';
const URL_IMAGE = import.meta.env.VITE_IMAGE_API_URL;

const formatDate = (date) => {
    const newDate = new Date(date);
    const formattedDate = newDate.toLocaleDateString('vi-VN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
    });

    return formattedDate;
};

const InformationAbove = ({ packageDetail }) => {
    return (
        <div className="grid grid-cols-[30%,70%] rounded-lg bg-white p-6">
            <div className="mr-7 max-h-[300px] overflow-hidden rounded-sm">
                <img
                    src={URL_IMAGE + '/' + packageDetail.image}
                    alt=""
                    className="h-full w-full object-cover"
                />
            </div>
            <div className="text-[15px] leading-10">
                <h2 className="text-[22px] font-semibold">{packageDetail.name}</h2>
                <div className="my-1 flex items-center gap-2">
                    <AiOutlineSchedule size={25} />
                    <span className="text-sm font-bold !text-gray-700">
                        {packageDetail.orderCount} lượt đã đặt
                    </span>
                </div>
                <div className="font-semibold">
                    Chuyên khoa: <span>{packageDetail.specialty.name}</span>
                </div>
                <p className="mb-4 line-clamp-3 w-full max-w-full break-words text-justify text-sm font-normal leading-7 text-gray-600">
                    {packageDetail.shortDescription}
                </p>
                <div className="font-semibold">
                    Trạng thái:{' '}
                    <span className={`${!packageDetail.isHidden ? 'text-[#30BF00]' : ''} `}>
                        {!packageDetail.isHidden ? 'Hiển thị' : 'Ẩn'}
                    </span>
                </div>
                <div className="font-semibold">
                    Ngày tạo: <span>{formatDate(packageDetail.createdAt)}</span>
                </div>
            </div>
        </div>
    );
};

export default InformationAbove;
