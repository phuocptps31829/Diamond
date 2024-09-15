import React from 'react';
import { FlatList, View } from 'react-native';
import FilterBar from './FilterBar';
import HistoryBox from './HistoryBox';

const HistoryAppointment = () => {
    return (
        <View className="overflow-hidden">
            <FilterBar />
            <View className="px-5 mt-4">
                <FlatList
                    data={ [1, 2] }
                    renderItem={ ({ item }) => <HistoryBox /> }
                    contentContainerStyle={ { gap: 16 } }
                />
            </View>
        </View>
    );
};

export default HistoryAppointment;