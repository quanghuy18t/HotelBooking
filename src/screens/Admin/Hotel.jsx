import React, { useCallback, useEffect, useRef, useState } from 'react'
import AdminContainer from '../../components/Reusable/AdminContainer';
import { addHotel, addRoom, getCountry, useMyContextController } from '../../store';

export default function Hotel({ navigation }) {
  const [controller, dispatch] = useMyContextController();
  const { listCountries } = controller;

  const [uploadLoading, setUploadLoading] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [loading, setLoading] = useState(false);
  const [formRoom, setFormRoom] = useState([{
    hotel_id: '',
    title: '',
    price: '',
    requirement: [],
    available: [],
  }]);
  //console.log('form', formRoom);
  const [form, setForm] = useState({
    country_id: '',
    title: '',
    description: '',
    contact: '',
    imageUrl: '',
    rating: '',
    reviews: [],
    location: '',
    latitude: '',
    longitude: '',
    facilities: [
      { wifi: false },
      { parking: false },
      { bathroom: false },
    ],
    rooms: []
  });
  const [formError, setFormError] = useState({
    country_id: '',
    title: '',
    description: '',
    imageUrl: '',
    location: '',
  });
  const [image, setImage] = useState('');
  const sheetRef = useRef(null);
  
  const fetchCountry = useCallback(async () => {
    try {
      await getCountry(dispatch);
    } catch (error) {
      console.log(error);
    }
  }, []);

  useEffect(() => {
    fetchCountry();
    setForm((prev) => ({ ...prev, imageUrl: image }));
  }, [fetchCountry, image, uploadLoading]);

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
    console.log(form);

    if (!form.title) {
      return setFormError((prev) => ({
        ...prev,
        title: 'This field is required',
      }));
    }
    if (!form.imageUrl) {
      return setFormError((prev) => ({
        ...prev,
        imageUrl: 'This field is required',
      }));
    }
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
    if (!form.location) {
      return setFormError((prev) => ({
        ...prev,
        location: 'This field is required',
      }));
    }
    // if (!form.availability.start && !form.availability.end) {
    //   return setFormError((prev) => ({
    //     ...prev,
    //     availability: 'This field is required'
    //   }));
    // }
    // if (form.availability.start >= form.availability.end) {
    //   return setFormError((prev) => ({
    //     ...prev,
    //     availability: 'Start and End invalid'
    //   }))
    // }

    setLoading(true);

    const hotel_id = await addHotel(dispatch, form);

//     const uniqueRoom = formRoom.filter((value, index, self) => {
//       index === self.findIndex((t) => t.title === value.title)
//     })
// console.log('room', uniqueRoom);
    formRoom
      .filter(room => room.title && room.price)
      .forEach(async (room) => {
        
        await addRoom(dispatch, room, hotel_id);
      })

    setLoading(false);
    
    setForm({ 
      country_id: '',
      title: '',
      description: '',
      contact: '',
      imageUrl: '',
      rating: '',
      reviews: [],
      location: '',
      latitude: '',
      longitude: '',
      facilities: [
        { wifi: false },
        { parking: false },
        { bathroom: false },
      ],
      rooms: []
    });
    setFormRoom({
      hotel_id: '',
      title: '',
      price: '',
      requirement: [],
      available: [],
    })
    setFormError({
      country_id: '',
      title: '',
      description: '',
      imageUrl: '',
      location: '',
    });
  })

  return (
    <AdminContainer 
      title={'Create Hotel'}
      onTitle
      location
      room={form.rooms}
      facilities={form.facilities}
      navigation={navigation}
      screen={'EditHotel'}
      form={form}
      setForm={setForm}
      setFormError={setFormError}
      formError={formError}
      setFormRoom={setFormRoom}
      openSheet={openSheet}
      closeSheet={closeSheet}
      sheetRef={sheetRef}
      handleSubmit={handleSubmit}
      uploadLoading={uploadLoading}
      setUploadLoading={setUploadLoading}
      setUploadProgress={setUploadProgress}
      uploadProgress={uploadProgress}
      setImage={setImage}
      country={listCountries}
      loading={loading}
    />
  )
}