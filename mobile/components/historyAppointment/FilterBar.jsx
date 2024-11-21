import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const filterBarAppointmentItems = [
    {
        title: "Tất cả",
        value: "ALL"
    },
    {
        title: "Chờ xác nhận",
        value: "PENDING"
    },
    {
        title: "Chờ khám",
        value: "CONFIRMED"
    },
    {
        title: "Đã khám",
        value: "EXAMINED"
    },
    {
        title: "Đã hủy",
        value: "CANCELLED"
    }
];

const FilterBar = ({ filter, onSetFilter }) => {
    return (
        <View>
            <ScrollView
                horizontal={ true }
                showsHorizontalScrollIndicator={ false }
                contentContainerStyle={ { paddingEnd: 40 } }
                className="flex-row gap-3 overflow-x-scroll px-5 mt-0"
            >
                { filterBarAppointmentItems.map((item, index) => <TouchableOpacity
                    key={ index }
                    onPress={ () => onSetFilter(item.value) }
                    className="rounded-xl overflow-hidden">
                    <Text
                        className={ `px-3 py-2 ${filter === item.value ? 'bg-primary-500 text-white' : 'bg-white text-gray-800'}` }>
                        { item.title }
                    </Text>
                </TouchableOpacity>) }
            </ScrollView>
        </View>
    );
};

export default FilterBar;