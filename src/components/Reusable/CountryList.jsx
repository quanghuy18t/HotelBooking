import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React from 'react'
import SelectDropdown from 'react-native-select-dropdown'
import ReusableText from './ReusableText'
import { COLORS, SIZES, TEXT } from '../../constants/theme'

export default function CountryList({ country, select }) {
  return (
    <View style={styles.container}>
      <SelectDropdown 
        data={country}
        key={(item) => item.id}
        onSelect={(selectedItem) => {
          selectedItem.id === undefined 
            ? select((prev) => ({
              ...prev,
              country: selectedItem.title,
              region: selectedItem.region,
              }))
            : select((prev) => ({
              ...prev,
              country_id: selectedItem.id,
              }));
        }} 
        renderItem={(item, index, isSelected) => (
          <View style={{
            flexDirection: 'row',
            alignItems: 'center',
            justifyContent: 'center',
            padding: 12
          }}>
            <ReusableText size={TEXT.medium} family={'medium'} text={item.title} />
          </View>
        )} 
        renderButton={(selectedItem) => (
          <View style={styles.dropdownButton}>
            {selectedItem ? (
              <Text style={{ color: COLORS.dark, fontFamily: "medium", fontSize: 16 }}>
                {selectedItem.title} {selectedItem.flag}
              </Text>
            ) : (
              <Text style={styles.dropdownButtonText}>
                Select Country
              </Text>
            )}
          </View>
        )}
        dropdownStyle={styles.dropdown}
        search
      />
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center'
  },
  dropdownButton: {
    width: SIZES.width - 50,
    height: 40,
    backgroundColor: COLORS.white,
    borderRadius: 12,
    justifyContent: 'center',
    alignItems: 'center',
    paddingHorizontal: 15,
  },
  dropdownButtonText: {
    fontSize: 16,
    color: COLORS.dark,
    flex: 1,
    textAlignVertical: 'center'
  },
  dropdown: {
    borderRadius: 8,
    marginTop: 8
  },
  dropdownRow: {
    padding: 12,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.white
  },
})