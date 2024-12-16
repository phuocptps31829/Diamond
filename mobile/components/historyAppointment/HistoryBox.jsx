import React from 'react';
import { useRouter } from 'expo-router';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { appointmentStatus, paymentStatus } from '../../constants/status';
import { formatCurrency, formatDateTimeLocale } from '../../utils/format';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const HistoryBox = ({ item }) => {
    const router = useRouter();
    const itemImage = item?.service?.image || item?.medicalPackage?.image;

    return (
        <View className="bg-white p-4 rounded-lg">
            <View className="flex-row justify-between">
                <Text className="text-primary-600 font-semibold">
                    { appointmentStatus[item.status]?.text }
                </Text>
                <Text className="text-primary-600 font-semibold">
                    { paymentStatus[item.payment.status] }
                </Text>
            </View>
            <View className="flex-row gap-4 mt-0">
                <View>
                    <Image
                        className="h-16 w-24 rounded-md"
                        source={ { uri: `${IMAGE_URL}/${itemImage}` } }
                    />
                </View>
                <View className="flex-shrink">
                    <Text className="uppercase font-semibold text-lg" style={ { lineHeight: 24 } }>
                        { item?.service?.name || item?.medicalPackage?.name }
                    </Text>
                    <View className="flex-row items-center gap-2 -mt-1">
                        <FontAwesome6 name="clock-rotate-left" size={ 13 } color="gray" />
                        <Text className="font-semibold text-zinc-400">
                            { formatDateTimeLocale(item.time, true) }
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between items-center border-gray-200 mt-4 py-4 border-t border-b">
                <Text className="font-medium text-zinc-500">
                    Loại: { item?.service ? 'Dịch vụ' : 'Gói khám' }
                </Text>
                <Text className="font-medium text-zinc-500">
                    Thành tiền: <Text className="text-zinc-800">
                        { formatCurrency(item?.service ? item.service.price : item.medicalPackage.level.price) }
                    </Text>
                </Text>
            </View>
            <TouchableOpacity
                className="mt-4 w-40 flex-row justify-center self-end bg-primary-500 py-3 rounded-lg"
                onPress={ () => router.push(`/detail-history/${item._id}`) }
            >
                <Text className="text-white w-full text-center font-semibold text-[15px]">
                    Chi tiết
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default HistoryBox;