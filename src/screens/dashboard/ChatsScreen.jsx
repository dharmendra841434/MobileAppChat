import React, {useEffect, useState} from 'react';
import {View, Text, TextInput, FlatList, TouchableOpacity} from 'react-native';
import useGetUserGroupsList from '../../hooks/groupHooks/useGetUserGroupsList';
import {useNavigation} from '@react-navigation/native';
import ChatLoader from '../../components/loader/ChatLoader';
import TopHeader from '../../components/TopHeader';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import GroupsListCard from '../../components/groups/GroupsList';
import {useSocket} from '../../utils/SocketProvider';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import appFonts from '../../constant/appFonts';
import CustomText from '../../components/CustomText';

const tabs = ['All', 'Unread', 'Favourites', 'Groups'];

export default function ChatsScreen() {
  const [activeTab, setActiveTab] = useState('All');
  const {userDetails} = useGetUserDetails();
  const {groupsList, isLoading} = useGetUserGroupsList();
  const invalidateQuery = useInvalidateQuery();

  const socket = useSocket();
  useEffect(() => {
    if (
      userDetails?.allFriends?.length > 0 ||
      groupsList?.data?.groups?.length > 0
    ) {
      //setAllChats([...userDetails, ...groupsList]); // Merging both arrays
    }
  }, [userDetails, groupsList]);

  useEffect(() => {
    socket.on('receiveMessages', ({messages}) => {
      invalidateQuery('groupsList');
    });
  }, [socket]);

  return (
    <View className="flex-1 bg-background">
      <TopHeader title="Chats" />

      {/* Search */}
      <View className="px-4 py-2">
        <TextInput
          placeholder="Here search your chats"
          style={{fontFamily: appFonts.Typo_Round_Regular}}
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
            <CustomText
              className={`${
                activeTab === tab ? 'text-background' : 'text-gray-300'
              }`}>
              {tab}
            </CustomText>
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
            renderItem={({item}) => <GroupsListCard item={item} />}
          />
        </>
      )}
    </View>
  );
}
