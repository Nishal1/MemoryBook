import { StyleSheet, Text, View } from 'react-native';
import { MenuProvider } from 'react-native-popup-menu';
import {NavigationContainer} from '@react-navigation/native'
import 'react-native-get-random-values';

import AppNavigator from './app/navigation/AppNavigator';

export default function App() {
  return (
    <MenuProvider>
      <NavigationContainer>
        <AppNavigator />
      </NavigationContainer>
    </MenuProvider>
  );
}

const styles = StyleSheet.create({});
