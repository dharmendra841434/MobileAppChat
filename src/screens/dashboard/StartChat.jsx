import React, {useEffect, useRef, useState} from 'react';
import {
  View,
  Text,
  TextInput,
  Image,
  ScrollView,
  KeyboardAvoidingView,
  Platform,
  TouchableOpacity,
} from 'react-native';
import appColors from '../../constant/appColors';
import {useNavigation} from '@react-navigation/native';
import useGetUserDetails from '../../hooks/authenticationHooks/useGetUserDetails';
import ChatComponent from '../../components/ChatComponent';
import {useSocket} from '../../utils/SocketProvider';
import CustomBottomSheet from '../../components/CustomBottomSheet';
import CustomText from '../../components/CustomText';
import handleMediaSelection, {
  sendNotificationToUsers,
} from '../../utils/helper';
import useCloudinaryUpload from '../../hooks/useCloudinary';
import {useQueryClient} from '@tanstack/react-query';
import InfoPopup from '../../components/InfoPopup';
import UserProfile from '../../components/peoples/UserProfile';
import {
  getUserProfile,
  sendNotifications,
} from '../../hooks/ApiRequiests/userApi';
import useInvalidateQuery from '../../hooks/useInvalidateQuery';
import useUpdateReadMessages from '../../hooks/groupHooks/useUpdateReadMessages';
import useDeleteGroup from '../../hooks/groupHooks/useDeleteGroup';
import appFonts from '../../constant/appFonts';

