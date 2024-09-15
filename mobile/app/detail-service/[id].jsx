import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import HeaderScreen from '../../components/ui/HeaderScreen';
import Loading from '../../components/ui/Loading';
import NotFound from '../../components/ui/NotFound';
import DetailProduct from '../../components/detailProduct';
import { getServiceByID } from '../../services/servicesApi';
import Error from '../../components/ui/Error';

const DetailServiceScreen = () => {
    const { id } = useLocalSearchParams();
    console.log(id);
    const { data: serviceData, isError, isLoading } = useQuery({
        queryKey: ["service", id],
        queryFn: () => getServiceByID(id)
    });

    console.log('s', serviceData);

    return (
        <>
            <Stack.Screen
                options={ {
                    header: () => <HeaderScreen title={ serviceData?.name || "Không tìm thấy" } />,
                } }
            />
            { isError ? <Error /> : !isLoading && !serviceData ? <NotFound /> : isLoading ? <Loading /> : <DetailProduct data={ serviceData } /> }
        </>
    );
};

export default DetailServiceScreen;