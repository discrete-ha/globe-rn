'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Text, Dimensions, StyleSheet, View, Alert} from 'react-native';
import topicService from '../api/topic';
import {setTopics} from '../actions/topic';
import {endInitLoading} from '../actions/system';
import * as Animatable from 'react-native-animatable';
import Loading from './loading';
import Location from './location';
import Topics from './topics';
import RNRestart from 'react-native-restart';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  logo: {
    fontSize: 30,
    fontWeight: 'bold',
    color: '#000'
  },
  logoSentence: {
    fontSize: 10,
  },
  appWraper:{
    flex: 1, 
    alignItems: 'center', 
    justifyContent: 'center' 
  }
});

class topicApp extends Component {

  constructor(props) {
    super(props);
    let topicsPromise = topicService.getTopicsByLocation();
    topicsPromise.then(function(res){ 
      if (res.error) {
        this.showDialog();
      }else{
        props.setTopics(res.topics);
      }
    }.bind(this)); 
  }

  init() {
    this.props.endInitLoading();
  }

  renderLogo() {
    return (
      <View style={styles.appWraper}>
        <Animatable.Text 
        animation="bounceIn" 
        duration={1500} 
        iterationCount={2} 
        direction="alternate" 
        onAnimationEnd={this.init.bind(this)} 
        style={styles.logo}>GLOBE</Animatable.Text>
        <Text style={styles.logoSentence}>Realtime issues around you</Text>
      </View>
    );
  }

  renderLoading(){
    return <Loading />;
  }

  showDetail(){
  }

  showDialog(){
    Alert.alert(
      'Notice',
      'API server is currently under maintenace',
      [
        {text: 'OK', onPress: () => RNRestart.Restart()},
      ],
      { cancelable: false }
    );
  }

  renderWords(){
    return <Topics />;
  }

  renderTopics() {
    return (
      <View style={styles.appWraper}>
        <Location />
        { this.props.topics ? this.renderWords() : this.renderLoading() }
      </View>
    );
  }

  render() {
    if (this.props.initLoading) {
      return this.renderLogo();
    }else{
      return this.renderTopics();
    }
  }
}

let mapStateToProps = (state) => {
    return {
        topics:state.topic.words,
        initLoading:state.system.initLoading,
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
        setTopics: (words) => dispatch(setTopics(words)),
        endInitLoading: () => dispatch(endInitLoading())
    }
}

topicApp = connect(mapStateToProps, mapDispatchToProps)(topicApp);

export default topicApp;