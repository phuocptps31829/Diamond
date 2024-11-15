import React, { useState } from 'react';
import { Image, Text, TouchableOpacity, View } from 'react-native';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { memberPromotions } from '../../constants/member-promotions';
import { useSelector } from 'react-redux';

const Member = () => {
    const [curTab, setCurTab] = useState(0);
    const profile = useSelector((state) => state.profile.profile);

    return (
        <>
            <View className="p-5 bg-white">
                <View className="flex-row justify-between rounded-xl overflow-hidden bg-primary-500">
                    <View className="flex p-4">
                        <View className="flex-row gap-2 mb-20">
                            <Image
                                source={ require("../../assets/fav.png") }
                                className="w-10 h-10 bg-white rounded-full"
                            />
                            <View>
                                <Text className="text-white font-semibold text-[17px]">
                                    { profile?.fullName }
                                </Text>
                                <Text className="text-white text-sm">
                                    { profile?.phoneNumber }
                                </Text>
                            </View>
                        </View>
                        <Text className="text-base text-white font-medium">
                            Thành viên Đồng
                        </Text>
                    </View>
                    <View className="bg-primary-700 p-4 items-center justify-between">
                        <FontAwesome5 name="question-circle" size={ 24 } color="#007BBB" />
                        <Image
                            className="w-8 h-8"
                            source={ require("../../assets/images/medal-cu.png") } />
                    </View>
                </View>
                <View className="mt-8">
                    <View className="border-gray-300 border-t-8 rounded-md" />
                    <View className="flex-row justify-between mt-2">
                        <Text>
                            0
                        </Text>
                        <Text>
                            10000
                        </Text>
                    </View>
                    <Text className="mt-2 text-zinc-500">
                        Cần 10000 điểm nữa để đạt Thành Viên Bạc
                    </Text>
                    <Text className="text-[13px] text-zinc-500">
                        (* Sau mỗi lần thăm khám sẽ được cộng 50 điểm)
                    </Text>
                </View>
            </View>
            <View className="p-5 mt-5 bg-white">
                <View className="flex-row justify-between border-b mb-4 border-primary-700">
                    { memberPromotions.map((m, i) => <TouchableOpacity
                        onPress={ () => setCurTab(i) }
                        key={ i }
                        className={ `items-center px-3 ${curTab === i ? "border-b border-primary-700" : ""}` }
                    >
                        <Image
                            className="w-6 h-6"
                            source={
                                i === 0 ? require("../../assets/images/medal-cu.png") :
                                    i === 1 ? require("../../assets/images/medal-sliver.png") :
                                        i === 2 ? require("../../assets/images/medal-gold.png") :
                                            i === 3 ? require("../../assets/images/medal-diamond.png") :
                                                ""
                            } />
                        <Text className="text-[15px] mt-1 pb-2 font-medium">
                            { m.title }
                        </Text>
                    </TouchableOpacity>) }
                </View>
                <View className="gap-4">
                    { memberPromotions[curTab].promotions.map((p, i) => <View
                        key={ i }
                        className="flex-row items-center"
                    >
                        <FontAwesome6 name="check-circle" size={ 18 } color="black" />
                        <Text className="ml-2">
                            { p }
                        </Text>
                    </View>) }
                </View>
            </View>
        </>
    );
};

export default Member;