import {View, Text, Image, TouchableOpacity} from 'react-native';
import React, {useState} from 'react';
import CustomText from './CustomText';
import useGetUserDetails from '../hooks/authenticationHooks/useGetUserDetails';
import appColors from '../constant/appColors';
import {useNavigation} from '@react-navigation/native';
import CustomBottomSheet from './CustomBottomSheet';
import UserProfile from './peoples/UserProfile';

const TopHeader = ({title = 'Add Title'}) => {
  const {userDetails, isLoading, isError, error} = useGetUserDetails();

  const navigation = useNavigation();
  const [viewProfile, setViewProfile] = useState(false);

  return (
    <View>
      {/* Header */}
      <View className="h-16 flex-row justify-between items-center px-4">
        <CustomText font="bold" className="text-white text-4xl ">
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
            onPress={() => setViewProfile(true)}
            className="w-12 h-12 bg-gray-800 rounded-full flex items-center justify-center">
            <Image
              className=" h-12 w-12 rounded-full "
              source={{uri: userDetails?.data?.user?.profile_pic}}
            />
          </TouchableOpacity>
        </View>
      </View>
      <CustomBottomSheet
        isVisible={viewProfile}
        onClose={() => setViewProfile(false)}
        sheetHeight={350}
        renderContent={() => (
          <>
            <UserProfile
              user={userDetails?.data?.user}
              currentUser={userDetails?.data}
              setView={setViewProfile}
            />
          </>
        )}
      />
    </View>
  );
};

export default TopHeader;
