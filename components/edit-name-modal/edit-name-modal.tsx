import {useEffect, useState} from "react";
import {Text, Modal, StyleSheet, TextInput, TouchableOpacity, View} from "react-native";

export default function EditNameModal({player, onSavePressed, modalVisible, setModalVisible}) {
    const [playerName, setPlayerName] = useState(player.name);

    useEffect(() => {
        setPlayerName(player?.name ?? '');
    }, [player?.name]);


    return (
        <Modal
            animationType="slide"
            transparent={true}
            visible={modalVisible}
            onRequestClose={() => {
                setModalVisible(!modalVisible);
            }}
        >
            <View style={styles.modal}>
                <View style={styles.modalContainer}>
                    <TextInput style={styles.input} onChangeText={setPlayerName} value={playerName}
                               placeholder={"Player Name"}/>
                    <View style={styles.buttonsContainer}>
                        <TouchableOpacity onPress={() => setModalVisible(false)}>
                            <Text>Cancel</Text>
                        </TouchableOpacity>
                        <TouchableOpacity onPress={() => onSavePressed(playerName)}>
                            <Text>Save</Text>
                        </TouchableOpacity>

                    </View>
                </View>
            </View>
        </Modal>
    );
}


const styles = StyleSheet.create({
    modal: {
        backgroundColor: 'rgba(0,0,0,0.5)',
        alignItems: 'center',
        justifyContent: 'center',
        flex: 1,
    },
    modalContainer: {
        backgroundColor: 'white',
        padding: 20,
        borderRadius: 10,
        width: '70%'
    },

    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    },
    buttonsContainer: {
        flex: 0,
        flexDirection: 'row',
        justifyContent: 'space-between',
    }
});
