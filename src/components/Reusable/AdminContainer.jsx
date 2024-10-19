import { ScrollView, StyleSheet, Text, TextInput, TouchableOpacity, View } from 'react-native'
import React, { useState } from 'react'
import Container from './Container'
import HeightSpacer from './HeightSpacer'
import NetworkImage from './NetworkImage'
import * as Progress from "react-native-progress";
import { COLORS, SIZES } from '../../constants/theme'
import CountryList from './CountryList'
import DescriptionInput from './DescriptionInput'
import ReusableBtn from '../Button/ReusableBtn'
import { ImagePicker } from './ImagePicker'
import ReusableText from './ReusableText'
import FacilityList from './FacilityList'
import RoomForm from './RoomForm'
import MapView, { Marker } from 'react-native-maps'

export default function AdminContainer({
  country,
  onTitle,
  location,
  region,
  room,
  facilities,
  uploadLoading,
  title,
  screen,
  navigation,
  form,
  setForm,
  setFormRoom,
  openSheet,
  formError,
  sheetRef,
  setUploadLoading,
  setImage,
  setUploadProgress,
  handleSubmit,
  uploadProgress,
  closeSheet,
  loading
}) {
  const handleMapPress = (event) => {
    const {latitude, longitude} = event.nativeEvent.coordinate;

    setForm((prevForm) => ({
      ...prevForm,
      latitude,
      longitude,
    }));
  }

  return (
    <Container navigation={navigation} title={title} screen={screen}>
      <ScrollView>
        <HeightSpacer height={10} />
        <View style={styles.imageContainer}>
          {form.imageUrl && (
            <NetworkImage 
              source={form.imageUrl}
              width={'100%'}
              height={'100%'}
              radius={12}
            />
          )}
        </View>
        {uploadLoading && (
          <View style={styles.progressBarContainer}>
            <Progress.Bar progress={Math.ceil(uploadProgress)} width={200} />
            <Text>{Math.ceil(uploadProgress)}%</Text>
          </View>
        )}
        <TouchableOpacity onPress={openSheet}>
          <View style={{
            alignItems: 'center',
            paddingHorizontal: 30,
            justifyContent: 'center'
          }}>
            <View style={styles.chooseImage}>
              <Text style={{fontSize: 16}}>
                {uploadLoading ? 'Loading...' : 'Choose Image'}
              </Text>
            </View>
          </View>
        </TouchableOpacity>
        {formError.imageUrl && !form.imageUrl && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.imageUrl}
          </Text>
        )}
        {country && (
          <View style={{marginTop: 20}}>
            <CountryList country={country} select={setForm} />
          </View>
        )}
        {formError.country && !form.country && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.country}
          </Text>
        )}
        
        {onTitle && (
          <>
            <HeightSpacer height={20} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
              marginHorizontal: 25,
              borderRadius: 12,
              height: 50
            }}>
              <TextInput 
                value={form.title}
                placeholder='Enter Title'
                style={styles.input}
                onChangeText={(title) => setForm((prev) => ({ ...prev, title }))}
              />
            </View>
          </>
          
        )}
        {formError.title && !form.title && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.title}
          </Text>
        )}
        
        {location && (
          <>
            <HeightSpacer height={20} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
              marginHorizontal: 25,
              borderRadius: 12,
              height: 50
            }}>
              <TextInput 
                value={location}
                placeholder='Enter Location'
                style={styles.input}
                onChangeText={(location) => setForm((prev) => ({ ...prev, location }))}
              />
            </View>
            <HeightSpacer height={10} />
            <MapView 
              style={{
                alignItems: 'center',
                justifyContent: 'center',
                marginHorizontal: 25,
                borderRadius: 12,
                height: 200
              }}
              initialRegion={{
                latitude: 10.980608938435232,
                longitude: 106.67540449812508,
                latitudeDelta: 0.01,
                longitudeDelta: 0.01,
              }}
              onPress={handleMapPress}
            >
              {form.latitude && form.longitude && (
                <Marker coordinate={{
                  latitude: form.latitude,
                  longitude: form.longitude,
                  latitudeDelta: 0.01,
                  longitudeDelta: 0.01,
                }} />
              )}
            </MapView>
          </>
          
        )}
        {formError.location && !form.location && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.location}
          </Text>
        )}

        {region && (
          <>
            <HeightSpacer height={20} />
            <View style={{
              flexDirection: 'row',
              alignItems: 'center',
              justifyContent: 'center',
              backgroundColor: COLORS.white,
              marginHorizontal: 25,
              borderRadius: 12,
              height: 50
            }}>
              <TextInput 
                value={form.region}
                placeholder='Enter Region'
                style={styles.input}
                onChangeText={(region) => setForm((prev) => ({ ...prev, region }))}
              />
            </View>
          </>
          
        )}
        {formError.region && !form.region && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.region}
          </Text>
        )}
        <HeightSpacer height={20} />
        <DescriptionInput 
          text={form.description}
          height={100}
          backgroundColor={COLORS.white}
          width={SIZES.width - 50}
          placeholder={'Enter Description'}
          borderRadius={12}
          padding={10}
          color={COLORS.dark}
          family={'medium'}
          onChange={(text) => setForm((prev) => ({ ...prev, description: text }))}
        />
        {formError.description && !form.description && (
          <Text style={{
            textAlign: 'center',
            fontFamily: 'medium',
            color: COLORS.red,
            marginTop: 5
          }}>
            {formError.description}
          </Text>
        )}
        {facilities && (
          <>
            <HeightSpacer height={20} />
            <View style={{paddingLeft: 30}}>
              <ReusableText 
                text={'Facilities'}
                family={'bold'}
                size={SIZES.large}
              />
              <HeightSpacer height={10} />
              <FacilityList 
                data={facilities}
                set={setForm}
              />
            </View>
            
          </>
        )}
        {room && (
          <>
            <HeightSpacer height={20} />
            <RoomForm 
              data={room} 
              set={setFormRoom}  
            />
          </>
        )}
        <HeightSpacer height={30} />
        <View style={{marginHorizontal: 25}}>
          <ReusableBtn 
            btnText={loading ? 'Please wait...' : 'Submit'}
            textColor={COLORS.white}
            width={SIZES.width - 50}
            backgroundColor={COLORS.green}
            onPress={handleSubmit}
            loader={loading}
          />
        </View>
        <ImagePicker 
          ref={sheetRef}
          closeShee={closeSheet}
          openSheet={openSheet}
          progress={setUploadProgress}
          Loading={setUploadLoading}
          setImage={setImage}
        />
        <HeightSpacer height={130} />
      </ScrollView>
    </Container>
  )
}

const styles = StyleSheet.create({
  imageContainer: {
    height: 200,
    marginHorizontal: 10,
    backgroundColor: COLORS.lightWhite,
    padding: 10
  },
  chooseImage: {
    textAlign: 'center',
    justifyContent: 'center',
    alignItems: 'center',
    flexDirection: 'row',
    marginTop: 10,
    height: 40,
    width: SIZES.width - 50,
    marginHorizontal: 30,
    backgroundColor: COLORS.lightWhite,
    borderRadius: 12
  },
  progressBarContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginVertical: 5,
  },
  input: {
    width: SIZES.width - 50,
    backgroundColor: COLORS.white,
    paddingLeft: 10,
    borderRadius: 12,
    height: 30,
    fontSize: 16
  }
})