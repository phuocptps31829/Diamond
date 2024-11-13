import React from 'react';
import { FlatList, View } from 'react-native';
import FilterBar from './FilterBar';
import HistoryBox from './HistoryBox';
import { useQuery } from '@tanstack/react-query';
import { appointmentApi } from '../../services/appointmentsApi';

const HistoryAppointment = () => {
    const {
        data: dataHistory = [],
        error: errorHistory,
        isLoading
    } = useQuery({
        queryKey: ["HistoryAppointment"],
        queryFn: appointmentApi.getAppointmentByPatient,
    });

    if (errorHistory) {
        return (
            <View className="w-full h-full flex justify-center items-center">
                <Text>{ errorHistory?.message }</Text>
            </View>
        );
    }

    return (
        <View className="overflow-hidden">
            <FilterBar />
            <View className="px-5 mt-4">
                <FlatList
                    data={ dataHistory }
                    renderItem={ ({ item }) => <HistoryBox item={ item } /> }
                    contentContainerStyle={ { gap: 16 } }
                />
            </View>
        </View>
    );
};

export default HistoryAppointment;