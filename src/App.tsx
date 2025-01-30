import React from 'react';
import '../global.css';
import AppStack from './routes/AppStack';
import {SocketProvider} from './utils/SocketProvider';

const App = () => {
  return (
    <SocketProvider>
      <AppStack />
    </SocketProvider>
  );
};

export default App;
