import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native';
import ImageView from 'react-native-image-view';

class GymSchedule extends Component {
  constructor(props) {
    super(props);
    this.state = {
      visible: false
    }
  }



  render() {
    let gym = this.props.gym;
    let schedulePhoto = gym.schedule_photo;

    let images = [{
        source: { uri: schedulePhoto}
      }]

    return (
      <View style={styles.container}>
        <TouchableOpacity onPress={() => {
          this.setState({visible: true})
        }} style={styles.imageContainer3}>
          <Image
          source={{uri: schedulePhoto}}
          style={styles.schedulePhoto}
          resizeMode='contain'
          />
        </TouchableOpacity>
        <ImageView
          images={images}
          imageIndex={0}
          isVisible={this.state.visible}
          renderFooter={(currentImage) => (<View><Text>{gym.name}</Text></View>)}
          />
      </View>
    )
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1
  }
})

export default GymSchedule
