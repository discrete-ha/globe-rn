'use strict';

import React, {Component} from 'react';
import {bindActionCreators} from 'redux';
import { connect } from 'react-redux';
import {Text, TouchableOpacity, StyleSheet, View, Dimensions, Linking} from 'react-native';
import * as Animatable from 'react-native-animatable';

const {width} = Dimensions.get('window');
const styles = StyleSheet.create({
  topic:{
    alignSelf: 'flex-start',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    padding: 5
  },
  word:{
    fontSize:10,
    color: '#000'
  },
  container:{
    flexWrap:'wrap',
    flexDirection: 'row',
    alignItems: 'center', 
    justifyContent: 'center',
    backgroundColor: 'rgba(255, 255, 255, 0)',
    position:'absolute'
  }
});

class Topics extends Component {

  constructor(props) {
    super(props);
  }

  openSearch(url){
    Linking.canOpenURL(url).then(supported => {
      if (supported) {
        Linking.openURL(url);
      } else {
        console.log("Don't know how to open URI: " + this.props.url);
      }
    });
  }

  render() {
    let topics = [];
    let index = 0;
    let totalPoint = this.props.totalPoint;
    
    this.props.topics.map(function(item) {
      let fontSize = Math.round(item.point / totalPoint * 100) + 12;
      
      let animations = [ "bounce", "jello", "pulse", "rubberBand", "shake", "swing", "tada", "wobble" ];
      let textView;
      if (item.point === 0) {
        textView = (<Text style={[styles.word, {fontSize:fontSize}]}>{item.word}</Text>);
      }else{
        if (fontSize * item.word.length > width) {
          fontSize = width/item.word.length * 0.75;
        }
        textView = (<Animatable.Text 
        animation={animations[Math.floor(Math.random() * animations.length)]} 
        iterationCount='infinite'
        duration={3000}
        style={[styles.word, {fontSize:fontSize}]}>{item.word}</Animatable.Text>);
      }

      let searchUrl = `https://www.google.co.jp/search?q=${item.word}&source=lnt&tbs=qdr:d&sa=X&ved=0ahUKEwjlgczlj-jXAhUBwpQKHZWtDpwQpwUIIA&biw=1290&bih=738`;
      let newElement = (<TouchableOpacity 
        key={item.word} 
        onPress={this.openSearch.bind(this, searchUrl)} 
        style={styles.topic}>
          {textView}
        </TouchableOpacity>);

      if (index % 2 === 0) {
        topics.push(newElement);
      }else{
        topics.unshift(newElement);
      }
      index++;
    }.bind(this));
    return (
      <View style={styles.container}>
        {topics}
      </View>
    );

  }
}

let mapStateToProps = (state) => {
    return {
      topics:state.topic.words,
      totalPoint:state.topic.totalPoint
    };
}

let mapDispatchToProps = (dispatch) => {
    return {
    }
}

Topics = connect(mapStateToProps, mapDispatchToProps)(Topics);

export default Topics;