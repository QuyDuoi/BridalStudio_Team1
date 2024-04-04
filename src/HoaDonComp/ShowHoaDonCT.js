
import Config from 'react-native-config'
import { StyleSheet, SafeAreaView, TouchableOpacity, TextInput, Image, View, Text, FlatList } from 'react-native'
import React, { useEffect, useState } from 'react'
import Icon from 'react-native-vector-icons/FontAwesome';

const ShowHoaDonCT = (props) => {
  const { navigation } = props
  const { id, tenKH, tenNV } = props.route.params
  const [checkUpdate, setcheckUpdate] = useState(false)
  const [listDV, setlistDV] = useState([])




  const localhost = Config.localhost


  const getListHoaDonDetail = () => {
    fetch(`http://${localhost}:3000/hoadons/${id}`)
      .then(res => res.json())
      .then(data => {

        setlistDV(data.data)
      })
      .catch(err => console.log("ERR get HoaDon Detail: ", err))
  }
  const updateDV = (list) => {
    setlistDV(list)
  }
  const ItemDichVu = ({ item }) => {
    const [soLuongUpdate, setsoLuongUpdate] = useState(item.soLuong)
    const [listUP, setListUP] = useState([])

    return (
      <View style={styles.item}>
        <View>

          <Text style={styles.text_item}>Dịch vụ: {item.tenDV}</Text>
          <Text style={styles.text_item}>Giá: {item.gia}</Text>
        </View>
        <View>
          {
            (!checkUpdate) ?
              (<Text style={styles.text_item}>Số lượng: {item.soLuong}</Text>) :
              (<View>
                <Text>Nhập số lượng</Text>
                <TextInput style={{ borderRadius: 5, borderWidth: 1 }} value={soLuongUpdate.toString()} onChangeText={txt => {
                  setsoLuongUpdate(txt)
                  const itemIndex = listDV.findIndex(it => it._id === item._id)
                  if (itemIndex !== -1) {
                    let newData = [...listDV]
                    newData[itemIndex] = { ...newData[itemIndex], soLuong: soLuongUpdate }
                    setListUP(newData)
                  }
                }
                } />

              </View>)
          }
          <Text style={styles.text_item}>Tổng tiền DV: {item.sotien}</Text>
        </View>
        {/* <TouchableOpacity onPress={()=> {
          setlistDV(listUP)
          console.log(listDV);
        }}>
        <Text>Lưu</Text>
        </TouchableOpacity> */}
      </View>
    )
  }
  useEffect(() => {
    getListHoaDonDetail()
  }, [])
  return (
    <SafeAreaView style={styles.container}>
      <Image source={require('../image/trangTri.png')} />
      <View style={styles.contents}>
        <TouchableOpacity style={styles.icon} onPress={() => { navigation.navigate('ListHoaDonComp') }}>
          <Icon name='chevron-left' size={25} color={'#000'} />
        </TouchableOpacity>
        <Text style={styles.title_content}>Chi tiết hóa đơn</Text>
        <View style={{ justifyContent: 'space-between', width: '100%', padding: 15 }}>
          <Text style={styles.text_item}>Nhân viên: {tenNV}</Text>
          <Text style={styles.text_item}>Khách hàng: {tenKH}</Text>
        </View>
        <Text style={{ fontSize: 18, fontWeight: 'bold', color: '#000' }}>Danh sách dịch vụ</Text>
        <FlatList
          data={listDV}
          keyExtractor={item => item._id}
          renderItem={({ item }) => (<ItemDichVu item={item} />)}
        />
        {/* <TouchableOpacity style={{backgroundColor:'gray',width:'90%',justifyContent:'center',alignItems:'center',margin:5, padding:5, borderRadius:10}}
          onPress={() => { setcheckUpdate(!checkUpdate) }}>
          <Text>{!checkUpdate ? 'update' : 'quay lại'}</Text>
        </TouchableOpacity> */}
      </View>
    </SafeAreaView>
  )
}

export default ShowHoaDonCT

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
    borderRadius: 10,
    backgroundColor: '#fff',
    borderColor: 'gray',
    borderWidth: 1,
    alignItems: 'center'

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
    position: 'absolute',
    top: 10,
    left: 20,

  },
  title_content: {
    marginTop: 10,
    fontSize: 20,
    fontWeight: 'bold',
    color: '#000'
  },
  item: {
    flexDirection: 'row',
    width: '95%',
    justifyContent: 'space-between',
    alignItems: 'center',
    margin: 5,
    padding: 10,
    borderRadius: 10,
    backgroundColor: '#E8E8E8'
  },
  text_item: {
    fontSize: 16,
    fontWeight: 'bold',
    color: '#000'
  }

})