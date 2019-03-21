import React, { Component } from 'react';

import { View, Text, StyleSheet, Image } from 'react-native'
import PhotoUpload from 'react-native-photo-upload';

export default class PhotoUploadForm extends Component {
  constructor(props) {
    super(props);
    this.state = {
      src: this.props.profile_pic ? this.props.profile_pic : 'https://www.sparklabs.com/forum/styles/comboot/theme/images/default_avatar.jpg'
    }
  }

  render() {

    return (
      <PhotoUpload
            onPhotoSelect={avatar => {
              if (avatar) {
                this.props.onPhotoSelected(avatar);
                this.setState({src: `data:image/gif;base64,${avatar}`})
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
                uri: this.state.src
              }}
            />
           </PhotoUpload>
    )
  }
}
