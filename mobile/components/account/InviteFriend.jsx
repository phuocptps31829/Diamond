import { Image, Text, TextInput, TouchableOpacity, View } from "react-native";

const InviteFriend = () => {
    return (
        <View>
            <Image className="w-full h-72 mb-4" resizeMode="contain" source={ require('../../assets/images/invitefr.png') } />
            <View className="px-4">
                <Text className="mb-2 text-base font-semibold">Mã giới thiệu</Text>
                <View className="relative">
                    <TextInput
                        value="0916512235"
                        placeholderTextColor="#5D5E60"
                        readOnly={ true }
                        className="bg-[#F8F9FD] rounded-md px-5 py-3 mb-4 text-[15px]"
                    />
                    <TouchableOpacity className="bg-primary-500 py-3 rounded-md absolute right-0 px-5">
                        <Text className="text-white text-center">Sao chép</Text>
                    </TouchableOpacity>
                </View>
                <View className="flex flex-row gap-3 justify-between">
                    <View className="rounded-md bg-primary-50 px-1 py-10 flex-1">
                        <Text className="font-semibold text-center text-4xl text-primary-600">0</Text>
                        <Text className="font-semibold mt-4 text-center text-[15px]">Người được giới thiệu</Text>
                    </View>
                    <View className="rounded-md bg-primary-50 px-1 py-10 flex-1">
                        <Text className="font-semibold text-center text-4xl text-primary-600">0</Text>
                        <Text className="font-semibold mt-4 text-center text-[15px]">Điểm tích lũy</Text>
                    </View>
                </View>
            </View>
        </View>
    );
};

export default InviteFriend;