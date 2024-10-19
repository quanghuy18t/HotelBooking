import { StyleSheet, Text, View } from 'react-native'
import React, { useCallback, useEffect, useRef, useState } from 'react'
import { Toast } from 'toastify-react-native';
import AdminContainer from '../../components/Reusable/AdminContainer';
import { addCountry, useMyContextController } from '../../store';

export default function Country({ navigation }) {
  const [controller, dispatch] = useMyContextController();

  const [uploadProgress, setUploadProgress] = useState(0);
  const [uploadLoading, setUploadLoading] = useState(false);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    imageUrl: '',
    title: '',
    region: '',
    popular: [],
    description: '',
  });
  const [formError, setFormError] = useState({
    imageUrl: '',
    title: '',
    description: '',
    region: '',
  });
  const [uploadError, setUpLoadError] = useState('');
  const [country, setCountry] = useState([]);

  const [image, setImage] = useState('');
  const sheetRef = useRef(null);

  useEffect(() => {
    setForm((prev) => ({ ...prev, imageUrl: image }));
  }, [image, uploadError, uploadLoading]);
//console.log(form);
  const closeSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.close();
    }
  };

  const openSheet = () => {
    if (sheetRef.current) {
      sheetRef.current.open();
    }
  };

  const handleSubmit = useCallback(async () => {
    if (!form.imageUrl) {
      return setFormError((prev) => ({
        ...prev,
        imageUrl: 'This field is required',
      }));
    }
    if (!form.title) {
      return setFormError((prev) => ({
        ...prev,
        title: 'This field is required',
      }));
    }
    if (!form.description) {
      return setFormError((prev) => ({
        ...prev,
        description: 'This field is required',
      }));
    }
    if (!form.region) {
      return setFormError((prev) => ({
        ...prev,
        region: 'This field is required',
      }));
    }

    setLoading(true);
    await addCountry(dispatch, form);
    setLoading(false);

    setForm({title: '', imageUrl: '', region: '', description: ''});
    setFormError({title: '', imageUrl: '', description: '', region: ''});
  });

  return (
    <AdminContainer 
      title={'Create Country'}
      navigation={navigation}
      screen={'EditCountry'}
      onTitle
      region
      form={form}
      setForm={setForm}
      setFormError={setFormError}
      formError={formError}
      openSheet={openSheet}
      sheetRef={sheetRef}
      closeSheet={closeSheet}
      handleSubmit={handleSubmit}
      uploadLoading={uploadLoading}
      setUploadLoading={setUploadLoading}
      setUploadProgress={setUploadProgress}
      uploadProgress={uploadProgress}
      setImage={setImage}
      loading={loading}
    />
  )
}