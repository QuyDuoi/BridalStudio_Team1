import {StyleSheet} from 'react-native'
import React from 'react'
import { Animated } from 'react-native';

import ListHoaDonComp from './HoaDonComp/ListHoaDonComp';
import ShowHoaDonCT from './HoaDonComp/ShowHoaDonCT';
import { createStackNavigator } from '@react-navigation/stack';
import ThongKeTest from './HoaDonComp/ThongKeTest';




const Stack = createStackNavigator()

function QuanLyHoaDon(): React.JSX.Element {
  
  return (
    
      <Stack.Navigator initialRouteName='ListHoaDonComp' screenOptions={{
        headerShown: false,
        cardStyleInterpolator: ({ current, layouts }) => ({
          cardStyle: {
            opacity: current.progress, // hiệu ứng làm mờ
            transform: [
              {
                translateX: Animated.multiply(
                  current.progress.interpolate({
                    inputRange: [0, 1],
                    outputRange: [layouts.screen.width, 0],
                    extrapolate: 'clamp',
                  }),
                  -1 // Đảo ngược hướng chuyển động
                ),
              },
              {
                scale: current.progress.interpolate({
                  inputRange: [0, 1],
                  outputRange: [0.5, 1],
                  extrapolate: 'clamp',
                }),
              },
            ],
          },
        }),
      }}>
        <Stack.Screen
          name="ListHoaDonComp"
          component={ListHoaDonComp}
        />
        <Stack.Screen
          name="ShowHoaDonCT"
          component={ShowHoaDonCT}
        />
        <Stack.Screen
          name="ThongKeTest"
          component={ThongKeTest}
        />
      </Stack.Navigator>
    
  )
}

export default QuanLyHoaDon

const styles = StyleSheet.create({
  
}) 