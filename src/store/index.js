import React, { createContext, useContext, useMemo, useReducer } from 'react';
import firestore from '@react-native-firebase/firestore';
import auth from '@react-native-firebase/auth';
import { Toast } from 'toastify-react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { parse } from 'date-fns';
import { getStart } from '../utils/index'

const MyContext = createContext();

const reducer = (state, action) => {
  switch (action.type) {
    case 'USER_LOGIN': {
      return { ...state, userLogin: action.value };
    }
    case 'LIST_USERS': {
      return { ...state, listUsers: action.value };
    }
    case 'LIST_COUNTRIES': {
      return { ...state, listCountries: action.value };
    }
    case 'LIST_PLACES': {
      return { ...state, listPlaces: action.value };
    }
    case 'LIST_HOTELS': {
      return { ...state, listHotels: action.value };
    }
    case 'LIST_REVIEWS': {
      return { ...state, listReviews: action.value };
    }
    case 'LIST_ROOMS': {
      return { ...state, listRooms: action.value };
    }
    case 'LIST_BOOKINGS': {
      return { ...state, listBookings: action.value };
    }
    case 'LIST_CONFIRMS': {
      return { ...state, listConfirms: action.value };
    }
    case 'CURRENT_BOOKING': {
      return { ...state, currentBooking: action.value };
    }
    case 'CURRENT_HOTEL': {
      return { ...state, currentHotel: action.value };
    } 
    default: {
      throw new Error(`Unhandle action type: ${action.type}`);
    }
  }
}

const MyContextControllerProvider = ({ children }) => {
  const initialState = {
    userLogin: null,
    listUsers: [],
    listCountries: [],
    listPlaces: [],
    listHotels: [],
    listReviews: [],
    listRooms: [],
    listBookings: [],
    listConfirms: [],
    currentBooking: null,
    currentHotel: null,
  };

  const [controller, dispatch] = useReducer(reducer, initialState);

  const value = useMemo(() => [controller, dispatch], [controller, dispatch]);

  return (
    <MyContext.Provider value={value}>
      {children}
    </MyContext.Provider>
  )
}

const useMyContextController = () => {
  const context = useContext(MyContext);

  if (!context) {
    throw new Error('useMyContextController should be used insinde the MyContextControllerProvider');
  }

  return context;
}

const USERS = firestore().collection('USERS');

const register = async (dispatch, data) => {
  try {
    await auth().createUserWithEmailAndPassword(data.email, data.password);
    USERS.doc(data.email).set({
      username: data.username,
      email: data.email,
      password: data.password,
      role: 'customer'
    });

    Toast.success('Registration Successful', 'top');
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/email-already-in-use') {
      Toast.error('Email is already in use', 'top');
    } else {
      Toast.error('Firebase authentication error', 'top');
    }
  }
};

const login = async (dispatch, data) => {
  try {
    const res = await auth().signInWithEmailAndPassword(data.email, data.password);
    USERS.doc(data.email).onSnapshot(u => dispatch({ type: 'USER_LOGIN', value: u.data() }));
console.log(res.user.uid);
    await AsyncStorage.setItem('user', res.user.uid);

    Toast.success('Login successful', 'top');
  } catch (error) {
    console.log(error);
    if (error.code === 'auth/invalid-credential') {
      Toast.error('Invalid credentials', 'top');
    } else {
      Toast.error('Something went wrong', 'top');
    }
  }
};

const logout = async (dispatch) => {
  await auth().signOut();
  AsyncStorage.removeItem('user');
  dispatch({ type: 'USER_LOGIN', value: null });
};

const COUNTRIES = firestore().collection('COUNTRIES');

