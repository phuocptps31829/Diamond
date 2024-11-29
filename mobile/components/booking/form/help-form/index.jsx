import React, { useState } from 'react';
import GenderSelect from '../../selects/GenderSelect';
import BirthdaySelect from '../../selects/BirthdaySelect';
import EthnicSelect from '../../selects/EthnicSelect';
import MaterialIcons from '@expo/vector-icons/MaterialIcons';
import Feather from '@expo/vector-icons/Feather';
import Fontisto from '@expo/vector-icons/Fontisto';
import AntDesign from '@expo/vector-icons/AntDesign';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import Entypo from '@expo/vector-icons/Entypo';
import { Text, TextInput, View } from 'react-native';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';

const HelpForm = ({
    form,
    onSetForm
}) => {
    return (
        <View className="mt-2">
            <Text className="text-lg font-semibold text-gray-700">Thông tin người khám:</Text>
            <View className="mt-1">
                <Text className="text-base mb-1">
                    Họ và tên { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <MaterialIcons name="drive-file-rename-outline" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập họ tên"
                        value={ form.fullName }
                        onChangeText={ value => onSetForm({ ...form, fullName: value }) }
                    />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Số điện thoại { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <Feather name="phone" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập số điện thoại"
                        value={ form.phoneNumber }
                        onChangeText={ value => onSetForm({ ...form, phoneNumber: value }) }
                    />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Email
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <Fontisto name="email" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập email"
                        value={ form.email }
                        onChangeText={ value => onSetForm({ ...form, email: value }) }
                    />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Giới tính  { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <GenderSelect
                    gender={ form.gender }
                    onSelect={ value => onSetForm({ ...form, gender: value }) }
                />
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Ngày sinh { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <BirthdaySelect
                    dateOfBirth={ form.dateOfBirth }
                    onSelect={ value => onSetForm({ ...form, dateOfBirth: value }) }
                />
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Nghề nghiệp
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <MaterialCommunityIcons name="bag-checked" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        value={ form.occupation }
                        onChangeText={ value => onSetForm({ ...form, occupation: value }) }
                        placeholder="Nhập nghề nghiệp" />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Dân tộc
                </Text>
                <EthnicSelect
                    onSelect={ value => onSetForm({ ...form, ethnic: value }) }
                    ethnic={ form.ethnic }
                />
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Số CCCD { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <AntDesign name="idcard" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập số CCCD"
                        value={ form.citizenIdentificationNumber }
                        onChangeText={ value => onSetForm({ ...form, citizenIdentificationNumber: value }) }
                    />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Số BHYT
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <FontAwesome5 name="plus-square" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập số BHYT"
                        value={ form.insuranceCode }
                        onChangeText={ value => onSetForm({ ...form, insuranceCode: value }) }
                    />
                </View>
            </View>
            <View className="mt-2">
                <Text className="text-base mb-1">
                    Địa chỉ { '' }
                    <Text className="text-red-500 text-base">*</Text>
                </Text>
                <View
                    className="bg-white px-3 flex-row items-center h-[50px] border border-[#E5E5E5] rounded-lg relative"
                >
                    <Entypo name="location" size={ 20 } color="#C3C3C3" />
                    <TextInput
                        className="p-2 text-base leading-5 flex-1 text-gray-700"
                        placeholder="Nhập địa chỉ"
                        value={ form.address }
                        onChangeText={ value => onSetForm({ ...form, address: value }) }
                    />
                </View>
            </View>
        </View>
    );
};

export default HelpForm;