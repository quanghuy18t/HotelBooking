import { StyleSheet, Text, View } from 'react-native'
import React, { useState } from 'react'
import { Calendar } from 'react-native-calendars'
import { useDate } from '../../context/DateContext';
import { isEmpty } from 'lodash';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import { COLORS, SIZES } from '../../constants/theme';
import ReusableText from './ReusableText';

export default function CustomCalendar({ search }) {
  var today = new Date();
  const { startDay, endDay, appliedStartDay, appliedEndDay, startAgain, setCurrentPeriod, setStartAgain, resetPeriod } = useDate();

  const [period, setPeriod] = useState();

  const getDateString = (timestamp) => {
    const date = new Date(timestamp);
    const year = date.getFullYear();
    const month = date.getMonth() + 1;
    const day = date.getDate();

    let dateString = `${year}-`;
    if( month < 10 ){
        dateString += `0${month}-`;
    } else {
        dateString += `${month}-`;
    }

    if( day < 10 ){
        dateString += `0${day}`;
    } else {
        dateString += `${day}`;
    }

    return dateString;
  }

  const getPeriod = (startTimestamp, endTimestamp) => {
    const period = {};
    let currentTimestamp = startTimestamp;
    while (currentTimestamp <= endTimestamp) {
      const dateString = getDateString(currentTimestamp);
      period[dateString] = {
        color: COLORS.green,
        textColor: 'white',
        startingDay: currentTimestamp == startTimestamp,
        endingDay: currentTimestamp == endTimestamp
      };
      currentTimestamp += 24 * 60 * 60 * 1000;
    }
    return period;
  }

  const setDate = (date) => {
    const { dateString, day, month, year } = date;

    const timestamp = new Date(year, month - 1, day).getTime();
    const newDate = { ...date, timestamp };
    if (startAgain) {
      const period = {
        [dateString]: {
          color: COLORS.green,
          textColor: 'white',
          endingDay: true,
          startingDay: true
        }
      };
      setCurrentPeriod(newDate, null);
      setPeriod(period);
      setStartAgain(false);
    } else {
      const { timestamp: savedTimestamp } = startDay.day;
      
      if (savedTimestamp > timestamp) {
        const period = getPeriod(timestamp, savedTimestamp);
        let startCopy = startDay.day;
        setCurrentPeriod(newDate, startCopy);
        setPeriod(period);
      } else {
        const period = getPeriod(savedTimestamp, timestamp);
        setCurrentPeriod(null, newDate);
        setPeriod(period);
      }
      setStartAgain(true);
    }
  }

  return (
    <View>
      <Calendar 
        style={{
          width: '100%',
          alignSelf: 'center',
          marginTop: 10,
          elevation: 5,
          borderRadius: 5
        }}
        minDate={new Date(today.getFullYear(), today.getMonth(), today.getDate() + 1).toString()}
        markingType={'period'}
        markedDates={period}
        theme={{
          todayTextColor: '#689C98',
          'stylesheet.calendar.main': {
            week: {
              flexDirection: 'row',
              justifyContent: 'space-around',
              backgroundColor: '#fff',
              height: 40,
            }
          },
          'stylesheet.calendar.header': {
            header: {
                flexDirection: 'row',
                justifyContent: 'space-between',
                alignItems: 'center',
                height: 45
              },
              monthText: {
                fontSize: 16,
                fontWeight: '700',
                color: '#555'
              }
          }
        }}
        onDayPress={(date) => setDate(date)}
      />
      <View style={{
        alignContent: 'center',
        justifyContent: 'center',
        marginTop: 20
      }}>
        { !search && <ReusableText size={SIZES.xLarge} family={'bold'} text={'Date'} /> }
        <View style={[
            { flexDirection: 'row', justifyContent: 'space-between' },
            search && { justifyContent: 'space-evenly', marginTop: 50 }
        ]}>
          <Text style={{
            marginRight: 10,
            fontSize: 16,
            fontWeight: '700',
            color: '#666',
            alignSelf: 'center'
          }}>
            {!isEmpty(startDay) ? startDay.dayFormat: 'Check In'}
          </Text>
          <MaterialCommunityIcons
            name='ray-start-arrow' color={'689C98'} size={30}
            style={{width: 30, height: 30, alignSelf: 'center'}}
          />
          <Text style={{
            marginLeft: 10,
            fontSize: 16,
            fontWeight: '700',
            color: '#666',
            alignSelf: 'center'
          }}>
            {!isEmpty(endDay) ? endDay.dayFormat: 'Check Out'}
          </Text>
        </View>
      </View>
    </View>
  )
}