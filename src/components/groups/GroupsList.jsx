import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {
  countUnreadMessages,
  hasUserReadLastMessage,
  timeAgo,
} from '../../utils/helper';
import ProfileIcon from '../ProfileIcon';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import CustomText from '../CustomText';

const GroupsListCard = ({item}) => {
  const navigation = useNavigation();
  const {userDetails} = useGetUserDetails();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('startgroupchat', {group: item});
      }}
      className={`flex-row   px-4 py-5 border-b border-gray-600 ${
        !hasUserReadLastMessage(item, userDetails?.data?.user)
          ? 'bg-green-100/50'
          : 'bg-transparent'
      }`}>
      <ProfileIcon fullName={item.groupName} color={item?.groupIconColor} />
      <View className="flex-1 ml-3 ">
        <CustomText className="text-white text-xl font-bold capitalize">
          {item.groupName}
        </CustomText>
        {item?.messages?.length > 0 && (
          <View className={` text-xs `}>
            {item?.messages[item?.messages?.length - 1]?.mediaFile !== null ? (
              <CustomText
                className={` text-sm  ${
                  !hasUserReadLastMessage(item, userDetails?.data?.user)
                    ? ' text-gray-900 font-bold'
                    : ' text-gray-400 '
                }`}>
                Photo
              </CustomText>
            ) : (
              <CustomText
                numberOfLines={1}
                ellipsizeMode="tail"
                className={` text-sm  ${
                  !hasUserReadLastMessage(item, userDetails?.data?.user)
                    ? ' text-gray-900 font-bold'
                    : ' text-gray-400 '
                }`}>
                {item?.messages[item.messages?.length - 1]?.message}
              </CustomText>
            )}
          </View>
        )}
      </View>
      <View className="items-end">
        {item?.messages?.length > 0 && (
          <CustomText
            className={` text-sm  ${
              !hasUserReadLastMessage(item, userDetails?.data?.user)
                ? ' text-gray-900 font-bold'
                : ' text-gray-400 '
            }`}>
            {timeAgo(item?.messages[item.messages?.length - 1]?.timestamp)}
          </CustomText>
        )}
      </View>
      {countUnreadMessages(item?.messages, userDetails?.data?.user?._id) >
        0 && (
        <View className=" h-7 w-7 bg-red-600 rounded-full absolute right-5 bottom-4  flex items-center justify-center">
          <CustomText className=" text-white">
            {countUnreadMessages(item?.messages, userDetails?.data?.user?._id)}
          </CustomText>
        </View>
      )}
    </TouchableOpacity>
  );
};

export default GroupsListCard;
