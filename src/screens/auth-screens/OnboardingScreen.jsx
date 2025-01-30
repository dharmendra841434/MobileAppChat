import React from 'react';
import {View, Text, TouchableOpacity, Image, StatusBar} from 'react-native';
import appColors from '../../constant/appColors';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';

const OnboardingScreen = () => {
  const navigation = useNavigation();

  return (
    <View className="flex-1 bg-background items-center justify-center p-6">
      <StatusBar
        backgroundColor={appColors.background}
        translucent={false}
        barStyle="light-content"
      />

      {/* Header */}
      <Text className="text-white text-3xl font-bold mb-8">PingPong.chat</Text>

      {/* Illustration */}
      <View className="mb-8">
        <Image
          source={require('../../assets/images/illus.webp')} // Replace with your image path
          className="w-72 h-48"
          resizeMode="contain"
        />
      </View>

      {/* Welcome Text */}
      <View className="mb-8">
        <CustomText className="text-white text-2xl font-bold text-center mb-2">
          Hello, Welcome!
        </CustomText>
        <CustomText className="text-white text-center text-sm">
          Welcome to PingPong.chat, Top platform to coders
        </CustomText>
      </View>

      {/* Buttons */}
      <View className="space-y-4 w-full">
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => navigation.navigate('login')}
          className="bg-primary my-4 py-4 rounded-full">
          <CustomText className="text-black font-bold text-center text-lg">
            Login
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.9}
          onPress={() => {
            navigation.navigate('register');
          }}
          className="bg-primary my-4 py-4 rounded-full">
          <CustomText className="text-black font-bold text-center text-lg">
            Sign Up
          </CustomText>
        </TouchableOpacity>
      </View>

      {/* Social Media Links */}
      <View className="mt-8 items-center">
        <CustomText className="text-white text-sm mb-4">
          Or via social media
        </CustomText>
        <View className="flex-row space-x-6">
          {/* <FontAwesome name="facebook" size={24} color="white" />
          <FontAwesome name="google" size={24} color="white" />
          <FontAwesome name="linkedin" size={24} color="white" /> */}
        </View>
      </View>
    </View>
  );
};

export default OnboardingScreen;
