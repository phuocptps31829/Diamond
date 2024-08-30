import { Text, View } from "react-native";
import Ionicons from '@expo/vector-icons/Ionicons';

const Home = () => {
    return (
        <View className="text-red-600 pt-32 px-10">
            <Text className="text-teal-400 text-center">Open up App.js to start working on your app! My first App.
                <Ionicons name="checkmark-circle" size={ 32 } color="green" />
            </Text>
        </View>
    );
};

export default Home;