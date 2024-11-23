import { Pressable, StyleSheet, Text, View } from 'react-native';
import React from 'react';
import Animated, {
    useAnimatedRef,
    useSharedValue,
    useAnimatedStyle,
    runOnUI,
    measure,
    useDerivedValue,
    withTiming,
} from 'react-native-reanimated';
import ChevronAccordion from './ChevronAccordion';

const Accordion = ({ value }) => {
    const listRef = useAnimatedRef();
    const heightValue = useSharedValue(0);
    const open = useSharedValue(false);
    const progress = useDerivedValue(() =>
        open.value ? withTiming(1) : withTiming(0),
    );

    const heightAnimationStyle = useAnimatedStyle(() => ({
        height: heightValue.value,
    }));

    return (
        <View style={ styles.container }>
            <Pressable
                onPress={ () => {
                    if (heightValue.value === 0) {
                        runOnUI(() => {
                            'worklet';
                            heightValue.value = withTiming(measure(listRef).height);
                        })();
                    } else {
                        heightValue.value = withTiming(0);
                    }
                    open.value = !open.value;
                } }
                style={ styles.titleContainer }>
                <Text style={ styles.textTitle }>{ value.title }</Text>
                <ChevronAccordion progress={ progress } />
            </Pressable>
            <Animated.View style={ heightAnimationStyle }>
                <Animated.View style={ styles.contentContainer } ref={ listRef }>
                    { value.content }
                </Animated.View>
            </Animated.View>
        </View>
    );
};

export default Accordion;

const styles = StyleSheet.create({
    container: {
        backgroundColor: '#f2f7fc',
        marginHorizontal: 10,
        marginVertical: 8,
        borderRadius: 8,
        borderWidth: 1,
        borderColor: '#9dd8ff',
        overflow: 'hidden',
    },
    textTitle: {
        fontSize: 16,
        color: 'black',
    },
    titleContainer: {
        paddingLeft: 20,
        paddingRight: 20,
        paddingTop: 12,
        paddingBlock: 12,
        flexDirection: 'row',
        justifyContent: 'space-between',
        alignItems: 'center',
    },
    contentContainer: {
        position: 'absolute',
        width: '100%',
        top: 0,
    },
    content: {
        padding: 10,
        backgroundColor: '#D6E1F0',
    },
    textContent: {
        fontSize: 14,
        color: 'black',
    },
});