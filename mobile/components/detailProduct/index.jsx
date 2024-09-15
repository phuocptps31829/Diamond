import React from 'react';
import Detail from './Detail';
import { Text, TouchableOpacity, View } from 'react-native';

const DetailProduct = ({ data }) => {
    return (
        <>
            <Detail data={ data } />
            <View className="pt-4 pb-10 px-6">
                <TouchableOpacity className="bg-primary-500 py-4 rounded-lg">
                    <Text className="text-center text-white uppercase font-semibold">
                        Đặt ngay
                    </Text>
                </TouchableOpacity>
            </View>
        </>
    );
};

export default DetailProduct;