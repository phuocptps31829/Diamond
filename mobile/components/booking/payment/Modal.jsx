import {
    ActivityIndicator,
    Image,
    Modal,
    Text,
    TouchableOpacity,
    TouchableWithoutFeedback,
    View
} from "react-native";

const ModalPayment = ({
    isPending,
    isOpen,
    paymentMethod,
    onClose,
    onSetPaymentMethod,
    onPay
}) => {
    return (
        <Modal
            animationType="fade"
            transparent={ true }
            visible={ isOpen }
            onRequestClose={ () => {
                setModalVisible(!isOpen);
            } }
        >
            <TouchableWithoutFeedback onPress={ onClose }>
                <View className="flex-1 justify-center items-center bg-[#00000090] bg-opacity-50 absolute top-0 left-0 right-0 bottom-0" />
            </TouchableWithoutFeedback>
            <View className="flex-1 justify-center items-center">
                <View className="bg-white p-4 rounded-lg w-[90%] max-w-[340px]">
                    <Text className="text-xl font-semibold text-gray-700">Thanh toán</Text>
                    <Text className="text-base">
                        <Text className="text-base text-red-500">
                            (*) { '' }
                        </Text>
                        Vui lòng chọn phương thức thanh toán
                    </Text>
                    <View className="mt-2">
                        <TouchableOpacity
                            activeOpacity={ .8 }
                            className={ `flex-row items-center py-2 border-b ${paymentMethod === 'momo' ? 'text-primary-500 border-primary-500' : 'border-[#E5E5E5]'}` }
                            onPress={ () => onSetPaymentMethod('momo') }
                        >
                            <Image
                                source={ require("../../../assets/images/momo.webp") }
                                className="w-7 h-7 mr-2"
                            />
                            <Text className={ `text-lg font-semibold ${paymentMethod === 'momo' ? 'text-primary-600' : 'text-gray-700'}` }>
                                Thanh toán MoMo
                            </Text>
                            { paymentMethod === 'momo' && <View className="text-lg flex-1 self-end">
                                <Text className="text-lg flex-1 self-end">👈</Text>
                            </View> }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={ .8 }
                            className={ `flex-row items-center py-2 border-b ${paymentMethod === 'vnpay' ? 'text-primary-500 border-primary-500' : 'border-[#E5E5E5]'}` }
                            onPress={ () => onSetPaymentMethod('vnpay') }
                        >
                            <Image
                                source={ require("../../../assets/images/vnpay.webp") }
                                className="w-7 h-7 mr-2"
                            />
                            <Text className={ `text-lg font-semibold ${paymentMethod === 'vnpay' ? 'text-primary-600' : 'text-gray-700'}` }>
                                Thanh toán VNPay
                            </Text>
                            { paymentMethod === 'vnpay' && <View className="text-lg flex-1 self-end">
                                <Text className="text-lg flex-1 self-end">👈</Text>
                            </View> }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={ .8 }
                            className={ `flex-row items-center py-2 border-b ${paymentMethod === 'zalopay' ? 'text-primary-500 border-primary-500' : 'border-[#E5E5E5]'}` }
                            onPress={ () => onSetPaymentMethod('zalopay') }
                        >
                            <Image
                                source={ require("../../../assets/images/zalopay.webp") }
                                className="w-7 h-7 mr-2"
                            />
                            <Text className={ `text-lg font-semibold ${paymentMethod === 'zalopay' ? 'text-primary-600' : 'text-gray-700'}` }>
                                Thanh toán ??
                            </Text>
                            { paymentMethod === 'zalopay' && <View className="text-lg flex-1 self-end">
                                <Text className="text-lg flex-1 self-end">👈</Text>
                            </View> }
                        </TouchableOpacity>
                        <TouchableOpacity
                            activeOpacity={ .8 }
                            className={ `flex-row items-center py-2 border-b ${paymentMethod === 'cod' ? 'text-primary-500 border-primary-500' : 'border-[#E5E5E5]'}` }
                            onPress={ () => onSetPaymentMethod('cod') }
                        >
                            <Image
                                source={ require("../../../assets/images/cash.png") }
                                className="w-7 h-7 mr-2"
                            />
                            <Text className={ `text-lg font-semibold ${paymentMethod === 'cod' ? 'text-primary-600' : 'text-gray-700'}` }>
                                Thanh toán trực tiếp
                            </Text>
                            { paymentMethod === 'cod' && <View className="text-lg flex-1 self-end">
                                <Text className="text-lg flex-1 self-end">👈</Text>
                            </View> }
                        </TouchableOpacity>
                    </View>
                    <View className="mt-4 flex-row justify-end">
                        <TouchableOpacity
                            className="bg-primary-500 py-3 flex-row items-center px-4 rounded-lg max-w-[160px]"
                            onPress={ onPay }
                        >
                            <Text className="text-center text-white uppercase font-semibold">
                                Thanh toán
                            </Text>
                            { isPending && <ActivityIndicator
                                color="#fff"
                                className="ml-2"
                                size="small"
                            />
                            }
                        </TouchableOpacity>
                    </View>
                </View>
            </View>
        </Modal>
    );
};

export default ModalPayment;