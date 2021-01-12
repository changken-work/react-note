import { StatusBar, StyleSheet } from 'react-native';
const styles = StyleSheet.create({
    gridView: {
        marginTop: 15,
        flex: 1,
    },
    itemContainer: {
        justifyContent: 'flex-start',
        borderRadius: 5,
        padding: 10,
        height: 150,
    },
    itemName: {
        fontSize: 20,
        color: '#fff',
        fontWeight: '900',
    },
    itemCode: {
        fontWeight: '600',
        fontSize: 12,
        color: '#fff',
        marginTop: 50,
    },
    loading: {
        flex: 1,
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    memocontainer: {
        flex: 1,
        flexDirection: "row",
        // marginTop: StatusBar.currentHeight || 0,
        backgroundColor: "#ced6e0",
    },
});

export default styles;
