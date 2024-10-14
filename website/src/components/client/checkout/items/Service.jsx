import { IoMdRemove } from "react-icons/io";

const Service = ({
    svc,
    selectedID,
    bookingDetails,
    onSelect,
    onRemove
}) => {
    const bookingDetail = bookingDetails.find(
        (detail) => detail?.serviceID === svc.serviceID,
    );
    console.log(svc);
    const isSelected = !!bookingDetail;
    const hasEmptyFields = bookingDetail
        ? Object.values(bookingDetail.bookingDetail).some(
            (value) => !value,
        )
        : false;

    return (
        <div className="relative py-3">
            <input
                className="peer hidden"
                id={ `radio_${svc.serviceID}` }
                type="radio"
                name="radio"
                checked={ svc.serviceID === selectedID }
                onClick={ () => onSelect(svc.serviceID) }
            />
            <span className={ `absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white ${hasEmptyFields ? 'peer-checked:border-red-500' : 'peer-checked:border-[#0067e2]'}` }>
                <span className={ `absolute right-1/2 translate-x-1/2 top-1/2 box-content block h-[0.5px] w-[0.5px] -translate-y-1/2 rounded-full border-[3px] border-gray-300 bg-white border-inherit` }>
                </span>
            </span>
            <label
                className={ `flex cursor-pointer select-none rounded-lg p-2 outline outline-gray-300 peer-checked:bg-gray-50 peer-checked:outline ${hasEmptyFields ? "peer-checked:outline-red-500" : "peer-checked:outline-primary-500"} ${hasEmptyFields ? "outline-red-500" : "outline-primary-500"}` }
                htmlFor={ `radio_${svc.serviceID}` }
            >
                <div className="flex items-center gap-4">
                    <img
                        src={ `${import.meta.env.VITE_IMAGE_API_URL}/${svc.image}` }
                        className="w-[60px] sm:w-[75px] md:w-[100px] rounded-lg"
                        alt={ `Image of ${svc.name}` }
                    />
                    <div className="flex flex-col">
                        <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                            { svc.name }
                        </p>
                        { isSelected && (
                            <span
                                className={ `text-sm ${hasEmptyFields ? "text-red-500" : "text-primary-500"} font-semibold` }
                            >
                                { hasEmptyFields
                                    ? "Chưa chọn đủ thông tin"
                                    : "Xem lại thông tin" }
                            </span>
                        ) }
                    </div>
                </div>
            </label>
            <div className="absolute -right-2 top-0 rounded-full bg-red-600 p-1 shadow-lg">
                <IoMdRemove
                    onClick={ () => onRemove(
                        svc?.serviceID || svc?.medicalPackageID,
                        svc.serviceID ? true : false
                    ) }
                    className="transform cursor-pointer text-lg text-white transition-transform hover:scale-110"
                />
            </div>
        </div>
    );
};

export default Service;