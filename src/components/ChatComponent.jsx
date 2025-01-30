import React, {useRef} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {timeAgo} from '../utils/helper';

const ChatComponent = ({
  messages,
  userDetails,
  handleViewProfile,
  scrollRef,
}) => {
  return (
    <ScrollView ref={scrollRef} className="flex-1  py-1">
      {messages.length === 0 ? (
        <Text className="text-gray-500 text-center mt-4">No messages yet</Text>
      ) : (
        <View className="flex flex-col justify-end w-full">
          {messages.map((message, index) => (
            <View
              key={index}
              className={`flex mb-1 p-2 rounded-lg w-full ${
                message?.username === userDetails?.data?.username
                  ? 'flex-row-reverse'
                  : 'flex-row'
              }`}>
              <TouchableOpacity
                onPress={() => handleViewProfile(message?.username)}>
                <Image
                  source={{
                    uri:
                      message?.username === userDetails?.data?.username
                        ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        : 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg',
                  }}
                  className="w-10 h-10 rounded-full"
                />
              </TouchableOpacity>
              {message?.message !== '' ? (
                <View
                  className={`flex flex-col mx-3 max-w-[75%] px-4 py-3 rounded-xl ${
                    message?.username === userDetails?.data?.username
                      ? 'bg-purple-100 rounded-tr-none self-end'
                      : 'bg-gray-100 rounded-tl-none self-start'
                  }`}>
                  <Text className="text-sm text-gray-700">
                    {message.message}
                  </Text>
                  <Text className="text-gray-500 text-xs mt-1">
                    {timeAgo(message.timestamp)}
                  </Text>
                </View>
              ) : (
                <View
                  className={`flex flex-col mx-3 max-w-[75%] px-4 py-3 rounded-xl ${
                    message?.username === userDetails?.data?.username
                      ? 'bg-purple-100 rounded-tr-none self-end'
                      : 'bg-gray-100 rounded-tl-none self-start'
                  }`}>
                  <Image
                    source={{uri: message?.mediaFile?.url}}
                    className="w-32 h-32 rounded-lg"
                  />
                  <Text className="text-gray-500 text-xs mt-1">
                    {timeAgo(message.timestamp)}
                  </Text>
                  {typeof message?.mediaFile?.url !== 'string' && (
                    <Text>{progress}%</Text>
                  )}
                </View>
              )}
            </View>
          ))}
        </View>
      )}
    </ScrollView>
  );
};

export default ChatComponent;
