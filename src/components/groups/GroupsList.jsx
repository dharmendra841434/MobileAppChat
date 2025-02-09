import {View, Text, TouchableOpacity, Image} from 'react-native';
import React from 'react';
import {useNavigation} from '@react-navigation/native';
import {timeAgo} from '../../utils/helper';
import ProfileIcon from '../ProfileIcon';

const GroupsListCard = ({item}) => {
  const navigation = useNavigation();

  return (
    <TouchableOpacity
      activeOpacity={0.8}
      onPress={() => {
        navigation.navigate('startgroupchat', {group: item});
      }}
      className="flex-row items-center px-4 py-5 border-b border-gray-600">
      {/* <Image
        source={require('../../assets/images/defaultDp.webp')}
        className="w-12 h-12 rounded-full"
      /> */}
      <ProfileIcon
        fullName={item?.groupName || 'Unknown Group'}
        color={item?.groupIconColor}
      />
      <View className="flex-1 ml-3">
        <Text className="text-white text-lg font-semibold capitalize">
          {item?.groupName || 'Unknown Group'}
        </Text>
        {item?.messages?.length > 0 && (
          <View>
            {item?.messages[item.messages.length - 1]?.mediaFile ? (
              <Text className="text-gray-400 text-sm">Photo</Text>
            ) : (
              <Text
                numberOfLines={1}
                ellipsizeMode="tail"
                className="text-xs text-gray-400">
                {item?.messages[item.messages.length - 1]?.message ||
                  'No recent messages'}
              </Text>
            )}
          </View>
        )}
      </View>
      <View className="items-end">
        {item?.messages?.length > 0 && (
          <Text className="text-gray-400 text-xs">
            {timeAgo(item.messages[item.messages.length - 1]?.timestamp) || ''}
          </Text>
        )}
      </View>
    </TouchableOpacity>
  );
};

export default GroupsListCard;
