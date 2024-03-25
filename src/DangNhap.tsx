import {Image, StyleSheet, Text, TextInput, TouchableOpacity, View} from 'react-native';
import React, { useState } from 'react';

function DangNhap({navigation}): React.JSX.Element {
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [erTaiKhoan, setErTaiKhoan] = useState('');
  const [erMatKhau, setErMatKhau] = useState('');

  const dangNhap = () => {
    let check = false;
    if (!taiKhoan.trim()) {
      setErTaiKhoan("Vui lòng nhập thông tin tài khoản!")
      check = true;
    } else {
      setErTaiKhoan('');
    }

    if (!matKhau.trim()) {
      setErMatKhau("Vui lòng nhập mật khẩu!")
      check = true;
    } else {
      setErMatKhau('');
    }

    if (check) {
      let uriApi = ``;
    }
  }
  return (
    <View style={styles.container}>
      <View style={styles.box1}>
        <Text style={styles.textDangNhap}>Đăng nhập tài khoản</Text>
        <Image
          style={styles.imgUser}
          source={require('../src/image/user.png')}
        />
      </View>
      <Text style={styles.textWc}>Welcome back Name User</Text>
      <View style={{alignItems: 'center'}}>
        <Text style={styles.tenCty}>
          Bridal <Text style={styles.toMau}>Studio</Text>
        </Text>
      </View>
      <TextInput style={styles.textInput} placeholder='Tài khoản' onChangeText={(text) => {setTaiKhoan(text)}}/>
      {erTaiKhoan ? (
            <Text style={styles.error}>{erTaiKhoan}</Text>
          ) : null}
      <TextInput style={styles.textInput} placeholder='Mật khẩu' secureTextEntry={true} onChangeText={(text) => {setMatKhau(text)}}/>
      {erMatKhau ? (
            <Text style={styles.error}>{erMatKhau}</Text>
          ) : null}
      <TouchableOpacity
        onPress={() => navigation.navigate('Drawer')}
        style={styles.btnDangNhap}>
        <Text
          style={{
            padding: 10,
            color: 'black',
            fontSize: 20,
            fontWeight: 'bold',
          }}>
          Đăng nhập
        </Text>
      </TouchableOpacity>
    </View>
  );
}

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
  },
  box1: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  textDangNhap: {
    fontSize: 25,
    fontWeight: 'bold',
    color: 'black',
  },
  imgUser: {
    width: 25,
    height: 25,
    marginLeft: 10,
  },
  textWc: {
    fontSize: 16,
    fontWeight: 'bold',
    color: 'black',
    marginLeft: 20,
    position: 'absolute',
    top: 60,
  },
  tenCty: {
    color: 'black',
    fontWeight: '900',
    fontSize: 64,
    marginBottom: 20
  },
  toMau: {
    color: '#FFC600',
  },
  textInput: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginHorizontal: 20,
    paddingLeft: 15,
    marginTop: 10
  },
  btnDangNhap: {
    backgroundColor: '#FFC600',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30
  },
  error: {
    marginLeft: 35,
    marginTop: 10,
    color: 'red',
    fontSize: 15
  }
});