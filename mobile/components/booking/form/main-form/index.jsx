import { View } from "react-native";
import BranchSelect from "../../selects/BranchSelect";
import DoctorSelect from "../../selects/DoctorSelect";
import { useState } from "react";
import { CalendarSelect } from "../../selects/DateSelect";
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeSelect from "../../selects/TimeSelect";

const MainBookingForm = ({
    item,
    branchID,
    onSetBranchID,
    doctorID,
    onSetDoctorID,
    schedule,
    onSetSchedule,
    time,
    onSetTime
}) => {
    const specialtyID = item?.specialty?._id;

    console.log('schedule', schedule);

    const handleSelectBranch = (branchID) => {
        onSetBranchID(branchID);
        onSetDoctorID(null);
        onSetSchedule(null);
    };

    const handleSelectDoctor = (doctorID) => {
        onSetDoctorID(doctorID);
        onSetSchedule(null);
    };

    const handleSelectSchedule = (schedule) => {
        onSetSchedule(schedule);
        onSetTime(null);
    };

    return (
        <View>
            <View>
                <BranchSelect
                    specialtyID={ specialtyID }
                    onSelect={ handleSelectBranch }
                />
            </View>
            <View className="mt-2">
                <DoctorSelect
                    branchID={ branchID }
                    specialtyID={ specialtyID }
                    onSelect={ handleSelectDoctor }
                />
            </View>
            <View className="mt-2">
                <CalendarSelect
                    branchID={ branchID }
                    doctorID={ doctorID }
                    onSelect={ handleSelectSchedule }
                    date={ schedule?.day }
                />
            </View>
            <View className="mt-2">
                <TimeSelect
                    time={ time }
                    onSelect={ onSetTime }
                    timesList={ schedule?.time?.map((time, index) =>
                        ({ label: time, value: time })
                    ) }
                />
            </View>
        </View>
    );
};

export default MainBookingForm;