import { View } from "react-native";
import BranchSelect from "../../selects/BranchSelect";
import DoctorSelect from "../../selects/DoctorSelect";
import { useState } from "react";
import { CalendarSelect } from "../../selects/DateSelect";
import DateTimePicker from '@react-native-community/datetimepicker';
import TimeSelect from "../../selects/TimeSelect";

const MainBookingForm = ({ item }) => {
    const [branchID, setBranchID] = useState(null);
    const [doctorID, setDoctorID] = useState(null);
    const [schedule, setSchedule] = useState(null);
    const [time, setTime] = useState(null);

    const specialtyID = item?.specialty?._id;

    console.log('schedule', schedule);

    return (
        <View>
            <View>
                <BranchSelect
                    specialtyID={ specialtyID }
                    onSelect={ setBranchID }
                />
            </View>
            <View className="mt-2">
                <DoctorSelect
                    branchID={ branchID }
                    specialtyID={ specialtyID }
                    onSelect={ setDoctorID }
                />
            </View>
            <View className="mt-2">
                <CalendarSelect
                    branchID={ branchID }
                    doctorID={ doctorID }
                    onSelect={ setSchedule }
                />
            </View>
            <View className="mt-2">
                <TimeSelect
                    onSelect={ setDoctorID }
                    timesList={ schedule?.time?.map((time, index) =>
                        ({ label: time, value: time })
                    ) }
                />
            </View>
        </View>
    );
};

export default MainBookingForm;