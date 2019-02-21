import React from 'react';
import {
  Image,
  Platform,
  ScrollView,
  StyleSheet,
  Text,
  TouchableOpacity,
  View,
  StatusBar,
  Dimensions
} from 'react-native';




import { connect } from 'react-redux';
import { bindActionCreators } from 'redux';

import Accordion from 'react-native-collapsible/Accordion';

import GymTile from '../components/gyms/GymTile';
import GymDetail from '../components/gyms/GymDetail';

import * as ActionCreators from '../actions/gymActions';

import { MonoText } from '../components/StyledText';

class HomeScreen extends React.Component {
  static navigationOptions = {
    header: null,
  };
  constructor(props) {
    super(props);
    this.state = {
      activeSections: []
    }
    this._renderSectionTitle = this._renderSectionTitle.bind(this);
    this._renderHeader = this._renderHeader.bind(this);
    this._renderContent = this._renderContent.bind(this);
    this._updateSections = this._updateSections.bind(this);
  }
  componentDidMount() {
    if (this.props.gyms.length === 0) {
      this.props.Actions.getGyms(this.props.token);
    }
  }

  _renderSectionTitle(section, index, isActive, sections) {
    // unexapanded
    return (
      <View>
        <Text>_renderSectionTitle</Text>
      </View>
    )
  }
  _renderHeader(section, index, isActive, sections) {
    // header of expanded section
    return (
      <GymTile gym={section}/>
    )
  }
  _renderContent(section, index, isActive, sections) {
    // content when expanded
    return <GymDetail gym={section} />
  }


  _updateSections(activeSections) {
    this.setState({activeSections})
  }

  render() {

    if (this.props.pending) {
      return (
        <View>
          <Text>Loading nearby gyms...</Text>
        </View>
      )
    }

    return (
      <View style={styles.container}>
        <View style={styles.imageContainer}>
          <Image
            source={require('../assets/images/gymHopWhite.png')}
            style={styles.brandLogo}
            resizeMode='contain'
          />
        </View>
        <ScrollView style={styles.contentContainer}>
          <View style={styles.mapsContainer}>
            <Text>Placeholder for google maps</Text>
          </View>
          <View style={styles.accordianContainer}>
            <Accordion
              sections={this.props.gyms}
              activeSections={this.state.activeSections}
              renderHeader={this._renderHeader}
              renderContent={this._renderContent}
              onChange={this._updateSections}
              touchableComponent={TouchableOpacity}
              underlayColor={"ffffffff"}
            />
          </View>
        </ScrollView>

      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
  },
    imageContainer: {
    ...Platform.select({
      ios: {
        shadowOffset:{  width: 0,  height: 3,  },
        shadowColor: 'black',
        shadowOpacity: 1,
        shadowRadius: 3,
        zIndex: 999
      },
      android: {
        elevation: 30
      },
    }),
      backgroundColor: '#000000',
      justifyContent: 'center',
      alignItems: 'center'
    },
      brandLogo: {
      backgroundColor: '#000000',
      width: '35%',
      marginTop: StatusBar.currentHeight,
    },
    contentContainer: {
      flex: 1,

    },
      mapsContainer: {
        height: ( Dimensions.get('window').height - StatusBar.currentHeight)* .35,
        borderWidth: 1,
        borderColor: "red"
      },
      accordianContainer: {
        height: ( Dimensions.get('window').height - StatusBar.currentHeight)* .65,
      }
});

function mapStateToProps(state) {
  return {
    gyms: state.gyms.gyms,
    pending: state.gyms.pending,
    error: state.gyms.error,
    token: state.user.token
  }
}
function mapDispatchToProps(dispatch) {
  return {
    Actions: bindActionCreators(ActionCreators, dispatch)
  }
}
export default connect(mapStateToProps, mapDispatchToProps)(HomeScreen)
