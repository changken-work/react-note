import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    marginTop: StatusBar.currentHeight,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: 10,
    marginTop: StatusBar.currentHeight || 0,
  },
  formTitle: {
    fontSize: 30,
    marginLeft: 'auto',
    marginRight: 'auto',
    marginBottom: 30,
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  topicInput: {
    width: '100%',
    marginBottom: 15,
    paddingBottom: 15,
    alignSelf: 'center',
    fontSize: 30,
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
  titlefont: {
    fontWeight: 'bold',
  },
  noteInput: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: 'center',
  },
  memocontainer: {
    flex: 1,
    flexDirection: 'row',
    marginTop: StatusBar.currentHeight || 0,
  },
  btnIcon: {
    height: 25,
    width: 25,
    color: '#fff',
  },
  loading: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default styles;
