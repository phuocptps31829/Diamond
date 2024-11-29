import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ToastUI from '../../ui/Toast';

const genders = [
    {
        label: 'Nam',
        value: "Nam"
    },
    {
        label: 'Nữ',
        value: "Nữ"
    }
];

const GenderSelect = ({
    onSelect,
    gender
}) => {
    const [isFocus, setIsFocus] = useState(false);

    const handleClick = () => {
        // if (!timesList?.length) {
        //     ToastUI({
        //         type: 'error',
        //         text1: 'Vui lòng chọn ngày',
        //         text2: 'Chọn ngày để chọn thời gian khám',
        //     });
        //     return;
        // }
    };

    return (
        <TouchableOpacity
            onPress={ handleClick }
            style={ styles.container }
        >
            <Dropdown
                style={ [styles.dropdown, isFocus && { borderColor: '#007bbb' }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                itemContainerStyle={ styles.itemContainerStyle }
                containerStyle={ styles.containerStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ genders }
                maxHeight={ 300 }
                labelField="label"
                valueField="value"
                placeholder={ !isFocus ? 'Chọn giới tính' : '' }
                searchPlaceholder="Nhập giới tính ..."
                value={ gender }
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
                        placeholder="Nhập giới tính ..."
                    />
                ) }
                renderLeftIcon={ () => (
                    <MaterialCommunityIcons
                        style={ styles.icon }
                        color={ isFocus ? '#007bbb' : '#C3C3C3' }
                        name="gender-transgender"
                        size={ 20 }
                    />
                ) }
            />
        </TouchableOpacity>
    );
};

export default GenderSelect;