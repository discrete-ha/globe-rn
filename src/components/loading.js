'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions, Image} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width, height} = Dimensions.get('window');
const styles = StyleSheet.create({
  text: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#000000',
  },
  image:{
    width:60,
    height:60
  },
  view:{
    backgroundColor: 'rgba(255, 255, 255, 0.8)', 
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


class loading extends Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
        <View style={styles.view}>
          <Text style={styles.text}>Loading</Text>
        </View>
      );
  }
}

let mapStateToProps = (state) => {
    return {
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

loading = connect(mapStateToProps, mapDispatchToProps)(loading);

export default loading;