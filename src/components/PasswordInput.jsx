import React, {useState} from 'react';
import {View, TextInput, TouchableOpacity} from 'react-native';
import CustomText from './CustomText';
import appColors from '../constant/appColors';
import appFonts from '../constant/appFonts';

const PasswordInputField = ({
  value,
  onChangeText,
  isError,
  errorMessage,
  placeholder = 'Enter your password',
  title = 'Password',
}) => {
  const [isPasswordVisible, setIsPasswordVisible] = useState(false);

  const togglePasswordVisibility = () => {
    setIsPasswordVisible(!isPasswordVisible);
  };

  return (
    <View>
      <CustomText font="bold" className="text-white  my-2 ml-3">
        {title}
      </CustomText>
      <View
        className={`flex-row items-center bg-gray-300 rounded-xl px-4 ${
          isError ? 'border-red-500 border-2' : ''
        }`}>
        <TextInput
          placeholder={placeholder}
          secureTextEntry={!isPasswordVisible}
          cursorColor={appColors.dark}
          className="flex-1 py-5 placeholder:text-gray-500"
          value={value}
          onChangeText={onChangeText}
          style={{fontFamily: appFonts.Typo_Round_Regular}}
        />
        <TouchableOpacity onPress={togglePasswordVisibility}>
          <CustomText className="text-black text-sm">
            {isPasswordVisible ? 'hide' : 'show'}
          </CustomText>
        </TouchableOpacity>
      </View>

      {isError && (
        <CustomText className="text-red-500 ml-3 mt-1">
          {errorMessage}
        </CustomText>
      )}
    </View>
  );
};

export default PasswordInputField;
