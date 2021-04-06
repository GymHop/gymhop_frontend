import React, { Component } from 'react'

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'
import ImagePicker from 'react-native-image-crop-picker'
import Colors from '../../constants/Colors'
import ImagePickerModal from '../../components/ImagePickerModal/ImagePickerModal.Component'
import { height } from 'react-native-dimension'
export default class PhotoUploadForm extends Component {
  constructor(props) {
    super(props)
    this.state = {
      src: this.props.profile_pic
        ? this.props.profile_pic
        : 'https://i.imgur.com/IKwp1Bd.png',
      modalVisible: false,
    }
  }
  imageFromGallery = async () => {
    this.setState({ modalVisible: false })
    setTimeout(async () => {
      await ImagePicker.openPicker({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      })
        .then((image) => {
          this.props.onPhotoSelected(image.data)
          this.setState({ src: `data:image/gif;base64,${image.data}` })
        })
        .catch((err) => console.log(err))
    }, 800)
  }
  imageFromCamera = () => {
    this.setState({ modalVisible: false })
    setTimeout(async () => {
      ImagePicker.openCamera({
        width: 300,
        height: 400,
        cropping: true,
        includeBase64: true,
      }).then((image) => {
        this.props.onPhotoSelected(image.data)
        this.setState({ src: `data:image/gif;base64,${image.data}` })
      })
    }, 800)
  }
  onClose = () => {
    this.setState({modalVisible: false})
  }
  render() {
    const { modalVisible } = this.state
    return (
      <TouchableOpacity
        style={{ alignSelf: 'center', marginTop: height(1) }}
        onPress={() => this.setState({ modalVisible: true })}
      >
        <Image
          style={{
            paddingVertical: 30,
            width: 150,
            height: 150,
            borderRadius: 75,
            backgroundColor: Colors.tintColor,
          }}
          resizeMode='cover'
          source={{
            uri: this.state.src,
          }}
        />
        <ImagePickerModal
          isVisible={modalVisible}
          onClose={this.onClose}
          imageFromCamera={this.imageFromCamera}
          imageFromGallery={this.imageFromGallery}
        />
      </TouchableOpacity>
    )
  }
}
