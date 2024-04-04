import Config from 'react-native-config'
import { FlatList, Image,  StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';


const ListHoaDonComp = (props) => {
  const { navigation } = props
  const [listHD, setlistHD] = useState([])
  const [timKiemTenKH, settimKiemTenKH] = useState('')
  const [search, setsearch] = useState([])
  const localhost = Config.localhost


  const handleSearch = (text) => {
    settimKiemTenKH(text)
    const filteredData = listHD.filter(item =>
      item.khachhang.tenKhachHang.toLowerCase().includes(text.toLowerCase())
    );
     setsearch(filteredData);
  };
  

  const getListHoaDon = () => {
    const url_API = `http://${localhost}:3000/hoadons`
    fetch(url_API)
      .then(res => res.json())
      .then(resJson => {
        setlistHD(resJson.data)
      })
      .catch(err => console.log('Lỗi lấy danh sách hóa đơn: ', err))
  }


  const ItemHoaDon = ({ item }) => {  
    const updateThanhToan = ({item}) =>{
      fetch(`http://${localhost}:3000/hoadons/updatett/${item._id}`,
      {
        method:'PUT',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({trangthai: !item.trangthai})
      })
      .then(res => res.json())
      .then(data => {
        if(data.success){
          setlistHD(data.data)
        }
      })
      .catch(err=>console.log(err))
     }
    const date = new Date(item.ngaymua)
    const dateS = date.toLocaleDateString()
    return (
      <TouchableOpacity style={styles.item} onPress={() => { navigation.navigate('ShowHoaDonCT',
      {id: item._id, tenKH: item.khachhang.tenKhachHang,tenNV: item.nhanvien.tenNhanVien}) }}>
        <Text style={[styles.text_item,{textAlign:'center', margin:10, fontSize:18}]}>Mã hóa đơn: {item._id}</Text>
        <View style={styles.item_contents}>
          <View style={styles.item_Box}>
          <Text style={styles.text_item}>Ngày tạo: {dateS}</Text>
            {/* <Text style={styles.text_item}>Khách hàng: {item.khachhang.hoTen}</Text>
            <Text style={styles.text_item}>Nhân viên: {item.nhanvien.hoTen}</Text> */}
            <Text style={styles.text_item}>Trạng thái: {item.trangthai ? 'đã thanh toán' : 'chưa thanh toán'}</Text>
          </View>
          <View style={[styles.item_Box,{backgroundColor:'yellow',justifyContent:'center',alignItems:'center'}]}>
            <Text style={[styles.text_item,{}]}>Tổng tiền: {item.tongtien}</Text>
          </View>
        </View>
        <TouchableOpacity style={styles.btnItem} onPress={()=>{updateThanhToan({item})}} >
          <Icon name='id-card-o' size={24} color={'black'} />
        </TouchableOpacity>
      </TouchableOpacity>

    )
  }
  useEffect(() => {
    getListHoaDon()
  }, [])
  return (
    <View style={styles.container}>

      <Image source={require('../image/trangTri.png')} />
      <View style={styles.contents}>
        <View style={styles.input}>
          <TextInput style={{ flex: 1, color: 'black', }} 
          placeholder='Tìm kiếm hóa đơn theo tên kh' 
          placeholderTextColor="gray" 
          value={timKiemTenKH}
          onChangeText={handleSearch}/>
          <TouchableOpacity style={styles.icon} >
            <Icon
              name={'search'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
          
        </View>
        <View style={styles.content_listHoaDon}>
          <FlatList
            data={search.length == 0 ? listHD: search}
            keyExtractor={item => item._id}
            renderItem={({ item }) => (<ItemHoaDon item={item} />)}
          />
          <TouchableOpacity onPress={()=> console.log('Click')} style={styles.btnThem}>
          <Icon
              name={'plus'}
              size={24}
              color="black"
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  )
}

export default ListHoaDonComp

const styles = StyleSheet.create({
  container: {
    flex: 1
  },

  contents: {
    position: 'absolute',
    top: 15,
    bottom: 15,
    start: 15,
    end: 15,
    flex: 1,

    borderRadius: 10
  },
  input: {
    flex: 0.5,
    borderWidth: 1,
    borderColor: 'gray',
    borderRadius: 10,
    flexDirection: 'row',
    alignItems: 'center',
    color: "gray",
    backgroundColor: '#E8ECF4'
  },
  icon: {
    marginEnd: 10
  },
  content_listHoaDon: {
    backgroundColor: '#fff',
    flex: 6.5,
    marginTop: 20,
    borderRadius: 10,
    borderWidth: 1,
    borderColor: 'gray'

  },
  item: {

    backgroundColor: '#E8ECF4',
    borderRadius: 10,
    margin: 10,
    padding: 10,
    
  },

  btnItem: {

    backgroundColor: '#FFC600',
    marginTop: 10,
    justifyContent: 'center',
    alignItems: 'center',
    borderRadius: 10,
    padding:10
  },
  item_contents: {
    flexDirection: 'row'
  },
  text_item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  },
  item_Box: {
    flex: 1,
    justifyContent:'space-between',
    
  },
  btnThem: {
    backgroundColor: '#FFC600',
    position: 'absolute',
    width: 60,
    height: 60,
    borderRadius: 30,
    bottom: 30,
    right: 30,
    alignItems:'center',
    justifyContent:'center'
  }
})