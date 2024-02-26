import {FlatList, SafeAreaView, StyleSheet, Text, TextInput, View} from 'react-native';
import {useActions} from "./models/action/action_model";
import ActionCell from "./components/action-cell/action-cell";
import {useState} from "react";
import {Player} from "./models/player/player_model";
import EditNameModal from "./components/edit-name-modal/edit-name-modal";

export default function App() {
    const {actions, setActions} = useActions();
    const [searchQuery, setSearchQuery] = useState('');
    const [modalVisible, setModalVisible] = useState(false);
    const [editedPlayer, setEditedPlayer] = useState<Player | null>(null);

    const onStartEdit = (player: Player) => {
        setEditedPlayer(player);
        setModalVisible(true);
    }

    const onSavePressed = (playerName: string) => {
        setModalVisible(false);
        setActions(actions.map((action) => {
            if (action?.player?.id === editedPlayer?.id) {
                action.player.name = playerName;
            }
            return action;
        }));
    }

    return (
        <SafeAreaView style={styles.container}>
            <TextInput style={styles.input} onChangeText={setSearchQuery} value={searchQuery} placeholder={"Search"}/>
            <FlatList data={searchQuery.length == 0
                ? actions
                : actions.filter((action) =>
                    action?.skill_type?.toLowerCase().includes(searchQuery.toLowerCase())
                    || action?.player?.name?.toLowerCase().includes(searchQuery.toLowerCase())
                )
            } renderItem={({item}) => <ActionCell onStartEdit={onStartEdit} action={item}/>}></FlatList>

            <EditNameModal player={editedPlayer} onSavePressed={onSavePressed} modalVisible={modalVisible}
                           setModalVisible={setModalVisible}/>

        </SafeAreaView>
    );
}

const styles = StyleSheet.create({
    container: {
        paddingTop: 60,
        backgroundColor: '#fff',
    },
    input: {
        borderWidth: 1,
        borderColor: 'grey',
        padding: 10,
        marginBottom: 20,
        borderRadius: 5,
    }
});
