import {Touchable, StyleSheet, Text, TouchableOpacity} from "react-native";

export default function ActionCell({action, onStartEdit}) {
    return (
        <TouchableOpacity onPress={() => onStartEdit(action?.player)} style={styles.container}>
            <Text style={styles.main}>{action.skill_type} by {action?.player?.name ?? 'N/A'} ({action?.player?.id?.slice(0, 4)})</Text>
            <Text style={styles.subtitle}>{action.timestamp}</Text>

        </TouchableOpacity>
    );
}


const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: '#fff',
        paddingHorizontal: 20,
    },
    main: {
        fontSize: 16,
    },
    subtitle: {
        fontSize: 12,
        color: 'gray',
    }
});
