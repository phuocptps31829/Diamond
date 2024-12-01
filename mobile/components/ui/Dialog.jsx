import { Modal, TouchableWithoutFeedback, View } from 'react-native';

const DialogCustom = ({
    content,
    visible,
    setVisible
}) => {
    const hideDialog = () => setVisible(false);

    return (
        <Modal
            animationType="fade"
            transparent={ true }
            visible={ visible }
            onRequestClose={ () => {
                setVisible(!visible);
            } }
        >
            <TouchableWithoutFeedback onPress={ hideDialog }>
                <View className="flex-1 justify-center items-center bg-[#00000090] bg-opacity-50 absolute top-0 left-0 right-0 bottom-0" />
            </TouchableWithoutFeedback>
            <View className="flex-1 justify-center items-center">
                <View className="bg-white p-4 rounded-lg w-[90%] max-w-[340px]">
                    { content }
                </View>
            </View>
        </Modal>
    );
};

export default DialogCustom;