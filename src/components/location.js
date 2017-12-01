'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  text: {
    fontWeight: '900',
    color: '#000000',
    opacity: 0.1
  },
  view:{
    backgroundColor: 'rgba(255, 255, 255, 1)', 
    position: 'absolute',
    top: 0, 
    left: 0, 
    right: 0, 
    bottom: 0, 
    justifyContent: 'center', 
    alignItems: 'center',
    height:height
  }
});

class location extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    if (this.props.locationName) {
      return (
        <View style={styles.view}>
          <Text style={[{fontSize: (width/this.props.locationName.length)}, styles.text]}>{this.props.locationName}
          </Text>
        </View>
      );
    }else{
      return (
        <View style={styles.view}>
        </View>
      );
    }
    
  }
}

let mapStateToProps = (state) => {
    return {
      locationName: state.topic.location
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

location = connect(mapStateToProps, mapDispatchToProps)(location);

export default location;