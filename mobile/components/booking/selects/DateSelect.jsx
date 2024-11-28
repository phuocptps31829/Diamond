import { useState } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ToastUI from "../../ui/Toast";
import { workScheduleApi } from "../../../services/workSchedulesApi";
import { useQuery } from "@tanstack/react-query";
import { Calendar, CalendarList, Agenda, LocaleConfig } from 'react-native-calendars';
import Modal from "react-native-modal";

LocaleConfig.locales['vi'] = {
    monthNames: ['Tháng 1', 'Tháng 2', 'Tháng 3', 'Tháng 4', 'Tháng 5', 'Tháng 6', 'Tháng 7', 'Tháng 8', 'Tháng 9', 'Tháng 10', 'Tháng 11', 'Tháng 12'],
    monthNamesShort: ['Th.1', 'Th.2', 'Th.3', 'Th.4', 'Th.5', 'Th.6', 'Th.7', 'Th.8', 'Th.9', 'Th.10', 'Th.11', 'Th.12'],
    dayNames: ['Chủ Nhật', 'Thứ Hai', 'Thứ Ba', 'Thứ Tư', 'Thứ Năm', 'Thứ Sáu', 'Thứ Bảy'],
    dayNamesShort: ['CN', 'T2', 'T3', 'T4', 'T5', 'T6', 'T7'],
    today: 'Hôm nay'
};

LocaleConfig.defaultLocale = 'vi';

export const CalendarSelect = ({
    doctorID,
    branchID,
    onSelect,
}) => {
    const [selectedDate, setSelectedDate] = useState(new Date());
    const [showCalender, setShowCalender] = useState(false);

    const { data: scheduleData, isLoading, isError } = useQuery(({
        queryKey: ['workSchedules', doctorID, branchID],
        queryFn: () => workScheduleApi.getWorkSchedulesByDoctors(doctorID),
        enabled: !!doctorID,
    }));

    const isDateAvailable = (date) => {
        return scheduleData?.data?.some(
            (availableDate) =>
                availableDate.day === date,
        );
    };

    const onChange = (selectedDate) => {
        if (!scheduleData?.data?.length) {
            return;
        }

        const currentDate = new Date();

        if (selectedDate <= currentDate) {
            ToastUI({
                type: 'error',
                text1: 'Ngày không hợp lệ',
                text2: 'Vui lòng chọn ngày khám sau ngày hiện tại',
                time: 3000,
            });
            return;
        }

        if (!isDateAvailable(new Date(selectedDate).toISOString().slice(0, 10))) {
            ToastUI({
                type: 'error',
                text1: 'Không có lịch làm việc',
                text2: 'Bác sĩ không làm việc vào ngày này',
            });
            return;
        }

        setSelectedDate(selectedDate);
        onSelect(scheduleData?.data?.find(
            (availableDate) =>
                availableDate.day === new Date(selectedDate).toISOString().slice(0, 10)));
    };

    console.log('scheduleData: ', scheduleData);

    const slicedDate = new Date(selectedDate).toISOString().slice(0, 10);

    return (
        <SafeAreaView>
            <TouchableOpacity
                className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                onPress={ () => {
                    if (!doctorID) {
                        ToastUI({
                            type: 'error',
                            text1: 'Vui lòng chọn bác sĩ',
                            text2: 'Chọn bác sĩ để chọn ngày khám',
                        });
                        return;
                    }
                    setShowCalender(!showCalender);
                } }
            >
                <Fontisto name="date" size={ 20 } color="#C3C3C3" />
                <TextInput
                    className="p-2 text-base leading-5 flex-1 text-gray-700"
                    placeholder="Chọn ngày khám"
                    value={ selectedDate
                        ? new Date(selectedDate).toLocaleDateString("vi-VN")
                        : "" }
                    editable={ false }
                    pointerEvents="none"
                />
            </TouchableOpacity>
            <Modal
                isVisible={ showCalender }
                onBackdropPress={ () => setShowCalender(false) }
                backdropOpacity={ 0.5 }
            >
                <Calendar
                    onDayPress={ day => {
                        onChange(new Date(day.dateString));
                    } }
                    style={ {
                        borderRadius: 10,
                        overflow: 'hidden',
                        padding: 4,
                    } }
                    dayComponent={ ({ date, state }) => {
                        const currentDate = new Date().toISOString().slice(0, 10);
                        return (
                            <TouchableOpacity
                                onPress={ () => onChange(new Date(date.dateString)) }
                                className={ `flex justify-center ${slicedDate === date.dateString ? 'bg-[#007bbb]' : 'bg-white'} rounded-full h-9 w-9 relative` }
                            >
                                <Text
                                    className={ `text-center ${currentDate === date.dateString
                                        ? 'text-primary-600'
                                        : slicedDate === date.dateString
                                            ? 'text-white'
                                            : isDateAvailable(date.dateString)
                                                ? 'text-black'
                                                : 'text-gray-300'} text-[15px]` }
                                >{ date.day }</Text>
                            </TouchableOpacity>
                        );
                    } }
                />
            </Modal>
        </SafeAreaView>
    );
};