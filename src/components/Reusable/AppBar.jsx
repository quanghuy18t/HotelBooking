import { Platform, StatusBar, StyleSheet, TouchableOpacity, View } from 'react-native'
import React from 'react'
import { AntDesign } from '@expo/vector-icons'
import ReusableText from './ReusableText'
import { COLORS, TEXT } from '../../constants/theme'

export default function AppBar({ 
  color, 
  title, 
  color1, 
  icon, 
  onPress, 
  onPress1, 
  top, 
  left, 
  right,
  drop
}) {
  return (
    <View style={styles.overplay(top, left, right, drop)}>
      <View style={styles.wrapper}>
        <TouchableOpacity 
          style={styles.box(color)}
          onPress={onPress}
        >
          <AntDesign 
            name='left'
            size={25}
            color={'red'}
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
        <ReusableText 
          text={title}
          family={'medium'}
          size={TEXT.large}
          color={COLORS.black}
        />
        <TouchableOpacity 
          style={styles.box1(color1)}
          onPress={onPress1}
        >
          <AntDesign 
            name={icon} 
            size={30}
            color={'red'}
            style={{fontWeight: 'bold'}}
          />
        </TouchableOpacity>
      </View>
    </View>
  )
}

const styles = StyleSheet.create({
  overplay: (top, left, right, drop) => ({
    position: 'absolute',
    top: top,
    left: left,
    right: right,
    justifyContent: 'center',
    marginTop: !drop && Platform.OS === 'android' ? StatusBar.currentHeight: 0,
    
  }),
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
  },
  box: (color) => ({
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  }),
  box1: (color1) => ({
    width: 30,
    height: 30,
    borderRadius: 9,
    alignItems: 'center',
    justifyContent: 'center',
  })
})