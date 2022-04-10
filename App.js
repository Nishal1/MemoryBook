import { StatusBar } from 'expo-status-bar';
import { StyleSheet, Text, View } from 'react-native';

import colorPicker from './app/config/colorPicker';


export default function App() {
  return (
    <View style={styles.container}>
      <Text>Open up App.js to start working on your app!</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colorPicker.primaryColor,
    alignItems: 'center',
    justifyContent: 'center',
  },
});
