import { View } from "react-native";
import BranchSelect from "../../selects/BranchSelect";
import DoctorSelect from "../../selects/DoctorSelect";
import { useState } from "react";

const MainBookingForm = ({ item }) => {
    const [branchID, setBranchID] = useState(null);
    const [doctorID, setDoctorID] = useState(null);
    const [date, setDate] = useState(null);
    const [time, setTime] = useState(null);

    const specialtyID = item?.specialty?._id;

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
                <DoctorSelect
                    branchID={ branchID }
                    specialtyID={ specialtyID }
                    onSelect={ setDoctorID }
                />
            </View>
            <View className="mt-2">
                <DoctorSelect
                    branchID={ branchID }
                    specialtyID={ specialtyID }
                    onSelect={ setDoctorID }
                />
            </View>
        </View>
    );
};

export default MainBookingForm;