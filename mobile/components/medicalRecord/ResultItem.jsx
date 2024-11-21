import React from 'react';
import { Text, View } from 'react-native';

const ResultItem = ({ results }) => {
    return (
        <View className="overflow-y-scroll">
            { results.map((result, index) => (
                <View key={ index } className="border-b border-gray-200 px-5">
                    <View className="flex-row justify-between">
                        <Text className="text-primary-600 font-semibold">
                            Kết quả khám:
                        </Text>
                        <Text className="text-zinc-500">
                            { result.date }
                        </Text>
                    </View>
                    <View className="mt-2">
                        <Text className="text-zinc-500">
                            { result.content }
                        </Text>
                    </View>
                </View>
            )) }
        </View>
    );
};

export default ResultItem;