import { Image, StyleSheet } from 'react-native'
import React from 'react'

export default function AssetImage({ width, height, mode, data, radius }) {
  return (
    <Image 
      source={data}
      style={styles.image(width, height, mode, radius)}
    />
  )
}

const styles = StyleSheet.create({
  image: (width, height, mode, radius) => ({
    width,
    height,
    resizeMode: mode,
    borderRadius: radius
  })
})