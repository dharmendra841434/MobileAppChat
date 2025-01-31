import {View, Text, StatusBar, Image} from 'react-native';
import React, {useEffect} from 'react';
import {useNavigation} from '@react-navigation/native';
import appColors from '../constant/appColors';
import CustomText from '../components/CustomText';
import Storage from '../utils/AsyncStorage';

const SplashScreen = () => {
  const navigation = useNavigation();
  useEffect(() => {
    setTimeout(async () => {
      let token = await Storage.getItem('token');

      console.log(token);

      if (token) {
        navigation.navigate('dashboard');
      } else {
        navigation.navigate('onboarding');
      }
    }, 3000);
  }, []);

  return (
    <View className=" flex-1 bg-background items-center  ">
      <StatusBar
        backgroundColor={appColors.background}
        translucent={false}
        barStyle="light-content"
      />
      <Image
        source={require('../assets/images/logo.webp')}
        className=" w-[55%] h-[26.9%] mt-[50%]"
      />
      <CustomText
        font="jockey"
        className=" text-textColor font-bold my-5 text-4xl">
        PingPong
      </CustomText>

      <CustomText className=" absolute bottom-5 opacity-65 text-textColor">
        Version 1.0
      </CustomText>
    </View>
  );
};

export default SplashScreen;
