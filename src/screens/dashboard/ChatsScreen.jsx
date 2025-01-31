import React, {useState} from 'react';
import {
  View,
  Text,
  TextInput,
  FlatList,
  Image,
  TouchableOpacity,
} from 'react-native';
import useGetUserGroupsList from '../../hooks/groupHooks/useGetUserGroupsList';
import CustomText from '../../components/CustomText';
import {timeAgo} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import ChatLoader from '../../components/loader/ChatLoader';

const tabs = ['All', 'Unread', 'Favourites', 'Groups'];

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const navigation = useNavigation();

  const {groupsList, isLoading} = useGetUserGroupsList();
  //console.log(groupsList);

  return (
    <View className="flex-1 bg-background">
      {/* Header */}
      <View className="h-16 flex-row justify-between items-center px-4">
        <Text className="text-white text-2xl font-bold">Chats</Text>
        <View className="flex-row space-x-4">
          <View className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center">
            <Image
              className=" h-9 w-9 rounded-full "
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

      {/* Tabs */}
      <View className="flex-row px-4 mt-2">
        {tabs.map(tab => (
          <TouchableOpacity
            key={tab}
            onPress={() => setActiveTab(tab)}
            className={`px-6 py-2 rounded-full ${
              activeTab === tab ? 'bg-primary' : 'bg-gray-400'
            } mx-1`}>
            <Text
              className={`${
                activeTab === tab ? 'text-background' : 'text-gray-300'
              }`}>
              {tab}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      {isLoading ? (
        <ChatLoader />
      ) : (
        <>
          {/* Chat List */}
          <FlatList
            data={groupsList?.data?.groups}
            keyExtractor={item => item._id}
            className="flex-1 mt-2"
            renderItem={({item}) => (
              <TouchableOpacity
                activeOpacity={0.8}
                onPress={() => {
                  navigation.navigate('startgroupchat', {group: item});
                }}
                className="flex-row items-center px-4 py-5 border-b border-gray-600">
                <Image
                  source={require('../../assets/images/defaultDp.webp')}
                  className="w-12 h-12 rounded-full"
                />
                <View className="flex-1 ml-3">
                  <Text className="text-white text-lg font-semibold capitalize">
                    {item.groupName}
                  </Text>
                  {item?.messages?.length > 0 && (
                    <View className=" text-xs">
                      {item?.messages[item?.messages?.length - 1]?.mediaFile !==
                      null ? (
                        <CustomText className=" text-gray-400 text-sm">
                          Photo
                        </CustomText>
                      ) : (
                        <CustomText className="text-xs  text-gray-400 ">
                          {item?.messages[item.messages?.length - 1]?.message}
                        </CustomText>
                      )}
                    </View>
                  )}
                </View>
                <View className="items-end">
                  {item?.messages?.length > 0 && (
                    <Text className="text-gray-400 text-xs">
                      {timeAgo(
                        item?.messages[item.messages?.length - 1]?.timestamp,
                      )}
                    </Text>
                  )}
                </View>
              </TouchableOpacity>
            )}
          />
        </>
      )}
    </View>
  );
}
