import { StyleSheet, Text, View } from 'react-native'
import React from 'react'
import { createDrawerNavigator } from '@react-navigation/drawer';
import QuanLyNhanVien from './QuanLyNhanVien';
import QuanLyCongViec from './QuanLyCongViec';
import QuanLyHoaDon from './QuanLyHoaDon';
import QuanLyKhachHang from './QuanLyKhachHang';
import ThongKe from './ThongKe';
import { NavigationContainer } from '@react-navigation/native';

const Drawer = createDrawerNavigator();

function DrawerNavigator(): React.JSX.Element {
  return (
    <NavigationContainer>
      <Drawer.Navigator initialRouteName='QuanLyHoaDon'>
      <Drawer.Screen name="Quản lý nhân viên" component={QuanLyNhanVien} />
      <Drawer.Screen name="QuanLyCongViec" component={QuanLyCongViec} />
      <Drawer.Screen name="QuanLyHoaDon" component={QuanLyHoaDon} options={{title:'Quản lý hóa đơn'}}/>
      <Drawer.Screen name="QuanLyKhachHang" component={QuanLyKhachHang} />
      <Drawer.Screen name="ThongKe" component={ThongKe} />
    </Drawer.Navigator>
    </NavigationContainer>
  )
}

export default DrawerNavigator

const styles = StyleSheet.create({})