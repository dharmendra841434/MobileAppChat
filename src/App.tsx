import React, {useEffect} from 'react';
import '../global.css';
import AppStack from './routes/AppStack';
import {SocketProvider, useSocket} from './utils/SocketProvider';
import messaging from '@react-native-firebase/messaging';
import {Alert, PermissionsAndroid} from 'react-native';
import Hoc from './components/Hoc';
import showToast from './utils/showToast';

const App = () => {
  async function requestUserPermission() {
    const granted = await PermissionsAndroid.request(
      PermissionsAndroid.PERMISSIONS.POST_NOTIFICATIONS,
    );
    if (granted === PermissionsAndroid.RESULTS.GRANTED) {
      console.log('User granted the permission');
    } else {
      console.log('User denied the permission');
    }
  }

  // async function getFCMToken() {
  //   const token = await messaging().getToken();
  //   console.log('FCM Token:', token);
  // }

  useEffect(() => {
    // getFCMToken();
    requestUserPermission();
    // getFCMToken();
  }, []);

  useEffect(() => {
    const unsubscribe = messaging().onMessage(async remoteMessage => {
      console.log(remoteMessage, 'tmt');

      if (remoteMessage?.notification) {
        const {title, body} = remoteMessage.notification;

        console.log('jgyffyt');

        showToast(
          'info',
          `${title || 'New Notification'}: ${body || 'You have a new message'}`,
        );
      } else {
        showToast('info', '📩 New notification received!');
      }
    });

    return unsubscribe;
  }, []);
  return (
    <SocketProvider>
      <Hoc>
        <AppStack />
      </Hoc>
    </SocketProvider>
  );
};

export default App;
