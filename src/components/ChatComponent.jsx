import React, {useRef} from 'react';
import {View, Text, Image, ScrollView, TouchableOpacity} from 'react-native';
import {timeAgo} from '../utils/helper';
import CustomText from './CustomText';
import CircleProgress from './CircleProgress';
import ProfileIcon from './ProfileIcon';

const ChatComponent = ({
  messages,
  userDetails,
  handleViewProfile,
  scrollRef,
  progress,
}) => {
  //console.log(messages, 'uturyyiyu');

  return (
    <ScrollView ref={scrollRef} className="flex-1  py-1">
      {messages?.length === 0 ? (
        <Text className="text-gray-500 text-center mt-4">No messages yet</Text>
      ) : (
        <View className="flex flex-col justify-end w-full">
          {messages?.map((message, index) => (
            <View
              key={index}
              className={`flex mb-1 p-2 rounded-lg w-full ${
                message?.username === userDetails?.data?.user?.username
                  ? 'flex-row-reverse'
                  : 'flex-row'
              }`}>
              <TouchableOpacity
                onPress={() => handleViewProfile(message?.username)}>
                {/* <Image
                  source={{
                    uri:
                      message?.username === userDetails?.data?.user?.username
                        ? 'https://cdn-icons-png.flaticon.com/512/149/149071.png'
                        : 'https://static.vecteezy.com/system/resources/thumbnails/000/439/863/small/Basic_Ui__28186_29.jpg',
                  }}
                  className="w-10 h-10 rounded-full"
                /> */}

                <ProfileIcon
                  fullName={message?.username}
                  className=" h-10 w-10"
                />
              </TouchableOpacity>
              {message?.message !== '' ? (
                <View
                  className={`flex flex-col mx-3 max-w-[75%] px-4 py-3 rounded-xl ${
                    message?.username === userDetails?.data?.user?.username
                      ? 'bg-purple-100 rounded-tr-none self-end'
                      : 'bg-gray-100 rounded-tl-none self-start'
                  }`}>
                  <CustomText className="text-sm text-gray-700">
                    {message.message}
                  </CustomText>
                  <CustomText className="text-gray-500 text-xs mt-1">
                    {timeAgo(message?.timestamp)}
                  </CustomText>
                </View>
              ) : (
                <View
                  className={`flex flex-col mx-3 max-w-[75%] px-4 py-3 rounded-xl ${
                    message?.username === userDetails?.data?.user?.username
                      ? 'bg-purple-100 rounded-tr-none self-end'
                      : 'bg-gray-100 rounded-tl-none self-start'
                  }`}>
                  <View className=" overflow-hidden rounded-lg">
                    <Image
                      source={{uri: message?.mediaFile?.url}}
                      className="w-36 h-36 rounded-lg"
                    />
                    {!message?.mediaFile?.url?.includes('cloudinary') && (
                      <View className=" absolute top-0 left-0 right-0 bottom-0 bg-gray-900/70">
                        <View className=" items-center justify-center h-full">
                          <CircleProgress
                            progress={progress}
                            size={70}
                            strokeWidth={3}
                          />
                        </View>
                      </View>
                    )}
                  </View>
                  <CustomText className="text-gray-500 text-xs mt-1">
                    {timeAgo(message?.timestamp)}
                  </CustomText>
                  {typeof message?.mediaFile?.url !== 'string' && (
                    <CustomText>{progress}%</CustomText>
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
