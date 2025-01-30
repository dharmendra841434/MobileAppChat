import React from 'react';
import {NavigationContainer, useNavigation} from '@react-navigation/native';
import SplashScreen from '../screens/SplashScreen';
import OnboardingScreen from '../screens/auth-screens/OnboardingScreen';
import {createNativeStackNavigator} from '@react-navigation/native-stack';
import {StatusBar} from 'react-native';
import LoginScreen from '../screens/auth-screens/LoginScreen';
import RegisterScreen from '../screens/auth-screens/RegisterScreen';
import DashboardScreen from '../screens/dashboard/DashboardScreen';
import BottomNavigation from './BottomNavigation';
import ChatsScreen from '../screens/dashboard/ChatsScreen';
import StartChat from '../screens/dashboard/StartChat';

const Stack = createNativeStackNavigator();

export default function AppStack() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="splash"
        screenOptions={{headerShown: false}}>
        <Stack.Screen name="splash" component={SplashScreen} />
        <Stack.Screen name="onboarding" component={OnboardingScreen} />
        <Stack.Screen name="login" component={LoginScreen} />
        <Stack.Screen name="register" component={RegisterScreen} />
        <Stack.Screen name="startgroupchat" component={StartChat} />
        <Stack.Screen name="dashboard" component={BottomNavigation} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
