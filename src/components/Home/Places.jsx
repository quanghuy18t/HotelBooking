import { View, VirtualizedList } from 'react-native'
import React, { useCallback, useEffect, useState } from 'react'
import { SIZES } from '../../constants/theme'
import HeightSpacer from '../Reusable/HeightSpacer'
import Country from '../Tiles/Country/Country';
import { getCountry, useMyContextController } from '../../store';
import uuid from 'react-native-uuid';

export default function Places() {
  const [controller, dispatch] =  useMyContextController();
  const { listCountries } = controller;

  const fetchCountry = useCallback(async () => {
    try {
      await getCountry(dispatch);
    } catch (error) { 
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCountry();
  }, [fetchCountry]);

  console.warn = (...args) => {
    if (args[0].includes("Each child in a list should have a unique \"key\" prop")) {
      return; 
    }
  };

  return (
    <View>
      <HeightSpacer height={20} />
      <VirtualizedList 
        data={listCountries}
        horizontal
        keyExtractor={(item) => item.id}
        showsHorizontalScrollIndicator={false}
        getItemCount={(data) => data.length}
        getItem={(data, index) => data[index]}
        renderItem={({item}) => (
          <View style={{marginRight: SIZES.medium}}>
            <Country item={item} />
          </View>
        )}
      />
    </View>
  )
}