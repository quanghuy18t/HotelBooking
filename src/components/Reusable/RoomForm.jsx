import { Button, ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useEffect } from 'react'
import { Controller, useFieldArray, useForm } from 'react-hook-form'
import ReusableText from './ReusableText';
import { COLORS, SIZES } from '../../constants/theme';
import HeightSpacer from './HeightSpacer';

export default function RoomForm({ data, set }) {
  const { control, watch } = useForm({
    defaultValues: {
      rooms: data,
    }
  });

  const {fields, append, remove} = useFieldArray({
    control,
    name: 'rooms'
  })

  const formValues = watch('rooms');

  useEffect(() => {
    set(formValues);
  }, [formValues, set])

  return (
    <ScrollView style={styles.container}>
      <ReusableText 
        text={'Room'}
        family={'bold'}
        size={SIZES.large}
      />
      <HeightSpacer height={10} />
      {fields.map((item, index) => (
        <View key={index} style={styles.roomContainer}>
          <ReusableText 
            text={`Room ${index+1}`}
            family={'medium'}
            size={SIZES.medium}
          />
          <Controller 
            control={control}
            name={`rooms[${index}].title`}
            render={({field: {onChange, value}}) => (
              <TextInput 
                style={styles.input}
                placeholder='Title'
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <Controller 
            control={control}
            name={`rooms[${index}].price`}
            render={({field: {onChange, value}}) => (
              <TextInput 
                style={styles.input}
                placeholder='Price'
                keyboardType='numeric'
                value={value}
                onChangeText={onChange}
              />
            )}
          />
          <ReusableText 
            text={'Requirements'}
            family={'bold'}
            size={SIZES.medium}
          />
          {item.requirement.map((req, reqIndex) => {
            const key = Object.keys(req)[0];
            return (
              <View key={reqIndex} style={styles.requirementContainer}>
                <Text>{key}:</Text>
                <Controller 
                  control={control}
                  name={`rooms[${index}].requirement[${reqIndex}].${key}`}
                  render={({field: {onChange, value}}) => (
                    <TextInput 
                      style={styles.requirementInput}
                      keyboardType='numeric'
                      value={String(value)}
                      onChangeText={(text) => onChange(parseInt(text, 10))} 
                    />
                  )}
                />
              </View>
            )
          })}
        <TouchableOpacity
          style={{
            backgroundColor: COLORS.red, 
            justifyContent: 'center',
            alignItems: 'center',
            alignSelf: 'center',
            borderRadius: 5
          }}
          onPress={() => remove(index)}
        >
          <Text style={{
            color: COLORS.white,
            marginHorizontal: 20,
            marginVertical: 10
          }}>REMOVE</Text>
        </TouchableOpacity>
        </View>
      ))}

      <Button 
        title='Add Room'
        onPress={() => append({
          title: '', 
          price: '', 
          requirement: [
            {'adult': 0},
            {'children': 0},
            {'twin bed': 0},
            {'king bed': 0},
          ]
        })}
      />
    </ScrollView>
  )
}

const styles = StyleSheet.create({
  container: {
    padding: 20
  },
  roomContainer: {
    padding: 10,
    marginVertical: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 8,
  },
  title: {
    fontSize: 18,
    fontWeight: 'bold'
  },
  input: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 10,
    marginVertical: 5,
    borderRadius: 4
  },
  requirementContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginVertical: 5
  },
  requirementInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    padding: 5,
    borderRadius: 4,
    width: 60,
    textAlign: 'center'
  }
})