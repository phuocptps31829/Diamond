import { useRouter } from "expo-router";
import { Text, View } from "react-native";

import Ionicons from '@expo/vector-icons/Ionicons';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';

const HeaderScreen = () => {
    const router = useRouter();

    return (
        <View className="flex px-4 justify-between bg-primary-500 items-center flex-row pt-16 pb-4">
            <Ionicons
                onPress={ () => router.back() }
                name="chevron-back-outline"
                size={ 28 }
                color="white"
            />
            <Text className="text-lg text-white font-semibold">
                Thay đổi mật khẩu
            </Text>
            <View className="opacity-0">
                <MaterialIcons
                    name="navigate-next"
                    size={ 28 }
                    color="black"
                />
            </View>
        </View>
    );
};

export default HeaderScreen;