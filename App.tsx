import { View, Text } from 'react-native'
import * as React from 'react';
import {NavigationContainer} from '@react-navigation/native';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import DangNhap from './src/DangNhap';
import DrawerNavigator from './src/DrawerNavigator';
import QuanLyNhanVien from './src/QuanLyNhanVien';

const Stack = createNativeStackNavigator();

function App(): React.JSX.Element {
  return (
    <DrawerNavigator/>
  )
}

export default App