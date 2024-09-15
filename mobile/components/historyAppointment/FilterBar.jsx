import React from 'react';
import { ScrollView, Text, TouchableOpacity, View } from 'react-native';

const filterBarAppointmentItems = [
    {
        title: "Tất cả"
    },
    {
        title: "Chờ xác nhận"
    },
    {
        title: "Chờ khám"
    },
    {
        title: "Hoàn thành"
    },
];

const FilterBar = () => {
    return (
        <ScrollView
            horizontal={ true }
            showsHorizontalScrollIndicator={ false }
            contentContainerStyle={ { paddingEnd: 40 } }
            className="flex-row gap-3 overflow-x-scroll px-5 mt-0"
        >
            { filterBarAppointmentItems.map((item, index) => <TouchableOpacity
                key={ index }
                className="rounded-xl overflow-hidden">
                <Text
                    className={ `px-3 py-2 ${index === 0 ? 'bg-primary-500 text-white' : 'bg-white text-gray-800'}` }>
                    { item.title }
                </Text>
            </TouchableOpacity>) }
        </ScrollView>
    );
};

export default FilterBar;