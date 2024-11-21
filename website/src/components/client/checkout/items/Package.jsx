import { changeBookingDetails } from "@/redux/bookingSlice";
import { formatCurrency } from "@/utils/format";
import { useEffect, useState } from "react";
import { IoMdRemove } from "react-icons/io";
import { useDispatch } from "react-redux";

const Package = ({
    pkg,
    selectedID,
    bookingDetails,
    onSelect,
    onRemove
}) => {
    const [packageLevel, setPackageLevel] = useState(pkg?.services?.[0]._id || '');
    const dispatch = useDispatch();

    const bookingDetail = bookingDetails.find(
        (detail) => detail?.medicalPackageID === pkg.medicalPackageID,
    );
    const isSelected = !!bookingDetail;
    const hasEmptyFields = bookingDetail
        ? Object.values(bookingDetail.bookingDetail).some(
            (value) => value !== 0 && !value,
        )
        : false;

    console.log(hasEmptyFields);

    useEffect(() => {
        setPackageLevel(pkg.levelID);
    }, [pkg.levelID]);

    const handleChangePackageLevel = (levelID) => {
        dispatch(
            changeBookingDetails({
                medicalPackageID: pkg.medicalPackageID,
                newChange: {
                    levelID,
                    price: pkg.services.find(service => {
                        return service._id === levelID;
                    }).discountPrice,
                }
            }));
        setPackageLevel(levelID);
    };

    return (
        <div className="relative py-3">
            <input
                className="peer hidden"
                id={ `radio_${pkg.medicalPackageID}` }
                type="radio"
                name="radio"
                checked={ pkg.medicalPackageID === selectedID }
                onClick={ () => onSelect(pkg.medicalPackageID) }
            />
            <span className={ `absolute right-4 top-1/2 box-content block h-3 w-3 -translate-y-1/2 rounded-full border-4 border-gray-300 bg-white ${hasEmptyFields ? 'peer-checked:border-red-500' : 'peer-checked:border-[#0067e2]'}` }>
                <span className={ `absolute right-1/2 translate-x-1/2 top-1/2 box-content block h-[0.5px] w-[0.5px] -translate-y-1/2 rounded-full border-[3px] border-gray-300 bg-white border-inherit` }>
                </span>
            </span>
            <label
                className={ `flex cursor-pointer select-none rounded-lg p-2 outline outline-gray-300 peer-checked:bg-gray-50 peer-checked:outline ${hasEmptyFields ? "peer-checked:outline-red-500" : "peer-checked:outline-primary-500"} ${hasEmptyFields ? "outline-red-500" : "outline-primary-500"}` }
                htmlFor={ `radio_${pkg.medicalPackageID}` }
            >
                <div className="flex items-center gap-3">
                    <img
                        src={ `${import.meta.env.VITE_IMAGE_API_URL}/${pkg.image}` }
                        className="w-[60px] sm:w-[75px] md:w-[180px] h-[140px] rounded-lg"
                        alt={ `Image of ${pkg.name}` }
                    />
                    <div className="flex flex-col justify-between h-full">
                        <div>
                            <p className="text-[13px] font-bold sm:text-[16px] md:text-[18px]">
                                { pkg.name }
                            </p>
                        </div>
                        <div>
                            <div className="flex items-center flex-wrap gap-2 pr-6 py-1">
                                { pkg?.services?.[0]._id ? pkg?.services?.map((service) => (
                                    <span
                                        onClick={ () => handleChangePackageLevel(service._id) }
                                        style={ {
                                            borderColor: service._id === packageLevel
                                                ? '#007ebc'
                                                : 'transparent',
                                        } }
                                        key={ service._id }
                                        className="text-[10px] md:text-[11px] rounded-sm px-2 py-[2px] bg-primary-500 bg-opacity-20 border-2 border-opacity-50"
                                    >
                                        { service.levelName }
                                    </span>
                                )) : 99 }
                            </div>
                            <p className="mt-1">
                                Giá: <span>{ formatCurrency(pkg.services.find(service => {
                                    return service._id === packageLevel;
                                })?.discountPrice) }</span>
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
                </div>
            </label>
            <div className="absolute -right-2 top-0 rounded-full bg-red-600 p-1 shadow-lg">
                <IoMdRemove
                    onClick={ () => onRemove(pkg.medicalPackageID, false) }
                    className="transform cursor-pointer text-lg text-white transition-transform hover:scale-110"
                />
            </div>
        </div>
    );
};

export default Package;