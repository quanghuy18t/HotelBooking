import { StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import ReusableText from './ReusableText'
import { COLORS, SIZES } from '../../constants/theme'
import { Ionicons, MaterialCommunityIcons } from '@expo/vector-icons';
import HeightSpacer from './HeightSpacer';

export default function RoomCard({ item, onPress }) {
  const twin_bed = item.requirement.find(req => req['twin bed']);
  const king_bed = item.requirement.find(req => req['king bed']);
  const adult = item.requirement.find(req => req['adult']);
  const children = item.requirement.find(req => req['children' !== undefined]);

  const twinBed = twin_bed ? twin_bed['twin bed'] : 0;
  const kingBed = king_bed ? king_bed['king bed'] : 0;
  const adults = adult ? adult['adult'] : 0;
  const childrens = children ? children['children'] : 0;

  return (
    <TouchableOpacity
      style={styles.container}
      onPress={onPress}
    >
      <View style={styles.wrapper}>
        <View>
          <View style={{flexDirection: 'row'}}>
            <ReusableText 
              text={`${item.title} - `}
              family={'medium'}
              size={SIZES.large}
              color={COLORS.black}
            />  
            {adults !== 0 && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <ReusableText 
                  text={`${adults}x`}
                  family={'medium'}
                  size={SIZES.large}
                />
                <Ionicons 
                  name='person'
                  size={15}
                />             
              </View>
            )}
            {childrens !== 0 && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <ReusableText 
                  text={`${childrens}x`}
                  family={'medium'}
                  size={SIZES.large}
                />
                <Ionicons 
                  name='person'
                  size={15}
                  style={{
                    width: 10,
                    height: 10,
                  }}
                />             
              </View>
            )}
          </View>
          
          <HeightSpacer height={10} />
          <View style={{flexDirection: 'row'}}>
            {twinBed !== 0 && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <ReusableText 
                  text={`${twinBed} twin bed `}
                  family={'medium'}
                  size={13}
                  color={COLORS.gray}
                />
                <Ionicons 
                  name='bed-outline'
                  size={15}
                />
                {kingBed !== 0 && <ReusableText text={' and '} family={'medium'} size={13} color={COLORS.gray} />}
              </View>
            )}
            {kingBed !== 0 && (
              <View style={{flexDirection: 'row', alignItems: 'center', justifyContent: 'center'}}>
                <ReusableText 
                  text={`${kingBed} king bed `}
                  family={'medium'}
                  size={13}
                  color={COLORS.gray}
                />
                <MaterialCommunityIcons 
                  name='bed-king-outline'
                  size={15}
                />
              </View>
            )}
          </View>
        </View>
      </View>
    </TouchableOpacity>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 10,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12,
  },
  wrapper: {
    flexDirection: 'row',
    alignItems: 'center',
  }
})