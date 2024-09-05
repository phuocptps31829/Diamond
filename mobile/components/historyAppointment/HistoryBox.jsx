import React from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';

const HistoryBox = () => {
    return (
        <View className="bg-white p-4 rounded-lg">
            <View className="flex-row justify-between">
                <Text className="text-primary-600 font-semibold">
                    Gia đình
                </Text>
                <Text className="text-primary-600 font-semibold">
                    Chờ xác nhận
                </Text>
            </View>
            <View className="flex-row gap-4 mt-0">
                <View>
                    <Image
                        className="h-16 w-24 rounded-md"
                        source={ { uri: "https://img.ykhoadiamond.com/uploads/package/04042023/20b07913-65c0-43b6-827f-1e5458c5dc8a.jpg" } }
                    />
                </View>
                <View className="flex-shrink">
                    <Text className="uppercase font-semibold text-lg" style={ { lineHeight: 24 } }>
                        Lấy mẫu xét nghiệm tại nhà
                    </Text>
                    <View className="flex-row items-center gap-2 -mt-1">
                        <FontAwesome6 name="clock-rotate-left" size={ 13 } color="gray" />
                        <Text className="font-semibold text-zinc-400">
                            14:30 - 02/09/2024
                        </Text>
                    </View>
                </View>
            </View>
            <View className="flex-row justify-between items-center border-gray-200 mt-4 py-4 border-t border-b">
                <Text className="font-medium text-zinc-500">
                    Loại: Gói khám
                </Text>
                <Text className="font-medium text-zinc-500">
                    Thành tiền: <Text className="text-zinc-800">1.000.999</Text>
                </Text>
            </View>
            <TouchableOpacity className="mt-4 w-40 flex-row justify-center self-end bg-primary-500 py-3 rounded-lg">
                <Text className="text-white w-full text-center font-semibold text-[15px]">
                    Chi tiết
                </Text>
            </TouchableOpacity>
        </View>
    );
};

export default HistoryBox;