import {Image, View} from 'react-native';
import React, {useEffect} from 'react';
import {createBottomTabNavigator} from '@react-navigation/bottom-tabs';
import ChatsScreen from '../screens/dashboard/ChatsScreen';
import GroupTab from '../screens/dashboard/GroupTab';
import FriendsTabs from '../screens/dashboard/FriendsTabs';
import appFonts from '../constant/appFonts';
import appColors from '../constant/appColors';
import chats from '../assets/images/communication.webp';
import groups from '../assets/images/groups.webp';
import peoples from '../assets/images/people.webp';
import {ChatStack} from './CombineStack';
import {useSocket} from '../utils/SocketProvider';
import useInvalidateQuery from '../hooks/useInvalidateQuery';

const Tab = createBottomTabNavigator();

const BottomNavigation = () => {
  const socket = useSocket();
  const invalidateQuery = useInvalidateQuery();

  useEffect(() => {
    socket.on('reciveNotification', data => {
      //console.log(data, 'reciveNotification');
      invalidateQuery('userDetails');
    });
  }, [socket]);

  return (
    <Tab.Navigator
      initialRouteName="Chats"
      screenOptions={{
        headerShown: false,
        tabBarStyle: {
          borderTopWidth: 0.4,
          height: 60,
          paddingTop: 7,
          display: 'flex',
          backgroundColor: appColors?.background,
        },
        tabBarLabelStyle: {
          fontSize: 11,
          marginBottom: 10,
          fontFamily: appFonts?.bold,
          backgroundColor: 'rgba(0,0,0,0)',
        },
        tabBarHideOnKeyboard: true,
        tabBarActiveTintColor: appColors.primary,
        tabBarInactiveTintColor: appColors.disable,
      }}>
      <Tab.Screen
        name="Chats"
        component={ChatsScreen}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={chats}
              tintColor={!focused ? appColors?.disable : appColors?.primary}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Groups"
        component={GroupTab}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={groups}
              tintColor={!focused ? appColors?.disable : appColors?.primary}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
      <Tab.Screen
        name="Peoples"
        component={FriendsTabs}
        options={{
          tabBarIcon: ({focused}) => (
            <Image
              source={peoples}
              tintColor={!focused ? appColors?.disable : appColors?.primary}
              style={{width: 35, height: 35}}
            />
          ),
        }}
      />
    </Tab.Navigator>
  );
};

export default BottomNavigation;
