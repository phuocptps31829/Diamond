import { Button } from '@/components/ui/Button';
import { AiOutlineSchedule } from 'react-icons/ai';
import { Skeleton } from '@/components/ui/Skeleton';
import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addToCart } from '@/redux/cartSlice';
import { useNavigate } from 'react-router-dom';
import { toastUI } from '@/components/ui/Toastify';
import { initBookingDetails } from '@/redux/bookingSlice';

const ServiceDetail = ({ medicalPackage, service, isLoading }) => {
    const [selectedService, setSelectedService] = useState(null);
    const cartItems = useSelector((state) => state.cart.cart);
    const userProfile = useSelector((state) => state.auth.userProfile);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    useEffect(() => {
        if (medicalPackage?.services?.length > 0) {
            setSelectedService(medicalPackage.services[0]);
        }
    }, [medicalPackage]);

    const product = service || medicalPackage;
    const isService = !(product?.services?.length > 0);

    const isInCart = cartItems.some((item) =>
        isService
            ? item.serviceID === product?._id
            : item.medicalPackageID === product?._id
    );
    const handleAddToCart = () => {
        if (!userProfile) {
            toastUI("Vui lòng đăng nhập để đặt lịch", "warning");
            return;
        }

        const newItem = isService
            ? {
                serviceID: product._id,
                name: product.name,
                specialtyID: product.specialty._id,
                price: product.discountPrice,
                image: product.image,
            }
            : {
                medicalPackageID: product._id,
                name: product.name,
                levelID: selectedService._id,
                specialtyID: product.specialty._id,
                price: selectedService.discountPrice,
                levelName: selectedService.levelName,
                image: product.image,
                services: product.services,
            };

        if (!isInCart) {
            dispatch(addToCart(newItem));
            dispatch(
                initBookingDetails({
                    ...(isService
                        ? {
                            serviceID: product._id,
                        }
                        : {
                            medicalPackageID: product._id,
                        }),
                    bookingDetail: {
                        specialtyID: product.specialty._id,
                        ...(isService ? {} : { levelID: selectedService._id }),
                        image: product.image,
                        name: product.name,
                        price: selectedService.discountPrice || 0,
                        selectedBranchID: "",
                        selectedDoctorID: "",
                        selectedWorkScheduleID: "",
                        selectedDate: "",
                        selectedTime: "",
                        clinic: "",
                    },
                })
            );
        }
        navigate('/booking');
    };

    if (isLoading) {
        return (
            <div className="mx-auto max-w-screen-2xl pb-4">
                <div className="mx-auto grid max-w-7xl grid-cols-1 gap-4 rounded-md  bg-white p-8 md:grid-cols-2 md:py-10">
                    <div className="container flex items-center justify-center">
                        <Skeleton className="h-[400px] w-[400px] overflow-hidden rounded-md" />
                    </div>
                    <div className="flex flex-col items-start justify-center text-start">
                        <Skeleton className="mb-4 h-8 w-3/4 md:h-12" />
                        <div className="my-4 flex items-center gap-2">
                            <Skeleton className="h-6 w-6" />
                            <Skeleton className="h-6 w-1/2" />
                        </div>
                        <Skeleton className="mb-4 h-6 w-full" />
                        <Skeleton className="mb-4 h-6 w-full" />
                        <Skeleton className="mb-4 h-6 w-full" />
                        <Skeleton className="mb-6 h-8 w-1/2" />
                        <div className="mb-4 flex w-full items-center gap-3">
                            <Skeleton className="h-12 w-full" />
                        </div>
                    </div>
                </div>
            </div>
        );
    }
    return (
        <div className="mx-auto max-w-screen-2xl pb-4">
            <div className="mx-auto grid max-w-7xl grid-cols-1 gap-10 rounded-md bg-white md:grid-cols-2 p-4">
                <div className="flex items-center h-[450px]">
                    <img
                        src={ `${import.meta.env.VITE_IMAGE_API_URL}/${product?.image}` }
                        alt={ product?.name }
                        className="rounded-md object-cover md:object-fill w-full h-full"
                    />
                </div>
                <div className="flex pt-4 flex-col items-start justify-between w-full text-start">
                    <div>
                        <h4>{ isService ? "Dịch vụ" : "Gói khám" }</h4>
                        <h3 className="text-xl mt-2 font-bold md:text-3xl">{ product.name }</h3>
                        <div className="my-2 flex items-center gap-2">
                            <AiOutlineSchedule size={ 25 } />
                            <span className="text-sm font-bold !text-gray-700">
                                { product.orderCount || 0 } lượt đã đặt
                            </span>
                        </div>
                        <p className="mb-4 w-full text-justify text-sm font-normal leading-[27px] text-gray-600">
                            { product.shortDescription }
                        </p>
                    </div>
                    <div>
                        { product?.services && <div className="w-full mb-4">
                            <h4 className="text-lg font-semibold mb-2">Cấp độ gói:</h4>
                            <ul className="flex items-center gap-3 list-inside">
                                { product?.services?.map((item) => (
                                    <li
                                        key={ item._id }
                                        className={ `hover:border-primary-600 text-sm border py-2 px-3 rounded-lg font-normal text-gray-600 cursor-pointer ${selectedService?._id === item._id ? 'border-primary-600 bg-primary-50 text-primary-500' : 'border-primary-200'}` }
                                        onClick={ () => setSelectedService(item) }
                                    >
                                        { item.levelName }
                                    </li>
                                )) }
                            </ul>
                        </div> }
                        <div className="flex flex-1 w-full items-end gap-3">
                            <div className='w-full'>
                                <span className="mb-4 block text-lg font-medium">
                                    <strong className="font-semibold mr-2">Giá:</strong>
                                    <span className="text-gray-600 line-through mr-2 font-semibold text-base">
                                        { !isService
                                            ? selectedService?.price.toLocaleString()
                                            : service.price.toLocaleString()
                                        } đ
                                    </span>
                                    <span className="text-primary-500 font-semibold">
                                        { !isService
                                            ? selectedService?.discountPrice.toLocaleString()
                                            : service.discountPrice.toLocaleString()
                                        } đ
                                    </span>
                                </span>
                                <Button
                                    className=""
                                    size="lg"
                                    variant="custom"
                                    onClick={ handleAddToCart }
                                >
                                    { isInCart ? 'Thanh toán ngay' : 'Đặt lịch ngay' }
                                </Button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ServiceDetail;
