import { StyleSheet, Switch, Text, View } from 'react-native'
import React from 'react'
import { COLORS, SIZES } from '../../constants/theme';
import ReusableText from './ReusableText';

export default function FacilityList({ data, set }) {
  const toggleSwitch = (index, item) => {
    const updatedFacilities = data.map((facility, i) => {
      if (i === index) {
        return { ...facility, [item]: !facility[item] };
      }
      return facility;
    })
    set((prev) => ({ ...prev, facilities: updatedFacilities }))
  }

  return (
    <View style={{backgroundColor: COLORS.white, borderRadius: 10}}>
      {data.map((item, index) => {
        const facilityName = Object.keys(item)[0];
        return (
          <View style={{
            flexDirection: 'row', 
            justifyContent: 'space-between',
            padding: 10
          }}>
            <ReusableText 
              text={facilityName}
              size={SIZES.medium}
              family={'medium'}
            />
            <Switch 
              value={item[facilityName]}
              onValueChange={() => toggleSwitch(index, facilityName)}
            />
          </View>  
        )
      })}
    </View>
  )
}