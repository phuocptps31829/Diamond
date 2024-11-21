import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';
import HeaderScreen from '../../components/ui/HeaderScreen';
import Loading from '../../components/ui/Loading';
import NotFound from '../../components/ui/NotFound';
import Error from '../../components/ui/Error';
import { appointmentApi } from '../../services/appointmentsApi';
import DetailHistory from '../../components/detailHistory';

const DetailHistoryScreen = () => {
    const { id } = useLocalSearchParams();

    const { data, isError, isLoading } = useQuery({
        queryKey: ["history", id],
        queryFn: () => appointmentApi.getAppointmentById(id)
    });

    const historyData = data?.data;
    const name = historyData?.service?.name || historyData?.medicalPackage?.name;

    return (
        <>
            <Stack.Screen
                options={ {
                    header: () => <HeaderScreen title={ (name ? "Lịch sử " + name : '') || ((!isLoading && "Không tìm thấy")) } />,
                } }
            />
            { isError ?
                <Error /> :
                !isLoading && !historyData ?
                    <NotFound /> :
                    isLoading ?
                        <Loading /> :
                        <DetailHistory data={ historyData } /> }
        </>
    );
};

export default DetailHistoryScreen;