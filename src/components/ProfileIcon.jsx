import React from 'react';
import {View, Text} from 'react-native';
import {getInitials} from '../utils/helper';
import CustomText from './CustomText';

const ProfileIcon = ({fullName = 'Ping pong', color = '#536', className}) => {
  return (
    <View
      className={` rounded-full flex items-center justify-center ${
        className ? className : ' h-14 w-14'
      }`}
      style={{backgroundColor: color}}>
      <CustomText className="text-2xl font-semibold text-gray-200">
        {getInitials(fullName)}
      </CustomText>
    </View>
  );
};

export default ProfileIcon;
