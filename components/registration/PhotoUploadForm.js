import React from 'react';

import { View, Text, StyleSheet } from 'react-native'
import PhotoUpload from 'react-native-photo-upload';


const PhotoUploadForm = ({onPhotoSelected}) => {
  return (
    <PhotoUpload
          onPhotoSelect={avatar => {
            if (avatar) {
              this.onPhotoSelected(avatar)
            }
          }}
         >
          <Image
            style={{
              paddingVertical: 0,
              width: 150,
              height: 150,
              borderRadius: 75
            }}
            source={{
              uri: 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
            }}
          />
         </PhotoUpload>
  )
}
export default PhotoUploadForm
