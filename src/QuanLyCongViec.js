import { FlatList, ImageBackground, Modal, Pressable, StyleSheet, Text, ToastAndroid, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import SearchBar from './components/SearchBar'

const QuanLyCongViec = () => {
  const data = [
    {
      id: 1,
      tenCongViec: 'Làm bài tập về nhà',
      nhanVien: 'Nguyễn Văn A',
      khachHang: 'Vũ Văn B',
      ngayBatDau: '2021-10-01',
      ngayKetThuc: '2021-10-10',
      trangThai: true,
      moTa: 'Làm bài tập về nhà môn lập trình di động',
    },
    {
      id: 2,
      tenCongViec: 'Giặt quần áo',
      nhanVien: 'Vương Văn A',
      khachHang: 'Vũ Minh Khánh',
      ngayBatDau: '2021-10-01',
      ngayKetThuc: '2021-10-10',
      trangThai: false,
      moTa: 'Làm bài tập về nhà môn lập trình di động',
    },
    {
      id: 3,
      tenCongViec: 'Quét nhà',
      nhanVien: 'Hồ Văn Tiêu',
      khachHang: 'Nguyễn Trường Giang',
      ngayBatDau: '2021-10-01',
      ngayKetThuc: '2021-10-10',
      trangThai: false,
      moTa: 'Làm bài tập về nhà môn lập trình di động',
    },
    {
      id: 4,
      tenCongViec: 'Nấu cơm',
      nhanVien: 'Trần Văn B',
      khachHang: 'Vũ Văn B',
      ngayBatDau: '2021-10-01',
      ngayKetThuc: '2021-10-10',
      trangThai: true,
      moTa: 'Làm bài tập về nhà môn lập trình di động',
    }

  ]

  const [showDialogOption, setshowDialogOption] = useState(false)
  const [showDialogUpdate, setshowDialogUpdate] = useState(false)
  const [showDialogDelete, setshowDialogDelete] = useState(false)

  const [tenCongViec, settenCongViec] = useState('')
  const [nhanVien, setnhanVien] = useState('')
  const [khachHang, setkhachHang] = useState('')
  const [ngayBatDau, setngayBatDau] = useState('')
  const [ngayKetThuc, setngayKetThuc] = useState('')
  const [moTa, setmoTa] = useState('')
  const [trangThai, settrangThai] = useState(false)



  const renderItem = ({ item }) => {
    return (
      <TouchableOpacity
        onPress={() => {
          setshowDialogOption(true)
          settenCongViec(item.tenCongViec)
          setnhanVien(item.nhanVien)
          setkhachHang(item.khachHang)
          setngayBatDau(item.ngayBatDau)
          setngayKetThuc(item.ngayKetThuc)
          setmoTa(item.moTa)
          settrangThai(item.trangThai)
        }}
        style={{
          backgroundColor: '#E8E8E8',
          margin: 10,
          padding: 10,
          borderRadius: 10,
        }}>
        <Text style={st.text}>Tên công việc: {item.tenCongViec}</Text>
        <Text style={st.text}>Tên nhân viên: {item.nhanVien}</Text>
        <Text style={st.text}>Tên khách hàng: {item.khachHang}</Text>
        <Text style={st.text}>Trạng thái: {item.trangThai ? 'Hoàn Thành' : 'Chưa hoàn thành'}</Text>
      </TouchableOpacity>
    )
  }

  return (
    <View style={st.container}>

      {/* ảnh nền */}
      <ImageBackground
        resizeMode='cover'
        style={{
          width: '100%',
          height: '100%',
          position: 'absolute',
          top: 0,
        }}
        source={require('./image/anhNen.png')}>

        {/* thanh tìm kiếm */}
        <SearchBar />

        {/* danh sách công việc */}
        <View
          style={st.khungDanhSach}
        >
          <Text style={st.tieuDeDS}>
            Danh sách công việc
          </Text>
          <FlatList
            data={data}
            keyExtractor={item => item.id}
            renderItem={renderItem}
          />
        </View>

        {/* dialog chọn chức năng */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDialogOption}>
          <Pressable
            onPress={() => setshowDialogOption(false)}
            style={st.khungDialog}>

            <View style={[st.dialog, { alignItems: 'center' }]}>
              <Text style={st.dialogTitle}>
                Chọn chức năng
              </Text>

              <TouchableOpacity
                onPress={() => {
                  setshowDialogUpdate(true)
                  setshowDialogOption(false)
                }}
                style={[st.dialogButton, { backgroundColor: '#1E232C' }]}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                  Cập nhật công việc
                </Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => {
                  setshowDialogDelete(true)
                  setshowDialogOption(false)
                }}
                style={[st.dialogButton, { backgroundColor: '#F14336' }]}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                  Xóa công việc
                </Text>
              </TouchableOpacity>

            </View>

          </Pressable>
        </Modal>

        {/* dialog cập nhật công việc */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDialogUpdate}>
          <Pressable
            onPress={() => {
              setshowDialogUpdate(false)
              settenCongViec('')
              setnhanVien('')
              setkhachHang('')
              setngayBatDau('')
              setngayKetThuc('')
              setmoTa('')
              settrangThai(false)
            }}
            style={st.khungDialog}>

            <View style={st.dialog}>
              <Text style={[st.dialogTitle, { alignSelf: 'center', }]}>
                Cập nhật công việc
              </Text>

              <Text style={st.text}>Tên công việc: {tenCongViec}</Text>
              <Text style={st.text}>Tên nhân viên: {nhanVien}</Text>
              <Text style={st.text}>Tên khách hàng: {khachHang}</Text>
              <Text style={st.text}>Ngày bắt đầu: {ngayBatDau}</Text>
              <Text style={st.text}>Ngày kết thúc: {ngayKetThuc}</Text>
              <Text style={st.text}>Mô tả: {moTa}</Text>
              <Text style={st.text}>Trạng thái công việc:</Text>

              <TouchableOpacity
                onPress={() => settrangThai(true)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={[st.radioTrangThai, { backgroundColor: trangThai ? '#1E232C' : 'white' }]}>
                </View>
                <Text style={st.text}>Hoàn thành</Text>
              </TouchableOpacity>

              <TouchableOpacity
                onPress={() => settrangThai(false)}
                style={{
                  flexDirection: 'row',
                  alignItems: 'center',
                }}>
                <View style={[st.radioTrangThai, { backgroundColor: trangThai ? 'white' : '#1E232C' }]}>
                </View>
                <Text style={st.text}>Chưa hoàn thành</Text>
              </TouchableOpacity>


              <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show('Cập nhật công việc thành công', ToastAndroid.SHORT)
                  setshowDialogUpdate(false)
                  settenCongViec('')
                  setnhanVien('')
                  setkhachHang('')
                  setngayBatDau('')
                  setngayKetThuc('')
                  setmoTa('')
                  settrangThai(false)
                }}
                style={[st.dialogButton, { backgroundColor: '#1E232C' }]}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                  Hoàn tất
                </Text>
              </TouchableOpacity>


            </View>

          </Pressable>
        </Modal>

        {/* dialog xóa công việc */}
        <Modal
          animationType="fade"
          transparent={true}
          visible={showDialogDelete}>
          <Pressable
            onPress={() => setshowDialogDelete(false)}
            style={st.khungDialog}>

            <View style={st.dialog}>
              <Text style={[st.dialogTitle, { alignSelf: 'center', }]}>
                Xóa công việc
              </Text>


              <TouchableOpacity
                onPress={() => {
                  ToastAndroid.show('Xóa thành công', ToastAndroid.SHORT)
                  setshowDialogDelete(false)
                }}
                style={[st.dialogButton, { backgroundColor: '#F14336' }]}>
                <Text style={{
                  color: 'white',
                  fontSize: 18,
                }}>
                  Xác nhận
                </Text>
              </TouchableOpacity>


            </View>

          </Pressable>
        </Modal>

      </ImageBackground>
    </View>
  )
}

export default QuanLyCongViec

const st = StyleSheet.create({
  container: {
    flex: 1,
  },
  khungDanhSach: {
    backgroundColor: 'white',
    flex: 1,
    marginHorizontal: 20,
    borderRadius: 20,
    marginBottom: 15
  },
  tieuDeDS: {
    fontSize: 20,
    fontWeight: 'bold',
    margin: 10,
    alignSelf: 'center',
    color: 'black',
  },
  text: {
    fontSize: 15,
    fontWeight: 'bold',
    marginVertical: 8,
    color: 'black',
  },

  khungDialog: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.6)',
  },

  dialog: {
    backgroundColor: '#F0F0F0',
    width: '80%',
    borderRadius: 20,
    padding: 20,
  },

  dialogTitle: {
    color: 'black',
    fontSize: 25,
    fontWeight: 'bold',
    marginVertical: 10
  },

  radioTrangThai: {
    width: 20,
    height: 20,
    borderColor: 'black',
    borderWidth: 2,
    borderRadius: 10,
    marginRight: 10,
  },

  dialogButton: {
    width: '100%',
    height: 50,
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 10,
  }
})