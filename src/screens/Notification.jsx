import {View, Text, FlatList, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {getInitials} from '../utils/helper';
import CustomText from '../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import appColors from '../constant/appColors';

const NotificationScreen = ({route}) => {
  //console.log(props, 'params');
  const {notifications} = route?.params;
  console.log(notifications, 'asjdgasj');
  const navigation = useNavigation();

  const NotificationItem = ({full_name}) => (
    <TouchableOpacity
      activeOpacity={0.9}
      className="flex-row items-center p-4 mb-3 bg-gray-200 rounded-xl  border border-gray-200">
      {/* Circular Avatar with Initials */}
      <View className="w-12 h-12 bg-primary rounded-full flex items-center justify-center mr-4">
        <CustomText className="text-lg  text-white uppercase">
          {getInitials(full_name)}
        </CustomText>
      </View>

      {/* Notification Message */}
      <View className=" flex flex-row items-center gap-x-1">
        <CustomText font="bold" className=" text-lg  text-gray-800">
          {full_name}
        </CustomText>
        <CustomText className=" font-medium text-gray-800">
          wants to connect with you.
        </CustomText>
      </View>
    </TouchableOpacity>
  );

  return (
    <View className=" flex-1 bg-background px-3">
      <View
        style={{elevation: 0.7, backgroundColor: appColors?.background}}
        className="h-16 bg-background border-b border-b-primary flex-row items-center  px-4">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            className=" h-6 w-6"
            tintColor={appColors.secondary}
            source={require('../assets/images/back.webp')}
          />
        </TouchableOpacity>
        <CustomText font="bold" className="text-white px-3 capitalize text-lg ">
          Notifications
        </CustomText>
      </View>
      <FlatList
        data={notifications}
        keyExtractor={item => item._id}
        renderItem={({item}) => <NotificationItem full_name={item.full_name} />}
      />
    </View>
  );
};

export default NotificationScreen;
