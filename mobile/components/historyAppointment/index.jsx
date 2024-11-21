import React from 'react';
import { FlatList, Text, View } from 'react-native';
import FilterBar from './FilterBar';
import HistoryBox from './HistoryBox';
import { useQuery } from '@tanstack/react-query';
import { appointmentApi } from '../../services/appointmentsApi';
import Loading from '../ui/Loading';

const HistoryAppointment = () => {
    const [selectedFilter, setSelectedFilter] = React.useState("ALL");

    const {
        data,
        error,
        isLoading
    } = useQuery({
        queryKey: ["historyAppointment"],
        queryFn: appointmentApi.getAppointmentByPatient,
    });

    if (error) {
        return (
            <View className="w-full h-full flex justify-center items-center">
                <Text>{ error?.message }</Text>
            </View>
        );
    }

    const filteredData = data?.data?.filter(item => selectedFilter !== "ALL" ?
        item.status === selectedFilter :
        true);

    if (isLoading) {
        return _loading();
    }

    return (
        <View>
            <FilterBar
                filter={ selectedFilter }
                onSetFilter={ setSelectedFilter }
            />
            <View className="overflow-hidden">
                { !filteredData?.length ? (
                    _notFoundText()
                ) : (
                    <View className="px-5 mt-3">
                        <FlatList
                            data={ filteredData }
                            renderItem={ ({ item }) => <HistoryBox item={ item } /> }
                            contentContainerStyle={ { gap: 16 } }
                            className=""
                            showsVerticalScrollIndicator={ false }
                        />
                    </View>
                ) }
            </View>
        </View>
    );
};

const _notFoundText = () => {
    return (
        <View className="font-semibold text-[15px] w-full flex-col items-center justify-center h-full -mt-16">
            <Text className="font-semibold text-[15px]">
                Không tìm thấy lịch sử nào
            </Text>
        </View>
    );
};

const _loading = () => {
    return (
        <View className="w-full h-full flex justify-center items-center -mt-16">
            <Loading />
        </View>
    );
};

export default HistoryAppointment;