import React, {useState, useEffect} from 'react';
import {View, TextInput, Text} from 'react-native';
import {useMutation} from '@tanstack/react-query';
import {checkUsernameRequest} from '../hooks/ApiRequiests/userApi';
import CustomText from './CustomText';
import appColors from '../constant/appColors';

const UserNameInput = ({
  setInput,
  errors,
  handleOnChangeText,
  handleOnFocus,
}) => {
  const [userName, setUserName] = useState('');
  const [isChecking, setIsChecking] = useState(false);
  const [isAvailable, setIsAvailable] = useState(null);

  const {mutate: checkUsername, error: checkError} = useMutation({
    mutationFn: payload => checkUsernameRequest(payload),
    onSuccess: data => {
      console.log(data);

      if (data?.isAvailable) {
        setIsAvailable(true);
        setInput(userName);
      } else {
        setIsAvailable(false);
        setInput('');
      }
      setIsChecking(false);
    },
    onError: error => {
      console.log('Error:', error);
      setIsChecking(false);
    },
  });

  const handOnchange = text => {
    setUserName(text);
    handleOnChangeText(text);
  };

  // Debounced username availability check
  useEffect(() => {
    if (userName.length > 2) {
      setIsChecking(true);
      const delay = setTimeout(() => {
        checkUsername({username: userName});
      }, 1500);
      return () => clearTimeout(delay);
    } else {
      setIsChecking(false);
      setIsAvailable(null);
    }
  }, [userName]);

  return (
    <View className=" relative">
      {/* Username Label */}
      <CustomText font="bold" className="text-white text-lg my-2 ml-3">
        Username
      </CustomText>

      {/* Input Field */}
      <TextInput
        placeholder="Enter username"
        cursorColor={appColors.dark}
        className={`bg-gray-300 rounded-xl  px-4 py-5 
           placeholder:text-gray-500 ${
             errors?.username ? 'border-red-500 border-2' : ''
           }`}
        value={userName}
        onChangeText={handOnchange}
        onFocus={handleOnFocus}
      />

      <View className=" absolute top-0 bottom-0 right-0 justify-center pr-3 pt-9">
        {isChecking ? (
          <CustomText className="text-blue-500 ml-3 mt-1">
            Checking...
          </CustomText>
        ) : isAvailable !== null ? (
          <CustomText
            className={`ml-3 mt-1 ${
              isAvailable ? 'text-green-600' : 'text-red-500'
            }`}>
            {isAvailable ? 'Available' : 'Not Available'}
          </CustomText>
        ) : null}
      </View>

      {/* Validation & Availability Messages */}

      {/* Error Message */}
      {errors?.username && (
        <CustomText className="text-red-500 ml-3 mt-1">
          {errors.username}
        </CustomText>
      )}
    </View>
  );
};

export default UserNameInput;
