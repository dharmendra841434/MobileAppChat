import React, {useEffect} from 'react';
import {View, TouchableOpacity, StatusBar} from 'react-native';
import appColors from '../../constant/appColors';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import LottieView from 'lottie-react-native';
import {
  GoogleSignin,
  statusCodes,
  isErrorWithCode,
} from '@react-native-google-signin/google-signin';
import showToast from '../../utils/showToast';

GoogleSignin.configure({
  webClientId:
    '603256322898-0in6jp9mmsso3p1fahj9gc5cf9anajkl.apps.googleusercontent.com',
  scopes: ['https://www.googleapis.com/auth/drive.readonly'],
  forceCodeForRefreshToken: false,
});

const OnboardingScreen = () => {
  const navigation = useNavigation();
  // useEffect(() => {
  //   GoogleSignin.configure({
  //     webClientId:
  //       '213731603866-dsp04nghre7qic9ud9kvn1pv2mcmkevp.apps.googleusercontent.com', // client ID of type WEB for your server. Required to get the `idToken` on the user object, and for offline access.
  //     scopes: ['https://www.googleapis.com/auth/drive.readonly'], // what API you want to access on behalf of the user, default is email and profile
  //   });
  // }, []);

  const signInWithGoogle = async () => {
    showToast('error', 'Google SignIn not working Try Basic Login');
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const response = await GoogleSignin.signIn();
    //   console.log('User Info:', response);
    // } catch (error) {
    //   console.log('Google Sign-In Error:', error);
    // }
  };

  const signInWithFacebook = async () => {
    showToast('error', 'Facebook SignIn not working Try Basic Login');
    // try {
    //   await GoogleSignin.hasPlayServices();
    //   const response = await GoogleSignin.signIn();
    //   console.log('User Info:', response);
    // } catch (error) {
    //   console.log('Google Sign-In Error:', error);
    // }
  };

  return (
    <View className="flex-1 bg-background items-center justify-center p-6">
      <StatusBar
        backgroundColor={appColors.background}
        translucent={false}
        barStyle="light-content"
      />

      {/* Header */}
      <CustomText
        font="bold"
        style={{lineHeight: 60}}
        className="text-white text-5xl   ">
        PingPong
      </CustomText>

      {/* Illustration */}
      <View className="">
        {/* <Image
          source={require('../../assets/images/illus.webp')} // Replace with your image path
          className="w-72 h-48"
          resizeMode="contain"
        /> */}
        <LottieView
          style={{height: 350, width: 350}}
          source={require('../../assets/images/chating.json')}
          autoPlay
          loop
        />
      </View>

      {/* Welcome Text */}
      <View className="mb-8">
        <CustomText
          font="bold"
          className="text-white text-2xl  text-center mb-2">
          Hello, Welcome!
        </CustomText>
        <CustomText className="text-white text-center text-sm">
          Welcome to PingPong chat, Top platform to coders
        </CustomText>
      </View>

      {/* Buttons */}
      <View className="space-y-4 w-full">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            signInWithGoogle();
          }}
          className="bg-primary flex flex-row gap-x-4 justify-center items-center my-4 py-2  rounded-full">
          <LottieView
            style={{height: 40, width: 40}}
            source={require('../../assets/images/google.json')}
            autoPlay
            loop
          />
          <CustomText font="bold" className="text-black  text-center text-lg">
            Continue with Google
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            signInWithFacebook();
          }}
          className="bg-primary flex flex-row gap-x-5 justify-center items-center my-4 py-2  rounded-full">
          <LottieView
            style={{height: 40, width: 40}}
            source={require('../../assets/images/facebook.json')}
            autoPlay
            loop
          />
          <CustomText font="bold" className="text-black  text-center text-lg">
            Continue with Facebook
          </CustomText>
        </TouchableOpacity>
      </View>

      <View className=" mt-3 w-full">
        <View className=" bg-gray-500 h-0.5 w-full" />
        <CustomText className=" absolute bg-background px-3 left-1/2 -top-2 text-gray-200">
          Or
        </CustomText>
      </View>

      {/* Social Media Links */}
      <View className="items-center mt-8">
        <TouchableOpacity onPress={() => navigation.navigate('login')}>
          <CustomText className="text-white  underline ml-10 ">
            Login
          </CustomText>
        </TouchableOpacity>
      </View>
    </View>
  );
};

export default OnboardingScreen;
