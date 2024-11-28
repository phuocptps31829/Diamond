import { useState } from 'react';
import { Text, TextInput, View } from 'react-native';
import { Dropdown } from 'react-native-element-dropdown';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { useQuery } from '@tanstack/react-query';
import { branchApi } from '../../../services/branchesApi';
import { styles } from './styles';

const BranchSelect = ({ specialtyID, onSelect }) => {
    const [value, setValue] = useState(null);
    const [isFocus, setIsFocus] = useState(false);

    console.log('hi', specialtyID);

    const { data: branchesData, isLoading, isError } = useQuery(({
        queryKey: ['branches', specialtyID],
        queryFn: () => branchApi.getAllBranchesBySpecialty(specialtyID),
        enabled: !!specialtyID,
    }));

    console.log('branches: ', branchesData);
    if (isLoading) {
        return <Text>Loading...</Text>;
    }

    if (isError) {
        return <Text>Error...</Text>;
    }

    if (!branchesData) {
        return null;
    }

    return (
        <View style={ styles.container }>
            {/* { renderLabel() } */ }
            <Dropdown
                style={ [styles.dropdown, isFocus && { borderColor: '#007bbb' }] }
                placeholderStyle={ styles.placeholderStyle }
                selectedTextStyle={ styles.selectedTextStyle }
                itemContainerStyle={ styles.itemContainerStyle }
                containerStyle={ styles.containerStyle }
                inputSearchStyle={ styles.inputSearchStyle }
                iconStyle={ styles.iconStyle }
                data={ branchesData?.data?.map(branch => ({
                    label: branch.name,
                    value: branch._id,
                })) }
                maxHeight={ 300 }
                labelField="label"
                valueField="value"
                placeholder={ !isFocus ? 'Chọn chi nhánh' : '' }
                searchPlaceholder="Nhập tên chi nhánh ..."
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
                        placeholder="Nhập tên chi nhánh ..."
                    />
                ) }
                renderLeftIcon={ () => (
                    <FontAwesome5
                        style={ styles.icon }
                        color={ isFocus ? '#007bbb' : '#C3C3C3' }
                        name="building"
                        size={ 20 }
                    />
                ) }
            />
        </View>
    );
};

export default BranchSelect;