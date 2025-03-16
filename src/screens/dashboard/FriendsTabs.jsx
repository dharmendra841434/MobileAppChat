import {View, TextInput, TouchableOpacity, Image, FlatList} from 'react-native';
import React, {useState} from 'react';
import TopHeader from '../../components/TopHeader';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import {
  acceptFriendRequest,
  cancelRecivedFriendRequest,
} from '../../hooks/ApiRequiests/userApi';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import PendingUserCard from '../../components/PendingUserCard';
import ActiveUserCard from '../../components/ActiveUserCard';
import useGetAllPeoplesChat from '../../hooks/authenticationHooks/useGetAllPeoplesChat';
import appFonts from '../../constant/appFonts';

const FriendsTabs = () => {
  const [activeTab, setActiveTab] = useState(1);
  const {userDetails} = useGetUserDetails();
  const navigation = useNavigation();
  const [accpetLoading, setAcceptLoading] = useState(false);
  const [cancelLoading, setCancelLoading] = useState(false);
  const {peoplesChatLists, error} = useGetAllPeoplesChat();

  const invalidateQuery = useInvalidateQuery();

  const handAcceptRequest = async userId => {
    setAcceptLoading(true);
    await acceptFriendRequest({targetUserId: userId})
      .then(result => {
        console.log(result);
        setActiveTab(1);
        invalidateQuery('userDetails');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setAcceptLoading(false));
  };

  const handCancelRequest = async userId => {
    setCancelLoading(true);
    await cancelRecivedFriendRequest({targetUserId: userId})
      .then(result => {
        console.log(result);
        invalidateQuery('userDetails');
      })
      .catch(error => {
        console.log(error);
      })
      .finally(() => setCancelLoading(false));
  };

  const handleStartConversation = user => {
    // console.log(user?._id);
    //  console.log(error);
    const userChat = peoplesChatLists?.find(
      chat =>
        chat?.participants?.some(
          participant => participant?._id === user?._id,
        ) &&
        (chat.chatKey?.split('_')[0] === user?._id ||
          chat.chatKey?.split('_')[1] === user?._id),
    );

    console.log(userChat, 'userchat');

    navigation.navigate('startuserchat', {
      userChat: userChat,
      targetedUser: user,
    });

    // console.log(singleUser, 'asjgduagsd');
  };

  return (
    <View className="flex-1 bg-background">
      <TopHeader title="Peoples" />

      {/* Search Input */}
      <View className="px-4 py-2">
        <TextInput
          placeholder="Here search your peoples"
          placeholderTextColor="#6b7280"
          style={{fontFamily: appFonts.Typo_Round_Regular}}
          className="h-14 px-4 bg-gray-300 rounded-lg text-white"
        />
      </View>

      {/* Floating Search Button */}
      <TouchableOpacity
        activeOpacity={0.8}
        style={{elevation: 6}}
        onPress={() => navigation.navigate('searchpeoples')}
        className="drop-shadow-xl z-40 absolute bottom-9 right-3 h-16 w-16 p-4 rounded-full bg-primary">
        <Image
          className="h-full w-full"
          source={require('../../assets/images/search.webp')}
        />
      </TouchableOpacity>

      {/* Tabs */}
      <View className="flex flex-row items-center">
        <TouchableOpacity
          className="w-1/2 items-center py-5"
          onPress={() => setActiveTab(1)}>
          <CustomText
            className={`${activeTab === 1 ? 'text-primary' : 'text-gray-500'}`}>
            All People
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          className="w-1/2 items-center py-5"
          onPress={() => setActiveTab(0)}>
          <CustomText
            className={`${activeTab === 0 ? 'text-primary' : 'text-gray-500'}`}>
            Pending Requests
          </CustomText>
        </TouchableOpacity>
        <View
          className={`absolute bottom-0 bg-primary h-[1px] w-1/2 ${
            activeTab === 1 ? 'translate-x-[0%]' : 'translate-x-[100%]'
          }`}
        />
      </View>

      {/* Friends List */}
      {activeTab ? (
        <View className="flex-1 px-3 pt-5">
          {userDetails?.data?.allFriends?.length > 0 ? (
            <FlatList
              data={userDetails?.data?.allFriends}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <ActiveUserCard
                  user={item}
                  handleStartConversation={user => {
                    handleStartConversation(user);
                  }}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <CustomText className="text-white font-semibold text-lg">
                No Friends Found
              </CustomText>
            </View>
          )}
        </View>
      ) : (
        <View className="flex-1 px-3 pt-5">
          {userDetails?.data?.recivedRequestsUsers?.length > 0 ? (
            <FlatList
              data={userDetails?.data?.recivedRequestsUsers}
              keyExtractor={item => item._id.toString()}
              renderItem={({item}) => (
                <PendingUserCard
                  user={item}
                  accpetLoading={accpetLoading}
                  cancelLoading={cancelLoading}
                  handleAcceptRequest={handAcceptRequest}
                  handleCancelRequest={handCancelRequest}
                />
              )}
              showsVerticalScrollIndicator={false}
            />
          ) : (
            <View className="flex-1 items-center justify-center">
              <CustomText className="text-white font-semibold text-lg">
                No pending requests
              </CustomText>
            </View>
          )}
        </View>
      )}
    </View>
  );
};

export default FriendsTabs;
