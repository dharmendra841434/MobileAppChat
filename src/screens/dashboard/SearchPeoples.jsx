import {
  View,
  TextInput,
  TouchableOpacity,
  Image,
  SafeAreaView,
  Keyboard,
  TouchableWithoutFeedback,
  FlatList,
  ActivityIndicator,
} from 'react-native';
import React, {useEffect, useState} from 'react';
import appColors from '../../constant/appColors';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import {
  cancelSendFriendRequest,
  findPeoplesRequest,
  sendFriendRequest,
} from '../../hooks/ApiRequiests/userApi';
import CustomText from '../../components/CustomText';
import {useNavigation} from '@react-navigation/native';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';

const SearchPeoples = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredUsers, setFilteredUsers] = useState([]);
  const [debouncedQuery, setDebouncedQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const {userDetails} = useGetUserDetails();
  const invalidateQuery = useInvalidateQuery();

  const navigation = useNavigation();

  // Debounce function
  useEffect(() => {
    const handler = setTimeout(() => {
      setDebouncedQuery(searchQuery);
    }, 300);

    return () => {
      clearTimeout(handler);
    };
  }, [searchQuery]);

  // Effect to handle the search request
  useEffect(() => {
    const fetchUsers = async () => {
      if (debouncedQuery) {
        setLoading(true);
        const response = await findPeoplesRequest(debouncedQuery);
        setFilteredUsers(response);
        setLoading(false);
      } else {
        setFilteredUsers([]);
      }
    };

    fetchUsers();
  }, [debouncedQuery]);

  const handleSendFriendRequest = async userId => {
    console.log(`Friend request sent to user with ID: ${userId}`);
    if (
      userDetails?.data?.sendedRequestsUsers?.some(item => item?._id === userId)
    ) {
      await cancelSendFriendRequest({targetUserId: userId}).catch(error => {
        console.log(error);
      });
    } else {
      await sendFriendRequest({targetUserId: userId}).catch(error => {
        console.log(error);
      });
    }
    invalidateQuery('userDetails');
  };

  console.log(userDetails, 'ajsgdj');

  return (
    <TouchableWithoutFeedback onPress={Keyboard.dismiss} accessible={false}>
      <SafeAreaView className="flex-1 bg-background">
        <View
          style={{elevation: 5, backgroundColor: appColors?.background}}
          className="flex flex-row items-center px-3 py-4">
          <TouchableOpacity
            onPress={() => {
              navigation.goBack();
            }}>
            <Image
              className="h-6 w-6"
              tintColor={appColors.secondary}
              source={require('../../assets/images/back.webp')}
            />
          </TouchableOpacity>
          <TextInput
            onChangeText={setSearchQuery}
            value={searchQuery}
            placeholder="Find by username, fullname,....."
            placeholderTextColor="#6b7280"
            className="h-14 px-4 rounded-lg text-white w-full"
          />
        </View>

        <View className=" mt-6 h-full">
          {searchQuery && (
            <View className="">
              {loading ? (
                <ActivityIndicator
                  size="large"
                  color={appColors.primary}
                  className="py-4"
                />
              ) : filteredUsers.length > 0 ? (
                <View className=" mx-4  rounded-md  ">
                  <FlatList
                    data={filteredUsers}
                    keyExtractor={user => user._id}
                    renderItem={({item: user}) => (
                      <View className="flex-row bg-white mt-6 justify-between items-center p-3 border-b border-gray-200">
                        <View className="flex-row items-center space-x-4">
                          <Image
                            source={{
                              uri:
                                user.profile_pic ||
                                'https://via.placeholder.com/40',
                            }}
                            className="w-10 h-10 rounded-full object-cover"
                          />
                          <View className="ml-2">
                            <CustomText className="font-semibold text-gray-900">
                              {user.full_name}
                            </CustomText>
                            <CustomText className="text-sm text-gray-500">
                              @{user.username}
                            </CustomText>
                          </View>
                        </View>
                        <TouchableOpacity
                          onPress={() => handleSendFriendRequest(user._id)}
                          className="px-4 py-2 text-sm font-medium text-white bg-background rounded-md hover:bg-blue-700">
                          <CustomText className=" text-white">
                            {userDetails?.data?.sendedRequestsUsers?.some(
                              item => item?._id === user?._id,
                            )
                              ? 'Cancel Request'
                              : 'Send Request'}
                          </CustomText>
                        </TouchableOpacity>
                      </View>
                    )}
                  />
                </View>
              ) : (
                <CustomText className="px-4 py-2 text-gray-500 text-center">
                  No users found
                </CustomText>
              )}
            </View>
          )}
        </View>
      </SafeAreaView>
    </TouchableWithoutFeedback>
  );
};

export default SearchPeoples;
