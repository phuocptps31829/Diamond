import React from 'react';
import { Stack, useLocalSearchParams } from 'expo-router';
import { useQuery } from '@tanstack/react-query';

import HeaderScreen from '../../components/ui/HeaderScreen';
import { packagesApi } from '../../services/packagesApi';
import Loading from '../../components/ui/Loading';
import NotFound from '../../components/ui/NotFound';
import DetailProduct from '../../components/detailProduct';
import Error from '../../components/ui/Error';

const DetailPackageScreen = () => {
    const { id } = useLocalSearchParams();

    const { data: packageData, isError, isLoading } = useQuery({
        queryKey: ["package", id],
        queryFn: () => packagesApi.getPackageByID(id)
    });

    return (
        <>
            <Stack.Screen
                options={ {
                    header: () => <HeaderScreen title={ packageData?.name || "Không tìm thấy" } />,
                } }
            />
            { isError ? <Error /> : !isLoading && !packageData ? <NotFound /> : isLoading ? <Loading /> : <DetailProduct data={ packageData } /> }
        </>
    );
};

export default DetailPackageScreen;