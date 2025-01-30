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

export default function StartChat({route}) {
  const [messages, setMessages] = useState('');
  const [input, setInput] = useState('');
  const {group} = route.params;
  const navigation = useNavigation();
  const chatContainerRef = useRef(null);
  const {userDetails, isLoading, isError, error} = useGetUserDetails();
  const socket = useSocket();

  const handleSendMessage = () => {
    if (input.trim()) {
      const data = {
        message: input,
        groupKey: group?.groupKey,
        username: userDetails?.data?.username,
      };

      const newMessage = {
        username: userDetails?.data?.username,
        message: input,
        mediaFile: null,
        timestamp: new Date().toISOString(), // Use current timestamp
      };

      // Add the new message object to the state
      setMessages(prevMessages => [...prevMessages, newMessage]);
      socket.emit('chatMessage', data);
      setInput('');
    }
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
      username: 'You',
    };
    socket.emit('joinGroup', data);

    socket.on('joinedGroup', ({message, messages}) => {
      console.log(message);
      setMessages(messages);
    });

    socket.on('reciveMessages', ({messages}) => {
      console.log(messages, 'messages');
      setMessages(messages);
      setInput('');
    });

    socket.on('reciveFiles', data => {
      console.log(data, 'data');
    });

    return () => {
      socket.off('joinGroup');
    };
  }, [socket]);

  return (
    <View className="flex-1 bg-white">
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
          {group?.groupName}
        </Text>
        <View className="flex-row space-x-4">
          {/* <TouchableOpacity>
            <Text className="text-white">📞</Text>
          </TouchableOpacity>
          <TouchableOpacity>
            <Text className="text-white">🎥</Text>
          </TouchableOpacity> */}
          <TouchableOpacity>
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
        />

        {/* Input Field */}
        <View className="flex-row items-center px-4 py-2 bg-secondary border-t border-gray-300">
          <TouchableOpacity activeOpacity={0.8}>
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
