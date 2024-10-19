import { ScrollView, StatusBar, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import { COLORS, SIZES } from '../../constants/theme'
import { AntDesign, MaterialCommunityIcons } from '@expo/vector-icons'
import AppBar from '../../components/Reusable/AppBar'
import CustomCalendar from '../../components/Reusable/CustomCalendar'
import ReusableText from '../../components/Reusable/ReusableText'
import ReusableBtn from '../../components/Button/ReusableBtn'
import { getRoom, useMyContextController } from '../../store'
import { useDate } from '../../context/DateContext'
import SelectDropdown from 'react-native-select-dropdown'
import { Dropdown } from 'react-native-element-dropdown'
import WidthSpacer from '../../components/Reusable/WidthSpacer'

export default function BookingRoom({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const {currentHotel} = controller;
  const { startDay, endDay } = useDate();

  const data = [
    {id: 0, value: '0'},
    {id: 1, value: '1'},
    {id: 2, value: '2'},
    {id: 3, value: '3'},
    {id: 4, value: '4'},
  ];
  const [adults, setAdults] = useState(0);
  const [childrens, setChildrens] = useState(0);

  const handleSubmit = async () => {
    //await getRoom(dispatch, currentHotel.id, startDay, endDay)

      navigation.navigate('SelectRoom', {item : {adults, childrens}})
    
  }

  return (
    <ScrollView>
      <View style={{height: 100}}>
        <AppBar 
          title={'Hotel Booking'}
          top={45}
          left={20}
          right={20}
          color={COLORS.white}
          onPress={() => navigation.goBack()}
          drop={true}
        />
      </View>
      <View style={{width: '90%', maxWidth: 400, alignSelf: 'center'}}>
        <CustomCalendar />
      </View>
      <View style={{
        flexDirection: 'row',
        alignContent: 'flex-start',
        flex: 1,
        alignSelf: 'center'
      }}>
        <View style={{width: '90%', maxWidth: 400, paddingTop: 25}}>
          <View style={{marginBottom: 10}}>
            <ReusableText 
              size={SIZES.xLarge}
              family={'bold'}
              text={'Requirement'}
            />
            <View style={{
              flexDirection: 'row', 
              paddingTop: 20, 
              justifyContent: 'space-between',
              paddingBottom: 50
            }}>
              <View style={{flexDirection: 'row', justifyContent: 'space-evenly'}}>
                <ReusableText 
                  text={'Adults'}
                  size={SIZES.large}
                  family={'medium'}
                  color={COLORS.dark}
                />
                <WidthSpacer width={5} />
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder={0}
                  value={adults}
                  onChange={item => {
                    setAdults(item.value);
                  }}
                />
              </View>
              <View style={{flexDirection: 'row'}}>
                <ReusableText 
                  text={'Childrents'}
                  size={SIZES.large}
                  family={'medium'}
                  color={COLORS.dark}
                />
                <WidthSpacer width={5} />
                <Dropdown
                  style={[styles.dropdown]}
                  placeholderStyle={styles.placeholderStyle}
                  selectedTextStyle={styles.selectedTextStyle}
                  inputSearchStyle={styles.inputSearchStyle}
                  iconStyle={styles.iconStyle}
                  data={data}
                  maxHeight={300}
                  labelField="value"
                  valueField="value"
                  placeholder={0}
                  value={childrens}
                  onChange={item => {
                    setChildrens(item.value);
                  }}
                />
              </View>
            </View>
            <ReusableBtn 
              onPress={() => handleSubmit()}
              btnText={'Find Room'}
              width={(SIZES.width - 50)}
              backgroundColor={COLORS.green}
              borderColor={COLORS.green}
              borderWidth={0}
              textColor={COLORS.white}
            />
          </View>
        </View>
      </View>
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    backgroundColor: 'white',
    padding: 16,
  },
  dropdown: {
    height: 30,
    width: 50,
    borderColor: 'gray',
    borderWidth: 0.5,
    borderRadius: 8,
    paddingHorizontal: 8,
  },
  icon: {
    marginRight: 5,
  },
  label: {
    position: 'absolute',
    backgroundColor: 'white',
    left: 22,
    top: 8,
    zIndex: 999,
    paddingHorizontal: 8,
    fontSize: 14,
  },
  placeholderStyle: {
    fontSize: 16,
  },
  selectedTextStyle: {
    fontSize: 16,
  },
  iconStyle: {
    width: 20,
    height: 20,
  },
  inputSearchStyle: {
    height: 40,
    fontSize: 16,
  },
});