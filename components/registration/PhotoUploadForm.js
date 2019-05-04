import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload';
import Colors from '../../constants/Colors'

export default class PhotoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.profile_pic ? this.props.profile_pic : 'https://i.imgur.com/IKwp1Bd.png'
    }
  }
  render() {

    return (
      <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                console.log("avatar changed");

                this.props.onPhotoSelected(avatar);
                this.setState({src: `data:image/gif;base64,${avatar}`})
              }
            }}
           >
            <Image
              style={{
                paddingVertical: 30,
                width: 150,
                height: 150,
                borderRadius: 75,
                backgroundColor: Colors.tintColor
              }}
              resizeMode='cover'
              source={{
                uri: this.state.src
              }}
            />
           </PhotoUpload>
    )
  }
}
