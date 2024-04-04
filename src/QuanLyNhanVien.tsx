import {
  Image,
  StyleSheet,
  Text,
  TextInput,
  View,
  Modal,
  TouchableOpacity,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import ListNhanVien from './ListItem/ListNhanVien';
import Icon from 'react-native-vector-icons/FontAwesome';
import DropdownComponent from './CustomComponent/DropdownComponent';
import Radio from './CustomComponent/RadioNhanVien';
import CustomThongBao from './CustomComponent/CustomThongBao';

function QuanLyNhanVien(): React.JSX.Element {
  const [modalLuaChon, setModalLuaChon] = useState(false);
  const [modalChiTiet, setModalChiTiet] = useState(false);
  const [thongTinNhanVien, setThongTinNhanVien] = useState('');
  const [modalThemNv, setModalThemNv] = useState(false);
  const [modalCapNhat, setModalCapNhat] = useState(false);
  const [idNhanVien, setIdNhanVien] = useState('');
  const [tenNhanVien, setTenNhanVien] = useState('');
  const [soDienThoai, setSoDienThoai] = useState('');
  const [vaiTro, setVaiTro] = useState('');
  const [email, setEmail] = useState('');
  const [taiKhoan, setTaiKhoan] = useState('');
  const [matKhau, setMatKhau] = useState('');
  const [idTrangThai, setIdTrangThai] = useState('1');
  const [trangThai, setTrangThai] = useState(0);
  const [tenCongViec, setTenCongViec] = useState('');
  const [moTaCongViec, setMoTaCongViec] = useState('');
  const [ngayBatDau, setNgayBatDau] = useState('');
  const [ngayKetThuc, setNgayKetThuc] = useState('');
  const [maKhachhang, setMaKhachHang] = useState('');
  const [trangThaiCv, setTrangThaiCv] = useState(0);
  const [errorTenNv, setErrorTenNv] = useState('');
  const [errorSdt, setErrorSdt] = useState('');
  const [errorVaiTro, setErrorVaiTro] = useState('');
  const [errorEmail, setErrorEmail] = useState('');
  const [errorTk, setErrorTk] = useState('');
  const [errorMk, setErrorMk] = useState('');
  const [trangThaiThem, setTrangThaiThem] = useState(false);
  const [catNhapDuLieu, setCapNhatDuLieu] = useState(false);
  const [modalGiaoCongViec, setModalGiaoCongViec] = useState(false);
  const [modalThemThanhCong, setModalThemThanhCong] = useState(false);
  const [modalThemThatBai, setModalThemThatBai] = useState(false);
  const [modalUpdateThanhCong, setModalUpdateThanhCong] = useState(false);
  const [modalUpdateThatBai, setModalUpdateThatBai] = useState(false);

  const lamMoiState = () => {
    setTenNhanVien('');
    setEmail('');
    setSoDienThoai('');
    setVaiTro('');
    setTaiKhoan('');
    setMatKhau('');
    setTrangThai(0);
    setErrorEmail('');
    setErrorMk('');
    setErrorSdt('');
    setErrorTenNv('');
    setErrorVaiTro('');
    setErrorTk('');
  };

  const validateForm = () => {
    let check = true;
    const checkEmail = /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/;

    const checkPhone = /^(03|05|07|08|09|01[2|6|8|9])+([0-9]{8})$/;
    if (!tenNhanVien.trim()) {
      setErrorTenNv('Vui lòng nhập tên nhân viên!');
      check = false;
    } else {
      setErrorTenNv('');
    }

    if (!soDienThoai.trim()) {
      setErrorSdt('Vui lòng nhập số điện thoại!');
      check = false;
    } else if (!checkPhone.test(soDienThoai.trim())) {
      setErrorSdt('Số điện thoại không hợp lệ!');
      check = false;
    } else {
      setErrorSdt('');
    }

    if (!email.trim()) {
      setErrorEmail('Vui lòng nhập Email!');
      check = false;
    } else if (!checkEmail.test(email.trim())) {
      setErrorEmail('Email không đúng định dạng!');
      check = false;
    } else {
      setErrorEmail('');
    }

    if (!vaiTro) {
      setErrorVaiTro('Vui lòng chọn vai trò!');
      check = false;
    } else {
      setErrorVaiTro('');
    }

    if (!check) {
      return;
    }

    if (!modalCapNhat) {
      setTrangThaiThem(true);
    } else {
      let nhanVien = {
        tenNhanVien: tenNhanVien,
        vaiTro: vaiTro,
        email: email,
        soDienThoai: soDienThoai,
        taiKhoan: taiKhoan,
        matKhau: matKhau,
        trangThai: trangThai,
      };
      fetch('http://10.24.63.221:3000/api/capNhatThongTinNV/' + idNhanVien, {
        method: 'PUT',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(nhanVien),
      })
        .then(res => {
          if (res.status == 200) {
            setModalUpdateThanhCong(true);
            setTimeout(() => {
              setModalUpdateThanhCong(false);
            }, 2500);
            setTrangThaiThem(false);
            setCapNhatDuLieu(!catNhapDuLieu);
          } else {
            setModalUpdateThatBai(true);
            setTimeout(() => {
              setModalUpdateThatBai(false);
            }, 2500);
          }
        })
        .catch(ex => {
          console.log(ex);
        });
      lamMoiState();
      setModalCapNhat(false);
      setModalLuaChon(false);
    }
  };

  useEffect(() => {
    if (idTrangThai === '1') {
      setTrangThai(0);
    } else {
      setTrangThai(1);
    }
  }, [idTrangThai]);

  const layThongTin = () => {
    setIdNhanVien(thongTinNhanVien._id);
    setTenNhanVien(thongTinNhanVien.tenNhanVien);
    setEmail(thongTinNhanVien.email);
    setVaiTro(thongTinNhanVien.vaiTro);
    setSoDienThoai(thongTinNhanVien.soDienThoai);
    setTaiKhoan(thongTinNhanVien.taiKhoan);
    setMatKhau(thongTinNhanVien.matKhau);
    setTrangThai(thongTinNhanVien.trangThai);
  };

  const validateTaiKhoan = () => {
    let check = true;
    const checkTaiKhoan = /^[a-zA-Z0-9_-]{6,20}$/;
    const checkMatKhau = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d]{6,20}$/;

    if (!taiKhoan.trim()) {
      setErrorTk('Vui lòng nhập tài khoản!');
      check = false;
    } else if (taiKhoan.length < 6) {
      setErrorTk('Tài khoản phải nhiều hơn 6 ký tự!');
      check = false;
    } else if (taiKhoan.length > 20) {
      setErrorTk('Tài khoản phải ít hơn 20 ký tự!');
      check = false;
    } else if (!checkTaiKhoan.test(taiKhoan.trim())) {
      setErrorTk('Tài khoản không hợp lệ!');
      check = false;
    } else {
      setErrorTk('');
    }

    if (!matKhau.trim()) {
      setErrorMk('Vui lòng nhập mật khẩu!');
      check = false;
    } else if (!checkMatKhau.test(matKhau.trim())) {
      setErrorMk(
        'Mật khẩu phải chứa ít nhất 1 chữ hoa, 1 chữ thường, 1 chữ số, từ 6 đến 20 ký tự!',
      );
      check = false;
    } else {
      setErrorMk('');
    }

    if (!check) {
      return;
    }

    let nhanVien = {
      tenNhanVien: tenNhanVien,
      vaiTro: vaiTro,
      email: email,
      soDienThoai: soDienThoai,
      taiKhoan: taiKhoan,
      matKhau: matKhau,
      trangThai: trangThai,
    };

    fetch('http://10.24.63.221:3000/api/themNhanVien', {
      method: 'POST',
      headers: {
        Accept: 'application/json',
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(nhanVien),
    })
      .then(res => {
        if (res.status == 200) {
          setModalThemThanhCong(true);
          setTimeout(() => {
            setModalThemThanhCong(false);
          }, 2500);
          setCapNhatDuLieu(!catNhapDuLieu);
          setTrangThaiThem(false);
        } else {
          setModalThemThatBai(true);
          setTimeout(() => {
            setModalThemThatBai(false);
          }, 2500);
        }
      })
      .catch(ex => {
        console.log(ex);
      });
    setModalThemNv(false);
    lamMoiState();
    
  };

  return (
    <View style={styles.container}>
      <Image style={styles.trangTri} source={require('./image/trangTri.png')} />
      <TextInput style={styles.timKiem} placeholder="Tìm kiếm nhân viên" />
      <View style={styles.box1}>
        <Text style={styles.title}>Danh sách nhân viên</Text>
        <ListNhanVien
          moModalLuaChon={item => {
            setModalLuaChon(true), setThongTinNhanVien(item);
          }}
          capNhat={catNhapDuLieu}
        />
        <View
          style={{
            width: '100%',
            flexDirection: 'row',
            justifyContent: 'flex-end',
          }}>
          <TouchableOpacity
            style={styles.btnThem}
            onPress={() => {
              setModalThemNv(true);
              lamMoiState();
            }}>
            <Text style={{fontSize: 35, color: 'white'}}>+</Text>
          </TouchableOpacity>
        </View>
      </View>

      <Modal animationType="slide" transparent={true} visible={modalLuaChon}>
        <View style={styles.modalLuaChon}>
          <TouchableOpacity
            style={styles.back}
            onPress={() => {
              setModalLuaChon(false);
            }}>
            <Icon name="chevron-left" size={18} color={'black'} />
          </TouchableOpacity>
          <Image
            style={styles.image}
            source={require('./image/bridalstudio.jpg')}
          />
          <Text style={styles.text}>Chọn chức năng</Text>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalCapNhat(true);
              setTrangThaiThem(false);
              layThongTin();
            }}>
            <Text style={styles.text1}>Cập nhật thông tin</Text>
          </TouchableOpacity>
          <TouchableOpacity
            style={styles.button}
            onPress={() => {
              setModalChiTiet(true);
            }}>
            <Text style={styles.text1}>Xem chi tiết</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button}>
            <Text style={styles.text1}>Khôi phục mật khẩu</Text>
          </TouchableOpacity>
          <TouchableOpacity style={styles.button} onPress={() => setModalGiaoCongViec(true)}>
            <Text style={styles.text1}>Giao nhiệm vụ</Text>
          </TouchableOpacity>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalChiTiet}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalChiTiet(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={styles.trangTri}
            source={require('./image/trangTri.png')}
          />
          <View style={styles.modalChiTiet}>
            <Text style={styles.text2}>Thông tin nhân viên</Text>
            <View style={styles.box2}>
              <Text numberOfLines={2} style={styles.text3}>
                Tên nhân viên: {thongTinNhanVien.tenNhanVien}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Email: {thongTinNhanVien.email}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Số điện thoại: {thongTinNhanVien.soDienThoai}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Tài khoản: {thongTinNhanVien.taiKhoan}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Vai trò:{' '}
                {thongTinNhanVien.vaiTro == 0
                  ? 'Quản trị viên'
                  : thongTinNhanVien.vaiTro == 1
                  ? 'Nhân viên bán hàng'
                  : thongTinNhanVien.vaiTro == 2
                  ? 'Nhân viên Makeup'
                  : 'Nhân viên Phục vụ'}
              </Text>
              <Text numberOfLines={2} style={styles.text3}>
                Trạng thái hoạt động:{' '}
                {thongTinNhanVien.trangThai == 0
                  ? 'Đang làm việc'
                  : 'Ngưng hoạt động'}
              </Text>
              <View style={{width: '100%', position: 'absolute', bottom: 10}}>
                <TouchableOpacity
                  style={styles.btnQuayLai}
                  onPress={() => {
                    setModalChiTiet(false);
                  }}>
                  <Text style={styles.text1}>Quay lại</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalThemNv}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalThemNv(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={styles.trangTri}
            source={require('./image/trangTri.png')}
          />
          <View style={styles.modalChiTiet}>
            <TouchableOpacity
              style={styles.backH}
              onPress={() => {
                setModalThemNv(false);
                lamMoiState();
              }}>
              <Icon name="angle-left" size={18} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.text2}>Thêm nhân viên mới</Text>
            {!trangThaiThem ? (
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tên nhân viên"
                    value={tenNhanVien}
                    onChangeText={text => {
                      setTenNhanVien(text);
                    }}
                  />
                </View>
                {errorTenNv && (
                  <Text style={styles.errorText}>{errorTenNv}</Text>
                )}
                <View style={styles.viewInput}>
                  <View style={styles.dropdown}>
                    <DropdownComponent
                      onSelectVaiTro={value => {
                        setVaiTro(value);
                      }}
                      selectValue={null}
                    />
                  </View>
                </View>
                {errorVaiTro && (
                  <Text style={styles.errorText}>{errorVaiTro}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {errorEmail && (
                  <Text style={styles.errorText}>{errorEmail}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Số điện thoại"
                    value={soDienThoai}
                    onChangeText={text => {
                      setSoDienThoai(text);
                    }}
                  />
                </View>
                {errorSdt && <Text style={styles.errorText}>{errorSdt}</Text>}
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    style={styles.btnQuayLai}
                    onPress={validateForm}>
                    <Text style={styles.text1}>Tiếp tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {trangThaiThem ? (
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tài khoản"
                    onChangeText={text => {
                      setTaiKhoan(text);
                    }}
                  />
                </View>
                {errorTk && <Text style={styles.errorText}>{errorTk}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Mật khẩu"
                    onChangeText={text => {
                      setMatKhau(text);
                    }}
                  />
                </View>
                {errorMk && <Text style={styles.errorText}>{errorMk}</Text>}
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 10,
                      marginLeft: 20,
                    }}>
                    Trạng thái hoạt động
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Radio
                    chonTrangThai={item => setIdTrangThai(item)}
                    trangThai={null}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.btnXacNhan}
                    onPress={() => {
                      setTrangThaiThem(false);
                      setTenNhanVien(tenNhanVien);
                      setEmail(email);
                      setSoDienThoai(soDienThoai);
                      setVaiTro(vaiTro);
                    }}>
                    <Text style={styles.text1}>Quay lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnXacNhan}
                    onPress={validateTaiKhoan}>
                    <Text style={styles.text1}>Lưu thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalCapNhat}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalChiTiet(false);
        }}>
        <KeyboardAvoidingView
          style={{flex: 1}}
          behavior={Platform.OS === 'ios' ? 'padding' : 'height'}>
          <View style={{flex: 1, backgroundColor: 'white'}}>
            <Image
              style={styles.trangTri}
              source={require('./image/trangTri.png')}
            />
            <View style={styles.modalChiTiet}>
              <TouchableOpacity
                style={styles.backH}
                onPress={() => {
                  setModalCapNhat(false);
                }}>
                <Icon name="angle-left" size={18} color={'black'} />
              </TouchableOpacity>
              <Text style={styles.text2}>Cập nhật thông tin</Text>
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tên nhân viên"
                    value={tenNhanVien}
                    onChangeText={text => {
                      setTenNhanVien(text);
                    }}
                  />
                </View>
                {errorTenNv && (
                  <Text style={styles.errorText}>{errorTenNv}</Text>
                )}
                <View style={styles.viewInput}>
                  <View style={styles.dropdown}>
                    <DropdownComponent
                      onSelectVaiTro={value => {
                        setVaiTro(value);
                      }}
                      selectValue={thongTinNhanVien.vaiTro}
                    />
                  </View>
                </View>
                {errorVaiTro && (
                  <Text style={styles.errorText}>{errorVaiTro}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {errorEmail && (
                  <Text style={styles.errorText}>{errorEmail}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Số điện thoại"
                    value={soDienThoai}
                    onChangeText={text => {
                      setSoDienThoai(text);
                    }}
                  />
                </View>
                {errorSdt && <Text style={styles.errorText}>{errorSdt}</Text>}
              </View>
              <View style={{width: '100%'}}>
                <Text
                  style={{
                    color: 'black',
                    fontSize: 15,
                    fontWeight: 'bold',
                    marginTop: 10,
                    marginLeft: 20,
                  }}>
                  Trạng thái hoạt động
                </Text>
              </View>
              <View style={{width: '100%'}}>
                <Radio
                  chonTrangThai={item => setIdTrangThai(item)}
                  trangThai={thongTinNhanVien.trangThai}
                />
              </View>
              <View style={{width: '100%'}}>
                <TouchableOpacity
                  style={styles.btnQuayLai}
                  onPress={() => {
                    validateForm();
                  }}>
                  <Text style={styles.text1}>Lưu thông tin</Text>
                </TouchableOpacity>
              </View>
            </View>
          </View>
        </KeyboardAvoidingView>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalThemThanhCong}>
        <View style={styles.modalThanhCong}>
          <CustomThongBao text='Thêm nhân viên mới thành công' iconUrl={require('./image/succes.png')}/>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalThemThatBai}>
        <View style={styles.modalThanhCong}>
          <CustomThongBao text='Thêm nhân viên mới thất bại' iconUrl={require('./image/fail.png')}/>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalUpdateThanhCong}>
        <View style={styles.modalThanhCong}>
          <CustomThongBao text='Cập nhật thông tin thành công' iconUrl={require('./image/succes.png')}/>
        </View>
      </Modal>
      <Modal animationType="slide" transparent={true} visible={modalUpdateThatBai}>
        <View style={styles.modalThanhCong}>
          <CustomThongBao text='Cập nhật thông tin thất bại' iconUrl={require('./image/fail.png')}/>
        </View>
      </Modal>
      <Modal
        animationType="slide"
        visible={modalGiaoCongViec}
        presentationStyle="pageSheet"
        onRequestClose={() => {
          setModalGiaoCongViec(false);
        }}>
        <View style={{flex: 1, backgroundColor: 'white'}}>
          <Image
            style={styles.trangTri}
            source={require('./image/trangTri.png')}
          />
          <View style={styles.modalChiTiet}>
            <TouchableOpacity
              style={styles.backH}
              onPress={() => {
                setModalGiaoCongViec(false);
                lamMoiState();
              }}>
              <Icon name="angle-left" size={18} color={'black'} />
            </TouchableOpacity>
            <Text style={styles.text2}>Tạo công việc</Text>
            {!trangThaiThem ? (
              <View style={styles.viewThem}>
                <Text style={styles.tenNhanVien}><Text style={{fontWeight: 'bold'}}>Tên nhân viên</Text>: {thongTinNhanVien.tenNhanVien}</Text>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tên công việc"
                    onChangeText={text => {
                      setTenNhanVien(text);
                    }}
                  />
                </View>
                {errorTenNv && (
                  <Text style={styles.errorText}>{errorTenNv}</Text>
                )}
                <View style={styles.viewInput}>
                  <View style={styles.dropdown}>
                    <DropdownComponent
                      onSelectVaiTro={value => {
                        setVaiTro(value);
                      }}
                      selectValue={null}
                    />
                  </View>
                </View>
                {errorVaiTro && (
                  <Text style={styles.errorText}>{errorVaiTro}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Email"
                    value={email}
                    onChangeText={text => {
                      setEmail(text);
                    }}
                  />
                </View>
                {errorEmail && (
                  <Text style={styles.errorText}>{errorEmail}</Text>
                )}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Số điện thoại"
                    value={soDienThoai}
                    onChangeText={text => {
                      setSoDienThoai(text);
                    }}
                  />
                </View>
                {errorSdt && <Text style={styles.errorText}>{errorSdt}</Text>}
                <View style={{width: '100%'}}>
                  <TouchableOpacity
                    style={styles.btnQuayLai}
                    onPress={validateForm}>
                    <Text style={styles.text1}>Tiếp tục</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
            {trangThaiThem ? (
              <View style={styles.viewThem}>
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Tài khoản"
                    onChangeText={text => {
                      setTaiKhoan(text);
                    }}
                  />
                </View>
                {errorTk && <Text style={styles.errorText}>{errorTk}</Text>}
                <View style={styles.viewInput}>
                  <TextInput
                    style={styles.edittext}
                    placeholder="Mật khẩu"
                    onChangeText={text => {
                      setMatKhau(text);
                    }}
                  />
                </View>
                {errorMk && <Text style={styles.errorText}>{errorMk}</Text>}
                <View style={{width: '100%'}}>
                  <Text
                    style={{
                      color: 'black',
                      fontSize: 15,
                      fontWeight: 'bold',
                      marginTop: 10,
                      marginLeft: 20,
                    }}>
                    Trạng thái hoạt động
                  </Text>
                </View>
                <View style={{width: '100%'}}>
                  <Radio
                    chonTrangThai={item => setIdTrangThai(item)}
                    trangThai={null}
                  />
                </View>
                <View
                  style={{
                    width: '100%',
                    flexDirection: 'row',
                    justifyContent: 'space-between',
                  }}>
                  <TouchableOpacity
                    style={styles.btnXacNhan}
                    onPress={() => {
                      setTrangThaiThem(false);
                      setTenNhanVien(tenNhanVien);
                      setEmail(email);
                      setSoDienThoai(soDienThoai);
                      setVaiTro(vaiTro);
                    }}>
                    <Text style={styles.text1}>Quay lại</Text>
                  </TouchableOpacity>
                  <TouchableOpacity
                    style={styles.btnXacNhan}
                    onPress={validateTaiKhoan}>
                    <Text style={styles.text1}>Lưu thông tin</Text>
                  </TouchableOpacity>
                </View>
              </View>
            ) : null}
          </View>
        </View>
      </Modal>
    </View>
  );
}

export default QuanLyNhanVien;

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
  timKiem: {
    borderRadius: 8,
    marginHorizontal: 30,
    marginVertical: 20,
    paddingLeft: 20,
    backgroundColor: 'white',
    color: 'black',
  },
  trangTri: {
    width: '100%',
    position: 'absolute',
    top: 0,
  },
  box1: {
    backgroundColor: 'white',
    height: '85%',
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    alignItems: 'center',
  },
  title: {
    color: 'black',
    fontSize: 16,
    fontWeight: 'bold',
    marginVertical: 15,
  },
  modalLuaChon: {
    width: 380,
    height: 582,
    backgroundColor: '#F0F0F0',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    borderRadius: 20,
  },
  image: {
    width: 204,
    height: 200,
  },
  text: {
    fontSize: 22,
    color: 'black',
    fontWeight: '700',
    marginTop: 10,
  },
  button: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    width: '80%',
    borderRadius: 10,
    marginVertical: 10,
  },
  text1: {
    color: 'white',
    fontSize: 16,
    paddingVertical: 12,
  },
  back: {
    width: 25,
    height: 25,
    borderRadius: 7,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
  },
  btnThem: {
    width: 50,
    height: 50,
    backgroundColor: '#FBD141',
    borderRadius: 50,
    justifyContent: 'center',
    alignItems: 'center',
    margin: 10,
  },
  modalChiTiet: {
    backgroundColor: 'white',
    marginHorizontal: 30,
    borderRadius: 15,
    elevation: 2,
    alignItems: 'center',
    marginTop: 'auto',
    marginBottom: 'auto',
    paddingVertical: 20,
    height: '92%',
  },
  text2: {
    margin: 10,
    fontSize: 20,
    color: 'black',
    fontWeight: 'bold',
  },
  box2: {
    width: '90%',
    margin: 10,
    borderRadius: 20,
    height: '70%',
    backgroundColor: '#F7F8F9',
  },
  text3: {
    marginLeft: 12,
    marginTop: 14,
    color: 'black',
    fontSize: 16,
    fontWeight: '600',
  },
  btnQuayLai: {
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  backH: {
    width: 30,
    height: 30,
    borderRadius: 10,
    backgroundColor: 'white',
    justifyContent: 'center',
    alignItems: 'center',
    position: 'absolute',
    top: 10,
    left: 20,
    borderWidth: 1,
  },
  edittext: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    borderColor: '#E8ECF4',
    marginTop: 15,
    paddingLeft: 15,
  },
  dropdown: {
    width: '90%',
    borderWidth: 1,
    backgroundColor: '#F7F8F9',
    borderRadius: 10,
    borderColor: '#E8ECF4',
    marginTop: 15,
  },
  viewThem: {
    width: '100%',
  },
  viewInput: {
    width: '100%',
    alignItems: 'center',
  },
  errorText: {
    marginLeft: '7%',
    marginTop: 5,
    color: 'red',
  },
  btnXacNhan: {
    width: '45%',
    backgroundColor: 'black',
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    margin: 10,
  },
  modalThanhCong: {
    width: 320,
    height: 60,
    backgroundColor: '#E8E8E8',
    justifyContent: 'center',
    alignItems: 'center',
    alignSelf: 'center',
    marginTop: 'auto',
    marginBottom: 40,
    borderRadius: 10,
    borderWidth: 1
  },
  tenNhanVien: {
    color: 'black',
      marginLeft: 20,
      marginVertical: 10,
      fontSize: 16
  }
});
