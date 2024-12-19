import React from 'react';
import { ActivityIndicator, FlatList, Text, View } from 'react-native';
import FilterBar from './FilterBar';
import HistoryBox from './HistoryBox';
import { useInfiniteQuery } from '@tanstack/react-query';
import { appointmentApi } from '../../services/appointmentsApi';
import Loading from '../ui/Loading';

const HistoryAppointment = () => {
    const [selectedFilter, setSelectedFilter] = React.useState("ALL");

    const {
        data,
        isLoading,
        error,
        fetchNextPage,
        hasNextPage,
        isFetchingNextPage
    } = useInfiniteQuery({
        queryKey: ["historyAppointment"],
        queryFn: ({ pageParam = 1 }) => appointmentApi.getAppointmentByPatient({
            page: pageParam,
            limit: 10,
            startDay: '2023-12-16',
            endDay: '2025-01-16'
        }),
        getNextPageParam: (lastPage) => lastPage?.page < lastPage?.totalPages ? lastPage?.page + 1 : undefined
    });

    if (error) {
        return (
            <View className="w-full h-full flex justify-center items-center">
                <Text>{ error?.message }</Text>
            </View>
        );
    }
    const mappedData = data?.pages?.flatMap(group => group.data);

    const filteredData = mappedData?.filter(item => selectedFilter !== "ALL"
        ? item.status === selectedFilter
        : true);

    console.log(data?.pages);

    if (isLoading) {
        return _loading();
    }

    return (
        <View className="flex-1">
            <FilterBar
                filter={ selectedFilter }
                onSetFilter={ setSelectedFilter }
            />
            { !filteredData?.length ? (
                _notFoundText()
            ) : (
                <View className="px-5 mt-3 h-full flex-1 pb-6">
                    <FlatList
                        data={ filteredData }
                        renderItem={ ({ item }) => <HistoryBox item={ item } /> }
                        contentContainerStyle={ { gap: 16 } }
                        keyExtractor={ item => item._id }
                        className=""
                        showsVerticalScrollIndicator={ false }
                        onEndReached={ hasNextPage && fetchNextPage }
                        ListFooterComponent={ isFetchingNextPage && <ActivityIndicator size="large" color="#007bbb" /> }
                    />
                </View>
            ) }
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
        <Loading />
    );
};

export default HistoryAppointment;