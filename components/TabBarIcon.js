import React from 'react';

import Icon from 'react-native-vector-icons/Ionicons';
import Foundation from 'react-native-vector-icons/Foundation';
import Feather from 'react-native-vector-icons/Feather';


import Colors from '../constants/Colors';

export default class TabBarIcon extends React.Component {
  render() {
    switch (this.props.iconSet) {

      case 'feather':
        return (
          <Feather
          name={this.props.name}
          size={26}
          style={{ marginBottom: -3 }}
          color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        )
      case 'foundation':
        return (
          <Foundation
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        )
      default:
        return (
          <Icon
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
    }

  }
}
