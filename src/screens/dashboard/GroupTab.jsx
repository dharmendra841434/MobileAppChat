import {View, Text, TouchableOpacity, TextInput, FlatList} from 'react-native';
import React, {useState} from 'react';
import CustomText from '../../components/CustomText';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import appColors from '../../constant/appColors';
import useCreateGroup from '../../hooks/groupHooks/useCreateGroup';
import useJoinGroup from '../../hooks/groupHooks/useJoinGroup';
import {useNavigation} from '@react-navigation/native';
import useGetUserGroupsList from '../../hooks/groupHooks/useGetUserGroupsList';
import ProfileIcon from '../../components/ProfileIcon';
import TopHeader from '../../components/TopHeader';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import GroupsListCard from '../../components/groups/GroupsList';
import messaging from '@react-native-firebase/messaging';

const GroupTab = () => {
  const [expanded, setExpanded] = useState(false);
  const [selectedOption, setSelectedOption] = useState('create');
  const [groupName, setGroupName] = useState('');
  const [groupCode, setGroupCode] = useState('');
  const {groupsList, isLoading} = useGetUserGroupsList();
  const {userDetails} = useGetUserDetails();
  const navigation = useNavigation();

  const {createGroup, createGroupLoading, createGroupSuccess} =
    useCreateGroup(setExpanded);

  const {joinGroup, joinGroupLoading, joinGroupSuccess} =
    useJoinGroup(setExpanded);

  const handleCreate = async () => {
    const deviceToken = await messaging().getToken();
    createGroup({groupName: groupName, deviceToken: deviceToken});
    setGroupName('');
  };

  const handleJoin = async () => {
    const deviceToken = await messaging().getToken();
    joinGroup({groupKey: groupCode, deviceToken: deviceToken});
    setGroupCode('');
  };

  //console.log(groupsList, 'list');

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
          renderItem={({item}) => <GroupsListCard item={item} />}
        />
      </View>
    </View>
  );
};

export default GroupTab;
