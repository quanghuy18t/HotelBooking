import { FlatList } from 'react-native'
import React, { useCallback, useEffect } from 'react'
import Slides from '../../components/OnBoarding/Slides'
import auth from '@react-native-firebase/auth';
import firestore from '@react-native-firebase/firestore';

export default function OnBoarding() {
  const admin = {
    username: 'admin',
    email: 'admin@gmail.com',
    password: '12345678',
    role: 'admin'
  }

  const createAdmin = useCallback(() => {
    const adminExist = firestore().collection('USERS').doc(admin.email)
    .onSnapshot(async (u) => {
      if (!u.exists) {
        await auth().createUserWithEmailAndPassword(admin.email, admin.password);
        firestore().collection('USERS').doc(admin.email).set({
          username: admin.username,
          email: admin.email,
          password: admin.password,
          role: admin.role,
        })  
        console.log('Add admin account');
      }  
    })
  }, []);

  useEffect(() => {
    createAdmin();
  }, []);

  const slides = [
    {
      id: 1,
      image: require('../../../assets/images/1.png'),
      title: 'Find the perfect place to stay',
    },
    {
      id: 2,
      image: require('../../../assets/images/2.png'),
      title: 'Discover the world',
    },
    {
      id: 3,
      image: require('../../../assets/images/3.png'),
      title: 'Find the best Hotels in the world',
    }
  ]

  return (
    <FlatList 
      pagingEnabled
      horizontal
      showsHorizontalScrollIndicator={false}
      data={slides}
      keyExtractor={(item) => item.id}
      renderItem={({ item }) => (
        <Slides item={item} />
      )}
    />
  )
}