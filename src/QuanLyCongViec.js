import { Image, ImageBackground, StyleSheet, Text, View } from 'react-native'
import React from 'react'

const QuanLyCongViec = () => {
  return (
    <View style={{
      flex: 1,
    }}>
      <ImageBackground
        resizeMode='cover'
        style={{
          width: '100%',
          height: '50%',
          position: 'absolute',
          top: 0,
        }}
        source={require('./image/anhNen.png')}>

      </ImageBackground>
    </View>
  )
}

export default QuanLyCongViec

const styles = StyleSheet.create({})