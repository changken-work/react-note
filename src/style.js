import { StatusBar, StyleSheet } from "react-native";

const styles = StyleSheet.create({
  container: {
    //backgroundColor: '#00bfff',
    flex: 1,
    // margin: "auto",
    flexDirection: "row",
    marginTop: StatusBar.currentHeight || 0,
  },

  item: {
    flex: 1,
    flexDirection: "row",
    backgroundColor: "#00ffff",
    padding: 8,
    marginVertical: 8,
    marginHorizontal: 16,
  },

  title: {
    flex: 4,
    fontSize: 24,
  },

  content: {
    flex: 1,
  },

  centeredView: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 22,
  },

  modalView: {
    margin: 60,
    backgroundColor: "white",
    borderRadius: 20,
    padding: 65,
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: {
      width: 0,
      height: 2,
    },
    shadowOpacity: 0.25,
    shadowRadius: 3.84,
    elevation: 5,
  },

  addButton: {
    backgroundColor: "#4897C9",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  hideButton: {
    backgroundColor: "#A7D7F5",
    borderRadius: 20,
    padding: 10,
    elevation: 2,
  },
  textStyle: {
    color: "white",
    fontWeight: "bold",
    textAlign: "center",
  },
  modalText: {
    marginBottom: 20,
    textAlign: "center",
  },
  inputStyle: {
    height: 50,
    fontSize: 20,
    padding: 10,
  },
  loading: {
    flex:1,
    flexDirection:"row",
    alignItems: 'center',
    justifyContent: 'center'
  },
  form: {
    flex: 1,
    flexDirection: 'column',
    justifyContent: 'center',
    padding: 35,
    marginTop: StatusBar.currentHeight || 0,
  },
  inputStyle: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: "center",
    borderColor: "#ccc",
    borderBottomWidth: 1
  },
  memocontainer: {
    flex: 1,
    flexDirection: "row",
    marginTop: StatusBar.currentHeight || 0,
  },
  logo: {
    width: 305,
    height: 159,
    marginBottom: 20,
  },
});

export default styles;
