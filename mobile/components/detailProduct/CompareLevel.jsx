import React from 'react';
import { Text, View } from 'react-native';
import { DataTable } from 'react-native-paper';

const CompareLevel = ({ name, services }) => {
    const sortServices = services?.sort((a, b) => a.discountPrice - b.discountPrice);
    const isMultiType = sortServices.length > 1;

    return (
        <View>
            <Text className="font-semibold text-lg" style={ { lineHeight: '24px' } }>
                Các dịch vụ trong { name } bao gồm:
            </Text>
            <View className="mt-3">
                <DataTable>
                    <DataTable.Header className="bg-primary-500">
                        <DataTable.Title
                            textStyle={ { color: "white", textTransform: "uppercase", fontSize: "8px" } }
                            style={ { justifyContent: 'center', flex: '10%' } }
                        >
                            STT
                        </DataTable.Title>
                        <DataTable.Title
                            textStyle={ { color: "white", textTransform: "uppercase", fontSize: "8px" } }
                            style={ { justifyContent: 'center', flex: '50%' } }
                        >
                            Danh mục khám
                        </DataTable.Title>
                        { sortServices?.map((s, i) => <DataTable.Title
                            key={ i }
                            textStyle={ { color: "white", textTransform: "uppercase", fontSize: "8px", textDecorationLine: "underline" } }
                            style={ { justifyContent: 'center', flex: '20%' } }
                        >
                            { s.levelName }
                        </DataTable.Title>) }
                    </DataTable.Header>
                    { sortServices[isMultiType ? 1 : 0].servicesID.map((s, i) => <DataTable.Row key={ i } className={ `${i % 2 !== 0 ? 'bg-zinc-200' : ''}` }>
                        <DataTable.Cell textStyle={ { fontSize: '8px' } } style={ { justifyContent: 'center', flex: '10%' } }>
                            { i + 1 }
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={ { fontSize: '8px' } } style={ { justifyContent: 'center', flex: '50%' } }>
                            { s }
                        </DataTable.Cell>
                        <DataTable.Cell textStyle={ { fontSize: '8px' } } style={ { justifyContent: 'center', flex: '20%' } }>
                            { isMultiType ? sortServices[0].servicesID.includes(s) ? "x" : '' : 'x' }
                        </DataTable.Cell>
                        { isMultiType ? <DataTable.Cell
                            textStyle={ { fontSize: '8px' } }
                            style={ { justifyContent: 'center', flex: '20%' } }
                        >
                            x
                        </DataTable.Cell> : '' }
                    </DataTable.Row>) }
                </DataTable>
            </View>
        </View>
    );
};

export default CompareLevel;;