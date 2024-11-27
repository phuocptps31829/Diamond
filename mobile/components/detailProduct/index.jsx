import React from 'react';
import Detail from './Detail';
import { Text, TouchableOpacity, View } from 'react-native';
import { useRouter } from 'expo-router';
import { useDispatch } from 'react-redux';
import { addItemToBook } from '../../store/booking/bookingSlice';

const DetailProduct = ({ data }) => {
    const router = useRouter();
    const dispatch = useDispatch();

    const handleBooking = () => {
        dispatch(addItemToBook(data));

        router.push('/booking');
    };

    return (
        <>
            <Detail data={ data } />
            <View className="pt-4 pb-10 px-6">
                <TouchableOpacity
                    className="bg-primary-500 py-4 rounded-lg"
                    onPress={ handleBooking }
                >
                    <Text className="text-center text-white uppercase font-semibold">
                        Đặt ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default DetailProduct;