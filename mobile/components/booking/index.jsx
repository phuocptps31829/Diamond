import { ScrollView, Text, View } from "react-native";
import ServiceItem from "./item/Service";
import { useSelector } from "react-redux";
import MainBookingForm from "./form/main-form";

const BookingComponent = () => {
    const itemData = useSelector((state) => state.booking.item);

    console.log("itemData", itemData);

    return (
        <ScrollView className="p-3">
            <Text className="font-semibold text-lg mb-1">
                Gói khám / Dịch vụ
            </Text>
            <View>
                <ServiceItem data={ itemData } />
            </View>
            <Text className="font-semibold text-lg my-2">
                Thông tin đặt lịch
            </Text>
            <MainBookingForm item={ itemData } />
        </ScrollView>
    );
};

export default BookingComponent;