import React from 'react';
import { View, Text, Button } from 'react-native';

import styles from '../styles';

export default function SignOut(props) {
  return (
    <View style={styles.container}>
      <Button
        onPress={() => {
          alert('xss');
        }}
        title="登出"
      />
    </View>
  );
}
