import { View, Text } from 'react-native'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DangNhap from './src/DangNhap';
import DrawerNavigator from './src/DrawerNavigator';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='DangNhap'>
        <Stack.Screen
          name="DangNhap"
          component={DangNhap}
          options={{title: 'Chào mừng'}}
        />
        <Stack.Screen name="Drawer" component={DrawerNavigator} />
      </Stack.Navigator>
    </NavigationContainer>
  )
}

export default App