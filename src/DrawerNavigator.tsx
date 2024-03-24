import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyCongViec from './QuanLyCongViec';
import QuanLyHoaDon from './QuanLyHoaDon';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <Drawer.Navigator initialRouteName='QuanLyNhanVien'>
      <Drawer.Screen name="QuanLyNhanVien" component={QuanLyNhanVien} />
      <Drawer.Screen name="QuanLyCongViec" component={QuanLyCongViec} />
      <Drawer.Screen name="QuanLyHoaDon" component={QuanLyHoaDon} />
    </Drawer.Navigator>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})