import { useQuery } from "@tanstack/react-query";
import { appointmentApi } from "../../services/appointmentsApi";
import { formatDateTimeLocale } from "../../utils/format";
import { ActivityIndicator, Text, View } from "react-native";
import Accordion from "../ui/Accordion";
import ResultItem from "./ResultItem";

const DetailList = () => {
    const { data: medicalRecords, isLoading } = useQuery({
        queryKey: ["patientMedicalRecords"],
        queryFn: () => appointmentApi.getAppointmentByPatient({ status: 'EXAMINED' })
    });

    if (isLoading) {
        return <View className="flex items-center justify-center h-80 rounded-md bg-white">
            <ActivityIndicator size="large" color="#007BBB" />
        </View>;
    }

    return medicalRecords?.data?.length ?
        medicalRecords.data.map((record, index) => <Accordion
            key={ index }
            value={ {
                title: record.type + ' - ' + formatDateTimeLocale(record?.time),
                content: <ResultItem results={ record?.results } />
            } }
        />) :
        <Text className="text-center py-3">Không có lịch sử khám bệnh</Text>;
};

export default DetailList;