const addCountry = async (dispatch, data) => {
  //console.log('data', data)
  try {
    const docRef = await COUNTRIES.add({
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      region: data.region,
      popular: [],
    })

    Toast.success('Country created');
    getCountry(dispatch);
    return docRef.id;
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const getCountry = async (dispatch) => {
  try {
    const querySnapshot = await COUNTRIES.get();
  
    const countries = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    dispatch({type: 'LIST_COUNTRIES', value: countries});
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const PLACES = firestore().collection('PLACES');

const addPlace = async (dispatch, data) => {
  try {
    const docRef = await PLACES.add({
      country_id: data.country_id,
      title: data.title,
      description: data.description,
      imageUrl: data.imageUrl,
      location: data.location,
      latitude: data.latitude,
      longitude: data.longitude,
      rating: data.rating,
      review: data.review,
      popular: data.popular,
    })

    Toast.success('Place created');
    getPlace(dispatch);
    return docRef.id;
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const getPlace = async (dispatch) => {
  try {
    const querySnapshot = await PLACES.get();

    const places = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    dispatch({type: 'LIST_PLACES', value: places});
  } catch (error) {
    Toast.error('Something went wrong')
  }
}

const HOTELS = firestore().collection('HOTELS');

const setCurrentHotel = (dispatch, data) => {
  try {
    dispatch({ type: 'CURRENT_HOTEL', value: data });
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const addHotel = async (dispatch, data) => {
  console.log('hotel', data);
  try {
    const docRef = await HOTELS.add({
      country_id: data.country_id,
      title: data.title,
      description: data.description,
      contact: data.contact || '',
      imageUrl: data.imageUrl,
      rating: data.rating || '',
      review: data.review || '',
      location: data.location,
      latitude: data.latitude || '',
      longitude: data.longitude || '',
      facilities: data.facilities,
      rooms: [],
    });

    Toast.success('Hotel created');
    getHotel(dispatch);
    return docRef.id;
  } catch (error) {
    console.log('hote', error);
    Toast.error('Something went wrong');
  }
}

const getHotel = async (dispatch) => {
  try {
    const querySnapshot = await HOTELS.get();

    const hotels = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    dispatch({type: 'LIST_HOTELS', value: hotels});
  } catch (error) {
    Toast.error('Something went wrong')
  }
}

const getHotelById = async (dispatch, id) => {
  try {
    const querySnapshot = await HOTELS.doc(id).get();

    const hotels = {
      id,
      ...querySnapshot.data()
    }

  return hotels;
  } catch (error) {
    console.log(error);
  }
}

const getHotelByCountry = async (dispatch, id) => {
  const querySnapshot = await HOTELS.where('country_id', '==', id).get();

  const hotels = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }));

  return hotels;
}

const ROOMS = firestore().collection('ROOMS');

const addRoom = async (dispatch, data, hotel_id) => {
  //console.log('rooms', data);
  try {
    const docRef = await ROOMS.add({
      hotel_id: hotel_id,
      title: data.title,
      price: data.price,
      requirement: data.requirement,
      available: [],
    })

    await HOTELS.doc(hotel_id).update({
      rooms: firestore.FieldValue.arrayUnion(docRef.id)
    })
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const getRoom = async (dispatch, hotelID, start, end, adults, childrens) => {
  try {
    const querySnapshot = await ROOMS.where('hotel_id', '==', hotelID).get();

    const rooms = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));

    const isRoomAvailable = (availableDates, requirement) => {
      const adult = requirement.find(req => req['adult']);
      const children = requirement.find(req => req['children' !== undefined]);

      const Adults = adult ? adult['adult'] : 0;
      const Childrens = children ? children['children'] : 0;

      if (adults === 0 && childrens === 0) {
        return false;
      }
      if (adults > Adults) {
        return false;
      }

      if (!availableDates || availableDates.length === 0) {
        return true;
      }

      return availableDates.every(date => {
        const startDate = parse(date.dateStart, 'dd MMMM yyyy', new Date());
        const endDate = parse(date.dateEnd, 'dd MMMM yyyy', new Date());

        const startBooking = new Date(start.day.dateString);
        const endBooking = new Date(end.day.dateString);

        if (startBooking > endDate) {
          return true;
        }
        if (endBooking < startDate) {
          return true;
        }
        
        return false;
      });
    };

//rooms.filter(room => console.log(isRoomAvailable(room.available)));
    const unavailableRooms = rooms.filter(room => isRoomAvailable(room.available, room.requirement));
    return unavailableRooms;
    //dispatch({ type: 'LIST_ROOMS', value: unavailableRooms });
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const getRoomById = async (dispatch, id) => {
  const querySnapshot = await ROOMS.doc(id).get();

  const room = {
    id,
    ...querySnapshot.data()
  };
  return room;
}

const BOOKINGS = firestore().collection('BOOKINGS');

const setCurrentBooking = async (dispatch, id) => {
  const querySnapshot = await BOOKINGS.where('hotel_id', '==', id).get();

  const bookings = querySnapshot.docs.map((doc) => ({
    id: doc.id,
    ...doc.data()
  }))

  dispatch({ type: 'CURRENT_BOOKING', value: bookings });
}

const addBooking = async (dispatch, data) => {
  try {
    const docRef = await BOOKINGS.add({
      hotel_id: data.hotel_id,
      room_id: data.room_id,
      user_id: data.user_id,
      dateStart: data.dateStart,
      dateEnd: data.dateEnd,
      status: 'uncorfirmed',
      total: data.total,
    })

    await ROOMS.doc(data.room_id).update({
      available: firestore.FieldValue.arrayUnion({
        dateStart: data.dateStart,
        dateEnd: data.dateEnd
      })
    })

    return docRef.id;
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const getBooking = async (dispatch, userID) => {
  try {
    const querySnapshot = await BOOKINGS.where('user_id', '==', userID).get();

    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    dispatch({ type: 'LIST_BOOKINGS', value: bookings });  
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const getBookingConfirm = async (dispatch, userID) => {
  try {
    const querySnapshot = await BOOKINGS
      .where('user_id', '==', userID)
      .where('status', '==', 'confirm')
      .get();

    const bookings = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))
    dispatch({ type: 'LIST_CONFIRMS', value: bookings });  
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const REVIEWS = firestore().collection('REVIEWS');

const addReview = async (dispatch, data) => {
  try {
    // const existedReview = await REVIEWS.where('user', '==', data.user).where('hotel_id', '==', data.hotel_id).get();

    // if (existedReview) {
    //   await REVIEWS.doc(existedReview.id).update({
    //     review: data.review,
    //     rating: data.rating,
    //     update: data.update,
    //   });
    // } else {
      const docRef = await REVIEWS.add({
        hotel_id: data.hotel_id,
        review: data.review,
        rating: data.rating,
        update: data.update,
        user: data.user
      })  
    
    const reviewsSnapshot = await REVIEWS.where('hotel_id', '==', data.hotel_id).get();

    const listReviews = [];
      reviewsSnapshot.forEach((doc) => {
      listReviews.push(doc.data());
    });

    await HOTELS.doc(data.hotel_id).update({
      reviews: firestore.FieldValue.arrayUnion(docRef.id),
      rating: getStart(listReviews)
    })

    Toast.success('Review added');
  } catch (error) {
    console.log(error);
    Toast.error('Something went wrong');
  }
}

const getReview = async (dispatch, hotelID) => {
  try {
    const querySnapshot = await REVIEWS.where('hotel_id', '==', hotelID).get();

    const reviews = querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }))

    return reviews;
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const PAYMENT = firestore().collection('PAYMENT');

const addPayment = async (dispatch, data) => {
  try {
    const user = await AsyncStorage.getItem('user');
    const exist = await getPayment();

    if (exist) {
      await PAYMENT.add({
        owner: user,
        method: [data.name],
      });  
    } else {
      if (exist.method.includes(data.name)) {
        Toast.error('This method already exist');
        return;
      } else {
        PAYMENT.doc(exist.id).update({
          method: [...exist.method, data.email]
        })
      }
    }

  } catch (error) {
    Toast.error('Something went wrong');
  }
}

const getPayment = async () => {
  try {
    const user = await AsyncStorage.getItem('user');

    const querySnapshot = await PAYMENT.where('owner', '==', user).get();
    let prof = [];
    querySnapshot.forEach((doc) => {
      prof.push({ ...doc.data(), id: doc.id });
    });

    return prof[0] ?? {};
  } catch (error) {
    console.log(error);
  }
}

const customizeCard = async (closeSheet, data, navigation) => {
  try {
    const user = await AsyncStorage.getItem('user');
    if (user) {
      const querySnapshot = await PAYMENT.where('owner', '==', user).get();
      let prof = [];
      querySnapshot.forEach((doc) => {
        prof.push({ ...doc.data(), id: doc.id })
      });

      if (prof[0].card) {
        if (prof[0].card.some((item) => item.card === data.card)) {
          Toast.error('This card already has a name');
          navigation.navigate('Card');
          navigation.goBack();
          return closeSheet();
        }
        await PAYMENT.doc(prof[0].id).update({
          card: [...prof[0].card, data]
        })

        navigation.navigate("Card");
        navigation.goBack();
        closeSheet();
        return;
      }

      await PAYMENT.doc(prof[0].id).update({
        card: [data]
      })

      navigation.navigate("Card");
      navigation.goBack();
      closeSheet();
    }
  } catch (error) {
    Toast.error('Something went wrong');
  }
}

export {
  MyContextControllerProvider,
  useMyContextController,
  register,
  login,
  logout,
  addCountry,
  getCountry,
  addPlace,
  getPlace,
  addHotel,
  getHotel,
  getHotelById,
  getHotelByCountry,
  setCurrentHotel,
  addReview,
  getReview,
  addRoom,
  getRoom,
  getRoomById,
  addBooking,
  getBooking,
  getBookingConfirm,
  setCurrentBooking,
  addPayment,
  getPayment,
  customizeCard 
}