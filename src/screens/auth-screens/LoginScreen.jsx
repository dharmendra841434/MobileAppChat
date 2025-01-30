import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity, Image} from 'react-native';
import CustomText from '../../components/CustomText';
import appColors from '../../constant/appColors';
import {useNavigation} from '@react-navigation/native';
import PasswordInputField from '../../components/PasswordInput';
import useLoginUser from '../../hooks/authenticationHooks/useLogin';

const LoginScreen = () => {
  const navigation = useNavigation();
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const {loginUser, success, isLoading, LoginError} = useLoginUser();

  const handleLogin = () => {
    loginUser({
      data: {
        username,
        password,
      },
    });
  };

  return (
    <View className="flex-1 bg-background p-6">
      {/* Header */}
      <View className="my-4 justify-between items-center">
        <Image
          source={require('../../assets/images/logo.webp')}
          className="h-36 w-36"
        />
        <CustomText font="bold" className="text-white text-3xl mt-3 font-bold">
          PingPong.chat
        </CustomText>
      </View>

      {/* Welcome Back */}
      <View className="mb-6 mt-14">
        <CustomText font="bold" className="text-white text-3xl mb-1">
          Welcome Back!
        </CustomText>
        <CustomText className="text-white">Login to continue</CustomText>
      </View>

      {/* Input Fields */}
      <View className="space-y-4 mb-6">
        <View>
          <CustomText font="bold" className="text-white text-lg my-2 ml-3">
            Username
          </CustomText>
          <TextInput
            placeholder="Enter your username"
            cursorColor={appColors.dark}
            className="bg-gray-300 rounded-xl px-4 py-5 placeholder:text-gray-500"
            value={username}
            onChangeText={setUsername}
          />
        </View>
        <PasswordInputField value={password} onChangeText={setPassword} />
      </View>

      {/* Options */}
      <View className="flex-row justify-between items-center mb-6">
        <View className="flex-row items-center">
          <CustomText className="text-white ml-2">Remember me</CustomText>
        </View>
        <CustomText className="text-white">Forget password?</CustomText>
      </View>

      {/* Login Button */}
      <TouchableOpacity
        className="bg-primary py-4 rounded-full mb-6"
        disabled={isLoading}
        onPress={handleLogin}>
        <CustomText
          font="bold"
          className="text-black text-center text-lg font-bold">
          {isLoading ? 'Logging in...' : 'Login'}
        </CustomText>
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
  );
};

export default LoginScreen;
