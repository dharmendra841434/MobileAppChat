import {View, Text, TouchableOpacity, Image, TextInput} from 'react-native';
import React from 'react';
import appColors from '../../constant/appColors';

const GroupTab = () => {
  const handleCreateGroup = () => {
    // Handle the create group logic here
    console.log('Create Group button pressed');
  };

  return (
    <View className="flex-1 bg-background">
      <View className="h-16 flex-row justify-between items-center px-4">
        <Text className="text-white text-2xl font-bold">Groups</Text>
        <View className="flex-row space-x-4">
          <View className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <Image
              className="h-9 w-9 rounded-full"
              source={require('../../assets/images/defaultDp.webp')}
            />
          </View>
        </View>
      </View>

      {/* Search */}
      <View className="px-4 py-2">
        <TextInput
          placeholder="Ask Meta AI or Search"
          placeholderTextColor="#6b7280"
          className="h-14 px-4 bg-gray-300 rounded-lg text-white"
        />
      </View>

      {/* Create Group Button */}
      <TouchableOpacity
        className="mx-4 mt-4 bg-blue-500 rounded-lg p-4 items-center"
        onPress={handleCreateGroup}>
        <Text className="text-white text-lg font-bold">Create Group</Text>
      </TouchableOpacity>
    </View>
  );
};

export default GroupTab;
