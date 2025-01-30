import {QueryClient, QueryClientProvider} from '@tanstack/react-query';
import React, {createContext, useContext, useMemo} from 'react';
import Toast from 'react-native-toast-message';
import {io} from 'socket.io-client';
import appUrls from '../constant/appUrls';

let socket; // Singleton socket instance

const SocketContext = createContext(null);

export const useSocket = () => {
  const socket = useContext(SocketContext);
  if (!socket) {
    throw new Error('useSocket must be used within a SocketProvider');
  }
  return socket;
};

export const SocketProvider = ({children}) => {
  const socketConnection = useMemo(() => {
    const socketUrl = appUrls.NEXT_PUBLIC_SOCKET_URL_PROD;
    if (!socket) {
      socket = io(socketUrl, {
        transports: ['websocket'], // Optional: Force WebSocket
      });
    }

    return socket;
  }, []);

  // Create a client
  const queryClient = new QueryClient();

  return (
    <QueryClientProvider client={queryClient}>
      <SocketContext.Provider value={socketConnection}>
        {children}
        <Toast />
      </SocketContext.Provider>
    </QueryClientProvider>
  );
};
