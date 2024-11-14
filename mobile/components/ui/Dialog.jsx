import { Dialog, Portal, Text } from 'react-native-paper';

const DialogCustom = ({
    content,
    visible,
    setVisible
}) => {
    const hideDialog = () => setVisible(false);

    return (
        <Portal>
            <Dialog visible={ visible } onDismiss={ hideDialog }>
                <Dialog.Content>
                    { content }
                </Dialog.Content>
            </Dialog>
        </Portal>
    );
};

export default DialogCustom;