export default function StartChat({route}) {
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const {group} = route.params;
  const navigation = useNavigation();
  const chatContainerRef = useRef(null);
  const {userDetails} = useGetUserDetails();
  const socket = useSocket();
  const [viweModal, setViweModal] = useState(false);
  const {progress, uploadFile} = useCloudinaryUpload();
  const queryClient = useQueryClient();
  const [iButtonView, setiButtonView] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(null);
  const invalidateQuery = useInvalidateQuery();
  const {updateReadsMessage} = useUpdateReadMessages();

  const {deleteGroup, deleteGroupSuccess} = useDeleteGroup({
    setThreedot: () => {
      navigation.goBack();
      socket.emit('sendNotification', {message: 'this group is deleted'});
    },
  });

  const handleSendMessage = async () => {
    if (input.trim()) {
      const data = {
        message: input,
        groupKey: group?.groupKey,
        username: userDetails?.data?.user?.username,
        userId: userDetails?.data?.user?._id,
      };

      const newMessage = {
        username: userDetails?.data?.user?.username,
        message: input,
        mediaFile: null,
        timestamp: new Date().toISOString(), // Use current timestamp
        userId: userDetails?.data?.user?._id,
      };

      // Add the new message object to the state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      socket.emit('chatMessage', data);
      socket.emit('sendNotification', {message: 'sending message'});
      setInput('');
      queryClient.invalidateQueries(['groupsList']);
      await sendNotificationToUsers(
        userDetails,
        input,
        group?.usersDeviceToken,
      );
    }
  };

  const handleSendMedia = async file => {
    const newMessage = {
      username: userDetails?.data?.user?.username,
      message: '',
      mediaFile: {
        mediaType: 'image',
        url: file.uri,
      },
      timestamp: new Date().toISOString(), // Use current timestamp
    };

    // Add the new message object to the state
    setMessages(prevMessages => [...prevMessages, newMessage]);
    await uploadFile(file).then(result => {
      console.log(result, 'result');
      const data = {
        groupKey: group.groupKey,
        username: userDetails?.data?.user?.username,
        mediaFile: {
          mediaType: 'image',
          url: result,
        },
      };
      socket.emit('chatMessage', data);
      queryClient.invalidateQueries(['groupsList']);
    });
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollToEnd({animated: true});
    }
  }, [messages]);

  useEffect(() => {
    const data = {
      groupKey: group?.groupKey,
      username: userDetails?.data?.user?.username,
      userId: userDetails?.data?.user?._id,
    };
    socket.emit('joinGroup', data);

    socket.on('joinedGroup', ({message, messages}) => {
      // console.log(message);
      setMessages(messages);
      invalidateQuery('groupsList');
    });

    socket.on('receiveMessages', ({messages, groupKey}) => {
      // console.log(groupKey, group);
      if (groupKey === group.groupKey) {
        updateReadsMessage({
          groupId: group?.groupKey,
          userId: userDetails?.data?.user?._id,
        });
        setMessages(messages);
        setInput('');
      }
    });

    socket.on('receiveNotification', ({messages}) => {
      // console.log(messages);
      // if ((messages = 'this group is deleted')) {
      //   navigation.goBack();
      // }
    });

    return () => {
      socket.off('joinGroup');
      socket.off('receiveMessages');
      socket.off('receiveNotification');
    };
  }, [socket]);

  const handleOpenCamera = async () => {
    try {
      const media = await handleMediaSelection('camera');
      console.log(media);
      setViweModal(false);
      handleSendMedia(media[0]);
    } catch (error) {
      setViweModal(false);
      console.log(error);
    }
  };

  const handleOpenGallery = async () => {
    try {
      const media = await handleMediaSelection('gallery');
      console.log(media);
      setViweModal(false);
      handleSendMedia(media[0]);
    } catch (error) {
      setViweModal(false);
      console.log(error);
    }
  };
  const handleViewProfile = async username => {
    const profile = await getUserProfile(username);
    setShowUserInfo(profile);
  };

  const handleDeleteGroup = async () => {
    deleteGroup(group?.groupKey);
  };

  return (
    <View className="flex-1 bg-white">
      {/* Send Media */}
      <CustomBottomSheet
        isVisible={viweModal}
        onClose={() => setViweModal(false)}
        sheetHeight={150}
        renderContent={() => (
          <>
            <View className="flex-1 bg-white p-4 rounded-t-2xl">
              <View className="flex flex-row items-center justify-between px-8 h-full">
                <TouchableOpacity
                  onPress={handleOpenGallery}
                  activeOpacity={0.8}
                  className=" items-center">
                  <Image
                    className=" h-16 w-16"
                    source={require('../../assets/images/gallery.webp')}
                  />
                  <CustomText>Gallery</CustomText>
                </TouchableOpacity>
                <TouchableOpacity
                  onPress={handleOpenCamera}
                  activeOpacity={0.8}
                  className=" items-center">
                  <Image
                    className=" h-16 w-16"
                    source={require('../../assets/images/camera.webp')}
                  />
                  <CustomText>Camera</CustomText>
                </TouchableOpacity>
                <TouchableOpacity activeOpacity={0.8} className=" items-center">
                  <Image
                    className=" h-16 w-16"
                    source={require('../../assets/images/document.webp')}
                  />
                  <CustomText>Document</CustomText>
                </TouchableOpacity>
              </View>
            </View>
          </>
        )}
      />

      <CustomBottomSheet
        isVisible={showUserInfo != null}
        onClose={() => setShowUserInfo(null)}
        sheetHeight={280}
        renderContent={() => (
          <>
            <UserProfile
              setView={() => {
                setShowUserInfo(null);
              }}
              user={showUserInfo}
              currentUser={userDetails?.data}
            />
          </>
        )}
      />

      <InfoPopup
        isOpen={iButtonView}
        setIsOpen={setiButtonView}
        handleDeleteGroup={handleDeleteGroup}
        userId={userDetails?.data?.user?._id}
        groupKey={group?.owner}
      />

      {/* Header */}
      <View
        style={{elevation: 0.7, backgroundColor: appColors?.background}}
        className="h-16 bg-background border-b border-b-primary flex-row items-center justify-between px-4">
        <TouchableOpacity
          onPress={() => {
            navigation.goBack();
          }}>
          <Image
            className=" h-6 w-6"
            tintColor={appColors.secondary}
            source={require('../../assets/images/back.webp')}
          />
        </TouchableOpacity>
        <CustomText font="bold" className="text-white px-3 capitalize text-lg ">
          {group?.groupName}
        </CustomText>
        <View className="flex-row space-x-4">
          <TouchableOpacity
            activeOpacity={0.7}
            onPress={() => setiButtonView(true)}>
            <Image
              className=" h-6 w-6"
              tintColor={appColors.secondary}
              source={require('../../assets/images/information.webp')}
            />
          </TouchableOpacity>
        </View>
      </View>

      {/* Chat View */}
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        className="flex-1">
        <ChatComponent
          scrollRef={chatContainerRef}
          userDetails={userDetails}
          messages={messages}
          progress={progress}
          handleViewProfile={data => {
            handleViewProfile(data);
          }}
        />

        {/* Input Field */}
        <View className="flex-row items-center px-4 py-2 bg-secondary border-t border-gray-300  w-full">
          <TouchableOpacity
            onPress={() => {
              setViweModal(true);
            }}
            activeOpacity={0.8}>
            <Image
              className=" h-6 w-6"
              tintColor={appColors.dark}
              source={require('../../assets/images/link.webp')}
            />
          </TouchableOpacity>
          <TextInput
            placeholder="Enter your message"
            value={input}
            onChangeText={setInput}
            multiline={true}
            numberOfLines={3}
            style={{fontFamily: appFonts.Typo_Round_Regular}}
            className="flex-1 mx-2 px-4 py-4 bg-white rounded-2xl border border-gray-300 text-black"
          />
          <TouchableOpacity
            activeOpacity={0.8}
            onPress={handleSendMessage}
            className=" bg-background px-4 py-3 rounded-xl">
            <Image
              className=" h-6 w-6"
              tintColor={appColors.secondary}
              source={require('../../assets/images/send.webp')}
            />
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </View>
  );
}
