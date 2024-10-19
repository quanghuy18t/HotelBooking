import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useRef, useState } from 'react'
import AdminContainer from '../../components/Reusable/AdminContainer'

export default function Place({ navigation }) {
  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [form, setForm] = useState({
    country_id: '',
    description: '',
    imageUrl: '',
    location: '',
    title: '',
    rating: '',
    review: '',
    latitude: '',
    longitude: '',
    popular: [],
  });
  const [formError, setFormError] = useState({
    country_id: '',
    description: '',
    imageUrl: '',
    location: '',
    title: '',
  });
  const [uploadError, setUpLoadError] = useState('');
  const [country, setCountry] = useState([]);
  const [loading, setLoading] = useState(false);
  const [image, setImage] = useState('');
  const sheetRef = useRef(null);
  
  //Fetch Place

  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  }
  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  }
  const handleSubmit = useCallback(async () => {
    if (!form.country_id) {
      return setFormError((prev) => ({
        ...prev, 
        country_id: 'This field is required',
      }));
    }
    if (!form.description) {
      return setFormError((prev) => ({
        ...prev, 
        description: 'This field is required',
      }));
    }
    if (!form.imageUrl) {
      return setFormError((prev) => ({
        ...prev, 
        imageUrl: 'This field is required',
      }));
    }
    if (!form.location) {
      return setFormError((prev) => ({
        ...prev, 
        location: 'This field is required',
      }));
    }
    if (!form.title) {
      return setFormError((prev) => ({
        ...prev, 
        title: 'This field is required',
      }));
    }

    setLoading(true);
    //Create Place
    setLoading(false);

    setForm({ 
      country_id: '',
      description: '',
      imageUrl: '',
      location: '',
      title: '',
     });
     setFormError({
      country_id: '',
      description: '',
      imageUrl: '',
      location: '',
      title: '',
     })
  });

  return (
    <AdminContainer 
      title={'Create Place'}
      onTitle
      location
      navigation={navigation}
      screen={'EditPlace'}
      form={form}
      setForm={setForm}
      setFormError={setFormError}
      formError={formError}
      openSheet={openSheet}
      closeSheet={closeSheet}
      sheetRef={sheetRef}
      handleSubmit={handleSubmit}
      uploadLoading={uploadLoading}
      setUploadLoading={setUploadLoading}
      setUploadProgress={setUploadProgress}
      uploadProgress={uploadProgress}
      setImage={setImage}
      country={country}
      loading={loading}
    />
  )
}