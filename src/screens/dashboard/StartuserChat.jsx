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
import handleMediaSelection from '../../utils/helper';
import useCloudinaryUpload from '../../hooks/useCloudinary';
import {useQueryClient} from '@tanstack/react-query';
import InfoPopup from '../../components/InfoPopup';
import {getUserProfile} from '../../hooks/ApiRequiests/userApi';
import UserProfile from '../../components/peoples/UserProfile';

export default function StartuserChat({route}) {
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const {userChat, targetedUser} = route.params;
  const navigation = useNavigation();
  const chatContainerRef = useRef(null);
  const {userDetails} = useGetUserDetails();
  const socket = useSocket();
  const [viweModal, setViweModal] = useState(false);
  const {progress, uploadFile} = useCloudinaryUpload();

  const [iButtonView, setiButtonView] = useState(false);
  const [showUserInfo, setShowUserInfo] = useState(null);

  const handleSendMessage = () => {
    if (input.trim()) {
      const data = {
        message: input,
        chatKey: userChat?.chatKey,
        username: userDetails?.data?.user?.username,
      };

      const newMessage = {
        username: userDetails?.data?.user?.username,
        message: input,
        mediaFile: null,
        timestamp: new Date().toISOString(), // Use current timestamp
      };

      // Add the new message object to the state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      socket.emit('sendUserMessage', data);
      setInput('');
      //queryClient.invalidateQueries(['groupsList']);
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
        chatKey: userChat?.chatKey,
        username: userDetails?.data?.user?.username,
        mediaFile: {
          mediaType: 'image',
          url: result,
        },
      };
      // console.log(data, 'new msg');

      socket.emit('sendUserMessage', data);
      //queryClient.invalidateQueries(['groupsList']);
    });
  };

  // Auto-scroll to the bottom when messages change
  useEffect(() => {
    if (chatContainerRef?.current) {
      chatContainerRef?.current?.scrollToEnd({animated: true});
    }
  }, [messages]);

  useEffect(() => {
    const data = {
      chatKey: userChat?.chatKey,
      username: targetedUser?.username,
    };
    socket.emit('joinChat', data);

    socket.on('joinedChat', ({message, messages}) => {
      console.log(message);
      setMessages(messages);
    });

    socket.on('receiveUserMessages', ({messages}) => {
      console.log(messages, 'messages');
      setMessages(messages);
      setInput('');
    });

    return () => {
      socket.off('joinChat');
      socket.off('joinedChat');
      socket.off('receiveUserMessages');
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

  //  console.log(messages, 'thgis isgsh');

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

      <InfoPopup isOpen={iButtonView} setIsOpen={setiButtonView} />

      <CustomBottomSheet
        isVisible={showUserInfo != null}
        onClose={() => setShowUserInfo(null)}
        sheetHeight={280}
        renderContent={() => (
          <>
            <UserProfile
              user={showUserInfo}
              setView={() => {
                setShowUserInfo(null);
              }}
              currentUser={userDetails?.data}
            />
          </>
        )}
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
        <Text className="text-white px-3 capitalize text-lg font-bold">
          {targetedUser?.full_name}
        </Text>
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
          handleViewProfile={handleViewProfile}
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
            placeholder="Message"
            value={input}
            onChangeText={setInput}
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
