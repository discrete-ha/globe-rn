'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Text, Dimensions, StyleSheet, View, Alert, Geolocation} from 'react-native';
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
    this.init = this.init.bind(this);
    topicsPromise.then(function(res){ 
      if (res.error) {
        this.showDialog();
      }else{
        console.log("topicApp", res);
        props.setTopics(res.topics);
      }
    }.bind(this))
    .catch(function(error) { 
      throw new Error("topicApp constructor failed - "+error);
    }); 
  }

  init() {
    console.log("init()");
    this.props.endInitLoading();
  }

  renderLogo() {
    console.log("renderLogo()");
    return (
      <View style={styles.appWraper}>
        <Animatable.Text 
        animation="bounceIn" 
        duration={1500} 
        iterationCount={2} 
        direction="alternate" 
        onAnimationEnd={this.init} 
        style={styles.logo}>GLOBE</Animatable.Text>
        <Text style={styles.logoSentence}>Realtime issues around you</Text>
      </View>
    );
  }

  renderLoading(){
    console.log("renderLoading()");
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
    console.log("renderWords()");
    return <Topics />;
  }

  renderTopics() {
    console.log("renderTopics()",this.props);
    return (
      <View style={styles.appWraper}>
        <Location />
        { this.props.topics ? this.renderWords() : this.renderLoading() }
      </View>
    );
  }

  render() {
    console.log("render()");
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