import { useState } from "react";
import Fontisto from '@expo/vector-icons/Fontisto';
import { Button, SafeAreaView, Text, TextInput, TouchableOpacity, View } from "react-native";
import DateTimePicker from '@react-native-community/datetimepicker';
import ToastUI from "../../ui/Toast";

export const CalendarSelect = () => {
    const [date, setDate] = useState(new Date());
    const [mode, setMode] = useState('date');

    const onChange = (_, selectedDate) => {
        const currentDate = new Date();

        if (selectedDate < currentDate) {
            ToastUI({
                type: 'error',
                text1: 'Ngày không hợp lệ',
                text2: 'Vui lòng chọn ngày khám sau ngày hiện tại',
            });
            return;
        }
        setDate(selectedDate);
    };

    const showMode = (currentMode) => {
        setMode(currentMode);
    };

    const showDatepicker = () => {
        showMode('date');
    };

    return (
        <SafeAreaView>
            <TouchableOpacity
                onPress={ showDatepicker }
                className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
            >
                <Fontisto name="date" size={ 20 } color="#C3C3C3" />
                <TextInput
                    className="p-2 text-base leading-5 flex-1 text-gray-700"
                    placeholder="Chọn ngày khám"
                    value={ date ? new Date(date).toLocaleDateString("vi-VN") : "" }
                    editable={ false }
                />
                <View className="w-full flex-row items-center absolute">
                    <DateTimePicker
                        style={ {
                            width: 500,
                            height: '100%',
                            flex: 1,
                        } }
                        testID="dateTimePicker"
                        value={ date }
                        mode={ mode }
                        is24Hour={ true }
                        onChange={ onChange }
                    />
                </View>
            </TouchableOpacity>
        </SafeAreaView>
    );
};