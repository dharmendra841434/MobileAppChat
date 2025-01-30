import React, {useState} from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  KeyboardAvoidingView,
  ScrollView,
  Platform,
} from 'react-native';
import CustomText from '../../components/CustomText';
import appColors from '../../constant/appColors';
import {useNavigation} from '@react-navigation/native';
import PasswordInputField from '../../components/PasswordInput';
import useUserRegister from '../../hooks/authenticationHooks/useUserRegister';
import UserNameInput from '../../components/UserNameInput';

const RegisterScreen = () => {
  const navigation = useNavigation();

  // State for form fields
  const [username, setUsername] = useState('');
  const [fullName, setFullName] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  // Error state
  const [errors, setErrors] = useState({});

  // Validation function
  const validateForm = () => {
    let newErrors = {};

    if (!username.trim()) {
      newErrors.username = 'Username is required.';
    }

    if (!fullName.trim()) {
      newErrors.fullName = 'Full name is required.';
    }

    if (!password.trim()) {
      newErrors.password = 'Password is required.';
    } else if (password.length < 6) {
      newErrors.password = 'Password must be at least 6 characters.';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirm Password is required.';
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = 'Passwords do not match.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  // Handle register button press
  const handleRegister = () => {
    if (validateForm()) {
      userRegister({
        username: username,
        full_name: fullName,
        password: password,
        profile_pic:
          'https://cdn.pixabay.com/photo/2020/07/01/12/58/icon-5359553_640.png',
        isActive: true,
      });
    }
  };

  // Handle focus or input change to clear errors dynamically
  const handleFocus = field => {
    setErrors(prevErrors => ({...prevErrors, [field]: null}));
  };

  const handlePasswordChange = text => {
    setPassword(text);
    if (errors.password) {
      setErrors(prevErrors => ({...prevErrors, password: null}));
    }
    if (confirmPassword && text !== confirmPassword) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
    } else {
      setErrors(prevErrors => ({...prevErrors, confirmPassword: null}));
    }
  };

  const handleConfirmPasswordChange = text => {
    setConfirmPassword(text);
    if (errors.confirmPassword) {
      setErrors(prevErrors => ({...prevErrors, confirmPassword: null}));
    }
    if (text !== password) {
      setErrors(prevErrors => ({
        ...prevErrors,
        confirmPassword: 'Passwords do not match.',
      }));
    }
  };

  const handleReset = () => {
    setUsername('');
    setFullName('');
    setPassword('');
    setConfirmPassword('');
    navigation.navigate('login');
  };

  const {userRegister, userRegisterLoading, userRegisterSuccess} =
    useUserRegister({handleSucces: handleReset});

  return (
    <KeyboardAvoidingView
      className=" bg-background"
      behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      style={{flex: 1}}>
      <ScrollView contentContainerStyle={{flexGrow: 1, padding: 16}}>
        <View className="flex-1 bg-background">
          {/* Header */}
          <View className="mb-8 flex-row justify-between items-center">
            <CustomText font="bold" className="text-white text-3xl font-bold">
              PingPong.chat
            </CustomText>
            <Image
              source={require('../../assets/images/logo.webp')}
              className="h-10 w-10"
            />
          </View>

          {/* Welcome */}
          <View className="mb-6 mt-20">
            <CustomText font="bold" className="text-white text-3xl mb-1">
              Create Account Now!
            </CustomText>
          </View>

          {/* Input Fields */}
          <View className="space-y-4 mb-6">
            <UserNameInput
              errors={errors}
              handleOnChangeText={setUsername}
              handleOnFocus={() => handleFocus('username')}
            />

            <View>
              <CustomText font="bold" className="text-white text-lg my-2 ml-3">
                Full Name
              </CustomText>
              <TextInput
                placeholder="Enter full name"
                cursorColor={appColors.dark}
                className={`bg-gray-300 rounded-xl px-4 py-5 placeholder:text-gray-500 ${
                  errors.fullName ? 'border-red-500 border-2' : ''
                }`}
                value={fullName}
                onChangeText={setFullName}
                onFocus={() => handleFocus('fullName')}
              />
              {errors.fullName && (
                <CustomText className="text-red-500 ml-3 mt-1">
                  {errors.fullName}
                </CustomText>
              )}
            </View>

            <PasswordInputField
              placeholder="Enter password"
              value={password}
              onChangeText={handlePasswordChange}
              isError={!!errors.password}
              errorMessage={errors.password}
            />

            <PasswordInputField
              placeholder="Confirm password"
              value={confirmPassword}
              onChangeText={handleConfirmPasswordChange}
              isError={!!errors.confirmPassword}
              errorMessage={errors.confirmPassword}
            />
          </View>

          {/* Sign Up Button */}
          <TouchableOpacity
            className="bg-primary py-4 rounded-full my-6"
            disabled={userRegisterLoading}
            onPress={handleRegister}>
            <CustomText
              font="bold"
              className="text-black text-center text-lg font-bold">
              {userRegisterLoading ? 'Signing Up...' : 'Sign Up'}
            </CustomText>
          </TouchableOpacity>

          {/* Login */}
          <View className="flex flex-row items-center justify-center">
            <CustomText className="text-white text-center">
              Already have an account?{' '}
            </CustomText>
            <TouchableOpacity
              activeOpacity={0.7}
              onPress={() => {
                navigation.navigate('login');
              }}>
              <CustomText
                font="bold"
                className="text-primary underline text-center">
                Login
              </CustomText>
            </TouchableOpacity>
          </View>
        </View>
      </ScrollView>
    </KeyboardAvoidingView>
  );
};

export default RegisterScreen;
