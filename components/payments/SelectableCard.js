import React, { Component } from 'react';

import { View, Text, StyleSheet, TouchableOpacity, Image } from 'react-native'

class SelectableCard extends Component {
  constructor(props) {
    super(props);
  }

  animateSelected = () => {
    console.log("animateSelected");
  }
  animateUnselect = () => {
    console.log("animateUnselect");
  }

  componentDidUpdate(prevProps) {
    if (prevProps.selected != this.props.selected) {
      if (this.props.selected) {
        this.animateSelected()
      } else {
        this.animateUnselect()
      }
    }
  }

  render() {
    return (
      <TouchableOpacity onPress={this.props.onSelect}>
          <Text>{this.props.price}</Text>
          <Text>{this.props.period}</Text>
          <Text>{this.props.description}</Text>
          <Text>selected: {this.props.selected ? "selected" : ""}</Text>
          <Image style={styles.backgroundImage} source={this.props.image.uri} />
      </TouchableOpacity>
    )
  }
}

const styles = StyleSheet.create({
  backgroundImage: {
    height: 50,
    width: 50
  }
})

export default SelectableCard
