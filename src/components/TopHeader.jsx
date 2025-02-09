import {View, Text, Image, TouchableOpacity} from 'react-native';
import React from 'react';
import CustomText from './CustomText';
import useGetUserDetails from '../hooks/authenticationHooks/useGetUserDetails';
import appColors from '../constant/appColors';
import {useNavigation} from '@react-navigation/native';

const TopHeader = ({title = 'Add Title', handleViewProfile}) => {
  const {userDetails, isLoading, isError, error} = useGetUserDetails();

  const navigation = useNavigation();

  return (
    <View>
      {/* Header */}
      <View className="h-16 flex-row justify-between items-center px-4">
        <CustomText className="text-white text-4xl font-bold">
          {title}
        </CustomText>
        <View className="flex-row gap-x-5">
          <TouchableOpacity
            onPress={() => {
              navigation.navigate('notification', {
                notifications: userDetails?.data?.recivedRequestsUsers,
              });
            }}
            className="w-8 h-18  flex items-center justify-center">
            <Image
              tintColor={appColors.primary}
              className=" h-8 w-8 rounded-full "
              source={require('../assets/images/notification.png')}
            />
            {userDetails?.data?.recivedRequestsUsers?.length > 0 && (
              <CustomText className=" bg-red-600 px-1.5 text-secondary top-0 -right-2 text-sm rounded-full absolute">
                {userDetails?.data?.recivedRequestsUsers?.length}
              </CustomText>
            )}
          </TouchableOpacity>
          <TouchableOpacity
            onPress={handleViewProfile}
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <Image
              className=" h-12 w-12 rounded-full "
              source={{uri: userDetails?.data?.user?.profile_pic}}
            />
          </TouchableOpacity>
        </View>
      </View>
    </View>
  );
};

export default TopHeader;
