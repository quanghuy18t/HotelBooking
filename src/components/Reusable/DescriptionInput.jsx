import { StyleSheet, Text, TextInput, View } from 'react-native'
import React from 'react'

export default function DescriptionInput({
  onChange,
  placeholder,
  borderRadius,
  width,
  height,
  color,
  backgroundColor,
  borderColor,
  padding,
  family,
  text
}) {
  return (
    <View style={{marginHorizontal: 25}}>
      <TextInput 
        value={text}
        multiline
        placeholder={placeholder}
        style={styles.input(
          borderRadius,
          width,
          height,
          color,
          backgroundColor,
          borderColor,
          padding,
          family
        )}
        onChangeText={onChange}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  input: (
    borderRadius,
    width,
    height,
    color,
    backgroundColor,
    borderColor,
    padding,
    family
  ) => ({
    width,
    height,
    borderColor,
    backgroundColor,
    borderRadius,
    color,
    padding,
    fontFamily: family,
    fontSize: 16,
  })
})