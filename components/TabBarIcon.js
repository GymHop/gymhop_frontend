import React from 'react';
import { Icon } from 'expo';
import { Feather, Foundation } from '@expo/vector-icons';


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
          <Icon.Ionicons
            name={this.props.name}
            size={26}
            style={{ marginBottom: -3 }}
            color={this.props.focused ? Colors.tabIconSelected : Colors.tabIconDefault}
          />
        );
    }

  }
}
