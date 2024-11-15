import React from 'react';
import { Image, ScrollView, View, Text } from 'react-native';
import { useSelector } from 'react-redux';
import { formatDateTimeLocale } from '../../utils/format';
import Accordion from '../ui/Accordion';
import DetailList from './DetailList';

const IMAGE_URL = process.env.EXPO_PUBLIC_IMAGE_API_URL;

const MedicalRecord = () => {
    const profile = useSelector((state) => state.profile.profile);

    return (
        <ScrollView className="p-3">
            <View className="bg-white rounded-lg">
                <View
                    className="flex-row justify-center items-center mt-6"
                >
                    <Image
                        className="h-32 w-32 rounded-full object-cover"
                        source={ { uri: `${IMAGE_URL}/${profile?.avatar}` } }
                    />
                </View>
                <View className="p-4">
                    <View className="flex-row">
                        <View className="flex-1 pr-3">
                            <Text className="text-primary-600 font-semibold">
                                Họ và tên
                            </Text>
                            <Text className="text-zinc-500">
                                { profile?.fullName }
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-primary-600 font-semibold">
                                Ngày sinh
                            </Text>
                            <Text className="text-zinc-500">
                                { formatDateTimeLocale(profile?.dateOfBirth, false) }
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row mt-4">
                        <View className="flex-1 pr-3">
                            <Text className="text-primary-600 font-semibold">
                                Giới tính
                            </Text>
                            <Text className="text-zinc-500">
                                { profile?.gender }
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-primary-600 font-semibold">
                                Số điện thoại
                            </Text>
                            <Text className="text-zinc-500">
                                { profile?.phoneNumber }
                            </Text>
                        </View>
                    </View>
                    <View className="flex-row mt-4">
                        <View className="flex-1 pr-3">
                            <Text className="text-primary-600 font-semibold">
                                CCCD
                            </Text>
                            <Text className="text-zinc-500">
                                { profile?.citizenIdentificationNumber }
                            </Text>
                        </View>
                        <View className="flex-1">
                            <Text className="text-primary-600 font-semibold">
                                Địa chỉ
                            </Text>
                            <Text className="text-zinc-500">
                                { profile?.address }
                            </Text>
                        </View>
                    </View>
                </View>
                <DetailList />
            </View>
        </ScrollView>
    );
};

export default MedicalRecord;