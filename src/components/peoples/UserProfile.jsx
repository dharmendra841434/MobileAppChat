import React from 'react';
import {
  View,
  Text,
  Image,
  TouchableOpacity,
  ActivityIndicator,
} from 'react-native';
import {useNavigation} from '@react-navigation/native';
import CustomText from '../CustomText';
import AsyncStorage from '@react-native-async-storage/async-storage';

const UserProfile = ({
  user,
  setView,
  currentUser,
  handleToggleRequest,
  Loader = false,
}) => {
  const navigation = useNavigation();

  const handleLogout = () => {
    // Handle logout logic here
    //console.log('User logged out');
    setView(false);
    AsyncStorage.clear();
    navigation.navigate('login'); // Navigate to login screen if needed
  };

  console.log(user?.username === currentUser?.user?.username, 'jghfyfyf');

  return (
    <View className="flex-1 rounded-t-2xl items-center justify-center bg-gray-100 p-4">
      <Image
        source={{uri: user?.profile_pic}}
        className="w-32 h-32 rounded-full border-4 border-white shadow-md"
      />
      <CustomText font="bold" className="mt-4 text-2xl  text-gray-800">
        {user?.full_name?.split('')[0].toUpperCase() +
          user?.full_name?.slice(1)}
      </CustomText>
      <CustomText className="text-gray-500">@{user?.username}</CustomText>

      {currentUser?.user?.username === user.username && (
        <TouchableOpacity
          onPress={handleLogout}
          className="mt-6 px-9 py-2 bg-red-500 rounded-lg shadow-md">
          <CustomText className="text-white font-semibold">Logout</CustomText>
        </TouchableOpacity>
      )}
      {/* {currentUser?.allFriends?.some(item => item?._id === user?._id) ? (
        <TouchableOpacity
          onPress={() => navigation.navigate('startuserchat')}
          className="mt-6 bg-background flex items-center justify-center self-center w-1/2 hover:bg-purple-800 text-white  py-3 rounded-lg">
          <CustomText className="text-white font-medium">
            Start Conversation
          </CustomText>
        </TouchableOpacity>
      ) : (
        <>
          {currentUser?.user?.username !== user.username && (
            <TouchableOpacity
              onPress={handleToggleRequest}
              className=" flex items-center justify-center mt-6 bg-background hover:bg-purple-800 text-white w-1/2 py-3 rounded-lg">
              {Loader ? (
                <ActivityIndicator />
              ) : (
                <CustomText className=" font-medium text-white">
                  {currentUser?.sendedRequestsUsers?.some(
                    item => item?._id === user?._id,
                  )
                    ? 'Cancel Request'
                    : 'Send Request'}
                </CustomText>
              )}
            </TouchableOpacity>
          )}
        </>
      )} */}
    </View>
  );
};

export default UserProfile;
