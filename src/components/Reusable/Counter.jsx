import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { AntDesign } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import ReusableText from './ReusableText';

export default function Counter() {
  const [count, setCount] = useState(0);

  const increment = () => {
    setCount(count + 1);
  }
  const decrement = () => {
    if (count > 0) {
      setCount(count - 1);
    }
  }

  return (
    <View style={styles.rowWithSpace}>
      <AntDesign 
        name='minussquareo'
        size={26}
        color={COLORS.gray}
        onPress={decrement}
      />
      <ReusableText 
        text={` ${count} `}
        family={'regular'}
        size={SIZES.medium}
        color={COLORS.black}
      />
      <AntDesign 
        name='plussquareo'
        size={26}
        color={COLORS.gray}
        onPress={increment}
      />
    </View>
  )
}

const styles = StyleSheet.create({
  rowWithSpace: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between'
  },
})