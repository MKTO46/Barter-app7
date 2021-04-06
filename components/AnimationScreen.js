import React from 'react';
import LottieView from 'lottie-react-native';

export default class BarterAnimation extends React.Component {
  render() {
    return (
      <LottieView
      source={require('../assets/Barter.json')}
      style={{width:"90%",marginBottom:5}}
      autoPlay loop />
    )
  }
}