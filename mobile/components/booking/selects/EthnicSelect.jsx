import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { styles } from './styles';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import ToastUI from '../../ui/Toast';
import { ethnicGroups } from '../../../constants/ethnics';

const EthnicSelect = ({
    ethnic,
    onSelect,
    styleSecondary = false
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
                style={ [styleSecondary ? styles.dropdownStyleSecondary : styles.dropdown, isFocus && { borderColor: '#007bbb' }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                itemContainerStyle={ styles.itemContainerStyle }
                containerStyle={ styles.containerStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ ethnicGroups }
                maxHeight={ 300 }
                labelField="label"
                valueField="value"
                placeholder={ !isFocus ? 'Chọn dân tộc' : '' }
                searchPlaceholder="Nhập dân tộc ..."
                value={ ethnic }
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
                        placeholder="Nhập dân tộc ..."
                    />
                ) }
                renderLeftIcon={
                    !styleSecondary
                        ? () => (
                            <MaterialCommunityIcons
                                style={styles.icon}
                                color={isFocus ? '#007bbb' : '#C3C3C3'}
                                name="human"
                                size={20}
                            />
                        )
                        : null
                }
            />
        </TouchableOpacity>
    );
};

export default EthnicSelect;