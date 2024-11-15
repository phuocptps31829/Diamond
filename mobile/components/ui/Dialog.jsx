import { Dialog, Portal, Text } from 'react-native-paper';
import FontAwesome5 from '@expo/vector-icons/FontAwesome5';
import { TouchableOpacity, View } from 'react-native';

const DialogCustom = ({
    content,
    visible,
    setVisible
}) => {
    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog
                visible={ visible }
                onDismiss={ hideDialog }
                className="relative pt-5"
            >
                <TouchableOpacity
                    className="absolute -top-2 right-4"
                    onPress={ hideDialog }
                >
                    <FontAwesome5
                        name="times-circle" size={ 24 } color="#007BBB"
                    />
                </TouchableOpacity>
                <Dialog.Content
                    className=""
                >
                    <Text>{ content }</Text>
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default DialogCustom;