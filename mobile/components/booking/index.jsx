import { ScrollView, Switch, Text, TouchableOpacity, View } from "react-native";
import ServiceItem from "./item/Service";
import { useSelector } from "react-redux";
import MainBookingForm from "./form/main-form";
import HelpForm from "./form/help-form";
import { useState } from "react";
import ToastUI from "../ui/Toast";
import { Validate } from "../../utils/validate";
import ModalPayment from "./payment/Modal";

const BookingComponent = () => {
    const [enabledSwitch, setEnabledSwitch] = useState(false);
    const [isOpenModal, setIsOpenModal] = useState(false);
    const [branchID, setBranchID] = useState(null);
    const [doctorID, setDoctorID] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [time, setTime] = useState(null);
    const [helpForm, setHelpForm] = useState({
        fullName: '',
        phoneNumber: '',
        email: '',
        gender: '',
        dateOfBirth: '',
        occupation: '',
        ethnic: '',
        citizenIdentificationNumber: '',
        insuranceCode: '',
        address: ''
    });

    const profile = useSelector((state) => state.profile.profile);
    const itemData = useSelector((state) => state.booking.item);

    console.log("itemData", itemData);
    const handleSubmit = () => {
        if (!profile) {
            return;
        }

        if (!branchID || !doctorID || !schedule || !time) {
            ToastUI({
                type: 'error',
                text1: 'Vui lòng chọn đủ thông tin đặt lịch',
                text2: 'Chọn đủ thông tin đặt lịch để tiếp tục',
            });
            return;
        }

        if (enabledSwitch) {
            if (
                !helpForm.fullName ||
                !helpForm.phoneNumber ||
                !helpForm.gender ||
                !helpForm.dateOfBirth ||
                !helpForm.citizenIdentificationNumber ||
                !helpForm.address
            ) {
                ToastUI({
                    type: 'error',
                    text1: 'Vui lòng nhập đủ thông tin người đặt giúp',
                    text2: 'Nhập đủ thông tin bắt buộc (*) của người được đặt giúp.',
                });
                return;
            }

            if (!Validate.isPhoneNumber(helpForm.phoneNumber)) {
                ToastUI({
                    type: 'error',
                    text1: 'Số điện thoại không hợp lệ',
                    text2: 'Vui lòng nhập số điện thoại hợp lệ',
                });
                return;
            }

            if (helpForm.email && !Validate.isEmail(helpForm.email)) {
                ToastUI({
                    type: 'error',
                    text1: 'Email không hợp lệ',
                    text2: 'Vui lòng nhập email hợp lệ',
                });
                return;
            }

            if (!Validate.isCitizenIdentificationNumber(helpForm.citizenIdentificationNumber)) {
                ToastUI({
                    type: 'error',
                    text1: 'Số CCCD không hợp lệ',
                    text2: 'Vui lòng nhập số CCCD hợp lệ',
                });
                return;
            }
        }

        const payload = {
            patientID: profile._id,
            data: {
                workScheduleID: schedule._id,
                ...(itemData?.services?.length
                    ? { medicalPackageID: itemData._id }
                    : { serviceID: itemData._id }),
                type: "Khám lần 1",
                time: _combineDateTime(schedule.day, time),
                status: "PENDING",
                price: itemData.discountPrice,
            }
        };

        console.log("payload", payload);
        console.log("helpForm", helpForm);

        setIsOpenModal(true);
    };

    return (
        <>
            <ScrollView
                className="p-3"
                showsVerticalScrollIndicator={ false }
            >
                <View className="pb-3">
                    <Text className="font-semibold text-lg mb-1">
                        Gói khám / Dịch vụ
                    </Text>
                    <View>
                        <ServiceItem data={ itemData } />
                    </View>
                    <Text className="font-semibold text-lg my-2">
                        Thông tin đặt lịch
                    </Text>
                    <MainBookingForm
                        item={ itemData }
                        onSetBranchID={ setBranchID }
                        branchID={ branchID }
                        onSetDoctorID={ setDoctorID }
                        doctorID={ doctorID }
                        onSetSchedule={ setSchedule }
                        schedule={ schedule }
                        onSetTime={ setTime }
                        time={ time }
                    />
                    <View className="flex-row items-center">
                        <View className="pr-1">
                            <Text className="font-semibold text-base mt-2 text-gray-600">
                                💁 Đặt giúp người khác
                            </Text>
                        </View>
                        <Switch
                            className="mt-3"
                            value={ enabledSwitch }
                            style={ { transform: [{ scaleX: .8 }, { scaleY: .8 }] } }
                            trackColor={ { false: "#767577", true: "#007bbb" } }
                            onValueChange={ () => setEnabledSwitch(!enabledSwitch) }
                        />
                    </View>
                    { enabledSwitch && <HelpForm form={ helpForm } onSetForm={ setHelpForm } /> }
                </View>
            </ScrollView>
            <View className="pt-4 pb-7 px-4 bg-white">
                <TouchableOpacity
                    className="bg-primary-500 py-3 rounded-lg"
                    onPress={ handleSubmit }
                >
                    <Text className="text-center text-white uppercase font-semibold">
                        Thanh toán ngay
                    </Text>
                </TouchableOpacity>
            </View>
            { isOpenModal && (
                <ModalPayment
                    isOpen={ isOpenModal }
                    onClose={ () => setIsOpenModal(false) }
                />
            ) }
        </>
    );
};

const _combineDateTime = (date, time) => {
    return `${date}T${time}:00.000`;
};

export default BookingComponent;