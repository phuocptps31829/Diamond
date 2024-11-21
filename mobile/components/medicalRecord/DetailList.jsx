import { useQuery } from "@tanstack/react-query";
import { appointmentApi } from "../../services/appointmentsApi";
import { formatDateTimeLocale } from "../../utils/format";
import { Text } from "react-native";
import Accordion from "../ui/Accordion";
import ResultItem from "./ResultItem";

const DetailList = () => {
    const { data: medicalRecords, isLoading } = useQuery({
        queryKey: ["patientMedicalRecords"],
        queryFn: () => appointmentApi.getAppointmentByPatient({ status: 'EXAMINED' })
    });

    return !isLoading ?
        medicalRecords?.data?.length ?
            medicalRecords.data.map((record, index) => <Accordion
                key={ index }
                value={ {
                    title: record.type + ' - ' + formatDateTimeLocale(record?.time),
                    content: <ResultItem results={ record?.results } />
                } }
            />) :
            <Text>Không có lịch sử khám bệnh</Text> : <Text>Loading...</Text>;
};

export default DetailList;