import { DataTable } from 'react-native-paper';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency, formatDateTimeLocale } from '../../utils/format';
import { appointmentStatus, paymentStatus } from '../../constants/status';
import DialogCustom from '../ui/Dialog';
import { useState } from 'react';
import Result from './Result';
import MaterialCommunityIcons from '@expo/vector-icons/MaterialCommunityIcons';
import { Link } from 'expo-router';

const DetailHistory = ({ data }) => {
    const [showResultDialog, setShowResultDialog] = useState(false);

    return (
        <>
            <View className="pt-4 pb-10 px-3">
                <View className="bg-white h-[94%] rounded-lg">
                    <Text className="text-base font-bold text-[#5a5a5a] px-4 pt-4 pb-1">
                        { data?.service?.name || data?.medicalPackage?.name }
                    </Text>
                    <View>
                        <DataTable>
                            <DataTable.Row>
                                { _renderHeader('🏨', 'Nơi khám') }
                                { _renderRow(data?.clinic?.name + " - " + data?.branch?.name) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('🧑‍⚕️', 'Bác sĩ') }
                                { _renderRow(data?.doctor?.fullName) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('🕒', 'Ngày giờ khám') }
                                { _renderRow(formatDateTimeLocale(data?.time)) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('⚙️', 'Loại khám') }
                                { _renderRow(data?.type) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('📌', 'Trạng thái') }
                                <DataTable.Cell>
                                    <View className={ `flex-row items-center ${appointmentStatus[data?.status]?.color} py-1 px-2 rounded-lg w-fit` }>
                                        <Text className={ `text-white` }>
                                            { appointmentStatus[data?.status]?.text }
                                        </Text>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('💵', 'Tổng tiền') }
                                {/* { _renderRow(formatCurrency(data?.invoice?.price) + ' - ' + paymentStatus[data?.invoice?.status]) } */ }
                                { _renderRow(formatCurrency(data?.invoice?.price)) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('🫰', 'Phương thức thanh toán') }
                                { _renderRow(data?.payment?.method === "COD"
                                    ? "Thanh toán trực tiếp"
                                    : data?.payment?.method) }
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('📰', 'Kết quả khám') }
                                <DataTable.Cell>
                                    <TouchableOpacity
                                        onPress={ () => setShowResultDialog(true) }
                                    >
                                        <Text
                                            className="text-primary-500 underline"
                                            onPress={ () => setShowResultDialog(true) }
                                        >
                                            Xem kết quả
                                        </Text>
                                    </TouchableOpacity>
                                </DataTable.Cell>
                            </DataTable.Row>
                            <DataTable.Row>
                                { _renderHeader('📄', 'Chi tiết bệnh án') }
                                <DataTable.Cell>
                                    <View className="flex-row items-center">
                                        <Link
                                            href={ `/account/medical-record` }
                                            className="flex-1 flex-wrap underline text-primary-500">
                                            Xem chi tiết
                                        </Link>
                                    </View>
                                </DataTable.Cell>
                            </DataTable.Row>
                        </DataTable>
                    </View>
                    {/* { data?.status === "PENDING" && <View
                        className="flex-1 justify-end pb-4"
                    >
                        <View
                            className="flex-row px-4"
                        >
                            <TouchableOpacity
                                className="bg-red-600 px-4 py-2 rounded-lg flex-row items-center justify-center mt-4 w-full"
                            >
                                <MaterialCommunityIcons name="trash-can" size={ 20 } color="white" />
                                <Text className="text-white font-semibold ml-1">
                                    Hủy lịch khám
                                </Text>
                            </TouchableOpacity>
                        </View>
                    </View> } */}
                </View>
            </View>
            <DialogCustom
                visible={ showResultDialog }
                setVisible={ setShowResultDialog }
                content={ <Result appointment={ data } /> }
            />
        </>
    );
};

const _renderHeader = (icon, text) => {
    return <DataTable.Cell>
        <View className="flex-row items-center">
            <Text className="pr-2">{ icon }</Text>
            <Text className="flex-1 flex-wrap">
                { text }
            </Text>
        </View>
    </DataTable.Cell>;
};

const _renderRow = (text) => {
    return <DataTable.Cell>
        <View className="flex-row items-center">
            <Text className="flex-1 flex-wrap">
                { text }
            </Text>
        </View>
    </DataTable.Cell>;
};

export default DetailHistory;