import { DataTable } from 'react-native-paper';
import { Text, TouchableOpacity, View } from 'react-native';
import { formatCurrency, formatDateTimeLocale } from '../../utils/format';
import { paymentStatus } from '../../constants/status';
import DialogCustom from '../ui/Dialog';
import { useState } from 'react';
import Result from './Result';

const DetailHistory = ({ data }) => {
    const [showResultDialog, setShowResultDialog] = useState(false);

    return (
        <>
            <View className="pt-4 pb-10 px-3">
                <View className="bg-white h-[95%] rounded-md">
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
                                { _renderRow(data?.status) }
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
                                { _renderHeader('📰', 'Chi tiết bệnh án') }
                                { _renderRow(data?.status) }
                            </DataTable.Row>
                        </DataTable>
                    </View>
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