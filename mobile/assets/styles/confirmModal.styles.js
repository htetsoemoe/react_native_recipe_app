import { StyleSheet } from "react-native";
import { COLORS } from "../../constants/colors";

export const confirmModalStyles = StyleSheet.create({
    overlay: {
        flex: 1,
        backgroundColor: '#000000aa',
        justifyContent: 'center',
        alignItems: 'center',
    },
    modalContainer: {
        width: '85%',
        backgroundColor: '#fff',
        padding: 20,
        borderRadius: 10,
        elevation: 5,
    },
    title: {
        fontSize: 18,
        fontWeight: 'bold',
        marginBottom: 10,
    },
    message: {
        fontSize: 16,
        marginBottom: 20,
    },
    buttonRow: {
        flexDirection: 'row',
        justifyContent: 'flex-end',
        gap: 10,
    },
    cancelBtn: {
        backgroundColor: COLORS.primary,
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        marginRight: 10,
    },
    confirmBtn: {
        backgroundColor: 'red',
        paddingHorizontal: 12,
        paddingVertical: 8,
        borderRadius: 5,
        color: '#fff',
    },
    cancelText: {
        color: '#fff',
        fontSize: 16,
    },
    confirmText: {
        color: '#fff',
        fontSize: 16,
    },
})