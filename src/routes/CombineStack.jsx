import {View, Text} from 'react-native';
import React from 'react';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import ChatsScreen from '../screens/dashboard/ChatsScreen';
import StartChat from '../screens/dashboard/StartChat';

const MyStack = createNativeStackNavigator();

const ChatStack = () => {
  return (
    <MyStack.Navigator
      initialRouteName="chatss"
      screenOptions={{headerShown: false}}>
      <MyStack.Screen name="chatss" component={ChatsScreen} />
      <MyStack.Screen name="startgroupchat" component={StartChat} />
    </MyStack.Navigator>
  );
};

export {ChatStack};
