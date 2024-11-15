import React from 'react';
import { Image, Text, View } from 'react-native';
import { formatDateTimeLocale } from '../../utils/format';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const Result = ({ appointment }) => {
    console.log('ok', appointment?.results[0]);

    return (
        <View className="w-full">
            <View className="items-center">
                <Text className="font-semibold text-lg mb-1">
                    Chi tiết kết quả khám
                </Text>
                <Text>
                    Thời gian: { formatDateTimeLocale(appointment?.time) }
                </Text>
            </View>
            <View>
                { appointment?.results?.length ? (
                    appointment.results.map((result, index) => (
                        <View
                            key={ index }
                            className="mt-2 border-t border-primary-500 pt-1"
                        >
                            <View className="mt-1 flex-row items-center mb-1">
                                <Text className="font-semibold mr-1">Dịch vụ: </Text>
                                <Text className="text-primary-500">
                                    { result.service.name || "Không có dịch vụ" }
                                </Text>
                            </View>
                            <View className="mt-1 flex-row items-center mb-1">
                                <Text className="font-semibold mr-1">Chẩn đoán: </Text>
                                <Text className="text-primary-500">
                                    { result.diagnose || "Chưa có kết quả" }
                                </Text>
                            </View>
                            <View className="mt-1 mb-1">
                                <Text className="font-semibold mr-1">
                                    Hình ảnh liên quan:
                                </Text>
                                <Text className="text-primary-500 mt-2">
                                    { Array.isArray(result.images) &&
                                        result.images.length > 0 ? (
                                        result.images.map((image, imgIndex) => (
                                            <View key={ imgIndex }>
                                                <Image
                                                    className="h-[100px] w-[100px] cursor-pointer rounded-md object-cover"
                                                    source={ { uri: `${IMAGE_URL}/${image}` } }
                                                />
                                            </View>
                                        ))
                                    ) : (
                                        <Text>Không có hình ảnh</Text>
                                    ) }
                                </Text>
                            </View>
                        </View>
                    ))
                ) : (
                    <Text>Không có kết quả khám</Text>
                ) }
            </View>
        </View>
    );
};

export default Result;