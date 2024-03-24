import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'

function DangNhap({navigation}): React.JSX.Element {
  return (
    <View>
      <TouchableOpacity onPress={() => navigation.navigate('Drawer')}
      style = {{backgroundColor: '#00BFFF', marginTop: 20, width: 200, height: 50, alignItems: 'center', justifyContent: 'center'}}>
        <Text style = {{padding: 10,color: 'black', fontSize: 18, fontWeight: 'bold',}}>Đăng nhập</Text>
      </TouchableOpacity>
    </View>
  )
}

export default DangNhap

const styles = StyleSheet.create({})