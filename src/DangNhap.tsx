import {
  Image,
  KeyboardAvoidingView,
  StyleSheet,
  Text,
  TextInput,
  ToastAndroid,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';
import Icon from 'react-native-vector-icons/FontAwesome';

function DangNhap({navigation}): React.JSX.Element {
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [erTaiKhoan, setErTaiKhoan] = useState('');
  const [erMatKhau, setErMatKhau] = useState('');
  const [showPassword, setShowPassword] = useState(true);

  const thayDoiTrangThai = () => {
    setShowPassword(!showPassword);
  };
  
  const dangNhap = async () => {
    let check = true;
    if (!taiKhoan.trim()) {
      setErTaiKhoan('Vui lòng nhập thông tin tài khoản!');
      check = false;
    } else {
      setErTaiKhoan('');
    }

    if (!matKhau.trim()) {
      setErMatKhau('Vui lòng nhập mật khẩu!');
      check = false;
    } else {
      setErMatKhau('');
    }

    if (check) {
      try {
        const response = await fetch('http://192.168.1.21:3000/api/dangNhap', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify({
            taiKhoan: taiKhoan,
            matKhau: matKhau,
          }),
        });
        const data = await response.json();
        if (data.status === 200) {
          navigation.navigate('Drawer');
        } else {
          ToastAndroid.show(data.messenger, ToastAndroid.SHORT);
        }
      } catch (error) {
        console.error('Error:', error);
      }
    }
  };
  return (
    <KeyboardAvoidingView behavior="padding" style={styles.container}>
      <Image
        style={styles.hinhTron}
        source={require('./image/background1.png')}
      />
      <View style={styles.box1}>
        <Text style={styles.textDangNhap}>Đăng nhập tài khoản</Text>
        <Image
          style={styles.imgUser}
          source={require('../src/image/user.png')}
        />
      </View>
      <Text style={styles.textWc}>Welcome back Name User</Text>
      <View style={styles.box2}>
        <View style={{alignItems: 'center'}}>
          <Text style={styles.tenCty}>
            Bridal <Text style={styles.toMau}>Studio</Text>
          </Text>
        </View>
        
        <TextInput
          style={styles.textInputTk}
          placeholder="Tài khoản"
          onChangeText={text => {
            setTaiKhoan(text);
          }}
        />
        {erTaiKhoan ? <Text style={styles.error}>{erTaiKhoan}</Text> : null}
        <View style={styles.textInputMk}>
          <TextInput
          style={{paddingLeft: 14}}
            placeholder="Mật khẩu"
            secureTextEntry={showPassword}
            onChangeText={text => {
              setMatKhau(text);
            }}
          />
          <TouchableOpacity style={styles.eyeIcon} onPress={thayDoiTrangThai}>
              <Image
                source={
                  showPassword
                    ? require('../src/image/show.png')
                    : require('../src/image/hide.png')
                }
                style={styles.eyeIconImage}
              />
            </TouchableOpacity>
        </View>
        {erMatKhau ? <Text style={styles.error}>{erMatKhau}</Text> : null}
        <TouchableOpacity
          onPress={() => dangNhap()}
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
        <View style={styles.box3}>
          <Image source={require('./image/Vector.png')}/>
          <Text style={styles.text}>Or sign up with</Text>
          <Image source={require('./image/Vector.png')}/>
        </View>
        <View style={styles.box3}>
          <TouchableOpacity style={styles.box4}>
            <Image style={styles.box5} source={require('./image/google.png')}/>
          </TouchableOpacity>
          <TouchableOpacity style={styles.box4}>
            <Image style={styles.box5} source={require('./image/facebook.png')}/>
          </TouchableOpacity>
        </View>
      </View>
    </KeyboardAvoidingView>
  );
}

export default DangNhap;

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    backgroundColor: 'white'
  },
  hinhTron: {
    backgroundColor: '#FFF4CC',
    position: 'absolute',
    width: 550,
    height: 450,
    top: -250,
    left: -50,
  },
  box1: {
    flexDirection: 'row',
    marginLeft: 20,
    alignItems: 'center',
    position: 'absolute',
    top: 20,
  },
  box2: {
    position: 'absolute',
    top: 250,
    left: 0,
    right: 0,
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
    marginBottom: 20,
  },
  toMau: {
    color: '#FFC600',
  },
  textInputTk: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginHorizontal: 20,
    paddingLeft: 15,
    marginTop: 10,
  },
  textInputMk: {
    borderRadius: 10,
    borderWidth: 1,
    color: 'black',
    borderColor: 'gray',
    marginHorizontal: 20,
    marginTop: 10,
  },
  btnDangNhap: {
    backgroundColor: '#FFC600',
    height: 54,
    justifyContent: 'center',
    alignItems: 'center',
    marginHorizontal: 20,
    borderRadius: 10,
    marginVertical: 30,
  },
  error: {
    marginLeft: 35,
    marginTop: 10,
    color: 'red',
    fontSize: 15,
  },
  box3: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center'
  },
  text: {
    marginHorizontal: 10,
    color: 'black',
    fontSize: 16
  },
  box4: {
    width: 80, height: 60,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    margin: 20,
    borderRadius: 10,
    elevation: 2
  },
  box5: {
    width: 40, height: 40
  },
  eyeIcon: {
    position: 'absolute',
    top: 10,
    right: 10,
  },
  eyeIconImage: {
    width: 30,
    height: 30,
  },
});
