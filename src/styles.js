import React from 'react';
import { StatusBar, StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    paddingTop: StatusBar.currentHeight,
  },
  form: {
    flex: 1,
    justifyContent: 'center',
    padding: '10',
    marginTop: StatusBar.currentHeight || 0,
  },
  textInput: {
    width: '100%',
    marginBottom: 10,
    paddingBottom: 15,
    alignSelf: 'center',
    borderColor: '#ccc',
    borderBottomWidth: 1,
  },
});

export default styles;
