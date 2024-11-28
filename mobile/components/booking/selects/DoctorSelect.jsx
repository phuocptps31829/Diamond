import { useState } from 'react';
import { Text, TextInput, TouchableOpacity, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome6 from '@expo/vector-icons/FontAwesome6';
import { useQuery } from '@tanstack/react-query';
import { styles } from './styles';
import { doctorApi } from '../../../services/doctorsApi';
import ToastUI from '../../ui/Toast';

const DoctorSelect = ({
    branchID,
    specialtyID,
    onSelect
}) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    const { data: doctorData, isLoading, isError } = useQuery(({
        queryKey: ['doctors', specialtyID],
        queryFn: () => doctorApi.getDoctorsByBranchSpecialty(branchID, specialtyID),
        enabled: !!specialtyID && !!branchID,
    }));

    const handleClick = () => {
        if (!branchID) {
            ToastUI({
                type: 'error',
                text1: 'Vui lòng chọn chi nhánh',
                text2: 'Chọn chi nhánh để chọn bác sĩ',
            });
            return;
        }
    };

    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error...</Text>;
    }

    return (
        <TouchableOpacity
            onPress={ handleClick }
            style={ styles.container }
        >
            <Dropdown
                disable={ !branchID }
                style={ [styles.dropdown, isFocus && { borderColor: '#007bbb' }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                itemContainerStyle={ styles.itemContainerStyle }
                containerStyle={ styles.containerStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ doctorData?.data?.length
                    ? doctorData?.data?.map(doctor => ({
                        label: doctor.fullName,
                        value: doctor._id,
                    })) : [] }
                maxHeight={ 300 }
                labelField="label"
                valueField="value"
                placeholder={ !isFocus ? 'Chọn bác sĩ' : '' }
                searchPlaceholder="Nhập tên bác sĩ ..."
                value={ value }
                autoScroll={ true }
                showsVerticalScrollIndicator={ true }
                search
                onFocus={ () => setIsFocus(true) }
                onBlur={ () => setIsFocus(false) }
                onChange={ item => {
                    onSelect(item.value);
                    setValue(item.value);
                    setIsFocus(false);
                } }
                renderInputSearch={ (onSearch) => (
                    <TextInput
                        className="mb-2"
                        style={ styles.inputSearchStyle }
                        onChangeText={ onSearch }
                        placeholder="Nhập tên bác sĩ ..."
                    />
                ) }
                renderLeftIcon={ () => (
                    <FontAwesome6
                        style={ styles.icon }
                        color={ isFocus ? '#007bbb' : '#C3C3C3' }
                        name="user-doctor"
                        size={ 20 }
                    />
                ) }
            />
        </TouchableOpacity>
    );
};

export default DoctorSelect;