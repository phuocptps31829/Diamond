import React from 'react';
import { Text, View } from 'react-native';
import { conditions } from '../../constants/conditions';

const Condition = () => {
    return (
        <View className="mt-4 px-2 pb-4">
            <Text className="font-bold mb-2 text-lg">
                Điều kiện sử dụng gói khám:
            </Text>
            { conditions.map(c => <Text key={ c } className="mb-2 text-base">
                - { c }
            </Text>) }
        </View>
    );
};

export default Condition;