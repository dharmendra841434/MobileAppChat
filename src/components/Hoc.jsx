import {View} from 'react-native';
import React, {useEffect} from 'react';
import {useSocket} from '../utils/SocketProvider';
import useInvalidateQuery from '../hooks/useInvalidateQuery';

const Hoc = ({children}) => {
  const socket = useSocket();
  const invalidateQuery = useInvalidateQuery();

  useEffect(() => {
    socket.on('receiveNotification', () => {
      //console.log('recived nttttttt');
      invalidateQuery('groupsList');
    });
  }, [socket]);

  return <View className=" flex-1">{children}</View>;
};

export default Hoc;
