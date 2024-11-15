import { Image, StyleSheet } from 'react-native';
import React from 'react';
import Animated, { useAnimatedStyle } from 'react-native-reanimated';
import FontAwesome from '@expo/vector-icons/FontAwesome';

const ChevronAccordion = ({ progress }) => {
    const iconStyle = useAnimatedStyle(() => ({
        transform: [{ rotate: `${progress.value * -180}deg` }],
    }));
    return (
        <Animated.View style={ iconStyle }>
            <Image source={ require('../../assets/Chevron.png') } style={ styles.chevron } />
            {/* <FontAwesome name="sort-down" size={ 24 } color="#80C7F6" style={ styles.chevron } /> */ }
        </Animated.View>
    );
};

export default ChevronAccordion;

const styles = StyleSheet.create({
    chevron: {
        width: 24,
        height: 24,
    },
});