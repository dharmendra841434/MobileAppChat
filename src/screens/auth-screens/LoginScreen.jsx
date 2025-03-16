import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  Platform,
  TouchableWithoutFeedback,
  Keyboard,
} from 'react-native';
import CustomText from '../../components/CustomText';
import appColors from '../../constant/appColors';
import {useNavigation} from '@react-navigation/native';
import PasswordInputField from '../../components/PasswordInput';
import useLoginUser from '../../hooks/authenticationHooks/useLogin';
import appFonts from '../../constant/appFonts';
import LoaderKit from 'react-native-loader-kit';
import LottieView from 'lottie-react-native';
import AppLogo from '../../components/AppLogo';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {loginUser, success, isLoading, LoginError} = useLoginUser();

  const handleLogin = () => {
    console.log('sakhfyasdi');

    loginUser({
      data: {
        username,
        password,
      },
    });
  };

  return (
    <TouchableWithoutFeedback onPress={() => Keyboard.dismiss()}>
      <View className="flex-1 bg-background p-6">
        {/* Header */}
        <AppLogo />

        {/* Welcome Back */}
        <View className="mb-6 mt-10">
          <CustomText font="bold" className="text-white text-3xl mb-1">
            Welcome Back!
          </CustomText>
          <CustomText className="text-white">Login to continue</CustomText>
        </View>

        {/* Input Fields */}
        <View className="space-y-4 mb-6">
          <View>
            <CustomText font="bold" className="text-white  my-2 ml-3">
              Username
            </CustomText>
            <TextInput
              placeholder="Enter your username"
              cursorColor={appColors.dark}
              className="bg-gray-300 rounded-xl px-4  py-5 placeholder:text-gray-500"
              value={username}
              onChangeText={setUsername}
              style={{fontFamily: appFonts.Typo_Round_Regular}}
            />
          </View>
          <PasswordInputField value={password} onChangeText={setPassword} />
        </View>

        {/* Options */}
        <View className="flex-row justify-between items-center mb-6">
          <View className="flex-row items-center">
            <CustomText className="text-white ml-2">Remember me</CustomText>
          </View>
          <CustomText className=" text-secondary">Forget password?</CustomText>
        </View>

        {/* Login Button */}
        <TouchableOpacity
          className="bg-primary py-4 rounded-full mb-6 items-center justify-center"
          disabled={isLoading}
          onPress={handleLogin}>
          {isLoading ? (
            <View className=" flex flex-row  items-center justify-center">
              <CustomText
                font="bold"
                className="text-black text-center text-lg mr-2 ">
                Logining
              </CustomText>
              <LoaderKit
                style={{width: 20, height: 20}}
                name={'LineScalePulseOut'} // Optional: see list of animations below
                color={appColors.background} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
              <LoaderKit
                style={{width: 20, height: 20}}
                name={'LineScalePulseOut'} // Optional: see list of animations below
                color={appColors.background} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
              <LoaderKit
                style={{width: 20, height: 20}}
                name={'LineScalePulseOut'} // Optional: see list of animations below
                color={appColors.background} // Optional: color can be: 'red', 'green',... or '#ddd', '#ffffff',...
              />
            </View>
          ) : (
            <CustomText font="bold" className="text-black text-center text-lg ">
              Login
            </CustomText>
          )}
        </TouchableOpacity>

        {/* Sign Up */}
        <View className="flex flex-row items-center justify-center">
          <CustomText className="text-white text-center">
            Don’t have an account?{' '}
          </CustomText>
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => navigation.navigate('register')}>
            <CustomText
              font="bold"
              className="text-primary underline text-center">
              Sign Up
            </CustomText>
          </TouchableOpacity>
        </View>
      </View>
    </TouchableWithoutFeedback>
  );
};

export default LoginScreen;
