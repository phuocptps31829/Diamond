import { useState } from 'react';
import { TextInput, TouchableOpacity } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from './styles';
import ToastUI from '../../ui/Toast';

const TimeSelect = ({
    timesList,
    time,
    onSelect
}) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleClick = () => {
        if (!timesList?.length) {
            ToastUI({
                type: 'error',
                text1: 'Vui lòng chọn ngày',
                text2: 'Chọn ngày để chọn thời gian khám',
            });
            return;
        }
    };

    return (
        <TouchableOpacity
            onPress={ handleClick }
            style={ styles.container }
        >
            <Dropdown
                disable={ !timesList?.length }
                style={ [styles.dropdown, isFocus && { borderColor: '#007bbb' }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                itemContainerStyle={ styles.itemContainerStyle }
                containerStyle={ styles.containerStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ timesList?.length
                    ? timesList : [] }
                maxHeight={ 300 }
                labelField="label"
                valueField="value"
                placeholder={ !isFocus ? 'Chọn thời gian' : '' }
                searchPlaceholder="Nhập thời gian ..."
                value={ time }
                autoScroll={ true }
                showsVerticalScrollIndicator={ true }
                search
                onFocus={ () => setIsFocus(true) }
                onBlur={ () => setIsFocus(false) }
                onChange={ item => {
                    onSelect(item.value);
                    setIsFocus(false);
                } }
                renderInputSearch={ (onSearch) => (
                    <TextInput
                        className="mb-2"
                        style={ styles.inputSearchStyle }
                        onChangeText={ onSearch }
                        placeholder="Nhập thời gian ..."
                    />
                ) }
                renderLeftIcon={ () => (
                    <FontAwesome5
                        style={ styles.icon }
                        color={ isFocus ? '#007bbb' : '#C3C3C3' }
                        name="clock"
                        size={ 20 }
                    />
                ) }
            />
        </TouchableOpacity>
    );
};

export default TimeSelect;