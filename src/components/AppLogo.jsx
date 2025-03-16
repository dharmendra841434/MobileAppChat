import {View, Text} from 'react-native';
import React from 'react';
import LottieView from 'lottie-react-native';
import CustomText from './CustomText';

const AppLogo = () => {
  return (
    <View className="my-4 justify-between items-center">
      <LottieView
        style={{height: 200, width: 200, marginTop: '-15%'}}
        source={require('../assets/images/logo.json')}
        autoPlay
        loop
      />
      <CustomText
        font="bold"
        style={{lineHeight: 50}}
        className="text-white text-5xl -mt-10 ">
        PingPong
      </CustomText>
    </View>
  );
};

export default AppLogo;
