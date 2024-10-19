import { Image, StyleSheet } from 'react-native'
import React from 'react'

export default function NetworkImage({ source, width, height, radius }) {
  return (
    <Image 
      source={{uri: source}}
      style={styles.image(width, height, radius)}
    />
  )
}

const styles = StyleSheet.create({
  image: (width, height, radius) => ({
    width: width,
    height: height,
    borderBottomLeftRadius: radius,
    borderBottomRightRadius: radius,
    resizeMode: 'cover',
  })
})