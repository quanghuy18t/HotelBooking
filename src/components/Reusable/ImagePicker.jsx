import { Platform, StyleSheet, Text, TouchableOpacity, View } from 'react-native'
import React, { forwardRef } from 'react'
import * as ImagePickers from 'expo-image-picker'
import { Toast } from 'toastify-react-native'
import RBSheet from 'react-native-raw-bottom-sheet'
import storage, { getDownloadURL, uploadBytesResumable } from '@react-native-firebase/storage'

export const ImagePicker = forwardRef(
  ({
    closeSheet,
    onpenSheet,
    progress,
    Loading,
    setImage,
    setUpLoadError
  }, refs) => {
    const getBlodFroUri = async (uri) => {
      const blob = await new Promise((resolve, reject) => {
        const xhr = new XMLHttpRequest();
        xhr.onload = function () {
          resolve(xhr.response);
        };

        xhr.onerror = function (e) {
          reject(new TypeError('Network request failed'));
        };

        xhr.responseType = 'blob';
        xhr.open('GET', uri, true);
        xhr.send(null);
      });

      return blob;
    }

    const handleImage = async () => {
      try {
        const permissionResult = await ImagePickers.requestMediaLibraryPermissionsAsync();
        if (permissionResult.granted === false) {
          alert('Permission to access camera roll is required!');
          return;
        }

        const pickerResult = await ImagePickers.launchImageLibraryAsync({
          mediaTypes: ImagePickers.MediaTypeOptions.All,
          aspect: [4, 3],
          quality: 1
        });

        if (!pickerResult.canceled && pickerResult.assets.length > 0) {
          const image = pickerResult.assets[0];

          const metadata = {
            contentType: 'image/jpeg',
          };
          Loading(true);
          
          const storageRef = storage().ref('images/' + Date.now());
          
          const uploadTask = storageRef.putFile(image.uri, metadata);

          uploadTask.on(
            'state_changed',
            (snapshot) => {
              const upload = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
              progress(upload);
            },
            (error) => {
              switch (error.code) {
                case 'storage/unauthorized':
                  break;
                case 'storage/canceled':
                  break;
                case 'storage/unknow':
                  break;
              }
            },
            () => {
              getDownloadURL(uploadTask.snapshot.ref).then((downloadURL) => {
                setImage(downloadURL);
                Toast.success('Image uploaded');
                Loading(false);
              });
            }
          );
        }
      } catch (error) {
        Toast.error('Error try again');
        console.log(error);
        Loading(false);
      }
    };

    return (
      <RBSheet 
        ref={refs}
        height={190}
        openDuration={250}
        draggable={true}
        customStyles={{
          container: styles.container
        }}
      >
        <TouchableOpacity onPress={handleImage} style={styles.imageContainer}>
          <Text style={styles.text}>Choose from Gallery</Text>
        </TouchableOpacity>
      </RBSheet>
    )
  }
)

const styles = StyleSheet.create({
  container: {
    borderTopRightRadius: 30,
    borderTopLeftRadius: 30,
    alignItems: 'center',
    justifyContent: 'center'
  },
  imageContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 15,
  }
})