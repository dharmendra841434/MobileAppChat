import {
  View,
  Text,
  TouchableOpacity,
  Image,
  TextInput,
  FlatList,
} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../components/CustomText';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import appColors from '../../constant/appColors';
import useCreateGroup from '../../hooks/groupHooks/useCreateGroup';
import useJoinGroup from '../../hooks/groupHooks/useJoinGroup';
import {timeAgo} from '../../utils/helper';
import {useNavigation} from '@react-navigation/native';
import useGetUserGroupsList from '../../hooks/groupHooks/useGetUserGroupsList';
import ProfileIcon from '../../components/ProfileIcon';
import {useInfiniteQuery} from '@tanstack/react-query';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import TopHeader from '../../components/TopHeader';

const GroupTab = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('create');
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const {groupsList, isLoading} = useGetUserGroupsList();
  const navigation = useNavigation();

  const {createGroup, createGroupLoading, createGroupSuccess} =
    useCreateGroup(setExpanded);

  const {joinGroup, joinGroupLoading, joinGroupSuccess} =
    useJoinGroup(setExpanded);

  const handleCreate = () => {
    createGroup({groupName: groupName});
    setGroupName('');
  };

  const handleJoin = () => {
    joinGroup({groupKey: groupCode});
    setGroupCode('');
  };

  return (
    <View className="flex-1 bg-background">
      <CustomBottomSheet
        isVisible={expanded}
        onClose={() => setExpanded(false)}
        sheetHeight={250}
        renderContent={() => (
          <>
            <View className="flex-1 bg-white p-4 rounded-t-2xl">
              <View className=" bg-gray-300 w-24 h-1 rounded-full self-center" />
              <View>
                {selectedOption === 'create' && (
                  <View className=" pt-6">
                    <CustomText className=" text-xl">
                      Create New Group
                    </CustomText>
                    <View className=" mt-5">
                      <TextInput
                        onChangeText={setGroupName}
                        value={groupName}
                        placeholder="Enter Group Name"
                        cursorColor={appColors.background}
                        className=" border py-4 border-background rounded-xl placeholder:text-gray-400 pl-4"
                      />
                      <TouchableOpacity
                        activeOpacity={0.6}
                        disabled={createGroupLoading}
                        className=" bg-primary  px-6 py-3 rounded-md mt-8 items-center"
                        onPress={handleCreate}>
                        <CustomText className="text-background font-semibold text-xl">
                          {createGroupLoading ? 'Loading...' : 'Create Group'}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
                {selectedOption === 'join' && (
                  <View className=" pt-6">
                    <CustomText className=" text-xl">
                      Join Existing Group
                    </CustomText>
                    <View className=" mt-8">
                      <TextInput
                        onChangeText={setGroupCode}
                        value={groupCode}
                        placeholder="Enter Group Code"
                        className=" border border-background rounded-xl placeholder:text-gray-400 pl-4"
                      />
                      <TouchableOpacity
                        activeOpacity={0.6}
                        disabled={joinGroupLoading}
                        className=" bg-primary  px-6 py-3 rounded-md mt-8 items-center"
                        onPress={handleJoin}>
                        <CustomText className="text-background font-semibold text-xl">
                          {joinGroupLoading ? ' Loading...' : 'Join Now'}
                        </CustomText>
                      </TouchableOpacity>
                    </View>
                  </View>
                )}
              </View>
            </View>
          </>
        )}
      />
      <TopHeader title="Groups" />

      {/* Search */}
      <View className="px-4 py-2">
        <TextInput
          placeholder="Ask Meta AI or Search"
          placeholderTextColor="#6b7280"
          className="h-14 px-4 bg-gray-300 rounded-lg text-white"
        />
      </View>
      <View className=" flex flex-row items-center justify-center gap-x-3 w-full px-4">
        <TouchableOpacity
          activeOpacity={0.6}
          className=" bg-primary  px-6 py-2 rounded-md"
          onPress={() => {
            setExpanded(!expanded);
            setSelectedOption('create');
          }}>
          <CustomText className="text-background font-bold">
            Create New Group
          </CustomText>
        </TouchableOpacity>
        <TouchableOpacity
          activeOpacity={0.6}
          className=" bg-primary text-background px-6 py-2 rounded-md "
          onPress={() => {
            setExpanded(!expanded);
            setSelectedOption('join');
          }}>
          <Text className="text-background font-bold">Join Existing Group</Text>
        </TouchableOpacity>
      </View>
      <View className=" h-[75%]">
        <FlatList
          data={groupsList?.data?.groups}
          keyExtractor={item => item._id}
          scrollEnabled={true}
          className="flex-1 mt-2"
          renderItem={({item}) => (
            <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('startgroupchat', {group: item});
              }}
              className="flex-row  px-4 py-5 border-b border-gray-600">
              {/* <Image
                source={require('../../assets/images/defaultDp.webp')}
                className="w-12 h-12 rounded-full"
              /> */}
              <ProfileIcon
                fullName={item.groupName}
                color={item?.groupIconColor}
              />
              <View className="flex-1 ml-3">
                <CustomText className="text-white text-lg font-semibold capitalize">
                  {item.groupName}
                </CustomText>
                {item?.messages?.length > 0 && (
                  <View className=" text-xs">
                    {item?.messages[item?.messages?.length - 1]?.mediaFile !==
                    null ? (
                      <CustomText className=" text-gray-400 text-sm">
                        Photo
                      </CustomText>
                    ) : (
                      <CustomText
                        numberOfLines={1}
                        ellipsizeMode="tail"
                        className="text-xs  text-gray-400 ">
                        {item?.messages[item.messages?.length - 1]?.message}
                      </CustomText>
                    )}
                  </View>
                )}
              </View>
              <View className="items-end">
                {item?.messages?.length > 0 && (
                  <CustomText className="text-gray-400 text-xs">
                    {timeAgo(
                      item?.messages[item.messages?.length - 1]?.timestamp,
                    )}
                  </CustomText>
                )}
              </View>
            </TouchableOpacity>
          )}
        />
      </View>
    </View>
  );
};

export default GroupTab;
