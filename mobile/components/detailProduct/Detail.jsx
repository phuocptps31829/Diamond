import React from 'react';
import { Image, ScrollView, Text, View } from 'react-native';
import RenderHtml from 'react-native-render-html';
import { useWindowDimensions } from 'react-native';
import CompareLevel from './CompareLevel';
import Condition from './Condition';

const Detail = ({ data }) => {
    const { width } = useWindowDimensions();

    return (
        <ScrollView>
            <Image className="w-full h-56 object-cover" source={ { uri: data.image } } />
            <Text className="text-center mt-4 font-medium">
                { data?.services?.length ? "Gói khám" : "Dịch vụ" }
            </Text>
            <Text className="font-semibold text-center text-base">{ data.name }</Text>
            <View className="px-2">
                <RenderHtml
                    contentWidth={ width }
                    source={ { html: data.details } }
                />
                { data?.services?.length && <CompareLevel name={ data.name.toLowerCase() } services={ data.services } /> }
            </View>
            <Condition />
        </ScrollView>
    );
};

export default Detail;